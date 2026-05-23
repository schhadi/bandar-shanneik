'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  className?: string
  strength?: number // 0..1
}

/** Wraps a child and pulls it toward the cursor on hover. */
export function Magnetic({ children, className, strength = 0.3 }: Props) {
  const wrap = useRef<HTMLSpanElement>(null)
  const inner = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = wrap.current
    const target = inner.current
    if (!el || !target) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let raf = 0
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      tx = x * strength
      ty = y * strength
    }
    const onLeave = () => {
      tx = 0
      ty = 0
    }
    const tick = () => {
      cx += (tx - cx) * 0.18
      cy += (ty - cy) * 0.18
      target.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <span ref={wrap} className={clsx('inline-block', className)}>
      <span ref={inner} className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  )
}
