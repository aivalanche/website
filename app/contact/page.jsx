import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import Link from 'next/link'

export const metadata = {
  title: 'Contact | Labflow',
  description:
    'Reach the Labflow team for evaluation, integration support, or operator training across your electronics lab.',
  keywords: ['contact labflow', 'electronics lab automation contact', 'instrument control support'],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | Labflow',
    description: 'Talk to Labflow about putting agentic control on your bench.',
    url: 'https://aivalanche.com/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="lf-root">
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">CONTACT · LF-CTX</div>
            <div className="cell">REPLY · WITHIN 1 BIZ-DAY</div>
            <div className="cell" />
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              SUPPORT · OPS@LABFLOW
            </div>
          </div>
          <div className="lf-eyebrow">08 / CONTACT</div>
          <h1 className="lf-h1 medium">Talk to the bench team.</h1>
          <p className="lf-lede">
            Evaluating Labflow for your lab? Need help wiring up a specific SMU, scope, or DAQ? The team that builds the
            drivers answers the email — usually within a working day.
          </p>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div className="lf-grid-3">
            <div>
              <h3 className="lf-h3">Sales &amp; evaluation</h3>
              <p style={{ color: 'var(--ink-2)', margin: '0 0 12px' }}>
                Walkthroughs, pilots, and procurement questions.
              </p>
              <a
                href="mailto:hello@aivalanche.com"
                className="mono upp"
                style={{ color: 'var(--orange)', fontSize: 12, letterSpacing: '.1em' }}>
                hello@aivalanche.com →
              </a>
            </div>
            <div>
              <h3 className="lf-h3">Support &amp; drivers</h3>
              <p style={{ color: 'var(--ink-2)', margin: '0 0 12px' }}>
                New instrument requests, SCPI quirks, integrations.
              </p>
              <a
                href="mailto:support@aivalanche.de"
                className="mono upp"
                style={{ color: 'var(--orange)', fontSize: 12, letterSpacing: '.1em' }}>
                support@aivalanche.de →
              </a>
            </div>
            <div>
              <h3 className="lf-h3">Book a walkthrough</h3>
              <p style={{ color: 'var(--ink-2)', margin: '0 0 12px' }}>
                See your hardware driven by the agent in 20 minutes.
              </p>
              <Link
                href="/request-demo"
                className="mono upp"
                style={{ color: 'var(--orange)', fontSize: 12, letterSpacing: '.1em' }}>
                Request a demo →
              </Link>
            </div>
          </div>

          <div style={{ marginTop: 56 }}>
            <div className="lf-eyebrow">CHANNELS</div>
            <ul className="lf-row-list" style={{ borderTop: '1px solid var(--line)' }}>
              <li>
                <div>
                  <h3>Direct email</h3>
                  <p>Hits the engineering inbox.</p>
                </div>
                <a href="mailto:hello@aivalanche.com">hello@aivalanche.com</a>
              </li>
              <li>
                <div>
                  <h3>Operations &amp; security</h3>
                  <p>SOC-2, data residency, deployment.</p>
                </div>
                <a href="mailto:support@aivalanche.de">support@aivalanche.de</a>
              </li>
              <li>
                <div>
                  <h3>Press &amp; partnerships</h3>
                  <p>Vendor integrations, lab partnerships.</p>
                </div>
                <a href="mailto:hello@aivalanche.com">hello@aivalanche.com</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
