export function AboutIntroBlock({ block }: { block: any }) {
  const greeting: string | undefined = block.greeting
  const lead: string | undefined = block.lead
  const paragraphs: string[] = String(block.body || '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <section className="container-page pt-20 md:pt-28">
      <div className="grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          {greeting && (
            <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
              {greeting}
            </h1>
          )}
        </div>

        <div className="md:col-span-7 md:col-start-6">
          {lead && (
            <p className="text-xl font-medium leading-snug text-bone md:text-2xl">{lead}</p>
          )}
          {paragraphs.length > 0 && (
            <div className="mt-6 space-y-5 text-base leading-relaxed text-bone/75 md:text-lg">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
