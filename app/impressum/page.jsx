import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

export const metadata = {
  title: 'Impressum',
  description: 'Impressum und rechtliche Angaben zu AIvalanche.',
  alternates: { canonical: '/impressum' },
}

export default function ImpressumPage() {
  return (
    <>
      <SecondaryNavbar />
      <main className="mx-auto max-w-[800px] px-6 py-32">
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">Impressum</h1>
        <div className="space-y-4 text-[16px] leading-relaxed opacity-55">
          <p>
            AIvalanche
            <br />
            KI-Software fuer Unternehmen
            <br />
            Contact: support@aivalanche.de
          </p>
          <p>
            Diese Seite stellt rechtliche Pflichtangaben und Kontaktinformationen gemaess geltenden Vorschriften bereit.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
