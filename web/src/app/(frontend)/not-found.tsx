import Link from 'next/link'
import { DEFAULT_LOCALE } from '@/lib/i18n'

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-serif text-6xl text-forest">404</h1>
      <p className="mt-4 text-forest/70">Sorry, that page could not be found.</p>
      <Link href={`/${DEFAULT_LOCALE}`} className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  )
}
