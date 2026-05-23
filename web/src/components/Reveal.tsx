'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'span' | 'li' | 'ul' | 'ol'
  delay?: 0 | 1 | 2 | 3 | 4
  variant?: 'fade' | 'clip'
}

export function Reveal({ children, className, as: Tag = 'div', delay = 0, variant = 'fade' }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const klass = clsx(variant === 'clip' ? 'clip-reveal' : 'reveal', className)
  return (
    <Tag ref={ref as any} className={klass} data-stagger={delay || undefined}>
      {children}
    </Tag>
  )
}
