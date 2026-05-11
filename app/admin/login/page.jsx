import { redirect } from 'next/navigation'
import { isAuthed } from '@/lib/admin/auth'
import LoginForm from './LoginForm'

export const metadata = {
  title: 'Sign in · Labflow admin',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  if (isAuthed()) redirect('/admin')
  return (
    <div className="lf-root">
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          background: 'var(--bg)',
        }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div className="lf-eyebrow">LABFLOW · ADMIN</div>
          <h1 className="lf-h1 medium" style={{ marginBottom: 8 }}>
            Sign in.
          </h1>
          <p className="lf-lede" style={{ fontSize: 14, marginBottom: 24 }}>
            Restricted area. Bring the password the team shared with you.
          </p>
          <LoginForm />
        </div>
      </section>
    </div>
  )
}
