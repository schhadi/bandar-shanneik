import type { Block } from 'payload'

export const ResearchIntro: Block = {
  slug: 'researchIntro',
  labels: { singular: 'Research intro', plural: 'Research intros' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Academic Research',
    },
    {
      name: 'position',
      type: 'group',
      fields: [
        { name: 'role', type: 'text', localized: true },
        { name: 'institution', type: 'text', localized: true },
        {
          name: 'project',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
            { name: 'note', type: 'text', localized: true },
          ],
        },
      ],
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'projectBody',
      type: 'textarea',
      localized: true,
      admin: { description: 'Description of the current project, shown under the affiliation card.' },
    },
  ],
}
