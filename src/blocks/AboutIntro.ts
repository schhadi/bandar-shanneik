import type { Block } from 'payload'

export const AboutIntro: Block = {
  slug: 'aboutIntro',
  labels: { singular: 'About intro', plural: 'About intros' },
  fields: [
    { name: 'greeting', type: 'text', localized: true },
    { name: 'lead', type: 'textarea', localized: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Portrait shown beside the greeting.' },
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      admin: { description: 'Separate paragraphs with a blank line.' },
    },
  ],
}
