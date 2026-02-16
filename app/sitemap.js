import IndustryList from '@/data/industryData'
import ServiceList from '@/data/serviceData'

const baseUrl = 'https://aivalanche.com'
const staticRoutes = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/solutions', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/industry', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/request-demo', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/impressum', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/blog', changeFrequency: 'monthly', priority: 0.6 },
  {
    path: '/blog/accelerating-optical-design-with-differentiable-ray-tracing',
    changeFrequency: 'yearly',
    priority: 0.5,
  },
]

export default function sitemap() {
  const now = new Date()
  const { ServiceData = [] } = ServiceList ?? {}
  const { IndustryData = [] } = IndustryList ?? {}

  const serviceRoutes = ServiceData.map((service) => ({
    path: `/solutions/${service.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const industryRoutes = IndustryData.map((industry) => ({
    path: `/industry/${industry.slug}`,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
