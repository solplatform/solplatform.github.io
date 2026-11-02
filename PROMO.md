# Рекламная конфигурация (каскад файлов + список записей с датой окончания)

Базовый адрес:

```
https://solplatform.github.io/promo/
```

## Как приложение запрашивает данные

По кодам геолокации (страна / регион / город) приложение делает запросы **по очереди**, пока не получит ответ 200:

1. `/promo/{страна}/{регион}/{город}.json`
2. `/promo/{страна}/{регион}.json`
3. `/promo/{страна}.json`
4. `/promo/WORLD.json`

Пример для Тольятти, Самарская область, Россия:

```
https://solplatform.github.io/promo/RU/SAM/Tolyatti.json
https://solplatform.github.io/promo/RU/SAM.json
https://solplatform.github.io/promo/RU.json
https://solplatform.github.io/promo/WORLD.json
```

Имена папок и файлов — **латиницей** (Tolyatti, SAM), чтобы URL были простыми.

## Формат файла

В файле **нет цен**. Цены согласуются с рекламодателем вручную, в JSON не передаются.

```json
{
  "level": "city",
  "country_code": "RU",
  "region_code": "SAM",
  "city": "Tolyatti",
  "items": [
    {
      "id": "уникальный-id-слота",
      "valid_until": "2026-12-31T23:59:59Z",
      "link_url": "https://сайт-партнёра",
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
| `valid_until` | До какой даты/времени (UTC, ISO-8601) запись действует |
| `link_url` | Куда вести по кнопке «Перейти» |
| `themes.light` / `themes.dark` | Картинки и оформление для светлой и тёмной темы |
| `portrait_*` / `landscape_*` | Портрет / альбом + SHA-256 |
| `alpha` | Прозрачность 0.0–1.0 |
| `brightness` | Сдвиг яркости примерно −1.0…1.0 |

### Что делает приложение

1. Берёт первый успешный JSON по каскаду.
2. Выкидывает записи с `valid_until` в прошлом.
3. Само решает, какую из оставшихся показать.
4. Скачивает картинку, считает SHA-256; при несовпадении — заглушка «донат», не партнёрский баннер.
5. Учитывает «скрыть рекламу на 24 часа».

## Как посчитать SHA-256 картинки

```bash
sha256sum assets/promo/banner.webp
```

Полученную строку вписать в `portrait_sha256` или `landscape_sha256`.
