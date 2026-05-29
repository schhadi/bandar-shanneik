import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { linkField } from '../fields/link'
import { revalidateGlobalOnChange } from '../lib/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateGlobalOnChange],
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      defaultValue: 'Bandar Shanneik',
      localized: true,
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. If set, replaces the text logo.' },
    },
    {
      name: 'nav',
      type: 'array',
      labels: { singular: 'Nav item', plural: 'Nav items' },
      fields: [linkField()],
    },
    {
      name: 'showLanguageSwitcher',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
