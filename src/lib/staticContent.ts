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

export const LINKEDIN_URL = 'https://www.linkedin.com/in/bandar-shanneik'
export const DABURON_URL = 'https://daburon-partners.com'
export const DABURON_CONTACT_URL = 'https://daburon-partners.com/en/home'
export const RELIGENE_URL = 'https://religene.eu/'
export const SOAS_URL = 'https://www.soas.ac.uk'

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
    { link: { label: 'Expertise', type: 'internal', page: { slug: 'expertise' }, variant: 'plain' } },
    { link: { label: 'Research', type: 'internal', page: { slug: 'research' }, variant: 'plain' } },
    { link: { label: 'Contact', type: 'internal', page: { slug: 'contact' }, variant: 'plain' } },
  ],
}

// Footer is no longer rendered, but the global is kept so the CMS shape stays valid.
export const footer: StaticFooter = {
  brandName: 'Bandar Shanneik',
  tagline: '',
  columns: [],
  copyright: '© 2026 Bandar Shanneik.',
}

export const staticPublications = [
  {
    year: '2027',
    title: 'Who Counts as a Family in Europe: Polygamous Refugees and the Boundaries of Recognition',
    venue: 'Journal of Law and Society',
    status: 'in prep.',
  },
  {
    year: '2026',
    title: 'Forced Divorce: Syrian Refugees and the Act to Combat Child Marriage in Germany',
    venue: 'Politics of Marriage and Gender: Global Issues in Local Contexts (Rutgers University Press)',
    status: 'in print',
  },
  {
    year: '2022',
    title: 'Der Immobilienerwerb in den Vereinigten Arabischen Emiraten',
    venue: 'immo aktuell 4(6), 316–320',
  },
]

export const staticPages: Record<string, StaticPage> = {
  home: {
    title: 'Bandar Shanneik',
    description:
      'Bandar Shanneik is a lawyer and legal scholar working across German, English and UAE law, and researching law, migration and society.',
    blocks: [
      {
        blockType: 'hero',
        name: 'Bandar Shanneik',
        descriptor: 'Lawyer & Academic',
        tagline:
          'Working across German, English and Emirati law — and at the intersection of law, migration and society.',
        image: portrait,
        linkedin: LINKEDIN_URL,
      },
    ],
  },
  about: {
    title: 'About',
    description: 'The legal and academic profile of Bandar Shanneik.',
    blocks: [
      {
        blockType: 'profileColumns',
        intro:
          'Two parallel identities — a practising lawyer and a legal scholar — informing one another across European and Middle Eastern contexts.',
        legal: {
          heading: 'Legal',
          body:
            'Bandar is a fully qualified German lawyer whose work sits at the intersection of European legal training and Middle Eastern commercial practice. He advises on corporate and commercial matters, real estate, arbitration and governance, bringing clarity and discretion to cross-border questions and a practical feel for the commercial context behind them.',
          affiliationLabel: 'Senior Counsel, Daburon & Partners',
          affiliationUrl: DABURON_URL,
          jurisdictions: ['Germany', 'England & Wales', 'United Arab Emirates'],
          languages: ['German', 'Arabic', 'English'],
        },
        academic: {
          heading: 'Academic',
          body:
            'Bandar’s research examines how legal frameworks shape, and are shaped by, migration, marriage, gender and family recognition. He is drawn to the places where comparative law meets lived experience, and to the protection of rights in contexts of displacement and social change.',
          affiliationLabel: 'Research Fellow, SOAS University of London',
          affiliationUrl: SOAS_URL,
          projectLabel: 'RELI-GENE project',
          projectUrl: RELIGENE_URL,
          researchAreas: [
            'Comparative Law',
            'Migration & Refugee Law',
            'Gender & Family Recognition',
            'Human Rights',
          ],
        },
        cvLabel: 'Download CV',
        cvUrl: '#',
      },
    ],
  },
  expertise: {
    title: 'Expertise',
    description:
      'Bandar Shanneik’s areas of legal expertise across corporate, commercial, real estate, arbitration and governance matters.',
    blocks: [
      {
        blockType: 'expertise',
        heading: 'Legal Expertise',
        intro:
          'Bandar’s legal background spans corporate and commercial matters, real estate, arbitration and governance across German, English and UAE law.',
        affiliationPrefix: 'He is Senior Counsel at',
        affiliationLabel: 'Daburon & Partners',
        affiliationUrl: DABURON_URL,
        areas: [
          'Corporate Law',
          'Commercial Contracts',
          'Mergers & Acquisitions',
          'Real Estate',
          'Arbitration',
          'Governance',
          'Employment Law',
          'Tax',
        ],
      },
    ],
  },
  research: {
    title: 'Research',
    description:
      'Research and publications by Bandar Shanneik, Research Fellow at SOAS University of London.',
    blocks: [
      {
        blockType: 'research',
        heading: 'Research',
        positionPrefix: 'Research Fellow, SOAS University of London — affiliated with the ',
        positionLinkLabel: 'RELI-GENE project',
        positionLinkUrl: RELIGENE_URL,
        positionSuffix:
          ', an ERC Consolidator Grant project led by Prof. Yafa Shanneik.',
        body:
          'My research examines how legal frameworks shape, and are shaped by, migration, marriage, gender and family recognition. I focus on cross-border legal challenges and the protection of rights in contexts of displacement, diversity and social change. Working comparatively across German, English and Islamic legal traditions, I am interested in how families are recognised — or refused recognition — as they move between jurisdictions.',
        publications: staticPublications,
      },
    ],
  },
  contact: {
    title: 'Contact',
    description: 'Get in touch with Bandar Shanneik for research collaboration or general enquiries.',
    blocks: [
      {
        blockType: 'contactForm',
        heading: 'Contact',
        intro: 'For research collaboration or general enquiries, get in touch.',
        professionalPrefix: 'For professional legal matters, Bandar is Senior Counsel at',
        professionalLabel: 'Daburon & Partners',
        professionalUrl: DABURON_CONTACT_URL,
        professionalSuffix: '; enquiries are handled through the firm.',
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
