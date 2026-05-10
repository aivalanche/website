import Link from 'next/link'

export default function Footer() {
  return (
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
            <Link href="/product">Console</Link>
            <Link href="/agents">Agents</Link>
            <Link href="/instruments">Instruments</Link>
            <Link href="/protocols">Protocols</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div className="col">
            <h5>Drivers</h5>
            <Link href="/instruments">Keithley</Link>
            <Link href="/instruments">Keysight</Link>
            <Link href="/instruments">Tektronix</Link>
            <Link href="/instruments">Rigol</Link>
            <Link href="/instruments">All 42 →</Link>
          </div>
          <div className="col">
            <h5>Resources</h5>
            <Link href="/docs">Docs</Link>
            <Link href="/changelog">Changelog</Link>
            <Link href="/openclaw">OpenClaw</Link>
            <Link href="/sitemap">Sitemap</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="col">
            <h5>Company</h5>
            <Link href="/contact">About</Link>
            <Link href="/contact">Careers · 4</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/impressum">Impressum</Link>
          </div>
        </div>
        <div className="ftr-row upp">
          <span>© 2026 LABFLOW SYSTEMS</span>
          <span>·</span>
          <span>ARCHIVE REF · LF-WEB-2026-Q2</span>
          <span style={{ flex: 1 }} />
          <span>
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
            SYSTEMS NOMINAL · ALL BAYS ONLINE
          </span>
        </div>
      </div>
    </footer>
  )
}
