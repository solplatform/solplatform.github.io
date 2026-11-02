# Promo config (cascade of small files)

Base URL:

```
https://solplatform.github.io/promo/
```

## App algorithm

Given `countryCode`, `region`, `city` from geo IP:

1. `GET /promo/{CC}/{REG}/{City}.json`  → if 200, use it
2. `GET /promo/{CC}/{REG}.json`         → if 200, use it
3. `GET /promo/{CC}.json`               → if 200, use it
4. `GET /promo/WORLD.json`              → default

Example for Tolyatti, Samara region, Russia:

```
https://solplatform.github.io/promo/RU/SAM/Tolyatti.json
https://solplatform.github.io/promo/RU/SAM.json
https://solplatform.github.io/promo/RU.json
https://solplatform.github.io/promo/WORLD.json
```

Only one small JSON is applied (first success). Typical size: a few KB.

## File format (each leaf)

```json
{
  "level": "city",
  "country_code": "RU",
  "region_code": "SAM",
  "city": "Tolyatti",
  "items": [
    {
      "id": "tolyatti-partner-example",
      "valid_until": "2026-12-31T23:59:59Z",
      "link_url": "...",
      "price_per_day_rub": 50.0,
      "themes": { "light": {...}, "dark": {...} }
    }
  ]
}
```

`price_per_day_usd` is used on WORLD; RUB on RU levels.

## SHA-256 for images

```bash
sha256sum assets/promo/banner.webp
```

Paste into `portrait_sha256` / `landscape_sha256`. Mismatch → app shows built-in donation placeholder.

## City names

Use ASCII folder/file names (e.g. `Tolyatti`, not `Тольятти`) so URLs stay simple. Map Cyrillic from ip-api to these keys in the app if needed.
