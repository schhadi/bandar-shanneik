export function ServiceCardsBlock({ block }: { block: any }) {
  const cards: any[] = block.cards || []
  return (
    <section className="container-page py-16">
      {block.heading && <h2 className="font-serif text-5xl text-forest">{block.heading}</h2>}
      {block.intro && (
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-forest/75">{block.intro}</p>
      )}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <article key={i} className="card flex min-h-[280px] flex-col">
            <div className="text-xs font-medium text-gold">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="mt-3 font-serif text-2xl text-forest">{c.title}</h3>
            {c.body && <p className="mt-3 text-sm leading-relaxed text-forest/70">{c.body}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}
