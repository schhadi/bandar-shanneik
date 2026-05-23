import type { Block } from 'payload'

export const ResearchTimeline: Block = {
  slug: 'researchTimeline',
  labels: { singular: 'Research timeline', plural: 'Research timelines' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Selected Publications',
    },
    {
      name: 'mode',
      type: 'radio',
      defaultValue: 'collection',
      options: [
        { label: 'Pull from Publications collection', value: 'collection' },
        { label: 'Manual entries', value: 'manual' },
      ],
    },
    {
      name: 'publications',
      type: 'relationship',
      relationTo: 'publications',
      hasMany: true,
      admin: {
        condition: (_, sibling) => sibling?.mode === 'collection',
        description: 'Order they appear on the page matches the order here.',
      },
    },
    {
      name: 'manualItems',
      type: 'array',
      admin: {
        condition: (_, sibling) => sibling?.mode === 'manual',
      },
      labels: { singular: 'Entry', plural: 'Entries' },
      fields: [
        { name: 'year', type: 'text', required: true },
        {
          name: 'kind',
          type: 'select',
          options: [
            { label: 'Peer-reviewed', value: 'peer-reviewed' },
            { label: 'Book chapter', value: 'book-chapter' },
            { label: 'Legal article', value: 'legal-article' },
            { label: 'Working paper', value: 'working-paper' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'peer-reviewed',
        },
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'venue', type: 'text', localized: true },
        { name: 'status', type: 'text', localized: true, admin: { description: 'e.g. "in prep.", "in print"' } },
      ],
    },
  ],
}
