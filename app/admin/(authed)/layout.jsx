import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isAuthed } from '@/lib/admin/auth'
import LogoutButton from './LogoutButton'

export const metadata = {
  title: 'Admin · Labflow',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }) {
  if (!isAuthed()) redirect('/admin/login')
  return (
    <div className="lf-root">
      <div className="utility">
        <div className="row mono upp container">
          <span>
            <span className="sq" />
            LABFLOW / ADMIN
          </span>
          <span className="grow" />
          <span>RESTRICTED · STAFF ONLY</span>
        </div>
      </div>

      <div className="container">
        <nav className="top">
          <Link href="/admin" className="brand">
            <img src="/images/logo_svg_black.svg" alt="Labflow" width="32" height="35" className="mark" />
            LABFLOW <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>· admin</span>
          </Link>
          <ul>
            <li>
              <Link href="/admin">Overview</Link>
            </li>
            <li>
              <Link href="/admin/email">Email</Link>
            </li>
            <li>
              <Link href="/admin/visitors">Visitors</Link>
            </li>
            <li>
              <Link href="/admin/heatmap">Heatmap</Link>
            </li>
          </ul>
          <div style={{ flex: 1 }} />
          <div className="nav-cta">
            <Link className="btn" href="/">
              Public site
            </Link>
            <LogoutButton />
          </div>
        </nav>
      </div>

      <main>{children}</main>
    </div>
  )
}
