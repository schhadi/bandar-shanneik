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
    <html lang={locale} className={inter.variable}>
      <body className="bg-ink text-bone antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
