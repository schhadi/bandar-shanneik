import type { Block } from 'payload'

export const ServiceCards: Block = {
  slug: 'serviceCards',
  labels: { singular: 'Service cards', plural: 'Service card sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
