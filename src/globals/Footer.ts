import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { linkField } from '../fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'Bandar Shanneik',
      localized: true,
    },
    {
      name: 'tagline',
      type: 'textarea',
      localized: true,
      defaultValue: 'Cross-border legal consultancy across the Middle East and Europe',
    },
    {
      name: 'columns',
      type: 'array',
      labels: { singular: 'Column', plural: 'Columns' },
      maxRows: 4,
      fields: [
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [linkField()],
        },
      ],
    },
    {
      name: 'bottomLinks',
      type: 'array',
      labels: { singular: 'Link', plural: 'Bottom links' },
      fields: [linkField()],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      defaultValue: '© 2026 Bandar Shanneik. All rights reserved.',
    },
  ],
}
