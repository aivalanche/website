import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

export const metadata = {
  title: 'Kontakt | AIvalanche KI-Agent fuer Unternehmen',
  description:
    'Kontaktieren Sie AIvalanche fuer KI-Agent-Automatisierung in Deutschland, OpenClaw-Integrationen und DSGVO-konforme Einfuehrung.',
  keywords: ['kontakt ki agent deutschland', 'openclaw integration', 'ki automatisierung beratung'],
  alternates: {
    canonical: '/contact',
    languages: {
      'de-DE': '/contact',
      'de-AT': '/contact',
      'de-CH': '/contact',
      'en-US': '/contact?lang=en',
    },
  },
  openGraph: {
    title: 'Kontakt | AIvalanche',
    description: 'Sprechen Sie mit AIvalanche ueber KI-Agent-Einfuehrung, OpenClaw-Anbindung und Support im DACH-Raum.',
    url: 'https://aivalanche.com/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <>
      <SecondaryNavbar />
      <main className="mx-auto max-w-[800px] px-6 py-32">
        <p className="mb-3 text-[11px] uppercase tracking-[0.15em] opacity-30">Kontakt</p>
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">Kontakt aufnehmen</h1>
        <p className="mb-12 text-[16px] leading-relaxed opacity-55">
          Sie moechten AIvalanche fuer Ihr Unternehmen evaluieren oder OpenClaw mit Slack, Teams oder WhatsApp
          verbinden? Unser Team unterstuetzt Sie bei Setup, Sicherheit und Rollout.
        </p>
        <div className="space-y-4" style={{ borderTop: '1px solid var(--wp-line, #D8D1C5)', paddingTop: '2rem' }}>
          <div>
            <p className="text-sm font-semibold">Email</p>
            <a href="mailto:hello@aivalanche.com" className="text-sm opacity-55 transition-opacity hover:opacity-100">
              hello@aivalanche.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
