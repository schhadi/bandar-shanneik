import type { MetadataRoute } from 'next'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'
import { staticPages } from '@/lib/staticContent'
import { SITE_URL, localePath } from '@/lib/seo'

// Lists every locale + page combination with hreflang alternates so search
// engines index both the German and English versions and understand they are
// translations of one another.
export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = Object.keys(staticPages)

  return LOCALES.flatMap((locale) =>
    slugs.map((slug) => {
      const languages: Record<string, string> = {}
      for (const l of LOCALES) languages[l] = `${SITE_URL}${localePath(l, slug)}`
      languages['x-default'] = `${SITE_URL}${localePath(DEFAULT_LOCALE, slug)}`

      return {
        url: `${SITE_URL}${localePath(locale, slug)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: slug === 'home' ? 1 : 0.8,
        alternates: { languages },
      }
    }),
  )
}
