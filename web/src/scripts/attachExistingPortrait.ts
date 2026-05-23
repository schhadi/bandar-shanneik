import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })

  // Find the first media item (the portrait we uploaded earlier)
  const media = await payload.find({ collection: 'media', limit: 1 })
  const mediaId = media.docs[0]?.id
  if (!mediaId) {
    console.error('No media found. Upload a portrait first via the admin.')
    process.exit(1)
  }
  console.log(`Using media id: ${mediaId}`)

  // Attach to contact form block
  const contact = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    limit: 1,
  })
  if (contact.docs[0]) {
    const page: any = contact.docs[0]
    const blocks = (page.blocks || []).map((b: any) =>
      b.blockType === 'contactForm' ? { ...b, image: mediaId } : b,
    )
    await payload.update({ collection: 'pages', id: page.id, data: { blocks } as any })
    console.log('  ✓ Attached to Contact form')
  }

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
