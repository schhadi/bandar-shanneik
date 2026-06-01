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

export const portrait = {
  filename: 'b0137a0d-de85-49a1-a8fe-6a94186ec2c5.JPG',
  url: '/media/b0137a0d-de85-49a1-a8fe-6a94186ec2c5.JPG',
  alt: 'Portrait of Bandar Shanneik',
  width: 1080,
  height: 1608,
}

export const header: StaticHeader = {
  logoText: 'Bandar Shanneik',
  showLanguageSwitcher: true,
  nav: [
    { link: { label: 'About', type: 'internal', page: { slug: 'about' }, variant: 'plain' } },
    { link: { label: 'Expertise', type: 'internal', page: { slug: 'legal' }, variant: 'plain' } },
    { link: { label: 'Research', type: 'internal', page: { slug: 'research' }, variant: 'plain' } },
    { link: { label: 'Contact', type: 'internal', page: { slug: 'contact' }, variant: 'plain' } },
  ],
}

export const footer: StaticFooter = {
  brandName: 'Bandar Shanneik',
  tagline: '',
  columns: [],
  copyright: '',
}

export const staticPublications = [
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

export const staticPages: Record<string, StaticPage> = {
  home: {
    title: 'Bandar Shanneik',
    description: 'Bandar Shanneik — legal expert and academic.',
    blocks: [
      {
        blockType: 'hero',
        title: 'Bandar Shanneik',
        descriptor: 'Legal expert & academic.',
        image: portrait,
      },
    ],
  },
  about: {
    title: 'About',
    description: 'Bandar Shanneik — two parallel identities: legal practice and academic research.',
    blocks: [
      {
        blockType: 'aboutTwoColumn',
        legal: {
          heading: 'Legal',
          body:
            'Bandar Shanneik is a fully qualified German lawyer whose practice spans corporate and commercial matters, real estate, arbitration and governance. He advises companies, investors and private clients across the German, English and Emirati legal systems with a practical, commercially aware approach.',
          role: 'Senior Counsel',
          firmName: 'Daburon & Partners',
          firmUrl: 'https://daburon-partners.com',
          jurisdictions: [
            { name: 'Germany' },
            { name: 'England & Wales' },
            { name: 'United Arab Emirates' },
          ],
          languages: [{ name: 'German' }, { name: 'Arabic' }, { name: 'English' }],
          cvUrl: '#',
        },
        academic: {
          heading: 'Academic',
          body:
            'His research examines how legal frameworks shape and are shaped by migration, marriage, gender and family recognition — with a focus on cross-border challenges and the protection of rights in contexts of displacement, diversity and social change.',
          role: 'Research Fellow',
          institution: 'SOAS University of London',
          projectName: 'RELI-GENE',
          projectUrl: 'https://religene.eu',
          researchAreas: [
            { name: 'Comparative law' },
            { name: 'Migration' },
            { name: 'Gender & family recognition' },
            { name: 'Human rights' },
          ],
        },
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
        manualItems: staticPublications,
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
  return staticPages[slug] ?? null
}
