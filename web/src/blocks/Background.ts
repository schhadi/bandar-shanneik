import type { Block } from 'payload'
import { linkField } from '../fields/link'

export const Background: Block = {
  slug: 'background',
  labels: { singular: 'Background / Bio', plural: 'Background sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Background',
    },
    {
      name: 'body',
      type: 'richText',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'cta',
      type: 'array',
      labels: { singular: 'Button', plural: 'Buttons' },
      maxRows: 2,
      fields: [linkField()],
    },
  ],
}
