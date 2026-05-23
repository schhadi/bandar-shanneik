import type { Block } from 'payload'

export const EducationJurisdictions: Block = {
  slug: 'educationJurisdictions',
  labels: {
    singular: 'Education & Jurisdictions',
    plural: 'Education & Jurisdictions sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Education & Jurisdictions',
    },
    {
      name: 'education',
      type: 'array',
      labels: { singular: 'Entry', plural: 'Entries' },
      fields: [
        {
          name: 'institution',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'detail',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'jurisdictions',
      type: 'array',
      labels: { singular: 'Jurisdiction', plural: 'Jurisdictions' },
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Bank / institution', value: 'bank' },
            { label: 'Wig / barrister', value: 'wig' },
            { label: 'Skyline', value: 'skyline' },
            { label: 'Flag', value: 'flag' },
          ],
          defaultValue: 'bank',
        },
      ],
    },
    {
      name: 'languages',
      type: 'array',
      labels: { singular: 'Language', plural: 'Languages' },
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
