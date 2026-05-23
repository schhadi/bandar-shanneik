import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/Header'
import { SiteFooter } from '@/components/Footer'
import { Cursor } from '@/components/Cursor'
import { ScrollProgress } from '@/components/ScrollProgress'
import { isLocale } from '@/lib/i18n'

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
    <>
      <ScrollProgress />
      <Cursor />
      <SiteHeader locale={locale} />
      <main className="relative z-10">{children}</main>
      <SiteFooter locale={locale} />
    </>
  )
}
