import ThemeSwitcher from '@/components/theme/ThemeSwitcher'
import { cn } from '@/utils/cn'
import Providers from '@/utils/providers'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import '@/scss/theme.scss'

const siteUrl = 'https://aivalanche.com'
const siteName = 'AIvalanche'
const defaultTitle = 'AIvalanche | AI Agent for Enterprise Operations'
const defaultDescription =
  'AIvalanche is an AI agent for enterprise teams that works in Slack, Microsoft Teams, and WhatsApp to automate operations, connect 3,000+ tools, and execute tasks end-to-end.'
const defaultOgImage = '/images/home-8-img/ai-hero.png'
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || process.env.NEXT_PUBLIC_GTAG_ID || 'G-MV87J7FP0N'
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
    'ai agent for enterprises',
    'enterprise ai automation',
    'ai coworker',
    'slack ai agent',
    'microsoft teams ai agent',
    'whatsapp ai automation',
    'workflow automation software',
    'business process automation',
    'ai operations platform',
    'gdpr compliant ai',
    'ki agent unternehmen',
    'ki automatisierung',
    'aivalanche',
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'de-DE': '/',
      'en-US': '/?lang=en',
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
    alternateLocale: ['en_US'],
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
            availableLanguage: ['de', 'en'],
          },
        ],
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
        inLanguage: ['de', 'en'],
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
        <script dangerouslySetInnerHTML={{ __html: `try{localStorage.removeItem('theme');document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}catch(e){}` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <meta name="format-detection" content="telephone=no" />
        <meta property="og:site_name" content={siteName} />
        <meta name="application-name" content={siteName} />
        <meta name="apple-mobile-web-app-title" content={siteName} />
      </head>
      <body
        className={cn(
          'relative overflow-x-hidden text-base antialiased',
          inter.variable,
          jakartaSans.variable,
          playfair.variable,
        )}
        style={{ backgroundColor: '#F4F0E8', color: '#121417' }}>
        <Providers>
          <main className="flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
