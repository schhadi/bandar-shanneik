import type { Block } from 'payload'
import { linkField } from '../fields/link'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      admin: { description: 'Optional small label above the title.' },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageStyle',
      type: 'select',
      defaultValue: 'rounded',
      options: [
        { label: 'Rounded corners', value: 'rounded' },
        { label: 'Sharp corners', value: 'sharp' },
        { label: 'Circle', value: 'circle' },
      ],
    },
    {
      name: 'ctas',
      type: 'array',
      labels: { singular: 'Button', plural: 'Buttons' },
      maxRows: 3,
      fields: [linkField()],
    },
  ],
}
