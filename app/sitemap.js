export default function sitemap() {
    const baseUrl = 'https://aivalanche.com';

    // Define your main routes
    const routes = [
        '',
        '/contact',
        '/request-demo',
        '/privacy',
        '/terms',
        '/sitemap-html',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Add product routes with anchors
    const products = [
        { slug: '#instrumentation-agent', name: 'LabFlow' },
        { slug: '#inverse-optical-design', name: 'OpticFlow' },
        { slug: '#bsim4-optimizer', name: 'Sfera' },
    ].map((product) => ({
        url: `${baseUrl}/${product.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.9,
    }));

    // Return routes without blog posts
    return [...routes, ...products];
} 