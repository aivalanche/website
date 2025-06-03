'use client'
import { cn } from '@/utils/cn'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import SearchOption from './SearchOption'
import NavbarItem from '@/data/navbar'

const { menuData } = NavbarItem
// Simplified navigation data
const simplifiedMenu = {
  logoLight: menuData.logoLight, // Update with your actual logo path
  logoDark: menuData.logoDark,   // Update with your actual logo path
  menuItems: [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'LabFlow', path: '/#instrumentation-agent' },
    { id: 3, title: 'OpticFlow', path: '/#inverse-optical-design' },
    { id: 4, title: 'Sfera', path: '/#bsim4-optimizer' },
    { id: 6, title: 'Contact Us', path: '/contact' },
  ]
};

const SecondaryNavbar = ({ hideTopBar = false }) => {

  const pathname = usePathname()
  const [showSearch, setShowSearch] = useState(false)
  const [innerMobileMenu, setInnerMobileMenu] = useState(false)
  const [sticky, setSticky] = useState(false)

  const handleStickyNavbar = () => {
    if (window.scrollY >= 20) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleStickyNavbar)

    const hideTimer = setTimeout(() => {
      setSticky(true)
    }, 1500)

    return () => {
      window.removeEventListener('scroll', handleStickyNavbar)
      clearTimeout(hideTimer)
    }
  }, [sticky])

  return (
    <header>
      <div
        className={cn(
          'fixed left-0 z-50 w-full bg-transparent transition-all duration-500 max-md:z-[500] nav-sticky',
        )}>
        <nav className="container relative flex items-center">
          {/* Logo */}
          <div className="nav-logo">
            <Link href="/">
              <Image src={menuData.logoLight} alt="logo" className="dark:hidden" width={70} height={29} />
              <Image
                src={simplifiedMenu.logoDark}
                alt="logo dark version"
                className="hidden dark:inline-block"
                width={70}
                height={29}
              />
            </Link>
          </div>

          {/* Main Navigation - Desktop */}
          <ul className="nav-list hidden lg:ml-7 lg:flex xl:ml-15 [&>*:not(:last-child)]:me-1">
            {simplifiedMenu.menuItems.map((menuItem) => (
              <li key={menuItem.id}>
                <Link
                  href={menuItem.path}
                  className={cn(
                    'flex items-center rounded-large border border-transparent px-5 py-[5px] font-Inter text-base font-medium capitalize leading-8 text-paragraph transition-colors duration-500 hover:border-borderColor hover:bg-white hover:duration-500 dark:text-white dark:hover:border-borderColor/10 dark:hover:bg-dark-200 lg:px-4 xl:px-5',
                    pathname === menuItem.path ? 'active' : '',
                  )}>
                  {menuItem.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Combined Contact/Demo Button */}
          <div className="ml-auto flex items-center">
            <Link
              href="/request-demo"
              className="btn btn-navbar btn-sm text-white bg-primary hover:bg-primary-200 transition-colors duration-300"
            >
              Request Demo
            </Link>

            {/* Mobile Menu Toggle */}
            <div className="ml-4 max-lg:inline-block lg:hidden">
              <button
                className="mobile-menu-button relative h-10 w-10 rounded-full bg-white outline-none dark:bg-dark-200"
                onClick={() => setInnerMobileMenu(!innerMobileMenu)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="14"
                  viewBox="0 0 22 14"
                  fill="none"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <path
                    d="M0 1C0 0.447715 0.447715 0 1 0H21C21.5523 0 22 0.447715 22 1C22 1.55228 21.5523 2 21 2H1C0.447716 2 0 1.55228 0 1Z"
                    fill=""
                    className="fill-paragraph dark:fill-white"
                  />
                  <path
                    d="M8 7C8 6.44772 8.44772 6 9 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H9C8.44772 8 8 7.55228 8 7Z"
                    fill=""
                    className="fill-paragraph dark:fill-white"
                  />
                  <path
                    d="M4 13C4 12.4477 4.44772 12 5 12H21C21.5523 12 22 12.4477 22 13C22 13.5523 21.5523 14 21 14H5C4.44772 14 4 13.5523 4 13Z"
                    fill=""
                    className="fill-paragraph dark:fill-white"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu max-lg:overflow-y-auto ${innerMobileMenu ? 'open' : ''}`}>
            <button
              className="navbar-toggle-close absolute right-6 top-5 h-10 w-10 rounded-full bg-white outline-none dark:bg-dark-200"
              onClick={() => setInnerMobileMenu(!innerMobileMenu)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <ul className="nav-list flex w-full max-w-[500px] flex-col gap-5 landscape:h-full">
              {simplifiedMenu.menuItems.map((menuItem) => (
                <li key={menuItem.id}>
                  <Link
                    href={menuItem.path}
                    className={cn(
                      'flex items-center rounded-large border border-transparent px-5 py-[5px] font-Inter text-base font-medium leading-8 text-paragraph transition-colors duration-500 hover:border-borderColor hover:bg-white hover:duration-500 dark:text-white dark:hover:border-borderColor/10 dark:hover:bg-dark-200 lg:px-4 xl:px-5',
                      pathname === menuItem.path ? 'active' : '',
                    )}
                    onClick={() => setInnerMobileMenu(!innerMobileMenu)}>
                    {menuItem.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/request-demo" className="btn btn-navbar btn-sm text-white bg-primary hover:bg-primary-200 transition-colors duration-300">
                  Request Demo
                </Link>
              </li>
              <li>
                <Link href="/contact" className="btn btn-outline btn-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {showSearch && createPortal(<SearchOption onClose={() => setShowSearch(false)} />, document.body)}
    </header>
  )
}

export default SecondaryNavbar