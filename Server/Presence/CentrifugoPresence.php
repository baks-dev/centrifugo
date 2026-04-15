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

namespace BaksDev\Centrifugo\Server\Presence;

use BaksDev\Centrifugo\Server\AuthCentrifugo;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Target;
use Symfony\Component\HttpClient\Exception\TransportException;

/**
 * @see https://centrifugal.dev/docs/server/server_api#http-api
 */
final class CentrifugoPresence implements CentrifugoPresenceInterface
{
    private const bool STATS = false;

    private ?string $method = null;

    private bool $error = false;

    private array $content;

    public function __construct(
        #[Target('centrifugoLogger')] private readonly LoggerInterface $logger,
        private readonly AuthCentrifugo $centrifugo
    ) {}

    public function get(string $channel, bool $stats = self::STATS): self
    {
        $this->method = false === $stats ? 'presence' : 'presence_stats';

        $jsonParsedArray = [
            'method' => $this->method,
            'params' => [
                'channel' => $channel,
            ],
        ];

        try
        {
            $response = $this->centrifugo->getHttpClient()
                ->request(
                    method: 'POST',
                    url: '/api',
                    options: ['json' => $jsonParsedArray]
                );

            if($response->getStatusCode() !== 200)
            {
                $this->logger->critical(
                    message: 'centrifugo: Ошибка centrifugo: StatusCode '.$response->getStatusCode(),
                    context: $jsonParsedArray,
                );

                $this->error = true;
                return $this;
            }
        }
        catch(TransportException $exception)
        {
            /**
             * Исключение возникает если Centrifugo не установлен либо не может подключиться к порту
             */

            $this->logger->critical(
                message: 'centrifugo:'.$exception->getMessage(),
                context: $exception->getTrace());

            $this->error = true;

            return $this;
        }

        $this->content = $response->toArray();

        return $this;
    }

    public function getContent(): array|null
    {
        if(true === $this->error)
        {
            return null;
        }

        return $this->content;
    }

    /**
     * Метод проверяет наличие хотя бы одного подписчика на канал
     */
    public function isPresence(): bool|null
    {
        if('presence_stats' !== $this->method)
        {
            return null;
        }

        if(true === $this->error)
        {
            return null;
        }

        if(true === isset($this->content['error']))
        {
            return null;
        }

        return $this->content['result']['num_clients'] > 0;
    }
}
