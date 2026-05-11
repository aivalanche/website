import Link from 'next/link'
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import { pageMetadata, breadcrumbSchema } from '../seo'

export const metadata = pageMetadata({
  title: 'Agents — Meet FLOW, the AI agent for your bench · Labflow',
  description:
    'FLOW is the Labflow lab agent. It plans the sweep, validates the safety policy, drives the instruments, watches the waveform, flags anomalies, and writes the lab report — with human signatures on every dangerous step. Tool-calling architecture; SCPI / VISA / IVI underneath.',
  path: '/agents',
  keywords: [
    'AI agent for oscilloscope',
    'AI agent for SMU',
    'AI agent for lab bench',
    'tool-calling lab agent',
    'agentic lab automation',
    'Labflow FLOW agent',
  ],
})

const breadcrumb = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Agents', path: '/agents' },
])

const agentLoop = [
  {
    n: '01',
    h: 'Parse intent',
    p: 'Plain-English brief → typed protocol. Constraints, sweeps, dwell, abort conditions, target metrics — all extracted before a single byte hits the wire.',
  },
  {
    n: '02',
    h: 'Plan the bench',
    p: 'FLOW builds an instrument graph, picks transports, and proposes SCPI. You see the plan and the SCPI before it arms anything.',
  },
  {
    n: '03',
    h: 'Validate policy',
    p: 'Every step is checked against the bench safety file — compliance ceilings, ramp limits, dwell minimums, probe-temperature gates.',
  },
  {
    n: '04',
    h: 'Arm & run',
    p: 'Drivers source, stimulate and capture in lock-step. Transient errors are retried; persistent ones surface as observations, not silent fails.',
  },
  {
    n: '05',
    h: 'Observe & flag',
    p: 'FLOW watches the captured trace as it builds. Threshold inflections, oscillation, outliers — flagged in prose with the corresponding waveform segment.',
  },
  {
    n: '06',
    h: 'Hand back',
    p: 'Raw samples, full transcript, plots, written summary, and a signed manifest. Replayable identically, three years from now.',
  },
]

const tools = [
  { name: 'smu.source_v()', d: 'Source a DC voltage with explicit compliance. Returns measured I.' },
  { name: 'smu.sweep_v()', d: 'Linear or log sweep, per-point dwell, per-step abort predicate.' },
  { name: 'scope.capture()', d: 'Acquire on edge / pulse / runt / window trigger. Returns waveform array + timebase.' },
  { name: 'scope.measure()', d: 'Vpp, RMS, frequency, duty, rise/fall, overshoot — over the acquired window.' },
  { name: 'fg.set_waveform()', d: 'Sine, square, ramp, pulse, arb. Amplitude, offset, phase, modulation envelope.' },
  { name: 'psu.read()', d: 'Per-rail V, I, ripple, regulation status. Honors per-rail clamps before output enable.' },
  { name: 'dmm.read()', d: 'TRMS V/I, R 2W/4W, frequency, capacitance. Integration time configurable.' },
  { name: 'daq.log()', d: 'Streamed acquisition into a session-scoped buffer. Backpressure-aware.' },
  {
    name: 'safety.check()',
    d: 'Re-evaluate the policy file against current setpoints. Blocks the run on a violation.',
  },
  { name: 'report.emit()', d: 'Compose the lab notebook — plots, prose, transcript, manifest. Signs the run.' },
]

const safety = [
  {
    h: 'Hard caps',
    p: 'Per-channel ceilings on V, I, ramp-rate and dwell. Enforced at the driver, not in a prompt. The agent literally cannot ask for more.',
  },
  {
    h: 'Dual-sign approvals',
    p: 'Above your policy threshold (default 6 V or 100 mA), the agent pauses for an operator signature before arming.',
  },
  {
    h: 'Auto-shutdown',
    p: 'Probe-temperature, compliance-hit, lost-link or runaway-current triggers a clean ramp-down — without waiting for a human.',
  },
  {
    h: 'Audit trail',
    p: 'Every SCPI line, every approval, every retry, every replan — timestamped and stamped into the session manifest.',
  },
  {
    h: 'Sandbox mode',
    p: 'Dry-run the entire protocol against a virtual bench. The agent emits the SCPI it would have sent and the data it would have expected.',
  },
  {
    h: 'Operator override',
    p: 'A single keystroke from the operator suspends the agent, freezes setpoints, and returns control. The bench is yours, always.',
  },
]

const models = [
  { name: 'flow-l', d: 'The default. Best plans, longest context, best at multi-instrument choreography.' },
  { name: 'flow-m', d: 'Faster, cheaper. Great for routine sweeps and well-trodden protocols.' },
  { name: 'flow-s', d: 'On-device option for air-gapped labs. Tool-calling only, no autonomous planning.' },
]

export default function AgentsPage() {
  return (
    <div className="lf-root">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">SECTION · LF-AGT</div>
            <div className="cell">AGENT · FLOW</div>
            <div className="cell">TOOLS · 26</div>
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              POLICY · DUAL-SIGN
            </div>
          </div>
          <div className="lf-eyebrow">03 / AGENTS</div>
          <h1 className="lf-h1">Meet FLOW.</h1>
          <p className="lf-lede">
            FLOW is the lab agent. It plans the sweep, validates the policy, drives the instruments, watches the trace,
            flags the anomalies, and writes the lab notebook — with a human signature on every dangerous step.
          </p>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">THE LOOP</div>
          <h2 className="lf-h2">Six steps. One pass.</h2>

          <div className="lf-grid-3" style={{ marginTop: 24 }}>
            {agentLoop.map((s) => (
              <div key={s.n} className="lf-card">
                <div
                  className="mono upp"
                  style={{ fontSize: 10, color: 'var(--orange)', letterSpacing: '.14em', marginBottom: 14 }}>
                  STEP · {s.n}
                </div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="lf-eyebrow">TOOLBELT</div>
          <h2 className="lf-h2">The tools the agent can pick up.</h2>
          <p className="lf-lede" style={{ maxWidth: '60ch' }}>
            Every action FLOW takes goes through a typed tool with a hard schema. No free-form code execution, no SCPI
            string injection — the tool layer is the gate.
          </p>

          <div
            style={{
              marginTop: 24,
              border: '1px solid var(--line)',
              background: 'var(--bg)',
              fontFamily: 'var(--font-jetbrains-mono)',
            }}>
            {tools.map((t, i) => (
              <div
                key={t.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '280px 1fr',
                  borderTop: i === 0 ? '0' : '1px solid var(--line)',
                  fontSize: 13,
                  lineHeight: 1.5,
                }}>
                <div style={{ padding: '14px 18px', color: 'var(--orange)', borderRight: '1px solid var(--line)' }}>
                  {t.name}
                </div>
                <div style={{ padding: '14px 18px', color: 'var(--ink-2)' }}>{t.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="lf-eyebrow">SAFETY</div>
          <h2 className="lf-h2">Human-in-the-loop, on by default.</h2>

          <div className="lf-grid-3" style={{ marginTop: 24 }}>
            {safety.map((s) => (
              <div key={s.h} className="lf-card">
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="lf-eyebrow">MODELS</div>
          <h2 className="lf-h2">Pick the agent for the run.</h2>

          <div className="lf-grid-3" style={{ marginTop: 24 }}>
            {models.map((m) => (
              <div key={m.name} className="lf-card">
                <div
                  className="mono upp"
                  style={{ fontSize: 10, color: 'var(--orange)', letterSpacing: '.14em', marginBottom: 14 }}>
                  MODEL
                </div>
                <h3 style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>{m.name}</h3>
                <p>{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="lf-grid-2">
            <div className="lf-card-orange lf-card">
              <h3>See FLOW drive your bench.</h3>
              <p>
                A 20-minute walkthrough on real instruments — yours or ours. We&apos;ll run a transfer curve, an LDO
                PSRR sweep, or whatever your day demands.
              </p>
              <div style={{ marginTop: 18 }}>
                <Link className="btn" href="/request-demo" style={{ borderColor: '#fff', color: '#fff' }}>
                  Book a demo <span className="arr">→</span>
                </Link>
              </div>
            </div>
            <div className="lf-card">
              <h3>Read the protocol DSL.</h3>
              <p>
                FLOW reads natural language but emits a typed protocol. See the schema, the safety hooks, and how to
                author one yourself.
              </p>
              <div style={{ marginTop: 18 }}>
                <Link className="btn" href="/protocols">
                  Open protocols
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
