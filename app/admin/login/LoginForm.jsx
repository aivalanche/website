'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  return (
    <form
      className="lf-form"
      onSubmit={async (e) => {
        e.preventDefault()
        setBusy(true)
        setErr('')
        try {
          const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
          })
          if (!res.ok) {
            const { error } = await res.json().catch(() => ({}))
            setErr(error || 'Sign-in failed')
            setBusy(false)
            return
          }
          router.push('/admin')
          router.refresh()
        } catch (e) {
          setErr(e?.message || 'Network error')
          setBusy(false)
        }
      }}>
      <div className="lf-field">
        <label htmlFor="adminpw">Password</label>
        <input
          id="adminpw"
          className="lf-input"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="lf-submit" disabled={busy}>
        {busy ? 'Signing in…' : 'Sign in'} <span className="arr">→</span>
      </button>
      {err && <span className="lf-form-msg err">{err}</span>}
    </form>
  )
}
