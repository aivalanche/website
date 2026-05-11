'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LogoutButton() {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  return (
    <button
      className="btn solid"
      disabled={busy}
      onClick={async () => {
        setBusy(true)
        try {
          await fetch('/api/admin/logout', { method: 'POST' })
        } catch {
          /* logout request can fail silently — we redirect anyway */
        }
        router.push('/admin/login')
        router.refresh()
      }}>
      {busy ? '…' : 'Sign out'}
    </button>
  )
}
