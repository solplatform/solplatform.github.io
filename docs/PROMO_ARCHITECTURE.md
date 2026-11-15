# Promo System — Реализация и тестирование

## 1. Файлы и изменения

### 1.1 solplatform.github.io

| Файл | Что |
|------|-----|
| `promo/WORLD.json` | Фоллбэк для всех стран |
| `promo/RU.json` | Уровень страны |
| `promo/RU/SAM.json` | Уровень региона |
| `promo/RU/SAM/Tolyatti.json` | Уровень города |
| `promo/RU/SAM/Tolyatti/344900.json` | Уровень почтового индекса |
| `README.md` | Описание структуры promo JSON |
| `docs/PROMO_ARCHITECTURE.md` | Копия общей документации |

**Формат JSON:**
```json
{
  "level": "city",
  "country_code": "RU",
  "region_code": "SAM",
  "city": "Tolyatti",
  "items": [ { "id": "...", "valid_until": "...", "link_url": "...", "themes": { "light": {...}, "dark": {...} } } ]
}
```

### 1.2 xmobile-admin

| Файл | Что |
|------|-----|
| `internal/api/promo_stats.go` | In-memory accumulator, daily flush, endpoints |
| `internal/api/api.go` | Регистрация endpoints `GET /v1/admin/promo/request`, `POST /v1/admin/promo/flush`, поле `Promo *PromoStats` в Server |
| `internal/dnsquota/dnsquota.go` | Метод `SendPromoStats()` для отправки на xmobile-dns |
| `cmd/server/main.go` | Инициализация `NewPromoStats(cfg.DNSURL, cfg.DNSAccessHash, logger)` |
| `AGENTS.md` | Ссылка на docs/PROMO_ARCHITECTURE.md |
| `docs/PROMO_ARCHITECTURE.md` | Копия общей документации |

**Endpoints:**
- `GET /v1/admin/promo/request?country_code={ID}&region_code={ID}&city_id={ID}&postal_code={ZIP}&domain={DOMAIN}` — accumulate in memory
- `GET /v1/admin/promo/dump` (auth) — view current in-memory accumulator
- `POST /v1/admin/promo/flush` (auth) — manual flush trigger

**Flush schedule:** 00:00 local server time ± random(0..30) min jitter. Background ticker каждые 5 минут.

### 1.3 xmobile-dns

| Файл | Что |
|------|-----|
| `internal/store/store.go` | Таблица `promo_stats` в migrate(), методы `UpsertPromoStats()`, `WeeklyPromoStats()` |
| `internal/api/api.go` | Endpoints `POST /v1/admin/promo-stats`, `GET /v1/admin/promo-stats`, auth middleware, domain verify |
| `internal/config/config.go` | Поля `AccessHash`, `ServerPublicIP` для auth и domain verify |
| `AGENTS.md` | Ссылка на docs/PROMO_ARCHITECTURE.md |
| `docs/PROMO_ARCHITECTURE.md` | Копия общей документации |

**Endpoints:**
- `POST /v1/admin/promo-stats` (auth + domain verify) — receive aggregated daily stats
- `GET /v1/admin/promo-stats` (auth) — weekly aggregated stats

**Auth:** `ADMIN_ACCESS_HASH` env var. Header: `X-Admin-Token` или `Authorization: Bearer`.

**Domain verify:** каждый домен из flush проверяется DNS-lookup — должен резолвиться в `SERVER_PUBLIC_IP`.
- `domain=sip.xdexboard.com` → резолвится в `195.46.191.38` → **200 OK**
- `domain=example.com` → резолвится в `8.47.69.0` → **403 Forbidden**

### 1.4 Android (xmobile/android)

| Файл | Что |
|------|-----|
| `app/src/main/java/org/linphone/core/admin/AdminApiClient.kt` | Метод `sendPromoRequest()` — GET запрос на xmobile-admin |
| `app/src/main/java/org/linphone/ui/main/promo/PromoJsonLoader.kt` | Каскадный загрузчик JSON с solplatform.github.io |
| `app/src/main/java/org/linphone/ui/main/promo/viewmodel/PromoViewModel.kt` | Уже содержит geo cascade (countries/regions/cities), postal code сохранение |

**PromoJsonLoader:**
- Каскад: `postal_code > city > region > country > WORLD`
- Debug build: каждый запуск
- Prod build: кэш 24 часа в SharedPreferences (`promo_prefs`)

---

## 2. Тестирование

### 2.1 Тест promo request (xmobile-admin)

```bash
# На сервере:
curl -sk 'https://127.0.0.1:8092/v1/admin/promo/request?country_code=160&region_code=499068&city_id=482283&postal_code=344900&domain=test.solsip.com'

# Ожидаемый ответ:
# {"ok":true}
```

Проверка что данные накоплены (через flush):
```bash
# Ручной flush:
curl -sk -X POST 'https://127.0.0.1:8092/v1/admin/promo/flush' \
  -H 'Authorization: Bearer <admin_token>'

# Проверка логов:
journalctl -u xmobile-admin.service --since "5 min ago" | grep promo-stats
# Должно быть: "promo-stats: flushing X rows for 2026-11-14"
```

### 2.2 Тест приёма статистики (xmobile-dns)

```bash
# POST статистики:
curl -s -X POST 'https://dns.xdexboard.com/v1/admin/promo-stats' \
  -H 'X-Admin-Token: xmobile-xdexboard-lab-change-me' \
  -H 'Content-Type: application/json' \
  -d '{"rows":[{"stat_date":"2026-11-15","domain":"test.solsip.com","country_code":160,"region_code":499068,"city_id":482283,"postal_code":"344900","request_count":5}]}'

# Ожидаемый ответ:
# {"ok":true}

# GET недельной статистики:
curl -s 'https://dns.xdexboard.com/v1/admin/promo-stats' \
  -H 'X-Admin-Token: xmobile-xdexboard-lab-change-me'

# Ожидаемый ответ:
# {"rows":[...],"since":"2026-11-08","total":N,"until":"2026-11-15"}
```

### 2.3 Тест БД promo_stats

```bash
# На сервере:
sudo mysql -e 'DESCRIBE xmobile_dns.promo_stats;'
# Должно быть:
# id              bigint unsigned  NO  PRI  NULL  auto_increment
# stat_date       date             NO  MUL  NULL
# domain          varchar(253)     NO       NULL
# country_code    int unsigned     NO       0
# region_code     int unsigned     NO       0
# city_id         int unsigned     NO       0
# postal_code     varchar(20)      NO
# request_count   int unsigned     NO       0

sudo mysql -e 'SELECT * FROM xmobile_dns.promo_stats;'
# Должно показать накопленные данные
```

### 2.4 Тест каскада JSON (Android)

1. Включить Developer Settings в приложении (`showDeveloperSettings = true` по умолчанию)
2. Открыть Promo окно
3. В логах (logcat) искать `[Promo JSON]`:
   ```
   D/[Promo JSON]: Loading promo JSON: https://solplatform.github.io/promo/RU/SAM/Tolyatti/344900.json
   D/[Promo JSON]: HTTP 404 for ... — skipping
   D/[Promo JSON]: Loading promo JSON: https://solplatform.github.io/promo/RU/SAM/Tolyatti.json
   D/[Promo JSON]: Loaded promo JSON: level=city countryCode=RU
   ```
4. Если postal_code не указан — должен пропустить уровень postal и city, остановиться на region или country

### 2.5 Тест daily flush (xmobile-admin → xmobile-dns)

```bash
# Проверить jitter при старте:
journalctl -u xmobile-admin.service --since "1 hour ago" | grep "promo-stats: flush schedule"
# Должно быть: "promo-stats: flush schedule 00:00 ± 23 min (local), tick=5m"

# Ручной flush (для тестирования):
curl -sk -X POST 'https://127.0.0.1:8092/v1/admin/promo/flush' \
  -H 'Authorization: Bearer <admin_token>'

# Проверить что данные ушли на xmobile-dns:
journalctl -u xmobile-admin.service --since "1 min ago" | grep "promo-stats: flushed"
# Должно быть: "promo-stats: flushed X rows for 2026-11-14 successfully"

# Проверить что данные появились в БД xmobile-dns:
sudo mysql -e 'SELECT * FROM xmobile_dns.promo_stats ORDER BY id DESC LIMIT 5;'
```

### 2.6 Тест nginx проксирования

```bash
# Проверить что nginx проксирует promo-stats на xmobile-dns:
curl -s 'https://dns.xdexboard.com/v1/admin/promo-stats' \
  -H 'X-Admin-Token: xmobile-xdexboard-lab-change-me'

# Должно вернуть JSON, а не 404 от nginx

# Проверить конфиг:
sudo nginx -t
# syntax is ok, test is successful
```

### 2.7 Полная цепочка тестирования

```bash
# 1. Android отправляет promo request (через приложение или curl):
curl -sk 'https://sip.xdexboard.com:8092/v1/admin/promo/request?country_code=160&region_code=499068&city_id=482283&postal_code=344900&domain=test.solsip.com'

# 2. Flush (ручной или автоматический через 5 мин):
curl -sk -X POST 'https://sip.xdexboard.com:8092/v1/admin/promo/flush' \
  -H 'Authorization: Bearer <token>'

# 3. Проверить что xmobile-admin отправил на xmobile-dns:
journalctl -u xmobile-admin.service --since "1 min ago" | grep "promo-stats"

# 4. Проверить что xmobile-dns принял:
curl -s 'https://dns.xdexboard.com/v1/admin/promo-stats' \
  -H 'X-Admin-Token: xmobile-xdexboard-lab-change-me'

# 5. Проверить БД:
sudo mysql -e 'SELECT COUNT(*) FROM xmobile_dns.promo_stats;'
```

### 2.8 Очистка тестовых данных

```bash
sudo mysql -e 'DELETE FROM xmobile_dns.promo_stats; ALTER TABLE xmobile_dns.promo_stats AUTO_INCREMENT = 1;'
```

---

## 3. Окружение

| Компонент | Хост | Порт | Auth |
|-----------|------|------|------|
| xmobile-admin | `server@xdexboard.com` | `:8092` (HTTPS) | Admin token для flush |
| xmobile-dns | `server@xdexboard.com` | `:8091` (HTTPS) | `ADMIN_ACCESS_HASH` |
| Nginx (dns) | `dns.xdexboard.com` | `:443` | Проксирует `/v1/admin/promo-stats` |
| Nginx (admin) | `sip.xdexboard.com` | `:8092` | Проксирует на `127.0.0.1:8092` |

**Конфиги:**
- xmobile-admin: `/etc/xmobile/xmobile-admin.env`, `/etc/xmobile-dns-register.env`
- xmobile-dns: `/etc/xmobile-dns.env` (содержит `ADMIN_ACCESS_HASH`)
- Nginx dns: `/etc/nginx/sites-enabled/dns.xdexboard.com`
- Nginx admin: `/etc/nginx/sites-enabled/sip.xdexboard.com`

---

## 4. Тесты

### 4.1 Unit-тесты (Go)

Запуск всех тестов проекта:
```bash
cd C:\xampp\htdocs\Projects\xmobile-dns
go test ./... -count=1 -timeout 120s
```

Запуск только promo-тестов:
```bash
go test ./internal/api/ -v -count=1 -timeout 60s
go test ./internal/store/ -v -count=1 -timeout 60s
```

**xmobile-admin** (11 тестов):
- `TestParseUint32` — парсинг параметров (160, 0, max uint32, пустая строка, "abc")
- `TestPromoStats_Record` — accumulation: 2 запроса с одинаковым ключом → count=2
- `TestPromoStats_FlushDaily` — отправка 2 строк на mock-сервер
- `TestPromoStats_FlushDaily_NoEntries` — flush без данных → 0 HTTP-запросов
- `TestPromoStats_FlushDaily_FailDoesNotClear` — ошибка отправки → данные НЕ сбрасываются
- `TestPromoStats_FlushDaily_Idempotent` — повторный flush → no-op
- `TestHandlePromoRequest/*` — HTTP endpoints (full/missing domain/empty params)
- `TestHandlePromoFlush` — auth flush
- `TestHandlePromoDump` — GET dump returns in-memory state
- `TestPromoStats_Dump` — dump returns correct counts
- `TestPromoStatsRow_JSON` — marshal/unmarshal DNS-пэйлоада
- `TestSendPromoStats_Unconfigured` — unconfigured client → error

**xmobile-dns API** (12 тестов):
- `TestAuthMiddleware/*` — Bearer/X-Admin-Token, wrong/missing tokens
- `TestBearerToken/*` — парсинг заголовков (Bearer, X-Admin-Token, пробелы)
- `TestHandlePromoStats_BadJSON` — invalid JSON → 400
- `TestHandlePromoStats_EmptyRows` — empty rows → 200 OK
- `TestPromoStatsRequest_JSON` — marshal/unmarshal пэйлоада
- `TestPromoStatsRequest_UnknownField` — DisallowUnknownFields → error
- `TestVerifyDomainToServerIP/*` — domain verify (empty domain, empty server IP)
- `TestHandlePromoStats_DomainMismatch` — чужой домен → 403 Forbidden

### 4.2 Integration-тесты (MySQL)

Требуют подключения к тестовой БД `xmobile_dns_test` на сервере.

**Настройка:**
1. Скопировать пример конфига:
   ```bash
   cp .env.test.example .env.test
   ```
2. Заполнить `PROMO_TEST_MYSQL_DSN` в `.env.test` (PowerShell):
   ```powershell
   $env:PROMO_TEST_MYSQL_DSN="xmobile_dns_test:XmDnsT3st!2026`@tcp(192.168.1.187:3306)/xmobile_dns_test?parseTime=true&loc=UTC"
   ```
   - `192.168.1.187` — внутренний IP сервера (из локальной сети)
   - Для публичного доступа: `195.46.191.38` (требует SSH-туннель)
3. Тестовая БД и пользователь уже созданы на сервере:
   - БД: `xmobile_dns_test`
   - Пользователь: `xmobile_dns_test` / `XmDnsT3st!2026`

**Запуск:**
```powershell
cd C:\xampp\htdocs\Projects\xmobile-dns
# Запустить все тесты (unit + integration):
pwsh -Command "$env:PROMO_TEST_MYSQL_DSN='xmobile_dns_test:XmDnsT3st!2026`@tcp(192.168.1.187:3306)/xmobile_dns_test?parseTime=true&loc=UTC'; go test ./... -count=1 -timeout 120s"

# Или только integration-тесты:
pwsh -Command "$env:PROMO_TEST_MYSQL_DSN='xmobile_dns_test:XmDnsT3st!2026`@tcp(192.168.1.187:3306)/xmobile_dns_test?parseTime=true&loc=UTC'; go test ./internal/store/ -v -count=1 -timeout 120s"
```

**Тесты:**
- `TestUpsertPromoStats_EmptyRows` — пустые rows → nil error
- `TestUpsertPromoStats_WithRows` — bulk insert + ON DUPLICATE KEY UPDATE (merge counts)
- `TestWeeklyPromoStats_NoData` — пустой результат при отсутствии данных
- `TestWeeklyPromoStats_WithData` — агрегация: 2 вставки с одинаковым ключом → count=15
- `TestPromoStats_DuplicateKey_Uniqueness` — UNIQUE KEY constraint: 10+20=30

**Если `PROMO_TEST_MYSQL_DSN` не установлен** — интеграционные тесты автоматически пропускаются (`t.Skip`).

### 4.3 Android

```bash
cd C:\xampp\htdocs\Projects\xmobile\android
.\gradlew.bat compileSolsipDebugKotlin --no-daemon
```

### 4.4 Итоговая статистика

| Проект | Unit | Integration | Пропущено | Статус |
|--------|------|-------------|-----------|--------|
| xmobile-admin | 13 | — | 0 | ✅ Все PASS |
| xmobile-dns API | 12 | — | 0 | ✅ Все PASS |
| xmobile-dns store | 3 | 5 | 0 | ✅ Все PASS (с MySQL) |
| Android | — | — | — | ✅ BUILD SUCCESSFUL |

**Итого: 31 тест, 0 failed, 0 skipped (с MySQL)**

### 4.5 Проверка заполнения таблицы (production)

**Domain verify (anti-spoofing):**

При получении promo request xmobile-admin делает DNS-lookup домена из параметра `domain` и проверяет что он резолвится в IP сервера (`SERVER_PUBLIC_IP=195.46.191.38`).

- `domain=sip.xdexboard.com` → резолвится в `195.46.191.38` → **200 OK**
- `domain=example.com` → резолвится в `8.47.69.0` → **403 Forbidden**

Это защита от подмены домена: нельзя отправить promo request с чужим доменом.

**Быстрый чек-лист:**

```powershell
# 1. Посмотреть накопленное в памяти (без flush):
curl -sk 'https://sip.xdexboard.com:8092/v1/admin/promo/dump' \
  -H 'Authorization: Bearer <admin_token>'
# Ожидаем: {"rows":[{"stat_date":"2026-11-15","domain":"sip.xdexboard.com","country_code":160,"region_code":499,"city_id":1234,"postal_code":"344900","request_count":3}],"total":1}

# 2. Отправить promo request (имитация Android):
curl -sk 'https://sip.xdexboard.com:8092/v1/admin/promo/request?country_code=160&region_code=499&city_id=1234&postal_code=344900&domain=sip.xdexboard.com'
# Ожидаем: {"ok":true}

# 2. Отправить ещё один запрос с тем же ключом (проверка accumulation):
curl -sk 'https://sip.xdexboard.com:8092/v1/admin/promo/request?country_code=160&region_code=499&city_id=1234&postal_code=344900&domain=sip.xdexboard.com'

# 3. Отправить запрос с другим ключом:
curl -sk 'https://sip.xdexboard.com:8092/v1/admin/promo/request?country_code=160&region_code=500&city_id=5678&domain=sip.xdexboard.com'

# 4. Вызвать manual flush (не ждём 00:00):
curl -sk -X POST 'https://sip.xdexboard.com:8092/v1/admin/promo/flush' \
  -H 'Authorization: Bearer <admin_token>'

# 5. Ждём ~30 секунд (отправка на xmobile-dns) и проверяем БД:
ssh server@xdexboard.com "sudo mysql -e 'SELECT * FROM xmobile_dns.promo_stats ORDER BY id;'"
```

**Ожидаемый результат — 2 строки:**

```
+----+------------+----------------+---------------+-------------+--------+-------------+---------------+
| id | stat_date  | domain         | country_code  | region_code | city_id| postal_code | request_count |
+----+------------+----------------+---------------+-------------+--------+-------------+---------------+
|  1 | 2026-11-14 | sip.xdexboard.com|          160 |         499 |   1234 | 344900      |             2 |
|  2 | 2026-11-14 | sip.xdexboard.com|          160 |         500 |   5678 |             |             1 |
+----+------------+----------------+---------------+-------------+--------+-------------+---------------+
```

- `stat_date` = вчерашний день (flush отправляет данные за вчера)
- `sip.xdexboard.com` → `request_count=2` (два запроса с одинаковым ключом)
- `sip.xdexboard.com` → `request_count=1` (один запрос с другим ключом)

**Проверка что неверные данные не проходят:**

```powershell
# Запрос с чужим доменом → 403 Forbidden:
curl -sk -w "\nHTTP %{http_code}\n" 'https://sip.xdexboard.com:8092/v1/admin/promo/request?country_code=160&region_code=499&city_id=1234&postal_code=344900&domain=example.com'
# Ожидаем: HTTP 403

# Запрос без domain → 400 Bad Request:
curl -sk -w "\nHTTP %{http_code}\n" 'https://sip.xdexboard.com:8092/v1/admin/promo/request?country_code=160&region_code=499&city_id=1234&postal_code=344900'
# Ожидаем: HTTP 400

# Запрос с пустым domain → 400 Bad Request:
curl -sk -w "\nHTTP %{http_code}\n" 'https://sip.xdexboard.com:8092/v1/admin/promo/request?country_code=160&domain='
# Ожидаем: HTTP 400
```

**Проверка weekly stats:**

```powershell
curl -s 'https://dns.xdexboard.com/v1/admin/promo-stats' \
  -H 'X-Admin-Token: xmobile-xdexboard-lab-change-me'
# Ожидаем: {"rows":[...],"since":"2026-11-08","total":2,"until":"2026-11-15"}
```

**Проверка логов:**

```bash
# Jitter при старте:
journalctl -u xmobile-admin.service --since "1 hour ago" | grep "flush schedule"
# Должно быть: "promo-stats: flush schedule 00:00 ± 23 min (local), tick=5m"

# Ручной flush:
journalctl -u xmobile-admin.service --since "1 min ago" | grep "promo-stats"
# Должно быть: "promo-stats: flushing 2 rows for 2026-11-14"
# И: "promo-stats: flushed 2 rows for 2026-11-14 successfully"
```

**Автоматический flush (00:00 ± jitter):**

```bash
# Каждый tick (5 мин) проверяет: наступило ли время flush
# Jitter генерируется один раз при старте сервера
# Если flush не удался — данные НЕ сбрасываются, retry на следующий tick

# Проверить что flush прошёл автоматически:
journalctl -u xmobile-admin.service --since "yesterday" | grep "flushed.*successfully"
```

**Важно:** `stat_date` всегда = вчерашний день. Если flush сработал сегодня в 00:23, в БД попадёт дата `2026-11-14` (вчера).
