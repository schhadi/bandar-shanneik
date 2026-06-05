import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
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

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
        />
      </head>
      <body className="bg-ink text-bone antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
