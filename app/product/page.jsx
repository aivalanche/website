import Link from 'next/link'
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import { pageMetadata, breadcrumbSchema } from '../seo'

export const metadata = pageMetadata({
  title: 'Product — The AI agent for your lab bench · Labflow',
  description:
    'Labflow is one console for the whole bench. Natural-language protocols compiled to SCPI, multi-instrument choreography across SMU, scope, function generator and supply, human-in-the-loop safety, and signed reports.',
  path: '/product',
  keywords: [
    'AI lab control plane',
    'agentic test and measurement',
    'natural language SCPI',
    'instrument console',
    'AI bench automation',
    'Labflow product',
  ],
})

const breadcrumb = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Product', path: '/product' },
])

const pillars = [
  {
    n: '01',
    h: 'One console for the whole bench',
    p: 'SMUs, scopes, function generators, supplies, DMMs and DAQs — discovered, paired, and driven from a single workspace.',
  },
  {
    n: '02',
    h: 'Talk to the instrument',
    p: 'Describe the experiment in plain English. Labflow compiles intent into SCPI, validates against safety limits, and shows you what it intends to send.',
  },
  {
    n: '03',
    h: 'Live waveform reasoning',
    p: 'The agent watches the trace as it captures. Ringing, clipping, drift, oscillation — flagged in prose with the matching segment of the waveform.',
  },
  {
    n: '04',
    h: 'Human-in-the-loop policy',
    p: 'Hard caps on current, voltage, ramp rate and dwell. Anything above your policy threshold pauses for dual-sign approval, with a full session audit trail.',
  },
  {
    n: '05',
    h: 'Reproducible by default',
    p: 'Every run emits a signed manifest. Re-run it three years later, identically — same SCPI, same compliance, same trigger.',
  },
  {
    n: '06',
    h: 'Lab-notebook reports',
    p: 'Publication-ready PDF, HTML, Markdown or LaTeX. Plots, prose, transcript and provenance — written the moment the sweep ends.',
  },
]

const consoleParts = [
  {
    label: 'CONSOLE / 01',
    h: 'Bench rail',
    p: 'Live tree of every connected instrument with status LED, transport (GPIB/USBTMC/LAN/Serial), and last-seen calibration.',
  },
  {
    label: 'CONSOLE / 02',
    h: 'KPI strip',
    p: 'Drain current, Vpp, stimulus, sweep progress — refreshed at instrument cadence, not at browser cadence.',
  },
  {
    label: 'CONSOLE / 03',
    h: 'Scope view',
    p: 'Channels, dividers, cursors and triggers. Side-by-side with the agent so observations and waveforms share one timeline.',
  },
  {
    label: 'CONSOLE / 04',
    h: 'SMU table',
    p: 'Source mode, setpoint, measured, compliance — all four channels at a glance, with sweep state inline.',
  },
  {
    label: 'CONSOLE / 05',
    h: 'Safety panel',
    p: 'Bench-wide ceilings, probe temperature, operator-confirm gates, auto-shutdown — armed and visible at all times.',
  },
  {
    label: 'CONSOLE / 06',
    h: 'Agent stream',
    p: 'Every message, plan step, tool call and observation in a single auditable feed. Reply, redirect, or hand control back.',
  },
]

const compareRows = [
  ['Discovery', 'Manual VISA strings', 'Auto-scan GPIB / USBTMC / LAN / Serial'],
  ['Authoring', 'Vendor GUI clicking, brittle Python', 'Natural language → SCPI, version-controlled protocols'],
  ['Observation', 'Eyeball the trace, screenshot to Slack', 'Live agent observations, in-line on the waveform'],
  ['Safety', 'A sticky note above the bench', 'Policy file, dual-sign, hardware auto-shutdown'],
  ['Reporting', 'Word doc, day later, missing context', 'Signed PDF/HTML/Markdown, written when the run ends'],
  ['Reproducibility', '"I think it was the 2400 on CH1"', 'Signed manifest replays the run identically'],
]

export default function ProductPage() {
  return (
    <div className="lf-root">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">SECTION · LF-PROD</div>
            <div className="cell">CLASS · AGENTIC-04</div>
            <div className="cell" />
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              READ · 04:10
            </div>
          </div>
          <div className="lf-eyebrow">01 / PRODUCT</div>
          <h1 className="lf-h1">The agentic control plane for the bench.</h1>
          <p className="lf-lede">
            Labflow turns &quot;run a transfer curve from 0 to 3.2 V, settle 50 ms, stop above 10 mA&quot; into a
            calibrated measurement, a watched waveform, and a signed lab report — without trading away an inch of safety
            or reproducibility.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn solid" href="/request-demo">
              Open console <span className="arr">→</span>
            </Link>
            <Link className="btn" href="/instruments">
              See supported instruments
            </Link>
          </div>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">02 / WHAT&apos;S IN THE BOX</div>
          <h2 className="lf-h2">Six pillars. One console.</h2>
          <p className="lf-lede" style={{ maxWidth: '60ch' }}>
            Each pillar is a real surface in the product, not a deck slide. The same primitives drive a transfer curve,
            a PSRR sweep, or a 24-hour burn-in.
          </p>

          <div className="lf-grid-3" style={{ marginTop: 24 }}>
            {pillars.map((p) => (
              <div key={p.n} className="lf-card">
                <div
                  className="mono upp"
                  style={{ fontSize: 10, color: 'var(--orange)', letterSpacing: '.14em', marginBottom: 14 }}>
                  PILLAR · {p.n}
                </div>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="lf-eyebrow">03 / CONSOLE</div>
          <h2 className="lf-h2">Anatomy of the console.</h2>
          <p className="lf-lede" style={{ maxWidth: '60ch' }}>
            Three columns, one truth. Instruments on the left, work in the middle, agent on the right — and a status
            strip telling you exactly what the bench is doing this second.
          </p>

          <div className="lf-grid-3" style={{ marginTop: 24 }}>
            {consoleParts.map((c) => (
              <div key={c.label} className="lf-card">
                <div
                  className="mono upp"
                  style={{ fontSize: 10, color: 'var(--ink-2)', letterSpacing: '.14em', marginBottom: 14 }}>
                  {c.label}
                </div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="lf-eyebrow">04 / WHY LABFLOW</div>
          <h2 className="lf-h2">Before / after the agent.</h2>

          <div style={{ marginTop: 24, border: '1px solid var(--line)', background: 'var(--bg)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1.2fr 1.4fr',
                borderBottom: '1px solid var(--line)',
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: 10,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--ink-2)',
              }}>
              <div style={{ padding: '14px 18px' }}>Surface</div>
              <div style={{ padding: '14px 18px', borderLeft: '1px solid var(--line)' }}>Bench, today</div>
              <div style={{ padding: '14px 18px', borderLeft: '1px solid var(--line)', color: 'var(--orange)' }}>
                Bench, with Labflow
              </div>
            </div>
            {compareRows.map(([k, before, after]) => (
              <div
                key={k}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 1.2fr 1.4fr',
                  borderBottom: '1px solid var(--line)',
                  fontSize: 14,
                }}>
                <div
                  style={{ padding: '16px 18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em' }}>
                  {k}
                </div>
                <div style={{ padding: '16px 18px', borderLeft: '1px solid var(--line)', color: 'var(--ink-2)' }}>
                  {before}
                </div>
                <div style={{ padding: '16px 18px', borderLeft: '1px solid var(--line)' }}>{after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="lf-grid-2">
            <div className="lf-card-orange lf-card">
              <h3>Try it on your bench.</h3>
              <p>
                One-week guided trial, free, on a single bench. Bring your own instruments — we&apos;ll auto-discover
                anything on GPIB, USBTMC or your subnet and an engineer pairs with you on the first sweep.
              </p>
              <div style={{ marginTop: 18 }}>
                <Link className="btn" href="/request-demo" style={{ borderColor: '#fff', color: '#fff' }}>
                  Request a demo <span className="arr">→</span>
                </Link>
              </div>
            </div>
            <div className="lf-card">
              <h3>Read the docs first.</h3>
              <p>
                Quickstart, SCPI cookbook, driver matrix and the protocol DSL — everything we wish we&apos;d had three
                labs ago.
              </p>
              <div style={{ marginTop: 18 }}>
                <Link className="btn" href="/docs">
                  Open the docs
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
