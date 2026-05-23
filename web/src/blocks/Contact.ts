import type { Block } from 'payload'

export const Contact: Block = {
  slug: 'contact',
  labels: { singular: 'Contact block', plural: 'Contact blocks' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Get in touch',
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
      localized: true,
    },
  ],
}
