import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import Link from 'next/link'

const siteUrl = 'https://aivalanche.com'
const pageUrl = `${siteUrl}/openclaw`

export const metadata = {
  title: 'OpenClaw Integration fuer KI-Agenten | AIvalanche',
  description:
    'OpenClaw verbindet AIvalanche mit Slack, Teams, WhatsApp und Unternehmens-Tools. Fokus auf deutsche Teams, DSGVO-orientierte Prozesse und schnelle KI-Automatisierung.',
  keywords: [
    'openclaw',
    'openclaw integration',
    'openclaw deutschland',
    'ki agent openclaw',
    'dsgvo ki automatisierung',
    'ki workflow deutschland',
  ],
  alternates: {
    canonical: '/openclaw',
    languages: {
      'de-DE': '/openclaw',
      'de-AT': '/openclaw',
      'de-CH': '/openclaw',
      'en-US': '/openclaw?lang=en',
    },
  },
  openGraph: {
    title: 'OpenClaw Integration fuer KI-Agenten | AIvalanche',
    description: 'OpenClaw verknuepft Chat und Unternehmenssoftware fuer KI-Agent-Ausfuehrung in deutschen Teams.',
    url: pageUrl,
    type: 'website',
  },
}

export default function OpenClawPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'OpenClaw Integration fuer KI-Agenten',
        description:
          'OpenClaw verbindet AIvalanche mit Chat-Kanaelen und Business-Tools fuer produktive KI-Automatisierung im DACH-Raum.',
        inLanguage: 'de-DE',
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was ist OpenClaw?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'OpenClaw ist die Integrationsschicht von AIvalanche. Sie verbindet Chat-Kanaele und Unternehmenssysteme, damit KI-Agenten Aufgaben direkt ausfuehren koennen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Ist OpenClaw fuer deutsche Unternehmen geeignet?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. OpenClaw wird fuer Teams mit DSGVO-orientierten Anforderungen eingesetzt und kann in bestehende Prozesse fuer Deutschland, Oesterreich und die Schweiz integriert werden.',
            },
          },
          {
            '@type': 'Question',
            name: 'Welche Tools kann OpenClaw verbinden?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'OpenClaw verbindet unter anderem Slack, Microsoft Teams, WhatsApp sowie CRM-, Ticketing- und Analytics-Systeme. Fehlende Schnittstellen koennen als Connector ergaenzt werden.',
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <SecondaryNavbar />
      <main className="mx-auto max-w-[900px] px-6 py-32">
        <p className="mb-3 text-[11px] uppercase tracking-[0.15em] opacity-30">OpenClaw</p>
        <h1 className="mb-6 text-3xl font-bold md:text-5xl">OpenClaw fuer KI-Agenten im DACH-Raum</h1>
        <p className="mb-10 max-w-[760px] text-[17px] leading-relaxed opacity-60">
          OpenClaw ist die Integrationsschicht von AIvalanche. Sie verbindet Ihre Chat-Kanaele mit den
          Unternehmens-Tools, die bereits im Einsatz sind, und setzt Aufgaben direkt in umsetzbare Schritte um.
        </p>

        <section
          className="mb-12 rounded-xl p-7"
          style={{ border: '1px solid var(--wp-line, #D8D1C5)', background: 'var(--wp-surface, rgba(18,20,23,0.03))' }}>
          <h2 className="mb-4 text-2xl font-semibold">Warum OpenClaw fuer SEO-relevante KI-Themen wichtig ist</h2>
          <p className="mb-4 text-[16px] leading-relaxed opacity-60">
            Viele Unternehmen suchen explizit nach OpenClaw, wenn sie KI-Agenten nicht nur testen, sondern operativ
            ausrollen wollen. Diese Seite beantwortet genau diese Suchintention fuer den deutschen Markt.
          </p>
          <ul className="space-y-3 text-[15px] leading-relaxed opacity-65">
            <li>OpenClaw bringt Aufgaben aus Slack, Teams und WhatsApp direkt in die Ausfuehrung.</li>
            <li>OpenClaw verbindet CRM, Ticketing, Analytics und interne APIs in einem Workflow.</li>
            <li>OpenClaw passt zu Teams mit DSGVO-orientierten Anforderungen in Deutschland.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Typische OpenClaw Anwendungsfaelle</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-xl p-5" style={{ border: '1px solid var(--wp-line, #D8D1C5)' }}>
              <h3 className="mb-2 font-semibold">Support und Ops</h3>
              <p className="text-[15px] leading-relaxed opacity-60">
                Aufgaben aus Team-Chats in Ticket-Updates, Statusmeldungen und Automationen ueberfuehren.
              </p>
            </article>
            <article className="rounded-xl p-5" style={{ border: '1px solid var(--wp-line, #D8D1C5)' }}>
              <h3 className="mb-2 font-semibold">Sales und CRM</h3>
              <p className="text-[15px] leading-relaxed opacity-60">
                OpenClaw verknuepft Leads, Follow-ups und CRM-Pflege mit klaren Team-Workflows.
              </p>
            </article>
            <article className="rounded-xl p-5" style={{ border: '1px solid var(--wp-line, #D8D1C5)' }}>
              <h3 className="mb-2 font-semibold">Marketing</h3>
              <p className="text-[15px] leading-relaxed opacity-60">
                Kampagnen-Signale aus mehreren Tools erfassen und Ergebnisse automatisch in den Team-Chat melden.
              </p>
            </article>
            <article className="rounded-xl p-5" style={{ border: '1px solid var(--wp-line, #D8D1C5)' }}>
              <h3 className="mb-2 font-semibold">Engineering</h3>
              <p className="text-[15px] leading-relaxed opacity-60">
                OpenClaw verbindet Issues, Repos und Deployments fuer nachvollziehbare Umsetzungsstrecken.
              </p>
            </article>
          </div>
        </section>

        <section className="rounded-xl p-7 text-center" style={{ border: '1px solid var(--wp-line, #D8D1C5)' }}>
          <h2 className="mb-3 text-2xl font-semibold">OpenClaw live testen</h2>
          <p className="mb-6 text-[16px] leading-relaxed opacity-60">
            Wir zeigen Ihnen in einer Demo, wie OpenClaw mit AIvalanche in Ihrem Stack produktiv arbeitet.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold"
            style={{ background: 'var(--wp-accent, #1DBF73)', color: 'var(--wp-bg, #F4F0E8)' }}>
            OpenClaw Demo anfragen
          </Link>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Footer />
    </>
  )
}
