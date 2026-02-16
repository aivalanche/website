export const metadata = {
  title: 'AI Automation Blog',
  description:
    'Read AIvalanche insights on enterprise AI agents, workflow automation, optical design, and model optimization.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'AIvalanche Blog',
    description:
      'Technical and practical insights on enterprise AI workflows, automation strategy, and optimization methods.',
    url: 'https://aivalanche.com/blog',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BlogLayout({ children }) {
  return children
}
