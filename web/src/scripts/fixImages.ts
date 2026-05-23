import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })

  const media = await payload.find({ collection: 'media', limit: 1 })
  const mediaId = media.docs[0]?.id
  if (!mediaId) {
    console.error('No media found.')
    process.exit(1)
  }

  async function updatePage(slug: string, blockType: string, image: any) {
    const r = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (!r.docs[0]) return
    const page: any = r.docs[0]
    const blocks = (page.blocks || []).map((b: any) =>
      b.blockType === blockType ? { ...b, image } : b,
    )
    await payload.update({ collection: 'pages', id: page.id, data: { blocks } as any })
    console.log(`  ✓ ${slug}/${blockType} image=${image ?? 'null'}`)
  }

  await updatePage('home', 'hero', mediaId)
  await updatePage('about', 'background', mediaId)
  await updatePage('contact', 'contactForm', null)

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
