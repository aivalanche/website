import Feature from '@/components/home-4/Feature'
import ProcessInstallation from '@/components/home-4/ProcessInstallation'
import ServiceCardWithLeftText from '@/components/home-4/ServiceCardWithLeftText'
import ShareClientMarquee from '@/components/home-4/ShareClientMarquee'
import DataIntegration from '@/components/home-4/DataIntegration'
import Hero from '@/components/home-4/Hero'
import CallToAction from '@/components/shared/CallToAction'
import FinancialBlog from '@/components/shared/FinancialBlog'
import MembersCounter from '@/components/shared/MembersCounter'
import TeamMembers from '@/components/shared/TeamMembers'
import FAQWithLeftText from '@/components/home-4/FAQWithLeftText'
import TopIntegration from '@/components/home-4/TopIntegration'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import Footer from '@/components/footer/Footer'
import RobustFeatures from '@/components/home-8/RubustFeature'
import Approach from '@/components/home-6/Approach'



export const metadata = {
  title: 'Analytics',
}

const HomePage4 = () => {
  return (
    <>
      <SecondaryNavbar hideTopBar />
      <main>
        <Hero />
        <DataIntegration />
        {/* <ShareClientMarquee /> */}

        <RobustFeatures />

        <ProcessInstallation />
        <MembersCounter />
        <Approach />

        {/* <Feature /> */}
        {/* <TeamMembers />

        <ServiceCardWithLeftText /> */}

        {/* <FAQWithLeftText />
        <TopIntegration /> */}

        {/* <FinancialBlog className="pb-150 pt-150 dark:bg-dark-300" /> */}
        <CallToAction title="Deliver Simulation Models On Time. Stay Ahead Of Competition" />
      </main>
      <Footer />
    </>
  )
}

export default HomePage4
