import { getPayload as _getPayload } from 'payload'
import config from '@payload-config'

let _client: Awaited<ReturnType<typeof _getPayload>> | null = null

export async function getPayload() {
  if (_client) return _client
  _client = await _getPayload({ config })
  return _client
}
