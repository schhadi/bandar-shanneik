import type { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contactForm',
  labels: { singular: 'Contact form', plural: 'Contact forms' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Get in touch',
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'email',
      type: 'text',
      admin: { description: 'General enquiries email, rendered as a mailto link.' },
    },
    {
      name: 'professionalNote',
      type: 'group',
      admin: { description: 'Optional note directing professional matters elsewhere.' },
      fields: [
        { name: 'intro', type: 'textarea', localized: true },
        { name: 'linkLabel', type: 'text', localized: true },
        { name: 'linkUrl', type: 'text' },
        { name: 'email', type: 'text', admin: { description: 'Professional email, rendered as a mailto link.' } },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional portrait shown beside the form on desktop.' },
    },
  ],
}
