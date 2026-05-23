export function TagBoxesBlock({ block }: { block: any }) {
  const items: any[] = block.items || []
  return (
    <section className="container-page py-8">
      <div className="card bg-cream-100/80">
        <h3 className="font-serif text-2xl text-forest">{block.heading || 'Areas of Interest'}</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {items.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full border border-gold/50 bg-cream-50 px-4 py-1.5 text-sm text-forest/80"
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
