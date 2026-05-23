import path from 'path'
import fs from 'fs'
import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const arg = process.argv[2]
  if (!arg) {
    console.error('Usage: tsx src/scripts/attachPortrait.ts <path-to-image>')
    process.exit(1)
  }
  const absPath = path.isAbsolute(arg) ? arg : path.resolve(process.cwd(), arg)
  if (!fs.existsSync(absPath)) {
    console.error(`File not found: ${absPath}`)
    process.exit(1)
  }

  const payload = await getPayload({ config })

  console.log(`Uploading ${absPath}…`)
  const fileBuffer = fs.readFileSync(absPath)
  const media = await payload.create({
    collection: 'media',
    data: { alt: 'Bandar Shanneik portrait' } as any,
    file: {
      data: fileBuffer,
      mimetype: 'image/jpeg',
      name: path.basename(absPath),
      size: fileBuffer.length,
    },
  })
  console.log(`  ✓ Media id: ${media.id}`)

  // Attach to Home Hero
  const home = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  if (home.docs[0]) {
    const page: any = home.docs[0]
    const blocks = (page.blocks || []).map((b: any) =>
      b.blockType === 'hero' ? { ...b, image: media.id } : b,
    )
    await payload.update({ collection: 'pages', id: page.id, data: { blocks } as any })
    console.log('  ✓ Attached to Home hero')
  }

  // Attach to About Background
  const about = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })
  if (about.docs[0]) {
    const page: any = about.docs[0]
    const blocks = (page.blocks || []).map((b: any) =>
      b.blockType === 'background' ? { ...b, image: media.id } : b,
    )
    await payload.update({ collection: 'pages', id: page.id, data: { blocks } as any })
    console.log('  ✓ Attached to About background')
  }

  // Attach to Contact form
  const contact = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    limit: 1,
  })
  if (contact.docs[0]) {
    const page: any = contact.docs[0]
    const blocks = (page.blocks || []).map((b: any) =>
      b.blockType === 'contactForm' ? { ...b, image: media.id } : b,
    )
    await payload.update({ collection: 'pages', id: page.id, data: { blocks } as any })
    console.log('  ✓ Attached to Contact form')
  }

  console.log('Done.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
