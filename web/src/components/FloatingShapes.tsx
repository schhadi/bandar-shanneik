'use client'

import { useEffect, useRef } from 'react'

/** Subtle floating accent dots that drift on mousemove + scroll. Decorative only. */
export function FloatingShapes() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0,
      raf = 0
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 30
      my = (e.clientY / window.innerHeight - 0.5) * 30
    }
    const tick = () => {
      cx += (mx - cx) * 0.05
      cy += (my - cy) * 0.05
      el.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <div ref={ref} className="absolute inset-0 will-change-transform">
        <span className="floating-dot floating-dot--1" />
        <span className="floating-dot floating-dot--2" />
        <span className="floating-dot floating-dot--3" />
        <span className="floating-dot floating-dot--4" />
      </div>
    </div>
  )
}
