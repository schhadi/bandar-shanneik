import React from 'react'

type Props = { name: string; className?: string }

export function Icon({ name, className = 'h-5 w-5' }: Props) {
  switch (name) {
    case 'scale':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M12 3v18M5 7h14M5 7l-2 6h4l-2-6zM19 7l-2 6h4l-2-6z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'book':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M4 5a2 2 0 012-2h13v18H6a2 2 0 01-2-2V5zM9 3v18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'arrow':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'download':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'bank':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M3 10h18L12 3 3 10zM5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'wig':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M6 18c0-6 2.7-10 6-10s6 4 6 10M9 18h6M8 21h8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'skyline':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M3 21V11l4-3 4 3v10M11 21V7l5-3 5 3v14M3 21h18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'flag':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M5 21V4M5 4h12l-2 4 2 4H5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M4 4h4v4H4V4zM4 10h4v10H4V10zM10 10h4v1.5c.6-.9 1.8-1.8 3.5-1.8 3 0 4.5 2 4.5 5V20h-4v-5c0-1.4-.5-2.3-1.8-2.3-1.2 0-1.9.8-2.2 1.6V20h-4V10z" />
        </svg>
      )
    case 'menu':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'close':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}
