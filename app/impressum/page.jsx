import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

export const metadata = {
  title: 'Impressum | Labflow',
  description: 'Legal notice and contact details for Labflow / AIvalanche.',
  alternates: { canonical: '/impressum' },
}

export default function ImpressumPage() {
  return (
    <div className="lf-root">
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">LEGAL · LF-LGL</div>
            <div className="cell">DOC · IMPRESSUM</div>
            <div className="cell" />
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              JURISDICTION · DE / EU
            </div>
          </div>
          <div className="lf-eyebrow">LEGAL / IMPRESSUM</div>
          <h1 className="lf-h1 medium">Impressum.</h1>
          <p className="lf-lede">
            Mandatory legal notice for our German &amp; EU audience. For all other queries, the contact page is the
            faster route.
          </p>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div className="lf-prose">
            <p>
              <strong>AIvalanche</strong>
              <br />
              KI-Software fuer Unternehmen
              <br />
              Operator of the Labflow platform.
            </p>
            <p>
              Contact: <a href="mailto:support@aivalanche.de">support@aivalanche.de</a>
            </p>
            <p>
              This page provides mandatory legal information and contact details in accordance with applicable
              regulations.
            </p>
            <h2>Verantwortlich fuer den Inhalt</h2>
            <p>AIvalanche, vertreten durch die Geschaeftsfuehrung.</p>
            <h2>Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website werden mit groesster Sorgfalt erstellt. Fuer die Richtigkeit, Vollstaendigkeit
              und Aktualitaet der Inhalte koennen wir jedoch keine Gewaehr uebernehmen.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
