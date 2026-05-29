import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateOnChange, revalidateOnDelete } from '../lib/revalidate'
import {
  Hero,
  RichText,
  Background,
  EducationJurisdictions,
  ServiceCards,
  PracticeAreas,
  CTABanner,
  ResearchTimeline,
  ResearchProfileCard,
  TagBoxes,
  Contact,
  ContactForm,
} from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description:
      'Each page is a stack of blocks. Add, reorder, remove and customise blocks freely.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidateOnChange],
    afterDelete: [revalidateOnDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'URL path segment. Use "home" for the front page. Use "/" between parts for nested paths.',
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      labels: { singular: 'Block', plural: 'Blocks' },
      blocks: [
        Hero,
        RichText,
        Background,
        EducationJurisdictions,
        ServiceCards,
        PracticeAreas,
        CTABanner,
        ResearchTimeline,
        ResearchProfileCard,
        TagBoxes,
        Contact,
        ContactForm,
      ],
    },
  ],
}
