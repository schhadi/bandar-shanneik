import type { Locale } from './i18n'

export type LinkData = {
  label?: string | null
  type?: 'internal' | 'external' | null
  page?: { slug?: string | null } | string | null
  url?: string | null
  newTab?: boolean | null
  icon?: string | null
  variant?: 'primary' | 'outline' | 'plain' | null
}

export function resolveHref(link: LinkData | undefined | null, locale: Locale): string {
  if (!link) return '#'
  if (link.type === 'external') return link.url || '#'
  const page = link.page
  if (!page) return '#'
  const slug = typeof page === 'string' ? page : page.slug
  if (!slug || slug === 'home') return `/${locale}`
  return `/${locale}/${slug}`
}
