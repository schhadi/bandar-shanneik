'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'

type Props = {
  text: string
  className?: string
  splitBy?: 'char' | 'word'
  delayStep?: number
  startDelay?: number
  /** Wrap last word in an italic accent span (matches site pattern). */
  accentLastWord?: boolean
  trigger?: 'mount' | 'scroll'
}

export function SplitText({
  text,
  className,
  splitBy = 'char',
  delayStep = 30,
  startDelay = 0,
  accentLastWord = false,
  trigger = 'scroll',
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (trigger === 'mount') {
      root.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [trigger])

  const words = text.split(' ')

  return (
    <span ref={ref} className={clsx('split-text', className)}>
      {words.map((word, wi) => {
        const isLast = wi === words.length - 1
        const wordClass = isLast && accentLastWord ? 'italic text-accent' : ''
        if (splitBy === 'word') {
          return (
            <span key={wi} className="split-text__word">
              <span
                className={clsx('split-text__inner inline-block', wordClass)}
                style={{ transitionDelay: `${startDelay + wi * delayStep}ms` }}
              >
                {word}
              </span>
              {wi < words.length - 1 && <span>&nbsp;</span>}
            </span>
          )
        }
        // char split — also wrap whole word so we can space them
        const chars = Array.from(word)
        return (
          <span key={wi} className={clsx('split-text__word', wordClass)}>
            {chars.map((c, ci) => {
              const idx =
                words.slice(0, wi).reduce((s, w) => s + w.length, 0) + ci
              return (
                <span key={ci} className="split-text__char">
                  <span
                    className="split-text__inner inline-block"
                    style={{ transitionDelay: `${startDelay + idx * delayStep}ms` }}
                  >
                    {c}
                  </span>
                </span>
              )
            })}
            {wi < words.length - 1 && <span>&nbsp;</span>}
          </span>
        )
      })}
    </span>
  )
}
