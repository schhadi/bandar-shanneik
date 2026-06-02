import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Publications } from './collections/Publications'
import { Submissions } from './collections/Submissions'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Prefer the direct (non-pooling) URL on Vercel/Neon. The pooled URL goes through PgBouncer
// in transaction mode, which hangs Payload/Drizzle prepared statements.
const databaseUri =
  process.env.DATABASE_URI ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL

// Vercel Blob token is set automatically when you enable Blob storage on the project.
const blobToken = process.env.BLOB_READ_WRITE_TOKEN

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Bandar Shanneik',
    },
  },
  editor: lexicalEditor({}),
  collections: [Users, Media, Pages, Publications, Submissions],
  globals: [Header, Footer, SiteSettings],
  localization: {
    locales: [
      { label: 'Deutsch', code: 'de' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'de',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: databaseUri
    ? postgresAdapter({
        pool: {
          connectionString: databaseUri,
          connectionTimeoutMillis: 30_000,
          max: 10,
        },
        // Only run migrations from the seed/CLI, never inside serverless functions.
        // Running them on cold start can hang requests for the full 300s function timeout.
        ...(process.env.PAYLOAD_RUN_MIGRATIONS === 'true' ? { prodMigrations: migrations } : {}),
      })
    : sqliteAdapter({
        client: {
          url: 'file:./payload.db',
        },
      }),
  // Only register the Blob plugin when the token is present.
  // - On Vercel (with Blob enabled): files go to Vercel Blob, served from blob.vercel-storage.com.
  // - Locally without the token: files fall back to ./media on disk.
  plugins: blobToken
    ? [
        vercelBlobStorage({
          collections: {
            media: true,
          },
          token: blobToken,
        }),
      ]
    : [],
  sharp: (await import('sharp')).default,
})
