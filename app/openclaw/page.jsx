import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import Link from 'next/link'

const siteUrl = 'https://aivalanche.com'
const pageUrl = `${siteUrl}/openclaw`

export const metadata = {
  title: 'OpenClaw Integration | Labflow',
  description:
    'OpenClaw is the integration layer that wires Labflow agents to Slack, Teams, WhatsApp, CRM and ticketing — turning chat tasks into instrument-driven workflows.',
  keywords: [
    'openclaw',
    'openclaw integration',
    'labflow openclaw',
    'agent chat integration',
    'lab workflow automation',
  ],
  alternates: {
    canonical: '/openclaw',
  },
  openGraph: {
    title: 'OpenClaw Integration | Labflow',
    description: 'OpenClaw connects chat and business tools to Labflow agentic instrument control.',
    url: pageUrl,
    type: 'website',
  },
}

const useCases = [
  {
    title: 'Support &amp; ops',
    body: 'Funnel bench requests from Slack / Teams straight into ticket updates, instrument health checks, and automated callbacks.',
  },
  {
    title: 'Sales &amp; CRM',
    body: 'Link demo bookings, follow-ups, and CRM updates into one workflow the agent can run unattended.',
  },
  {
    title: 'Marketing',
    body: 'Surface multi-tool campaign signals into the team chat with reports the agent generates after each pulse.',
  },
  {
    title: 'Engineering',
    body: 'Connect issues, repos and deployments so the agent can run repeatable rigs against every release candidate.',
  },
]

export default function OpenClawPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'OpenClaw Integration for Labflow agents',
        description:
          'OpenClaw wires chat channels and enterprise tools to the Labflow agent, turning written intent into executed instrument workflows.',
        inLanguage: 'en-US',
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is OpenClaw?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'OpenClaw is the integration layer that connects Labflow agents to chat channels and enterprise systems so tasks can flow from a written message into instrument-level execution.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is OpenClaw suitable for regulated labs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. OpenClaw is used by teams with GDPR and SOC-2 expectations and integrates with existing approval and audit processes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which tools can OpenClaw connect to?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Slack, Microsoft Teams, WhatsApp, plus CRM, ticketing and analytics systems. Missing surfaces can be added as bespoke connectors.',
            },
          },
        ],
      },
    ],
  }

  return (
    <div className="lf-root">
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">PRODUCT · LF-INT</div>
            <div className="cell">LAYER · CHAT / CRM / TICKETING</div>
            <div className="cell" />
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              42 CONNECTORS · 11 SURFACES
            </div>
          </div>
          <div className="lf-eyebrow">OPENCLAW / INTEGRATION LAYER</div>
          <h1 className="lf-h1 medium">OpenClaw connects every surface to the bench.</h1>
          <p className="lf-lede">
            OpenClaw is the integration layer for Labflow. It links your chat channels with the enterprise tools your
            team already runs, and forwards intent straight into actionable instrument steps.
          </p>
          <Link
            href="/request-demo"
            className="btn orange"
            style={{ display: 'inline-flex', height: 44, marginTop: 8 }}>
            Book an OpenClaw demo <span className="arr">→</span>
          </Link>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">WHY OPENCLAW</div>
          <h2 className="lf-h2">Why teams pick OpenClaw to operationalise their agent.</h2>
          <p className="lf-lede">
            Most teams don&apos;t want a new dashboard — they want the agent to live where the work already happens.
            OpenClaw turns Slack, Teams, WhatsApp, CRM and ticketing into first-class agent surfaces.
          </p>

          <div className="lf-grid-3" style={{ marginTop: 12 }}>
            <div>
              <h3 className="lf-h3">Chat-native execution</h3>
              <p style={{ color: 'var(--ink-2)' }}>
                Move tasks from Slack, Teams or WhatsApp straight into bench execution — no copy-paste, no orphan
                tickets.
              </p>
            </div>
            <div>
              <h3 className="lf-h3">Unified workflow</h3>
              <p style={{ color: 'var(--ink-2)' }}>
                CRM, ticketing, analytics and internal APIs all stitch into the same agent loop, with one transcript.
              </p>
            </div>
            <div>
              <h3 className="lf-h3">Audited &amp; sovereign</h3>
              <p style={{ color: 'var(--ink-2)' }}>
                Built for teams with DSGVO, SOC-2 and on-prem expectations. Every action is signed and dual-sign-able.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="lf-eyebrow">USE CASES</div>
          <h2 className="lf-h2">Typical OpenClaw workflows.</h2>
          <div className="lf-grid-2" style={{ marginTop: 12 }}>
            {useCases.map((uc) => (
              <div key={uc.title}>
                <h3 className="lf-h3" dangerouslySetInnerHTML={{ __html: uc.title }} />
                <p style={{ color: 'var(--ink-2)' }} dangerouslySetInnerHTML={{ __html: uc.body }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="lf-eyebrow" style={{ justifyContent: 'center' }}>
            DEMO
          </div>
          <h2 className="lf-h2" style={{ maxWidth: '20ch', margin: '0 auto 14px' }}>
            See OpenClaw running against your stack.
          </h2>
          <p className="lf-lede" style={{ margin: '0 auto 24px' }}>
            We show you in 20 minutes how OpenClaw wires Labflow into your existing chat, CRM and ticketing tools.
          </p>
          <Link
            href="/request-demo"
            className="btn orange"
            style={{ display: 'inline-flex', height: 48 }}>
            Request an OpenClaw demo <span className="arr">→</span>
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Footer />
    </div>
  )
}
