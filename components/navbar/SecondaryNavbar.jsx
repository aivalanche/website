'use client'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Globe, Menu, X } from 'lucide-react'
import { translations } from '@/utils/translations'

const SecondaryNavbar = ({ locale = 'de', setLocale, scrollToWaitlist, hideTopBar = false }) => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [sticky, setSticky] = useState(false)
  const t = translations[locale]

  const menuItems = [
    { id: 1, title: t.nav.features, path: '#features' },
    { id: 2, title: t.nav.howItWorks, path: '#how-it-works' },
    { id: 3, title: t.nav.useCases, path: '#use-cases' },
    { id: 4, title: locale === 'de' ? 'Integrationen' : 'Integrations', path: '#integrations' },
    { id: 5, title: t.nav.faq, path: '#faq' },
  ]

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLocale = () => setLocale(locale === 'de' ? 'en' : 'de')

  return (
    <header className="relative overflow-x-clip">
      <div
        className={cn(
          'fixed left-0 z-50 w-full transition-all duration-500 max-md:z-[500]',
          sticky
            ? 'border-b border-borderColor bg-white/80 shadow-nav backdrop-blur-lg dark:border-borderColor-dark dark:bg-dark-300/80'
            : 'bg-transparent',
        )}>
        <nav className="container relative flex items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo_svg_black.svg"
              alt="AIvalanche"
              width={120}
              height={34}
              className="block h-auto max-h-[34px] w-auto object-contain dark:hidden"
              priority
            />
            <Image
              src="/images/logo_svg_white.svg"
              alt="AIvalanche"
              width={120}
              height={34}
              className="hidden h-auto max-h-[34px] w-auto object-contain dark:block"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="ml-12 hidden items-center gap-1 lg:flex">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.path}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-paragraph-light transition-colors hover:bg-primary/5 hover:text-primary dark:text-white/70">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-paragraph-light transition-colors hover:text-primary dark:text-white/70"
              title={locale === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}>
              <Globe className="h-4 w-4" />
              <span className="uppercase">{locale === 'de' ? 'EN' : 'DE'}</span>
            </button>

            <button
              onClick={scrollToWaitlist}
              className="hidden items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-paragraph shadow-md shadow-primary/30 transition-all duration-300 hover:bg-primary-200 hover:shadow-lg hover:shadow-primary/40 sm:flex">
              {t.nav.joinWaitlist}
            </button>

            <button
              className="ml-2 text-paragraph dark:text-white lg:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenu && (
            <div className="absolute left-0 right-0 top-full border-b border-borderColor bg-white shadow-box dark:border-borderColor-dark dark:bg-dark-200 lg:hidden">
              <ul className="flex flex-col gap-1 p-4">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.path}
                      onClick={() => setMobileMenu(false)}
                      className="block rounded-lg px-4 py-3 text-paragraph transition-colors hover:bg-primary/5 dark:text-white">
                      {item.title}
                    </a>
                  </li>
                ))}
                <li className="mt-2">
                  <button
                    onClick={() => {
                      setMobileMenu(false)
                      scrollToWaitlist?.()
                    }}
                    className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-paragraph transition-all hover:bg-primary-200">
                    {t.nav.joinWaitlist}
                  </button>
                </li>
                <li className="mt-1">
                  <button
                    onClick={() => {
                      toggleLocale()
                      setMobileMenu(false)
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-borderColor px-6 py-3 text-paragraph dark:border-borderColor-dark dark:text-white">
                    <Globe className="h-4 w-4" />
                    {locale === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default SecondaryNavbar
