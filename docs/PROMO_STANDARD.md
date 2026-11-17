# Promo JSON Standard

## Структура каталога

```
promo/
├── WORLD.json                           # Глобальный fallback
├── {CC}.json                            # Уровень страны (напр. RU.json)
└── {CC}/
    ├── {REGION}.json                    # Уровень региона (напр. 499.json)
    └── {REGION}/
        ├── {CITY}.json                  # Уровень города (напр. 1234.json)
        └── {POSTAL_CODE}.json           # Уровень почтового индекса (напр. 344900.json)
```

**Каскад загрузки:** `postal_code → city → region → country → WORLD`

## Формат JSON

```json
{
  "level": "city",
  "country_code": "RU",
  "region_code": "499",
  "city_id": "1234",
  "region_name": "Самарская область",
  "city_name": "Тольятти",
  "items": [
    {
      "id": "уникальный-id-слота",
      "placement_from": "2026-01-01T00:00:00Z",
      "placement_to": "2027-01-01T00:00:00Z",
      "external_url": "https://внешний-сайт",
      "emoji_button_text": "🎞️",
      "emoji_size_sp": 45,
      "emoji_mirrored": false,
      "emoji_horizontal_offset": 0,
      "themes": {
        "light": {
          "portrait_img": "https://...",
          "portrait_sha256": "hex",
          "landscape_img": "https://...",
          "landscape_sha256": "hex",
          "alpha": 0.25,
          "color": "#808080"
        },
        "dark": {
          "portrait_img": "https://...",
          "portrait_sha256": "hex",
          "landscape_img": "https://...",
          "landscape_sha256": "hex",
          "alpha": 0.25,
          "color": "#808080"
        }
      }
    }
  ]
}
```

## Поля уровня

| Поле | Тип | Описание |
|------|-----|----------|
| `level` | string | Уровень: `city`, `region`, `country`, `WORLD` |
| `country_code` | string | ISO код страны (напр. "RU") |
| `region_code` | string | ID региона Sypex Geo (только для `level: "region"` и ниже) |
| `city_id` | string | ID города Sypex Geo (только для `level: "city"`) |
| `region_name` | string | Название региона для отображения (напр. "Самарская область") |
| `city_name` | string | Название города для отображения (напр. "Тольятти") |

> **Примечание:** `region_name` и `city_name` используются для визуализации в интерфейсе. В JSON на сервере они не обязательны, но рекомендуются для отладки и отображения в Promo-окне приложения.

## Поля записи (`items[]`)

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | string | Уникальный id рекламной записи |
| `placement_from` | string | Дата начала показа (UTC, ISO 8601, напр. `2026-01-01T00:00:00Z`). Пустая строка = без ограничения |
| `placement_to` | string | Дата окончания показа (UTC, ISO 8601). Пустая строка = без ограничения |
| `external_url` | string | Внешний URL для рекламного баннера (открывается в браузере) |
| `emoji_button_text` | string | Текст/эмодзи кнопки открытия рекламы (по умолчанию `🎞️`) |
| `emoji_size_sp` | int | Размер шрифта эмодзи в sp (по умолчанию `45`) |
| `emoji_mirrored` | bool | Отразить эмодзи горизонтально (по умолчанию `false`) |
| `emoji_horizontal_offset` | int | Горизонтальное смещение эмодзи в px (по умолчанию `0`) |
| `themes.light` / `themes.dark` | object | Оформление для светлой/тёмной темы |

### Выбор рекламного слота

При нескольких items в массиве приложение выбирает **первый актуальный**:
- Актуальный = `placement_from` пустой **или** `<= now` **И** `placement_to` пустой **или** `>= now`
- Если ни один item не актуален — используется первый item из списка (fallback)
- `placement_from` и `placement_to` в UTC формате

### Поля темы

| Поле | Тип | Описание |
|------|-----|----------|
| `portrait_img` | string | URL портретного изображения |
| `portrait_sha256` | string | SHA-256 хеш портрета (hex) |
| `landscape_img` | string | URL альбомного изображения |
| `landscape_sha256` | string | SHA-256 хеш альбома (hex) |
| `alpha` | float | Прозрачность: `0.0` (прозрачная) — `1.0` (непрозрачная) |
| `color` | string | Hex-цвет оверлея (напр. `#808080`) |

> **Важно:** Поле `valid_until` **не используется** в приложении. Поле `brightness` **не используется**.

## Значения по умолчанию (из Promo-окна)

| Параметр | Light | Dark | Значение по умолчанию |
|-----------|-------|------|---------------------|
| `alpha` | ✓ | ✓ | `0.25` |
| `color` | ✓ | ✓ | `#808080` |
| `emoji_button_text` | — | — | `🎞️` |
| `emoji_size_sp` | — | — | `45` |
| `emoji_mirrored` | — | — | `false` |
| `emoji_horizontal_offset` | — | — | `0` |

## Пример: WORLD.json

```json
{
  "level": "WORLD",
  "items": [
    {
      "id": "world-default-donate",
      "placement_from": "",
      "placement_to": "",
      "external_url": "https://solplatform.github.io/#donate",
      "emoji_button_text": "🎞️",
      "emoji_size_sp": 45,
      "emoji_mirrored": false,
      "emoji_horizontal_offset": 0,
      "themes": {
        "light": {
          "portrait_img": "https://solplatform.github.io/assets/promo/world-light-portrait.webp",
          "portrait_sha256": "REPLACE_WITH_SHA256",
          "landscape_img": "https://solplatform.github.io/assets/promo/world-light-landscape.webp",
          "landscape_sha256": "REPLACE_WITH_SHA256",
          "alpha": 0.25,
          "color": "#808080"
        },
        "dark": {
          "portrait_img": "https://solplatform.github.io/assets/promo/world-dark-portrait.webp",
          "portrait_sha256": "REPLACE_WITH_SHA256",
          "landscape_img": "https://solplatform.github.io/assets/promo/world-dark-landscape.webp",
          "landscape_sha256": "REPLACE_WITH_SHA256",
          "alpha": 0.25,
          "color": "#808080"
        }
      }
    }
  ]
}
```
