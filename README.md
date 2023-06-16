# Интеграция [EditorJS](https://editorjs.io/) для админки на Filament

[![Latest Version on Packagist](https://img.shields.io/packagist/v/mihail-himinec/tallstack-editorjs.svg?style=flat-square)](https://packagist.org/packages/:vendor_slug/:package_slug)
[![Total Downloads](https://img.shields.io/packagist/dt/mihail-himinec/tallstack-editorjs.svg?style=flat-square)](https://packagist.org/packages/:vendor_slug/:package_slug)
---

## Предустановки

#### Text and typography

- [@editorjs/paragraph](https://github.com/editor-js/paragraph) — text block base tool
- [@editorjs/header](https://github.com/editor-js/header) — header block
- [@editorjs/quote](https://github.com/editor-js/quote) — tool for quotes
- [@editorjs/delimiter](https://github.com/editor-js/delimiter) — delimiter tool
- [@editorjs/warning](https://github.com/editor-js/warning) — warning tool can be used as editorials notifications or appeals
- [editorjs-alert](https://github.com/vishaltelangre/editorjs-alert) - tool for adding colorful alert messages

#### Lists

- [@editorjs/nested-list](https://github.com/editor-js/nested-list) — Multi-leveled lists
- [@editorjs/checklist](https://github.com/editor-js/checklist) — checklists for your texts 

#### Media & Embed

- [@editorjs/attaches](https://github.com/editor-js/attaches) — attach files to your article
- [@editorjs/embed](https://github.com/editor-js/embed) — pasted patterns handling and inserts iframe with embedded content
- [@editorjs/link](https://github.com/editor-js/link) — link with preview
- [naduma/editorjs-mermaid](https://github.com/naduma/editorjs-mermaid) — Mermaid Block for Editor.js
#### Table

- [@editorjs/table](https://github.com/editor-js/table) — table constructor tool 

#### Code

- [@editorjs/code](https://github.com/editor-js/code) — tools for code examples 
- [@editorjs/raw](https://github.com/editor-js/raw) — include raw HTML code to your article

---

## Помощь

- [EditorJS](https://editorjs.io/base-concepts/)
- [Filament](https://filamentphp.com/docs/2.x/admin/installation)

## Установка

Установить пакет:

```bash
composer require mihail-himinec/tallstack-editorjs
```

Опубликовать конфигурационный файл:

```bash
php artisan vendor:publish --tag="tallstack-editorjs-config"
```

Это содержимое опубликованного конфигурационного файла:

```php

return [
];

```

При желании вы можете опубликовать представления с помощью:

```bash
php artisan vendor:publish --tag="tallstack-editorjs-views"
```

## Использование

По умолчанию включены все инструменты

```php
[
        'header',
        'image',
        'delimiter',
        'list',
        'underline',
        'quote',
        'table',
        'raw',
        'code',
        'inline-code',
        'style',
        'alert',
        'warning',
        'embed',
        'color',
        'marker',
        'tooltip',
        'checklist',
        'attaches',
        'alignmenttune',
        'paragraph',
        'strikethrough',
        'lists',
        'mermaid',
]
```

Вы можете отключить любой из них, передав массив инструментов:

```php
EditorJs::make('content')->disableTools(['delimiter', 'quote']);
```

Вы можете отключить любой из них, передав массив инструментов:

```php
EditorJs::make('content')->tools(['header', 'image', 'list']);
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
