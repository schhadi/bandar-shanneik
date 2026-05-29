import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { revalidateGlobalOnChange } from '../lib/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateGlobalOnChange],
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Bandar Shanneik',
      localized: true,
    },
    {
      name: 'defaultMeta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'colors',
      type: 'group',
      admin: {
        description:
          'Brand colours used across the site. CSS variables update live so you can change the whole palette here.',
      },
      fields: [
        { name: 'background', type: 'text', defaultValue: '#F5EFE4' },
        { name: 'primary', type: 'text', defaultValue: '#1F3A2F' },
        { name: 'accent', type: 'text', defaultValue: '#B5985A' },
        { name: 'topBar', type: 'text', defaultValue: '#8B1F6E' },
      ],
    },
  ],
}
