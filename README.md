# solplatform.github.io

SolPlatform — сайт для скачивания приложений

## Documentation

All project documentation lives in `docs/`. Keep it up to date:
- `docs/PROMO_ARCHITECTURE.md` — promo system architecture (JSON cascade)
- `docs/STRUCTURE.md` — project structure
- `docs/LOCALIZATION.md` — localization guide

## Promo System

Promo JSON files served from `/promo/` directory. Android app loads with cascade resolution (deepest match wins).

**Structure:**
```
promo/
  WORLD.json                          ← fallback for all countries
  RU.json                             ← country level
  RU/499.json                         ← region level (by ID)
  RU/499/Tolyatti.json               ← city level
  RU/499/Tolyatti/344900.json        ← postal code level
```

**Cascade priority (deepest match wins):**
1. `promo/{CC}/{REG}/{City}/{PostalCode}.json`
2. `promo/{CC}/{REG}/{City}.json`
3. `promo/{CC}/{REG}.json`
4. `promo/{CC}.json`
5. `promo/WORLD.json`

**JSON format:**
```json
{
  "level": "city",
  "country_code": "RU",
  "region_code": "499",
  "city": "Tolyatti",
  "items": [...]
}
```

Full architecture: see `docs/PROMO_ARCHITECTURE.md` (shared with xmobile/android).
