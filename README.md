# BaksDev Centrifugo

[![Version](https://img.shields.io/badge/version-7.1.5-blue)](https://github.com/baks-dev/centrifugo/releases)
![php 8.3+](https://img.shields.io/badge/php-min%208.3-red.svg)

Модуль сокетов сервера Centrifugo

## Установка

``` bash
$ composer require baks-dev/centrifugo
```

## Дополнительно

Установка конфигурации и файловых ресурсов:

``` bash
$ php bin/console baks:assets:install
```

* в файле .env указать настройки подключения (на пример домена baks.dev)
* !!! указанные данные вымышленные

``` dotenv
###> CENTRIFUGO ###
CENTRIFUGO_DSN=baks.dev:8000
CENTRIFUGO_HMAC=64189894-5408-4122-ba97-99d981268a62
CENTRIFUGO_API_KEY=a7364217-0015-4afc-a775-9471962b5b8c
CENTRIFUGO_TTL=3600
```

## Установка и настройка Centrifugo

Установка [Centrifugo](Centrifugo.md)

## Тестирование

``` bash
$ php bin/phpunit --group=centrifugo
```

## Лицензия ![License](https://img.shields.io/badge/MIT-green)

The MIT License (MIT). Обратитесь к [Файлу лицензии](LICENSE.md) за дополнительной информацией.
