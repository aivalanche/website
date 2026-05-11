import Link from 'next/link'
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import { pageMetadata, breadcrumbSchema } from '../seo'

export const metadata = pageMetadata({
  title: 'Changelog — Releases, drivers, agent upgrades · Labflow',
  description:
    'Labflow release notes. New instrument drivers, FLOW agent upgrades, console refinements and safety policy improvements — versioned by SemVer and shipped on Tuesdays.',
  path: '/changelog',
  keywords: ['Labflow changelog', 'Labflow releases', 'instrument driver releases', 'lab automation updates'],
})

const breadcrumb = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Changelog', path: '/changelog' },
])

const releases = [
  {
    v: 'v4.2.1',
    date: '2026-05-08',
    tag: 'PATCH',
    headline: 'Tightened the bench safety policy file.',
    items: [
      {
        type: 'fix',
        text: 'Resolved a race where a missed compliance event could be reported after the auto-shutdown ramp.',
      },
      { type: 'fix', text: 'Keysight DSOX1204G — corrected timebase rounding on 200 µs/div.' },
      { type: 'imp', text: 'Policy file now supports per-rail temperature gates with custom hysteresis.' },
      { type: 'imp', text: 'Report manifest hashes are now SHA-256 across the board (was SHA-1 for legacy sessions).' },
    ],
  },
  {
    v: 'v4.2',
    date: '2026-04-22',
    tag: 'MINOR',
    headline: 'FLOW learns to share the bench.',
    items: [
      { type: 'new', text: 'Multi-instrument choreography — SMU + FG + Scope orchestrated in a single agent loop.' },
      { type: 'new', text: 'Drivers for Siglent SDS1104X and Rigol DG4202.' },
      {
        type: 'new',
        text: 'Live waveform reasoning — anomalies (clipping, ringing, drift) flagged in the agent stream with the matching trace segment.',
      },
      { type: 'imp', text: 'Console: KPI strip is now driven at instrument cadence rather than browser cadence.' },
      { type: 'imp', text: 'Protocols can now declare per-step abort predicates with units.' },
    ],
  },
  {
    v: 'v4.1',
    date: '2026-03-18',
    tag: 'MINOR',
    headline: 'Signed reports, by default.',
    items: [
      {
        type: 'new',
        text: 'Every session emits a signed manifest. `lf replay` now guarantees byte-identical re-runs.',
      },
      { type: 'new', text: 'Report templates: PDF, HTML, Markdown, LaTeX. Brand-aware headers.' },
      { type: 'imp', text: 'OpenTelemetry exporter — traces, metrics, logs, with hardware events attached.' },
      { type: 'imp', text: 'Driver matrix expanded to 38 instruments across 10 vendors.' },
    ],
  },
  {
    v: 'v4.0',
    date: '2026-02-04',
    tag: 'MAJOR',
    headline: 'Labflow 4 — agent-first console.',
    items: [
      { type: 'new', text: 'Rebuilt console around the agent stream — bench rail, work surface, agent column.' },
      { type: 'new', text: 'flow-l model: longer context, better multi-instrument plans, sharper observations.' },
      { type: 'new', text: 'Bench safety policy file replaces ad-hoc per-instrument clamps.' },
      { type: 'new', text: 'Operator override — single keystroke suspends the agent and returns control.' },
      { type: 'imp', text: 'Discovery now spans GPIB, USBTMC, LAN (mDNS) and Serial in one pass.' },
    ],
  },
  {
    v: 'v3.4',
    date: '2025-12-12',
    tag: 'MINOR',
    headline: 'PSRR & step-response protocols shipped in-library.',
    items: [
      { type: 'new', text: 'Pre-flight protocols: PSRR sweep, step response, jitter histogram, 24-hour burn-in.' },
      { type: 'new', text: 'Driver: NI USB-6363 with streamed acquisition.' },
      { type: 'imp', text: 'Console: dark titlebar with session path breadcrumb (bay › session › protocol).' },
      { type: 'fix', text: 'Tektronix MSO64 — robust handling of incomplete acquisitions on early triggers.' },
    ],
  },
  {
    v: 'v3.3',
    date: '2025-11-04',
    tag: 'MINOR',
    headline: 'First public beta.',
    items: [
      { type: 'new', text: 'Public beta — free for a single bench.' },
      { type: 'new', text: 'Drivers for Keithley 2400 / 2450, Tektronix MSO64, Rigol DG1022Z, R&S NGE100.' },
      { type: 'new', text: 'Natural-language → SCPI compilation with bench-aware validation.' },
      { type: 'imp', text: 'Auto-discovery on GPIB, USBTMC and LAN.' },
    ],
  },
]

const typeMeta = {
  new: { label: 'NEW', color: 'var(--orange)' },
  imp: { label: 'IMP', color: 'var(--good)' },
  fix: { label: 'FIX', color: 'var(--ink-2)' },
}

const tagMeta = {
  PATCH: { bg: 'var(--bg-2)', fg: 'var(--ink-2)', border: 'var(--line)' },
  MINOR: { bg: 'var(--ink)', fg: '#fff', border: 'var(--ink)' },
  MAJOR: { bg: 'var(--orange)', fg: '#fff', border: 'var(--orange)' },
}

export default function ChangelogPage() {
  return (
    <div className="lf-root">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">SECTION · LF-CHG</div>
            <div className="cell">LATEST · v4.2.1</div>
            <div className="cell">CADENCE · ~2 / MONTH</div>
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              RSS · /changelog.xml
            </div>
          </div>
          <div className="lf-eyebrow">07 / CHANGELOG</div>
          <h1 className="lf-h1">What shipped. When. Why.</h1>
          <p className="lf-lede">
            We release on Tuesdays. Patches are SemVer; behaviour changes get the bench&apos;s attention via a banner in
            the console. Subscribe to /changelog.xml for the feed.
          </p>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {releases.map((r) => {
              const tag = tagMeta[r.tag]
              return (
                <article
                  key={r.v}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '220px 1fr',
                    gap: 32,
                    padding: '36px 0',
                    borderTop: '1px solid var(--line)',
                    alignItems: 'flex-start',
                  }}>
                  <aside style={{ position: 'sticky', top: 24 }}>
                    <div
                      className="mono upp"
                      style={{
                        fontSize: 10,
                        color: 'var(--ink-2)',
                        letterSpacing: '.14em',
                        marginBottom: 10,
                      }}>
                      {r.date}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-archivo)',
                        fontSize: 30,
                        fontWeight: 800,
                        letterSpacing: '-.02em',
                        marginBottom: 12,
                      }}>
                      {r.v}
                    </div>
                    <span
                      className="mono upp"
                      style={{
                        display: 'inline-block',
                        fontSize: 10,
                        letterSpacing: '.14em',
                        padding: '4px 10px',
                        background: tag.bg,
                        color: tag.fg,
                        border: `1px solid ${tag.border}`,
                      }}>
                      {r.tag}
                    </span>
                  </aside>

                  <div>
                    <h3 className="lf-h3" style={{ marginBottom: 18 }}>
                      {r.headline}
                    </h3>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}>
                      {r.items.map((it, i) => {
                        const t = typeMeta[it.type]
                        return (
                          <li
                            key={i}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '64px 1fr',
                              gap: 14,
                              alignItems: 'flex-start',
                            }}>
                            <span
                              className="mono upp"
                              style={{
                                fontSize: 10,
                                letterSpacing: '.14em',
                                color: '#fff',
                                background: t.color,
                                padding: '3px 8px',
                                textAlign: 'center',
                                marginTop: 3,
                              }}>
                              {t.label}
                            </span>
                            <span style={{ fontSize: 14.5, lineHeight: 1.55 }}>{it.text}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="lf-page" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="lf-grid-2">
            <div className="lf-card-orange lf-card">
              <h3>Stay current.</h3>
              <p>Subscribe to the RSS feed at /changelog.xml or watch the release banner in the console.</p>
              <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
                <Link className="btn" href="/changelog.xml" style={{ borderColor: '#fff', color: '#fff' }}>
                  RSS feed
                </Link>
                <Link className="btn" href="/request-demo" style={{ borderColor: '#fff', color: '#fff' }}>
                  Try latest <span className="arr">→</span>
                </Link>
              </div>
            </div>
            <div className="lf-card">
              <h3>Found a regression?</h3>
              <p>We&apos;d like to know. Drop a note via contact and we&apos;ll triage within a business day.</p>
              <div style={{ marginTop: 18 }}>
                <Link className="btn" href="/contact">
                  File a report
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
