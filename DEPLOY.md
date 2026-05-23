# Deploying to Vercel (Neon Postgres + Vercel Blob)

This site uses **Next.js 15 + Payload CMS 3**. On Vercel it must run against:
- **Neon Postgres** — for all CMS data (pages, publications, header, footer)
- **Vercel Blob** — for media uploads (the local `media/` folder does NOT persist on Vercel)

Local dev works without either: it falls back to a SQLite file (`payload.db`) and writes uploads to `./media`.

---

## One-time setup on Vercel

### 1. Neon (you said this is done)

When you connected Neon to the Vercel project, Vercel auto-injects these env vars:
- `POSTGRES_URL` (pooled — used by the app)
- `POSTGRES_URL_NON_POOLING` (direct — used for migrations)
- `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, plus several `PGHOST` etc.

`src/payload.config.ts` already reads `POSTGRES_URL` (and falls back to `DATABASE_URI` / `DATABASE_URL`). No code changes needed here.

### 2. Enable Vercel Blob

Vercel → Project → **Storage** → **Create** → **Blob**. Attach it to this project.

This auto-injects `BLOB_READ_WRITE_TOKEN` into all environments. `src/payload.config.ts` enables the Blob plugin automatically when the token is present.

### 3. Add the remaining env vars

Vercel → Project → **Settings → Environment Variables**. Add for **Production** and **Preview**:

| Name | Value |
|---|---|
| `PAYLOAD_SECRET` | a long random string (e.g. `openssl rand -hex 32`) |
| `NEXT_PUBLIC_SERVER_URL` | your prod URL, e.g. `https://bandar-shanneik.vercel.app` |

`POSTGRES_URL` and `BLOB_READ_WRITE_TOKEN` are set automatically by the integrations above.

---

## Seed the production database (one time)

The Postgres DB is empty after first deploy. To populate it with pages/publications/header/footer:

### Option A — run seed locally against prod DB

```bash
# Pull prod env vars into a local file
npx vercel env pull .env.production.local

# Run seed against prod
DATABASE_URI="$(grep '^POSTGRES_URL=' .env.production.local | cut -d= -f2- | tr -d '"')" \
PAYLOAD_SECRET="$(grep '^PAYLOAD_SECRET=' .env.production.local | cut -d= -f2- | tr -d '"')" \
npm run seed
```

### Option B — use Neon's SQL editor + Payload migrations

```bash
# Generate Postgres migration files from current schema
DATABASE_URI="<your-postgres-url>" npm run migrate
```

Then visit `https://your-app.vercel.app/admin`, log in (default seed creates `admin@example.com` / `changeme123!` — **change the password immediately**), and enter content through the admin UI.

---

## Re-deploy

After all env vars are set:
```bash
git add -A
git commit -m "Switch to Postgres + Vercel Blob"
git push
```
Vercel auto-deploys. First boot will run migrations against Neon, and the site should now show the seeded content.

---

## Local development

You can keep using SQLite for offline dev:
```bash
# No DATABASE_URI / POSTGRES_URL in your .env → SQLite fallback kicks in
npm run dev
```

Or develop directly against a **Neon dev branch** (recommended so dev/prod schemas don't drift):
```bash
# .env
DATABASE_URI=postgresql://...neon-dev-branch...
PAYLOAD_SECRET=<same-as-prod-or-different>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

---

## What changed in this commit

1. Added `@payloadcms/storage-vercel-blob` dependency
2. `src/payload.config.ts` — registers the Blob plugin when `BLOB_READ_WRITE_TOKEN` is present; reads from `POSTGRES_URL` / `DATABASE_URL` / `DATABASE_URI` in that order
3. `.gitignore` — now excludes `.env`, `payload.db`, `media/`
4. Removed `payload.db` and `media/*.JPG` from git tracking (they were committed by mistake)

## Troubleshooting

- **Admin loads but pages are blank** → DB is empty. Run the seed (see above).
- **Image uploads 500** → `BLOB_READ_WRITE_TOKEN` is missing or Blob storage isn't created on the project.
- **`relation "pages" does not exist`** → migrations haven't run. Push a fresh deploy or run `npm run migrate` against the prod DB.
- **`SSL connection required`** errors → confirm `POSTGRES_URL` ends with `?sslmode=require`. Vercel-Neon's pooled URL already includes this.
