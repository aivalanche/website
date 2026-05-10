import Link from 'next/link'
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

export const metadata = {
  title: 'Instruments — Labflow',
  description:
    'Labflow ships drivers for 42 instruments across 11 vendors — Keithley, Keysight, Tektronix, Rigol, R&S, Siglent, Fluke, NI and more. GPIB, USBTMC, LAN and serial.',
}

const categories = [
  {
    n: '01',
    h: 'Source-Measure Units',
    sub: '4-quadrant, sweep, source-V/measure-I',
    drivers: ['Keithley 2400', 'Keithley 2450', 'Keithley 2461', 'Keysight B2901A', 'Keysight B2912A'],
  },
  {
    n: '02',
    h: 'Oscilloscopes',
    sub: 'Up to 8 GHz, 25 GS/s, 4-channel',
    drivers: ['Tektronix MSO64', 'Tektronix MDO34', 'Keysight DSOX1204G', 'Rigol DS1054Z', 'Siglent SDS1104X'],
  },
  {
    n: '03',
    h: 'Function / Arbitrary Generators',
    sub: 'DC to 80 MHz, true-arb, dual-channel',
    drivers: ['Rigol DG1022Z', 'Rigol DG4202', 'Siglent SDG2042X', 'Keysight 33500B', 'Tektronix AFG31000'],
  },
  {
    n: '04',
    h: 'Programmable Supplies',
    sub: 'Single & multi-rail, LXI / SCPI',
    drivers: ['R&S NGE103B', 'R&S NGE100', 'Keysight E36312A', 'Rigol DP832', 'Tektronix PWS4000'],
  },
  {
    n: '05',
    h: 'Digital Multimeters',
    sub: '6½-digit, TRMS, datalog',
    drivers: ['HP/Agilent 34401A', 'Keysight 34465A', 'Fluke 8846A', 'Keithley DMM6500', 'Rigol DM3068'],
  },
  {
    n: '06',
    h: 'DAQ / Loggers',
    sub: '32 AI, 2 MS/s, isolated',
    drivers: ['NI USB-6363', 'NI USB-6212', 'Keysight DAQ970A', 'Tektronix Keithley 2701', 'Pico DrDAQ'],
  },
  {
    n: '07',
    h: 'Electronic Loads',
    sub: 'CV/CC/CR/CP, dynamic, parallel',
    drivers: ['Rigol DL3021', 'B&K Precision 8500', 'Chroma 63600', 'Keysight EL30000', 'Itech IT8500'],
  },
  {
    n: '08',
    h: 'Network / Spectrum',
    sub: 'Up to 8.5 GHz, log-mag / Smith',
    drivers: ['Rigol RSA5000', 'Keysight N9320B', 'Siglent SSA3032X', 'Tektronix RSA306B', 'Anritsu MS2090A'],
  },
]

const vendors = [
  'Keithley',
  'Keysight',
  'Tektronix',
  'Rigol',
  'R&S',
  'Siglent',
  'Fluke',
  'NI',
  'B&K Precision',
  'Chroma',
  'Anritsu',
]

const transports = [
  {
    h: 'GPIB / IEEE-488',
    p: 'Native via NI-VISA, Prologix and KUSB-488B adapters. Auto-discovery and address negotiation.',
  },
  {
    h: 'USBTMC',
    p: 'Plug-and-play for instruments that expose a USB TMC interface. No vendor driver required on Linux or macOS.',
  },
  {
    h: 'LAN / LXI / VXI-11',
    p: 'mDNS discovery, raw socket and HiSLIP. Works through enterprise firewalls with cert pinning.',
  },
  {
    h: 'Serial / RS-232 / RS-485',
    p: 'Older bench gear is welcome. Configurable framing, parity, and termination per driver.',
  },
  {
    h: 'SCPI · VISA · IVI',
    p: 'IVI-C, IVI.NET and SCPI-99 conformance flags exposed per driver, so the agent knows what it can ask for.',
  },
  {
    h: 'Modbus / Proprietary',
    p: 'For climate chambers and power analyzers that never adopted SCPI. Each driver carries its own wire dialect.',
  },
]

export default function InstrumentsPage() {
  return (
    <div className="lf-root">
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">SECTION · LF-INST</div>
            <div className="cell">DRIVERS · 42</div>
            <div className="cell">VENDORS · 11</div>
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              NEW · MONTHLY
            </div>
          </div>
          <div className="lf-eyebrow">02 / INSTRUMENTS</div>
          <h1 className="lf-h1">A common surface for the whole bench.</h1>
          <p className="lf-lede">
            Forty-two drivers, eleven vendors, four transports — and one agent that knows the difference between a
            sweep, a sample and a trigger. If your instrument speaks SCPI, VISA or IVI, Labflow can drive it.
          </p>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">CATEGORIES</div>
          <h2 className="lf-h2">By category.</h2>

          <div className="lf-grid-2" style={{ marginTop: 24 }}>
            {categories.map((c) => (
              <div key={c.n} className="lf-card">
                <div
                  className="mono upp"
                  style={{ fontSize: 10, color: 'var(--orange)', letterSpacing: '.14em', marginBottom: 14 }}>
                  CAT · {c.n}
                </div>
                <h3>{c.h}</h3>
                <p style={{ marginBottom: 14 }}>{c.sub}</p>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                  {c.drivers.map((d) => (
                    <div
                      key={d}
                      className="mono"
                      style={{
                        fontSize: 12,
                        color: 'var(--ink)',
                        padding: '4px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <span style={{ width: 6, height: 6, background: 'var(--orange)', display: 'inline-block' }} />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="lf-eyebrow">VENDORS</div>
          <h2 className="lf-h2">11 vendors, one console.</h2>

          <div
            style={{
              marginTop: 24,
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 0,
              borderTop: '1px solid var(--line)',
              borderLeft: '1px solid var(--line)',
            }}>
            {vendors.map((v) => (
              <div
                key={v}
                style={{
                  borderRight: '1px solid var(--line)',
                  borderBottom: '1px solid var(--line)',
                  padding: '24px 18px',
                  background: 'var(--bg)',
                  fontFamily: 'var(--font-archivo)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '.02em',
                  fontSize: 18,
                }}>
                {v}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="lf-eyebrow">TRANSPORTS &amp; PROTOCOLS</div>
          <h2 className="lf-h2">It speaks bench.</h2>
          <p className="lf-lede" style={{ maxWidth: '60ch' }}>
            From a 1995 GPIB-only signal generator to a 2025 LXI scope, Labflow handles the wire so you can think about
            the experiment.
          </p>

          <div className="lf-grid-3" style={{ marginTop: 24 }}>
            {transports.map((t) => (
              <div key={t.h} className="lf-card">
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="lf-row-list">
            <div>
              <div>
                <h3>Don&apos;t see your instrument?</h3>
                <p>
                  If it speaks SCPI or VISA, we can usually ship a driver in under a week. Otherwise, we&apos;ll talk.
                </p>
              </div>
              <Link href="/contact">Request a driver →</Link>
            </div>
            <div>
              <div>
                <h3>Already on GPIB?</h3>
                <p>
                  Bring your NI-VISA or Prologix setup as-is. Labflow co-exists with vendor GUIs — no rewire required.
                </p>
              </div>
              <Link href="/docs">Quickstart →</Link>
            </div>
            <div>
              <div>
                <h3>Open a bench session.</h3>
                <p>Free for a single bench while we&apos;re in beta. Auto-discovery on GPIB, USBTMC and your subnet.</p>
              </div>
              <Link href="/request-demo">Request demo →</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
