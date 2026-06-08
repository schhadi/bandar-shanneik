import Image from 'next/image'
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
  const bodyParagraphs: string[] = String(block.body || '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
  const projectParagraphs: string[] = String(block.projectBody || '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <section className="container-page pb-2 pt-16 md:pb-4 md:pt-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-16">
        {/* Left: heading + subtext */}
        <div className="md:col-span-7">
          {heading && (
            <h1 className="text-4xl font-medium leading-tight md:text-5xl">{heading}</h1>
          )}
          {bodyParagraphs.length > 0 && (
            <div className="mt-5 max-w-xl space-y-4 text-base leading-relaxed text-bone/75 md:mt-6 md:text-lg">
              {bodyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>

        {/* Right: current affiliation */}
        <div className="md:col-span-4 md:col-start-9">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-base font-semibold uppercase tracking-wider text-accent">{l.currentPosition}</div>
              <h2 className="mt-3 text-xl font-medium leading-snug md:text-2xl">
                {position.role}
                {position.role && position.institution ? ',' : ''}
                {position.institution && (
                  <span className="block text-bone/80">{position.institution}</span>
                )}
              </h2>
            </div>
            {/* RELI-GENE — the project behind the SOAS fellowship */}
            <Image
              src="/RELI-GENE-logo.png"
              alt="RELI-GENE"
              width={660}
              height={654}
              className="h-auto w-[91px] shrink-0 -translate-x-0.5"
            />
          </div>
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
          {projectParagraphs.length > 0 && (
            <div className="mt-4 max-w-sm space-y-3 text-sm leading-relaxed text-bone/70">
              {projectParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
