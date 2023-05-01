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

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\HttpClientInterface;

final class AuthCentrifugo
{
    private readonly HttpClientInterface $httpClient;

    public function __construct(string $dsn, string $key)
    {
        $this->httpClient = HttpClient::create(
            ['headers' => [
                'Authorization' => 'apikey '.$key,
                'Content-Type' => 'application/json',
            ]]
        )
            ->withOptions(['base_uri' => 'https://'.$dsn])
        ;
    }

    public function getHttpClient(): HttpClientInterface
    {
        return $this->httpClient;
    }
}
