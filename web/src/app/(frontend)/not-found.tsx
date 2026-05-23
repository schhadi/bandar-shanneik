import Link from 'next/link'
import { DEFAULT_LOCALE } from '@/lib/i18n'

export default function NotFound() {
  return (
    <div className="container-page flex min-h-screen flex-col items-center justify-center text-center">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">404 / Not found</div>
      <h1 className="mt-6 font-display text-[20vw] font-light leading-none tracking-tightest md:text-[12rem]">
        Off-route
      </h1>
      <Link href={`/${DEFAULT_LOCALE}`} className="btn-outline mt-12">
        ← Back to home
      </Link>
    </div>
  )
}
