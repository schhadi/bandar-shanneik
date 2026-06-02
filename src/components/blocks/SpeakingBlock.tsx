import { MediaImage } from '../Media'

type Item = { event?: string; location?: string; title?: string; date?: string }
type Group = { title?: string; items?: Item[] }

export function SpeakingBlock({ block }: { block: any }) {
  const heading: string | undefined = block.heading
  const intro: string | undefined = block.intro
  const groups: Group[] = block.groups || []
  const image = block.image

  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="max-w-xl">
          {heading && (
            <h1 className="text-4xl font-medium leading-tight md:text-5xl">{heading}</h1>
          )}
          {intro && (
            <p className="mt-4 text-base leading-relaxed text-bone/80 md:text-lg">{intro}</p>
          )}
        </div>

        {image && (
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
            <MediaImage
              media={image}
              className="h-full w-full object-cover object-center"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
        )}
      </div>

      <div className="mt-12 space-y-12 md:mt-16">
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.title && (
              <h2 className="mb-5 text-sm uppercase tracking-wider text-accent">{group.title}</h2>
            )}
            <ul className="space-y-5">
              {(group.items || []).map((item, i) => (
                <li key={i} className="grid grid-cols-12 gap-x-4 gap-y-1">
                  <div className="col-span-12 text-sm text-bone/55 md:col-span-2">{item.date}</div>
                  <div className="col-span-12 md:col-span-10">
                    <p className="text-base leading-snug text-bone">{item.title}</p>
                    {(item.event || item.location) && (
                      <p className="mt-1 text-sm text-bone/60">
                        {item.event}
                        {item.event && item.location ? ' · ' : ''}
                        {item.location}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
