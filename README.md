# 🛒 Gadget Hub — интернет-магазин электроники

SPA-магазин электроники с каталогом, фильтрами, корзиной и оформлением заказа.
Полный цикл: React-фронтенд + собственный FastAPI-бэкенд с PostgreSQL — вся бизнес-логика (авторизация, синхронизация корзины, оформление заказа) написана с нуля, без сторонних BaaS-решений.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MobX-7-FF9955?logo=mobx&logoColor=white" alt="MobX 7" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/FastAPI-0.141-009688?logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/SQLAlchemy-2.0-D71F00?logo=python&logoColor=white" alt="SQLAlchemy" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white" alt="Vercel" />
</p>

**Деплой:** frontend и backend — Vercel, база данных — [Neon](https://neon.tech) (serverless Postgres)

<p align="center">
  <img src="./screenshots/home.png" width="49%" alt="Главная страница" />
  <img src="./screenshots/catalog.png" width="49%" alt="Каталог с фильтрами" />
</p>

---

## О проекте

Учебно-демонстрационный проект, реализующий полный флоу интернет-магазина: пользователь логинится, просматривает каталог с фильтрами и сортировкой, собирает корзину (которая сохраняется между сессиями и устройствами через бэкенд), оформляет заказ и видит историю покупок.

Проект показывает полный цикл разработки продукта, а не только вёрстку экранов:
- **Frontend-архитектура** — реактивное состояние на MobX без лишней связанности сторов (`AuthStore`/`CartStore` не знают друг о друге, координация вынесена в `RootStore`)
- **Backend с нуля** — REST API на FastAPI, ORM-слой на SQLAlchemy, реляционная схема с внешними ключами вместо плоских файлов
- **Продакшн-деплой** — оба сервиса на Vercel, managed Postgres на Neon, конфигурация через переменные окружения (без единого захардкоженного адреса в коде)
- **Безопасность** — пароли хешируются `bcrypt`, а не хранятся в открытом виде

## Функциональность

- **Главная** — баннер, слайдер товаров
- **Каталог** (доступен только авторизованным пользователям) — фильтрация по цене (слайдер диапазона), категории и цвету; сортировка по новизне/популярности/цене; пагинация; модальное окно с карточкой товара

  <img src="./screenshots/catalog_filter.png" width="600" alt="Каталог товаров с фильтрами" />

- **Корзина** — добавление/удаление товаров, выбор части товаров для заказа, оформление (доставка/самовывоз, оплата), история предыдущих заказов

  <img src="./screenshots/cart.png" width="600" alt="Корзина и оформление заказа" />

- **Профиль** — вход по логину/паролю (пароли хешируются bcrypt), выход

  <img src="./screenshots/login.png" width="600" alt="Страница входа" />

## Архитектурные решения

**Разделение состояния на независимые сторы.** Авторизация (`AuthStore`) и корзина (`CartStore`) — два самостоятельных MobX-стора, не знающих друг о друге напрямую. Их координация (например: «после логина подтянуть корзину пользователя с сервера») вынесена в отдельный `RootStore`. Это позволяет тестировать и переиспользовать каждый стор изолированно, не тащя за собой зависимость от другого.

**Синхронизация корзины с бэкендом.** Корзина живёт в `localStorage` для гостя и синхронизируется с сервером при входе/выходе пользователя, чтобы состояние не терялось между сессиями и устройствами.

**PostgreSQL + SQLAlchemy ORM.** Данные (пользователи, товары, корзины, заказы) хранятся в реляционной БД с внешними ключами между таблицами (`users` → `cart_items`/`orders` → `order_items`), вместо файлового JSON-хранилища на диске. База поднята как managed-инстанс на Neon — не требует своего сервера БД и подключается по `DATABASE_URL`.

**Конфигурация через переменные окружения.** И адрес backend API на фронтенде (`VITE_API_URL`), и список разрешённых origin для CORS на бэкенде (`FRONTEND_URLS`), и строка подключения к БД (`DATABASE_URL`) вынесены в переменные окружения — без хардкода адресов в коде, что и позволило задеплоить оба слоя на Vercel независимо от локальной разработки.

## Стек

**Frontend** (`frontend/`)

| Библиотека | Версия | Роль |
|---|---|---|
| React | 19 | UI |
| TypeScript | 6 | Типизация |
| Vite | 8 | Сборка и dev-сервер |
| React Router | 7 | Клиентский роутинг |
| MobX / mobx-react-lite | 7 / 5 | Реактивное состояние |
| nouislider | 15 | Слайдер диапазона цен в фильтре |
| Sass (sass-embedded) | 1.x | Стили |

**Backend** (`backend/`)

| Библиотека | Версия | Роль |
|---|---|---|
| FastAPI | 0.141.1 | REST API |
| Uvicorn[standard] | 0.52.4 | ASGI-сервер |
| SQLAlchemy | 2.0.x | ORM, работа с Postgres |
| psycopg2-binary | 2.9.13 | Драйвер PostgreSQL |
| bcrypt | 5.0.0 | Хеширование паролей |
| python-dotenv | 1.2.3 | Переменные окружения из `.env` |

**Инфраструктура:** PostgreSQL (Neon, serverless) · Vercel (frontend + backend)

## API

| Метод | Путь | Назначение |
|-------|------|-----------|
| GET | `/goods` | список товаров |
| POST | `/login` | вход по логину/паролю (проверка через bcrypt) |
| POST | `/logout` | выход |
| GET | `/cart/{username}` | получить сохранённую корзину пользователя |
| POST | `/cart/save` | сохранить корзину пользователя (полностью перезаписывает `cart_items`) |
| GET | `/orders/{username}` | история заказов пользователя |
| POST | `/orders` | оформить новый заказ (создаёт `Order` + `OrderItem`, очищает корзину) |

## Структура проекта

```
Проект/
├── backend/
│   ├── main.py                  # FastAPI-приложение, все эндпоинты
│   ├── requirements.txt          # зависимости backend
│   └── database/
│       ├── db.py                 # подключение к Postgres (DATABASE_URL), SessionLocal, get_db
│       ├── models.py             # SQLAlchemy-модели: User, Good, CartItem, Order, OrderItem
│       ├── create_tables.py      # создание таблиц по моделям (Base.metadata.create_all)
│       └── .env                  # DATABASE_URL (не коммитится)
└── frontend/
    ├── src/
    │   ├── components/           # компоненты по страницам (cart-page/, catalog-page/, home-page/)
    │   ├── pages/                 # HomePage, CatalogPage, CartPage, ProfilePage, NotFoundPage
    │   ├── stores/                # AuthStore, CartStore, RootStore
    │   ├── styles/                # SCSS по одному файлу на страницу
    │   ├── utils/                 # типы, фильтрация/сортировка/пагинация
    │   ├── App.tsx                # роутинг, загрузка списка товаров
    │   └── main.tsx               # точка входа
    └── .env                      # (по желанию) для подключения к реальному backend-серверу (VITE_API_URL)
```

## Установка и запуск (локально)

**База данных**

Нужна PostgreSQL-база (например, бесплатный проект на [Neon](https://neon.tech)). В `backend/database/.env`:

```
DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>
```

Создать таблицы:

```bash
cd backend
python database/create_tables.py
```

**Backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8080
```

Опционально — список origin для CORS помимо `localhost:3000`:

```
FRONTEND_URLS=https://your-frontend.vercel.app
```

**Frontend**

В `frontend/.env`:

```
VITE_API_URL=http://127.0.0.1:8080
```

```bash
cd frontend
npm install
npm run dev
```

Фронтенд запускается на `http://localhost:3000`.

## Деплой

- **Frontend** — Vercel, переменная окружения `VITE_API_URL` указывает на прод-домен backend
- **Backend** — Vercel, переменные окружения `DATABASE_URL` (строка подключения к Neon) и `FRONTEND_URLS` (домены фронтенда на Vercel)
- **База данных** — Neon (serverless Postgres), таблицы создаются один раз через `database/create_tables.py` перед первым деплоем или после изменения моделей

## Что можно улучшить

- завести миграции (например, Alembic) вместо `create_tables.py` — сейчас изменение модели не обновит уже существующую схему в БД
- перенести валидацию форм с клиента на сервер как основной источник истины
- добавить индексы/ограничения на уровне БД для полей вроде `username`, `order_number` (сейчас `unique=True` есть, но стоит проверить наличие индекса в реальной БД)
- покрыть backend тестами (сейчас их нет)
