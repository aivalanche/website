import { convex } from '@/lib/convex'
import { api } from '@/convex/_generated/api'
import EmailForm from './EmailForm'

export const dynamic = 'force-dynamic'

async function loadAudience() {
  try {
    const client = convex()
    const [waitlist, demos] = await Promise.all([
      client.query(api.waitlist.list, {}),
      client.query(api.demoRequests.list, {}),
    ])
    return {
      waitlist: waitlist.map((e) => ({ email: e.email, source: 'waitlist', meta: e.locale || '' })),
      demos: demos.map((d) => ({ email: d.email, source: 'demo', meta: `${d.name} · ${d.companyName}` })),
    }
  } catch (e) {
    return { error: e?.message }
  }
}

export default async function EmailPage() {
  const data = await loadAudience()
  if (data.error) {
    return (
      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">ADMIN · EMAIL</div>
          <h1 className="lf-h1 medium">Backend not reachable.</h1>
          <p className="lf-lede">{data.error}</p>
        </div>
      </section>
    )
  }
  const combined = [...data.waitlist, ...data.demos]
  return (
    <section className="lf-page">
      <div className="container" style={{ maxWidth: 920 }}>
        <div className="lf-eyebrow">ADMIN · EMAIL</div>
        <h1 className="lf-h1 medium">Send.</h1>
        <p className="lf-lede">
          Single recipient or broadcast to the entire waitlist. Every send is recorded in the audit log on the overview
          page.
        </p>
        <EmailForm recipients={combined} waitlistSize={data.waitlist.length} />
      </div>
    </section>
  )
}
