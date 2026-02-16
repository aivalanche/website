import LocaleProvider from '@/components/home/LocaleProvider'
import HomePageClient from '@/components/home/HomePageClient'

export default function HomePage() {
  return (
    <LocaleProvider>
      <HomePageClient />
    </LocaleProvider>
  )
}
