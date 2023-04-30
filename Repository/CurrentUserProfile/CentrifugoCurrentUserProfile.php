<?php
/*
 *  Copyright 2023.  Baks.dev <admin@baks.dev>
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is furnished
 *  to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

declare(strict_types=1);

namespace BaksDev\Centrifugo\Repository\CurrentUserProfile;

use BaksDev\Users\Profile\UserProfile\Entity as UserProfileEntity;
use BaksDev\Users\Profile\UserProfile\Type\Id\UserProfileUid;
use BaksDev\Users\Profile\UserProfile\Type\Status\UserProfileStatus;
use BaksDev\Users\Profile\UserProfile\Type\Status\UserProfileStatusEnum;
use BaksDev\Users\User\Entity\User;
use BaksDev\Users\User\Type\Id\UserUid;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Cache\Adapter\ApcuAdapter;

final class CentrifugoCurrentUserProfile implements CentrifugoCurrentUserProfileInterface
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getCurrentUserProfile(UserUid $user, int $ttl = 60): ?UserProfileUid
    {
        $qb = $this->entityManager->createQueryBuilder();

        $select = sprintf(
            'new %s(profile.id, profile.event)',
            UserProfileUid::class
        );

        $qb->select($select);

        $qb->from(User::class, 'users');

        $qb->join(
            UserProfileEntity\Info\UserProfileInfo::class,
            'profile_info',
            'WITH',
            '
				profile_info.user = users.id AND
				profile_info.status = :status AND
				profile_info.active = true
		'
        );

        $qb->join(
            UserProfileEntity\UserProfile::class,
            'profile',
            'WITH',
            'profile.id = profile_info.profile'
        );

        $qb->where('users.id = :user');

        // Кешируем результат ORM
        $cacheQueries = new ApcuAdapter((string) $user);

        $query = $this->entityManager->createQuery($qb->getDQL());
        $query->setQueryCache($cacheQueries);
        $query->setResultCache($cacheQueries);
        $query->enableResultCache();
        $query->setLifetime($ttl);

        $query->setParameter('user', $user, UserUid::TYPE);
        $qb->setParameter('status', new UserProfileStatus(UserProfileStatusEnum::ACTIVE), UserProfileStatus::TYPE);

        return $query->getOneOrNullResult();
    }
}
