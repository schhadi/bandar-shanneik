'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'

/** A hairline that draws itself left→right when entering the viewport. */
export function AnimatedLine({
  className,
  direction = 'horizontal',
  color = 'currentColor',
}: {
  className?: string
  direction?: 'horizontal' | 'vertical'
  color?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={clsx(
        'animated-line',
        direction === 'horizontal' ? 'animated-line--h' : 'animated-line--v',
        className,
      )}
      style={{ background: color }}
    />
  )
}
