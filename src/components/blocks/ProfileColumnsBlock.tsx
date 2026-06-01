function MetaRow({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="mt-6">
      <div className="text-sm text-bone/45">{label}</div>
      <div className="mt-1 text-bone/85">{values.join('  ·  ')}</div>
    </div>
  )
}

export function ProfileColumnsBlock({ block }: { block: any }) {
  const legal = block.legal || {}
  const academic = block.academic || {}

  return (
    <section className="container-page py-20 md:py-28">
      <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-normal leading-[1] tracking-tight text-bone">
        About
      </h1>
      {block.intro && (
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-bone/75">{block.intro}</p>
      )}

      <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-20">
        {/* Legal */}
        <div>
          <h2 className="font-display text-3xl text-accent">{legal.heading || 'Legal'}</h2>
          {legal.body && (
            <p className="mt-5 text-lg leading-relaxed text-bone/80">{legal.body}</p>
          )}
          {legal.affiliationLabel && (
            <p className="mt-6 text-bone/85">
              {legal.affiliationUrl ? (
                <a
                  href={legal.affiliationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="a-accent"
                >
                  {legal.affiliationLabel}
                </a>
              ) : (
                legal.affiliationLabel
              )}
            </p>
          )}
          {Array.isArray(legal.jurisdictions) && (
            <MetaRow label="Jurisdictions" values={legal.jurisdictions} />
          )}
          {Array.isArray(legal.languages) && <MetaRow label="Languages" values={legal.languages} />}
        </div>

        {/* Academic */}
        <div>
          <h2 className="font-display text-3xl text-accent">{academic.heading || 'Academic'}</h2>
          {academic.body && (
            <p className="mt-5 text-lg leading-relaxed text-bone/80">{academic.body}</p>
          )}
          {academic.affiliationLabel && (
            <p className="mt-6 text-bone/85">
              {academic.affiliationUrl ? (
                <a
                  href={academic.affiliationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="a-accent"
                >
                  {academic.affiliationLabel}
                </a>
              ) : (
                academic.affiliationLabel
              )}
              {academic.projectLabel && (
                <>
                  {' — associated with the '}
                  {academic.projectUrl ? (
                    <a
                      href={academic.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="a-accent"
                    >
                      {academic.projectLabel}
                    </a>
                  ) : (
                    academic.projectLabel
                  )}
                </>
              )}
            </p>
          )}
          {Array.isArray(academic.researchAreas) && (
            <MetaRow label="Research areas" values={academic.researchAreas} />
          )}
        </div>
      </div>

      {block.cvUrl && (
        <div className="mt-16">
          <a
            href={block.cvUrl}
            className="link-underline text-lg text-accent"
            target={block.cvUrl.startsWith('http') ? '_blank' : undefined}
            rel={block.cvUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {block.cvLabel || 'Download CV'} →
          </a>
        </div>
      )}
    </section>
  )
}
