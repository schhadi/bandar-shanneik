import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  labels: { singular: 'Submission', plural: 'Submissions' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    description: 'Messages submitted through the contact form.',
  },
  access: {
    // Anyone can submit (write); only admins can read or delete.
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: '-createdAt',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'subject', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'meta',
      type: 'group',
      admin: { description: 'Captured automatically.' },
      fields: [
        { name: 'locale', type: 'text' },
        { name: 'pageSlug', type: 'text' },
        { name: 'userAgent', type: 'text' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Replied', value: 'replied' },
        { label: 'Archived', value: 'archived' },
      ],
    },
  ],
}
