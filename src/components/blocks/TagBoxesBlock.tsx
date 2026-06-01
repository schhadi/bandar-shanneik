export function TagBoxesBlock({ block }: { block: any }) {
  const items: any[] = block.items || []
  return (
    <div>
      <div className="mb-3 text-sm uppercase tracking-wider text-bone/60">
        {block.heading || 'Areas of Interest'}
      </div>
      <div className="text-base text-bone/80">
        {items.map((t) => t.label).join(' · ')}
      </div>
    </div>
  )
}
