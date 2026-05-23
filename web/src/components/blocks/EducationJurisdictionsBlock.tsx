import { Icon } from '../Icon'

export function EducationJurisdictionsBlock({ block }: { block: any }) {
  return (
    <section className="container-page py-16">
      <h2 className="text-center font-serif text-5xl text-forest">
        {block.heading || 'Education & Jurisdictions'}
      </h2>
      <div className="my-8 flex justify-center">
        <div className="flex w-1/3 items-center gap-3">
          <div className="h-px flex-1 bg-gold/60" />
          <Icon name="scale" className="h-6 w-6 text-gold" />
          <div className="h-px flex-1 bg-gold/60" />
        </div>
      </div>

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        {/* Education timeline */}
        <div>
          <h3 className="font-serif text-2xl text-forest">Education</h3>
          <ol className="relative mt-6 space-y-8 border-l-2 border-gold/50 pl-6">
            {(block.education || []).map((entry: any, i: number) => (
              <li key={i} className="relative">
                <span className="absolute -left-[31px] top-1 inline-block h-4 w-4 rounded-full border-2 border-gold bg-cream-50" />
                <div className="font-medium text-forest">{entry.institution}</div>
                {entry.detail && (
                  <p className="mt-1 text-sm leading-relaxed text-forest/70">{entry.detail}</p>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Jurisdictions + Languages */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-serif text-2xl text-forest">Jurisdictions</h3>
            <ul className="mt-4 space-y-3">
              {(block.jurisdictions || []).map((j: any, i: number) => (
                <li key={i} className="flex items-center gap-3 border-b border-gold/30 pb-3 last:border-0 last:pb-0">
                  <Icon name={j.icon || 'bank'} className="h-5 w-5 text-gold" />
                  <span className="text-forest">{j.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="font-serif text-2xl text-forest">Languages</h3>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-forest/80">
              {(block.languages || []).map((l: any, i: number, arr: any[]) => (
                <span key={i} className="inline-flex items-center gap-4">
                  {l.name}
                  {i < arr.length - 1 && <span className="text-gold">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
