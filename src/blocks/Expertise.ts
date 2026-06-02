import type { Block } from 'payload'

export const Expertise: Block = {
  slug: 'expertise',
  labels: { singular: 'Advisory', plural: 'Advisory' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Advisory',
    },
    {
      name: 'lead',
      type: 'textarea',
      localized: true,
      admin: { description: 'Bold opening statement under the heading.' },
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
      name: 'areas',
      type: 'array',
      labels: { singular: 'Area', plural: 'Areas' },
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}
