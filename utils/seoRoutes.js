const baseUrl = 'https://aivalanche.com'

export const seoRoutes = [
  {
    path: '/',
    title: 'Startseite',
    description: 'AIvalanche KI-Agent fuer Unternehmen im DACH-Raum.',
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    path: '/openclaw',
    title: 'OpenClaw',
    description: 'OpenClaw Integration fuer KI-Agenten und Unternehmens-Workflows.',
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    path: '/product',
    title: 'Product',
    description: 'Labflow product overview — agentic console for the bench.',
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    path: '/instruments',
    title: 'Instruments',
    description: 'Labflow driver catalog — 42 drivers across 11 vendors, GPIB/USBTMC/LAN/Serial.',
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  {
    path: '/agents',
    title: 'Agents',
    description: 'FLOW — the Labflow lab agent: planning, tool use, safety, models.',
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  {
    path: '/protocols',
    title: 'Protocols',
    description: 'Natural-language to SCPI protocols — typed, validated, signed for replay.',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    path: '/docs',
    title: 'Docs',
    description: 'Labflow documentation — quickstart, SCPI cookbook, protocol DSL, API reference.',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    path: '/pricing',
    title: 'Pricing',
    description: 'Labflow pricing — Bench (free in beta), Lab and Enterprise tiers.',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/changelog',
    title: 'Changelog',
    description: 'Labflow release notes — drivers, agent upgrades, console refinements.',
    changeFrequency: 'weekly',
    priority: 0.6,
  },
  {
    path: '/request-demo',
    title: 'Demo anfragen',
    description: 'Live-Demo fuer AIvalanche und OpenClaw.',
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  {
    path: '/contact',
    title: 'Kontakt',
    description: 'Kontakt zum AIvalanche Team.',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/reddit-monitor',
    title: 'Reddit Monitor',
    description: 'AI-gestuetztes Monitoring fuer Reddit, Hacker News und Lobsters.',
    changeFrequency: 'weekly',
    priority: 0.75,
  },
  {
    path: '/privacy',
    title: 'Datenschutz',
    description: 'Datenschutzrichtlinie fuer AIvalanche.',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    path: '/terms',
    title: 'AGB',
    description: 'Nutzungsbedingungen fuer AIvalanche.',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    path: '/impressum',
    title: 'Impressum',
    description: 'Rechtliche Pflichtangaben zu AIvalanche.',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    path: '/sitemap',
    title: 'Sitemap',
    description: 'Uebersicht aller wichtigen Seiten.',
    changeFrequency: 'monthly',
    priority: 0.4,
  },
]

export function getSitemapEntries(now = new Date()) {
  return seoRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
