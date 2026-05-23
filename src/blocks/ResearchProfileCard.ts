import type { Block } from 'payload'

export const ResearchProfileCard: Block = {
  slug: 'researchProfileCard',
  labels: { singular: 'Profile card', plural: 'Profile cards' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Research Profile',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'role',
      type: 'text',
      localized: true,
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
    },
  ],
}
