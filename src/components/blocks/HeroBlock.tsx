import Link from 'next/link'
import { MediaImage } from '../Media'
import { Icon } from '../Icon'
import type { Locale } from '@/lib/i18n'

export function HeroBlock({ block, locale }: { block: any; locale: Locale }) {
  const name: string = block.name || block.title || 'Bandar Shanneik'
  const descriptor: string = block.descriptor || ''
  const tagline: string = block.tagline || block.body || ''
  const linkedin: string = block.linkedin || 'https://www.linkedin.com/in/bandar-shanneik'

  return (
    <section className="container-page flex min-h-[calc(100svh-73px)] items-center py-10">
      <div className="grid w-full items-center gap-12 md:grid-cols-12 md:gap-16">
        {/* Portrait — large and present */}
        <div className="order-1 md:order-1 md:col-span-5">
          {block.image && (
            <MediaImage
              media={block.image}
              className="mx-auto h-[44vh] w-auto max-w-full object-cover object-center md:h-[72vh] md:max-h-[640px]"
              priority
              sizes="(min-width: 768px) 42vw, 80vw"
            />
          )}
        </div>

        {/* Name + descriptor */}
        <div className="order-2 md:order-2 md:col-span-7 md:pl-6">
          <h1 className="font-display text-[clamp(3rem,9vw,6.5rem)] font-normal leading-[0.98] tracking-tight text-bone">
            {name}
          </h1>
          {descriptor && (
            <p className="mt-5 font-display text-[clamp(1.35rem,3vw,2rem)] leading-snug text-accent">
              {descriptor}
            </p>
          )}
          {tagline && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/75">{tagline}</p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]">
            <Link href={`/${locale}/about`} className="link-underline text-bone/75 hover:text-bone">
              About
            </Link>
            <Link href={`/${locale}/expertise`} className="link-underline text-bone/75 hover:text-bone">
              Expertise
            </Link>
            <Link href={`/${locale}/research`} className="link-underline text-bone/75 hover:text-bone">
              Research
            </Link>
            <Link href={`/${locale}/contact`} className="link-underline text-bone/75 hover:text-bone">
              Contact
            </Link>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-bone/60 transition-colors hover:text-accent"
            >
              <Icon name="linkedin" className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
