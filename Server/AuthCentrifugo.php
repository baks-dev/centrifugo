<?php
/*
 *  Copyright 2022.  Baks.dev <admin@baks.dev>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

namespace BaksDev\Centrifugo\Server;

use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\HttpClientInterface;

final class AuthCentrifugo
{
    private readonly HttpClientInterface $httpClient;

    public function __construct(
        #[Autowire(env: 'CENTRIFUGO_DSN')] string $CENTRIFUGO_DSN,
        #[Autowire(env: 'CENTRIFUGO_API_KEY')] string $CENTRIFUGO_API_KEY,
    ) {
        $this->httpClient = HttpClient::create(
            ['headers' => [
                'Authorization' => 'apikey '.$CENTRIFUGO_API_KEY,
                'Content-Type' => 'application/json',
            ]]
        )
            ->withOptions([
                'base_uri' => 'https://'.$CENTRIFUGO_DSN,
                'verify_host' => false,
                'verify_peer' => false
            ]);
    }

    public function getHttpClient(): HttpClientInterface
    {
        return $this->httpClient;
    }
}
