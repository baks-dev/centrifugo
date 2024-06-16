# BaksDev Centrifugo

[![Version](https://img.shields.io/badge/version-7.1.6-blue)](https://github.com/baks-dev/centrifugo/releases)
![php 8.3+](https://img.shields.io/badge/php-min%208.3-red.svg)

Модуль сокетов сервера Centrifugo

## Cервер Centrifugo

Установка и настройка [Centrifugo 4.1](Centrifugo.md)

## Установка

``` bash
$ composer require baks-dev/centrifugo
```

> ### Важно!
> в файле .env указать настройки подключения

## Дополнительно

Установка конфигурации и файловых ресурсов:

``` bash
$ php bin/console baks:assets:install
```

## Тестирование

``` bash
$ php bin/phpunit --group=centrifugo
```

## Лицензия ![License](https://img.shields.io/badge/MIT-green)

The MIT License (MIT). Обратитесь к [Файлу лицензии](LICENSE.md) за дополнительной информацией.
