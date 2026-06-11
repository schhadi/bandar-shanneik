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
  filename: 'DSCF2537.JPG',
  url: '/media/DSCF2537.JPG',
  alt: 'Portrait of Bandar Shanneik',
  width: 3840,
  height: 5760,
}

export const speakingImage = {
  filename: '10e56e8d-a25f-4063-9974-8d00e1b3529f.JPG',
  url: '/media/10e56e8d-a25f-4063-9974-8d00e1b3529f.JPG',
  alt: 'Bandar Shanneik delivering an address at a lectern',
  width: 2850,
  height: 1900,
}

export const aboutImage = {
  filename: 'DSCF2705.JPG',
  url: '/media/DSCF2705.JPG',
  alt: 'Portrait of Bandar Shanneik',
  width: 3840,
  height: 5760,
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
        descriptor: L('Deutschsprachiger Anwalt in den VAE', 'German-Speaking Lawyer in the UAE'),
        subheading: L(
          'Deutschsprachiger Anwalt in den Vereinigten Arabischen Emiraten – Beratung im deutschen, englischen und VAE-Recht über Deutschland, England und die Golfregion hinweg.',
          'A German-speaking lawyer in the United Arab Emirates — advising across German, English and UAE law, from Germany to England and the Gulf.',
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
          'Seit über einem Jahrzehnt bin ich in der Anwaltspraxis tätig und berate zu grenzüberschreitenden gesellschaftsrechtlichen Fragen in der Golfregion – über civil-law- und common-law-Rechtsordnungen hinweg. In jüngerer Zeit habe ich mich neben der Praxis zunehmend der Wissenschaft zugewandt. Meine Forschung befasst sich mit dem Verhältnis von Recht und seinen Auswirkungen auf Menschen, Kulturen und Gesellschaften.\n\nÜber die juristische Welt hinaus begeistere ich mich für interkulturellen Austausch und internationale Beziehungen.',
          "I've spent over a decade in private practice advising on cross-border corporate matters across the Gulf region, working across both civil law and common law jurisdictions. More recently, alongside practice, I have increasingly turned towards academia. My research focuses on the relationship between law and its impact on people, cultures, and societies.\n\nBeyond the legal world, I'm passionate about cross-cultural exchange and international relations.",
        ),
        cvUrl: '/bandar-shanneik-cv.pdf',
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
          'Ich berate Unternehmen, Investoren und Gründer in Rechtsfragen, die Grenzen und Rechtsordnungen überschreiten.',
          'I advise companies, investors and entrepreneurs on legal matters that cross borders and jurisdictions.',
        ),
        intro: L(
          'Ich bin Of Counsel bei Daburon & Partners Legal Consultancy LLP, einer in den VAE ansässigen Kanzlei, die internationale und regionale Mandanten in den Bereichen Gesellschafts-, Handels- und Immobilienrecht sowie Streitbeilegung berät. Mein Schwerpunkt liegt auf grenzüberschreitenden gesellschafts- und handelsrechtlichen Transaktionen, Joint Ventures, Markteintrittsprojekten und internationaler Schiedsgerichtsbarkeit. Ich berate regelmäßig Mandanten, die in der gesamten Golfregion tätig sind, in Angelegenheiten mit mehreren Rechtsordnungen und verbinde dabei civil-law- und common-law-Perspektiven zu wirtschaftlich praxisnahen Lösungen.',
          'I am Of Counsel at Daburon & Partners Legal Consultancy LLP, a UAE-based law firm advising international and regional clients on corporate, commercial, real estate, and dispute resolution matters. My work focuses on cross-border corporate and commercial transactions, joint ventures, market entry projects, and international arbitration. I regularly advise clients operating across the Gulf region on matters involving multiple jurisdictions, combining civil law and common law perspectives to provide commercially practical solutions.',
        ),
        position: {
          label: L('Aktuelle Position', 'Current position'),
          title: L('Of Counsel', 'Of Counsel'),
          firm: L('Daburon & Partners Legal Consultancy LLP', 'Daburon & Partners Legal Consultancy LLP'),
          blurb: L(
            'Internationale Kanzlei mit Sitz in den Vereinigten Arabischen Emiraten. Beratung in Unternehmensrecht, Schiedsgerichtsbarkeit und mehr.',
            'International law firm based in the United Arab Emirates. Advising on corporate law, arbitration and more.',
          ),
          linkUrl: 'https://www.daburon-partners.com/en/home',
        },
        jurisdictions: [
          { name: L('Deutschland', 'Germany') },
          { name: L('England und Wales', 'England and Wales') },
          { name: L('Vereinigte Arabische Emirate', 'United Arab Emirates') },
        ],
        areas: [
          {
            title: L('Internationale Schiedsgerichtsbarkeit', 'International Arbitration'),
            description: L(
              'Strategische Beratung und Vertretung in grenzüberschreitenden Streitigkeiten in den Bereichen Handel, Bau, Ingenieurwesen und Gesellschaftsrecht.',
              'Strategic advice and representation in cross-border commercial, construction, engineering, and corporate disputes.',
            ),
          },
          {
            title: L('Gesellschafts- & Handelsrecht', 'Corporate & Commercial'),
            description: L(
              'Gesellschaftsrechtliche Strukturierung, Governance, Handelsverträge, Joint Ventures und Markteintrittsprojekte.',
              'Corporate structuring, governance, commercial contracts, joint ventures, and market entry projects.',
            ),
          },
          {
            title: L('Fusionen & Übernahmen', 'Mergers & Acquisitions'),
            description: L(
              'Transaktionsstrukturierung, Due Diligence, Investitionstransaktionen, Erwerbe, Veräußerungen und Restrukturierungen.',
              'Transaction structuring, due diligence, investment transactions, acquisitions, disposals, and restructurings.',
            ),
          },
          {
            title: L('Venture Capital & Start-ups', 'Venture Capital & Startups'),
            description: L(
              'Gründervereinbarungen, Finanzierungsrunden, Gesellschaftervereinbarungen und Transaktionen in der Wachstumsphase.',
              'Founder arrangements, investment rounds, shareholder agreements, and growth-stage transactions.',
            ),
          },
        ],
        memberships: [
          { name: L('Deutsche Institution für Schiedsgerichtsbarkeit (DIS)', 'German Arbitration Institute (DIS)') },
          { name: L('Vienna International Arbitral Centre (VIAC)', 'Vienna International Arbitral Centre (VIAC)') },
          { name: L('Deutsch-Jordanische Gesellschaft e.V.', 'German Jordanian Society (Deutsch-Jordanische Gesellschaft e.V.)') },
          { name: L('Deutsch-Arabische Freundschaftsgesellschaft (DAFG)', 'German-Arab Friendship Association (DAFG)') },
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
          'Meine Forschung untersucht, wie Rechtssysteme Entscheidungen treffen, Normen auslegen und auf gesellschaftlichen und technologischen Wandel reagieren.\n\nAusgehend von juristischer Praxis und akademischer Forschung arbeite ich an der Schnittstelle von künstlicher Intelligenz und Recht, vergleichender Rechtswissenschaft, Migrationsrecht und der Anerkennung von Familien. Ein wiederkehrendes Thema meiner Arbeit ist das Zusammenspiel von formalen Rechtsnormen, institutionellen Strukturen und menschlicher Entscheidungsfindung.',
          'My research explores how legal systems make decisions, interpret norms and respond to social and technological change.\n\nDrawing on both professional legal practice and academic inquiry, I work across the fields of artificial intelligence and law, comparative legal studies, migration law and family recognition. A recurring theme in my work is the interaction between formal legal rules, institutional structures and human decision-making.',
        ),
        projectBody: L(
          'Als Research Fellow an der SOAS University of London wirke ich am ERC-geförderten Projekt RELI-GENE mit, das das Verhältnis von Religion, Geschlecht und Familienbeziehungen in transnationalen Kontexten untersucht. Meine Forschung befasst sich mit der rechtlichen Behandlung grenzüberschreitender Familienbeziehungen nach deutschem, englischem und emiratischem Recht, mit besonderem Augenmerk auf Anerkennung, Migration und das Zusammenspiel von religiösen Normen und staatlichen Rechtsordnungen.',
          'As a Research Fellow at SOAS University of London, I contribute to the ERC-funded RELI-GENE project, which explores the relationship between religion, gender, and family relations in transnational settings. My research examines the legal treatment of cross-border family relationships under German, English, and UAE law, with a particular focus on recognition, migration, and the interaction between religious norms and state legal systems.',
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
          'Ich spreche regelmäßig auf Konferenzen, Wirtschaftsforen, an Universitäten und bei Fachveranstaltungen über rechtliche, regulatorische und politische Entwicklungen, die internationale Wirtschaft und Gesellschaft betreffen.\n\nMeine Vorträge verbinden praktische juristische Erfahrung aus dem Nahen Osten mit breiteren akademischen Perspektiven auf Recht, Technologie und gesellschaftlichen Wandel.',
          'I regularly speak at conferences, business forums, universities and professional events on legal, regulatory and policy developments affecting international business and society.\n\nMy presentations combine practical legal experience from the Middle East with broader academic perspectives on law, technology and social change.',
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
          'Ich freue mich stets über den Austausch mit Wissenschaftlerinnen und Wissenschaftlern, Juristinnen und Juristen, Studierenden sowie Fachleuten, die sich für Recht, Technologie, internationale Beziehungen und grenzüberschreitende Rechtsfragen interessieren.\n\nFür Forschungskooperationen, Vortragsanfragen oder allgemeine Anliegen nehmen Sie gerne über die unten stehenden Kontaktdaten Kontakt auf.',
          'I am always happy to connect with fellow academics, legal practitioners, students, and professionals interested in law, technology, international affairs, and cross-border legal issues.\n\nFor research collaborations, speaking engagements, or general enquiries, please feel free to reach out using the details below.',
        ),
        email: 'contact.shanneik@gmail.com',
        professionalNote: {
          intro: L(
            'Für berufliche Rechtsangelegenheiten wenden Sie sich bitte an',
            'For professional legal matters, please direct enquiries to',
          ),
          linkLabel: L('Daburon & Partners', 'Daburon & Partners'),
          linkUrl: 'https://daburon-partners.com/en/home',
          email: 'bandar@daburon-partners.com',
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
