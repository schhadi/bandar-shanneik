'use client'

import { useEffect, useRef, useState } from 'react'

type RevealProps = {
  children: React.ReactNode
  /** Extra classes applied to the wrapper element. */
  className?: string
  /** Stagger, in milliseconds, before this element eases in. */
  delay?: number
  /** Render as a different element than a div (e.g. 'li', 'span'). */
  as?: 'div' | 'li' | 'span' | 'section'
}

/**
 * Scroll-triggered reveal. The wrapper starts faded + nudged down and eases
 * into place the first time it enters the viewport. Honours reduced-motion and
 * no-JS via the CSS guards in globals.css.
 */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    // Reveal straight away when motion is unwanted, when IntersectionObserver
    // is unavailable, or when the viewport has no measurable height (e.g. some
    // embedded/headless contexts) — never leave content stuck invisible.
    if (reduce || typeof IntersectionObserver === 'undefined' || !window.innerHeight) {
      setShown(true)
      return
    }

    // Already on screen at mount? Reveal without waiting for a scroll.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown])

  return (
    <Tag
      ref={ref as any}
      className={`reveal${shown ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
