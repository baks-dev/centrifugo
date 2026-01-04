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
 */

declare(strict_types=1);

namespace BaksDev\Centrifugo\Server\Publish;

use BaksDev\Centrifugo\Server\AuthCentrifugo;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Target;
use Symfony\Component\HttpClient\Exception\TransportException;

final class CentrifugoPublish implements CentrifugoPublishInterface
{
    private array $data = [];

    private bool $error = false;

    private ?array $message = null;

    public function __construct(
        #[Target('centrifugoLogger')] private readonly LoggerInterface $logger,
        private readonly AuthCentrifugo $centrifugo,
    ) {}

    public function addData(array $data): self
    {
        $this->data = array_merge($data, $this->data);

        return $this;
    }

    /** Метод отправляет сообщение  */
    public function send(string|array $channels, ?int $delay = null): self|false
    {
        $jsonParsedArray = false;

        /** Отправляем данные в несколько каналов */
        if(is_array($channels))
        {
            $jsonParsedArray = [
                'method' => 'broadcast',
                'params' => [
                    'channels' => $channels,
                    'data' => $this->data,
                ],
            ];
        }

        /** Отправляем данные в один канал */
        if(is_string($channels))
        {
            $jsonParsedArray = [
                'method' => 'publish',
                'params' => [
                    'channel' => $channels,
                    'data' => $this->data,
                ],
            ];
        }

        if(false === $jsonParsedArray)
        {
            $this->error = true;

            return false;
        }

        try
        {
            $response = $this->centrifugo->getHttpClient()
                ->request(
                    method: 'POST',
                    url: '/api',
                    options: ['json' => $jsonParsedArray],
                );

            if($response->getStatusCode() !== 200)
            {
                $this->logger->critical('centrifugo: Ошибка при оправке сокета', $jsonParsedArray);

                $this->error = true;

                return false;
            }
        }

        catch(TransportException)
        {
            /**
             * Исключение возникает если Centrifugo не установлен либо не может подключиться к порту
             */

            $this->error = true;

            return false;
        }

        if($delay)
        {
            $response->getInfo('pause_handler')($delay);
        }


        $content = $response->toArray();

        $this->data = [];

        if(isset($content['error']))
        {
            $this->message = [$content['code'] => $content['message']];

            $this->error = true;

            return false;
        }

        return $this;
    }

    public function isError(): bool
    {
        return $this->error === true;
    }

    public function getMessage(): array
    {
        return $this->message;
    }
}
