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

namespace BaksDev\Centrifugo\Controller;

use BaksDev\Centrifugo\Services\Token\TokenUserGenerator;
use BaksDev\Core\Listeners\Event\Security\RoleSecurity;
use BaksDev\Users\User\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[AsController]
//#[RoleSecurity('ROLE_USER')]
class CentrifugoCredentialsController
{
    #[Route('/centrifugo/credentials/user', name: 'centrifugo.credentials.user', methods: ['GET', 'POST'])]
    public function token(
        #[CurrentUser] User $usr,
        TokenUserGenerator $generator,
    ): JsonResponse
    {
        if(!$usr)
        {
            return new JsonResponse(['token' => null], Response::HTTP_FORBIDDEN);
        }

        $token = $generator->generate($usr);

        return new JsonResponse(['token' => $token], Response::HTTP_OK);
    }
}
