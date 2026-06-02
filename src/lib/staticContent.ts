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

// Header source (markers for localized nav labels).
const headerSource = {
  logoText: 'Bandar Shanneik',
  showLanguageSwitcher: true,
  nav: [
    { link: { label: L('Über mich', 'About'), type: 'internal', page: { slug: 'about' }, variant: 'plain' } },
    { link: { label: L('Expertise', 'Expertise'), type: 'internal', page: { slug: 'expertise' }, variant: 'plain' } },
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
        greeting: L('Hallo, ich bin Bandar.', "Hi, I'm Bandar."),
        lead: L(
          'Ich bin internationaler Jurist und Rechtswissenschaftler.',
          'I am an international lawyer and legal scholar.',
        ),
        body: L(
          'Seit über einem Jahrzehnt berate ich zu grenzüberschreitenden gesellschaftsrechtlichen Fragen in der Golfregion – mit einer Praxis, die civil-law- und common-law-Rechtsordnungen umspannt. In jüngerer Zeit habe ich mich zunehmend der Wissenschaft zugewandt. Meine Forschung liegt an der Schnittstelle von Recht und seinen Auswirkungen auf Menschen, Kulturen und Gesellschaften.\n\nÜber die juristische Welt hinaus begeistere ich mich für interkulturellen Austausch und internationale Beziehungen.',
          "I've spent over a decade advising on cross-border corporate matters across the Gulf, with a practice spanning civil and common law jurisdictions. More recently, I've turned increasingly toward academia. My research sits at the intersection of law and its impact on people, cultures, and societies.\n\nBeyond the legal world, I'm passionate about cross-cultural exchange and international relations.",
        ),
      },
      {
        blockType: 'aboutTwoColumn',
        legal: {
          heading: L('Recht', 'Legal'),
          body: L(
            'Bandar Shanneik ist ein voll qualifizierter deutscher Jurist, dessen Tätigkeit Gesellschafts- und Handelsrecht, Immobilienrecht, Schiedsverfahren und Governance umfasst. Er berät Unternehmen, Investoren und Privatpersonen in der deutschen, englischen und emiratischen Rechtsordnung mit einem praxisnahen, wirtschaftlich orientierten Ansatz.',
            'Bandar Shanneik is a fully qualified German lawyer whose practice spans corporate and commercial matters, real estate, arbitration and governance. He advises companies, investors and private clients across the German, English and Emirati legal systems with a practical, commercially aware approach.',
          ),
          role: L('Senior Counsel', 'Senior Counsel'),
          firmName: 'Daburon & Partners',
          firmUrl: 'https://daburon-partners.com',
          jurisdictions: [
            { name: L('Deutschland', 'Germany') },
            { name: L('England & Wales', 'England & Wales') },
            { name: L('Vereinigte Arabische Emirate', 'United Arab Emirates') },
          ],
          languages: [
            { name: L('Deutsch', 'German') },
            { name: L('Arabisch', 'Arabic') },
            { name: L('Englisch', 'English') },
          ],
          cvUrl: '#',
        },
        academic: {
          heading: L('Wissenschaft', 'Academic'),
          body: L(
            'Seine Forschung untersucht, wie rechtliche Rahmenbedingungen Migration, Ehe, Geschlecht und die Anerkennung von Familien prägen und von ihnen geprägt werden — mit einem Schwerpunkt auf grenzüberschreitenden Herausforderungen und dem Schutz von Rechten in Kontexten von Flucht, Vielfalt und gesellschaftlichem Wandel.',
            'His research examines how legal frameworks shape and are shaped by migration, marriage, gender and family recognition — with a focus on cross-border challenges and the protection of rights in contexts of displacement, diversity and social change.',
          ),
          role: L('Research Fellow', 'Research Fellow'),
          institution: 'SOAS University of London',
          projectName: 'RELI-GENE',
          projectUrl: 'https://religene.eu',
          researchAreas: [
            { name: L('Rechtsvergleichung', 'Comparative law') },
            { name: L('Migration', 'Migration') },
            { name: L('Geschlecht & Familienanerkennung', 'Gender & family recognition') },
            { name: L('Menschenrechte', 'Human rights') },
          ],
        },
      },
    ],
  },
  expertise: {
    title: L('Expertise', 'Expertise'),
    description: L(
      'Juristische Expertise in den Bereichen Gesellschafts- und Handelsrecht, Immobilien, Schiedsverfahren und Governance.',
      'Areas of legal expertise across corporate, commercial, real estate, arbitration and governance matters.',
    ),
    blocks: [
      {
        blockType: 'expertise',
        heading: L('Fachgebiete', 'Areas of Expertise'),
        intro: L(
          'Bandars juristischer Hintergrund umfasst Gesellschafts- und Handelsrecht, Immobilienrecht, Schiedsverfahren und Governance im deutschen, englischen und VAE-Recht. Er ist Senior Counsel bei Daburon & Partners.',
          "Bandar's legal background spans corporate and commercial matters, real estate, arbitration and governance across German, English and UAE law. He is Senior Counsel at Daburon & Partners.",
        ),
        jurisdictions: [
          { name: L('Deutschland', 'Germany') },
          { name: L('England & Wales', 'England & Wales') },
          { name: L('Vereinigte Arabische Emirate', 'United Arab Emirates') },
        ],
        items: [
          { label: L('Gesellschaftsrecht', 'Corporate Law') },
          { label: L('Handelsverträge', 'Commercial Contracts') },
          { label: L('Fusionen & Übernahmen', 'Mergers & Acquisitions') },
          { label: L('Immobilienrecht', 'Real Estate') },
          { label: L('Schiedsverfahren', 'Arbitration') },
          { label: L('Governance', 'Governance') },
          { label: L('Arbeitsrecht', 'Employment Law') },
          { label: L('Steuerrecht', 'Tax') },
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
          'Meine Forschung untersucht, wie rechtliche Rahmenbedingungen Migration, Ehe, Geschlecht und die Anerkennung von Familien prägen und von ihnen geprägt werden. Ich konzentriere mich auf grenzüberschreitende rechtliche Herausforderungen und den Schutz von Rechten in Kontexten von Flucht, Vielfalt und gesellschaftlichem Wandel. Die Arbeit verbindet Rechtswissenschaft und gelebte Erfahrung über europäische und nahöstliche Rechtsordnungen hinweg.',
          'My research examines how legal frameworks shape and are shaped by migration, marriage, gender and family recognition. I focus on cross-border legal challenges and the protection of rights in contexts of displacement, diversity and social change. The work bridges legal scholarship and lived experience across European and Middle Eastern jurisdictions.',
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
