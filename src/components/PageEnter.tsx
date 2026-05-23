'use client'

import { useEffect, useState } from 'react'

/** Plays once on mount: cream curtain wipes away to reveal the page. */
export function PageEnter() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1300)
    return () => clearTimeout(t)
  }, [])

  if (done) return null

  return (
    <div
      aria-hidden="true"
      className="page-enter pointer-events-none fixed inset-0 z-[55] bg-bone"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="page-enter-mark font-mono text-[10px] uppercase tracking-[0.4em] text-ink/70">
          Bandar · Shanneik
        </div>
      </div>
    </div>
  )
}
