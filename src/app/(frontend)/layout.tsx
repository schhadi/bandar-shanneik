import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Bandar Shanneik',
  description: 'Bandar Shanneik — legal expert and academic.',
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
      <body className="bg-ink text-bone antialiased">{children}</body>
    </html>
  )
}
