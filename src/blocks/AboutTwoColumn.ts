import type { Block } from 'payload'

export const AboutTwoColumn: Block = {
  slug: 'aboutTwoColumn',
  labels: { singular: 'About two-column', plural: 'About two-column' },
  fields: [
    {
      name: 'legal',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', localized: true, defaultValue: 'Legal' },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'role', type: 'text', localized: true, defaultValue: 'Senior Counsel' },
        { name: 'firmName', type: 'text', defaultValue: 'Daburon & Partners' },
        { name: 'firmUrl', type: 'text', defaultValue: 'https://daburon-partners.com' },
        {
          name: 'jurisdictions',
          type: 'array',
          fields: [{ name: 'name', type: 'text', required: true }],
        },
        {
          name: 'languages',
          type: 'array',
          fields: [{ name: 'name', type: 'text', required: true }],
        },
        { name: 'cvUrl', type: 'text', admin: { description: 'URL or path to CV file.' } },
      ],
    },
    {
      name: 'academic',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', localized: true, defaultValue: 'Academic' },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'role', type: 'text', localized: true, defaultValue: 'Research Fellow' },
        { name: 'institution', type: 'text', defaultValue: 'SOAS University of London' },
        { name: 'projectName', type: 'text', defaultValue: 'RELI-GENE' },
        { name: 'projectUrl', type: 'text', defaultValue: 'https://religene.eu' },
        {
          name: 'researchAreas',
          type: 'array',
          fields: [{ name: 'name', type: 'text', required: true }],
        },
      ],
    },
  ],
}
