# Bandar Shanneik — website (Next.js + Payload CMS)

A fully customisable replacement site driven by [Payload CMS](https://payloadcms.com).
Every page is built from reorderable blocks the client can pick from a library — text, hero,
service cards, tag lists, CTA banners, research timeline, etc.

## Stack

- **Next.js 15** (App Router, React 19)
- **Payload 3** (self-hosted; admin lives at `/admin`)
- **SQLite** via `@payloadcms/db-sqlite` — zero external service to set up
- **Tailwind CSS** for styling
- **EN/DE localisation** (every text field is translatable)

## First-time setup

```bash
cd web
npm install
cp .env.example .env       # already created with dev defaults
npm run dev                # starts Next + Payload on http://localhost:3000
```

Open <http://localhost:3000/admin>. The first request prompts you to create an admin user.

### Seed initial content

To populate the site with the content from the screenshots (home, about, legal, research, contact + header/footer):

```bash
npm run seed
```

It creates an admin user (`admin@example.com` / `changeme123!`) **only if no user exists yet**. Change the password from the admin afterwards.

## Editing the site

| What                             | Where in /admin                |
| -------------------------------- | ------------------------------ |
| Add / reorder sections on a page | Collections → Pages → \[page\] |
| Site-wide nav links              | Globals → Header               |
| Footer columns, tagline, social  | Globals → Footer               |
| Brand colours, default SEO       | Globals → Site settings        |
| Publication list                 | Collections → Publications     |
| Images, logos, CV PDFs           | Collections → Media            |
| Switch to German                 | Locale picker (top-right)      |

### Block library

Each Page has a `blocks` field — pick from these section types and drag to reorder:

- **Hero** — large title + body + image + CTAs (used for the home page).
- **Background / Bio** — heading + rich text + image + optional buttons.
- **Education & Jurisdictions** — timeline of education entries plus jurisdictions and languages cards.
- **Service cards** — heading + intro + numbered cards.
- **Tag list (Practice Areas)** — heading + free-form tag chips.
- **CTA banner** — coloured callout with heading, subtext and a button.
- **Research timeline** — pulls from the Publications collection (or manual entries).
- **Profile card** — small bordered card (e.g. Research Profile).
- **Tag boxes (Areas of Interest)** — chip group inside a card.
- **Rich text** — general purpose heading + Lexical rich text.
- **Contact** — heading + intro + email/phone/address.

A `researchTimeline` followed by `researchProfileCard` and/or `tagBoxes` is automatically rendered in a two-column layout (timeline left, sidebars right) to match the screenshot.

## URL structure

```
/                       → redirects to /en
/en                     → page with slug "home"
/en/about               → page with slug "about"
/en/legal               → page with slug "legal"
/en/research            → page with slug "research"
/en/contact             → page with slug "contact"
/de/...                 → German versions of the same pages
```

To add a new page: create it in admin with a unique slug — it’s instantly live at `/<locale>/<slug>`.

## Production

```bash
npm run build
npm start
```

For production you’ll want to:

1. Set `PAYLOAD_SECRET` to a long random string.
2. Set `NEXT_PUBLIC_SERVER_URL` to your public URL.
3. Choose a host with a persistent disk (the SQLite file and uploaded media live on disk). Fly.io, Railway, or a VPS work well.
4. Or swap `@payloadcms/db-sqlite` for `@payloadcms/db-postgres` in `payload.config.ts` and provide `DATABASE_URI`.

## Project layout

```
web/
├── src/
│   ├── access/                # access control helpers
│   ├── blocks/                # Payload block definitions (CMS schemas)
│   ├── collections/           # Pages, Publications, Media, Users
│   ├── components/
│   │   ├── blocks/            # React renderers — one per block type
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── fields/                # Reusable Payload field templates (link, etc.)
│   ├── globals/               # Header, Footer, Site settings
│   ├── lib/                   # i18n, payload client, lexical renderer
│   ├── app/
│   │   ├── (frontend)/        # Public site
│   │   └── (payload)/         # Admin + API
│   ├── payload.config.ts
│   └── seed.ts                # `npm run seed`
└── .env                       # local dev env
```
