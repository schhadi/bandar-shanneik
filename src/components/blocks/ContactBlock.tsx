export function ContactBlock({ block }: { block: any }) {
  return (
    <section className="container-page py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="text-4xl font-medium leading-tight md:text-5xl">
            {block.heading}
          </h2>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          {block.intro && (
            <p className="text-base leading-relaxed text-bone/80">{block.intro}</p>
          )}
          <div className="mt-8 space-y-6">
            {block.email && (
              <div>
                <div className="mb-1 text-sm uppercase tracking-wider text-bone/60">Email</div>
                <a
                  href={`mailto:${block.email}`}
                  className="link-underline text-lg text-bone"
                >
                  {block.email}
                </a>
              </div>
            )}
            {block.phone && (
              <div>
                <div className="mb-1 text-sm uppercase tracking-wider text-bone/60">Phone</div>
                <a
                  href={`tel:${block.phone}`}
                  className="link-underline text-lg text-bone"
                >
                  {block.phone}
                </a>
              </div>
            )}
            {block.address && (
              <div>
                <div className="mb-1 text-sm uppercase tracking-wider text-bone/60">Address</div>
                <div className="whitespace-pre-line text-base text-bone/80">{block.address}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
