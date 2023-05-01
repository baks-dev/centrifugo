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

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

use BaksDev\Centrifugo\Server\AuthCentrifugo;

return static function (ContainerConfigurator $configurator) {
    $services = $configurator->services()
        ->defaults()
        ->autowire()
        ->autoconfigure()
    ;

    $services->set(AuthCentrifugo::class)
        ->arg('$dsn', '%env(CENTRIFUGO_DSN)%')
        ->arg('$key', '%env(CENTRIFUGO_API_KEY)%')
    ;

    $param = $configurator->parameters();

    $param->set('centrifugo.ttl', '%env(CENTRIFUGO_TTL)%');  // 84600 = 1 день
    $param->set('centrifugo.dsn', '%env(CENTRIFUGO_DSN)%');
    $param->set('centrifugo.secret', '%env(CENTRIFUGO_HMAC)%');
    $param->set('centrifugo.key', '%env(CENTRIFUGO_API_KEY)%');
};
