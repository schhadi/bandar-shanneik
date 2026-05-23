import { Reveal } from '../Reveal'

export function ContactBlock({ block }: { block: any }) {
  return (
    <section className="container-page border-t border-line py-28">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <div className="eyebrow mb-10">→ Contact</div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-display text-7xl font-light leading-[0.88] tracking-display md:text-9xl">
              {block.heading?.split(' ').map((w: string, i: number, arr: string[]) => (
                <span key={i} className={i === arr.length - 1 ? 'italic text-accent' : ''}>
                  {w}
                  {i < arr.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          {block.intro && (
            <Reveal delay={1}>
              <p className="text-lg leading-relaxed text-bone/70">{block.intro}</p>
            </Reveal>
          )}
          <Reveal delay={2} className="mt-12 space-y-6 border-t border-line pt-8">
            {block.email && (
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">Email</div>
                <a href={`mailto:${block.email}`} className="link-underline font-display text-3xl text-bone hover:text-accent">
                  {block.email}
                </a>
              </div>
            )}
            {block.phone && (
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">Phone</div>
                <a href={`tel:${block.phone}`} className="link-underline font-display text-3xl text-bone hover:text-accent">
                  {block.phone}
                </a>
              </div>
            )}
            {block.address && (
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">Address</div>
                <div className="whitespace-pre-line text-base text-bone/70">{block.address}</div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
