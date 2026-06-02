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

// ---------------------------------------------------------------------------
// Bilingual source of truth.
//
// Translatable strings are wrapped in L(de, en). Everything else (URLs, proper
// nouns, image refs, enum values) is shared across locales. `localize(value,
// locale)` deep-walks a value and replaces every marker with that locale's
// string, leaving shared fields untouched. The de/en structures it produces are
// identical in shape — only string values differ — which is what lets the seed
// write both locales onto the same array rows. German is the primary locale.
// ---------------------------------------------------------------------------

type I18nString = { _i18n: true; de: string; en: string }
const L = (de: string, en: string): I18nString => ({ _i18n: true, de, en })

function isMarker(value: unknown): value is I18nString {
  return typeof value === 'object' && value !== null && (value as any)._i18n === true
}

export function localize<T = any>(value: any, locale: Locale): T {
  if (isMarker(value)) return value[locale] as T
  if (Array.isArray(value)) return value.map((v) => localize(v, locale)) as T
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) out[k] = localize(v, locale)
    return out as T
  }
  return value as T
}

export const portrait = {
  filename: '91e7509c-53a8-49f0-8fab-71b00ebe2eb3.JPG',
  url: '/media/91e7509c-53a8-49f0-8fab-71b00ebe2eb3.JPG',
  alt: 'Portrait of Bandar Shanneik',
  width: 2080,
  height: 3120,
}

export const speakingImage = {
  filename: '10e56e8d-a25f-4063-9974-8d00e1b3529f.JPG',
  url: '/media/10e56e8d-a25f-4063-9974-8d00e1b3529f.JPG',
  alt: 'Bandar Shanneik delivering an address at a lectern',
  width: 2850,
  height: 1900,
}

export const aboutImage = {
  filename: 'af6a4ed9-3dd5-43ec-a6c3-06e3a1342f1f.JPG',
  url: '/media/af6a4ed9-3dd5-43ec-a6c3-06e3a1342f1f.JPG',
  alt: 'Bandar Shanneik at the Sheikh Zayed Grand Mosque',
  width: 2080,
  height: 3120,
}

// Header source (markers for localized nav labels).
const headerSource = {
  logoText: 'Bandar Shanneik',
  showLanguageSwitcher: true,
  nav: [
    { link: { label: L('Über mich', 'About'), type: 'internal', page: { slug: 'about' }, variant: 'plain' } },
    { link: { label: L('Beratung', 'Advisory'), type: 'internal', page: { slug: 'advisory' }, variant: 'plain' } },
    { link: { label: L('Forschung', 'Research'), type: 'internal', page: { slug: 'research' }, variant: 'plain' } },
    { link: { label: L('Vorträge', 'Speaking'), type: 'internal', page: { slug: 'speaking' }, variant: 'plain' } },
    { link: { label: L('Kontakt', 'Contact'), type: 'internal', page: { slug: 'contact' }, variant: 'plain' } },
  ],
}

export const footer: StaticFooter = {
  brandName: 'Bandar Shanneik',
  tagline: '',
  columns: [],
  copyright: '',
}

// Publications: real works — titles/venues kept in their original language,
// only the status flag is localized.
const publicationsSource = [
  {
    year: '2027',
    kind: 'peer-reviewed',
    title: 'Who Counts as a Family in Europe: Polygamous Refugees and the Boundaries of Recognition',
    venue: 'Journal of Law and Society',
    status: L('in Vorb.', 'in prep.'),
  },
  {
    year: '2026',
    kind: 'book-chapter',
    title: 'Forced Divorce: Syrian Refugees and the Act to Combat Child Marriage in Germany',
    venue: 'Politics of Marriage and Gender: Global Issues in Local Contexts (Rutgers University Press)',
    status: L('im Druck', 'in print'),
  },
  {
    year: '2022',
    kind: 'legal-article',
    title: 'Der Immobilienerwerb in den Vereinigten',
    venue: 'immo aktuell 4(6), 316-320',
  },
]

const pagesSource: Record<string, any> = {
  home: {
    title: L('Bandar Shanneik', 'Bandar Shanneik'),
    description: L(
      'Bandar Shanneik — Jurist und Wissenschaftler.',
      'Bandar Shanneik — legal expert and academic.',
    ),
    blocks: [
      {
        blockType: 'hero',
        title: L('Bandar Shanneik', 'Bandar Shanneik'),
        descriptor: L('Jurist & Akademiker', 'Lawyer & Legal Scholar'),
        subheading: L(
          'An der Schnittstelle von juristischer Praxis und Wissenschaft – über Deutschland, England und die VAE hinweg.',
          'At the intersection of legal practice and academia — across Germany, England and the UAE.',
        ),
        image: portrait,
      },
    ],
  },
  about: {
    title: L('Über mich', 'About'),
    description: L(
      'Bandar Shanneik — zwei parallele Identitäten: juristische Praxis und akademische Forschung.',
      'Bandar Shanneik — two parallel identities: legal practice and academic research.',
    ),
    blocks: [
      {
        blockType: 'aboutIntro',
        image: aboutImage,
        greeting: L('Hallo, ich bin Bandar.', "Hi, I'm Bandar."),
        lead: L(
          'Ich bin internationaler Jurist und Rechtswissenschaftler.',
          'I am an international lawyer and legal scholar.',
        ),
        body: L(
          'Seit über einem Jahrzehnt berate ich zu grenzüberschreitenden gesellschaftsrechtlichen Fragen in der Golfregion – mit einer Praxis, die civil-law- und common-law-Rechtsordnungen umspannt. In jüngerer Zeit habe ich mich zunehmend der Wissenschaft zugewandt. Meine Forschung liegt an der Schnittstelle von Recht und seinen Auswirkungen auf Menschen, Kulturen und Gesellschaften.\n\nÜber die juristische Welt hinaus begeistere ich mich für interkulturellen Austausch und internationale Beziehungen.',
          "I've spent over a decade advising on cross-border corporate matters across the Gulf, with a practice spanning civil and common law jurisdictions. More recently, I've turned increasingly toward academia. My research sits at the intersection of law and its impact on people, cultures, and societies.\n\nBeyond the legal world, I'm passionate about cross-cultural exchange and international relations.",
        ),
        cvUrl: '#',
      },
    ],
  },
  advisory: {
    title: L('Beratung', 'Advisory'),
    description: L(
      'Rechtsberatung in den Bereichen Gesellschafts- und Handelsrecht, Immobilien, Schiedsverfahren und Governance.',
      'Legal advisory across corporate, commercial, real estate, arbitration and governance matters.',
    ),
    blocks: [
      {
        blockType: 'expertise',
        heading: L('Beratung', 'Advisory'),
        lead: L(
          'Über ein Jahrzehnt grenzüberschreitende juristische Praxis – für Unternehmen, Investoren und Privatpersonen im deutschen, englischen und emiratischen Recht.',
          'Over a decade of cross-border legal practice — for companies, investors and private clients across German, English and Emirati law.',
        ),
        intro: L(
          'Bandars Tätigkeit umfasst Gesellschafts- und Handelsrecht, M&A, Immobilien, Schiedsverfahren und Governance – mit wachsendem Schwerpunkt auf Datenschutz und neuen Technologien. Als in drei Rechtsordnungen qualifizierter Jurist verbindet er eine zivilrechtliche Grundlage mit der Praxis des Common Law und langjähriger Erfahrung in der Golfregion. Komplexe, rechtsordnungsübergreifende Fragen übersetzt er in klare, wirtschaftlich orientierte Beratung. Er ist Senior Counsel bei Daburon & Partners.',
          "Bandar's work spans corporate and commercial law, M&A, real estate, arbitration and governance — with a growing focus on data protection and emerging technology. Qualified across three legal systems, he pairs a civil-law foundation with common-law practice and long experience in the Gulf, turning complex, multi-jurisdictional questions into clear, commercially aware advice. He is Senior Counsel at Daburon & Partners.",
        ),
        jurisdictions: [
          { name: L('Deutschland', 'Germany') },
          { name: L('England & Wales', 'England & Wales') },
          { name: L('Vereinigte Arabische Emirate', 'United Arab Emirates') },
        ],
        areas: [
          {
            title: L('Gesellschaftsrecht', 'Corporate Law'),
            description: L(
              'Gründung, Strukturierung, Gesellschaftervereinbarungen und laufende gesellschaftsrechtliche Fragen.',
              'Formation, structuring, shareholder arrangements and ongoing corporate matters.',
            ),
          },
          {
            title: L('Handelsverträge', 'Commercial Contracts'),
            description: L(
              'Gestaltung und Verhandlung grenzüberschreitender Handelsverträge – von Liefer- und Vertriebsverträgen bis zu komplexen Einzelvereinbarungen.',
              'Drafting and negotiating cross-border commercial agreements, from supply and distribution to bespoke arrangements.',
            ),
          },
          {
            title: L('Fusionen & Übernahmen', 'Mergers & Acquisitions'),
            description: L(
              'Share- und Asset-Deals, Due Diligence und Transaktionsbegleitung über Rechtsordnungen hinweg.',
              'Share and asset deals, due diligence and transaction support across jurisdictions.',
            ),
          },
          {
            title: L('Immobilienrecht', 'Real Estate'),
            description: L(
              'Erwerb, Veräußerung und Strukturierung von Immobilieninvestitionen – mit besonderer Tiefe in den VAE.',
              'Acquisition, disposal and structuring of real-estate investments, with particular depth in the UAE.',
            ),
          },
          {
            title: L('Schiedsverfahren', 'Arbitration'),
            description: L(
              'Wirtschaftliche Streitbeilegung und Schiedsverfahren, einschließlich Fragen von Gerichtsstand und anwendbarem Recht.',
              'Commercial dispute resolution and arbitration, including questions of forum and governing law.',
            ),
          },
          {
            title: L('Governance', 'Governance'),
            description: L(
              'Corporate Governance, Compliance-Strukturen und Beratung von Geschäftsführung und Gremien.',
              'Corporate governance, compliance frameworks and advising boards and management.',
            ),
          },
          {
            title: L('Arbeitsrecht', 'Employment Law'),
            description: L(
              'Arbeitsrechtliche Fragen im deutschen und im Golf-Kontext.',
              'Employment and labour matters across German and Gulf frameworks.',
            ),
          },
          {
            title: L('Steuerrecht', 'Tax'),
            description: L(
              'Steuerlich bewusste Strukturierung für Unternehmen und Privatpersonen.',
              'Tax-aware structuring for companies and private clients.',
            ),
          },
          {
            title: L('Datenschutz & Technologie', 'Data Protection & Technology'),
            description: L(
              'Datenschutz-Compliance sowie rechtliche Fragen rund um KI und neue Technologien.',
              'Data protection compliance and the legal questions raised by AI and emerging technology.',
            ),
          },
        ],
      },
    ],
  },
  research: {
    title: L('Forschung', 'Research'),
    description: L(
      'Forschung und Publikationen von Bandar Shanneik.',
      'Research and publications by Bandar Shanneik.',
    ),
    blocks: [
      {
        blockType: 'researchIntro',
        heading: L('Akademische Forschung', 'Academic Research'),
        position: {
          role: L('Research Fellow', 'Research Fellow'),
          institution: L('SOAS University of London', 'SOAS University of London'),
          project: {
            label: 'RELI-GENE',
            url: 'https://religene.eu',
            note: L(
              'ein vom ERC mit einem Consolidator Grant gefördertes Projekt unter der Leitung von Prof. Yafa Shanneik',
              'an ERC Consolidator Grant project led by Prof. Yafa Shanneik',
            ),
          },
        },
        body: L(
          'Meine Forschung untersucht, wie rechtliche Rahmenbedingungen Migration, Ehe, Geschlecht und die Anerkennung von Familien prägen und von ihnen geprägt werden – über europäische und nahöstliche Rechtsordnungen hinweg.',
          'My research examines how legal frameworks shape and are shaped by migration, marriage, gender and family recognition — across European and Middle Eastern jurisdictions.',
        ),
      },
      {
        blockType: 'researchTimeline',
        heading: L('Ausgewählte Publikationen', 'Selected Publications'),
        mode: 'manual',
        manualItems: publicationsSource,
        compact: true,
      },
    ],
  },
  speaking: {
    title: L('Vorträge', 'Speaking'),
    description: L(
      'Vorträge, Workshops, Podiumsdiskussionen und Webinare von Bandar Shanneik zu Recht und Wirtschaft.',
      'Talks, workshops, panel discussions and webinars by Bandar Shanneik on law and business.',
    ),
    blocks: [
      {
        blockType: 'speaking',
        image: speakingImage,
        heading: L('Vorträge & öffentliches Engagement', 'Speaking & Public Engagement'),
        intro: L(
          'Eine Auswahl von Vorträgen, Workshops, Podiumsdiskussionen und Webinaren zu Recht und Wirtschaft – mit einem Schwerpunkt auf der MENA-Region.',
          'A selection of talks, workshops, panel discussions and webinars on law and business — with a focus on the MENA region.',
        ),
        groups: [
          {
            title: L('Vorträge & Workshops', 'Legal Presentations & Workshops'),
            items: [
              {
                event: 'German Emirati Joint Council',
                location: 'Dubai',
                title: 'Market Entry in the UAE',
                date: '06.11.2024',
              },
              {
                event: 'German Emirati Joint Council',
                location: 'Dubai',
                title: 'UAE: Legal Updates 2024',
                date: '12.02.2024',
              },
              {
                event: 'German Chamber of Commerce and Industry',
                location: L('Deutschland', 'Germany'),
                title: 'Market Entry into the United Arab Emirates and the Middle East',
                date: '02.2024',
              },
              {
                event: 'Netherlands Business Council',
                location: 'Dubai',
                title:
                  'Commercial Contracts in the UAE: Practical Examples and What Really Matters When Drawing Up or Signing Commercial Contracts',
                date: '15.03.2023',
              },
              {
                event: 'Austrian Business Council',
                location: 'Dubai',
                title:
                  'Commercial Contracts: Litigation or Arbitration? Local Law or Foreign Law? What really matters before entering into a contract',
                date: '02.11.2022',
              },
            ],
          },
          {
            title: L('Podiumsdiskussionen', 'Panel Discussions'),
            items: [
              {
                event: 'MENA Forum Bayern 2025, Chamber of Industry and Commerce',
                location: L('München', 'Munich'),
                title: 'The MENA Region: Geopolitical Challenges and Economic Opportunities',
                date: '22.05.2025',
              },
              {
                event: '27th Arab-German Business Forum, Ghorfa',
                location: 'Berlin',
                title:
                  'Beyond Borders: Capitalising on Investment Opportunities in Arab Special & Free Zones',
                date: '03.06.2024',
              },
            ],
          },
          {
            title: L('Online-Webinare', 'Online Webinars'),
            items: [
              {
                event: "Webinar Series 'Global Law Insights', Rödl",
                location: 'Online',
                title: 'Law Insights in Dubai (UAE)',
                date: '29.04.2025',
              },
              {
                event: 'German-Saudi Arabian Liaison Office for Economic Affairs (GESALO)',
                location: 'Online',
                title: "Navigating Saudi Arabia's Personal Data Protection Law",
                date: '25.02.2025',
              },
            ],
          },
        ],
      },
    ],
  },
  contact: {
    title: L('Kontakt', 'Contact'),
    description: L(
      'Kontaktieren Sie Bandar Shanneik für Forschungskooperationen oder allgemeine Anfragen.',
      'Contact Bandar Shanneik for research collaboration or general enquiries.',
    ),
    blocks: [
      {
        blockType: 'contactForm',
        heading: L('Kontakt aufnehmen', 'Get in touch'),
        intro: L(
          'Für Forschungskooperationen oder allgemeine Anfragen nehmen Sie gerne Kontakt auf.',
          'For research collaboration or general enquiries, get in touch.',
        ),
        email: 'contact.shanneik@gmail.com',
        submitLabel: L('Nachricht senden', 'Send message'),
        successMessage: L(
          'Vielen Dank. Ihre Nachricht ist eingegangen — Bandar wird sich direkt bei Ihnen melden.',
          'Thank you. Your message has been received — Bandar will reply directly.',
        ),
        showSubject: true,
        professionalNote: {
          intro: L(
            'Für berufliche Rechtsangelegenheiten wenden Sie sich bitte an',
            'For professional legal matters, please direct enquiries to',
          ),
          linkLabel: L('Daburon & Partners', 'Daburon & Partners'),
          linkUrl: 'https://daburon-partners.com/en/home',
        },
      },
    ],
  },
}

// Exposed for generateStaticParams (slugs) and the seed (per-locale source).
export const staticPages = pagesSource
export const header = headerSource

export function getStaticPage(locale: Locale, slug: string): StaticPage | null {
  const source = pagesSource[slug]
  return source ? localize<StaticPage>(source, locale) : null
}

export function getStaticHeader(locale: Locale) {
  return localize(headerSource, locale)
}
