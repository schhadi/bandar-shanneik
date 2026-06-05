'use client'

import { useState } from 'react'

type Area = { title?: string; description?: string }

// Click-to-expand list of practice areas: each title is a button that reveals
// its description. Independent toggle — several can be open at once.
export function ExpertiseAreas({ areas }: { areas: Area[] }) {
  const [open, setOpen] = useState<Record<number, boolean>>({})

  return (
    <div className="mt-6 divide-y divide-line border-y border-line">
      {areas.map((a, i) => {
        const isOpen = !!open[i]
        return (
          <div key={i}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
              className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-accent"
            >
              <h3 className="text-lg font-medium leading-snug text-bone transition-colors group-hover:text-accent md:text-xl">
                {a.title}
              </h3>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                {a.description && (
                  <p className="max-w-2xl pb-5 text-sm leading-relaxed text-bone/70 md:text-base">
                    {a.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
