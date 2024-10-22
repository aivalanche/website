import Head from 'next/head'

import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import NewsLetter from '@/components/shared/NewsLetter'
import PageHero from '@/components/shared/PageHero'
import getMarkDownContent from '@/utils/getMarkDownContent'
import getMarkDownData from '@/utils/getMarkDownData'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import IndustryList from '@/data/industryData'



export async function generateStaticParams() {
  const { IndustryData } = IndustryList

  return IndustryData.map((item) => ({
    slug: item.slug,
  }))
}



const BlogDetails = (props) => {
  const { IndustryData } = IndustryList
  console.log("IndustryData", IndustryData)

  const dataFolder = 'content/blogs/'
  const slug = props.params.slug
  const data = IndustryData.find((post) => post.slug === slug)
  // const postParams = blog.data
  return (
    <>
      <SecondaryNavbar />
      <main>
        <PageHero title={data.title} />
        <article className="relative pb-150">
          <div className="absolute -top-[250px] left-1/2 -z-10 h-[550px] w-full -translate-x-1/2  bg-[url('/images/hero-gradient.png')] bg-cover bg-center bg-no-repeat opacity-70 md:hidden"></div>
          <div className="container relative ">
            <div className="absolute left-1/2 top-20 -z-10 flex -translate-x-1/2 -translate-y-1/2 max-md:hidden max-md:-translate-y-0 max-md:flex-col">
              <div className="rounded-full bg-primary-200/20 blur-[145px] max-1xl:h-[335px] max-1xl:w-[335px] 1xl:h-[442px] 1xl:w-[442px]"></div>
              <div className="-ml-[170px] rounded-full bg-primary-200/25 blur-[145px] max-1xl:h-[335px] max-1xl:w-[335px] max-md:ml-0 1xl:h-[442px] 1xl:w-[442px]"></div>
              <div className="-ml-[170px] rounded-full bg-primary-200/20 blur-[145px] max-1xl:h-[335px] max-1xl:w-[335px] max-md:ml-0 1xl:h-[442px] 1xl:w-[442px]"></div>
            </div>

            <div className="mb-16 overflow-hidden rounded-medium bg-white p-2.5 shadow-box dark:bg-dark-200 max-md:h-[400px]">
              <Image
                src={data.iconLight}
                alt="about images"
                className="w-full rounded  max-md:h-full max-md:object-cover max-md:object-center"
                width={1000}
                height={550}
              />
            </div>
            <div className="blog-details">
              <h2>{data.firstParagraph.title}</h2>
              <div className="mb-12 flex items-center gap-x-2 ">
                <p>{data.firstParagraph.content}</p>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="5" height="6" viewBox="0 0 5 6" fill="none">
                    <circle cx="2.5" cy="3" r="2.5" fill="" className="fill-[#D8DBD0] dark:fill-[#3B3C39]" />
                  </svg>
                </span>
                <p>{data.date}</p>
              </div>
            </div>
            <div className="blog-details">


              <h2>{data.secondParagraph.title}</h2>
              <div className="mb-12 flex items-center gap-x-2 ">
                <p>{data.secondParagraph.content}</p>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="5" height="6" viewBox="0 0 5 6" fill="none">
                    <circle cx="2.5" cy="3" r="2.5" fill="" className="fill-[#D8DBD0] dark:fill-[#3B3C39]" />
                  </svg>
                </span>
                <p>{data.date}</p>
              </div>
            </div>
            <div className="blog-details-body">
              <ReactMarkdown>{data.content}</ReactMarkdown>
            </div>
          </div>
        </article>
        <NewsLetter />
      </main>
      <Footer />
    </>
  )
}

export default BlogDetails
