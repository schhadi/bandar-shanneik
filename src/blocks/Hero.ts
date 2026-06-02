import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'descriptor',
      type: 'text',
      localized: true,
      admin: { description: 'Short role line set under the name (shown as a small eyebrow).' },
    },
    {
      name: 'subheading',
      type: 'textarea',
      localized: true,
      admin: { description: 'Supporting subheading sentence shown below the descriptor.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
      admin: { description: 'Optional override for the LinkedIn link.' },
    },
  ],
}
