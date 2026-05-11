'use client'

import { useState } from 'react'

export default function WaitlistEmailForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale: 'en' }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} className="lf-signup">
      <input
        type="email"
        required
        placeholder="you@lab.edu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'sending'}
        aria-label="Email"
      />
      <button type="submit" disabled={status === 'sending'} className="btn orange">
        {status === 'sending' ? 'Sending…' : 'Get early access'} <span className="arr">→</span>
      </button>
      <div className="lf-signup-status mono upp">
        {status === 'success' && <span className="ok">✓ On the list — we&apos;ll be in touch.</span>}
        {status === 'error' && <span className="err">Couldn&apos;t register — try again or book a walkthrough.</span>}
        {status !== 'success' && status !== 'error' && (
          <span className="hint">NO CARD · DOWNLOAD IS 32 MB · WORKS OFFLINE</span>
        )}
      </div>
    </form>
  )
}
