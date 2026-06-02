import { labels, type Locale } from '@/lib/i18n'

type Position = {
  role?: string
  institution?: string
  project?: {
    label?: string
    url?: string
    note?: string
  }
}

export function ResearchIntroBlock({ block, locale }: { block: any; locale: Locale }) {
  const l = labels[locale]
  const heading: string | undefined = block.heading
  const position: Position = block.position || {}
  const project = position.project

  return (
    <section className="container-page pb-12 pt-16 md:pb-16 md:pt-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-16">
        {/* Left: heading + subtext */}
        <div className="md:col-span-7">
          {heading && (
            <h1 className="text-4xl font-medium leading-tight md:text-5xl">{heading}</h1>
          )}
          {block.body && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/75 md:mt-6 md:text-lg">
              {block.body}
            </p>
          )}
        </div>

        {/* Right: current affiliation */}
        <div className="md:col-span-4 md:col-start-9">
          <div className="text-sm uppercase tracking-wider text-accent">{l.currentPosition}</div>
          <h2 className="mt-3 text-xl font-medium leading-snug md:text-2xl">
            {position.role}
            {position.role && position.institution ? ',' : ''}
            {position.institution && (
              <span className="block text-bone/80">{position.institution}</span>
            )}
          </h2>
          {project?.label && (
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/70">
              {l.affiliatedPrefix}
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-bone"
                >
                  {project.label}
                </a>
              ) : (
                <span className="text-bone">{project.label}</span>
              )}
              {l.affiliatedSuffix}
              {project.note ? <> — {project.note}</> : null}.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
