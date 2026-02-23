'use client'
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import { useState } from 'react'

export default function RequestDemo() {
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const formData = {
        name: e.target.username.value,
        companyName: e.target.companyname.value,
        contactNumber: e.target.contactno.value,
        email: e.target.email.value,
        message: e.target.message.value,
      }

      const response = await fetch('/api/request-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        return
      }

      if (data.details?.failed?.length > 0) {
        setStatus('partial')
      } else {
        setStatus('success')
        e.target.reset()
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    border: '1px solid var(--wp-line, #D8D1C5)',
    background: 'transparent',
    color: 'var(--wp-text, #121417)',
  }

  return (
    <>
      <SecondaryNavbar />
      <main className="mx-auto max-w-[700px] px-6 py-32">
        <p className="mb-3 text-[11px] uppercase tracking-[0.15em] opacity-30">Demo</p>
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Demo anfragen</h1>
        <p className="mb-10 text-[16px] leading-relaxed opacity-55">
          Sehen Sie live, wie AIvalanche mit OpenClaw Aufgaben aus Chat-Nachrichten in echte Ausfuehrung ueberfuehrt.
          Wir zeigen einen praxisnahen Ablauf fuer Ihr Team.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium">
                Ihr Name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="Name"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="companyname" className="mb-2 block text-sm font-medium">
                Unternehmen
              </label>
              <input
                type="text"
                name="companyname"
                id="companyname"
                required
                placeholder="Firma"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="contactno" className="mb-2 block text-sm font-medium">
                Telefon
              </label>
              <input
                type="tel"
                name="contactno"
                id="contactno"
                required
                placeholder="Telefonnummer"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Geschaefts-E-Mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="E-Mail"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                style={inputStyle}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              Nachricht
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows="6"
              className="w-full resize-none rounded-lg px-4 py-2.5 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-full px-7 py-3 text-sm font-semibold transition-colors"
              style={{ background: 'var(--wp-accent, #1DBF73)', color: 'var(--wp-bg, #F4F0E8)' }}>
              {status === 'sending' ? 'Wird gesendet...' : 'Demo anfragen'}
            </button>
            {status === 'success' && (
              <p className="mt-4 text-sm" style={{ color: 'var(--wp-accent)' }}>
                Anfrage erfolgreich gesendet.
              </p>
            )}
            {status === 'partial' && (
              <p className="mt-4 text-sm text-yellow-600">Gesendet, aber mit teilweise fehlgeschlagener Zustellung.</p>
            )}
            {status === 'error' && <p className="mt-4 text-sm text-red-600">Fehlgeschlagen. Bitte erneut versuchen.</p>}
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}
