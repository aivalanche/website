import Link from 'next/link'
import { convex } from '@/lib/convex'
import { api } from '@/convex/_generated/api'

export const dynamic = 'force-dynamic'

async function loadStats() {
  try {
    const client = convex()
    const [summary, pathStats, waitlistCount, demoList, contactList, recentEmails] = await Promise.all([
      client.query(api.visitors.summary, {}),
      client.query(api.visitors.pathStats, {}),
      client.query(api.waitlist.count, {}),
      client.query(api.demoRequests.list, {}),
      client.query(api.contact.list, {}),
      client.query(api.emails.recent, { limit: 10 }),
    ])
    return { summary, pathStats, waitlistCount, demos: demoList.length, contacts: contactList.length, recentEmails }
  } catch (e) {
    return { error: e?.message }
  }
}

export default async function AdminHomePage() {
  const data = await loadStats()

  if (data.error) {
    return (
      <section className="lf-page">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="lf-eyebrow">ADMIN · OVERVIEW</div>
          <h1 className="lf-h1 medium">Backend not reachable.</h1>
          <p className="lf-lede">{data.error}</p>
          <p className="lf-lede" style={{ fontSize: 13 }}>
            Make sure <code>NEXT_PUBLIC_CONVEX_URL</code> is set and <code>npx convex dev</code> is running.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="lf-page">
      <div className="container">
        <div className="lf-eyebrow">OVERVIEW</div>
        <h1 className="lf-h1 medium" style={{ marginBottom: 24 }}>
          Labflow control room.
        </h1>

        <div className="lf-grid-3" style={{ marginTop: 24 }}>
          <KpiCard
            label="Visitors · 24h"
            value={data.summary.last24.views}
            sub={`${data.summary.last24.unique} unique`}
          />
          <KpiCard label="Visitors · 7d" value={data.summary.last7.views} sub={`${data.summary.last7.unique} unique`} />
          <KpiCard
            label="Visitors · 30d"
            value={data.summary.last30.views}
            sub={`${data.summary.last30.unique} unique`}
          />
          <KpiCard label="Waitlist" value={data.waitlistCount} sub="signups" />
          <KpiCard label="Demo requests" value={data.demos} sub="forms" />
          <KpiCard label="Contact forms" value={data.contacts} sub="messages" />
        </div>

        <h2 className="lf-h2" style={{ marginTop: 48, marginBottom: 16 }}>
          Pages, ranked.
        </h2>
        <div className="lf-row-list">
          {data.pathStats.length === 0 && (
            <div>
              <div>
                <p>No traffic recorded yet. Open a few pages to seed the counter.</p>
              </div>
            </div>
          )}
          {data.pathStats.slice(0, 20).map((row) => (
            <div key={row.path}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>{row.path}</h3>
                <p>
                  {row.views} views · {row.uniqueVisitors} unique
                </p>
              </div>
              <Link className="mono upp" href={`/admin/heatmap?path=${encodeURIComponent(row.path)}`}>
                Heatmap →
              </Link>
            </div>
          ))}
        </div>

        <h2 className="lf-h2" style={{ marginTop: 48, marginBottom: 16 }}>
          Recent emails.
        </h2>
        {data.recentEmails.length === 0 ? (
          <p className="lf-lede">No emails sent yet.</p>
        ) : (
          <div className="lf-row-list">
            {data.recentEmails.map((m) => (
              <div key={m._id}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-archivo)' }}>{m.subject}</h3>
                  <p>
                    {m.to} · {new Date(m.sentAt).toLocaleString()} ·{' '}
                    {m.success ? 'sent' : `failed (${m.error || 'unknown'})`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function KpiCard({ label, value, sub }) {
  return (
    <div className="lf-card">
      <div
        className="mono upp"
        style={{ fontSize: 10, letterSpacing: '.14em', color: 'var(--orange)', marginBottom: 12 }}>
        {label}
      </div>
      <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1 }}>{value}</div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--ink-2)', marginTop: 6 }}>
        {sub}
      </div>
    </div>
  )
}
