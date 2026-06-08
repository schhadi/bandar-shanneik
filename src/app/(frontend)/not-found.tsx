import Link from 'next/link'
import { DEFAULT_LOCALE } from '@/lib/i18n'
import { inter } from '@/lib/fonts'

// Rendered for routes outside any locale segment, where no [locale] layout
// supplies the document, so this owns its own <html>/<body>.
export default function NotFound() {
  return (
    <html lang={DEFAULT_LOCALE} className={inter.variable}>
      <body className="bg-ink text-bone antialiased">
        <div className="container-page flex min-h-screen flex-col items-center justify-center text-center">
          <div className="text-sm uppercase tracking-wider text-accent">Not found</div>
          <h1 className="mt-4 text-5xl font-medium leading-none md:text-7xl">
            Off-route
          </h1>
          <Link href={`/${DEFAULT_LOCALE}`} className="btn-outline mt-10">
            Back to home
          </Link>
        </div>
      </body>
    </html>
  )
}
