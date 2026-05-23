import type { GroupField } from 'payload'

export const linkField = (overrides?: Partial<GroupField>): GroupField => ({
  name: 'link',
  type: 'group',
  fields: [
    {
      name: 'label',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'type',
      type: 'radio',
      defaultValue: 'internal',
      options: [
        { label: 'Internal page', value: 'internal' },
        { label: 'External URL', value: 'external' },
      ],
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'internal',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'external',
      },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open in new tab',
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Scale (legal)', value: 'scale' },
        { label: 'Book (research)', value: 'book' },
        { label: 'Arrow', value: 'arrow' },
        { label: 'Download', value: 'download' },
      ],
      defaultValue: 'none',
    },
    {
      name: 'variant',
      type: 'select',
      options: [
        { label: 'Primary (filled green)', value: 'primary' },
        { label: 'Outline (gold border)', value: 'outline' },
        { label: 'Plain link', value: 'plain' },
      ],
      defaultValue: 'primary',
    },
  ],
  ...overrides,
})
