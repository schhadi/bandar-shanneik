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

      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] gap-6 py-6 md:grid-cols-12 md:grid-rows-1 md:gap-12 md:py-10">
        <div className="relative min-h-0 md:col-span-6">
          {block.image && (
            <MediaImage
              media={block.image}
              className="h-full w-full object-contain object-left-top md:object-left"
              priority
              sizes="(min-width: 768px) 50vw, 90vw"
            />
          )}
        </div>

        <div className="flex flex-col justify-center md:col-span-6">
          <h1 className="text-[clamp(2.75rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-tight">
            {nameLines.map((w, i) => (
              <span key={i} className="block">
                {w}
              </span>
            ))}
          </h1>
          {descriptor && (
            <p className="mt-5 max-w-md text-base text-bone/75 md:mt-8 md:text-xl">
              {descriptor}
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0 pb-5 md:pb-6">
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex h-9 w-9 items-center justify-center text-bone/65 hover:text-accent"
        >
          <Icon name="linkedin" className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}
