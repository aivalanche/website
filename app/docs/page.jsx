import Link from 'next/link'
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import { pageMetadata, breadcrumbSchema } from '../seo'

export const metadata = pageMetadata({
  title: 'Docs — How Labflow lands in your lab · Labflow',
  description:
    'How Labflow is deployed in an enterprise lab. Bench audit, pilot bench, safety policy, operator training, org rollout. Deployment modes (managed cloud, VPC, self-hosted, air-gapped), security & compliance (SOC-2, SSO, SCIM, audit log), and the protocol DSL / SCPI cookbook / SDK your team gets after rollout.',
  path: '/docs',
  keywords: [
    'Labflow deployment',
    'enterprise lab automation',
    'air-gapped lab AI',
    'self-hosted lab automation',
    'lab SSO',
    'SCPI cookbook',
    'lab automation rollout',
    'GxP lab software',
  ],
})

const breadcrumb = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Docs', path: '/docs' },
])

const quickStart = [
  {
    n: '01',
    h: 'Book a 20-minute call',
    p: 'Tell us what bench you run. We confirm transports (GPIB / USBTMC / LAN / Serial) and the instruments we already have drivers for.',
  },
  {
    n: '02',
    h: 'We provision your workspace',
    p: 'A Labflow engineer prepares a sandbox tuned to your instruments. No agent code runs on your bench until you say so.',
  },
  {
    n: '03',
    h: 'We pair on your bench',
    p: 'Screen-share with a Labflow engineer. We connect to one instrument, validate the safety policy, and dictate a sweep together.',
  },
  {
    n: '04',
    h: 'You walk away with a signed report',
    p: 'A reproducible session manifest, a PDF lab notebook, and a path to rolling Labflow out to the rest of the bay.',
  },
]

const sections = [
  {
    eyebrow: 'DEPLOYMENT',
    title: 'How Labflow lands in your lab',
    rows: [
      {
        h: 'Bench audit',
        p: 'A Labflow engineer maps your instruments, transports and adapters, and flags anything we need to validate before pilot.',
        tag: 'week 1',
      },
      {
        h: 'Pilot bench',
        p: 'We deploy Labflow on one bench, paired with one operator. Limited scope, full audit trail.',
        tag: 'week 1',
      },
      {
        h: 'Safety policy',
        p: 'Per-channel ceilings, operator-confirm gates and auto-shutdown predicates — authored with you, signed off by your safety officer.',
        tag: 'safety',
      },
      {
        h: 'Operator training',
        p: 'A 60-minute walkthrough plus a recorded pair on a real run. New operators are productive the same day.',
        tag: 'training',
      },
      {
        h: 'Org rollout',
        p: 'Bay-by-bay rollout with SSO, org-wide safety policy and audit-log integration. Driven by our solutions engineer.',
        tag: 'week 2-4',
      },
    ],
  },
  {
    eyebrow: 'DEPLOYMENT MODES',
    title: 'Where Labflow can run',
    rows: [
      {
        h: 'Managed cloud',
        p: 'We host the control plane; a thin agent talks to your bench over your network. Fastest path to pilot.',
        tag: 'cloud',
      },
      {
        h: 'VPC-isolated',
        p: 'Control plane inside your VPC, no traffic leaves your network perimeter. mTLS end to end.',
        tag: 'vpc',
      },
      {
        h: 'Self-hosted',
        p: 'Full control plane on hardware you operate. Kubernetes or single-node, your choice.',
        tag: 'on-prem',
      },
      {
        h: 'Air-gapped',
        p: 'No outbound network. On-device agent (flow-s) handles tool-calling locally. Common in defense and regulated labs.',
        tag: 'air-gap',
      },
    ],
  },
  {
    eyebrow: 'WHAT YOUR TEAM GETS',
    title: 'After rollout',
    rows: [
      {
        h: 'Protocol DSL',
        p: 'A typed language for the bench — sweeps, captures, measurements, aborts and signed manifests. Authored in plain English with the agent.',
        tag: 'dsl',
      },
      {
        h: 'SCPI cookbook',
        p: 'Per-instrument recipes covering the common bench routines (transfer curves, PSRR sweeps, step responses, burn-ins).',
        tag: 'cookbook',
      },
      {
        h: 'Python SDK',
        p: 'Typed client for notebooks and integration scripts. Plays nicely with PyVISA-based workflows you already have.',
        tag: 'sdk',
      },
      {
        h: 'REST + webhooks',
        p: 'Drive sessions and subscribe to events from your LIMS, MES or ticketing system. OpenAPI 3.1 spec ships in-product.',
        tag: 'integrations',
      },
      {
        h: 'OpenTelemetry export',
        p: 'Traces, metrics and logs piped to your collector — with the hardware events attached.',
        tag: 'observability',
      },
    ],
  },
  {
    eyebrow: 'SECURITY & COMPLIANCE',
    title: 'What your security team will ask',
    rows: [
      {
        h: 'SOC-2 Type II',
        p: 'In progress. Audit collateral and bridge letter available under NDA on request.',
        tag: 'audit',
      },
      {
        h: 'SSO & SCIM',
        p: 'SAML 2.0 and OIDC for SSO, SCIM 2.0 for provisioning. Lab and Enterprise tiers.',
        tag: 'identity',
      },
      {
        h: 'Audit log',
        p: 'Every SCPI line, every approval, every retry — timestamped and exportable.',
        tag: 'audit',
      },
      {
        h: 'Data residency',
        p: 'EU and US regions available. Customer data never leaves the chosen region.',
        tag: 'residency',
      },
      {
        h: '21 CFR Part 11 / GxP',
        p: 'Reach out — we have customers in regulated environments and can share our validation collateral.',
        tag: 'regulated',
      },
    ],
  },
]

export default function DocsPage() {
  return (
    <div className="lf-root">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">SECTION · LF-DOC</div>
            <div className="cell">VERSION · v4.2.1</div>
            <div className="cell">PROTOCOL · SCPI / VISA</div>
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              UPDATED · 2026-05-08
            </div>
          </div>
          <div className="lf-eyebrow">05 / DOCS</div>
          <h1 className="lf-h1">How Labflow lands in your lab.</h1>
          <p className="lf-lede">
            Labflow is an enterprise rollout, not a download. This page walks through how the deployment actually works
            — from the first call to a signed report on your bench — and the reference your team gets once you&apos;re
            live. The fastest path to evaluating it is to call us.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
            <Link className="btn solid" href="/request-demo">
              Book a discovery call <span className="arr">→</span>
            </Link>
            <Link className="btn" href="/contact">
              Talk to engineering
            </Link>
          </div>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">QUICKSTART</div>
          <h2 className="lf-h2">Five minutes to first sweep.</h2>
          <p className="lf-lede" style={{ maxWidth: '60ch' }}>
            Labflow is a guided enterprise rollout, not a curl-pipe-to-shell. A real engineer pairs with you on the
            first sweep — from booking the call to a signed report is under a week.
          </p>

          <div
            style={{
              marginTop: 24,
              border: '1px solid var(--ink)',
              background: 'var(--panel-2)',
              color: '#e8e8e4',
            }}>
            {quickStart.map((q, i) => (
              <div
                key={q.n}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 1.6fr',
                  borderTop: i === 0 ? '0' : '1px solid #2a2a28',
                  alignItems: 'stretch',
                }}>
                <div
                  className="mono"
                  style={{
                    padding: '20px 18px',
                    color: 'var(--orange)',
                    fontSize: 12,
                    letterSpacing: '.14em',
                    borderRight: '1px solid #2a2a28',
                  }}>
                  {q.n}
                </div>
                <div
                  style={{
                    padding: '20px 18px',
                    borderRight: '1px solid #2a2a28',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 16,
                    letterSpacing: '-.005em',
                    textTransform: 'uppercase',
                  }}>
                  {q.h}
                </div>
                <div
                  style={{
                    padding: '20px 22px',
                    color: '#cfcfca',
                    fontSize: 13.5,
                    lineHeight: 1.6,
                  }}>
                  {q.p}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn solid" href="/request-demo">
              Book the call <span className="arr">→</span>
            </Link>
            <Link className="btn" href="/contact">
              Talk to engineering
            </Link>
          </div>
        </div>
      </section>

      {sections.map((sec, idx) => (
        <section
          key={sec.title}
          className="lf-page"
          style={{
            borderTop: '1px solid var(--line)',
            background: idx % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)',
          }}>
          <div className="container">
            <div className="lf-eyebrow">{sec.eyebrow}</div>
            <h2 className="lf-h2">{sec.title}</h2>

            <div className="lf-row-list" style={{ marginTop: 24 }}>
              {sec.rows.map((r) => (
                <div key={r.h}>
                  <div>
                    <h3>{r.h}</h3>
                    <p>{r.p}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span
                      className="mono upp"
                      style={{
                        fontSize: 10,
                        color: 'var(--ink-2)',
                        letterSpacing: '.14em',
                        border: '1px solid var(--line)',
                        padding: '4px 8px',
                      }}>
                      {r.tag}
                    </span>
                    <Link href="/contact">Ask us →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="lf-grid-3">
            <div className="lf-card">
              <h3>Driver matrix</h3>
              <p>42 drivers across 11 vendors. We confirm which of yours are covered on the discovery call.</p>
              <div style={{ marginTop: 18 }}>
                <Link className="btn" href="/instruments">
                  See drivers
                </Link>
              </div>
            </div>
            <div className="lf-card">
              <h3>Protocol library</h3>
              <p>
                Battle-tested protocols Labflow ships with — transfer curves, PSRR sweeps, step responses, burn-ins.
              </p>
              <div style={{ marginTop: 18 }}>
                <Link className="btn" href="/protocols">
                  See protocols
                </Link>
              </div>
            </div>
            <div className="lf-card-orange lf-card">
              <h3>Ready to evaluate?</h3>
              <p>
                Labflow is an enterprise rollout. The fastest way to test it on your bench is to call us — we&apos;ll
                pair on a real instrument inside a week.
              </p>
              <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link className="btn" href="/request-demo" style={{ borderColor: '#fff', color: '#fff' }}>
                  Book the call <span className="arr">→</span>
                </Link>
                <Link className="btn" href="/contact" style={{ borderColor: '#fff', color: '#fff' }}>
                  Email us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
