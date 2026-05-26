'use client'

import { useEffect, useState } from 'react'
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
        className="relative z-[60] -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
      >
        <span className="sr-only">Toggle menu</span>
        <span className="relative block h-2.5 w-6">
          <span
            className={`absolute left-0 top-0 block h-px w-6 origin-center transition-all duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] ${
              open ? 'translate-y-[5px] rotate-45 bg-ink' : 'bg-bone'
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 block h-px origin-center transition-all duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] ${
              open ? 'w-6 -translate-y-[5px] -rotate-45 bg-ink' : 'w-4 bg-bone'
            }`}
          />
        </span>
      </button>

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-bone text-ink transition-[clip-path] duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] md:hidden ${
          open
            ? '[clip-path:circle(150%_at_calc(100%-2.5rem)_2.5rem)]'
            : '[clip-path:circle(0%_at_calc(100%-2.5rem)_2.5rem)]'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-ink/15">
            <div className="container-page flex items-center justify-between py-5">
              <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{logoText}</span>
              </span>
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
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  0{i + 1}
                </span>
                <span className="flex-1 font-display text-[clamp(2.5rem,12vw,4rem)] font-light leading-[0.95] tracking-tightest text-ink transition-colors duration-300 group-hover:text-accent">
                  {link.label}
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                >
                  →
                </span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-ink/15">
            <div
              className="container-page flex flex-col gap-3 py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55"
              style={{ transitionDelay: open ? `${150 + links.length * 70}ms` : '0ms' }}
            >
              <div className="flex items-center justify-between">
                <span>/{locale.toUpperCase()}</span>
                <span className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Available
                </span>
              </div>
              <a
                href="mailto:contact.shanneik@gmail.com"
                className="text-ink/80 transition-colors hover:text-accent"
              >
                contact.shanneik@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
