'use client'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import Footer from '@/components/footer/Footer'
import Link from 'next/link'
import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { getCanonicalUrl } from '@/utils/canonical'

// Sample blog post data
const blogPosts = [
    {
        id: 1,
        title: 'Accelerating Optical Design with Differentiable Ray Tracing',
        summary: 'Learn how differentiable ray tracing is revolutionizing optical design by enabling gradient-based optimization across the entire design space.',
        date: 'May 30, 2023',
        category: 'Optical Design',
        readTime: '6 min read',
        relatedProduct: 'OpticFlow',
        slug: 'accelerating-optical-design-with-differentiable-ray-tracing'
    }
];

export default function BlogPage() {
    const pathname = usePathname();
    const canonicalUrl = getCanonicalUrl(pathname);

    // Blog listing structured data
    const blogListingSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "headline": "Engineering AI Insights | AIvalanche Blog",
        "description": "Explore the latest trends in AI-driven engineering tools, optical design optimization, semiconductor modeling, and laboratory automation.",
        "url": canonicalUrl,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": blogPosts.map((post, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://aivalanche.com/blog/${post.slug}`,
                "name": post.title,
                "description": post.summary
            }))
        }
    };

    return (
        <>
            <Head>
                <title>Engineering AI Insights | AIvalanche Blog</title>
                <meta name="description" content="Explore the latest trends in AI-driven engineering tools, optical design optimization, semiconductor modeling, and laboratory automation." />
                <link rel="canonical" href={canonicalUrl} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }}
                />
            </Head>
            <SecondaryNavbar />
            <main className="pt-32 pb-20 bg-white dark:bg-dark-300">
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-paragraph dark:text-white">Engineering AI Insights</h1>
                    <p className="text-lg text-center text-paragraph-light dark:text-white/80 max-w-3xl mx-auto mb-16">
                        Expert perspectives on AI-driven engineering tools, optical design, semiconductor modeling, and laboratory automation
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <article key={post.id} className="border border-borderColor dark:border-borderColor-dark rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="aspect-video bg-gray-100 dark:bg-dark-200 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center text-sm text-paragraph-light dark:text-white/60 mb-3">
                                        <span>{post.date}</span>
                                        <span className="mx-2">•</span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    <h2 className="text-xl font-bold mb-3 text-paragraph dark:text-white">
                                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                            {post.title}
                                        </Link>
                                    </h2>

                                    <p className="text-paragraph-light dark:text-white/80 mb-4">
                                        {post.summary}
                                    </p>

                                    <div className="mt-4 flex justify-between items-center">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="text-primary font-medium hover:underline"
                                        >
                                            Read more
                                        </Link>

                                        <span className="text-xs font-medium bg-gray-100 dark:bg-dark-100 px-3 py-1 rounded-full text-paragraph-light dark:text-white/60">
                                            Related: {post.relatedProduct}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            href="/"
                            className="btn relative overflow-hidden group bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-all duration-300 inline-block"
                        >
                            <span className="relative z-10">Back to Products</span>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
} 
