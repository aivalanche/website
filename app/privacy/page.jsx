import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import getMarkDownData from '@/utils/getMarkDownData'
import ReactMarkdown from 'react-markdown'

export const metadata = {
  title: 'Privacy Policy | Labflow',
  description:
    'Privacy policy for Labflow — how we handle operator data, run logs, signed reports, and SCPI command audit trails.',
  keywords: ['privacy policy labflow', 'gdpr lab automation', 'instrument data retention'],
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

export default function Privacy() {
  const privacy = getMarkDownData('content/privacy/')
  return (
    <div className="lf-root">
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">LEGAL · LF-LGL</div>
            <div className="cell">DOC · PRIVACY</div>
            <div className="cell" />
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              REV · 2026-Q2
            </div>
          </div>
          <div className="lf-eyebrow">LEGAL / PRIVACY</div>
          <h1 className="lf-h1 medium">Privacy policy.</h1>
          <p className="lf-lede">
            What we collect, why we keep it, and how long it sticks around — including the run transcripts and signed
            manifests that make Labflow runs reproducible.
          </p>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div className="lf-prose">
            {privacy.map((item) => (
              <ReactMarkdown key={item.slug}>{item.content}</ReactMarkdown>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
