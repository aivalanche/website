import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

export const metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions for using AIvalanche products and services.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <>
      <SecondaryNavbar />
      <main className="max-w-[800px] mx-auto px-6 py-32">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms and Conditions</h1>
        <p className="text-[16px] opacity-55 leading-relaxed mb-4">
          These terms govern the use of AIvalanche products, websites, and related services. By using our services,
          you agree to comply with applicable laws and to use the platform responsibly.
        </p>
        <p className="text-[16px] opacity-55 leading-relaxed">
          For support or legal questions, contact us at{' '}
          <a className="underline hover:opacity-100 transition-opacity" href="mailto:support@aivalanche.de"
            style={{ color: 'var(--wp-accent, #1DBF73)' }}>
            support@aivalanche.de
          </a>.
        </p>
      </main>
      <Footer />
    </>
  )
}
