import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import { seoRoutes } from '@/utils/seoRoutes'
import Link from 'next/link'

const siteUrl = 'https://aivalanche.com'

export const metadata = {
  title: 'Sitemap | AIvalanche',
  description: 'Uebersicht aller wichtigen Seiten von AIvalanche inklusive OpenClaw, Demo, Kontakt und Rechtstexten.',
  alternates: {
    canonical: '/sitemap',
    languages: {
      'de-DE': '/sitemap',
      'de-AT': '/sitemap',
      'de-CH': '/sitemap',
      'en-US': '/sitemap?lang=en',
    },
  },
  openGraph: {
    title: 'Sitemap | AIvalanche',
    description: 'Schneller Zugriff auf alle wichtigen AIvalanche Seiten.',
    url: `${siteUrl}/sitemap`,
    type: 'website',
  },
}

function RouteList({ routes }) {
  return (
    <div className="space-y-3">
      {routes.map((route) => (
        <article key={route.path} className="rounded-xl p-4" style={{ border: '1px solid var(--wp-line, #D8D1C5)' }}>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-[16px] font-semibold">{route.title}</h3>
              <p className="mt-1 text-[14px] opacity-60">{route.description}</p>
            </div>
            <Link
              href={route.path}
              className="text-sm underline underline-offset-4"
              style={{ color: 'var(--wp-accent, #1DBF73)' }}>
              {`${siteUrl}${route.path}`}
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function SitemapPage() {
  const legalPaths = new Set(['/privacy', '/terms', '/impressum'])
  const nonListingPaths = new Set(['/sitemap'])
  const mainRoutes = seoRoutes.filter((route) => !legalPaths.has(route.path) && !nonListingPaths.has(route.path))
  const legalRoutes = seoRoutes.filter((route) => legalPaths.has(route.path))

  return (
    <>
      <SecondaryNavbar />
      <main className="mx-auto max-w-[920px] px-6 py-32">
        <p className="mb-3 text-[11px] uppercase tracking-[0.15em] opacity-30">Sitemap</p>
        <h1 className="mb-6 text-3xl font-bold md:text-5xl">Seitenuebersicht</h1>
        <p className="mb-10 max-w-[760px] text-[16px] leading-relaxed opacity-60">
          Diese Sitemap zeigt alle zentralen Seiten fuer Nutzer und Suchmaschinen. Fuer Crawler steht zusaetzlich die
          XML-Sitemap unter <code>/sitemap.xml</code> bereit.
        </p>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">Produkt und Inhalte</h2>
          <RouteList routes={mainRoutes} />
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">Rechtliches</h2>
          <RouteList routes={legalRoutes} />
        </section>

        <section className="rounded-xl p-6" style={{ border: '1px solid var(--wp-line, #D8D1C5)' }}>
          <h2 className="mb-2 text-xl font-semibold">Technische Sitemap</h2>
          <p className="text-[15px] leading-relaxed opacity-60">
            Die maschinenlesbare Sitemap finden Sie unter{' '}
            <Link
              href="/sitemap.xml"
              className="underline underline-offset-4"
              style={{ color: 'var(--wp-accent, #1DBF73)' }}>
              /sitemap.xml
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
