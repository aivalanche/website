'use client'
import Link from 'next/link'

const navItems = [
  { label: 'Product', href: '/product', has: true },
  { label: 'Instruments', href: '/instruments', has: true },
  { label: 'Agents', href: '/agents', has: false },
  { label: 'Protocols', href: '/protocols', has: false },
  { label: 'Docs', href: '/docs', has: true },
  { label: 'Pricing', href: '/pricing', has: false },
  { label: 'Changelog', href: '/changelog', has: false },
]

export default function SecondaryNavbar() {
  return (
    <>
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

      <div className="container">
        <nav className="top">
          <Link href="/" className="brand">
            <div className="mark" />
            LABFLOW
            <span style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500, marginLeft: -6 }}>®</span>
          </Link>
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
    </>
  )
}
