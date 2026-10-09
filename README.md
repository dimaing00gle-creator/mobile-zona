# Mobile Zona — лендинг

Next.js 16 (App Router, React 19, TypeScript). Головна сторінка генерується статично (SSG), заявки обробляє серверний маршрут `/api/lead` і надсилає їх у Telegram.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Node.js встановлено в `~/.local/node`. Якщо `npm` не знаходиться, додайте до PATH: `export PATH=$HOME/.local/node/bin:$PATH`.

## Налаштування

Скопіюйте `.env.example` у `.env.local` і заповніть:

| Змінна | Що це |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Публічний домен сайту: canonical, sitemap, Open Graph |
| `TELEGRAM_BOT_TOKEN` | Токен бота від @BotFather |
| `TELEGRAM_CHAT_ID` | ID чату менеджерів, куди бот пише заявки |

Без Telegram-змінних у режимі розробки заявка лише виводиться в консоль сервера, а в продакшні форма повертає помилку.

## Де редагувати контент

Усі тексти, ціни, адреси магазинів і відгуки лежать у `src/content/site.ts`. Тестові дані позначені коментарем `ЗАМІНИТИ`.
Відгуки там лише приклади для верстки: перед публікацією їх треба замінити на справжні.

## Структура

- `src/app/` — layout із SEO-метаданими, сторінка, `robots.txt`, `sitemap.xml`, маніфест, OG-картинка, `/privacy`, `/api/lead`
- `src/components/` — секції (Header, Hero, ProductSlider, Services, About, Reviews, StoreFinder, Contacts + LeadForm, Footer, MobileCta) і JSON-LD
- `src/app/globals.css` — дизайн-токени: 3 кольори (#F1F0ED, #1D1D1F, #E2F23A) та їхні прозорості

## Фото

Фото взято з Unsplash (вільна ліцензія) і віддаються з CDN Unsplash через `src/lib/image-loader.ts`. Щоб поставити власні фото, покладіть їх у `public/` і вкажіть шлях у `site.ts`.
