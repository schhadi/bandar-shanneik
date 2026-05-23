export function ContactBlock({ block }: { block: any }) {
  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-5xl text-forest">{block.heading || 'Get in touch'}</h2>
        {block.intro && (
          <p className="mt-6 text-base leading-relaxed text-forest/75">{block.intro}</p>
        )}
        <div className="mt-8 space-y-3 text-forest">
          {block.email && (
            <div>
              <a href={`mailto:${block.email}`} className="text-gold-dark hover:underline">
                {block.email}
              </a>
            </div>
          )}
          {block.phone && (
            <div>
              <a href={`tel:${block.phone}`} className="text-gold-dark hover:underline">
                {block.phone}
              </a>
            </div>
          )}
          {block.address && (
            <div className="whitespace-pre-line text-sm text-forest/70">{block.address}</div>
          )}
        </div>
      </div>
    </section>
  )
}
