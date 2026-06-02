import fs from 'fs'
import path from 'path'
import type { BasePayload } from 'payload'

import { footer, header as headerSource, localize, portrait, staticPages } from './staticContent'
import { DEFAULT_LOCALE, LOCALES, type Locale } from './i18n'

type PayloadClient = BasePayload

type PageIDs = Record<string, number | string>

// Default locale first, then the rest. The default-locale write creates the
// array rows; later locales reuse those rows' ids so their localized values
// land on the same rows instead of replacing them.
const ORDERED_LOCALES: Locale[] = [
  DEFAULT_LOCALE,
  ...LOCALES.filter((l) => l !== DEFAULT_LOCALE),
]

async function ensurePortrait(payload: PayloadClient) {
  const existing = await payload.find({
    collection: 'media',
    limit: 1,
    where: { filename: { equals: portrait.filename } },
  })

  if (existing.docs[0]) {
    return existing.docs[0].id
  }

  const filePath = path.join(process.cwd(), 'public', 'media', portrait.filename)
  const staticMediaData = {
    alt: portrait.alt,
    filename: portrait.filename,
    filesize: fs.existsSync(filePath) ? fs.statSync(filePath).size : undefined,
    height: portrait.height,
    mimeType: 'image/jpeg',
    url: portrait.url,
    width: portrait.width,
  }

  if (!fs.existsSync(filePath)) {
    const media = await payload.create({
      collection: 'media',
      data: staticMediaData as any,
    })
    return media.id
  }

  const fileBuffer = fs.readFileSync(filePath)
  const media = await payload
    .create({
      collection: 'media',
      data: { alt: portrait.alt },
      file: {
        data: fileBuffer,
        mimetype: 'image/jpeg',
        name: portrait.filename,
        size: fileBuffer.length,
      },
    })
    .catch(() =>
      payload.create({
        collection: 'media',
        data: staticMediaData as any,
      }),
    )

  return media.id
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

// Copy `id` fields from a previously-saved structure onto an identically-shaped
// one, so a later-locale update targets the same array rows (Payload keys
// localized array values by row id). Shapes are guaranteed identical because
// both come from localize() of the same source.
function copyIds(target: any, source: any): void {
  if (!target || !source) return
  if (Array.isArray(target) && Array.isArray(source)) {
    target.forEach((t, i) => copyIds(t, source[i]))
    return
  }
  if (typeof target === 'object' && typeof source === 'object') {
    if (source.id !== undefined) target.id = source.id
    for (const key of Object.keys(target)) {
      if (key === 'id') continue
      copyIds(target[key], source[key])
    }
  }
}

function resolveLink(link: any, pageIDs: PageIDs) {
  if (!link || link.type !== 'internal') return link

  const slug = typeof link.page === 'object' ? link.page?.slug : link.page
  if (!slug) return link

  return {
    ...link,
    page: pageIDs[slug],
  }
}

function resolveLinksDeep(value: any, pageIDs: PageIDs): any {
  if (Array.isArray(value)) return value.map((item) => resolveLinksDeep(item, pageIDs))
  if (!value || typeof value !== 'object') return value

  const next: Record<string, unknown> = {}
  for (const [key, child] of Object.entries(value)) {
    next[key] = key === 'link' ? resolveLink(child, pageIDs) : resolveLinksDeep(child, pageIDs)
  }
  return next
}

function blockForPayload(block: any, pageIDs: PageIDs, portraitID: number | string | null) {
  const next = resolveLinksDeep(clone(block), pageIDs)

  if (
    portraitID &&
    (next.blockType === 'hero' || next.blockType === 'background' || next.blockType === 'contactForm')
  ) {
    next.image = portraitID
  }

  return next
}

async function ensurePage(payload: PayloadClient, slug: string, pageIDs: PageIDs) {
  const existing = await payload.find({
    collection: 'pages',
    limit: 1,
    where: { slug: { equals: slug } },
  })

  if (existing.docs[0]) {
    pageIDs[slug] = existing.docs[0].id
    return
  }

  const def = localize<any>(staticPages[slug], DEFAULT_LOCALE)
  const created = await payload.create({
    collection: 'pages',
    data: { slug, title: def.title, blocks: [] } as any,
  })
  pageIDs[slug] = created.id
}

async function seedPages(
  payload: PayloadClient,
  pageIDs: PageIDs,
  portraitID: number | string | null,
) {
  for (const slug of Object.keys(staticPages)) {
    let previousBlocks: any[] | null = null

    for (const locale of ORDERED_LOCALES) {
      const page = localize<any>(staticPages[slug], locale)
      const blocks = page.blocks.map((b: any) => blockForPayload(b, pageIDs, portraitID))
      if (previousBlocks) copyIds(blocks, previousBlocks)

      await payload.update({
        collection: 'pages',
        id: pageIDs[slug],
        locale,
        data: {
          title: page.title,
          seo: { title: page.title, description: page.description },
          blocks,
        } as any,
      })

      if (locale === DEFAULT_LOCALE) {
        const fresh = await payload.findByID({
          collection: 'pages',
          id: pageIDs[slug],
          locale,
          depth: 0,
        })
        previousBlocks = (fresh as any).blocks
      }
    }
  }
}

async function seedHeader(payload: PayloadClient, pageIDs: PageIDs) {
  let previousNav: any[] | null = null

  for (const locale of ORDERED_LOCALES) {
    const data = resolveLinksDeep(localize<any>(headerSource, locale), pageIDs)
    if (previousNav) copyIds(data.nav, previousNav)

    await payload.updateGlobal({ slug: 'header', locale, data })

    if (locale === DEFAULT_LOCALE) {
      const fresh = await payload.findGlobal({ slug: 'header', locale, depth: 0 })
      previousNav = (fresh as any).nav
    }
  }
}

export async function seedStaticContent(payload: PayloadClient) {
  const pageIDs: PageIDs = {}
  const slugs = Object.keys(staticPages)

  for (const slug of slugs) {
    await ensurePage(payload, slug, pageIDs)
  }

  const portraitID = await ensurePortrait(payload)

  await seedPages(payload, pageIDs, portraitID)
  await seedHeader(payload, pageIDs)

  await payload.updateGlobal({
    slug: 'footer',
    data: resolveLinksDeep(footer, pageIDs) as any,
  })

  return {
    pages: slugs,
    portraitID,
  }
}
