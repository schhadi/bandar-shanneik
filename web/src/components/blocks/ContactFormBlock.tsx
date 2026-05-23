import { Reveal } from '../Reveal'
import { ContactForm } from '../ContactForm'
import { MediaImage } from '../Media'

export function ContactFormBlock({ block }: { block: any }) {
  const hasImage = Boolean(block.image)
  return (
    <section className="container-page border-t border-line py-28">
      <div className="grid gap-12 md:grid-cols-12">
        {/* Left: heading + intro + direct email + optional portrait */}
        <div className="md:col-span-5">
          <Reveal>
            <div className="eyebrow mb-10">→ Contact</div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-display text-6xl font-light leading-[0.9] tracking-display md:text-7xl">
              {block.heading?.split(' ').map((w: string, i: number, arr: string[]) => (
                <span key={i} className={i === arr.length - 1 ? 'italic text-accent' : ''}>
                  {w}
                  {i < arr.length - 1 ? ' ' : ''}
                </span>
              )) || 'Get in touch'}
            </h2>
          </Reveal>
          {block.intro && (
            <Reveal delay={2}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-bone/70">{block.intro}</p>
            </Reveal>
          )}
          {block.email && (
            <Reveal delay={3} className="mt-10 border-t border-line pt-6">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45">
                Or write directly
              </div>
              <a
                href={`mailto:${block.email}`}
                className="link-underline font-display text-2xl text-bone hover:text-accent"
              >
                {block.email}
              </a>
            </Reveal>
          )}
          {hasImage && (
            <Reveal delay={3} className="mt-12 hidden overflow-hidden md:block">
              <MediaImage
                media={block.image}
                className="h-[440px] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                sizes="(min-width: 768px) 35vw, 100vw"
              />
              <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
                <span>Bandar Shanneik</span>
                <span>Senior Counsel</span>
              </div>
            </Reveal>
          )}
        </div>

        {/* Right: form */}
        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={1}>
            <ContactForm
              successMessage={block.successMessage}
              submitLabel={block.submitLabel}
              showSubject={block.showSubject ?? true}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
