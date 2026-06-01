import { ContactForm } from '../ContactForm'

export function ContactFormBlock({ block }: { block: any }) {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        {/* Left: heading + intro + professional note + direct email */}
        <div className="md:col-span-5">
          <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-normal leading-[1] tracking-tight text-bone">
            {block.heading || 'Contact'}
          </h1>
          {block.intro && (
            <p className="mt-6 max-w-md text-xl leading-relaxed text-bone/75">{block.intro}</p>
          )}

          {block.professionalLabel && (
            <p className="mt-8 max-w-md text-base leading-relaxed text-bone/70">
              {block.professionalPrefix ? `${block.professionalPrefix} ` : ''}
              {block.professionalUrl ? (
                <a
                  href={block.professionalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="a-accent"
                >
                  {block.professionalLabel}
                </a>
              ) : (
                block.professionalLabel
              )}
              {block.professionalSuffix}
            </p>
          )}

          {block.email && (
            <div className="mt-10">
              <div className="text-sm text-bone/45">Or write directly</div>
              <a
                href={`mailto:${block.email}`}
                className="link-underline mt-1 inline-block font-display text-2xl text-bone hover:text-accent"
              >
                {block.email}
              </a>
            </div>
          )}
        </div>

        {/* Right: form */}
        <div className="md:col-span-6 md:col-start-7">
          <ContactForm
            successMessage={block.successMessage}
            submitLabel={block.submitLabel}
            showSubject={block.showSubject ?? true}
          />
        </div>
      </div>
    </section>
  )
}
