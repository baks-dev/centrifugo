# BaksDev Centrifugo

![Version](https://img.shields.io/badge/version-6.2.0-blue) ![php 8.1+](https://img.shields.io/badge/php-min%208.1-red.svg)

Модуль сокетов сервера Centrifugo

## Установка

``` bash
$ composer require baks-dev/centrifugo
```

## Дополнительно

* в файле .env указать настройки подключения (на примеер домена baks.dev)

``` editorconfig
###> CENTRIFUGO ###
CENTRIFUGO_API_KEY=a7364217-0015-4afc-a775-9471962b5b8c
CENTRIFUGO_API_ENDPOINT=https://baks.dev:8000
CENTRIFUGO_SECRET=64189894-5408-4122-ba97-99d981268a62
```

Роли администартора с помощью Fixtures

``` bash
$ php bin/console doctrine:fixtures:load --append
```

## Установка и настройка Centrifugo

Установка [Centrifugo](Centrifugo.md)

## Журнал изменений ![Changelog](https://img.shields.io/badge/changelog-yellow)

О том, что изменилось за последнее время, обратитесь к [CHANGELOG](CHANGELOG.md) за дополнительной информацией.

## Лицензия ![License](https://img.shields.io/badge/MIT-green)

The MIT License (MIT). Обратитесь к [Файлу лицензии](LICENSE.md) за дополнительной информацией.


