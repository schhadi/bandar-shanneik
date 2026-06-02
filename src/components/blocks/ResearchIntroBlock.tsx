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
  const position: Position = block.position || {}
  const project = position.project

  return (
    <section className="container-page pb-12 pt-20 md:pb-16 md:pt-28">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <div className="text-sm uppercase tracking-wider text-bone/55">{l.currentPosition}</div>
          <h1 className="mt-3 text-2xl font-medium leading-snug md:text-3xl">
            {position.role}
            {position.role && position.institution ? ',' : ''}
            {position.institution && <span className="block text-bone/80">{position.institution}</span>}
          </h1>
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

        {block.body && (
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-lg leading-relaxed text-bone/80 md:text-xl">{block.body}</p>
          </div>
        )}
      </div>
    </section>
  )
}
