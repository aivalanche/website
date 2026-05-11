import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import { seoRoutes } from '@/utils/seoRoutes'
import Link from 'next/link'

const siteUrl = 'https://aivalanche.com'

export const metadata = {
  title: 'Sitemap | Labflow',
  description: 'Index of every public Labflow page — product, OpenClaw integration, demo request, legal documents.',
  alternates: {
    canonical: '/sitemap',
  },
  openGraph: {
    title: 'Sitemap | Labflow',
    description: 'Quick access to every Labflow page.',
    url: `${siteUrl}/sitemap`,
    type: 'website',
  },
}

function RouteList({ routes }) {
  return (
    <ul className="lf-row-list" style={{ borderTop: '1px solid var(--line)' }}>
      {routes.map((route) => (
        <li key={route.path}>
          <div>
            <h3>{route.title}</h3>
            <p>{route.description}</p>
          </div>
          <Link href={route.path}>
            {route.path === '/' ? siteUrl : `${siteUrl}${route.path}`} →
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function SitemapPage() {
  const legalPaths = new Set(['/privacy', '/terms', '/impressum'])
  const nonListingPaths = new Set(['/sitemap'])
  const mainRoutes = seoRoutes.filter((route) => !legalPaths.has(route.path) && !nonListingPaths.has(route.path))
  const legalRoutes = seoRoutes.filter((route) => legalPaths.has(route.path))

  return (
    <div className="lf-root">
      <SecondaryNavbar />

      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">INDEX · LF-MAP</div>
            <div className="cell">{seoRoutes.length} ROUTES</div>
            <div className="cell" />
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              MACHINE INDEX · /sitemap.xml
            </div>
          </div>
          <div className="lf-eyebrow">SITEMAP / DIRECTORY</div>
          <h1 className="lf-h1 medium">Every Labflow page, one screen.</h1>
          <p className="lf-lede">
            Pick a destination. Crawlers can also fetch the machine-readable variant at <code>/sitemap.xml</code>.
          </p>
        </div>
      </section>

      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">PRODUCT &amp; CONTENT</div>
          <RouteList routes={mainRoutes} />

          <div style={{ marginTop: 56 }}>
            <div className="lf-eyebrow">LEGAL</div>
            <RouteList routes={legalRoutes} />
          </div>

          <div className="lf-card" style={{ marginTop: 56 }}>
            <h3 className="lf-h3">Technical sitemap</h3>
            <p style={{ color: 'var(--ink-2)' }}>
              The machine-readable sitemap is available at{' '}
              <Link
                href="/sitemap.xml"
                style={{ color: 'var(--orange)', borderBottom: '1px solid var(--orange)' }}>
                /sitemap.xml
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
