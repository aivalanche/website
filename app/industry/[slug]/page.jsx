import Head from 'next/head'

import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import NewsLetter from '@/components/shared/NewsLetter'
import IndustryContent from '@/components/industry/IndustryContent'

import IndustryList from '@/data/industryData'



export async function generateStaticParams() {
  const { IndustryData } = IndustryList

  return IndustryData.map((item) => ({
    slug: item.slug,
  }))
}



const IndustryDetails = (props) => {
  const { IndustryData } = IndustryList
  // console.log("IndustryData", IndustryData)

  const dataFolder = 'content/blogs/'
  const slug = props.params.slug
  const data = IndustryData.find((post) => post.slug === slug)
  // const postParams = blog.data
  return (
    <>
      <SecondaryNavbar />
      <main>
        <IndustryContent data={data} />
        {/* <MembersCounter />
        <Pricing className={'pt-150 max-md:pt-20'} /> */}
        <NewsLetter />
      </main>
      <Footer />
    </>
  )
}

export default IndustryDetails
