import { NextResponse } from 'next/server';
import sitemap from '../../sitemap';

export async function GET() {
    const sitemapEntries = sitemap();

    // Generate the XML sitemap content
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // Return the XML with the appropriate content type
    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
} 