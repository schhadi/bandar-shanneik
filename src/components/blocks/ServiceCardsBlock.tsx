export function ServiceCardsBlock({ block }: { block: any }) {
  const cards: any[] = block.cards || []
  return (
    <section className="container-page py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="text-3xl font-medium leading-tight md:text-4xl">
            {block.heading || 'Legal Services'}
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          {block.intro && (
            <p className="text-base leading-relaxed text-bone/80">{block.intro}</p>
          )}
        </div>
      </div>

      <ul className="mt-16 space-y-10 md:mt-20">
        {cards.map((c, i) => (
          <li key={i} className="grid gap-4 md:grid-cols-12 md:gap-16">
            <h3 className="text-xl font-medium leading-tight text-bone md:col-span-5">
              {c.title}
            </h3>
            <div className="md:col-span-6 md:col-start-7">
              {c.body && (
                <p className="text-base leading-relaxed text-bone/75">{c.body}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
