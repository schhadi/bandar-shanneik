'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

type Props = {
  successMessage?: string
  submitLabel?: string
  showSubject?: boolean
}

export function ContactForm({
  successMessage = 'Thank you. Your message has been sent.',
  submitLabel = 'Send message',
  showSubject = true,
}: Props) {
  const pathname = usePathname() || ''
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('website')) {
      setStatus('success')
      form.reset()
      return
    }

    const segments = pathname.split('/').filter(Boolean)
    const locale = segments[0] || 'en'
    const pageSlug = segments.slice(1).join('/') || 'home'

    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      subject: String(data.get('subject') || ''),
      message: String(data.get('message') || ''),
      meta: {
        locale,
        pageSlug,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      },
    }

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        const message =
          json?.errors?.[0]?.message ||
          json?.message ||
          'Something went wrong. Please try again.'
        throw new Error(message)
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Unexpected error')
    }
  }

  if (status === 'success') {
    return (
      <div>
        <p className="text-xl leading-snug text-bone">{successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="link-underline mt-6 inline-block text-sm text-bone/70 hover:text-bone"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <label className="field">
          <span className="field-label">Name *</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="field-input"
            placeholder="Your full name"
          />
        </label>
        <label className="field">
          <span className="field-label">Email *</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="field-input"
            placeholder="you@example.com"
          />
        </label>
      </div>

      {showSubject && (
        <label className="field">
          <span className="field-label">Subject</span>
          <input type="text" name="subject" className="field-input" placeholder="What is this about?" />
        </label>
      )}

      <label className="field">
        <span className="field-label">Message *</span>
        <textarea
          name="message"
          required
          rows={5}
          className="field-textarea"
          placeholder="A few details about your enquiry…"
        />
      </label>

      {status === 'error' && (
        <div className="border border-line p-4 text-sm text-bone">{errorMessage}</div>
      )}

      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-bone/60">* Required fields</p>
        <button type="submit" disabled={status === 'loading'} className="btn-outline disabled:opacity-50">
          {status === 'loading' ? 'Sending…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
