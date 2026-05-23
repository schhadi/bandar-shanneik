import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isLocale, type Locale } from '@/lib/i18n'
import { getStaticPage } from '@/lib/staticContent'
import { BlockRenderer } from '@/components/blocks'

type Args = {
  params: Promise<{ locale: string; slug?: string[] }>
}

async function fetchPage(locale: Locale, slug: string) {
  return getStaticPage(locale, slug)
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const slugStr = (slug?.join('/') || 'home')
  const page = await fetchPage(locale, slugStr)
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
  }
}

export default async function Page({ params }: Args) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const slugStr = (slug?.join('/') || 'home')
  const page = await fetchPage(locale, slugStr)
  if (!page) notFound()
  return <BlockRenderer blocks={page.blocks} locale={locale} />
}
