import { MediaImage } from '../Media'

export function ResearchProfileCardBlock({ block }: { block: any }) {
  return (
    <section className="container-page py-8">
      <div className="card bg-cream-100/80">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl text-forest">{block.heading || 'Research Profile'}</h3>
          {block.logo && (
            <MediaImage media={block.logo} className="h-10 w-auto object-contain" sizes="120px" />
          )}
        </div>
        {block.role && <div className="mt-3 font-medium text-forest">{block.role}</div>}
        {block.body && <p className="mt-3 text-sm leading-relaxed text-forest/75">{block.body}</p>}
      </div>
    </section>
  )
}
