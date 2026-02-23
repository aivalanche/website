import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

export const metadata = {
  title: 'Impressum',
  description: 'Legal notice and company information for AIvalanche.',
  alternates: { canonical: '/impressum' },
}

export default function ImpressumPage() {
  return (
    <>
      <SecondaryNavbar />
      <main className="max-w-[800px] mx-auto px-6 py-32">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Impressum</h1>
        <div className="text-[16px] opacity-55 leading-relaxed space-y-4">
          <p>
            AIvalanche<br />
            Enterprise AI Software<br />
            Contact: support@aivalanche.de
          </p>
          <p>
            This page provides legal and contact information in line with applicable publishing and commercial
            regulations.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
