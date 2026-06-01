import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Bandar Shanneik — Lawyer & Academic',
  description:
    'Bandar Shanneik is a lawyer and legal scholar working across German, English and UAE law, and researching law, migration and society.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&display=swap"
        />
      </head>
      <body className="bg-ink text-bone antialiased">{children}</body>
    </html>
  )
}
