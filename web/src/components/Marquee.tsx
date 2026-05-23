type Props = {
  items: string[]
  separator?: string
}

export function Marquee({ items, separator = '✦' }: Props) {
  const row = (
    <div className="marquee__track">
      {items.concat(items).map((item, i) => (
        <span key={i} className="flex items-center gap-10 font-display text-2xl italic leading-none md:text-3xl">
          <span>{item}</span>
          <span className="text-accent">{separator}</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee py-5" aria-hidden="true">
      {row}
    </div>
  )
}
