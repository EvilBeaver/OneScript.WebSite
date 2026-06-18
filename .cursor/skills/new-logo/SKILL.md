---
name: new-logo
description: >-
  Добавляет новый логотип компании на главную страницу (LogoCarousel) и страницу
  enterprise (LogoGrid). Запрашивает PNG-файл, URL и название компании, затем
  редактирует logos.ts. Используй, когда пользователь просит добавить логотип,
  новое лого, логотип компании на сайт или упоминает навык «Новое лого».
---

# Новое лого

Добавление логотипа компании на сайт OneScript. Единый источник данных — `frontend/.vitepress/theme/components/logos.ts`. После правки логотип автоматически появляется:

- на главной — `LogoCarousel.vue` импортирует `baseLogos`
- на странице enterprise — `LogoGrid.vue` (через `<LogoGrid />` в `enterprise.md`) импортирует `gridLogos`

**Редактировать нужно только `logos.ts`.** `LogoCarousel.vue`, `LogoGrid.vue` и `enterprise.md` менять не нужно.

## Шаг 1. Собрать данные

Запроси у пользователя три параметра. Если чего-то не хватает — спроси до начала правок.

| # | Параметр | Описание |
|---|----------|----------|
| 1 | **Имя PNG-файла** | Только имя файла, например `acme.png`. Файл должен уже лежать в `frontend/docs/public/logos/`. Опционально — вариант для тёмной темы с суффиксом `_dark` (см. шаг 2). |
| 2 | **URL компании** | Полный URL, например `https://example.com/`. Должен начинаться с `https://`. |
| 3 | **Название компании** | Подпись под логотипом, например `АКМЕ`. |

Используй `AskQuestion`, если доступен; иначе — спроси в чате.

## Шаг 2. Проверить файлы логотипов

Папка с файлами: `frontend/docs/public/logos/`

1. Убедись, что основной файл существует: `frontend/docs/public/logos/<имя>.png`
2. Если файла нет — **остановись** и сообщи пользователю, что нужно сначала положить PNG в эту папку.
3. Определи тёмный вариант автоматически:
   - из `foo.png` → проверь `foo_dark.png`
   - если основной файл заканчивается на `_light.png` → проверь замену на `_dark.png` (например `Ventra_light.png` → `Ventra_dark.png`)
4. Если тёмный файл найден — используй его как `srcDark`. Если нет — `srcDark: undefined`.

Пути в `logos.ts` указываются от корня сайта: `/logos/<имя>.png`.

## Шаг 3. Добавить запись в logos.ts

Файл: `frontend/.vitepress/theme/components/logos.ts`

Добавь объект в конец массива `baseLogos` (перед закрывающей `];`). Сохрани стиль существующих записей.

**С тёмным вариантом:**

```ts
{ src: '/logos/acme.png', srcDark: '/logos/acme_dark.png', name: 'АКМЕ', url: 'https://example.com/' },
```

**Без тёмного варианта:**

```ts
{ src: '/logos/acme.png', srcDark: undefined, name: 'АКМЕ', url: 'https://example.com/' },
```

Правила:

- `name` — точно как указал пользователь (подпись)
- `url` — с завершающим `/`, как в существующих записях
- не меняй `gridLogos` — он ссылается на `baseLogos`
- не дублируй компанию: проверь, что такого `name` или `url` ещё нет в массиве

## Шаг 4. Проверка

- [ ] PNG-файл существует в `frontend/docs/public/logos/`
- [ ] Запись добавлена в `baseLogos` в `logos.ts`
- [ ] `LogoCarousel.vue`, `LogoGrid.vue`, `enterprise.md` не тронуты
- [ ] Нет дубликатов в массиве

Сообщи пользователю, что логотип появится на главной и на `/learn/enterprise` после пересборки/перезагрузки dev-сервера.

## Пример

**Ввод пользователя:**
- Файл: `deltaleasing.png`
- URL: `https://deltaleasing.ru/`
- Название: `Дельта Лизинг`

**Проверка файлов:** `deltaleasing.png` есть; `deltaleasing_dark.png` нет → `srcDark: undefined`

**Результат в logos.ts:**

```ts
{ src: '/logos/deltaleasing.png', srcDark: undefined, name: 'Дельта Лизинг', url: 'https://deltaleasing.ru/' },
```
