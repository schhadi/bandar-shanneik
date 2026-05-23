import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Bandar Shanneik',
  description: 'Cross-border legal consultancy across the Middle East and Europe',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        />
      </head>
      <body className="min-h-screen bg-cream-100">{children}</body>
    </html>
  )
}
