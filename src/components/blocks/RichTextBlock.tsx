import { RichTextRenderer } from '@/lib/lexical'

export function RichTextBlock({ block }: { block: any }) {
  const centered = block.alignment === 'center'
  return (
    <section className="container-page py-24 md:py-32">
      <div className={centered ? 'mx-auto max-w-3xl text-center' : 'grid gap-12 md:grid-cols-12 md:gap-16'}>
        {block.heading && (
          <div className={centered ? '' : 'md:col-span-4'}>
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">{block.heading}</h2>
          </div>
        )}
        <div
          className={
            centered
              ? 'mt-6 text-base leading-relaxed text-bone/80'
              : 'text-base leading-relaxed text-bone/80 md:col-span-7 md:col-start-6'
          }
        >
          <RichTextRenderer data={block.content} />
        </div>
      </div>
    </section>
  )
}
