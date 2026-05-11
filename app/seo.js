const SITE_URL = 'https://aivalanche.com'
const DEFAULT_OG_IMAGE = '/images/labflow-control-diagram-generated.webp'

export function pageMetadata({ title, description, path, keywords, image }) {
  const url = `${SITE_URL}${path}`
  const ogImage = image || DEFAULT_OG_IMAGE
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export { SITE_URL }
