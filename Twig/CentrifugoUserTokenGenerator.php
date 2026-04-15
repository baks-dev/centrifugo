<?php
/*
 *  Copyright 2026.  Baks.dev <admin@baks.dev>
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
 *
 */

declare(strict_types=1);

namespace BaksDev\Centrifugo\Twig;

use BaksDev\Centrifugo\Services\Token\TokenGeneratorInterface;
use BaksDev\Users\User\Entity\User;
use BaksDev\Users\User\Repository\UserTokenStorage\UserTokenStorageInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Target;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Генерирует токен по uid пользователя
 */
final class CentrifugoUserTokenGenerator extends AbstractExtension
{

    public function __construct(
        #[Target('centrifugoLogger')] private readonly LoggerInterface $logger,
        private readonly TokenGeneratorInterface $tokenUserGenerator,
        private readonly ?UserTokenStorageInterface $userTokenStorage = null,
    ) {}

    public function getFunctions(): array
    {
        return [
            new TwigFunction('centrifugo_user_token', $this->getUserToken(...)),
        ];
    }

    public function getUserToken(): string
    {
        $user = $this->userTokenStorage?->getUserInterface();

        if(false === $user instanceof User)
        {
            $this->logger->warning(
                message: 'centrifugo: Ошибка при попытке сгенерировать токен не найден пользователь',
                context: [
                    self::class.':'.__LINE__,
                ]);

            return '';
        }

        return $this->tokenUserGenerator->generate($user);
    }
}
