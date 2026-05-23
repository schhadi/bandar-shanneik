export function PracticeAreasBlock({ block }: { block: any }) {
  const items: any[] = block.items || []
  return (
    <section className="container-page pb-12">
      {block.heading && (
        <div>
          <h3 className="font-serif text-2xl text-forest">{block.heading}</h3>
          <div className="mt-2 h-px w-full bg-gold/40" />
        </div>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        {items.map((t, i) => (
          <span key={i} className="tag">
            {t.label}
          </span>
        ))}
      </div>
    </section>
  )
}
