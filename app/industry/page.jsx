
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import NewsLetter from '@/components/shared/NewsLetter'
import PageHero from '@/components/shared/PageHero'
import Industry from '@/components/shared/Industry'

export const metadata = {
  title: 'Industry Use Cases',
  description:
    'See how AIvalanche supports automotive, photonics, manufacturing, energy, robotics, and biomedicine teams with AI-assisted optimization workflows.',
  alternates: {
    canonical: '/industry',
  },
  openGraph: {
    title: 'Industry Use Cases | AIvalanche',
    description:
      'Discover how different industries apply AIvalanche for model calibration, optimization, and inverse design workflows.',
    url: 'https://aivalanche.com/industry',
    type: 'website',
  },
}

const Blog = () => {
  return (
    <>
      <SecondaryNavbar />
      <main>
        <PageHero subtitle="Industry applications" title="Integrated process design & optimization" />
        <Industry sectionDetails={false} />
        <NewsLetter />
      </main>
      <Footer />
    </>
  )
}

export default Blog
