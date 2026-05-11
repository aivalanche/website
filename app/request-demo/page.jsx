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

  return (
    <div className="lf-root">
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">DEMO · LF-DEMO</div>
            <div className="cell">SLOT · 20 MIN</div>
            <div className="cell" />
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              REPLY · WITHIN 1 BIZ-DAY
            </div>
          </div>
          <div className="lf-eyebrow">07 / REQUEST A DEMO</div>
          <h1 className="lf-h1 medium">Get the agent on your bench.</h1>
          <p className="lf-lede">
            Tell us what you run. We&apos;ll show you Labflow driving your instruments — Keithley, Keysight, Tektronix,
            Rigol, Siglent, Fluke, NI — and write the report at the end. No card, no fluff.
          </p>
        </div>
      </section>

      <section className="lf-page">
        <div className="container" style={{ maxWidth: 820 }}>
          <form onSubmit={handleSubmit} className="lf-form">
            <div className="lf-form-row">
              <div className="lf-field">
                <label htmlFor="username">Operator name</label>
                <input
                  className="lf-input"
                  type="text"
                  name="username"
                  id="username"
                  required
                  placeholder="Marina Hernandez"
                />
              </div>
              <div className="lf-field">
                <label htmlFor="companyname">Lab / company</label>
                <input
                  className="lf-input"
                  type="text"
                  name="companyname"
                  id="companyname"
                  required
                  placeholder="NanoVolt Labs"
                />
              </div>
            </div>

            <div className="lf-form-row">
              <div className="lf-field">
                <label htmlFor="contactno">Phone</label>
                <input
                  className="lf-input"
                  type="tel"
                  name="contactno"
                  id="contactno"
                  required
                  placeholder="+1 415 555 0102"
                />
              </div>
              <div className="lf-field">
                <label htmlFor="email">Business email</label>
                <input
                  className="lf-input"
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="m.hernandez@nanovolt.io"
                />
              </div>
            </div>

            <div className="lf-field">
              <label htmlFor="message">What&apos;s on your bench?</label>
              <textarea
                className="lf-textarea"
                name="message"
                id="message"
                required
                rows="6"
                placeholder="e.g. Keithley 2400 + Tektronix MSO64 + Rigol DG1022 — characterising a custom MOSFET. Looking to automate transfer curves and PSRR sweeps."
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
              <button type="submit" disabled={status === 'sending'} className="lf-submit">
                {status === 'sending' ? 'Sending…' : 'Request demo'} <span className="arr">→</span>
              </button>
              {status === 'success' && (
                <span className="lf-form-msg ok">✓ Request received — we&apos;ll be in touch within a business day.</span>
              )}
              {status === 'partial' && (
                <span className="lf-form-msg warn">Sent — partial delivery. The team will follow up manually.</span>
              )}
              {status === 'error' && (
                <span className="lf-form-msg err">Couldn&apos;t submit. Try again or email hello@aivalanche.com.</span>
              )}
            </div>

            <p className="mono upp" style={{ fontSize: 10, color: 'var(--ink-2)', letterSpacing: '.12em', marginTop: 8 }}>
              NO CARD · FREE WHILE IN BETA · WORKS ON GPIB · USBTMC · LAN · SERIAL
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
