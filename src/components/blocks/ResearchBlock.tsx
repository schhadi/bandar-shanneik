type Publication = {
  year: string
  title: string
  venue?: string
  status?: string
}

export function ResearchBlock({ block }: { block: any }) {
  const publications: Publication[] = block.publications || []

  return (
    <section className="container-page py-20 md:py-28">
      <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-normal leading-[1] tracking-tight text-bone">
        {block.heading || 'Research'}
      </h1>

      {/* Current position */}
      {block.positionPrefix && (
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-bone/85">
          {block.positionPrefix}
          {block.positionLinkLabel && (
            <a
              href={block.positionLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="a-accent"
            >
              {block.positionLinkLabel}
            </a>
          )}
          {block.positionSuffix}
        </p>
      )}

      {/* Research profile paragraph */}
      {block.body && (
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-bone/75">{block.body}</p>
      )}

      {/* Publications — simple dated list */}
      {publications.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl text-bone">Publications</h2>
          <ul className="mt-6 max-w-3xl">
            {publications.map((p, i) => (
              <li
                key={i}
                className="flex gap-6 border-t border-line py-4 first:border-t-0 md:gap-10"
              >
                <span className="w-12 shrink-0 text-accent">{p.year}</span>
                <span className="text-bone/85">
                  {p.title}
                  {p.venue && <span className="text-bone/55">. {p.venue}</span>}
                  {p.status && <span className="italic text-bone/50"> ({p.status})</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
