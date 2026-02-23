import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import getMarkDownData from '@/utils/getMarkDownData'
import ReactMarkdown from 'react-markdown'

export const metadata = {
  title: 'Datenschutz | AIvalanche',
  description:
    'Datenschutzrichtlinie fuer AIvalanche und OpenClaw-gestuetzte KI-Workflows inklusive Datenverarbeitung, Sicherheit und DSGVO-Hinweisen.',
  keywords: ['datenschutz ki agent', 'dsgvo ai agent', 'openclaw datenschutz'],
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

export default function Privacy() {
  const privacy = getMarkDownData('content/privacy/')
  return (
    <>
      <SecondaryNavbar />
      <main className="mx-auto max-w-[800px] px-6 py-32">
        <h1 className="mb-10 text-3xl font-bold md:text-4xl">Datenschutz</h1>
        <div className="prose prose-sm max-w-none opacity-70">
          {privacy.map((item) => (
            <div key={item.slug}>
              <ReactMarkdown className="mb-6">{item.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
