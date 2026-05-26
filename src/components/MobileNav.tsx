'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLink = { href: string; label: string; newTab?: boolean }

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
      >
        <span className="sr-only">Toggle menu</span>
        <span className="relative block h-3 w-6">
          <span
            className={`absolute left-0 top-0 block h-px w-6 bg-bone transition-transform duration-300 ${
              open ? 'translate-y-[6px] rotate-45' : ''
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 block h-px w-6 bg-bone transition-transform duration-300 ${
              open ? '-translate-y-[6px] -rotate-45' : ''
            }`}
          />
        </span>
      </button>

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-ink/95 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col items-start justify-center gap-2 px-8">
          {links.map((link, i) => (
            <Link
              key={`${link.href}-${i}`}
              href={link.href}
              target={link.newTab ? '_blank' : undefined}
              onClick={() => setOpen(false)}
              className="group flex w-full items-baseline gap-4 border-b border-line/30 py-5 font-display text-4xl text-bone transition-colors hover:text-accent"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent/70">
                0{i + 1}
              </span>
              <span className="flex-1">{link.label}</span>
              <span aria-hidden="true" className="text-accent/40 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
