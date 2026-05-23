import type { Locale } from './i18n'

export type StaticBlock = { blockType: string; [key: string]: unknown }

export type StaticPage = {
  blocks: StaticBlock[]
  description?: string
  title: string
}

export type StaticLink = {
  label: string
  newTab?: boolean
  page?: { slug: string }
  type: 'external' | 'internal'
  url?: string
  variant?: 'outline' | 'plain' | 'primary'
}

type StaticFooter = {
  brandName: string
  columns: Array<{ heading: string; links: Array<{ link: StaticLink }> }>
  copyright: string
  tagline: string
}

type StaticHeader = {
  logoText: string
  nav: Array<{ link: StaticLink }>
  showLanguageSwitcher: boolean
}

const lexical = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
      },
    ],
  },
})

export const header: StaticHeader = {
  logoText: 'Bandar Shanneik',
  showLanguageSwitcher: true,
  nav: [
    { link: { label: 'About', type: 'internal', page: { slug: 'about' }, variant: 'plain' } },
    { link: { label: 'Legal', type: 'internal', page: { slug: 'legal' }, variant: 'plain' } },
    { link: { label: 'Research', type: 'internal', page: { slug: 'research' }, variant: 'plain' } },
    { link: { label: 'Contact', type: 'internal', page: { slug: 'contact' }, variant: 'plain' } },
  ],
}

export const footer: StaticFooter = {
  brandName: 'Bandar Shanneik',
  tagline: 'Cross-border legal consultancy across the Middle East and Europe',
  columns: [
    {
      heading: 'Contact',
      links: [
        {
          link: {
            label: 'contact.shanneik@gmail.com',
            type: 'external',
            url: 'mailto:contact.shanneik@gmail.com',
            variant: 'plain',
          },
        },
      ],
    },
    {
      heading: 'Connect',
      links: [
        {
          link: {
            label: 'LinkedIn',
            type: 'external',
            url: 'https://linkedin.com/',
            newTab: true,
            variant: 'plain',
          },
        },
      ],
    },
    {
      heading: 'Explore',
      links: header.nav,
    },
  ],
  copyright: '© 2026 Bandar Shanneik. All rights reserved.',
}

const publications = [
  {
    year: '2027',
    kind: 'peer-reviewed',
    title: 'Who Counts as a Family in Europe: Polygamous Refugees and the Boundaries of Recognition',
    venue: 'Journal of Law and Society',
    status: 'in prep.',
  },
  {
    year: '2026',
    kind: 'book-chapter',
    title: 'Forced Divorce: Syrian Refugees and the Act to Combat Child Marriage in Germany',
    venue: 'Politics of Marriage and Gender: Global Issues in Local Contexts (Rutgers University Press)',
    status: 'in print',
  },
  {
    year: '2022',
    kind: 'legal-article',
    title: 'Der Immobilienerwerb in den Vereinigten',
    venue: 'immo aktuell 4(6), 316-320',
  },
]

const pages: Record<string, StaticPage> = {
  home: {
    title: 'Bandar Shanneik',
    description:
      'Cross-border legal consultancy for companies, investors and private clients across the Middle East and Europe.',
    blocks: [
      {
        blockType: 'hero',
        title: 'Bandar Shanneik',
        body:
          'Bandar Shanneik provides cross-border legal consultancy for companies, investors and private clients across real estate, corporate, commercial and governance matters. With a legal background spanning Germany, the Middle East, and Europe, he offers precise, practical and commercially aware advice in German, Arabic and English.',
        imageStyle: 'rounded',
        ctas: [
          { link: { label: 'Legal', type: 'internal', page: { slug: 'legal' }, variant: 'primary', icon: 'scale' } },
          {
            link: {
              label: 'Research',
              type: 'internal',
              page: { slug: 'research' },
              variant: 'outline',
              icon: 'book',
            },
          },
        ],
      },
    ],
  },
  about: {
    title: 'About',
    description: 'Background, education, jurisdictions and languages for Bandar Shanneik.',
    blocks: [
      {
        blockType: 'background',
        heading: 'Background',
        body: lexical(
          'Bandar Shanneik is a Senior Legal Consultant and fully qualified German lawyer whose work sits at the intersection of European legal training and Middle Eastern commercial practice. He advises companies, investors and private clients on corporate and commercial matters, contracts, mergers and acquisitions, arbitration, real estate, tax and employment law. Fluent in German, Arabic and English, he supports clients navigating cross-border legal questions with clarity, discretion and a practical understanding of both legal detail and commercial context.',
        ),
        cta: [
          {
            link: {
              label: 'Download CV',
              type: 'external',
              url: '#',
              variant: 'outline',
              icon: 'download',
            },
          },
        ],
      },
      {
        blockType: 'educationJurisdictions',
        heading: 'Education & Jurisdictions',
        education: [
          {
            institution: 'Vrije Universiteit Amsterdam (Netherlands)',
            detail:
              "Master of Laws (LL.M.) in 'International Business Law: Commercial Transactions' (cum laude; Valedictorian)",
          },
          {
            institution: 'Julius-Maximilians-Universität, Würzburg (Germany)',
            detail:
              'Diploma in law, specialising in European and International Economic Transactions and Legal Relations',
          },
          { institution: 'San Diego State University, San Diego (USA)' },
        ],
        jurisdictions: [
          { name: 'Germany', icon: 'bank' },
          { name: 'England and Wales', icon: 'wig' },
          { name: 'United Arab Emirates', icon: 'skyline' },
        ],
        languages: [{ name: 'German' }, { name: 'Arabic' }, { name: 'English' }],
      },
    ],
  },
  legal: {
    title: 'Legal',
    description: 'Legal services and practice areas.',
    blocks: [
      {
        blockType: 'serviceCards',
        heading: 'Legal Services',
        intro:
          'Cross-border legal consultancy for commercial matters, investments, real estate, governance and disputes. The work is practical, discreet and structured around the commercial context behind each legal question.',
        cards: [
          {
            title: 'Corporate & Commercial',
            body:
              'Advice on contracts, company structures, commercial negotiations and governance questions across jurisdictions.',
          },
          {
            title: 'Real Estate & Investment',
            body:
              'Support for private clients, investors and companies navigating real estate transactions and investment matters.',
          },
          {
            title: 'Disputes & Arbitration',
            body:
              'Strategic legal support for cross-border disputes, arbitration-related work and risk assessment.',
          },
        ],
      },
      {
        blockType: 'practiceAreas',
        heading: 'Practice Areas',
        items: [
          { label: 'Corporate Law' },
          { label: 'Commercial Contracts' },
          { label: 'Mergers & Acquisitions' },
          { label: 'Real Estate' },
          { label: 'Arbitration' },
          { label: 'Governance' },
          { label: 'Employment Law' },
          { label: 'Tax' },
        ],
      },
      {
        blockType: 'ctaBanner',
        heading: 'Need Legal Advice?',
        background: 'forest',
        cta: [{ link: { label: 'Contact Bandar', type: 'internal', page: { slug: 'contact' }, variant: 'outline' } }],
      },
    ],
  },
  research: {
    title: 'Research',
    description: 'Research and publications by Bandar Shanneik.',
    blocks: [
      {
        blockType: 'richText',
        heading: 'Research & Publications',
        content: lexical(
          'Research at the intersection of comparative law, migration, marriage, gender, family recognition and human rights.',
        ),
        alignment: 'center',
      },
      {
        blockType: 'researchTimeline',
        heading: 'Selected Publications',
        mode: 'manual',
        manualItems: publications,
      },
      {
        blockType: 'researchProfileCard',
        heading: 'Research Profile',
        role: 'Research Fellow',
        body:
          'My research examines how legal frameworks shape and are shaped by migration, marriage, gender and family recognition. I focus on cross-border legal challenges and the protection of rights in contexts of displacement, diversity and social change.',
      },
      {
        blockType: 'tagBoxes',
        heading: 'Areas of Interest',
        items: [
          { label: 'Comparative Law' },
          { label: 'Migration Law' },
          { label: 'Gender & Equality' },
          { label: 'Refugee Law' },
          { label: 'Human Rights' },
          { label: 'Family Recognition' },
        ],
      },
    ],
  },
  contact: {
    title: 'Contact',
    description: 'Contact Bandar Shanneik for legal consultancy or research collaboration.',
    blocks: [
      {
        blockType: 'contactForm',
        heading: 'Get in touch',
        intro:
          'For inquiries about legal consultancy or research collaboration, share a few details and Bandar will be in touch within two working days.',
        email: 'contact.shanneik@gmail.com',
        submitLabel: 'Send message',
        successMessage: 'Thank you. Your message has been received — Bandar will reply directly.',
        showSubject: true,
      },
    ],
  },
}

export function getStaticPage(_locale: Locale, slug: string): StaticPage | null {
  return pages[slug] ?? null
}
