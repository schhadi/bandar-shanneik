'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLink = { href: string; label: string; newTab?: boolean }

export function MobileNav({
  links,
  logoText,
  locale,
}: {
  links: NavLink[]
  logoText: string
  locale: string
}) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const drawer = (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className={`fixed inset-0 z-[100] transition-[clip-path] duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] md:hidden ${
        open
          ? '[clip-path:circle(150%_at_calc(100%-2.5rem)_2.5rem)]'
          : '[clip-path:circle(0%_at_calc(100%-2.5rem)_2.5rem)]'
      }`}
      style={{
        background:
          'radial-gradient(120% 80% at 100% 0%, #2F5A48 0%, #214135 55%, #16271F 100%)',
      }}
    >
      <div className="relative flex h-full flex-col text-ink">
        <div className="border-b border-ink/15">
          <div className="container-page flex items-center justify-between py-5">
            <span className="font-display text-lg text-ink">{logoText}</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-10 w-10 items-center justify-center"
            >
              <span className="relative block h-3 w-3">
                <span className="absolute left-0 top-1/2 block h-px w-3 -translate-y-1/2 rotate-45 bg-ink" />
                <span className="absolute left-0 top-1/2 block h-px w-3 -translate-y-1/2 -rotate-45 bg-ink" />
              </span>
            </button>
          </div>
        </div>

        <nav className="container-page flex flex-1 flex-col justify-center gap-1 py-12">
          {links.map((link, i) => (
            <Link
              key={`${link.href}-${i}`}
              href={link.href}
              target={link.newTab ? '_blank' : undefined}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${150 + i * 70}ms` : '0ms' }}
              className={`group flex items-baseline gap-5 border-b border-ink/15 py-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <span className="flex-1 font-display text-[clamp(2.25rem,11vw,3.5rem)] font-light leading-[1.05] text-ink transition-colors duration-300 group-hover:text-bone/60">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-ink/15">
          <div className="container-page flex items-center justify-between gap-3 py-6 text-sm text-ink/70">
            <a
              href="mailto:contact.shanneik@gmail.com"
              className="transition-colors hover:text-bone/60"
            >
              contact.shanneik@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/bandar-shanneik"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-bone/60"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="relative z-[60] -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
      >
        <span className="sr-only">Open menu</span>
        <span className="relative block h-2.5 w-6">
          <span className="absolute left-0 top-0 block h-px w-6 bg-bone" />
          <span className="absolute bottom-0 left-0 block h-px w-4 bg-bone" />
        </span>
      </button>

      {mounted ? createPortal(drawer, document.body) : null}
    </>
  )
}
