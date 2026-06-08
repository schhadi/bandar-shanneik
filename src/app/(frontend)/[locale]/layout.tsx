import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'
import { isLocale } from '@/lib/i18n'
import { inter } from '@/lib/fonts'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return (
    <html lang={locale}>
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
