# Популярные вопросы «react-redux» со Stack Overflow

SPA на React + Redux Toolkit: показывает 5 самых популярных вопросов Stack Overflow, в заголовке
которых есть строка `react-redux`, созданных не ранее выбранной пользователем даты. Рейтинг можно
менять локально, элементы — раскрывать и переупорядочивать перетаскиванием или обменом по двойному
клику.

Данные берутся из [Stack Exchange API](https://api.stackexchange.com/docs), метод
[`/search`](https://api.stackexchange.com/docs/search) с параметрами `intitle`, `fromdate`,
`sort=votes`, `order=desc`, `pagesize=5`.

---

## Содержание

- [Стек](#стек)
- [Требования](#требования)
- [Установка](#установка)
- [Конфигурация](#конфигурация)
- [Запуск](#запуск)
- [Тесты](#тесты)
- [Архитектура](#архитектура)
- [Как это работает](#как-это-работает)

---

## Стек

- **React 19** + **TypeScript**
- **Redux Toolkit 2** + **react-redux 9**
- **Material UI 9** (`@mui/material`, `@mui/icons-material`, `@mui/x-date-pickers`) — компоненты и
  выбор даты
- **@dnd-kit** — drag-and-drop
- **date-fns** — работа с датами
- **dotenv** — чтение конфигурации из `.env`
- **Vite 8** — сборка и dev-сервер
- **Vitest 4** + **Testing Library** — тесты

## Требования

- **Node.js ≥ 20.19** (проверено на 22.19)
- **npm ≥ 10** (проверено на 11.6)

## Установка

```bash
git clone https://github.com/SyNikolay/stack_overflow.git
cd stack_overflow
npm install
```

## Конфигурация

Конфигурация не обязательна: **без файла `.env` приложение сразу работает** на значениях по
умолчанию из [src/shared/config/app.config.ts](src/shared/config/app.config.ts).

| Переменная | По умолчанию | Назначение |
| --- | --- | --- |
| `VITE_SE_API_URL` | `https://api.stackexchange.com/2.3` | базовый адрес Stack Exchange API |
| `VITE_SE_SITE` | `stackoverflow` | сайт сети Stack Exchange |
| `VITE_SE_API_KEY` | пусто | ключ приложения Stack Apps, повышает дневную квоту запросов |
| `VITE_SEARCH_INTITLE` | `react-redux` | искомая подстрока в заголовке вопроса |
| `VITE_SEARCH_PAGE_SIZE` | `5` | количество вопросов в выдаче |
| `VITE_DEFAULT_FROM_DATE` | `2026-01-01` | дата первого запроса, формат `yyyy-MM-dd` |

> API доступен без ключа: квота — 300 запросов в сутки на IP.

## Запуск

Режим разработки (dev-сервер на <http://localhost:5173>):

```bash
npm run dev
```

Дополнительные команды:

```bash
npm run typecheck     # проверка типов
npm run lint          # oxlint
npm run test          # тесты один раз
npm run test:watch    # тесты в watch-режиме
npm run test:coverage # тесты с отчётом о покрытии
```

## Тесты

```bash
npm run test
```

## Архитектура

Feature-Sliced Design. Слои используют только слои ниже себя: `app` → `pages` → `features` →
`entities` → `shared`.

```
src/
├── app/                                # инициализация приложения
│   ├── components/App/App.tsx
│   ├── providers/                      # StoreProvider, ThemeProvider
│   └── store/                          # store, root-reducer, типизированные хуки
├── pages/
│   └── questions/                      # страница, связывающая фичи между собой
├── features/
│   ├── questions-search/               # выбор даты и кнопка «Поиск»
│   │   ├── components/                 # DateField, QuestionsSearchPanel
│   │   ├── slice/                      # slice, selectors
│   │   ├── questions-search.constants.ts
│   │   ├── questions-search.lib.ts     # хук связи со стором
│   │   ├── questions-search.types.ts
│   │   ├── questions-search.utils.ts
│   │   └── index.ts                    # публичный API фичи
│   └── questions-list/                 # список вопросов
│       ├── components/                 # QuestionsList, QuestionItem, QuestionScore, QuestionDetails
│       ├── slice/                      # slice, actions (thunk), selectors
│       ├── questions-list.constants.ts
│       ├── questions-list.lib.ts       # хук связи со стором
│       ├── questions-list.service.ts   # загрузка данных и маппинг
│       ├── questions-list.types.ts
│       ├── questions-list.utils.ts     # чистые функции рейтинга и порядка
│       └── index.ts
├── entities/
│   └── question/                       # доменная модель вопроса и маппинг из DTO
├── shared/
│   ├── api/                            # http-клиент и клиент Stack Exchange
│   ├── config/                         # конфигурация из окружения
│   ├── lib/                            # утилиты дат, массивов, HTML, общие хуки
│   └── ui/                             # тема Material UI, дизайн-токены, StatusMessage
└── test/                               # setup, фабрика данных, рендер с провайдерами
```

Внутри фичи файлы названы по назначению: `*.types.ts`, `*.utils.ts` (чистые функции),
`*.lib.ts` (хуки связи со стором), `*.service.ts` (работа с API), `*.constants.ts`.
Слайс разбит на `slice/*.slice.ts`, `slice/*.actions.ts`, `slice/*.selectors.ts`.

## Как это работает

1. **Старт.** `QuestionsPage` один раз отправляет `fetchQuestions(selectedDate)` с датой по
   умолчанию (`01.01.2026`).
2. **Запрос.** Thunk вызывает `fetchQuestionsByDate`: дата переводится в unix-секунды (`fromdate`),
   ответ маппится в доменную модель, HTML-сущности в заголовках раскрываются.
3. **Отображение.** Пока запрос идёт — индикатор загрузки; при ошибке — текст ошибки от API;
   при пустой выдаче — «По выбранной дате вопросов не найдено».
4. **Смена даты.** Выбор даты пишется в `questionsSearch.selectedDate`. Как только она отличается
   от `questionsList.appliedDate`, появляется кнопка «Поиск»; после успешной загрузки
   `appliedDate` обновляется и кнопка исчезает.
5. **Рейтинг.** Кнопки «вверх»/«вниз» меняют `score` только в сторе.
6. **Раскрытие.** Одиночный клик переключает `expandedId` — раскрыт всегда не более одного элемента.
   Клик вне списка сбрасывает раскрытие.
7. **Порядок.**
   - *Перетаскивание*: тянуть можно всю карточку (drag стартует после сдвига на 8 px, поэтому клики
     продолжают работать) или её «ручку» — с клавиатуры она поддерживает пробел и стрелки.
   - *Двойной клик*: первый выделяет карточку, второй по другой карточке меняет их местами. Повторный
     двойной клик по той же карточке или клик по пустой области отменяет выбор.
