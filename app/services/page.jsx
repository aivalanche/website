import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import MembersCounter from '@/components/shared/MembersCounter'
import NewsLetter from '@/components/shared/NewsLetter'
import PageHero from '@/components/shared/PageHero'
import Pricing from '@/components/shared/Pricing'
import Services from '@/components/shared/Services'

export const metadata = {
  title: 'Services',
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
