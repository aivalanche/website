import { convex } from '@/lib/convex'
import { api } from '@/convex/_generated/api'

export const dynamic = 'force-dynamic'

export default async function VisitorsPage() {
  let visitors = []
  let pathStats = []
  let error = null
  try {
    const client = convex()
    ;[visitors, pathStats] = await Promise.all([
      client.query(api.visitors.recent, { limit: 300 }),
      client.query(api.visitors.pathStats, {}),
    ])
  } catch (e) {
    error = e?.message
  }
  if (error) {
    return (
      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">ADMIN · VISITORS</div>
          <h1 className="lf-h1 medium">Backend not reachable.</h1>
          <p className="lf-lede">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="lf-page">
      <div className="container">
        <div className="lf-eyebrow">VISITORS</div>
        <h1 className="lf-h1 medium" style={{ marginBottom: 24 }}>
          Recent traffic.
        </h1>
        <p className="lf-lede">
          IPs are hashed at write time; the /24 (or /64) prefix is kept for pattern spotting. We can&apos;t recover the
          full IP from this table — that&apos;s by design.
        </p>

        <div
          style={{
            marginTop: 24,
            border: '1px solid var(--line)',
            background: 'var(--bg)',
            overflowX: 'auto',
          }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr 110px 110px 90px',
              minWidth: 720,
              borderBottom: '1px solid var(--line)',
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: 10,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
              background: 'var(--bg-2)',
            }}>
            <div style={{ padding: '10px 14px' }}>When</div>
            <div style={{ padding: '10px 14px' }}>Path</div>
            <div style={{ padding: '10px 14px' }}>IP /24</div>
            <div style={{ padding: '10px 14px' }}>Country</div>
            <div style={{ padding: '10px 14px' }}>UA</div>
          </div>
          {visitors.map((v) => (
            <div
              key={v._id}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr 110px 110px 90px',
                minWidth: 720,
                borderBottom: '1px solid var(--line)',
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: 12,
              }}>
              <div style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>
                {new Date(v.timestamp).toLocaleString()}
              </div>
              <div style={{ padding: '10px 14px' }}>{v.path}</div>
              <div style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{v.ipPrefix}</div>
              <div style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{v.country || '—'}</div>
              <div
                style={{
                  padding: '10px 14px',
                  color: 'var(--ink-2)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={v.userAgent}>
                {shortUa(v.userAgent)}
              </div>
            </div>
          ))}
          {visitors.length === 0 && (
            <div
              style={{
                padding: '20px 14px',
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: 12,
                color: 'var(--ink-2)',
              }}>
              No visits recorded yet.
            </div>
          )}
        </div>

        <h2 className="lf-h2" style={{ marginTop: 48, marginBottom: 16 }}>
          By path (30 days).
        </h2>
        <div className="lf-row-list">
          {pathStats.map((p) => (
            <div key={p.path}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>{p.path}</h3>
                <p>
                  {p.views} views · {p.uniqueVisitors} unique
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function shortUa(ua) {
  if (!ua) return ''
  if (ua.includes('iPhone')) return 'iPhone'
  if (ua.includes('iPad')) return 'iPad'
  if (ua.includes('Android')) return 'Android'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('bot') || ua.includes('Bot')) return 'Bot'
  return ua.split(' ')[0]
}
