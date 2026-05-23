'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed left-0 top-0 z-[60] h-px w-full origin-left bg-transparent">
      <div ref={bar} className="h-px w-full origin-left scale-x-0 bg-accent" />
    </div>
  )
}
