<?php

namespace BaksDev\Centrifugo\Repository\CurrentUserProfile;

use BaksDev\Users\Profile\UserProfile\Type\Id\UserProfileUid;
use BaksDev\Users\User\Type\Id\UserUid;

interface CentrifugoCurrentUserProfileInterface
{
    public function getCurrentUserProfile(UserUid $user): ?UserProfileUid;
}
