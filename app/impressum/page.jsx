import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

export const metadata = {
  title: 'Impressum',
  description: 'Legal notice and company information for AIvalanche.',
  alternates: {
    canonical: '/impressum',
  },
}

export default function ImpressumPage() {
  return (
    <>
      <SecondaryNavbar />
      <main className="pt-32 pb-20">
        <section className="container max-w-3xl">
          <h1 className="text-4xl font-bold text-paragraph dark:text-white">Impressum</h1>
          <p className="mt-6 text-paragraph-light dark:text-white/75">
            AIvalanche
            <br />
            Enterprise AI Software
            <br />
            Contact: support@aivalanche.de
          </p>
          <p className="mt-4 text-paragraph-light dark:text-white/75">
            This page provides legal and contact information in line with applicable publishing and commercial
            regulations.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
