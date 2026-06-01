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
      className={`fixed inset-0 z-[100] bg-ink transition-opacity duration-300 md:hidden ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="relative flex h-full flex-col">
        <div className="border-b border-line">
          <div className="container-page flex items-center justify-between py-5">
            <span className="font-display text-lg text-bone">{logoText}</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-10 w-10 items-center justify-center"
            >
              <span className="relative block h-3 w-3">
                <span className="absolute left-0 top-1/2 block h-px w-3 -translate-y-1/2 rotate-45 bg-bone" />
                <span className="absolute left-0 top-1/2 block h-px w-3 -translate-y-1/2 -rotate-45 bg-bone" />
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
              className="group flex items-baseline gap-5 border-b border-line py-5"
            >
              <span className="flex-1 font-display text-[clamp(2.25rem,11vw,3.5rem)] font-normal leading-[1.05] text-bone transition-colors duration-200 group-hover:text-accent">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-line">
          <div className="container-page flex items-center justify-between gap-3 py-6 text-sm text-bone/70">
            <a
              href="mailto:contact.shanneik@gmail.com"
              className="transition-colors hover:text-accent"
            >
              contact.shanneik@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/bandar-shanneik"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
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
