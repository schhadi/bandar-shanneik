import { MediaImage } from '../Media'

export function AboutIntroBlock({ block }: { block: any }) {
  const greeting: string | undefined = block.greeting
  const lead: string | undefined = block.lead
  const image = block.image
  const paragraphs: string[] = String(block.body || '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <section className="container-page pt-10 md:pt-16">
      <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
        {/* Left: greeting + prose, kept tight together */}
        <div className="order-2 md:order-none md:col-span-7">
          {greeting && (
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
              {greeting}
            </h1>
          )}
          {lead && (
            <p className="mt-6 text-xl font-medium leading-snug text-bone md:text-2xl">{lead}</p>
          )}
          {paragraphs.length > 0 && (
            <div className="mt-5 space-y-4 text-base leading-relaxed text-bone/75 md:text-lg">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>

        {/* Right: small portrait */}
        {image && (
          <div className="order-1 md:order-none md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <MediaImage
                media={image}
                className="h-full w-full object-cover object-[52%_20%]"
                sizes="(min-width: 768px) 42vw, 100vw"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
