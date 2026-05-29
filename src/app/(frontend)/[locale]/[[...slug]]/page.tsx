import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { isLocale, LOCALES, type Locale } from '@/lib/i18n'
import { getStaticPage, staticPages } from '@/lib/staticContent'
import { BlockRenderer } from '@/components/blocks'

// Pages are statically cached indefinitely and invalidated on demand by
// Payload afterChange/afterDelete hooks (see src/lib/revalidate.ts).
export const revalidate = false
export const dynamicParams = true

export function generateStaticParams() {
  const slugs = Object.keys(staticPages)
  return LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug: slug === 'home' ? [] : [slug],
    })),
  )
}

type Args = {
  params: Promise<{ locale: string; slug?: string[] }>
}

const fetchPage = cache(async (locale: Locale, slug: string) => {
  const fallback = getStaticPage(locale, slug)

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'pages',
      locale,
      depth: 2,
      limit: 1,
      where: { slug: { equals: slug } },
    })

    return result.docs[0] || fallback
  } catch {
    return fallback
  }
})

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const slugStr = (slug?.join('/') || 'home')
  const page = await fetchPage(locale, slugStr)
  if (!page) return {}
  const seo: any = (page as any).seo || {}
  const fallbackDescription = 'description' in page ? page.description : undefined
  return {
    title: seo.title || page.title,
    description: seo.description || fallbackDescription,
  }
}

export default async function Page({ params }: Args) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const slugStr = (slug?.join('/') || 'home')
  const page = await fetchPage(locale, slugStr)
  if (!page) notFound()
  const blocks: any[] = (page as any).blocks || []
  return <BlockRenderer blocks={blocks} locale={locale} />
}
