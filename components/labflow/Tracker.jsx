'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// Reuse the same anonymous session id across pages within a tab session.
function sessionId() {
  if (typeof window === 'undefined') return 'ssr'
  try {
    let id = sessionStorage.getItem('lf_sid')
    if (!id) {
      id = (crypto.randomUUID && crypto.randomUUID()) || Math.random().toString(36).slice(2)
      sessionStorage.setItem('lf_sid', id)
    }
    return id
  } catch {
    return 'anon'
  }
}

function shouldSkip(path) {
  return path.startsWith('/admin') || path.startsWith('/api')
}

async function send(payload) {
  try {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
      const ok = navigator.sendBeacon('/api/track', blob)
      if (ok) return
    }
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    })
  } catch {
    /* swallow */
  }
}

export default function Tracker() {
  const pathname = usePathname()
  const lastPath = useRef(null)

  // Page-view ping when the path changes.
  useEffect(() => {
    if (!pathname || shouldSkip(pathname)) return
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    send({ type: 'page', path: pathname, sessionId: sessionId() })
  }, [pathname])

  // Capture clicks (anywhere on the page).
  useEffect(() => {
    if (!pathname || shouldSkip(pathname)) return
    function onClick(e) {
      const x = e.clientX
      const y = e.pageY
      const vw = window.innerWidth || 1
      const vh = window.innerHeight || 1
      const pageHeight = Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0, vh)
      send({
        type: 'click',
        path: pathname,
        x: x / vw,
        y: y / pageHeight,
        viewportWidth: vw,
        viewportHeight: vh,
        pageHeight,
        sessionId: sessionId(),
      })
    }
    document.addEventListener('click', onClick, { passive: true })
    return () => document.removeEventListener('click', onClick)
  }, [pathname])

  return null
}
