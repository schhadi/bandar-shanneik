import type { Block } from 'payload'

export const Expertise: Block = {
  slug: 'expertise',
  labels: { singular: 'Expertise', plural: 'Expertise' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Areas of Expertise',
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'jurisdictions',
      type: 'array',
      labels: { singular: 'Jurisdiction', plural: 'Jurisdictions' },
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Area', plural: 'Areas' },
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
