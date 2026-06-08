import Link from 'next/link'
import { DEFAULT_LOCALE } from '@/lib/i18n'

// Not-found for routes under a valid locale (e.g. /de/bad-slug). It renders
// inside the [locale] layout, which already supplies <html lang>, so this only
// provides the page body. The group-level not-found handles invalid locales.
export default function LocaleNotFound() {
  return (
    <div className="container-page flex min-h-screen flex-col items-center justify-center text-center">
      <div className="text-sm uppercase tracking-wider text-accent">Not found</div>
      <h1 className="mt-4 text-5xl font-medium leading-none md:text-7xl">
        Off-route
      </h1>
      <Link href={`/${DEFAULT_LOCALE}`} className="btn-outline mt-10">
        Back to home
      </Link>
    </div>
  )
}
