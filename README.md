# Mobile Zona — landing page

Landing page for a Ukrainian chain of smartphone and accessory stores. The goal is lead generation: a visitor requests a consultation, a manager calls back and reserves the product in the nearest store.

Built with Next.js 16 (App Router, React 19, TypeScript). The home page is statically generated (SSG); leads are handled by the `/api/lead` route and forwarded to Telegram.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Configuration

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public domain: canonical URL, sitemap, Open Graph |
| `TELEGRAM_BOT_TOKEN` | Bot token from @BotFather |
| `TELEGRAM_CHAT_ID` | Managers' chat ID where the bot posts leads |

Without the Telegram variables, leads are only logged to the server console in development; in production the form returns an error.

## Editing content

All copy, prices, store addresses and reviews live in `src/content/site.ts`. Placeholder data is marked with a `REPLACE` comment.
The reviews are layout samples only and must be replaced with real ones before launch.

The site itself is Ukrainian-only; code comments, commit messages and docs are in English.

## Project structure

- `src/app/` — layout with SEO metadata, home page, `robots.txt`, `sitemap.xml`, manifest, OG image, `/privacy`, `/api/lead`
- `src/components/` — one folder per component (`Name/Name.tsx`, `Name.module.css`, `index.ts`)
- `src/lib/` — lead validation, shared formatters, image loader, smooth scroll
- `src/app/globals.css` — design tokens: 3 colors (#F1F0ED, #1D1D1F, #E2F23A) and their opacities

## Images

Stock photos come from Unsplash (free license) and are served by the Unsplash CDN via `src/lib/image-loader.ts`. To use your own photos, put them in `public/` and reference the path in `site.ts`.
