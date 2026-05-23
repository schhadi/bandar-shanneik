import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name'],
  },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
