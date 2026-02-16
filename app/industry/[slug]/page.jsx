import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import IndustryContent from '@/components/industry/IndustryContent'
import NewsLetter from '@/components/shared/NewsLetter'
import IndustryList from '@/data/industryData'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { IndustryData } = IndustryList
  const industry = IndustryData.find((item) => item.slug === params.slug)

  if (!industry) {
    return {
      title: 'Industry Page Not Found',
      robots: { index: false, follow: false },
    }
  }

  const title = `${industry.title} AI Use Case`
  const description =
    industry.excerpt ||
    'Explore how AIvalanche supports industry workflows with calibration, optimization, and inverse design automation.'

  return {
    title,
    description,
    alternates: {
      canonical: `/industry/${industry.slug}`,
    },
    openGraph: {
      title: `${title} | AIvalanche`,
      description,
      url: `https://aivalanche.com/industry/${industry.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | AIvalanche`,
      description,
    },
  }
}

export async function generateStaticParams() {
  const { IndustryData } = IndustryList
  return IndustryData.map((item) => ({
    slug: item.slug,
  }))
}

const IndustryDetailsPage = ({ params }) => {
  const { IndustryData } = IndustryList
  const data = IndustryData.find((item) => item.slug === params.slug)

  if (!data) {
    notFound()
  }

  return (
    <>
      <SecondaryNavbar />
      <main>
        <IndustryContent data={data} />
        <NewsLetter />
      </main>
      <Footer />
    </>
  )
}

export default IndustryDetailsPage
