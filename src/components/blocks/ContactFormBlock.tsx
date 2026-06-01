import { ContactForm } from '../ContactForm'

export function ContactFormBlock({ block }: { block: any }) {
  return (
    <section className="container-page py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="text-4xl font-medium leading-tight md:text-5xl">
            {block.heading || 'Get in touch'}
          </h2>
          {block.intro && (
            <p className="mt-6 max-w-md text-base leading-relaxed text-bone/80">{block.intro}</p>
          )}
          {block.email && (
            <div className="mt-8">
              <div className="mb-1 text-sm uppercase tracking-wider text-bone/60">
                Or write directly
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
