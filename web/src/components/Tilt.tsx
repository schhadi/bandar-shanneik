'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  className?: string
  max?: number // degrees
}

/** Subtle 3D tilt that follows the cursor. */
export function Tilt({ children, className, max = 6 }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current
    const target = inner.current
    if (!el || !target) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let raf = 0
    let trx = 0,
      try_ = 0,
      crx = 0,
      cry = 0

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      trx = -y * max
      try_ = x * max
    }
    const onLeave = () => {
      trx = 0
      try_ = 0
    }
    const tick = () => {
      crx += (trx - crx) * 0.12
      cry += (try_ - cry) * 0.12
      target.style.transform = `perspective(900px) rotateX(${crx.toFixed(2)}deg) rotateY(${cry.toFixed(2)}deg)`
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
  }, [max])

  return (
    <div ref={wrap} className={clsx('block', className)} style={{ perspective: '900px' }}>
      <div ref={inner} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}
