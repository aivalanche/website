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
  ]

  return (
    <footer className="relative bg-white dark:bg-dark-300 border-t border-borderColor dark:border-borderColor-dark pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-5">
              <Image
                src={FooterData.logo}
                alt="AIvalanche"
                width={120} height={34}
                className="block h-auto max-h-[34px] w-auto object-contain dark:hidden"
              />
              <Image
                src={FooterData.logoDark}
                alt="AIvalanche"
                width={120} height={34}
                className="hidden h-auto max-h-[34px] w-auto object-contain dark:block"
              />
            </Link>
            <p className="text-paragraph-light dark:text-white/70 text-sm leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
            <div className="flex gap-3 mt-5">
              {FooterData.socialLinks.map((social) => (
                <a key={social.id} href={social.link}
                  className="w-10 h-10 rounded-full border border-borderColor dark:border-borderColor-dark flex items-center justify-center text-paragraph-light dark:text-white/70 hover:bg-primary hover:text-white hover:border-primary transition-colors">
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-paragraph dark:text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-paragraph-light dark:text-white/70 hover:text-primary text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="text-paragraph dark:text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t.footer.legal}
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-paragraph-light dark:text-white/70 hover:text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${FooterData.email}`} className="text-paragraph-light dark:text-white/70 hover:text-primary text-sm transition-colors">
                  {t.footer.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-borderColor dark:border-borderColor-dark">
          <p className="text-paragraph-light dark:text-white/50 text-xs text-center">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer