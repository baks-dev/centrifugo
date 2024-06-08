# BaksDev Centrifugo

[![Version](https://img.shields.io/badge/version-7.1.1-blue)](https://github.com/baks-dev/centrifugo/releases)
![php 8.3+](https://img.shields.io/badge/php-min%208.3-red.svg)

Модуль сокетов сервера Centrifugo

## Установка

``` bash
$ composer require baks-dev/centrifugo
```

## Дополнительно

* в файле .env указать настройки подключения (на пример домена baks.dev)
* !!! указанные данные вымышленные

``` editorconfig
###> CENTRIFUGO ###
CENTRIFUGO_DSN=baks.dev:8000
CENTRIFUGO_HMAC=64189894-5408-4122-ba97-99d981268a62
CENTRIFUGO_API_KEY=a7364217-0015-4afc-a775-9471962b5b8c
CENTRIFUGO_TTL=3600
```

## Установка и настройка Centrifugo

Установка [Centrifugo](Centrifugo.md)


## Лицензия ![License](https://img.shields.io/badge/MIT-green)

The MIT License (MIT). Обратитесь к [Файлу лицензии](LICENSE.md) за дополнительной информацией.
