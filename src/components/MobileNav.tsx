'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from './Icon'

type NavLink = { href: string; label: string; newTab?: boolean }

export function MobileNav({
  links,
  logoText,
  locale,
  linkedinUrl,
}: {
  links: NavLink[]
  logoText: string
  locale: string
  linkedinUrl: string
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
      inert={!open}
      className={`fixed inset-0 z-[100] bg-ink text-bone transition-opacity duration-300 ease-out md:hidden ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="container-page flex items-center justify-between py-6">
        <span className="text-sm font-medium">{logoText}</span>
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="-mr-1 inline-flex h-8 w-8 items-center justify-center text-bone transition-colors hover:text-accent"
        >
          <Icon name="close" className="h-6 w-6" />
        </button>
      </div>

      <nav className="container-page mt-8 flex flex-col gap-6">
        {links.map((link, i) => (
          <Link
            key={`${link.href}-${i}`}
            href={link.href}
            target={link.newTab ? '_blank' : undefined}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${80 + i * 55}ms` : '0ms' }}
            className={`text-2xl text-bone transition-[transform,opacity,color] duration-500 ease-out hover:text-accent ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ transitionDelay: open ? `${80 + links.length * 55}ms` : '0ms' }}
          className={`mt-4 inline-flex items-center gap-2 text-sm text-bone/70 transition-[transform,opacity,color] duration-500 ease-out hover:text-accent ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          <Icon name="linkedin" className="h-4 w-4" />
          LinkedIn
        </a>
        <div className="mt-8 text-xs text-bone/50">/{locale.toUpperCase()}</div>
      </nav>
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
        className="-mr-1 inline-flex h-8 w-8 items-center justify-center text-bone hover:text-accent md:hidden"
      >
        <Icon name="menu" className="h-6 w-6" />
      </button>
      {mounted ? createPortal(drawer, document.body) : null}
    </>
  )
}
