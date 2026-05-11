import { convex } from '@/lib/convex'
import { api } from '@/convex/_generated/api'
import HeatmapView from './HeatmapView'

export const dynamic = 'force-dynamic'

export default async function HeatmapPage({ searchParams }) {
  const path = (searchParams?.path && String(searchParams.path)) || '/'
  let paths = []
  let clicks = []
  let error = null
  try {
    const client = convex()
    ;[paths, clicks] = await Promise.all([
      client.query(api.clicks.distinctPaths, {}),
      client.query(api.clicks.byPath, { path, limit: 5000 }),
    ])
  } catch (e) {
    error = e?.message
  }
  if (error) {
    return (
      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">ADMIN · HEATMAP</div>
          <h1 className="lf-h1 medium">Backend not reachable.</h1>
          <p className="lf-lede">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="lf-page">
      <div className="container">
        <div className="lf-eyebrow">HEATMAP</div>
        <h1 className="lf-h1 medium" style={{ marginBottom: 24 }}>
          Click density.
        </h1>
        <p className="lf-lede">
          Each dot is a click, plotted relative to viewport width and full page height. Brighter spots = more clicks
          stacked.
        </p>

        <HeatmapView path={path} clicks={clicks} availablePaths={paths} />
      </div>
    </section>
  )
}
