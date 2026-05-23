import type { Block } from 'payload'

export const TagBoxes: Block = {
  slug: 'tagBoxes',
  labels: { singular: 'Tag boxes', plural: 'Tag boxes sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Areas of Interest',
    },
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
