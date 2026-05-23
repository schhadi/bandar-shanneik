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
      admin: { description: 'Shown next to the form as a direct email link.' },
    },
    {
      name: 'successMessage',
      type: 'text',
      localized: true,
      defaultValue: 'Thank you. Your message has been sent.',
    },
    {
      name: 'submitLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Send message',
    },
    {
      name: 'showSubject',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional portrait shown beside the form on desktop.' },
    },
  ],
}
