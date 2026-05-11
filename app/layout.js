import { cn } from '@/utils/cn'
import Providers from '@/utils/providers'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import Tracker from '@/components/labflow/Tracker'
import './globals.css'
import './labflow.css'
import '@/scss/theme.scss'

const siteUrl = 'https://aivalanche.com'
const siteName = 'Labflow'
const defaultTitle = 'Labflow — The AI agent that talks to your lab instruments'
const defaultDescription =
  'Labflow is the AI agent for electronic test & measurement. Drive oscilloscopes, source-measure units (Keithley, Keysight), function generators, power supplies, DMMs and DAQs with natural language — SCPI and VISA underneath, human-in-the-loop safety on top, signed reports out the other side.'
const defaultOgImage = '/images/labflow-control-diagram-generated.webp'
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
    template: '%s · Labflow',
  },
  description: defaultDescription,
  keywords: [
    'AI agent for lab instruments',
    'AI for oscilloscope',
    'AI for Keithley SMU',
    'AI for function generator',
    'natural language SCPI',
    'LLM lab automation',
    'agentic lab automation',
    'electronics lab automation',
    'PyVISA AI agent',
    'SCPI automation',
    'VISA automation',
    'test and measurement automation',
    'Keithley 2400 automation',
    'Tektronix MSO64 automation',
    'Keysight oscilloscope automation',
    'Rigol DG1022Z automation',
    'instrument control software',
    'lab report automation',
    'SMU automation',
    'DAQ automation',
    'power supply automation',
    'Labflow',
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
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
        alt: 'Labflow — agentic control plane wiring lab instruments to one AI agent',
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/labflow-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/labflow-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/labflow-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/labflow-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/images/logo_svg_black.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#ff4d12',
}

export default function RootLayout({ children }) {
  const organizationId = `${siteUrl}/#organization`
  const websiteId = `${siteUrl}/#website`
  const softwareId = `${siteUrl}/#software`

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
          url: `${siteUrl}/icons/labflow-512.png`,
          width: 512,
          height: 512,
          caption: 'Labflow logo',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'support@aivalanche.de',
            availableLanguage: ['en-US'],
          },
        ],
        knowsAbout: [
          'AI agent for electronic test and measurement',
          'Oscilloscope automation',
          'Source-measure unit automation',
          'Function generator automation',
          'Power supply automation',
          'Digital multimeter automation',
          'Data acquisition automation',
          'SCPI',
          'VISA',
          'IVI',
          'PyVISA',
          'GPIB',
          'USBTMC',
          'LXI',
          'Keithley',
          'Keysight',
          'Tektronix',
          'Rigol',
          'Rohde & Schwarz',
          'Siglent',
          'Fluke',
          'National Instruments',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteUrl,
        name: siteName,
        description: defaultDescription,
        publisher: {
          '@id': organizationId,
        },
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/docs?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': softwareId,
        name: siteName,
        applicationCategory: 'EngineeringApplication',
        applicationSubCategory: 'Laboratory automation',
        operatingSystem: 'Linux, macOS, Windows',
        url: siteUrl,
        description: defaultDescription,
        provider: { '@id': organizationId },
        publisher: { '@id': organizationId },
        inLanguage: 'en-US',
        keywords:
          'AI agent for lab instruments, natural-language SCPI, oscilloscope automation, Keithley SMU automation, function generator automation, PSU automation, DMM automation, DAQ automation, PyVISA AI, agentic lab automation, electronics test and measurement, Labflow',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          description: 'One-week free guided trial on a single bench. Engineer-led onboarding included.',
          url: `${siteUrl}/request-demo`,
          eligibleDuration: {
            '@type': 'QuantitativeValue',
            value: 7,
            unitCode: 'DAY',
          },
        },
        featureList: [
          'Natural-language protocols compiled to SCPI / VISA / IVI',
          'Drivers for 42 instruments across 11 vendors (Keithley, Keysight, Tektronix, Rigol, R&S, Siglent, Fluke, NI, B&K Precision, Chroma, Anritsu)',
          'Multi-instrument choreography across SMU, scope, function generator, PSU, DMM and DAQ',
          'Auto-discovery on GPIB, USBTMC, LAN (LXI / VXI-11 / HiSLIP) and serial',
          'Human-in-the-loop safety with dual-sign approvals and hardware auto-shutdown',
          'Live waveform reasoning — anomalies flagged in plain English with the matching trace segment',
          'Signed, reproducible session manifests with byte-identical replay',
          'Publication-ready reports in PDF, HTML, Markdown and LaTeX',
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
          <Tracker />
          <main className="flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
