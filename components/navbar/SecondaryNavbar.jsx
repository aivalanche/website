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
      <div className={cn(
        'fixed left-0 z-50 w-full transition-all duration-500 max-md:z-[500]',
        sticky
          ? 'bg-white/80 dark:bg-dark-300/80 backdrop-blur-lg border-b border-borderColor dark:border-borderColor-dark shadow-nav'
          : 'bg-transparent',
      )}>
        <nav className="container relative flex items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo_svg_black.svg"
              alt="AIvalanche"
              width={120} height={34}
              className="block h-auto max-h-[34px] w-auto object-contain dark:hidden"
              priority
            />
            <Image
              src="/images/logo_svg_white.svg"
              alt="AIvalanche"
              width={120} height={34}
              className="hidden h-auto max-h-[34px] w-auto object-contain dark:block"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1 ml-12">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a href={item.path}
                  className="px-4 py-2 text-sm font-medium text-paragraph-light dark:text-white/70 hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            <button onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-paragraph-light dark:text-white/70 hover:text-primary transition-colors"
              title={locale === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}>
              <Globe className="w-4 h-4" />
              <span className="uppercase">{locale === 'de' ? 'EN' : 'DE'}</span>
            </button>

            <button onClick={scrollToWaitlist}
              className="hidden sm:flex items-center bg-primary hover:bg-primary-200 text-paragraph text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40">
              {t.nav.joinWaitlist}
            </button>

            <button className="lg:hidden ml-2 text-paragraph dark:text-white" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenu && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-dark-200 border-b border-borderColor dark:border-borderColor-dark shadow-box lg:hidden">
              <ul className="flex flex-col p-4 gap-1">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <a href={item.path} onClick={() => setMobileMenu(false)}
                      className="block px-4 py-3 text-paragraph dark:text-white hover:bg-primary/5 rounded-lg transition-colors">
                      {item.title}
                    </a>
                  </li>
                ))}
                <li className="mt-2">
                  <button onClick={() => { setMobileMenu(false); scrollToWaitlist?.() }}
                    className="w-full px-6 py-3 bg-primary hover:bg-primary-200 text-paragraph font-semibold rounded-full transition-all">
                    {t.nav.joinWaitlist}
                  </button>
                </li>
                <li className="mt-1">
                  <button onClick={() => { toggleLocale(); setMobileMenu(false) }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-borderColor dark:border-borderColor-dark text-paragraph dark:text-white rounded-full">
                    <Globe className="w-4 h-4" />
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
