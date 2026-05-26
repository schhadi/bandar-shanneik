import { getPayload as _getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  const payload = await _getPayload({ config })
  const all = await payload.find({ collection: 'media', limit: 50 })
  for (const d of all.docs) {
    console.log({
      id: d.id,
      filename: (d as any).filename,
      url: (d as any).url,
      mime: (d as any).mimeType,
      width: (d as any).width,
      height: (d as any).height,
    })
  }
  process.exit(0)
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
