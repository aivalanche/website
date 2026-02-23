import Link from 'next/link'
import Image from 'next/image'
import { FooterData } from '@/data/footer'
import { translations } from '@/utils/translations'

const Footer = ({ locale = 'de' }) => {
  const t = translations[locale]

  const navLinks = [
    { label: t.nav.features, href: '#features' },
    { label: t.nav.howItWorks, href: '#how-it-works' },
    { label: locale === 'de' ? 'Integrationen' : 'Integrations', href: '#integrations' },
    { label: t.nav.faq, href: '#faq' },
  ]

  const legalLinks = [
    { label: t.footer.privacy, href: '/privacy' },
    { label: t.footer.terms, href: '/terms' },
    { label: t.footer.imprint, href: '/impressum' },
    { label: 'Sitemap', href: '/sitemap' },
  ]

  return (
    <footer className="relative border-t border-borderColor bg-white pb-8 pt-16 dark:border-borderColor-dark dark:bg-dark-300">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="mb-5 inline-block">
              <Image
                src={FooterData.logo}
                alt="AIvalanche"
                width={120}
                height={34}
                className="block h-auto max-h-[34px] w-auto object-contain dark:hidden"
              />
              <Image
                src={FooterData.logoDark}
                alt="AIvalanche"
                width={120}
                height={34}
                className="hidden h-auto max-h-[34px] w-auto object-contain dark:block"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-paragraph-light dark:text-white/70">
              {t.footer.description}
            </p>
            <div className="mt-5 flex gap-3">
              {FooterData.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-borderColor text-paragraph-light transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-borderColor-dark dark:text-white/70">
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-paragraph dark:text-white">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-paragraph-light transition-colors hover:text-primary dark:text-white/70">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-paragraph dark:text-white">
              {t.footer.legal}
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-paragraph-light transition-colors hover:text-primary dark:text-white/70">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${FooterData.email}`}
                  className="text-sm text-paragraph-light transition-colors hover:text-primary dark:text-white/70">
                  {t.footer.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-borderColor pt-8 dark:border-borderColor-dark">
          <p className="text-center text-xs text-paragraph-light dark:text-white/50">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
