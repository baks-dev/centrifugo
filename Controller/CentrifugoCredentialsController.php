<?php

namespace BaksDev\Centrifugo\Controller;

use BaksDev\Centrifugo\Services\Token\JwtUserGenerator;
use BaksDev\Core\Controller\AbstractController;
use BaksDev\Core\Services\Security\RoleSecurity;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[RoleSecurity('ROLE_USER')]
class CentrifugoCredentialsController extends AbstractController
{
    #[Route('/centrifugo/credentials/user', name: 'centrifugo.credentials.user', methods: ['GET'])]
    public function token(JwtUserGenerator $generator): JsonResponse
    {
        $User = $this->getUser();

        if (!$User) {
            return new JsonResponse(['token' => null], Response::HTTP_FORBIDDEN);
        }

        $token = $generator->generate($User->getId());

        return new JsonResponse(['token' => $token], Response::HTTP_OK);
    }
}
