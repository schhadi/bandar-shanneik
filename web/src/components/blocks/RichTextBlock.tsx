import { RichTextRenderer } from '@/lib/lexical'

export function RichTextBlock({ block }: { block: any }) {
  return (
    <section className="container-page py-12">
      <div className={block.alignment === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
        {block.heading && <h2 className="mb-6 font-serif text-4xl">{block.heading}</h2>}
        <div className="prose prose-lg max-w-none">
          <RichTextRenderer data={block.content} />
        </div>
      </div>
    </section>
  )
}
