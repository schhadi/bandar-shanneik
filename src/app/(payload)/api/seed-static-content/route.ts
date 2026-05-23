import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@payload-config'
import { seedStaticContent } from '@/lib/seedStaticContent'

function isAuthorized(request: Request) {
  const configuredSecret = process.env.SEED_SECRET || process.env.PAYLOAD_SECRET
  if (!configuredSecret) return false

  const auth = request.headers.get('authorization')
  return auth === `Bearer ${configuredSecret}`
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })
  const result = await seedStaticContent(payload)

  return NextResponse.json({
    ok: true,
    ...result,
  })
}
