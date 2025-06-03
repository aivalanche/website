'use client'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import Footer from '@/components/footer/Footer'
import Link from 'next/link'
import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { getCanonicalUrl } from '@/utils/canonical'

export default function BlogPost() {
    const pathname = usePathname();
    const canonicalUrl = getCanonicalUrl(pathname);

    // Blog post structured data
    const blogPostSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Accelerating Optical Design with Differentiable Ray Tracing",
        "description": "Learn how differentiable ray tracing is revolutionizing optical design by enabling gradient-based optimization across the entire design space.",
        "image": "https://aivalanche.com/images/blog/ray-tracing-header.jpg",
        "datePublished": "2023-05-30T08:00:00+00:00",
        "dateModified": "2023-05-30T08:00:00+00:00",
        "author": {
            "@type": "Organization",
            "name": "AIvalanche",
            "url": "https://aivalanche.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "AIvalanche",
            "logo": {
                "@type": "ImageObject",
                "url": "https://aivalanche.com/images/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
        },
        "keywords": [
            "differentiable ray tracing",
            "optical design optimization",
            "gradient-based optical design",
            "OpticFlow",
            "computational optics"
        ]
    };

    return (
        <>
            <Head>
                <title>Accelerating Optical Design with Differentiable Ray Tracing</title>
                <meta name="description" content="Learn how differentiable ray tracing is revolutionizing optical design by enabling gradient-based optimization across the entire design space." />
                <link rel="canonical" href={canonicalUrl} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
                />
            </Head>
            <SecondaryNavbar />
            <main className="pt-32 pb-20 bg-white dark:bg-dark-300">
                <div className="container max-w-4xl">
                    <div className="mb-8">
                        <div className="flex items-center text-sm text-paragraph-light dark:text-white/60 mb-3">
                            <span>May 30, 2023</span>
                            <span className="mx-2">•</span>
                            <span>6 min read</span>
                            <span className="mx-2">•</span>
                            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                Optical Design
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-paragraph dark:text-white leading-tight">
                            Accelerating Optical Design with Differentiable Ray Tracing
                        </h1>

                        <p className="text-xl text-paragraph-light dark:text-white/80 mb-8">
                            Learn how differentiable ray tracing is revolutionizing optical design by enabling gradient-based optimization across the entire design space.
                        </p>
                    </div>

                    <div className="aspect-video bg-gray-100 dark:bg-dark-200 relative rounded-xl mb-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                    </div>

                    <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-paragraph dark:prose-headings:text-white prose-p:text-paragraph-light dark:prose-p:text-white/80">
                        <h2>Introduction to Differentiable Ray Tracing</h2>
                        <p>
                            Traditional optical design processes involve iterative, manual adjustments guided by experience and intuition.
                            This approach, while proven, can be time-consuming and might not explore the full design space effectively.
                            Differentiable ray tracing represents a paradigm shift in this process by making the entire optical simulation
                            differentiable with respect to design parameters.
                        </p>

                        <p>
                            At its core, differentiable ray tracing allows for the computation of gradients through the entire optical
                            system. This means designers can understand exactly how changes to any parameter—such as lens curvature,
                            thickness, or material properties—will affect system performance metrics like spot size, wavefront error,
                            or MTF (Modulation Transfer Function).
                        </p>

                        <h2>Mathematical Foundations</h2>
                        <p>
                            The mathematical foundation of differentiable ray tracing lies in automatic differentiation. Unlike
                            numerical differentiation, which can be prone to numerical errors, automatic differentiation computes
                            exact derivatives by applying the chain rule throughout the computational graph of the ray tracing simulation.
                        </p>

                        <p>
                            For each ray path through an optical system, we can compute how changes in input parameters affect the
                            final ray position and direction. By aggregating these gradients across many rays, we obtain a comprehensive
                            view of how the system responds to parameter changes.
                        </p>

                        <h2>Implementation in Modern Optical Design Tools</h2>
                        <p>
                            OpticFlow's implementation of differentiable ray tracing leverages modern GPU acceleration and deep learning
                            frameworks. By building on JAX and TensorFlow, we've created a system that can handle complex optical systems
                            with thousands of rays and parameters in real-time.
                        </p>

                        <p>
                            This architecture allows for:
                        </p>

                        <ul>
                            <li>Parallel processing of thousands of rays simultaneously</li>
                            <li>Efficient computation of gradients with respect to all system parameters</li>
                            <li>Integration with modern optimization algorithms like Adam, L-BFGS, and custom evolutionary strategies</li>
                            <li>Real-time visualization of both the optical system and the optimization process</li>
                        </ul>

                        <h2>Benefits in Real-World Applications</h2>
                        <p>
                            The advantages of differentiable ray tracing extend far beyond faster design cycles. Our customers have reported:
                        </p>

                        <ul>
                            <li>80% reduction in design iteration time</li>
                            <li>Discovery of novel optical configurations that were previously unexplored</li>
                            <li>Improved system performance while meeting strict constraints on size and weight</li>
                            <li>Better integration between optical and mechanical design processes</li>
                        </ul>

                        <p>
                            These benefits are particularly pronounced in fields requiring complex optical systems, such as:
                        </p>

                        <ul>
                            <li>Lidar systems for autonomous vehicles</li>
                            <li>Microscopy and imaging systems for life sciences</li>
                            <li>Quantum optical setups with precise alignment requirements</li>
                            <li>AR/VR headset display optics</li>
                        </ul>

                        <h2>The Future of Optical Design</h2>
                        <p>
                            Looking forward, we see differentiable ray tracing as just the beginning of a broader transformation in
                            engineering design. As this approach matures, we anticipate:
                        </p>

                        <ul>
                            <li>Integration of manufacturing constraints directly into the optimization process</li>
                            <li>End-to-end optimization from optical performance to final manufactured cost</li>
                            <li>AI-assisted design that can suggest novel optical configurations based on requirements</li>
                            <li>Seamless integration between optical, mechanical, and electronic design workflows</li>
                        </ul>

                        <p>
                            OpticFlow is at the forefront of this transformation, continuously developing new techniques to make
                            optical design more efficient, accessible, and powerful.
                        </p>

                        <h2>Conclusion</h2>
                        <p>
                            Differentiable ray tracing represents a fundamental advancement in optical design methodology. By enabling
                            gradient-based optimization of complex optical systems, it allows engineers to explore design spaces more
                            thoroughly and efficiently than ever before.
                        </p>

                        <p>
                            As computational resources continue to advance and algorithms improve, we expect these techniques to become
                            standard practice across the optical industry, leading to better products developed in less time and at lower cost.
                        </p>

                        <div className="not-prose mt-10 p-6 bg-primary/5 dark:bg-primary/10 rounded-xl">
                            <h3 className="text-xl font-bold text-paragraph dark:text-white mb-4">
                                Experience Differentiable Ray Tracing with OpticFlow
                            </h3>
                            <p className="text-paragraph-light dark:text-white/80 mb-4">
                                Ready to revolutionize your optical design process? OpticFlow provides a complete platform for differentiable
                                ray tracing and optimization, allowing you to design better optical systems in less time.
                            </p>
                            <Link
                                href="/#inverse-optical-design"
                                className="btn bg-primary hover:bg-primary-200 text-white px-6 py-2 rounded-full inline-block transition-colors"
                            >
                                Learn More About OpticFlow
                            </Link>
                        </div>
                    </article>

                    <div className="mt-16 flex justify-between items-center">
                        <Link
                            href="/blog"
                            className="text-primary font-medium hover:underline flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back to Blog
                        </Link>

                        <div className="flex space-x-4">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-dark-200 text-paragraph-light dark:text-white/60 hover:bg-primary hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-dark-200 text-paragraph-light dark:text-white/60 hover:bg-primary hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-dark-200 text-paragraph-light dark:text-white/60 hover:bg-primary hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
} 