import './globals.css'
import { faqSchema } from './faq-schema'

export const metadata = {
    title: {
        default: 'AIvalanche - Enterprise-grade AI Tools for Engineering Excellence',
        template: '%s | AIvalanche'
    },
    description: "Accelerate R&D cycles with AIvalanche's specialized engineering AI tools - LabFlow, OpticFlow, and Sfera for faster design iterations and optimal solutions.",
    keywords: [
        'AI engineering tools',
        'optical design software',
        'AI lab automation',
        'BSIM4 optimization',
        'engineering workflow',
        'semiconductor design',
        'optical simulation',
        'LabFlow',
        'OpticFlow',
        'Sfera'
    ],
    authors: [{ name: 'AIvalanche Team' }],
    creator: 'AIvalanche',
    publisher: 'AIvalanche',
    metadataBase: new URL('https://aivalanche.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'AIvalanche - Enterprise-grade AI Tools for Engineering Excellence',
        description: "Accelerate R&D cycles with AIvalanche's specialized engineering AI tools - LabFlow, OpticFlow, and Sfera for faster design iterations and optimal solutions.",
        url: 'https://aivalanche.com',
        siteName: 'AIvalanche',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'AIvalanche - Enterprise-grade AI Tools',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AIvalanche - Enterprise-grade AI Tools for Engineering Excellence',
        description: "Accelerate R&D cycles with AIvalanche's specialized engineering AI tools - LabFlow, OpticFlow, and Sfera for faster design iterations and optimal solutions.",
        images: ['/images/twitter-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            {
                rel: 'mask-icon',
                url: '/safari-pinned-tab.svg',
            },
            {
                rel: 'author',
                url: '/humans.txt',
            },
        ],
    },
    manifest: '/site.webmanifest',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    verification: {
        google: 'google-site-verification-code', // Replace with your verification code
    },
    category: 'technology',
};

export default function RootLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "AIvalanche",
        "url": "https://aivalanche.com",
        "logo": "https://aivalanche.com/images/logo.png",
        "description": "Enterprise-grade AI tools for engineering excellence. Accelerate R&D cycles with specialized AI tools for optical design, lab automation, and semiconductor optimization.",
        "sameAs": [
            "https://twitter.com/aivalanche",
            "https://linkedin.com/company/aivalanche",
            "https://github.com/aivalanche"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
        },
        "email": "info@aivalanche.com",
        "foundingDate": "2023",
        "founders": [
            {
                "@type": "Person",
                "name": "AIvalanche Founder"
            }
        ],
        "offers": [
            {
                "@type": "Offer",
                "name": "LabFlow",
                "description": "AI-Assisted Lab Engineer for laboratory workflow automation"
            },
            {
                "@type": "Offer",
                "name": "OpticFlow",
                "description": "Accelerated Optical System Design platform for concept-to-prototype in hours"
            },
            {
                "@type": "Offer",
                "name": "Sfera",
                "description": "Parametric Models Optimizer for BSIM4 and semiconductor design"
            }
        ]
    };

    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
                <meta name="theme-color" content="#3ca6da" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="google-site-verification" content="your-verification-code" />
                <meta property="og:site_name" content="AIvalanche" />
                <meta name="application-name" content="AIvalanche" />
                <meta name="apple-mobile-web-app-title" content="AIvalanche" />
            </head>
            <body>{children}</body>
        </html>
    )
} 