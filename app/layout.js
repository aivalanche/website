import { cn } from '@/utils/cn'
import Providers from '@/utils/providers'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import './labflow.css'
import '@/scss/theme.scss'

const siteUrl = 'https://aivalanche.com'
const siteName = 'Labflow'
const defaultTitle = 'Labflow — Agentic control plane for electronic test & measurement'
const defaultDescription =
  'Labflow is the agentic control plane for electronic test & measurement. Drive SMUs, scopes, function generators, DAQs and supplies from one agent — wired by tools, governed by humans.'
const defaultOgImage = '/images/home-8-img/ai-hero.png'
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const archivo = Archivo({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
})
const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata = {
  title: {
    default: defaultTitle,
    template: '%s | AIvalanche',
  },
  description: defaultDescription,
  keywords: [
    'electronics lab automation',
    'AI lab instruments',
    'oscilloscope automation',
    'pulse generator automation',
    'Keithley SMU automation',
    'SCPI automation',
    'PyVISA AI agent',
    'lab report generation',
    'instrument control GUI',
    'Codex lab automation',
    'Claude lab automation',
    'Labflow',
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
  category: 'Engineering software',
  openGraph: {
    type: 'website',
    locale: 'en_US',
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
  themeColor: '#ff4d12',
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
            availableLanguage: ['en-US', 'de-DE'],
          },
        ],
        knowsAbout: ['AI lab automation', 'Electronics test instrumentation', 'SCPI', 'PyVISA', 'Codex', 'Claude'],
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
        inLanguage: ['en-US', 'de-DE'],
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: defaultTitle,
        description: defaultDescription,
        inLanguage: 'en-US',
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
        about: ['AI lab automation', 'Electronics lab instruments', 'Labflow'],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}/#software`,
        name: siteName,
        applicationCategory: 'EngineeringApplication',
        operatingSystem: 'Web, Python, PyVISA, SCPI, vendor APIs',
        description: defaultDescription,
        provider: {
          '@id': organizationId,
        },
        availableLanguage: ['en-US', 'de-DE'],
        keywords: 'AI lab automation, electronics lab instruments, SCPI, PyVISA, Codex, Claude, Labflow',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/PreOrder',
          description: 'Free early access waitlist',
        },
        featureList: [
          'AI control for oscilloscopes, pulse generators, Keithley SMUs, and analyzers',
          'Codex and Claude powered script generation',
          'SCPI, PyVISA, serial, TCP, and vendor API connectors',
          'Automated reports, plots, and generated GUIs',
          'Traceable instrument commands and measurement audit trails',
        ],
      },
    ],
  }

  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }} suppressHydrationWarning>
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
        className={cn('relative overflow-x-hidden text-base antialiased', archivo.variable, jetbrainsMono.variable)}
        style={{
          backgroundColor: '#ececea',
          color: '#0c0c0c',
          fontFamily: 'var(--font-archivo), system-ui, -apple-system, Segoe UI, sans-serif',
        }}>
        <Providers>
          <main className="flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
