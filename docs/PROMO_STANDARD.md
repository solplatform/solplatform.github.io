# Promo JSON Standard

## Структура каталога

```
promo/
├── WORLD.json           # Глобальный fallback
├── {CC}.json            # Уровень страны (напр. RU.json)
└── {CC}/
    ├── {REGION}.json    # Уровень региона (напр. 499.json)
    └── {REGION}/
        └── {CITY}.json  # Уровень города (напр. 1234.json)
```

**Каскад загрузки:** `city → region → country → WORLD`

## Формат JSON

```json
{
  "level": "country",
  "country_code": "RU",
  "items": [
    {
      "id": "уникальный-id-слота",
      "valid_until": "2026-12-31T23:59:59Z",
      "link_url": "https://сайт-партнёра",
      "themes": {
        "light": {
          "portrait_img": "https://...",
          "portrait_sha256": "hex",
          "landscape_img": "https://...",
          "landscape_sha256": "hex",
          "alpha": 0.25,
          "brightness": 0.0
        },
        "dark": {
          "portrait_img": "https://...",
          "portrait_sha256": "hex",
          "landscape_img": "https://...",
          "landscape_sha256": "hex",
          "alpha": 0.25,
          "brightness": -0.15
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
| `region_code` | string | ID региона Sypex Geo (только для `level: "region"`) |
| `city_id` | string | ID города Sypex Geo (только для `level: "city"`) |

## Поля записи (`items[]`)

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | string | Уникальный id рекламной записи |
| `valid_until` | string | До какой даты/времени (UTC, ISO-8601) |
| `link_url` | string | Куда вести по кнопке «Перейти» |
| `themes.light` / `themes.dark` | object | Оформление для светлой/тёмной темы |

### Поля темы

| Поле | Тип | Описание |
|------|-----|----------|
| `portrait_img` | string | URL портретного изображения |
| `portrait_sha256` | string | SHA-256 хеш портрета (hex) |
| `landscape_img` | string | URL альбомного изображения |
| `landscape_sha256` | string | SHA-256 хеш альбома (hex) |
| `alpha` | float | Прозрачность: `0.0` (прозрачная) — `1.0` (непрозрачная) |
| `brightness` | float | Сдвиг яркости: `-1.0` (тёмнее) — `1.0` (светлее) |

## Значения по умолчанию (из Promo-окна)

| Параметр | Light | Dark |
|-----------|-------|------|
| `alpha` | 0.25 | 0.25 |
| `brightness` | 0.0 | -0.15 |

## Пример: WORLD.json

```json
{
  "level": "WORLD",
  "items": [
    {
      "id": "world-default-donate",
      "valid_until": "2099-12-31T23:59:59Z",
      "link_url": "https://solplatform.github.io/#donate",
      "themes": {
        "light": {
          "portrait_img": "https://solplatform.github.io/assets/promo/world-light-portrait.webp",
          "portrait_sha256": "REPLACE_WITH_SHA256",
          "landscape_img": "https://solplatform.github.io/assets/promo/world-light-landscape.webp",
          "landscape_sha256": "REPLACE_WITH_SHA256",
          "alpha": 0.25,
          "brightness": 0.0
        },
        "dark": {
          "portrait_img": "https://solplatform.github.io/assets/promo/world-dark-portrait.webp",
          "portrait_sha256": "REPLACE_WITH_SHA256",
          "landscape_img": "https://solplatform.github.io/assets/promo/world-dark-landscape.webp",
          "landscape_sha256": "REPLACE_WITH_SHA256",
          "alpha": 0.25,
          "brightness": -0.15
        }
      }
    }
  ]
}
```
