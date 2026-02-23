import { cn } from '@/utils/cn'
import Providers from '@/utils/providers'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/scss/theme.scss'

const siteUrl = 'https://aivalanche.com'
const siteName = 'AIvalanche'
const defaultTitle = 'AIvalanche | KI-Agent fuer Unternehmen in Deutschland'
const defaultDescription =
  'AIvalanche ist ein KI-Agent fuer Unternehmen in Deutschland, Oesterreich und der Schweiz. OpenClaw-gestuetzte Workflows verbinden Slack, Microsoft Teams, WhatsApp und 3.000+ Tools fuer echte Ausfuehrung statt nur Antworten.'
const defaultOgImage = '/images/home-8-img/ai-hero.png'
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const inter = Inter({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: {
    default: defaultTitle,
    template: '%s | AIvalanche',
  },
  description: defaultDescription,
  keywords: [
    'ki agent deutschland',
    'ki agent unternehmen',
    'ki workflow automatisierung',
    'dsgvo ki agent',
    'ai agent deutschland',
    'enterprise ai automation',
    'workflow automation software',
    'slack ai agent',
    'microsoft teams ai agent',
    'whatsapp ai automation',
    'openclaw',
    'openclaw integration',
    'openclaw deutschland',
    'openclaw ki agent',
    'business process automation',
    'ai operations platform',
    'ki automatisierung',
    'aivalanche',
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'de-DE': '/',
      'de-AT': '/',
      'de-CH': '/',
      'en-US': '/?lang=en',
      'x-default': '/',
    },
  },
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: 'Business software',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    alternateLocale: ['de_AT', 'de_CH', 'en_US'],
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'AIvalanche AI agent platform preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/favicons/favicon.ico' },
      { url: '/images/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/images/favicons/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: '#B1E346',
}

export default function RootLayout({ children }) {
  const organizationId = `${siteUrl}/#organization`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: siteName,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo_svg_black.svg`,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'support@aivalanche.de',
            availableLanguage: ['de-DE', 'de-AT', 'de-CH', 'en-US'],
          },
        ],
        areaServed: [
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Country', name: 'Austria' },
          { '@type': 'Country', name: 'Switzerland' },
        ],
        knowsAbout: ['KI-Agenten', 'Workflow-Automatisierung', 'OpenClaw'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: defaultDescription,
        publisher: {
          '@id': organizationId,
        },
        inLanguage: ['de-DE', 'de-AT', 'de-CH', 'en-US'],
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: defaultTitle,
        description: defaultDescription,
        inLanguage: 'de-DE',
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
        about: ['KI-Agent fuer Unternehmen', 'OpenClaw', 'DSGVO-konforme Automatisierung'],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}/#software`,
        name: siteName,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Slack, Microsoft Teams, WhatsApp',
        description: defaultDescription,
        provider: {
          '@id': organizationId,
        },
        availableLanguage: ['de-DE', 'de-AT', 'de-CH', 'en-US'],
        keywords: 'KI Agent, OpenClaw, DSGVO, Workflow Automatisierung, Deutschland',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/PreOrder',
          description: 'Free early access waitlist',
        },
        featureList: [
          'Persistent AI agent for enterprise teams',
          '3,000+ tool integrations',
          'Slack, Teams, and WhatsApp deployment',
          'Proactive workflow automation',
          'Dedicated cloud workspace for execution',
          'GDPR-compliant operation',
        ],
      },
    ],
  }

  return (
    <html lang="de" className="light" style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Clear leftover next-themes dark class from localStorage */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{localStorage.removeItem('theme');document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}catch(e){}`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <meta name="format-detection" content="telephone=no" />
        <meta property="og:site_name" content={siteName} />
        <meta name="application-name" content={siteName} />
        <meta name="apple-mobile-web-app-title" content={siteName} />
      </head>
      <body
        className={cn('relative overflow-x-hidden text-base antialiased', inter.variable)}
        style={{ backgroundColor: '#F4F0E8', color: '#121417' }}>
        <Providers>
          <main className="flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
