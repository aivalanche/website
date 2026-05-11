'use client'
import { useState } from 'react'

export default function EmailForm({ recipients, waitlistSize }) {
  const [mode, setMode] = useState('single')
  const [to, setTo] = useState(recipients[0]?.email || '')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('<p>Hi,</p>\n<p>Quick update from Labflow — </p>\n<p>— The Labflow team</p>')
  const [status, setStatus] = useState(null)
  const [busy, setBusy] = useState(false)

  return (
    <form
      className="lf-form"
      style={{ marginTop: 24 }}
      onSubmit={async (e) => {
        e.preventDefault()
        setStatus(null)
        setBusy(true)
        const payload = mode === 'broadcast-waitlist' ? { mode, subject, body } : { mode: 'single', to, subject, body }
        try {
          const res = await fetch('/api/admin/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
          const data = await res.json()
          if (!res.ok) {
            setStatus({ kind: 'err', text: data.error || 'Send failed' })
          } else {
            setStatus({
              kind: 'ok',
              text: `Sent to ${data.sent} recipient${data.sent === 1 ? '' : 's'}${
                data.failed?.length ? ` · ${data.failed.length} failed` : ''
              }`,
            })
          }
        } catch (e) {
          setStatus({ kind: 'err', text: e?.message || 'Network error' })
        } finally {
          setBusy(false)
        }
      }}>
      <div className="lf-field">
        <label>Mode</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className={mode === 'single' ? 'btn solid' : 'btn'} onClick={() => setMode('single')}>
            Single recipient
          </button>
          <button
            type="button"
            className={mode === 'broadcast-waitlist' ? 'btn solid' : 'btn'}
            onClick={() => setMode('broadcast-waitlist')}>
            Broadcast · waitlist ({waitlistSize})
          </button>
        </div>
      </div>

      {mode === 'single' && (
        <div className="lf-field">
          <label>To</label>
          <select className="lf-input" value={to} onChange={(e) => setTo(e.target.value)}>
            {recipients.map((r, i) => (
              <option key={`${r.source}-${r.email}-${i}`} value={r.email}>
                {r.email} · {r.source}
                {r.meta ? ` · ${r.meta}` : ''}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="lf-field">
        <label>Subject</label>
        <input
          className="lf-input"
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="A clear, useful subject line"
        />
      </div>

      <div className="lf-field">
        <label>Body (HTML allowed)</label>
        <textarea className="lf-textarea" required rows="10" value={body} onChange={(e) => setBody(e.target.value)} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button type="submit" className="lf-submit" disabled={busy}>
          {busy
            ? mode === 'broadcast-waitlist'
              ? `Sending to ${waitlistSize}…`
              : 'Sending…'
            : mode === 'broadcast-waitlist'
              ? `Send to ${waitlistSize} on the waitlist`
              : 'Send'}{' '}
          <span className="arr">→</span>
        </button>
        {status && <span className={`lf-form-msg ${status.kind}`}>{status.text}</span>}
      </div>
    </form>
  )
}
