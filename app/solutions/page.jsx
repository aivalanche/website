import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import NewsLetter from '@/components/shared/NewsLetter'
import PageHero from '@/components/shared/PageHero'
import Services from '@/components/shared/Services'

export const metadata = {
  title: 'Enterprise AI Solutions',
  description:
    'Explore AIvalanche deployment options and managed services: on-site deployment, cloud web app access, and expert calibration support.',
  alternates: {
    canonical: '/solutions',
  },
  openGraph: {
    title: 'Enterprise AI Solutions | AIvalanche',
    description:
      'Compare AIvalanche service models for enterprise teams, from secure on-site deployment to cloud access and managed optimization support.',
    url: 'https://aivalanche.com/solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise AI Solutions | AIvalanche',
    description:
      'Compare on-site, cloud, and managed AIvalanche deployment options for enterprise operations and engineering teams.',
  },
}
export default function ServicePage() {
  return (
    <>
      <SecondaryNavbar />
      <main>
        <PageHero
          subtitle="OUR SOLUTIONS"
          title="Custom made solutions for your business"
          paragraph="Transform Your Processes with Precision and Efficiency"
        />
        <Services sectionDetails={false} />
        {/* <MembersCounter /> */}
        {/* <Pricing className={'pt-150 max-md:pt-20'} /> */}
        <NewsLetter />
      </main>
      <Footer />
    </>
  )
}
