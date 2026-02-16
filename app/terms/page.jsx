import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

export const metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions for using AIvalanche products and services.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsPage() {
  return (
    <>
      <SecondaryNavbar />
      <main className="pt-32 pb-20">
        <section className="container max-w-3xl">
          <h1 className="text-4xl font-bold text-paragraph dark:text-white">Terms and Conditions</h1>
          <p className="mt-6 text-paragraph-light dark:text-white/75">
            These terms govern the use of AIvalanche products, websites, and related services. By using our services,
            you agree to comply with applicable laws and to use the platform responsibly.
          </p>
          <p className="mt-4 text-paragraph-light dark:text-white/75">
            For support or legal questions, contact us at{' '}
            <a className="text-primary underline" href="mailto:support@aivalanche.de">
              support@aivalanche.de
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
