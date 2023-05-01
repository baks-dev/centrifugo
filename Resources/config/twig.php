<?php

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

use Symfony\Config\TwigConfig;

return static function (TwigConfig $config) {
    $config->global('centrifugo_dsn')->value('%env(CENTRIFUGO_DSN)%');
};
