import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Bandar Shanneik — Cross-border legal consultancy',
  description:
    'Cross-border legal consultancy for companies, investors and private clients across the Middle East and Europe.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body className="bg-ink text-bone antialiased">
        <div className="fixed inset-x-0 top-0 z-50 h-1 bg-topbar" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
