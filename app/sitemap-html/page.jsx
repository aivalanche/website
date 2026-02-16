import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import Footer from '@/components/footer/Footer'
import Link from 'next/link'

export const metadata = {
    title: 'Site Map | AIvalanche',
    description: 'Browse all pages on AIvalanche - Products, Blog, and Company Information',
    robots: {
        index: true,
        follow: true,
    }
};

export default function SitemapPage() {
    const sitePages = [
        { title: 'Home', url: '/', description: 'AIvalanche homepage and product overview' },
        { title: 'Solutions', url: '/solutions', description: 'Deployment and service options for enterprise teams' },
        { title: 'Industry', url: '/industry', description: 'Industry use cases and optimization workflows' },
        { title: 'Blog', url: '/blog', description: 'Articles and technical insights from AIvalanche' },
        { title: 'Contact Us', url: '/contact', description: 'Get in touch with the AIvalanche team' },
        { title: 'Request Demo', url: '/request-demo', description: 'Schedule a demonstration of our products' },
        { title: 'Privacy Policy', url: '/privacy', description: 'Learn about our privacy practices' },
        { title: 'Terms and Conditions', url: '/terms', description: 'Read the AIvalanche terms and conditions' },
        { title: 'Impressum', url: '/impressum', description: 'Legal notice and company information' },
    ];

    const blogPages = [
        {
            title: 'Accelerating Optical Design with Differentiable Ray Tracing',
            url: '/blog/accelerating-optical-design-with-differentiable-ray-tracing',
        },
    ];

    return (
        <>
            <SecondaryNavbar />
            <main className="pt-32 pb-20 bg-white dark:bg-dark-300">
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-paragraph dark:text-white">Site Map</h1>
                    <p className="text-lg text-center text-paragraph-light dark:text-white/80 max-w-3xl mx-auto mb-16">
                        A complete guide to all pages on AIvalanche
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-paragraph dark:text-white border-b pb-2">Main Pages</h2>
                            <ul className="space-y-4">
                                {sitePages.map((page, index) => (
                                    <li key={index} className="pb-2">
                                        <Link
                                            href={page.url}
                                            className="text-lg font-medium text-primary hover:underline"
                                        >
                                            {page.title}
                                        </Link>
                                        <p className="text-sm text-paragraph-light dark:text-white/60 mt-1">
                                            {page.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            {blogPages.length > 0 && (
                                <>
                                    <h2 className="text-2xl font-bold mb-6 text-paragraph dark:text-white border-b pb-2">Blog Articles</h2>
                                    <ul className="space-y-4">
                                        {blogPages.map((page, index) => (
                                            <li key={index} className="pb-2">
                                                <Link
                                                    href={page.url}
                                                    className="text-lg font-medium text-primary hover:underline"
                                                >
                                                    {page.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            <div className="mt-12">
                                <h2 className="text-2xl font-bold mb-6 text-paragraph dark:text-white border-b pb-2">Resources</h2>
                                <ul className="space-y-4">
                                    <li className="pb-2">
                                        <Link
                                            href="/sitemap.xml"
                                            className="text-lg font-medium text-primary hover:underline"
                                            target="_blank"
                                        >
                                            XML Sitemap
                                        </Link>
                                        <p className="text-sm text-paragraph-light dark:text-white/60 mt-1">
                                            For search engines (XML format)
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
} 
