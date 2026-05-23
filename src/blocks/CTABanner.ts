import type { Block } from 'payload'
import { linkField } from '../fields/link'

export const CTABanner: Block = {
  slug: 'ctaBanner',
  labels: { singular: 'CTA banner', plural: 'CTA banners' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'subtext',
      type: 'text',
      localized: true,
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'forest',
      options: [
        { label: 'Forest green', value: 'forest' },
        { label: 'Cream', value: 'cream' },
        { label: 'Gold', value: 'gold' },
      ],
    },
    {
      name: 'cta',
      type: 'array',
      maxRows: 2,
      labels: { singular: 'Button', plural: 'Buttons' },
      fields: [linkField()],
    },
  ],
}
