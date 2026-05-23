import { Reveal } from '../Reveal'

export function EducationJurisdictionsBlock({ block }: { block: any }) {
  return (
    <section className="container-page border-t border-line py-28">
      <Reveal>
        <div className="eyebrow mb-12">03 / Credentials</div>
      </Reveal>

      <Reveal>
        <h2 className="mb-20 font-display text-6xl font-light leading-[0.9] tracking-display md:text-8xl">
          {block.heading || 'Education & Jurisdictions'}
        </h2>
      </Reveal>

      <div className="grid gap-16 md:grid-cols-12">
        {/* Education timeline */}
        <div className="md:col-span-7">
          <Reveal>
            <div className="mb-8 flex items-baseline justify-between border-b border-line pb-3">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60">Education</h3>
              <span className="font-mono text-[11px] text-bone/30">
                {(block.education || []).length.toString().padStart(2, '0')}
              </span>
            </div>
          </Reveal>

          <ul>
            {(block.education || []).map((entry: any, i: number) => (
              <Reveal as="li" key={i} delay={(Math.min(i, 3) + 1) as 1 | 2 | 3} className="group border-b border-line py-8 transition-colors hover:bg-ink-800/30">
                <div className="grid grid-cols-12 items-start gap-6">
                  <div className="col-span-1 font-mono text-xs text-bone/40">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="col-span-11">
                    <div className="font-display text-2xl leading-tight text-bone transition-colors group-hover:text-accent md:text-3xl">
                      {entry.institution}
                    </div>
                    {entry.detail && (
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone/60">{entry.detail}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Jurisdictions + languages */}
        <div className="space-y-12 md:col-span-5 md:pl-8">
          <Reveal delay={1}>
            <div className="mb-6 flex items-baseline justify-between border-b border-line pb-3">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60">Jurisdictions</h3>
              <span className="font-mono text-[11px] text-bone/30">
                {(block.jurisdictions || []).length.toString().padStart(2, '0')}
              </span>
            </div>
            <ul>
              {(block.jurisdictions || []).map((j: any, i: number) => (
                <li
                  key={i}
                  className="flex items-center justify-between border-b border-line py-4 transition-colors hover:text-accent"
                >
                  <span className="font-display text-2xl font-light">{j.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
                    {j.icon || 'jur'}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={2}>
            <div className="mb-6 flex items-baseline justify-between border-b border-line pb-3">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60">Languages</h3>
              <span className="font-mono text-[11px] text-bone/30">
                {(block.languages || []).length.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="font-display text-3xl font-light leading-tight">
              {(block.languages || []).map((l: any, i: number, arr: any[]) => (
                <span key={i}>
                  {l.name}
                  {i < arr.length - 1 && <span className="mx-3 text-accent">·</span>}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
