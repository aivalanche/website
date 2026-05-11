import Link from 'next/link'
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import { pageMetadata, breadcrumbSchema } from '../seo'

export const metadata = pageMetadata({
  title: 'Docs — Quickstart, SCPI cookbook, driver matrix · Labflow',
  description:
    'Labflow documentation for engineers. Five-minute quickstart, SCPI recipes for Keithley 2400 / Tektronix MSO64 / Rigol DG1022Z / R&S NGE100 / NI USB-6363, the protocol DSL, Python SDK, CLI reference, REST API, webhooks, OpenTelemetry.',
  path: '/docs',
  keywords: [
    'Labflow docs',
    'SCPI cookbook',
    'PyVISA recipes',
    'Keithley 2400 Python',
    'Tektronix MSO64 automation',
    'Rigol DG1022Z SCPI',
    'NI USB-6363 streaming',
    'lab automation API',
  ],
})

const breadcrumb = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Docs', path: '/docs' },
])

const quickStart = [
  { n: '01', h: 'Install the CLI', code: 'curl -fsSL https://labflow.io/install | sh' },
  { n: '02', h: 'Discover the bench', code: 'lf discover --gpib --usbtmc --lan' },
  { n: '03', h: 'Open the console', code: 'lf console --bench bay-04' },
  { n: '04', h: 'Brief the agent', code: '> sweep VGS 0..3.2 V on K2400.CH1, capture Id' },
]

const sections = [
  {
    eyebrow: 'GUIDES',
    title: 'Getting started',
    rows: [
      { h: 'Quickstart', p: 'Install, discover, run your first protocol in under 5 minutes.', tag: '5 min' },
      {
        h: 'Install on Linux / macOS / Windows',
        p: 'CLI install, optional NI-VISA bridge, GPIB adapters.',
        tag: 'setup',
      },
      {
        h: 'Connect your first instrument',
        p: 'GPIB address negotiation, USBTMC auto-mount, LAN mDNS discovery.',
        tag: 'setup',
      },
      {
        h: 'Write your bench policy',
        p: 'Per-channel ceilings, operator-confirm gates, auto-shutdown predicates.',
        tag: 'safety',
      },
      {
        h: 'Author your first protocol',
        p: 'Brief, compile, validate, run. End-to-end example with a Keithley 2400.',
        tag: '15 min',
      },
    ],
  },
  {
    eyebrow: 'REFERENCE',
    title: 'Protocol DSL',
    rows: [
      { h: 'sweep()', p: 'Linear and log sweeps, per-point dwell, abort predicates.', tag: 'dsl' },
      { h: 'capture()', p: 'Acquisition primitives for scopes, SMUs, DAQs. Returns waveform + timebase.', tag: 'dsl' },
      { h: 'measure()', p: 'Vpp, RMS, frequency, duty, rise/fall, overshoot, jitter.', tag: 'dsl' },
      { h: 'abort()', p: 'Run-time predicates that halt the bench cleanly.', tag: 'dsl' },
      { h: 'manifest{}', p: 'How protocols are hashed, signed and replayed.', tag: 'dsl' },
    ],
  },
  {
    eyebrow: 'COOKBOOK',
    title: 'SCPI recipes',
    rows: [
      {
        h: 'Keithley 2400 transfer curves',
        p: '4-quadrant source-V/measure-I sweeps with compliance handling.',
        tag: 'SMU',
      },
      {
        h: 'Tektronix MSO64 edge triggers',
        p: 'Edge, pulse, runt, window — and how to recover from a missed trigger.',
        tag: 'scope',
      },
      {
        h: 'Rigol DG1022Z arbitrary waveforms',
        p: 'Uploading arb sequences and pairing to a scope trigger.',
        tag: 'fg',
      },
      {
        h: 'R&S NGE100 multi-rail sequencing',
        p: 'Ordered rail-up with inter-rail delays and current monitoring.',
        tag: 'psu',
      },
      { h: 'NI USB-6363 streamed acquisition', p: 'Backpressure-safe streaming into a session buffer.', tag: 'daq' },
    ],
  },
  {
    eyebrow: 'API',
    title: 'Programmatic interface',
    rows: [
      {
        h: 'Python SDK',
        p: 'pip install labflow — typed client, async-native, plays well with notebooks.',
        tag: 'sdk',
      },
      { h: 'CLI reference', p: 'lf discover, lf run, lf replay, lf report — the full command surface.', tag: 'cli' },
      { h: 'REST API', p: 'Drive sessions over HTTP with mTLS. OpenAPI 3.1 spec ships in-product.', tag: 'rest' },
      { h: 'Webhooks', p: 'Subscribe to session events — armed, paused, completed, failed.', tag: 'events' },
      {
        h: 'OpenTelemetry',
        p: 'Traces, metrics and logs piped to your collector. Hardware events included.',
        tag: 'obs',
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
          <h1 className="lf-h1">The bench manual you wish you&apos;d had.</h1>
          <p className="lf-lede">
            Quickstarts, the SCPI cookbook, the protocol DSL, and a reference for every driver Labflow ships. Authored
            by humans who actually plug instruments in.
          </p>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">QUICKSTART</div>
          <h2 className="lf-h2">Five minutes to first sweep.</h2>

          <div
            style={{
              marginTop: 24,
              border: '1px solid var(--ink)',
              background: 'var(--panel-2)',
              color: '#e8e8e4',
              fontFamily: 'var(--font-jetbrains-mono)',
            }}>
            {quickStart.map((q, i) => (
              <div
                key={q.n}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 1.4fr',
                  borderTop: i === 0 ? '0' : '1px solid #2a2a28',
                  alignItems: 'center',
                }}>
                <div
                  style={{
                    padding: '18px 18px',
                    color: 'var(--orange)',
                    fontSize: 12,
                    letterSpacing: '.14em',
                    borderRight: '1px solid #2a2a28',
                  }}>
                  {q.n}
                </div>
                <div style={{ padding: '18px 18px', borderRight: '1px solid #2a2a28', color: '#fff', fontWeight: 600 }}>
                  {q.h}
                </div>
                <div style={{ padding: '18px 18px', color: '#cfcfca', fontSize: 13 }}>
                  <span style={{ color: 'var(--orange)' }}>$ </span>
                  {q.code}
                </div>
              </div>
            ))}
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
                    <Link href="/docs">Open →</Link>
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
              <p>42 drivers across 11 vendors. Filter by transport, conformance, and capability.</p>
              <div style={{ marginTop: 18 }}>
                <Link className="btn" href="/instruments">
                  Open matrix
                </Link>
              </div>
            </div>
            <div className="lf-card">
              <h3>Protocol library</h3>
              <p>Pre-flight protocols you can fork — transfer curves, PSRR sweeps, burn-ins, step responses.</p>
              <div style={{ marginTop: 18 }}>
                <Link className="btn" href="/protocols">
                  Open library
                </Link>
              </div>
            </div>
            <div className="lf-card-orange lf-card">
              <h3>Stuck?</h3>
              <p>The fastest way to learn Labflow is to watch it run on your bench. We&apos;ll pair for 20 minutes.</p>
              <div style={{ marginTop: 18 }}>
                <Link className="btn" href="/request-demo" style={{ borderColor: '#fff', color: '#fff' }}>
                  Book a session <span className="arr">→</span>
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
