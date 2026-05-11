import Link from 'next/link'
import WaitlistEmailForm from '@/components/labflow/WaitlistEmailForm'
import { faqSchema } from './faq-schema'
import { productSchema } from './product-schema'

const homeTitle = 'Labflow — The AI agent that talks to your lab instruments'
const homeDescription =
  'Talk to your benchtop. Labflow is the AI agent for electronic test & measurement — drive oscilloscopes, source-measure units (Keithley, Keysight), function generators, power supplies, DMMs and DAQs with natural language. SCPI and VISA underneath, human-in-the-loop safety on top, signed reports out the other side.'

export const metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: '/' },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: 'https://aivalanche.com/',
    type: 'website',
    images: [
      {
        url: '/images/labflow-control-diagram-generated.webp',
        width: 1200,
        height: 630,
        alt: 'Labflow agent driving SMUs, scopes, function generators and supplies from one console',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: homeDescription,
    images: ['/images/labflow-control-diagram-generated.webp'],
  },
}

const navItems = [
  { label: 'Product', href: '/product', has: true },
  { label: 'Instruments', href: '/instruments', has: true },
  { label: 'Agents', href: '/agents', has: false },
  { label: 'Protocols', href: '/protocols', has: false },
  { label: 'Docs', href: '/docs', has: true },
  { label: 'Pricing', href: '/pricing', has: false },
  { label: 'Changelog', href: '/changelog', has: false },
]

const marqueeItems = [
  'KEITHLEY 2400 SMU',
  'KEYSIGHT DSOX1204G',
  'RIGOL DG1022Z FUNCTION GEN',
  'TEKTRONIX MSO64',
  'R&S NGE100 SUPPLY',
  'FLUKE 8846A DMM',
  'NI USB-6363 DAQ',
  'SIGLENT SDG2042X',
  'HP 34401A',
]

const capabilities = [
  {
    n: '01',
    ico: '⌖',
    title: 'Natural-language protocols',
    body: '"Run a transfer curve from −2V to 2V, settle 50ms per point, stop if Id exceeds 10mA." Labflow parses intent, validates against bench limits, and only then arms the instrument.',
  },
  {
    n: '02',
    ico: '⌥',
    title: 'SCPI & VISA, fluent',
    body: 'Drivers for Keysight, Tektronix, Keithley, R&S, Rigol, Siglent, Fluke and NI. GPIB, USBTMC, LAN, serial. No more brittle vendor GUIs glued together with .csv.',
  },
  {
    n: '03',
    ico: '⌘',
    title: 'Multi-instrument choreography',
    body: 'Source, stimulate, measure, capture — coordinated across SMU, function generator, scope and PSU in a single loop the agent can plan, run, and revise.',
  },
  {
    n: '04',
    ico: '◐',
    title: 'Human-in-the-loop safety',
    body: 'Hard caps on current, voltage, ramp rate and dwell. Anything above your policy threshold pauses for dual-sign approval, with full audit trail per session.',
  },
  {
    n: '05',
    ico: '≋',
    title: 'Live waveform reasoning',
    body: 'The agent watches the trace it just captured. Ringing, clipping, drift, oscillation — flagged in plain English with the matching segment of the waveform.',
  },
  {
    n: '06',
    ico: '⎙',
    title: 'Beautiful, reproducible reports',
    body: 'Every sweep emits a publication-ready report — title page, plots, written summary, agent transcript, signed manifest. PDF, HTML, Markdown, LaTeX. Re-run a session three years later, identically.',
  },
]

const workflowSteps = [
  {
    n: '01',
    title: 'Describe',
    body: "Type the experiment the way you'd brief a grad student. Constraints, sweeps, abort conditions — natural language is enough.",
  },
  {
    n: '02',
    title: 'Compile',
    body: "Labflow plans an instrument graph, validates it against your bench's safety policy, and shows the SCPI it intends to send before sending it.",
  },
  {
    n: '03',
    title: 'Run & observe',
    body: 'Agents drive the instruments, watch the data live, retry transient faults, and pause for you when policy demands a human signature.',
  },
  {
    n: '04',
    title: 'Hand back',
    body: 'You receive raw samples, a transcript of every tool call, plots, a written summary, and a reproducible session manifest.',
  },
]

const reportFeatures = [
  {
    h: 'AUTO-WRITTEN PROSE',
    p: 'Plain-English findings the agent stands behind.',
    s: '"Threshold at VGS = 1.42 V; subthreshold slope 78 mV/dec; one outlier at point 137 flagged for re-run."',
  },
  {
    h: 'PUBLICATION-READY PLOTS',
    p: 'Vector charts with grids, ticks, units, captions.',
    s: 'SVG & PDF. Drop straight into a thesis, datasheet, or design review.',
  },
  {
    h: 'FULL AUDIT TRAIL',
    p: 'Every SCPI line, every approval, every retry.',
    s: 'Reproducible in one click. Three years from now, the run reruns identically.',
  },
  {
    h: 'BRAND-AWARE TEMPLATES',
    p: "Your lab's header, your logo, your signature block.",
    s: 'Markdown, LaTeX, or the Labflow brutalist house style (shown).',
  },
]

const orangeSq = (
  <span
    style={{
      display: 'inline-block',
      width: 8,
      height: 8,
      background: 'var(--orange)',
      marginRight: 8,
      verticalAlign: 'middle',
    }}
  />
)

function SectionHead({ num, label, title, right }) {
  return (
    <div className="section-head" style={{ paddingTop: 0 }}>
      <div className="label col-2 upp">
        {orangeSq}
        {num} / {label}
      </div>
      <h2 className="title col-7" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="right col-3 upp" dangerouslySetInnerHTML={{ __html: right }} />
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="lf-root">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      {/* Top utility bar */}
      <div className="utility">
        <div className="row mono upp container">
          <span>
            <span className="sq" />
            LABFLOW / SYSTEMS ONLINE
          </span>
          <span className="grow" />
          <span>SESSION ID · LF-23421-U8-FWD</span>
          <span>·</span>
          <span>
            <span className="blink" />3 INSTRUMENTS CONNECTED
          </span>
          <span>·</span>
          <span>BENCH · BAY 04</span>
          <span>·</span>
          <span>v4.2.1</span>
        </div>
      </div>

      {/* Nav */}
      <div className="container">
        <nav className="top">
          <div className="brand">
            <div className="mark" />
            LABFLOW
            <span style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500, marginLeft: -6 }}>®</span>
          </div>
          <ul>
            {navItems.map((item) => (
              <li key={item.label} className={item.has ? 'has' : ''}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div style={{ flex: 1 }} />
          <div className="nav-cta">
            <Link className="btn" href="/request-demo">
              Sign in
            </Link>
            <Link className="btn solid" href="/request-demo">
              Open console <span className="arr">→</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="meta-row mono upp">
            <div className="cell col-3">
              <span className="sq" />
              AUTONOMOUS LAB OPERATIONS
            </div>
            <div className="cell col-3">
              <span className="sq" />
              RUNTIME CLASS · AGENTIC-04
            </div>
            <div className="cell col-3" />
            <div className="cell col-3" style={{ justifyContent: 'flex-end' }}>
              PROTOCOL CTRL · SCPI / VISA / IVI
            </div>
          </div>

          <div className="h1-row">
            <h1>
              <span className="stack">Talk to your</span>
              <span className="stack">benchtop.</span>
            </h1>
            <div className="r-tag">
              <span className="big">
                / Agentic control plane
                <br />
                for electronic test &amp; measurement.
              </span>
              <span className="barcode" />
              <span className="reg">®</span>
              <div style={{ marginTop: 14 }} className="mono upp">
                USA / EU · BUILT FOR THE BENCH
              </div>
            </div>
          </div>

          <div className="third-row">
            <div className="col-6">
              <span className="tag-orange upp">Built to run the experiment, not just the instrument</span>
              <div
                style={{
                  marginTop: 22,
                  fontSize: 22,
                  lineHeight: 1.2,
                  letterSpacing: '-.01em',
                  fontWeight: 600,
                  maxWidth: '18ch',
                }}>
                SYSTEM INDEX / TEST &amp; MEASUREMENT DIVISION.
              </div>
            </div>
            <div className="col-3" style={{ gridColumn: 'span 3' }}>
              <div className="body-mono">
                Labflow operates at the intersection of laboratory instrumentation and large-model reasoning. One
                agentic interface drives source-measure units, oscilloscopes, function generators, DAQs and supplies —
                wired by tools, governed by humans.
                <span className="stars">****************************************</span>
              </div>
            </div>
            <div className="col-3" style={{ gridColumn: 'span 3' }}>
              <div className="body-mono">
                Define an experiment in plain language. Labflow translates intent into SCPI, sweeps the bench, watches
                the waveforms, flags anomalies, and writes the report.
                <span className="mono" style={{ display: 'block', marginTop: 10, color: 'var(--ink-2)' }}>
                  V.04 · LF-OPS
                </span>
              </div>
            </div>
          </div>

          <div className="bottom-row mono upp">
            <div className="cell col-4">
              <span
                className="sq"
                style={{ background: 'var(--orange)', width: 8, height: 8, display: 'inline-block' }}
              />
              <span className="slashes">{'//// AGENT-DRIVEN INSTRUMENTATION'}</span>
            </div>
            <div className="cell col-4">
              <span className="chev">&gt;&gt;&gt;&gt;&gt;</span>
              <span>HUMAN-IN-THE-LOOP · SAFETY-CLAMPED</span>
            </div>
            <div className="cell col-4" style={{ justifyContent: 'flex-end' }}>
              ARCHIVE REF · LF-OPS-23421-U8-FWD
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`}>
              <span className="dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* DASHBOARD */}
      <div className="dash-wrap">
        <div className="container">
          <div className="section-head">
            <div className="label col-2 upp">{orangeSq}02 / CONSOLE</div>
            <h2 className="title col-7">
              One bench. One agent. <br />
              One window of glass.
            </h2>
            <div className="right col-3 upp">
              LIVE PREVIEW · SHOWING BAY-04 SESSION
              <br />
              STATUS · ACTIVE MONITORING
            </div>
          </div>

          <div className="dash">
            <div className="titlebar">
              <span className="dot r" />
              <span className="dot y" />
              <span className="dot g" />
              <span className="path">labflow › bay-04 › session #4821 · pmos-svtest</span>
              <span className="grow" />
              <span className="stat">● AGENT RUNNING</span>
              <span style={{ color: '#a5a5a0' }}>·</span>
              <span style={{ color: '#a5a5a0' }}>CPU 12%</span>
              <span style={{ color: '#a5a5a0' }}>·</span>
              <span style={{ color: '#a5a5a0' }}>EVENTS 412</span>
            </div>

            <div className="dgrid">
              {/* LEFT RAIL */}
              <aside className="rail">
                <div className="group">Bay 04 · Instruments</div>
                <ul>
                  <li className="active">
                    <span className="led on" />
                    <span className="name">SMU · K2400</span>
                    <span className="id">GPIB::24</span>
                  </li>
                  <li>
                    <span className="led on" />
                    <span className="name">Scope · MSO64</span>
                    <span className="id">USB::0x9B</span>
                  </li>
                  <li>
                    <span className="led on" />
                    <span className="name">Func Gen · DG1022</span>
                    <span className="id">LAN::.41</span>
                  </li>
                  <li>
                    <span className="led warn" />
                    <span className="name">PSU · NGE103B</span>
                    <span className="id">LAN::.18</span>
                  </li>
                  <li>
                    <span className="led off" />
                    <span className="name">DMM · 34401A</span>
                    <span className="id">GPIB::22</span>
                  </li>
                  <li>
                    <span className="led off" />
                    <span className="name">DAQ · USB-6363</span>
                    <span className="id">USB::6363</span>
                  </li>
                </ul>
                <div className="group" style={{ marginTop: 14 }}>
                  Workspace
                </div>
                <ul>
                  <li>
                    <span className="led on" />
                    <span className="name">Protocols</span>
                  </li>
                  <li>
                    <span className="led on" />
                    <span className="name">Datasets · 412</span>
                  </li>
                  <li>
                    <span className="led on" />
                    <span className="name">Reports</span>
                  </li>
                  <li>
                    <span className="led on" />
                    <span className="name">Agents · 3</span>
                  </li>
                  <li>
                    <span className="led off" />
                    <span className="name">Safety rules</span>
                  </li>
                </ul>
                <div className="group" style={{ marginTop: 14 }}>
                  Session
                </div>
                <ul>
                  <li>
                    <span className="led on" />
                    <span className="name">#4821 PMOS Svt</span>
                  </li>
                  <li>
                    <span className="led off" />
                    <span className="name">#4820 Step-load</span>
                  </li>
                  <li>
                    <span className="led off" />
                    <span className="name">#4819 PSRR sweep</span>
                  </li>
                </ul>
              </aside>

              {/* CENTER */}
              <section className="center">
                {/* KPI row */}
                <div className="row1">
                  <div className="kpi">
                    <span className="tag">SMU · CH1</span>
                    <div className="l">Drain current</div>
                    <div className="v">
                      12.84<span className="u">mA</span>
                    </div>
                    <div className="d up">▲ 0.31 mA · within band</div>
                  </div>
                  <div className="kpi">
                    <span className="tag">SCOPE</span>
                    <div className="l">Vpp · CH2</div>
                    <div className="v">
                      3.302<span className="u">V</span>
                    </div>
                    <div className="d">σ 0.4 mV · 4k samples</div>
                  </div>
                  <div className="kpi">
                    <span className="tag">FG · A</span>
                    <div className="l">Stimulus</div>
                    <div className="v">
                      10.000<span className="u">kHz</span>
                    </div>
                    <div className="d">SIN · 50% duty</div>
                  </div>
                  <div className="kpi">
                    <span className="tag" style={{ color: '#28c840' }}>
                      RUN
                    </span>
                    <div className="l">Sweep progress</div>
                    <div className="v">
                      68<span className="u">%</span>
                    </div>
                    <div className="d">eta 02:14 · 138/204 pts</div>
                  </div>
                </div>

                {/* Scope */}
                <div className="scope">
                  <div className="head">
                    <span className="name upp">OSCILLOSCOPE · CH1 / CH2</span>
                    <span className="chip">2.5GS/s</span>
                    <span className="chip">200µs/div</span>
                    <span className="chip">DC · 1MΩ</span>
                    <span className="grow" />
                    <span className="chip live">● LIVE</span>
                  </div>
                  <svg viewBox="0 0 800 200" preserveAspectRatio="none">
                    <defs>
                      <pattern id="lf-grid" width="40" height="20" patternUnits="userSpaceOnUse">
                        <path d="M40 0 H0 V20" fill="none" stroke="#1c1c1a" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="800" height="200" fill="#0a0a09" />
                    <rect width="800" height="200" fill="url(#lf-grid)" />
                    <line x1="0" y1="100" x2="800" y2="100" stroke="#262624" strokeWidth="1" />
                    <line x1="400" y1="0" x2="400" y2="200" stroke="#262624" strokeWidth="1" />
                    <path
                      d="M0 100 Q 25 30, 50 100 T 100 100 T 150 100 T 200 100 T 250 100 T 300 100 T 350 100 T 400 100 T 450 100 T 500 100 T 550 100 T 600 100 T 650 100 T 700 100 T 750 100 T 800 100"
                      fill="none"
                      stroke="#28c840"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M0 110 C 30 50, 60 170, 90 110 S 150 50, 180 110 S 240 170, 270 110 S 330 60, 360 110 S 420 160, 450 110 S 510 50, 540 110 S 600 170, 630 110 S 690 60, 720 110 S 780 160, 800 110"
                      fill="none"
                      stroke="#ff4d12"
                      strokeWidth="1.5"
                    />
                    <line x1="200" y1="0" x2="200" y2="200" stroke="#ff4d12" strokeDasharray="3 3" opacity=".5" />
                    <text x="206" y="14" fill="#ff4d12" fontSize="9" fontFamily="JetBrains Mono">
                      T1 · TRIG
                    </text>
                    <text x="6" y="14" fill="#7a7a76" fontSize="9" fontFamily="JetBrains Mono">
                      5V/div
                    </text>
                    <text x="6" y="194" fill="#7a7a76" fontSize="9" fontFamily="JetBrains Mono">
                      -5V
                    </text>
                  </svg>
                  <div className="legend">
                    <span>
                      <span className="sw" style={{ background: '#28c840' }} />
                      CH1 · Vds · 1.00 V/div
                    </span>
                    <span>
                      <span className="sw" style={{ background: '#ff4d12' }} />
                      CH2 · Vgs · 500 mV/div
                    </span>
                    <span style={{ color: '#cfcfca', marginLeft: 'auto' }}>f = 9.998 kHz · Vrms = 1.168 V</span>
                  </div>
                </div>

                {/* Twin panels */}
                <div className="twin">
                  <div className="panel">
                    <h4>
                      SMU CHANNELS <span className="pill-mini">SOURCING</span>
                    </h4>
                    <table>
                      <thead>
                        <tr>
                          <th>CH</th>
                          <th>Mode</th>
                          <th>Setpoint</th>
                          <th>Measured</th>
                          <th>Compliance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span className="led" />
                            CH1
                          </td>
                          <td>V-source</td>
                          <td className="val">1.800 V</td>
                          <td className="val">1.802 V</td>
                          <td>20 mA</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="led" />
                            CH2
                          </td>
                          <td>V-source</td>
                          <td className="val">3.300 V</td>
                          <td className="val">3.299 V</td>
                          <td>100 mA</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="led warn" />
                            CH3
                          </td>
                          <td>I-source</td>
                          <td className="val">5.000 mA</td>
                          <td className="val">4.987 mA</td>
                          <td>12 V</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="led" />
                            CH4
                          </td>
                          <td>OFF</td>
                          <td>—</td>
                          <td>—</td>
                          <td>—</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="knob-row mono">
                      <span>VGS SWEEP</span>
                      <div className="bar">
                        <i />
                      </div>
                      <span>0 → 3.2V · 138/204</span>
                    </div>
                  </div>

                  <div className="panel">
                    <h4>
                      SAFETY &amp; LIMITS{' '}
                      <span className="pill-mini" style={{ background: '#28c840' }}>
                        NOMINAL
                      </span>
                    </h4>
                    <table>
                      <tbody>
                        <tr>
                          <td>Max bench current</td>
                          <td className="val">120 mA</td>
                          <td style={{ color: '#28c840' }}>62% used</td>
                        </tr>
                        <tr>
                          <td>Max rail voltage</td>
                          <td className="val">5.0 V</td>
                          <td style={{ color: '#28c840' }}>within</td>
                        </tr>
                        <tr>
                          <td>Probe temperature</td>
                          <td className="val">38.4°C</td>
                          <td style={{ color: '#28c840' }}>cool</td>
                        </tr>
                        <tr>
                          <td>Operator confirm</td>
                          <td className="val">required @ &gt;6V</td>
                          <td style={{ color: 'var(--orange)' }}>armed</td>
                        </tr>
                        <tr>
                          <td>Auto-shutdown</td>
                          <td className="val">enabled</td>
                          <td style={{ color: '#28c840' }}>ok</td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      style={{
                        fontFamily: 'var(--font-jetbrains-mono)',
                        fontSize: 10,
                        color: '#7a7a76',
                        marginTop: 10,
                        lineHeight: 1.55,
                      }}>
                      <span style={{ color: 'var(--orange)' }}>[ POLICY ]</span> Agent cannot increase compliance limits
                      without operator approval. All deltas to safety rules require dual-sign.
                    </div>
                  </div>
                </div>
              </section>

              {/* AGENT CHAT */}
              <aside className="agent">
                <div className="ahead">
                  <div className="av" />
                  <div>
                    <div className="name">FLOW · LAB AGENT</div>
                    <div className="stat">● connected · 3 tools armed</div>
                  </div>
                </div>

                <div className="stream">
                  <div className="msg user">
                    <div className="who">
                      <span>YOU · 14:02:08</span>
                      <span className="t">human</span>
                    </div>
                    Sweep VGS from 0 to 3.2V on the K2400 and capture the drain current. I want a transfer curve for
                    PMOS-A12.
                  </div>

                  <div className="msg agent">
                    <div className="who">
                      <span>FLOW · 14:02:09</span>
                      <span className="t">plan</span>
                    </div>
                    Got it. I&apos;ll run a 204-point sweep on CH1 of the K2400 with 100 mA compliance, log Id every
                    step, and plot Id(VGS). Sanity-checking the rail first.
                    <div className="step">
                      <span className="ix">01</span> verify PSU rail 3V3 within 1%
                    </div>
                    <div className="step">
                      <span className="ix">02</span> arm K2400 · V-source, 0→3.2V, 204 pts
                    </div>
                    <div className="step">
                      <span className="ix">03</span> capture Id @ each step, settle 50 ms
                    </div>
                    <div className="step">
                      <span className="ix">04</span> plot + flag threshold inflection
                    </div>
                  </div>

                  <div className="msg tool">
                    <div className="who">
                      <span>TOOL · psu.read()</span>
                      <span style={{ color: '#5a5a56' }}>✓ 38 ms</span>
                    </div>
                    <code>{'{ rail: "3V3", v: 3.301, i: 12.4mA, ripple: 1.8mVpp }'}</code>
                  </div>

                  <div className="msg tool">
                    <div className="who">
                      <span>TOOL · smu.sweep_v()</span>
                      <span style={{ color: '#5a5a56' }}>running…</span>
                    </div>
                    <code>k2400.ch1 → 0..3.2V, n=204, compliance=100mA</code>
                  </div>

                  <div className="msg agent">
                    <div className="who">
                      <span>FLOW · 14:03:41</span>
                      <span className="t">observation</span>
                    </div>
                    Threshold detected near <span style={{ color: 'var(--orange)' }}>VGS = 1.42 V</span>. Subthreshold
                    slope looks clean at ~78 mV/dec. Continuing sweep — eta 02:14.
                  </div>

                  <div className="msg user">
                    <div className="who">
                      <span>YOU · 14:03:55</span>
                      <span className="t">human</span>
                    </div>
                    Also bring up the scope and watch Vds on CH1. Trigger on rising edge.
                  </div>

                  <div className="msg agent">
                    <div className="who">
                      <span>FLOW · typing</span>
                      <span className="t">●●●</span>
                    </div>
                    Bringing up MSO64 · CH1 = Vds, 1V/div, edge trigger rising @ 1.65V…
                  </div>
                </div>

                <div className="compose">
                  <input placeholder="Ask the bench…  (⌘ K to focus)" />
                  <button className="send">↑</button>
                </div>
              </aside>
            </div>

            <div className="statusbar">
              <span>● BAY-04</span>
              <span>BUFFER 4096 / 65536</span>
              <span>SAMPLES 12,481</span>
              <span className="grow" />
              <span className="sb-orange">SAFETY · DUAL-SIGN ARMED</span>
              <span>·</span>
              <span>AGENT v4.2 · MODEL flow-l</span>
              <span>·</span>
              <span>UPTIME 04:12:38</span>
            </div>
          </div>
        </div>
      </div>

      {/* CAPABILITIES */}
      <section className="caps">
        <div className="container">
          <SectionHead
            num="03"
            label="CAPABILITIES"
            title="Plain language in.<br/>Calibrated measurements out."
            right="SECTION · LF-CAP<br/>READ TIME · 02:40"
          />
          <div className="cgrid">
            {capabilities.map((c) => (
              <div className="cap" key={c.n}>
                <div className="num">
                  <span className="sq" />
                  CAP / {c.n}
                </div>
                <div className="ico">{c.ico}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUMENTS */}
      <section className="inst">
        <div className="container">
          <div className="section-head" style={{ paddingTop: 36 }}>
            <div className="label col-2 upp">{orangeSq}04 / INSTRUMENTS</div>
            <h2 className="title col-7">A common surface for the whole bench.</h2>
            <div className="right col-3 upp">
              42 DRIVERS · 11 VENDORS
              <br />
              NEW MONTHLY
            </div>
          </div>

          <div className="igrid">
            <div className="ic">
              <div className="top">
                <span>
                  <span className="led" />
                  SMU
                </span>
                <span>K2400</span>
              </div>
              <h4>Source-Measure Units</h4>
              <div className="sub">4-quadrant · 200V / 1A</div>
              <div className="read">
                12.84<span className="u">mA</span>
              </div>
              <svg className="mini" viewBox="0 0 200 32" preserveAspectRatio="none">
                <polyline
                  points="0,28 20,22 40,18 60,12 80,9 100,7 120,8 140,6 160,5 180,4 200,3"
                  fill="none"
                  stroke="var(--orange)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="ic">
              <div className="top">
                <span>
                  <span className="led" />
                  SCOPE
                </span>
                <span>MSO64</span>
              </div>
              <h4>Oscilloscopes</h4>
              <div className="sub">8GHz · 25GS/s · 4ch</div>
              <div className="read">
                3.302<span className="u">Vpp</span>
              </div>
              <svg className="mini" viewBox="0 0 200 32" preserveAspectRatio="none">
                <path
                  d="M0 16 Q 12 2 24 16 T 48 16 T 72 16 T 96 16 T 120 16 T 144 16 T 168 16 T 192 16"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="ic">
              <div className="top">
                <span>
                  <span className="led" />
                  FG
                </span>
                <span>DG1022Z</span>
              </div>
              <h4>Function Generators</h4>
              <div className="sub">25MHz · arbitrary · 2ch</div>
              <div className="read">
                10.00<span className="u">kHz</span>
              </div>
              <svg className="mini" viewBox="0 0 200 32" preserveAspectRatio="none">
                <polyline
                  points="0,16 10,4 20,16 30,28 40,16 50,4 60,16 70,28 80,16 90,4 100,16 110,28 120,16 130,4 140,16 150,28 160,16 170,4 180,16 190,28 200,16"
                  fill="none"
                  stroke="var(--orange)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="ic">
              <div className="top">
                <span>
                  <span className="led warn" />
                  PSU
                </span>
                <span>NGE103B</span>
              </div>
              <h4>Power Supplies</h4>
              <div className="sub">3 ch · 32V / 3A</div>
              <div className="read">
                3.301<span className="u">V</span>
              </div>
              <svg className="mini" viewBox="0 0 200 32" preserveAspectRatio="none">
                <polyline
                  points="0,20 30,20 30,8 90,8 90,12 150,12 150,8 200,8"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="ic">
              <div className="top">
                <span>
                  <span className="led idle" />
                  DMM
                </span>
                <span>34401A</span>
              </div>
              <h4>Multimeters</h4>
              <div className="sub">6½-digit · TRMS</div>
              <div className="read">
                —
                <span className="u" style={{ fontSize: 11 }}>
                  {' '}
                  idle
                </span>
              </div>
              <svg className="mini" viewBox="0 0 200 32" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="200" y2="20" stroke="var(--ink-3)" strokeWidth="1" strokeDasharray="3 4" />
              </svg>
            </div>

            <div className="ic">
              <div className="top">
                <span>
                  <span className="led idle" />
                  DAQ
                </span>
                <span>USB-6363</span>
              </div>
              <h4>DAQ &amp; Loggers</h4>
              <div className="sub">32 AI · 2MS/s</div>
              <div className="read">
                —
                <span className="u" style={{ fontSize: 11 }}>
                  {' '}
                  idle
                </span>
              </div>
              <svg className="mini" viewBox="0 0 200 32" preserveAspectRatio="none">
                <polyline
                  points="0,22 12,18 24,24 36,16 48,20 60,14 72,22 84,18 96,12 108,20 120,16 132,22 144,14 156,18 168,12 180,20 192,16 200,18"
                  fill="none"
                  stroke="var(--ink-3)"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="work">
        <div className="container">
          <SectionHead
            num="05"
            label="WORKFLOW"
            title="Four steps from intent to artifact."
            right="SECTION · LF-WORK<br/>HUMAN ↔ AGENT LOOP"
          />
          <div className="stripes">
            {workflowSteps.map((s) => (
              <div className="step" key={s.n}>
                <div className="n">
                  STEP / {s.n}
                  <span className="ln" />
                </div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REPORTS */}
      <section className="reports">
        <div className="container">
          <SectionHead
            num="06"
            label="REPORTS"
            title="And it writes the<br/>report, too."
            right="SECTION · LF-REP<br/>DETERMINISTIC · SIGNED · DIFF-ABLE"
          />

          <div className="stage">
            <div className="left">
              <p className="lede">
                Beautiful reports, <span className="o">generated</span> the moment the sweep ends.
              </p>
              <p className="copy">
                When a run finishes, Labflow writes the lab notebook for you — title page, setup, calibration, plots, a
                written summary of what the agent observed, and a full transcript of every tool call. Print it, share
                the link, or diff it against last week&apos;s run.
              </p>

              <div className="feat">
                {reportFeatures.map((f) => (
                  <div key={f.h}>
                    <h5>
                      <span className="sq" />
                      {f.h}
                    </h5>
                    <p>{f.p}</p>
                    <div className="s">{f.s}</div>
                  </div>
                ))}
              </div>

              <div className="formats">
                <span className="f solid">PDF</span>
                <span className="f">HTML</span>
                <span className="f">MARKDOWN</span>
                <span className="f">LATEX</span>
                <span className="f">CSV + RAW SAMPLES</span>
                <span className="f">JUPYTER</span>
                <span className="f">SIGNED MANIFEST</span>
              </div>
            </div>

            <div className="preview">
              <div className="stamp">CERTIFIED · LF-OPS</div>

              {/* Back paper · p3 */}
              <div className="paper p3">
                <div className="pad">
                  <div className="ph">
                    <span>APPENDIX C · SWEEP MATRIX</span>
                    <span>P. 14 / 18</span>
                  </div>
                  <svg className="heat" viewBox="0 0 320 120" preserveAspectRatio="none">
                    <g fontFamily="JetBrains Mono" fontSize="7" fill="#7a7a76">
                      <text x="0" y="10">
                        VGS↓ / VDS→
                      </text>
                      <text x="60" y="10">
                        0.5
                      </text>
                      <text x="100" y="10">
                        1.0
                      </text>
                      <text x="140" y="10">
                        1.5
                      </text>
                      <text x="180" y="10">
                        2.0
                      </text>
                      <text x="220" y="10">
                        2.5
                      </text>
                      <text x="260" y="10">
                        3.0
                      </text>
                    </g>
                    <g>
                      <g>
                        <rect x="50" y="20" width="36" height="14" fill="#ffe9dc" />
                        <rect x="90" y="20" width="36" height="14" fill="#ffd2b3" />
                        <rect x="130" y="20" width="36" height="14" fill="#ffbb8a" />
                        <rect x="170" y="20" width="36" height="14" fill="#ffa460" />
                        <rect x="210" y="20" width="36" height="14" fill="#ff8c36" />
                        <rect x="250" y="20" width="36" height="14" fill="#ff4d12" />
                      </g>
                      <g>
                        <rect x="50" y="36" width="36" height="14" fill="#fff2e7" />
                        <rect x="90" y="36" width="36" height="14" fill="#ffe1c8" />
                        <rect x="130" y="36" width="36" height="14" fill="#ffc99e" />
                        <rect x="170" y="36" width="36" height="14" fill="#ffb076" />
                        <rect x="210" y="36" width="36" height="14" fill="#ff8a3a" />
                        <rect x="250" y="36" width="36" height="14" fill="#f96514" />
                      </g>
                      <g>
                        <rect x="50" y="52" width="36" height="14" fill="#fbfbf7" />
                        <rect x="90" y="52" width="36" height="14" fill="#ffeede" />
                        <rect x="130" y="52" width="36" height="14" fill="#ffd9b9" />
                        <rect x="170" y="52" width="36" height="14" fill="#ffba84" />
                        <rect x="210" y="52" width="36" height="14" fill="#ff9a52" />
                        <rect x="250" y="52" width="36" height="14" fill="#ff7322" />
                      </g>
                      <g>
                        <rect x="50" y="68" width="36" height="14" fill="#fbfbf7" />
                        <rect x="90" y="68" width="36" height="14" fill="#fbfbf7" />
                        <rect x="130" y="68" width="36" height="14" fill="#fff0e2" />
                        <rect x="170" y="68" width="36" height="14" fill="#ffdcbe" />
                        <rect x="210" y="68" width="36" height="14" fill="#ffb888" />
                        <rect x="250" y="68" width="36" height="14" fill="#ff8a3c" />
                      </g>
                      <g>
                        <rect x="50" y="84" width="36" height="14" fill="#fbfbf7" />
                        <rect x="90" y="84" width="36" height="14" fill="#fbfbf7" />
                        <rect x="130" y="84" width="36" height="14" fill="#fbfbf7" />
                        <rect x="170" y="84" width="36" height="14" fill="#ffeede" />
                        <rect x="210" y="84" width="36" height="14" fill="#ffd2b3" />
                        <rect x="250" y="84" width="36" height="14" fill="#ffac6c" />
                      </g>
                    </g>
                    <g fontFamily="JetBrains Mono" fontSize="7" fill="#7a7a76">
                      <text x="38" y="32">
                        3.2
                      </text>
                      <text x="38" y="48">
                        2.4
                      </text>
                      <text x="38" y="64">
                        1.6
                      </text>
                      <text x="38" y="80">
                        0.8
                      </text>
                      <text x="38" y="96">
                        0.0
                      </text>
                    </g>
                  </svg>
                  <div className="seq">
                    <span className="num">C</span>SWEEP MATRIX · 30 PTS · Id (mA) BINNED
                  </div>
                </div>
              </div>

              {/* Middle paper · p2 */}
              <div className="paper p2">
                <div className="pad">
                  <div className="ph">
                    <span className="brand">
                      Labflow<sup>®</sup>
                    </span>
                    <div className="right">
                      SESSION #4821 · DASHBOARD
                      <br />
                      <b>P. 02 · METRICS</b>
                    </div>
                  </div>
                  <h3 className="docttl">Headline metrics.</h3>
                  <div className="gallery">
                    <div className="tile orange">
                      <span className="t">Vth · extracted</span>
                      <span className="big">
                        1.42<span className="u">V</span>
                      </span>
                      <svg viewBox="0 0 100 36" preserveAspectRatio="none">
                        <polyline
                          points="0,30 20,28 40,22 55,12 70,6 85,4 100,3"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <div className="tile">
                      <span className="t">SS · subthreshold</span>
                      <span className="big">
                        78<span className="u">mV/dec</span>
                      </span>
                      <svg viewBox="0 0 100 36" preserveAspectRatio="none">
                        <polyline points="0,32 100,4" fill="none" stroke="#ff4d12" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div className="tile light">
                      <span className="t">Ion / Ioff ratio</span>
                      <span className="big">2.4 × 10⁶</span>
                      <svg viewBox="0 0 100 36" preserveAspectRatio="none">
                        <rect x="0" y="28" width="14" height="6" fill="#0c0c0b" />
                        <rect x="20" y="20" width="14" height="14" fill="#0c0c0b" />
                        <rect x="40" y="12" width="14" height="22" fill="#0c0c0b" />
                        <rect x="60" y="6" width="14" height="28" fill="#ff4d12" />
                        <rect x="80" y="2" width="14" height="32" fill="#0c0c0b" />
                      </svg>
                    </div>
                    <div className="tile light">
                      <span className="t">Outliers · flagged</span>
                      <span className="big">
                        1<span className="u"> / 204</span>
                      </span>
                      <svg viewBox="0 0 100 36" preserveAspectRatio="none">
                        <line x1="0" y1="18" x2="100" y2="18" stroke="#d4d4cf" strokeWidth="1" />
                        <circle cx="68" cy="6" r="3" fill="#ff4d12" />
                        <circle cx="20" cy="18" r="1.5" fill="#0c0c0b" />
                        <circle cx="40" cy="18" r="1.5" fill="#0c0c0b" />
                        <circle cx="55" cy="18" r="1.5" fill="#0c0c0b" />
                        <circle cx="80" cy="18" r="1.5" fill="#0c0c0b" />
                      </svg>
                    </div>
                  </div>
                  <div className="pfooter">
                    <span>LF-REP-4821-P02</span>
                    <span className="barc" />
                    <span>2026-05-10 14:18 UTC</span>
                  </div>
                </div>
              </div>

              {/* Front paper · p1 */}
              <div className="paper p1">
                <div className="pad">
                  <div className="ph">
                    <span className="brand">
                      Labflow<sup>®</sup> &nbsp; SESSION REPORT
                    </span>
                    <div className="right">
                      RUN ID · <b>#4821</b>
                      <br />
                      BAY-04 · 2026-05-10
                      <br />
                      P. 01 / 18
                    </div>
                  </div>

                  <h3 className="docttl">
                    PMOS-A12 <span className="o">transfer</span> curve.
                  </h3>

                  <div className="meta">
                    <div>
                      <span className="l">Operator</span>
                      <span className="v">M. Hernandez</span>
                    </div>
                    <div>
                      <span className="l">Agent</span>
                      <span className="v">flow-l · v4.2</span>
                    </div>
                    <div>
                      <span className="l">Duration</span>
                      <span className="v">08m 14s</span>
                    </div>
                    <div>
                      <span className="l">Points</span>
                      <span className="v">204 / 204</span>
                    </div>
                  </div>

                  <div className="twocol">
                    <div className="leftc">
                      <div className="chart">
                        <div className="ch-head">
                          <span>
                            FIG 01 · <b>Id vs VGS</b>
                          </span>
                          <span>LIN-LIN · K2400 CH1</span>
                        </div>
                        <svg viewBox="0 0 320 130" preserveAspectRatio="none">
                          <defs>
                            <pattern id="lf-pg" width="32" height="13" patternUnits="userSpaceOnUse">
                              <path d="M32 0 H0 V13" fill="none" stroke="#ececea" strokeWidth="1" />
                            </pattern>
                          </defs>
                          <rect width="320" height="130" fill="url(#lf-pg)" />
                          <line x1="30" y1="0" x2="30" y2="115" stroke="#1a1a18" strokeWidth="1" />
                          <line x1="30" y1="115" x2="320" y2="115" stroke="#1a1a18" strokeWidth="1" />
                          <path
                            d="M30 115 L80 114 L120 112 L150 106 L170 94 L185 76 L200 52 L215 32 L235 18 L260 10 L290 6 L320 4"
                            fill="none"
                            stroke="#ff4d12"
                            strokeWidth="2"
                          />
                          <line x1="170" y1="0" x2="170" y2="115" stroke="#ff4d12" strokeDasharray="3 3" opacity=".6" />
                          <text x="173" y="14" fontFamily="JetBrains Mono" fontSize="8" fill="#ff4d12">
                            Vth = 1.42 V
                          </text>
                          <circle cx="215" cy="48" r="3.5" fill="none" stroke="#ff4d12" strokeWidth="1.5" />
                          <text x="222" y="46" fontFamily="JetBrains Mono" fontSize="7.5" fill="#ff4d12">
                            outlier · pt 137
                          </text>
                          <g fontFamily="JetBrains Mono" fontSize="8" fill="#5a5a58">
                            <text x="4" y="10">
                              Id(mA)
                            </text>
                            <text x="4" y="60">
                              8
                            </text>
                            <text x="4" y="90">
                              4
                            </text>
                            <text x="4" y="118">
                              0
                            </text>
                            <text x="30" y="128">
                              0
                            </text>
                            <text x="120" y="128">
                              1.0
                            </text>
                            <text x="200" y="128">
                              2.0
                            </text>
                            <text x="290" y="128">
                              3.0
                            </text>
                            <text x="280" y="128">
                              VGS(V)
                            </text>
                          </g>
                        </svg>
                      </div>
                      <div className="summary">
                        <div className="lbl">
                          <span className="sq" />
                          FLOW · WRITTEN SUMMARY
                        </div>
                        <p>
                          The device exhibits a clean transfer characteristic with{' '}
                          <span className="hl">Vth = 1.42 V</span> and a subthreshold slope of{' '}
                          <span className="hl">78 mV/dec</span>. Drain current saturates near 11.8 mA, consistent with
                          the 100 mA compliance band.
                        </p>
                        <p>
                          One outlier was observed at point 137 (Id deviated 0.31 mA from the local fit). Re-run of that
                          step matched the curve; the original sample is preserved in raw data.
                        </p>
                        <p style={{ color: 'var(--ink-2)', fontSize: 11 }}>
                          Recommendation: tighten settling time to 75 ms above VGS = 2.0 V; current 50 ms shows mild
                          lag.
                        </p>
                      </div>
                    </div>

                    <div className="rightc">
                      <div className="kvbox">
                        <h6>BENCH STATE</h6>
                        <table>
                          <tbody>
                            <tr>
                              <td>SMU CH1</td>
                              <td className="v ok">SOURCING</td>
                            </tr>
                            <tr>
                              <td>Rail 3V3</td>
                              <td className="v">3.301 V</td>
                            </tr>
                            <tr>
                              <td>Compliance</td>
                              <td className="v">100 mA</td>
                            </tr>
                            <tr>
                              <td>Probe temp</td>
                              <td className="v">38.4 °C</td>
                            </tr>
                            <tr>
                              <td>Calibration</td>
                              <td className="v ok">FRESH · 2d</td>
                            </tr>
                            <tr>
                              <td>Safety policy</td>
                              <td className="v flag">ARMED</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="kvbox">
                        <h6>RESULTS</h6>
                        <table>
                          <tbody>
                            <tr>
                              <td>Vth</td>
                              <td className="v">1.42 V</td>
                            </tr>
                            <tr>
                              <td>SS</td>
                              <td className="v">78 mV/dec</td>
                            </tr>
                            <tr>
                              <td>Ion</td>
                              <td className="v">11.82 mA</td>
                            </tr>
                            <tr>
                              <td>Ioff</td>
                              <td className="v">4.9 nA</td>
                            </tr>
                            <tr>
                              <td>Ion/Ioff</td>
                              <td className="v">2.4e6</td>
                            </tr>
                            <tr>
                              <td>Outliers</td>
                              <td className="v flag">1 / 204</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="agentstrip">
                    <span className="agentstrip-label">AGENT TRANSCRIPT</span>
                    <span className="agentstrip-line">
                      <span className="ix">01</span> rail <b>3.301 V ✓</b>
                    </span>
                    <span className="agentstrip-line">
                      <span className="ix">02</span> arm K2400 <b>0→3.2V</b>
                    </span>
                    <span className="agentstrip-line">
                      <span className="ix">03</span> sweep · settle <b>50 ms</b>
                    </span>
                    <span className="agentstrip-line">
                      <span className="ix">04</span> extract <b>Vth · sign</b>
                    </span>
                  </div>

                  <div className="pfooter">
                    <span>ARCHIVE · LF-REP-4821</span>
                    <span className="barc" />
                    <span>SIGNED · SHA-256 · 9f2a…b4c1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec">
        <div className="ghost">LABFLOW</div>
        <div className="container">
          <div className="pre upp">
            <span className="sq" />
            07 / GET ON THE BENCH
          </div>
          <h2>
            Run an experiment <span className="o">today.</span>
          </h2>
          <div className="row">
            <p>
              Free for a single bench while we&apos;re in beta. Bring your own instruments — we&apos;ll auto-discover
              anything on GPIB, USBTMC, or your subnet, and you can start dictating sweeps in under five minutes.
            </p>
            <div className="actions">
              <WaitlistEmailForm />
              <Link className="btn" href="/request-demo">
                Book a 20-min bench walkthrough
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col big">
              <div className="logo">
                Labflow<span style={{ fontSize: 14, color: 'var(--ink-2)', verticalAlign: 'super' }}>®</span>
              </div>
              <div style={{ maxWidth: '38ch', lineHeight: 1.6 }}>
                Agentic control plane for electronic test &amp; measurement. Built in Cambridge, MA &amp; Eindhoven.
                Hardware-aware, human-supervised.
              </div>
              <div style={{ marginTop: 14 }}>
                <span className="pill orange upp">BETA · v4.2.1</span> &nbsp;{' '}
                <span className="pill upp outline">SOC-2 IN PROGRESS</span>
              </div>
            </div>
            <div className="col">
              <h5>Product</h5>
              <a href="#">Console</a>
              <a href="#">Agents</a>
              <a href="#">Instruments</a>
              <a href="#">Protocols</a>
              <a href="#">Pricing</a>
            </div>
            <div className="col">
              <h5>Drivers</h5>
              <a href="#">Keithley</a>
              <a href="#">Keysight</a>
              <a href="#">Tektronix</a>
              <a href="#">Rigol</a>
              <a href="#">All 42 →</a>
            </div>
            <div className="col">
              <h5>Resources</h5>
              <a href="#">Docs</a>
              <a href="#">SCPI cookbook</a>
              <a href="#">Changelog</a>
              <a href="#">Status</a>
              <a href="#">Community</a>
            </div>
            <div className="col">
              <h5>Company</h5>
              <a href="#">About</a>
              <a href="#">Careers · 4</a>
              <a href="#">Security</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div className="ftr-row upp">
            <span>© 2026 LABFLOW SYSTEMS</span>
            <span>·</span>
            <span>ARCHIVE REF · LF-WEB-2026-Q2</span>
            <span style={{ flex: 1 }} />
            <span>{orangeSq}SYSTEMS NOMINAL · ALL BAYS ONLINE</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
