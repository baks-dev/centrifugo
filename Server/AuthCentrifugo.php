<?php
/*
 *  Copyright 2024.  Baks.dev <admin@baks.dev>
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
    )
    {
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
