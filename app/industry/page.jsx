
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import NewsLetter from '@/components/shared/NewsLetter'
import PageHero from '@/components/shared/PageHero'
import getMarkDownData from '@/utils/getMarkDownData'
import Industry from '@/components/shared/Industry'

export const metadata = {
  title: 'Industry',
}

const Blog = () => {
  const blogs = getMarkDownData('content/blogs')
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
