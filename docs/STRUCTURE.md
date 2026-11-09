# Структура проекта SolPlatform

## Файлы

| Файл | Назначение |
|------|-----------|
| `index.html` | Главная страница (two-language: EN/RU) |
| `advertisers.html` | Страница для рекламодателей (two-language: EN/RU) |
| `style.css` | Общие стили для обеих страниц |
| `script.js` | Общая логика: переводы, навигация, переключатель языков |

## Локализация

### Система переводов (script.js)

**translations** — объект с двумя языками (`en`, `ru`). Ключи имеют префикс по секции:

```
nav.*          — навигация
hero.*         — hero-секция
apps.*         — секция приложений
about.*        — секция "почему GitHub"
stats.*        — статистика (разные ключи для index и advertisers)
donate.*       — пожертвования
advertisers.*  — advertisers page hero
hash-calc.*    — калькулятор хэшей
strategy.*     — стратегия
architecture.* — архитектура
footer.*       — футер
meta.*         — title и description
```

### Переключение языков

- Кнопки EN/RU в `.lang-switch`
- `data-i18n="ключ"` — текстовый контент
- `data-i18n-html="ключ"` — контент с HTML-разметкой
- `data-lang-only="ru"` — показать только на русском (SBP QR)

### Навигация

Генерируется динамически из `navConfig`:

```js
navConfig = {
  home: [...],       // index.html
  advertisers: [...] // advertisers.html
}
```

Функция `renderNav(page, lang)` создаёт ссылки и добавляет `.lang-switch`.

### Язык по умолчанию

- **index.html** — системный язык (или сохранённый в localStorage)
- **advertisers.html** — всегда русский (ru)

## Секции index.html

1. **Hero** — заголовок + кнопки
2. **Apps** — SolSIP + SolAgent (карточки)
3. **About** — 3 преимущества
4. **Stats** — загруз APK + промо
5. **Donate** — SBP (только RU) + DonationAlerts

## Секции advertisers.html

1. **Hero** — "Для рекламодателей"
2. **Hash Calculator** — расчёт SHA256
3. **Strategy** — 4 карточки стратегии
4. **Architecture** — 4 компонента системы
5. **Stats** — статистика рекламной кампании

## Статика

| Папка/файл | Назначение |
|-----------|-----------|
| `assets/` | Иконки, favicon, QR-код СБП |
| `assets/promo/` | Промо-изображения |
| `docs/` | Документация |
| `promo/` | JSON-конфиги рекламных кампаний |

## Зависимости

- Нет внешних зависимостей (чистый HTML/CSS/JS)
- Google Fonts (Inter) — подключается через CDN
