import { ContactForm } from '../ContactForm'
import { labels, type Locale } from '@/lib/i18n'

type ProfessionalNote = {
  intro?: string
  linkLabel?: string
  linkUrl?: string
}

export function ContactFormBlock({ block, locale }: { block: any; locale: Locale }) {
  const l = labels[locale]
  const note: ProfessionalNote | undefined = block.professionalNote
  return (
    <section className="container-page flex min-h-[calc(100svh-73px)] items-center py-10 md:py-12">
      <div className="grid w-full gap-8 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="text-3xl font-medium leading-tight md:text-5xl">
            {block.heading || 'Get in touch'}
          </h2>
          {block.intro && (
            <p className="mt-4 max-w-md text-base leading-relaxed text-bone/80">{block.intro}</p>
          )}
          {note?.linkLabel && note.linkUrl && (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-bone/65">
              {note.intro || 'For professional legal matters, please direct enquiries to'}{' '}
              <a
                href={note.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-bone"
              >
                {note.linkLabel}
              </a>
              .
            </p>
          )}
          {block.email && (
            <div className="mt-6">
              <div className="mb-1 text-sm uppercase tracking-wider text-accent">
                {l.orWriteDirectly}
              </div>
              <a
                href={`mailto:${block.email}`}
                className="link-underline text-lg text-bone"
              >
                {block.email}
              </a>
            </div>
          )}
        </div>

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
