export const metadata = {
  title: 'Demo anfragen | AIvalanche und OpenClaw fuer DACH-Teams',
  description:
    'Demo fuer AIvalanche anfragen: KI-Agenten mit OpenClaw-gestuetzter Ausfuehrung fuer Slack, Teams, WhatsApp und interne Tools im DACH-Raum.',
  keywords: ['ki agent demo deutschland', 'openclaw demo', 'workflow automatisierung demo', 'dsgvo ki agent'],
  alternates: {
    canonical: '/request-demo',
    languages: {
      'de-DE': '/request-demo',
      'de-AT': '/request-demo',
      'de-CH': '/request-demo',
      'en-US': '/request-demo?lang=en',
    },
  },
  openGraph: {
    title: 'Demo anfragen | AIvalanche',
    description:
      'Buchen Sie eine Demo fuer AIvalanche und OpenClaw, um KI-Agent-Automatisierung fuer Ihr Team zu testen.',
    url: 'https://aivalanche.com/request-demo',
    type: 'website',
  },
}

export default function RequestDemoLayout({ children }) {
  return children
}
