type Column = {
  heading?: string
  body?: string
  role?: string
}

type LegalColumn = Column & {
  firmName?: string
  firmUrl?: string
  jurisdictions?: { name: string }[]
  languages?: { name: string }[]
  cvUrl?: string
}

type AcademicColumn = Column & {
  institution?: string
  projectName?: string
  projectUrl?: string
  researchAreas?: { name: string }[]
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl font-medium leading-tight md:text-4xl">{children}</h2>
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 text-xs uppercase tracking-wider text-bone/55">{children}</div>
}

export function AboutTwoColumnBlock({ block }: { block: any }) {
  const legal: LegalColumn = block.legal || {}
  const academic: AcademicColumn = block.academic || {}

  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid gap-16 md:grid-cols-2 md:gap-20">
        {/* LEGAL */}
        <div>
          <ColumnHeading>{legal.heading || 'Legal'}</ColumnHeading>
          {legal.body && (
            <p className="mt-6 text-base leading-relaxed text-bone/80">{legal.body}</p>
          )}

          <div className="mt-10 space-y-8">
            {(legal.role || legal.firmName) && (
              <div>
                <MetaLabel>Affiliation</MetaLabel>
                <p className="text-base text-bone">
                  {legal.role}
                  {legal.role && legal.firmName ? ' at ' : ''}
                  {legal.firmName &&
                    (legal.firmUrl ? (
                      <a
                        href={legal.firmUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-bone"
                      >
                        {legal.firmName}
                      </a>
                    ) : (
                      <span>{legal.firmName}</span>
                    ))}
                </p>
              </div>
            )}

            {legal.jurisdictions && legal.jurisdictions.length > 0 && (
              <div>
                <MetaLabel>Jurisdictions</MetaLabel>
                <p className="text-base text-bone">
                  {legal.jurisdictions.map((j) => j.name).join(' · ')}
                </p>
              </div>
            )}

            {legal.languages && legal.languages.length > 0 && (
              <div>
                <MetaLabel>Languages</MetaLabel>
                <p className="text-base text-bone">
                  {legal.languages.map((l) => l.name).join(' · ')}
                </p>
              </div>
            )}

            {legal.cvUrl && (
              <div>
                <a
                  href={legal.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-bone"
                >
                  Download CV →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ACADEMIC */}
        <div>
          <ColumnHeading>{academic.heading || 'Academic'}</ColumnHeading>
          {academic.body && (
            <p className="mt-6 text-base leading-relaxed text-bone/80">{academic.body}</p>
          )}

          <div className="mt-10 space-y-8">
            {(academic.role || academic.institution) && (
              <div>
                <MetaLabel>Affiliation</MetaLabel>
                <p className="text-base text-bone">
                  {academic.role}
                  {academic.role && academic.institution ? ', ' : ''}
                  {academic.institution}
                </p>
              </div>
            )}

            {academic.projectName && (
              <div>
                <MetaLabel>Project</MetaLabel>
                <p className="text-base text-bone">
                  {academic.projectUrl ? (
                    <a
                      href={academic.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-bone"
                    >
                      {academic.projectName}
                    </a>
                  ) : (
                    academic.projectName
                  )}
                </p>
              </div>
            )}

            {academic.researchAreas && academic.researchAreas.length > 0 && (
              <div>
                <MetaLabel>Research areas</MetaLabel>
                <p className="text-base text-bone">
                  {academic.researchAreas.map((a) => a.name).join(' · ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
