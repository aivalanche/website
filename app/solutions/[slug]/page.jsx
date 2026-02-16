import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import ServiceContent from '@/components/service/ServiceContent'
import NewsLetter from '@/components/shared/NewsLetter'
import ServiceList from '@/data/serviceData'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { ServiceData } = ServiceList
  const service = ServiceData.find((item) => item.slug === params.slug)

  if (!service) {
    return {
      title: 'Solution Not Found',
      robots: { index: false, follow: false },
    }
  }

  const title = `${service.title} Solution`
  const description =
    service.excerpt ||
    'Discover AIvalanche solutions for enterprise automation, deployment, and model optimization workflows.'

  return {
    title,
    description,
    alternates: {
      canonical: `/solutions/${service.slug}`,
    },
    openGraph: {
      title: `${title} | AIvalanche`,
      description,
      url: `https://aivalanche.com/solutions/${service.slug}`,
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
  const { ServiceData } = ServiceList
  return ServiceData.map((item) => ({
    slug: item.slug,
  }))
}

const ServiceDetails = (props) => {
  const { ServiceData } = ServiceList
  const slug = props.params.slug
  const data = ServiceData.find((post) => post.slug === slug)

  if (!data) {
    notFound()
  }

  return (
    <>
      <SecondaryNavbar />
      <main>
        <ServiceContent data={data} />
        {/* <MembersCounter />
        <Pricing className={'pt-150 max-md:pt-20'} /> */}
        <NewsLetter />
      </main>
      <Footer />
    </>
  )
}

export default ServiceDetails
