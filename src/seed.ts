import { getPayload as _getPayload } from 'payload'
import config from './payload.config'
import { seedStaticContent } from './lib/seedStaticContent'

async function seed() {
  const payload = await _getPayload({ config })

  console.log('Seeding…')

  // Admin user
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'changeme123!',
        name: 'Admin',
      },
    })
    console.log('  ✓ Admin user created (admin@example.com / changeme123!)')
  }

  const result = await seedStaticContent(payload)
  console.log(`  ✓ Seeded pages: ${result.pages.join(', ')}`)
  if (result.portraitID) console.log(`  ✓ Seeded portrait media id: ${result.portraitID}`)

  console.log('Done.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
