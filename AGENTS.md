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
3. **Данные релизов:** каталог `backend/files/` (в конфиге — `filesDir`) содержит дистрибутивы и markdown-описания версий. На сервере монтируется как `/var/www/oscript.io`.

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

### Деплой wwwroot без пересоздания контейнера

В продакшене собранный фронтенд (`backend/data/wwwroot`) **не** обновляется пересборкой образа после первого старта. Каталог вынесен в named volume, смонтированный в `/app/data/wwwroot` контейнера сайта.

**Настройка на сервере (один раз):** фрагмент compose — [`deploy/docker-compose.wwwroot-volume.example.yml`](deploy/docker-compose.wwwroot-volume.example.yml). Имя тома на хосте: `<compose_project>_wwwroot` (`docker volume ls`). Переменная `WWWROOT_VOLUME` в `Jenkinsfile` должна совпадать с этим именем.

**Поток данных:**

```
Jenkins (Build content) → backend/data/wwwroot
       → Publish content → named volume wwwroot → контейнер сайта (/app/data/wwwroot)
```

При первом монтировании пустого тома Docker копирует в него `wwwroot` из образа. Дальнейшие обновления — только через стадию **Publish content**.

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
