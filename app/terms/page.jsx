import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

export const metadata = {
  title: 'Terms of Service | Labflow',
  description: 'Terms and conditions governing the use of Labflow products and services.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <div className="lf-root">
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">LEGAL · LF-LGL</div>
            <div className="cell">DOC · TERMS</div>
            <div className="cell" />
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              REV · 2026-Q2
            </div>
          </div>
          <div className="lf-eyebrow">LEGAL / TERMS</div>
          <h1 className="lf-h1 medium">Terms of service.</h1>
          <p className="lf-lede">
            The rules of engagement for the Labflow platform — what we promise, what we expect, and what happens at the
            edges. Plain English.
          </p>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div className="lf-prose">
            <p>
              These terms govern the use of Labflow products, web properties and connected services. By using the
              platform you agree to comply with applicable laws and to operate the platform responsibly — particularly
              when controlling laboratory equipment.
            </p>
            <h2>Acceptable use</h2>
            <p>
              You retain full control of and responsibility for the instruments connected to Labflow. Operators are
              expected to keep safety policies, compliance limits and dual-sign rules enabled for production benches.
            </p>
            <h2>Data &amp; logs</h2>
            <p>
              We retain run transcripts, samples and signed report manifests for the duration of your subscription so
              the platform can deliver its reproducibility guarantees. See the{' '}
              <a href="/privacy">privacy policy</a> for full details.
            </p>
            <h2>Liability</h2>
            <p>
              Labflow is provided on an &quot;as is&quot; basis during beta. We are not liable for indirect or
              consequential damages arising from instrument operation; the operator remains the responsible party for
              equipment safety at all times.
            </p>
            <h2>Contact</h2>
            <p>
              For support or legal questions, reach us at{' '}
              <a href="mailto:support@aivalanche.de">support@aivalanche.de</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
