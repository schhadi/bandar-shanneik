export function EducationJurisdictionsBlock({ block }: { block: any }) {
  return (
    <section className="container-page py-24 md:py-32">
      <h2 className="mb-12 text-3xl font-medium leading-tight md:text-4xl">
        {block.heading || 'Education & Jurisdictions'}
      </h2>

      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h3 className="mb-6 text-sm uppercase tracking-wider text-bone/60">Education</h3>
          <ul className="space-y-6">
            {(block.education || []).map((entry: any, i: number) => (
              <li key={i}>
                <div className="text-lg leading-snug text-bone">{entry.institution}</div>
                {entry.detail && (
                  <p className="mt-1 max-w-xl text-sm text-bone/70">{entry.detail}</p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-10 md:col-span-5">
          <div>
            <h3 className="mb-4 text-sm uppercase tracking-wider text-bone/60">Jurisdictions</h3>
            <ul className="space-y-1">
              {(block.jurisdictions || []).map((j: any, i: number) => (
                <li key={i} className="text-lg text-bone">
                  {j.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm uppercase tracking-wider text-bone/60">Languages</h3>
            <div className="text-lg text-bone">
              {(block.languages || []).map((l: any) => l.name).join(' · ')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
