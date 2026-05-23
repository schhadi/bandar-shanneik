import type { Block } from 'payload'

export const PracticeAreas: Block = {
  slug: 'practiceAreas',
  labels: { singular: 'Tag list', plural: 'Tag lists' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Practice Areas',
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
