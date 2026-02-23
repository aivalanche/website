import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

export const metadata = {
  title: 'Contact AIvalanche',
  description:
    'Talk with the AIvalanche team about enterprise AI agent deployment, tool integrations, pricing, and onboarding.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact AIvalanche',
    description: 'Get in touch with AIvalanche for enterprise AI agent setup, integrations, and support.',
    url: 'https://aivalanche.com/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <>
      <SecondaryNavbar />
      <main className="max-w-[800px] mx-auto px-6 py-32">
        <p className="text-[11px] tracking-[0.15em] uppercase opacity-30 mb-3">Kontakt</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h1>
        <p className="text-[16px] opacity-55 leading-relaxed mb-12">
          Have questions about AIvalanche? Want a demo or need help with integration?
          Reach out to our team.
        </p>
        <div className="space-y-4" style={{ borderTop: '1px solid var(--wp-line, #D8D1C5)', paddingTop: '2rem' }}>
          <div>
            <p className="text-sm font-semibold">Email</p>
            <a href="mailto:hello@aivalanche.com" className="text-sm opacity-55 hover:opacity-100 transition-opacity">hello@aivalanche.com</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
