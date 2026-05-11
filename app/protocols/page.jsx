import Link from 'next/link'
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import { pageMetadata, breadcrumbSchema } from '../seo'

export const metadata = pageMetadata({
  title: 'Protocols — Natural language to SCPI · Labflow',
  description:
    'Author lab protocols in plain English. Labflow compiles them into typed instrument graphs (SCPI / VISA / IVI), validates against your bench safety policy, runs the bench, and signs a manifest you can replay byte-for-byte three years later.',
  path: '/protocols',
  keywords: [
    'natural language SCPI',
    'protocol DSL',
    'SCPI compiler',
    'lab protocol automation',
    'reproducible measurement',
    'signed lab manifest',
    'transfer curve protocol',
    'PSRR sweep protocol',
  ],
})

const breadcrumb = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Protocols', path: '/protocols' },
])

const stages = [
  {
    n: '01',
    h: 'Brief',
    p: 'Describe the experiment the way you would to a grad student. Constraints, sweeps, dwell, abort conditions — natural language is enough.',
    code: '"Sweep VGS from 0 to 3.2 V on K2400.CH1, settle 50 ms, log Id, stop if Id > 10 mA."',
  },
  {
    n: '02',
    h: 'Compile',
    p: 'Labflow lifts the brief into a typed protocol — an instrument graph, with explicit channels, units, settle times and abort predicates.',
    code: 'protocol pmos_transfer { sweep(K2400.CH1, V, 0, 3.2, 204, dwell=50ms) capture(Id) abort(Id > 10mA) }',
  },
  {
    n: '03',
    h: 'Validate',
    p: 'The protocol is checked against the bench safety file. Compliance ceilings, ramp limits, dwell minimums and probe-temperature gates are evaluated before any output is enabled.',
    code: '✓ within K2400.CH1 compliance · ✓ ramp < 100 V/s · ⚠ requires operator-confirm @ VGS > 3.0',
  },
  {
    n: '04',
    h: 'Arm & run',
    p: 'The bench runs in lock-step. The agent watches the waveform, the operator watches the agent, and any policy breach pauses the run for a signature.',
    code: 'k2400.ch1 → 0..3.2V, n=204, compliance=100mA · scope.trig=rising@1.65V',
  },
  {
    n: '05',
    h: 'Replay',
    p: 'Every protocol carries a signed manifest. Same protocol + same manifest = identical SCPI, identical setpoints, identical compliance — three years from now.',
    code: 'lf replay LF-REP-4821 → matched bytes-for-bytes (SHA-256 9f2a…b4c1)',
  },
]

const libraryItems = [
  { tag: 'SMU', h: 'Transfer curve', p: 'Vth, SS, Ion, Ioff, Ion/Ioff. Parametric pass/fail with outlier flagging.' },
  { tag: 'SMU', h: 'Output characteristic', p: 'Id(Vds) at stepped Vgs. Saturates the family on one chart.' },
  {
    tag: 'PSU + SCOPE',
    h: 'PSRR sweep',
    p: 'Frequency-domain rejection, dB and linear views, with annotation at unity-gain crossover.',
  },
  {
    tag: 'FG + SCOPE',
    h: 'Step response',
    p: 'Edge speed, overshoot, settling, ringing. Auto-fits rise / fall with R².',
  },
  {
    tag: 'PSU + DMM',
    h: 'Burn-in 24h',
    p: 'Datalogged temperature, drift, current creep. Auto-resumes after lost-link.',
  },
  { tag: 'SCOPE', h: 'Jitter histogram', p: 'TIE, period, cycle-cycle. p99 / p99.9 callouts with eye overlay.' },
  { tag: 'DMM', h: '4W resistance map', p: 'Pad-by-pad 4-wire characterization on a contact array.' },
  {
    tag: 'DAQ',
    h: 'Climate run',
    p: 'Multi-channel temp / RH log with event annotations from the chamber controller.',
  },
]

const safety = [
  { h: 'Per-channel ceilings', p: 'V, I, ramp-rate, dwell. Defined once per bench, inherited by every protocol.' },
  { h: 'Operator-confirm gates', p: 'Any setpoint above the policy threshold pauses for a signature.' },
  {
    h: 'Auto-shutdown predicates',
    p: 'Compliance hit, probe-temp breach, runaway current — clean ramp-down without waiting for a human.',
  },
  { h: 'Signed manifests', p: 'Every run hashes its protocol + setpoints + driver versions. Replay is provable.' },
]

export default function ProtocolsPage() {
  return (
    <div className="lf-root">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">SECTION · LF-PROTO</div>
            <div className="cell">DSL · TYPED</div>
            <div className="cell">CTRL · SCPI / VISA / IVI</div>
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              SIGNED · SHA-256
            </div>
          </div>
          <div className="lf-eyebrow">04 / PROTOCOLS</div>
          <h1 className="lf-h1">Plain English in. Calibrated measurements out.</h1>
          <p className="lf-lede">
            A Labflow protocol is the contract between you, the agent and the bench. Authored in natural language,
            compiled into a typed instrument graph, validated against your safety policy, and signed for replay.
          </p>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">PIPELINE</div>
          <h2 className="lf-h2">From brief to bytes.</h2>

          <div style={{ marginTop: 24, display: 'grid', gap: 18 }}>
            {stages.map((s) => (
              <div
                key={s.n}
                data-mobile-stack="true"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr 1.3fr',
                  border: '1px solid var(--line)',
                  background: 'var(--bg)',
                }}>
                <div
                  style={{
                    padding: '22px 18px',
                    borderRight: '1px solid var(--line)',
                    background: 'var(--bg-2)',
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: 11,
                    letterSpacing: '.14em',
                    color: 'var(--orange)',
                  }}>
                  STAGE / {s.n}
                </div>
                <div style={{ padding: '22px 22px', borderRight: '1px solid var(--line)' }}>
                  <h3 className="lf-h3">{s.h}</h3>
                  <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.6 }}>{s.p}</p>
                </div>
                <div
                  className="mono"
                  style={{
                    padding: '22px 22px',
                    background: 'var(--panel-2)',
                    color: '#e8e8e4',
                    fontSize: 12,
                    lineHeight: 1.7,
                    overflow: 'hidden',
                  }}>
                  <div style={{ color: 'var(--orange)', fontSize: 10, letterSpacing: '.14em', marginBottom: 8 }}>
                    EXAMPLE
                  </div>
                  {s.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="lf-eyebrow">LIBRARY</div>
          <h2 className="lf-h2">Pre-flight protocols.</h2>
          <p className="lf-lede" style={{ maxWidth: '60ch' }}>
            Battle-tested protocols shipped with Labflow. Fork one, tune it for your DUT, and check it back in — the
            agent honors your version.
          </p>

          <div className="lf-grid-2" style={{ marginTop: 24 }}>
            {libraryItems.map((p) => (
              <div key={p.h} className="lf-card">
                <div
                  className="mono upp"
                  style={{ fontSize: 10, color: 'var(--orange)', letterSpacing: '.14em', marginBottom: 14 }}>
                  {p.tag}
                </div>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="lf-eyebrow">SAFETY POLICY</div>
          <h2 className="lf-h2">The policy file is the floor.</h2>
          <p className="lf-lede" style={{ maxWidth: '60ch' }}>
            Every protocol inherits from a per-bench policy file. The agent literally cannot ask for more than the
            policy allows.
          </p>

          <div className="lf-grid-2" style={{ marginTop: 24 }}>
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
          <div className="lf-grid-2">
            <div className="lf-card-orange lf-card">
              <h3>Author a protocol with the agent.</h3>
              <p>
                FLOW will draft the typed protocol with you, line by line, and walk through every safety hook before you
                check it in.
              </p>
              <div style={{ marginTop: 18 }}>
                <Link className="btn" href="/request-demo" style={{ borderColor: '#fff', color: '#fff' }}>
                  Pair on one <span className="arr">→</span>
                </Link>
              </div>
            </div>
            <div className="lf-card">
              <h3>Read the schema.</h3>
              <p>
                The full protocol DSL — fields, units, predicates, abort conditions, manifest hashing — lives in the
                docs.
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
