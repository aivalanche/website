import { FooterData } from '@/data/footer'
import footerSeperator from '@/public/images/footer-seperator.svg'
import footerSeperatorDark from '@/public/images/footer-seperator-dark.svg'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  // Updated footer links
  const productLinks = [
    { id: 1, name: 'LabFlow', link: '/#instrumentation-agent' },
    { id: 2, name: 'OpticFlow', link: '/#inverse-optical-design' },
    { id: 3, name: 'Sfera', link: '/#bsim4-optimizer' },
  ];

  return (
    <footer className="relative overflow-hidden bg-white pt-20 dark:bg-dark-300">
      <div className="container">
        <div className="mb-20 grid grid-cols-12 gap-4 max-lg:gap-y-10 max-lg:text-center">
          <div className="col-span-12 lg:col-span-6">
            <Image src={FooterData.logo} alt="logo" className="mb-10 inline-block dark:hidden" width={70} height={29} />
            <Image
              src={FooterData.logoDark}
              alt="logo dark version"
              className="mb-10 hidden dark:inline-block"
              width={70}
              height={29}
            />
            <p className="max-w-[350px] text-paragraph dark:text-white/80 max-lg:mx-auto">
              Enterprise-grade AI tools for engineering excellence. Accelerate your R&D cycles with our specialized solutions.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-2 lg:col-start-9">
            <h3 className="mb-8 text-lg font-medium text-paragraph dark:text-white">Products</h3>
            <ul className="[&>*:not(:last-child)]:mb-3">
              {productLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className="relative inline-block overflow-hidden text-base capitalize text-paragraph before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-right before:scale-x-0 before:bg-paragraph before:transition-transform before:duration-500 before:content-[''] before:hover:origin-left before:hover:scale-x-100 dark:text-white/80 dark:before:bg-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-2 lg:col-start-11">
            <h3 className="mb-8 text-lg font-medium text-paragraph dark:text-white">Get In Touch</h3>
            <p className="mb-3 text-paragraph dark:text-white/80">Need Support?</p>
            <p className="mb-3">
              <Link
                href={`mailto:${FooterData.email}`}
                className="relative inline-block overflow-hidden text-base text-paragraph before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-right before:scale-x-0 before:bg-paragraph before:transition-transform before:duration-500 before:content-[''] before:hover:origin-left before:hover:scale-x-100 dark:text-white/80 dark:before:bg-white">
                {FooterData.email}
              </Link>
            </p>
            <p className="mb-3">
              <Link
                href={`tel:${FooterData.phone.split(' ').join('')}`}
                className="relative inline-block overflow-hidden text-base capitalize text-paragraph before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-right before:scale-x-0 before:bg-paragraph before:transition-transform before:duration-500 before:content-[''] before:hover:origin-left before:hover:scale-x-100 dark:text-white/80 dark:before:bg-white">
                {FooterData.phone}
              </Link>
            </p>
            <ul className="social-link flex items-center gap-4 max-lg:justify-center">
              {FooterData.socialLinks.map((items) => (
                <li key={items.id}>
                  <Link href={items.link} className="transiton-all text-paragraph dark:text-white/80">
                    {items.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rest of the footer content remains unchanged */}
        <div className="seperator">
          <Image
            src={footerSeperator}
            alt="footer-seperator"
            className="w-full object-cover dark:hidden max-md:h-[1px]"
          />
          <Image
            src={footerSeperatorDark}
            alt="footer-seperator"
            className="hidden w-full object-cover dark:block max-md:h-[1px]"
          />
        </div>

        <div className="py-10 max-lg:text-center">
          <div className="flex max-lg:flex-col lg:items-center">
            <p className="text-paragraph dark:text-white/80 max-lg:mb-10">{FooterData.copyright}</p>
            <ul className="flex items-center gap-15 max-lg:justify-center lg:ml-auto">
              <li>
                <Link
                  href="/privacy"
                  className="relative inline-block overflow-hidden text-base capitalize text-paragraph before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-right before:scale-x-0 before:bg-paragraph before:transition-transform before:duration-500 before:content-[''] before:hover:origin-left before:hover:scale-x-100 dark:text-white/80 dark:before:bg-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="relative inline-block overflow-hidden text-base capitalize text-paragraph before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-right before:scale-x-0 before:bg-paragraph before:transition-transform before:duration-500 before:content-[''] before:hover:origin-left before:hover:scale-x-100 dark:text-white/80 dark:before:bg-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer