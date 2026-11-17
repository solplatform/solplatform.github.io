# Рекламная конфигурация (каскад файлов + список записей с датой окончания)

Базовый адрес:

```
https://solplatform.github.io/promo/
```

## Как приложение запрашивает данные

По кодам геолокации (страна / регион / город) приложение делает запросы **по очереди**, пока не получит ответ 200:

1. `/promo/{CC}/{RegionId}/{CityId}/{PostalCode}.json`
2. `/promo/{CC}/{RegionId}/{CityId}.json`
3. `/promo/{CC}/{RegionId}.json`
4. `/promo/{CC}.json`
5. `/promo/WORLD.json`

Пример для Тольятти, Самарская область, Россия (RegionId=499, CityId=1234):

```
https://solplatform.github.io/promo/RU/499/1234.json
https://solplatform.github.io/promo/RU/499.json
https://solplatform.github.io/promo/RU.json
https://solplatform.github.io/promo/WORLD.json
```

Имена папок — **числовые ID** из Sypex Geo (RegionId, CityId).

## Формат файла

В файле **нет цен**. Цены согласуются с рекламодателем вручную, в JSON не передаются.

```json
{
  "level": "city",
  "country_code": "RU",
  "region_code": "499",
  "city_id": "1234",
  "items": [
    {
      "id": "уникальный-id-слота",
      "placement_from": "2026-01-01T00:00:00Z",
      "placement_to": "2027-01-01T00:00:00Z",
      "external_url": "https://внешний-сайт",
      "themes": {
        "light": {
          "portrait_img": "https://...webp",
          "portrait_sha256": "hex",
          "landscape_img": "https://...webp",
          "landscape_sha256": "hex",
          "alpha": 0.45,
          "brightness": 0.05
        },
        "dark": {
          "portrait_img": "https://...webp",
          "portrait_sha256": "hex",
          "landscape_img": "https://...webp",
          "landscape_sha256": "hex",
          "alpha": 0.25,
          "brightness": -0.20
        }
      }
    }
  ]
}
```

### Поля записи (`items[]`)

| Поле | Смысл |
|------|--------|
| `id` | Уникальный id рекламной записи |
| `placement_from` | Дата начала показа (UTC, ISO-8601). Пустая строка = без ограничения |
| `placement_to` | Дата окончания показа (UTC, ISO-8601). Пустая строка = без ограничения |
| `external_url` | Внешний URL для рекламного баннера (открывается в браузере) |
| `themes.light` / `themes.dark` | Картинки и оформление для светлой и тёмной темы |
| `portrait_*` / `landscape_*` | Портрет / альбом + SHA-256 |
| `alpha` | Прозрачность 0.0–1.0 |

### Поля уровня (корневой объект)

| Поле | Смысл |
|------|--------|
| `level` | Уровень: `city`, `region`, `country`, `WORLD` |
| `country_code` | ISO код страны (напр. "RU") |
| `region_code` | Числовой ID региона Sypex Geo (напр. "499") |
| `city_id` | Числовой ID города Sypex Geo (напр. "1234") |

### Что делает приложение

1. Берёт первый успешный JSON по каскаду.
2. Фильтрует записи по `placement_from` / `placement_to` — показывает все актуальные по очереди при каждом запуске.
3. Скачивает картинку, считает SHA-256; при несовпадении — заглушка «донат», не партнёрский баннер.
4. Учитывает «скрыть рекламу на 24 часа».

## Как посчитать SHA-256 картинки

```bash
sha256sum assets/promo/banner.webp
```

Полученную строку вписать в `portrait_sha256` или `landscape_sha256`.

## Структура папок

```
promo/
├── RU.json                    # Страновой уровень
├── RU/
│   ├── 499.json               # Регион (RegionId=499 — Самарская область)
│   └── 499/
│       └── 1234.json          # Город (CityId=1234 — Тольятти)
└── WORLD.json                 # Глобальный fallback
```

Папки создаются по числовым ID из Sypex Geo. Для нового региона/города — создаётся папка с соответствующим ID.
