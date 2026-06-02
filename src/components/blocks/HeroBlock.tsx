import { MediaImage } from '../Media'
import { Icon } from '../Icon'

const LINKEDIN_URL = 'https://linkedin.com/in/bandar-shanneik'

export function HeroBlock({ block }: { block: any; locale?: unknown }) {
  const title: string = block.title || ''
  const nameLines = title.split(' ').filter(Boolean)
  const descriptor: string | undefined = block.descriptor
  const linkedinUrl: string = block.linkedinUrl || LINKEDIN_URL

  return (
    <section className="container-page flex h-[calc(100svh-69px)] flex-col overflow-hidden">
      <style>{`html, body { overflow: hidden; height: 100svh; }`}</style>

      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] gap-8 py-6 md:grid-cols-12 md:grid-rows-1 md:gap-16 md:py-10">
        <div className="relative min-h-0 md:col-span-7">
          {block.image && (
            <MediaImage
              media={block.image}
              className="h-full w-full object-cover object-[47%_22%]"
              priority
              sizes="(min-width: 768px) 58vw, 92vw"
            />
          )}
        </div>

        <div className="flex flex-col justify-end md:col-span-5 md:justify-center">
          <h1 className="text-[clamp(2.75rem,8.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
            {nameLines.map((w, i) => (
              <span key={i} className="block">
                {w}
              </span>
            ))}
          </h1>
          {descriptor && (
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-bone/55 md:mt-8 md:text-base">
              {descriptor}
            </p>
          )}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="mt-8 inline-flex h-8 w-8 items-center justify-center text-bone/45 hover:text-bone"
          >
            <Icon name="linkedin" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
