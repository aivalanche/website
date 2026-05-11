'use client'
import { useRef, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function HeatmapView({ path, clicks, availablePaths }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const iframeRef = useRef(null)
  const overlayRef = useRef(null)
  const [iframeHeight, setIframeHeight] = useState(1400)
  const [loaded, setLoaded] = useState(false)

  // Aggregate clicks into a 24×height grid for density.
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    const ctx = overlay.getContext('2d')
    const W = overlay.width
    const H = overlay.height
    ctx.clearRect(0, 0, W, H)
    if (clicks.length === 0) return

    // Density buckets.
    const cell = 14
    const cols = Math.ceil(W / cell)
    const rows = Math.ceil(H / cell)
    const grid = new Float32Array(cols * rows)
    let max = 0
    for (const c of clicks) {
      const px = c.x * W
      const py = c.y * H
      const ci = Math.min(cols - 1, Math.max(0, Math.floor(px / cell)))
      const ri = Math.min(rows - 1, Math.max(0, Math.floor(py / cell)))
      const idx = ri * cols + ci
      grid[idx] += 1
      if (grid[idx] > max) max = grid[idx]
    }
    // Draw soft circles for each cell.
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = grid[r * cols + c]
        if (!v) continue
        const t = v / max
        const x = c * cell + cell / 2
        const y = r * cell + cell / 2
        const grad = ctx.createRadialGradient(x, y, 0, x, y, cell * 2)
        grad.addColorStop(0, `rgba(255, 77, 18, ${0.5 + 0.5 * t})`)
        grad.addColorStop(0.5, `rgba(255, 152, 60, ${0.3 * t})`)
        grad.addColorStop(1, 'rgba(255, 152, 60, 0)')
        ctx.fillStyle = grad
        ctx.fillRect(x - cell * 2, y - cell * 2, cell * 4, cell * 4)
      }
    }
  }, [clicks, iframeHeight])

  function pickPath(p) {
    const sp = new URLSearchParams(searchParams)
    sp.set('path', p)
    router.push(`/admin/heatmap?${sp.toString()}`)
  }

  return (
    <div style={{ marginTop: 24 }}>
      <div className="lf-field" style={{ marginBottom: 16 }}>
        <label>Page</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(availablePaths.length === 0 ? [{ path: '/', count: 0 }] : availablePaths).map(({ path: p, count }) => (
            <button key={p} type="button" className={p === path ? 'btn solid' : 'btn'} onClick={() => pickPath(p)}>
              {p} · {count}
            </button>
          ))}
        </div>
      </div>

      <div className="mono" style={{ fontSize: 12, color: 'var(--ink-2)', marginBottom: 8 }}>
        {path} · {clicks.length} clicks
      </div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1280,
          height: iframeHeight,
          border: '1px solid var(--line)',
          overflow: 'hidden',
          background: 'var(--bg-2)',
        }}>
        <iframe
          ref={iframeRef}
          src={path}
          title="page under heatmap"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
            pointerEvents: 'none',
            opacity: 0.6,
          }}
          onLoad={() => {
            setLoaded(true)
            try {
              const ih = iframeRef.current?.contentDocument?.documentElement?.scrollHeight
              if (ih && ih > 200) setIframeHeight(ih)
            } catch {
              /* cross-origin iframe access can throw — leave height at default */
            }
          }}
        />
        <canvas
          ref={overlayRef}
          width={1280}
          height={iframeHeight}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        />
        {!loaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: 12,
              color: 'var(--ink-2)',
            }}>
            Loading page preview…
          </div>
        )}
      </div>
    </div>
  )
}
