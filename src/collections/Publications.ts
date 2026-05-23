import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Publications: CollectionConfig = {
  slug: 'publications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['year', 'title', 'kind', 'status'],
    description: 'Reusable publication records that can be pulled into Research timeline blocks.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: '-year',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'year',
      type: 'text',
      required: true,
    },
    {
      name: 'kind',
      type: 'select',
      defaultValue: 'peer-reviewed',
      options: [
        { label: 'Peer-reviewed', value: 'peer-reviewed' },
        { label: 'Book chapter', value: 'book-chapter' },
        { label: 'Legal article', value: 'legal-article' },
        { label: 'Working paper', value: 'working-paper' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'venue',
      type: 'text',
      localized: true,
      admin: { description: 'Journal name, book series, publisher, etc.' },
    },
    {
      name: 'status',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "in prep.", "in print", "(2022)"' },
    },
    {
      name: 'doi',
      type: 'text',
      admin: { description: 'Optional DOI or external link.' },
    },
  ],
}
