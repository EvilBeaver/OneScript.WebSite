# OneScript.WebSite — руководство для агентов

Официальный сайт [OneScript](https://oscript.io): документация, синтакс-помощник, страницы скачивания релизов. Репозиторий состоит из двух подпроектов — **frontend** (VitePress) и **backend** (OneScript). В продакшене бэкенд раздаёт собранный фронтенд и обрабатывает API/скачивания.

## Структура репозитория

```
OneScript.WebSite/
├── frontend/                 # VitePress-сайт
│   ├── .vitepress/
│   │   ├── config.mts        # конфигурация VitePress (навигация, sidebar, outDir)
│   │   └── theme/            # кастомная тема, Vue-компоненты, стили
│   ├── docs/                 # исходники страниц (srcDir)
│   │   ├── index.md          # главная
│   │   ├── learn/            # раздел «Изучить»
│   │   ├── downloads/        # раздел «Скачать» (включая динамический архив)
│   │   ├── syntax/           # синтакс-помощник (~200+ .md, toc в vitepress-toc.json)
│   │   ├── community/        # раздел «Сообщество»
│   │   ├── components/       # Vue-компоненты, встраиваемые в markdown
│   │   ├── shared/           # общие TypeScript-типы и утилиты
│   │   └── public/           # статика (логотипы, изображения)
│   └── package.json
├── backend/                  # HTTP-сервер на OneScript
│   ├── src/
│   │   ├── main.os           # точка входа
│   │   ├── autumn-properties.json  # конфиг (порт, каталоги)
│   │   ├── Классы/           # DI-компоненты (autumn)
│   │   └── Модули/           # общие процедуры
│   ├── data/
│   │   ├── appsettings.json
│   │   └── wwwroot/          # сюда VitePress кладёт сборку (outDir по умолчанию)
│   ├── files/                # данные релизов (не в git, монтируется на сервере)
│   ├── packagedef            # зависимости opm
│   └── Dockerfile
├── .cursor/skills/           # навыки Cursor для типовых задач
├── deploy/                   # сниппет compose для wwwroot-тома, скрипт проверки деплоя
├── Jenkinsfile               # CI: сборка фронта → публикация в том → Docker-образ бэка
└── .vscode/launch.json       # отладка backend
```

## Как связаны frontend и backend

1. **Сборка:** `npm run docs:build` в `frontend/` генерирует статику в `backend/data/wwwroot` (переопределяется через `VITEPRESS_OUT`).
2. **Запуск:** бэкенд слушает порт **3030**, раздаёт `wwwroot` как статику и обрабатывает динамические маршруты.
3. **Данные релизов:** каталог `backend/files/` (в конфиге — `filesDir`) содержит дистрибутивы и markdown-описания версий. На сервере это каталог `oscript.io` внутри named volume `os_web_content`, смонтированного в контейнер как `/var/www` (путь в контейнере — `/var/www/oscript.io`).

### Маршруты бэкенда

| Маршрут | Назначение |
|---------|------------|
| `/api/archive` | JSON-список версий (`?all=true` — включая спецкаталоги) |
| `/api/archive/{version}` | JSON со файлами конкретной версии |
| `/api/archive/{version}/md` | markdown-описание релиза |
| `/downloads/{version}/{type}` | скачивание дистрибутива (разрядность — сегмент пути или `?bitness=`) |
| `/downloads/{version}/{subdir}/{filename}` | прямое скачивание по пути к файлу |
| всё остальное | статика из `wwwroot` (VitePress) + fallback на `index.html` |

Цепочка обработчиков (autumn, middleware): `Роутер` → `ОбработчикApi` / `ОбработчикСкачивания` → `ОбработчикИндексХтмл` → статические файлы.

## Backend (OneScript)

- **Фреймворк:** [autumn](https://github.com/oscript-library/autumn) (DI, жизненный цикл приложения).
- **Точка входа:** `backend/src/main.os` → `Поделка` → `Стартер` → `Бэкенд.Старт()`.
- **Веб-сервер:** `ВебСервер` с цепочкой обработчиков запросов.

### Ключевые классы

| Класс | Роль |
|-------|------|
| `Бэкенд` | Запуск `ВебСервер`, регистрация обработчиков |
| `Роутер` | Разбор URL, маршрутизация в `api` / `downloads` |
| `ОбработчикApi` | REST API архива версий |
| `ОбработчикСкачивания` | Отдача файлов дистрибутивов |
| `ОбработчикИндексХтмл` | SPA-fallback: `index.html` для clean URLs |
| `АрхивВерсий` | Сканирование каталогов версий, semver-сортировка |
| `ФабрикаВерсий` | Состав файлов версии по манифестам дистрибутивов |
| `КаталогиДанных` | Пути к `files`, `wwwroot`, `download/versions` |

### Зависимости (packagedef)

`autumn`, `autumn-logos`, `semver`.

### Конфигурация

- `backend/src/autumn-properties.json` — порт (`server.port`: 3030), каталоги (`filesDir`, `server.rootDir`).
- Переменные окружения в Docker: `filesDir`, `server_root`.

### Локальная разработка

```bash
cd frontend && npm install && npm run docs:dev    # фронт на :5173
cd backend && oscript src/main.os                  # бэк на :3030 (нужен собранный wwwroot)
```

Отладка — конфигурации в `.vscode/launch.json` (тип `oscript`, cwd `backend`).

## Frontend (VitePress)

- **Конфиг:** `frontend/.vitepress/config.mts`
- **Тема:** `frontend/.vitepress/theme/` — кастомный `Layout.vue`, компоненты главной (`CustomHero`, `LogoCarousel`, `InfoBlock`), Яндекс.Метрика.
- **Язык:** русский (`lang: ru-RU`).

### Разделы контента (`docs/`)

| Раздел | Путь | Описание |
|--------|------|----------|
| Изучить | `learn/` | Уроки, установка, настройка |
| Скачать | `downloads/` | Страницы релизов; архив — динамические маршруты |
| Синтакс-помощник | `syntax/` | Справка по API OneScript; sidebar из `vitepress-toc.json` |
| Сообщество | `community/` | Участие, авторы |

### Vue-компоненты в markdown (`docs/components/`)

| Компонент | Использование |
|-----------|---------------|
| `Releases` | Таблица файлов версии (запрос к `/api/archive/{version}`) |
| `Archive` | Список версий архива |
| `ReleaseDocs` | Markdown-описание релиза |
| `LogoGrid` | Сетка логотипов (enterprise) |
| `Donations`, `Authors` | Прочие блоки |

### Динамические страницы архива

`downloads/archive/[version].md` + `[version].paths.ts` — при сборке генерирует страницы для каждой версии. Источник списка версий:

- `VITEPRESS_BACKEND_HOST` — REST с работающего бэка (`/api/archive`);
- `VITEPRESS_FILES_DIR` — чтение `markdown/versions/*.md` напрямую (используется в Jenkins).

### Скрипты

См. `frontend/package.json`: `docs:dev`, `docs:build`, `docs:preview`.

## CI/CD

`Jenkinsfile`:

1. **Build content** — Node.js, `npm install && npm run docs:build` в `frontend/` (с `VITEPRESS_FILES_DIR`); результат в `backend/data/wwwroot`, затем `stash`.
2. **Publish content** — `unstash`, атомарная публикация сборки в named volume `wwwroot` через docker-сокет агента (`tar` → временный `alpine` + `rsync --delete-after`). Контейнер сайта не пересоздаётся.
3. **Create container** — `unstash`, `docker buildx build` образа `oscript/backend` из `backend/` (образ остаётся самодостаточным для развёртывания с нуля).

### Деплой сайта (docker-compose и Jenkins)

Статика VitePress и страницы архива версий лежат **не в образе**, а в **named volume** `wwwroot`, смонтированном в контейнер сайта. После первого запуска пересборка образа `oscript/backend` содержимое тома **не** обновляет — актуальный фронт публикует пайплайн (стадия **Publish content**). Контейнер сайта при обычном деплое **не пересоздают**.

#### Что смонтировать в docker-compose

Эталонный фрагмент: [`deploy/docker-compose.wwwroot-volume.example.yml`](deploy/docker-compose.wwwroot-volume.example.yml). У сервиса сайта нужны **два** тома/монтирования:

| Монтирование | Тип | Путь в контейнере | Назначение |
|--------------|-----|-------------------|------------|
| `wwwroot` | named volume | `/app/data/wwwroot` | Собранный VitePress (обновляется Jenkins) |
| `os_web_content` | named volume | `/var/www` | Релизы OneScript. Внутри тома каталог `oscript.io` (в контейнере `/var/www/oscript.io`): дистрибутивы и `markdown/versions/*.md` |

В секции `volumes` compose объявить тома:

```yaml
volumes:
  wwwroot:
  os_web_content:
    external: true
```

Том `os_web_content` уже существует на хосте Docker (его же монтирует Jenkins). Каталог релизов — `oscript.io` внутри тома, в контейнере это `/var/www/oscript.io`.

Имя тома **на хосте** Docker формирует как `<имя_проекта_compose>_wwwroot` (например, при `COMPOSE_PROJECT_NAME=oscript` — `oscript_wwwroot`). Узнать: `docker volume ls | grep wwwroot`.

#### Переменные окружения контейнера сайта

Задаются в compose или в образе (см. [`backend/Dockerfile`](backend/Dockerfile)):

| Переменная | Типичное значение | Назначение |
|------------|-------------------|------------|
| `filesDir` | `/var/www/oscript.io` | Каталог `oscript.io` внутри тома `os_web_content` (путь в контейнере; API архива, скачивания) |
| `server_root` | `/app/data` | Корень данных сервера; внутри — `wwwroot/` |

Порт по умолчанию **3030** (`server.port` в `autumn-properties.json`).

#### Требования к Jenkins

- Агент с меткой **`linux`** и доступом к **docker-сокету** хоста (как для стадии `Create container`).
- Стадия **Build content** — контейнер `node:lts-alpine3.20` с той же меткой `linux`; том `os_web_content` монтируется в `/var/www` (`args: -v os_web_content:/var/www`). `VITEPRESS_FILES_DIR=/var/www/oscript.io` — путь к каталогу `oscript.io` внутри этого тома.

Переменные в **`Jenkinsfile`** (при необходимости подстроить под сервер):

| Переменная | Где | Значение | Назначение |
|------------|-----|----------|------------|
| `VITEPRESS_FILES_DIR` | стадия Build content | `/var/www/oscript.io` | Путь внутри тома `os_web_content`: список версий для страниц архива при `docs:build` |
| `WWWROOT_VOLUME` | стадия Publish content | имя тома с хоста, напр. `oscript_wwwroot` | Куда `rsync` кладёт сборку; **должно совпадать** с `docker volume ls` |

После смены имени проекта compose обновите `WWWROOT_VOLUME` в репозитории.

#### Первичная настройка инфраструктуры (один раз)

1. В compose сервиса сайта добавить volume `wwwroot` → `/app/data/wwwroot` и том `os_web_content` → `/var/www` (см. таблицу выше).
2. Релизы лежат в томе `os_web_content`, в каталоге `oscript.io` (в контейнере `/var/www/oscript.io`).
3. Запустить или пересоздать контейнер сайта с новым монтированием. Если том **пустой**, Docker при первом старте **скопирует** в него `wwwroot` из образа.
4. Зафиксировать полное имя тома: `docker volume inspect <имя>`.
5. В [`Jenkinsfile`](Jenkinsfile) выставить `WWWROOT_VOLUME` в это имя.
6. Если перед сайтом reverse proxy — для HTML отключить агрессивное кеширование (`Cache-Control: no-cache` для `*.html`), иначе новые страницы архива могут не появиться сразу.

#### Обычный деплой (релиз OneScript или правки сайта)

1. Положить новый релиз в том `os_web_content`, каталог `oscript.io` (в контейнере `/var/www/oscript.io`) — API и скачивания обновятся **без** пересборки фронта.
2. Запустить пайплайн Jenkins (push в репозиторий или вручную):
   - **Build content** — собирает фронт со списком версий из `VITEPRESS_FILES_DIR`, пишет в `backend/data/wwwroot`, `stash`.
   - **Publish content** — публикует сборку в named volume; **контейнер сайта не трогать**.
   - **Create container** — пересобирает образ `oscript/backend` (для новых инсталляций и обновления кода бэкенда); на уже работающий том статики **не влияет**.

Ручной `docker compose up -d --force-recreate` для сайта после каждого релиза **не требуется**.

#### Проверка после публикации

На сервере:

```bash
chmod +x deploy/verify-wwwroot-publish.sh
./deploy/verify-wwwroot-publish.sh <WWWROOT_VOLUME> <токен_версии> https://oscript.io
```

Токен версии в URL архива — как в каталогах (например `2_9_3` для `2.9.3`).

#### Поток данных

```
named volume os_web_content
  oscript.io/  →  в контейнере /var/www/oscript.io
       ↑ -v os_web_content:/var/www     Jenkins: VITEPRESS_FILES_DIR
       │                                      ↓
контейнер сайта ── API/downloads    Build content → backend/data/wwwroot
       ↑                                      ↓
named volume wwwroot  ←── Publish content (rsync, docker run + alpine)
  /app/data/wwwroot
```

## Навыки Cursor

| Навык | Когда использовать |
|-------|-------------------|
| `.cursor/skills/new-logo/SKILL.md` | Добавление логотипа компании на главную и страницу enterprise |

## Соглашения при правках

- **Минимальный diff** — не трогать несвязанный код.
- **Фронтенд:** новые страницы — в соответствующий раздел `docs/`; sidebar — в `config.mts`; синтакс-помощник — новые `.md` в `syntax/` + обновление `vitepress-toc.json`.
- **Логотипы:** единый источник — `frontend/.vitepress/theme/components/logos.ts`; PNG — в `frontend/docs/public/logos/`.
- **Бэкенд:** новые маршруты — через цепочку обработчиков в `Роутер` + новый или существующий обработчик; DI-аннотации autumn (`&Желудь`, `&Пластилин`, `&Порядок`).
- **Игнорируемые каталоги** (`.gitignore`): `backend/data/wwwroot`, `backend/files`, `frontend/.vitepress/cache`, `frontend/.vitepress/dist`, `oscript_modules`.
