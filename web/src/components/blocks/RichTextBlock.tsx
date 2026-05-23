import { RichTextRenderer } from '@/lib/lexical'
import { Reveal } from '../Reveal'

export function RichTextBlock({ block }: { block: any }) {
  const centered = block.alignment === 'center'
  return (
    <section className="container-page border-t border-line py-28">
      <div className={centered ? 'mx-auto max-w-3xl text-center' : 'grid gap-12 md:grid-cols-12'}>
        {block.heading && (
          <Reveal className={centered ? '' : 'md:col-span-4'}>
            <h2 className="font-display text-5xl font-light leading-[0.95] tracking-display md:text-7xl">
              {block.heading}
            </h2>
          </Reveal>
        )}
        <Reveal delay={1} className={centered ? 'mt-8' : 'text-lg leading-relaxed text-bone/75 md:col-span-7 md:col-start-6'}>
          <RichTextRenderer data={block.content} />
        </Reveal>
      </div>
    </section>
  )
}
