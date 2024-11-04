import ProcessInstallation from '@/components/home-4/ProcessInstallation'
import DataIntegration from '@/components/home-4/DataIntegration'
import Hero from '@/components/home-4/Hero'
import CallToAction from '@/components/shared/CallToAction'
import MembersCounter from '@/components/shared/MembersCounter'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import Footer from '@/components/footer/Footer'
import RobustFeatures from '@/components/home-8/RubustFeature'
import Approach from '@/components/home-6/Approach'



export const metadata = {
  title: 'aivalanche',
}

const HomePage4 = () => {
  return (
    <>
      <SecondaryNavbar />
      <main>
        <Hero />
        <DataIntegration />
        {/* <ShareClientMarquee /> */}

        <RobustFeatures />

        <ProcessInstallation />
        {/* <MembersCounter /> */}
        <Approach />

        {/* <Feature /> */}
        {/* <TeamMembers />

        <ServiceCardWithLeftText /> */}

        {/* <FAQWithLeftText />
        <TopIntegration /> */}

        {/* <FinancialBlog className="pb-150 pt-150 dark:bg-dark-300" /> */}
        {/* <CallToAction title="Deliver Simulation Models On Time. Stay Ahead Of Competition" /> */}
      </main>
      <Footer />
    </>
  )
}

export default HomePage4
