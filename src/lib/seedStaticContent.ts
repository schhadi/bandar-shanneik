import fs from 'fs'
import path from 'path'
import type { BasePayload } from 'payload'

import { header, portrait, staticPages } from './staticContent'

type PayloadClient = BasePayload

type PageIDs = Record<string, number | string>

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

async function upsertPage(payload: PayloadClient, slug: string, pageIDs: PageIDs) {
  const page = staticPages[slug]
  const existing = await payload.find({
    collection: 'pages',
    limit: 1,
    where: { slug: { equals: slug } },
  })

  if (existing.docs[0]) {
    pageIDs[slug] = existing.docs[0].id
    return existing.docs[0].id
  }

  const created = await payload.create({
    collection: 'pages',
    data: {
      slug,
      title: page.title,
      seo: {
        title: page.title,
        description: page.description,
      },
      blocks: [],
    } as any,
  })

  pageIDs[slug] = created.id
  return created.id
}

export async function seedStaticContent(payload: PayloadClient) {
  const pageIDs: PageIDs = {}
  const slugs = Object.keys(staticPages)

  for (const slug of slugs) {
    await upsertPage(payload, slug, pageIDs)
  }

  const portraitID = await ensurePortrait(payload)

  for (const slug of slugs) {
    const page = staticPages[slug]
    const blocks = page.blocks.map((block) => blockForPayload(block, pageIDs, portraitID))

    await payload.update({
      collection: 'pages',
      id: pageIDs[slug],
      data: {
        title: page.title,
        seo: {
          title: page.title,
          description: page.description,
        },
        blocks,
      } as any,
    })
  }

  await payload.updateGlobal({
    slug: 'header',
    data: resolveLinksDeep(header, pageIDs) as any,
  })

  return {
    pages: slugs,
    portraitID,
  }
}
