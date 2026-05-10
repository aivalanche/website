import Link from 'next/link'
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

export const metadata = {
  title: 'Pricing — Labflow',
  description:
    'Labflow pricing — Bench (free in beta), Lab and Enterprise. Bring your own instruments, only pay for the agent runtime your bench actually uses.',
}

const tiers = [
  {
    n: '01',
    name: 'Bench',
    price: 'Free',
    sub: 'while we&apos;re in beta',
    blurb: 'For a single bench. Everything you need to author, run and report on real instruments.',
    items: [
      '1 bench, up to 6 instruments',
      '1 operator seat',
      'All 42 drivers, all transports',
      'Natural-language protocols',
      'Signed reports — PDF / HTML / MD',
      'Community support',
    ],
    cta: 'Start free',
    href: '/request-demo',
    accent: false,
  },
  {
    n: '02',
    name: 'Lab',
    price: '$640',
    sub: 'per bench / month · billed annually',
    blurb: 'For teams running multiple benches in parallel. SSO, audit, and the policy enforcement legal expects.',
    items: [
      'Unlimited benches and instruments',
      'Up to 25 operator seats',
      'SSO (SAML / OIDC), SCIM provisioning',
      'Org-wide safety policy file',
      'Audit log + OpenTelemetry export',
      'Priority support · 1 biz-day',
    ],
    cta: 'Request demo',
    href: '/request-demo',
    accent: true,
  },
  {
    n: '03',
    name: 'Enterprise',
    price: 'Custom',
    sub: 'air-gapped or hybrid',
    blurb: 'For regulated and air-gapped labs. Self-hosted control plane, on-device agent, custom driver SLAs.',
    items: [
      'Self-hosted or VPC-isolated',
      'On-device agent (flow-s) for air-gap',
      'Custom drivers within 1 week',
      'SOC-2 / 21 CFR Part 11 collateral',
      'Named solutions architect',
      '24×7 support · 1-hour response',
    ],
    cta: 'Talk to sales',
    href: '/contact',
    accent: false,
  },
]

const matrix = [
  ['Discovery (GPIB / USBTMC / LAN / Serial)', '✓', '✓', '✓'],
  ['All 42 drivers, all vendors', '✓', '✓', '✓'],
  ['Natural-language protocols', '✓', '✓', '✓'],
  ['Signed reports', '✓', '✓', '✓'],
  ['Multiple benches in parallel', '—', '✓', '✓'],
  ['SSO + SCIM', '—', '✓', '✓'],
  ['Org-wide safety policy', '—', '✓', '✓'],
  ['Audit log + OpenTelemetry', '—', '✓', '✓'],
  ['Self-hosted control plane', '—', '—', '✓'],
  ['Air-gapped on-device agent', '—', '—', '✓'],
  ['Custom drivers · 1-week SLA', '—', '—', '✓'],
  ['24×7 support', '—', '—', '✓'],
]

const faq = [
  {
    q: 'Do you charge per instrument?',
    a: 'No. Pricing is per bench, not per instrument. Plug in as many SMUs, scopes or supplies as one operator can stand behind.',
  },
  {
    q: 'What counts as a bench?',
    a: 'A bench is a physical workstation with one operator at a time. If two people are running protocols simultaneously, that&apos;s two benches.',
  },
  {
    q: 'Is the agent runtime metered?',
    a: 'On the Bench tier it&apos;s capped at 1,000 agent-minutes per month. On Lab and Enterprise it&apos;s unmetered.',
  },
  {
    q: 'Can I bring my own model?',
    a: 'On Enterprise, yes. You can route the planner to Claude, Anthropic-hosted, OpenAI, or your own on-prem inference. Tool-calling stays in Labflow.',
  },
  {
    q: 'What happens to my data?',
    a: 'It stays in your control plane. We don&apos;t train on customer data, and on Enterprise the inference can be fully on-device.',
  },
  {
    q: 'Is there a free trial of Lab / Enterprise?',
    a: 'Yes — 14 days, with a hands-on walkthrough from a real engineer. Book a slot from the demo page.',
  },
]

export default function PricingPage() {
  return (
    <div className="lf-root">
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">SECTION · LF-PRICE</div>
            <div className="cell">BILLING · USD / EUR</div>
            <div className="cell">BETA · FREE BENCH</div>
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              SOC-2 · IN PROGRESS
            </div>
          </div>
          <div className="lf-eyebrow">06 / PRICING</div>
          <h1 className="lf-h1">Pay for the bench, not the byte.</h1>
          <p className="lf-lede">
            Bring your own instruments. Free while we&apos;re in beta for a single bench. Scale up to org-wide policy,
            SSO and self-hosting when you need them — not before.
          </p>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 0,
              borderTop: '1px solid var(--line)',
              borderLeft: '1px solid var(--line)',
            }}>
            {tiers.map((t) => (
              <div
                key={t.n}
                style={{
                  background: t.accent ? 'var(--ink)' : 'var(--bg)',
                  color: t.accent ? '#fff' : 'var(--ink)',
                  borderRight: '1px solid var(--line)',
                  borderBottom: '1px solid var(--line)',
                  padding: '28px 28px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  position: 'relative',
                }}>
                {t.accent && (
                  <span
                    className="mono upp"
                    style={{
                      position: 'absolute',
                      top: -1,
                      right: -1,
                      background: 'var(--orange)',
                      color: '#fff',
                      fontSize: 10,
                      padding: '4px 10px',
                      letterSpacing: '.14em',
                    }}>
                    POPULAR
                  </span>
                )}
                <div
                  className="mono upp"
                  style={{ fontSize: 10, color: t.accent ? 'var(--orange)' : 'var(--ink-2)', letterSpacing: '.14em' }}>
                  TIER · {t.n}
                </div>
                <h3
                  style={{
                    fontSize: 32,
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '-.01em',
                    fontWeight: 800,
                  }}>
                  {t.name}
                </h3>
                <div>
                  <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-.03em' }}>{t.price}</span>
                  <div
                    className="mono upp"
                    style={{
                      fontSize: 10,
                      letterSpacing: '.12em',
                      color: t.accent ? '#a5a5a0' : 'var(--ink-2)',
                      marginTop: 4,
                    }}
                    dangerouslySetInnerHTML={{ __html: t.sub }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: t.accent ? '#cfcfca' : 'var(--ink-2)',
                  }}>
                  {t.blurb}
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}>
                  {t.items.map((it) => (
                    <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5 }}>
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          background: 'var(--orange)',
                          display: 'inline-block',
                          marginTop: 6,
                          flexShrink: 0,
                        }}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 'auto', paddingTop: 12 }}>
                  <Link className={t.accent ? 'btn orange' : 'btn solid'} href={t.href} style={t.accent ? {} : {}}>
                    {t.cta} <span className="arr">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="lf-eyebrow">FEATURE MATRIX</div>
          <h2 className="lf-h2">What ships in each tier.</h2>

          <div style={{ marginTop: 24, border: '1px solid var(--line)', background: 'var(--bg)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                borderBottom: '1px solid var(--line)',
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: 10,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--ink-2)',
              }}>
              <div style={{ padding: '14px 18px' }}>Capability</div>
              <div style={{ padding: '14px 18px', borderLeft: '1px solid var(--line)', textAlign: 'center' }}>
                Bench
              </div>
              <div
                style={{
                  padding: '14px 18px',
                  borderLeft: '1px solid var(--line)',
                  textAlign: 'center',
                  color: 'var(--orange)',
                }}>
                Lab
              </div>
              <div style={{ padding: '14px 18px', borderLeft: '1px solid var(--line)', textAlign: 'center' }}>
                Enterprise
              </div>
            </div>
            {matrix.map(([cap, a, b, c]) => (
              <div
                key={cap}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  borderBottom: '1px solid var(--line)',
                  fontSize: 13.5,
                }}>
                <div style={{ padding: '14px 18px' }}>{cap}</div>
                <div
                  style={{
                    padding: '14px 18px',
                    borderLeft: '1px solid var(--line)',
                    textAlign: 'center',
                    color: a === '✓' ? 'var(--good)' : 'var(--ink-3)',
                  }}>
                  {a}
                </div>
                <div
                  style={{
                    padding: '14px 18px',
                    borderLeft: '1px solid var(--line)',
                    textAlign: 'center',
                    color: b === '✓' ? 'var(--good)' : 'var(--ink-3)',
                  }}>
                  {b}
                </div>
                <div
                  style={{
                    padding: '14px 18px',
                    borderLeft: '1px solid var(--line)',
                    textAlign: 'center',
                    color: c === '✓' ? 'var(--good)' : 'var(--ink-3)',
                  }}>
                  {c}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="lf-eyebrow">FAQ</div>
          <h2 className="lf-h2">Pricing, plainly.</h2>

          <div className="lf-grid-2" style={{ marginTop: 24 }}>
            {faq.map((f) => (
              <div key={f.q} className="lf-card">
                <h3>{f.q}</h3>
                <p dangerouslySetInnerHTML={{ __html: f.a }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
