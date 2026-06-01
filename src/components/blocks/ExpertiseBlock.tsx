export function ExpertiseBlock({ block }: { block: any }) {
  const areas: string[] = block.areas || []

  return (
    <section className="container-page py-20 md:py-28">
      <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-normal leading-[1] tracking-tight text-bone">
        {block.heading || 'Legal Expertise'}
      </h1>

      <div className="mt-6 max-w-2xl space-y-3 text-xl leading-relaxed text-bone/75">
        {block.intro && <p>{block.intro}</p>}
        {block.affiliationLabel && (
          <p>
            {block.affiliationPrefix ? `${block.affiliationPrefix} ` : ''}
            {block.affiliationUrl ? (
              <a
                href={block.affiliationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="a-accent"
              >
                {block.affiliationLabel}
              </a>
            ) : (
              block.affiliationLabel
            )}
            .
          </p>
        )}
      </div>

      <ul className="mt-14 grid gap-x-12 gap-y-4 sm:grid-cols-2">
        {areas.map((area, i) => (
          <li key={i} className="font-display text-2xl text-bone/85 md:text-3xl">
            {area}
          </li>
        ))}
      </ul>
    </section>
  )
}
