export function PracticeAreasBlock({ block }: { block: any }) {
  const items: any[] = block.items || []
  return (
    <section className="container-page py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-medium leading-tight md:text-4xl">
            {block.heading || 'Practice Areas'}
          </h2>
        </div>

        <ul className="space-y-3 md:col-span-7 md:col-start-6">
          {items.map((t, i) => (
            <li key={i} className="text-lg text-bone">
              {t.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
