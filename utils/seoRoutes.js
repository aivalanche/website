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
