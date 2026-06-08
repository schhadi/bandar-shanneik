import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/seo'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bandar Shanneik – Deutschsprachiger Anwalt in den VAE',
    template: '%s',
  },
  description:
    'Bandar Shanneik — deutschsprachiger Anwalt in den VAE / German-speaking lawyer in the UAE.',
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  robots: { index: true, follow: true },
}

// The <html>/<body> document is rendered by the per-locale layout
// (src/app/(frontend)/[locale]/layout.tsx) so that the `lang` attribute
// reflects the actual locale (de/en). Routes outside a locale segment — the
// root redirect and the global not-found — render their own <html>.
export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return children
}
