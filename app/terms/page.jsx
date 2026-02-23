import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

export const metadata = {
  title: 'AGB und Nutzungsbedingungen | AIvalanche',
  description: 'Allgemeine Geschaeftsbedingungen und Nutzungsbedingungen fuer AIvalanche.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <>
      <SecondaryNavbar />
      <main className="mx-auto max-w-[800px] px-6 py-32">
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">AGB und Nutzungsbedingungen</h1>
        <p className="mb-4 text-[16px] leading-relaxed opacity-55">
          Diese Bedingungen regeln die Nutzung von AIvalanche-Produkten, Websites und zugehoerigen Services. Mit der
          Nutzung stimmen Sie zu, geltende Gesetze einzuhalten und die Plattform verantwortungsvoll einzusetzen.
        </p>
        <p className="text-[16px] leading-relaxed opacity-55">
          Fuer Support oder rechtliche Fragen erreichen Sie uns unter{' '}
          <a
            className="underline transition-opacity hover:opacity-100"
            href="mailto:support@aivalanche.de"
            style={{ color: 'var(--wp-accent, #1DBF73)' }}>
            support@aivalanche.de
          </a>
          .
        </p>
      </main>
      <Footer />
    </>
  )
}
