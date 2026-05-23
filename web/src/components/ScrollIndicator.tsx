'use client'

import { useEffect, useState } from 'react'

export function ScrollIndicator() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => {
      const overflow =
        document.documentElement.scrollHeight - window.innerHeight > 80
      const scrolled = window.scrollY > 40
      setVisible(overflow && !scrolled)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    // Re-check shortly after mount in case fonts/images push the layout.
    const t = setTimeout(check, 600)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      clearTimeout(t)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed bottom-6 right-6 z-30 transition-opacity duration-700 ease-out-expo md:bottom-10 md:right-10 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/65">
        <span className="rotate-180 [writing-mode:vertical-rl] [text-orientation:mixed]">
          Scroll
        </span>
        <div className="relative h-16 w-px overflow-hidden bg-bone/20">
          <span className="scroll-indicator-dash absolute inset-x-0 top-0 block h-5 w-px bg-accent" />
        </div>
      </div>
    </div>
  )
}
