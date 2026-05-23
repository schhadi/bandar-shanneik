import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { isLocale, type Locale } from '@/lib/i18n'
import { BlockRenderer } from '@/components/blocks'

type Args = {
  params: Promise<{ locale: string; slug?: string[] }>
}

async function fetchPage(locale: Locale, slug: string) {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'pages',
    locale,
    depth: 2,
    limit: 1,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] || null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const slugStr = (slug?.join('/') || 'home')
  const page = await fetchPage(locale, slugStr).catch(() => null)
  if (!page) return {}
  const seo: any = (page as any).seo || {}
  return {
    title: seo.title || page.title,
    description: seo.description || undefined,
  }
}

export default async function Page({ params }: Args) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const slugStr = (slug?.join('/') || 'home')
  const page = await fetchPage(locale, slugStr).catch(() => null)
  if (!page) notFound()
  const blocks: any[] = (page as any).blocks || []
  return <BlockRenderer blocks={blocks} locale={locale} />
}
