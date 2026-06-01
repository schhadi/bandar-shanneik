export function ResearchProfileCardBlock({ block }: { block: any }) {
  return (
    <div>
      <div className="mb-2 text-sm uppercase tracking-wider text-bone/60">
        {block.heading || 'Research Profile'}
      </div>
      {block.role && <div className="text-xl text-bone">{block.role}</div>}
      {block.body && <p className="mt-3 text-sm leading-relaxed text-bone/70">{block.body}</p>}
    </div>
  )
}
