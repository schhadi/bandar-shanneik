import { cache } from 'react'
import { getPayload } from './payload'
import { getStaticHeader } from './staticContent'
import { resolveHref } from './resolveLink'
import type { Locale } from './i18n'

export type NavLink = { label: string; href: string; newTab?: boolean }

// Shared header data for both the site header and the home-page nav boxes.
export const getHeaderData = cache(async (locale: Locale) => {
  const fallback = getStaticHeader(locale)
  const payload = await getPayload().catch(() => null)
  const cms = await payload?.findGlobal({ slug: 'header', locale, depth: 2 }).catch(() => null)
  const data: any = cms || fallback

  const rawNav: any[] = data?.nav?.length ? data.nav : fallback.nav
  const nav: NavLink[] = rawNav
    .map((item) => item?.link)
    .filter((link) => link?.label)
    .map((link) => ({
      label: link.label as string,
      href: resolveHref(link, locale),
      newTab: !!link.newTab,
    }))

  return {
    logoText: (data?.logoText as string) || fallback.logoText,
    nav,
    showLanguageSwitcher: (data?.showLanguageSwitcher ?? true) as boolean,
  }
})
