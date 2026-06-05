import type { Metadata } from 'next'
import { portrait } from './staticContent'
import { DEFAULT_LOCALE, LOCALES, type Locale } from './i18n'

// Canonical production origin. Set NEXT_PUBLIC_SITE_URL in the environment
// (e.g. https://bandarshanneik.com) once the custom domain is live; until then
// the Vercel deployment URL is used as a sensible fallback.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://bandar-shanneik.vercel.app'
).replace(/\/$/, '')

export const SITE_NAME = 'Bandar Shanneik'

// Path for a given locale + slug. The home page lives at /<locale>.
export function localePath(locale: Locale, slug: string): string {
  return slug === 'home' ? `/${locale}` : `/${locale}/${slug}`
}

// ---------------------------------------------------------------------------
// Target keywords. The primary objective is ranking for German searches for a
// German-speaking lawyer in the UAE; English variants support reach.
// ---------------------------------------------------------------------------
const KEYWORDS: Record<Locale, string[]> = {
  de: [
    'Deutschsprachiger Anwalt in den VAE',
    'deutscher Anwalt in den VAE',
    'deutscher Rechtsanwalt VAE',
    'deutscher Anwalt Dubai',
    'deutscher Anwalt Abu Dhabi',
    'deutschsprachiger Rechtsanwalt Dubai',
    'deutscher Jurist VAE',
    'Anwalt deutsches Recht VAE',
    'Rechtsberatung VAE deutsch',
    'Bandar Shanneik',
    'Wirtschaftsanwalt VAE',
    'Schiedsverfahren VAE',
  ],
  en: [
    'German-speaking lawyer UAE',
    'German lawyer in the UAE',
    'German lawyer Dubai',
    'German lawyer Abu Dhabi',
    'German-speaking attorney UAE',
    'cross-border lawyer Gulf',
    'Bandar Shanneik',
    'corporate lawyer UAE',
    'international arbitration UAE',
  ],
}

// Per-page, per-locale titles and descriptions, front-loaded with the target
// keywords. Falls back to the page's own title/description when a slug isn't
// listed here.
type SeoEntry = { title: string; description: string }
const PAGE_SEO: Record<string, Record<Locale, SeoEntry>> = {
  home: {
    de: {
      title: 'Bandar Shanneik – Deutschsprachiger Anwalt in den VAE',
      description:
        'Bandar Shanneik ist deutschsprachiger Anwalt in den Vereinigten Arabischen Emiraten (VAE). Beratung von Unternehmen, Investoren und Privatpersonen im deutschen, englischen und VAE-Recht – grenzüberschreitend in Dubai, Abu Dhabi und der gesamten Golfregion.',
    },
    en: {
      title: 'Bandar Shanneik – German-Speaking Lawyer in the UAE',
      description:
        'Bandar Shanneik is a German-speaking lawyer in the United Arab Emirates (UAE), advising companies, investors and private clients across German, English and UAE law — cross-border in Dubai, Abu Dhabi and the wider Gulf.',
    },
  },
  about: {
    de: {
      title: 'Über mich – Bandar Shanneik | Deutschsprachiger Anwalt in den VAE',
      description:
        'Über Bandar Shanneik: deutschsprachiger Anwalt und Rechtswissenschaftler in den VAE mit über einem Jahrzehnt grenzüberschreitender Praxis im deutschen, englischen und emiratischen Recht.',
    },
    en: {
      title: 'About – Bandar Shanneik | German-Speaking Lawyer in the UAE',
      description:
        'About Bandar Shanneik: a German-speaking lawyer and legal scholar in the UAE with over a decade of cross-border practice across German, English and Emirati law.',
    },
  },
  advisory: {
    de: {
      title: 'Rechtsberatung in den VAE – Deutschsprachiger Anwalt | Bandar Shanneik',
      description:
        'Deutschsprachige Rechtsberatung in den VAE: Gesellschafts- und Handelsrecht, M&A, internationale Schiedsverfahren und Markteintritt. Bandar Shanneik berät grenzüberschreitend im deutschen, englischen und VAE-Recht.',
    },
    en: {
      title: 'Legal Advisory in the UAE – German-Speaking Lawyer | Bandar Shanneik',
      description:
        'German-speaking legal advisory in the UAE: corporate and commercial law, M&A, international arbitration and market entry. Bandar Shanneik advises cross-border across German, English and UAE law.',
    },
  },
  research: {
    de: {
      title: 'Forschung – Bandar Shanneik | Recht, Migration & Familie',
      description:
        'Akademische Forschung von Bandar Shanneik, deutschsprachiger Anwalt in den VAE und Research Fellow an der SOAS University of London – zu Recht, künstlicher Intelligenz, Migration und der Anerkennung von Familien.',
    },
    en: {
      title: 'Research – Bandar Shanneik | Law, Migration & Family',
      description:
        'Academic research by Bandar Shanneik, German-speaking lawyer in the UAE and Research Fellow at SOAS University of London — on law, artificial intelligence, migration and family recognition.',
    },
  },
  speaking: {
    de: {
      title: 'Vorträge – Bandar Shanneik | Deutschsprachiger Anwalt in den VAE',
      description:
        'Vorträge und öffentliches Engagement von Bandar Shanneik, deutschsprachiger Anwalt in den VAE, zu Recht, Wirtschaft und Markteintritt in der MENA-Region.',
    },
    en: {
      title: 'Speaking – Bandar Shanneik | German-Speaking Lawyer in the UAE',
      description:
        'Talks and public engagement by Bandar Shanneik, German-speaking lawyer in the UAE, on law, business and market entry across the MENA region.',
    },
  },
  contact: {
    de: {
      title: 'Kontakt – Bandar Shanneik | Deutschsprachiger Anwalt in den VAE',
      description:
        'Kontaktieren Sie Bandar Shanneik, deutschsprachiger Anwalt in den VAE, für Rechtsberatung, Forschungskooperationen oder Vortragsanfragen.',
    },
    en: {
      title: 'Contact – Bandar Shanneik | German-Speaking Lawyer in the UAE',
      description:
        'Get in touch with Bandar Shanneik, German-speaking lawyer in the UAE, for legal advice, research collaboration or speaking enquiries.',
    },
  },
}

// Build the full Next.js Metadata for a page, including canonical + hreflang
// alternates, Open Graph and Twitter cards. `page` supplies the fallback.
export function buildPageMetadata(locale: Locale, slug: string, page: any): Metadata {
  const entry = PAGE_SEO[slug]?.[locale]
  const title = entry?.title || (page as any)?.seo?.title || (page as any)?.title || SITE_NAME
  const description =
    entry?.description ||
    (page as any)?.seo?.description ||
    (page as any)?.description ||
    undefined

  const canonical = `${SITE_URL}${localePath(locale, slug)}`
  const languages: Record<string, string> = {}
  for (const l of LOCALES) languages[l] = `${SITE_URL}${localePath(l, slug)}`
  languages['x-default'] = `${SITE_URL}${localePath(DEFAULT_LOCALE, slug)}`

  const ogImage = {
    url: `${SITE_URL}${portrait.url}`,
    width: portrait.width,
    height: portrait.height,
    alt: 'Bandar Shanneik',
  }

  return {
    title: { absolute: title },
    description,
    keywords: KEYWORDS[locale],
    alternates: { canonical, languages },
    openGraph: {
      type: slug === 'home' ? 'profile' : 'website',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: locale === 'de' ? 'en_US' : 'de_DE',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

// JSON-LD entity graph. A well-described Person + the firm they work for is the
// strongest signal for Google to associate "deutschsprachiger Anwalt in den VAE"
// with Bandar Shanneik as an entity.
export function structuredData(locale: Locale) {
  const jobTitle =
    locale === 'de' ? 'Deutschsprachiger Anwalt (Of Counsel)' : 'German-Speaking Lawyer (Of Counsel)'
  const description = PAGE_SEO.home[locale].description

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Bandar Shanneik',
        url: SITE_URL,
        image: `${SITE_URL}${portrait.url}`,
        jobTitle,
        description,
        knowsLanguage: ['de', 'en', 'ar'],
        hasOccupation: {
          '@type': 'Occupation',
          name: locale === 'de' ? 'Rechtsanwalt' : 'Lawyer',
          occupationLocation: { '@type': 'Country', name: 'United Arab Emirates' },
        },
        knowsAbout: [
          'International Arbitration',
          'Corporate Law',
          'Mergers & Acquisitions',
          'Cross-border transactions',
          'German law',
          'UAE law',
          'Deutschsprachiger Anwalt in den VAE',
        ],
        worksFor: {
          '@type': 'LegalService',
          name: 'Daburon & Partners Legal Consultancy LLP',
          url: 'https://www.daburon-partners.com/en/home',
          areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
        },
        areaServed: [
          { '@type': 'Country', name: 'United Arab Emirates' },
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Country', name: 'United Kingdom' },
        ],
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'SOAS University of London' },
        sameAs: [
          'https://www.linkedin.com/in/bandar-shanneik',
          'https://www.daburon-partners.com/en/home',
        ],
      },
    ],
  }
}
