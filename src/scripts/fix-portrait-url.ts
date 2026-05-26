import { getPayload as _getPayload } from 'payload'
import config from '../payload.config'
import { portrait } from '../lib/staticContent'

async function run() {
  const payload = await _getPayload({ config })
  const existing = await payload.find({
    collection: 'media',
    limit: 50,
  })

  for (const doc of existing.docs) {
    const updated = await payload.update({
      collection: 'media',
      id: doc.id,
      data: {
        url: portrait.url,
        filename: portrait.filename,
        width: portrait.width,
        height: portrait.height,
        mimeType: 'image/jpeg',
      } as any,
    })
    console.log('Updated media id', doc.id, '→ url:', (updated as any).url)
  }

  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
