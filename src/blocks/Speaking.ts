import type { Block } from 'payload'

export const Speaking: Block = {
  slug: 'speaking',
  labels: { singular: 'Speaking', plural: 'Speaking' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Speaking & Public Engagement',
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional feature image shown at the top of the page.' },
    },
    {
      name: 'groups',
      type: 'array',
      labels: { singular: 'Group', plural: 'Groups' },
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        {
          name: 'items',
          type: 'array',
          labels: { singular: 'Talk', plural: 'Talks' },
          fields: [
            { name: 'event', type: 'text', required: true },
            { name: 'location', type: 'text', localized: true },
            { name: 'title', type: 'text', required: true },
            { name: 'date', type: 'text' },
          ],
        },
      ],
    },
  ],
}
