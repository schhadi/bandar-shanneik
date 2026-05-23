import { MediaImage } from '../Media'
import { Reveal } from '../Reveal'

export function ResearchProfileCardBlock({ block }: { block: any }) {
  return (
    <Reveal>
      <div className="border border-line bg-ink-800/40 p-8">
        <div className="mb-6 flex items-start justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
            {block.heading || 'Research Profile'}
          </div>
          {block.logo && (
            <MediaImage media={block.logo} className="h-8 w-auto object-contain opacity-80" sizes="120px" />
          )}
        </div>
        {block.role && <div className="font-display text-3xl font-light text-bone">{block.role}</div>}
        {block.body && (
          <p className="mt-4 text-sm leading-relaxed text-bone/60">{block.body}</p>
        )}
      </div>
    </Reveal>
  )
}
