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

namespace BaksDev\Centrifugo\Services\JwtGenerator;

use BaksDev\Centrifugo\Services\Token\TokenGeneratorInterface;
use JsonException;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use function base64_encode;
use function hash_hmac;
use function implode;
use function json_encode;
use function str_replace;
use const JSON_THROW_ON_ERROR;

class JwtGenerator implements JwtGeneratorInterface
{
    private const HMAC_ALGORITHM = 'sha256';

    private readonly string $hmac;

    private int $ttl;

    public function __construct(
        #[Autowire(env: 'CENTRIFUGO_HMAC')] string $hmac,
        #[Autowire(env: 'CENTRIFUGO_TTL')] int $ttl
    ) {
        $this->hmac = $hmac;
        $this->ttl = $ttl;
    }

    /**
     * @throws JsonException
     */
    public function generateToken(TokenGeneratorInterface $payload): string
    {

        $headerEncoded = $this->arrayBase64Encode([
            'typ' => 'JWT',
            'alg' => 'HS256',
        ]);

        $payloadEncoded = $this->arrayBase64Encode(
            array_merge(
                $payload->getTokenData(),
                ['exp' => (time() + $this->ttl)]
            )
        );

        return implode('.', [
            $headerEncoded,
            $payloadEncoded,
            $this->buildSignaturePart($headerEncoded, $payloadEncoded),
        ]);
    }

    /**
     * @throws JsonException
     */
    public function arrayBase64Encode(array $encode): string
    {
        $jsonEncode = json_encode($encode, JSON_THROW_ON_ERROR);

        return $this->stringBase64Encode($jsonEncode);
    }

    public function getTtl(): int
    {
        return $this->ttl;
    }

    private function buildSignaturePart(string $headerDecoded, string $payloadDecoded): string
    {
        $data = $headerDecoded.'.'.$payloadDecoded;
        $hash = hash_hmac(self::HMAC_ALGORITHM, $data, $this->hmac, true);

        return $this->stringBase64Encode($hash);
    }

    private function stringBase64Encode(string $string): string
    {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($string));
    }
}
