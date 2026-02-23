import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import getMarkDownData from '@/utils/getMarkDownData'
import ReactMarkdown from 'react-markdown'

export const metadata = {
  title: 'Privacy Policy',
  description:
    'Read the AIvalanche privacy policy and data handling practices for enterprise AI workflows and integrations.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

export default function Privacy() {
  const privacy = getMarkDownData('content/privacy/')
  return (
    <>
      <SecondaryNavbar />
      <main className="max-w-[800px] mx-auto px-6 py-32">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Privacy Policy</h1>
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
