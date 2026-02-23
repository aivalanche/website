'use client'
import { useRef, useCallback, useState } from 'react'
import { useLocale } from './LocaleProvider'
import { translations } from '@/utils/translations'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import Footer from '@/components/footer/Footer'
import FadeUpAnimation from '@/components/animations/FadeUpAnimation'
import {
  ArrowRight,
  CaretDown,
  CheckCircle,
  Lightning,
  Plugs,
  ChartBar,
  UsersThree,
  Code,
  Handshake,
  ChatCircleDots,
  Brain,
  Checks,
  TerminalWindow,
  ChartLineUp,
  CurrencyCircleDollar,
} from '@phosphor-icons/react'
import ChatDemo from './ChatDemo'
import FaqAccordion from './FaqAccordion'
import WaitlistForm from './WaitlistForm'
import {
  PersistentAgentGlyph,
  ProactiveDecisionGlyph,
  IntegrationMeshGlyph,
  ChatThreadGlyph,
  SecureGuardGlyph,
  AgentWorkspaceGlyph,
} from '@/components/icons/AgentFeatureGlyphs'

const featureIconMap = {
  brain: PersistentAgentGlyph,
  zap: ProactiveDecisionGlyph,
  plug: IntegrationMeshGlyph,
  messageSquare: ChatThreadGlyph,
  shield: SecureGuardGlyph,
  monitor: AgentWorkspaceGlyph,
}

const useCaseIcons = [ChartBar, UsersThree, Code, Handshake]

const integrationCardMeta = [
  { icon: ChatCircleDots, tone: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300' },
  { icon: Brain, tone: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' },
  { icon: Checks, tone: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300' },
  { icon: UsersThree, tone: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300' },
  { icon: TerminalWindow, tone: 'bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300' },
  { icon: ChartLineUp, tone: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300' },
  { icon: Lightning, tone: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300' },
  { icon: CurrencyCircleDollar, tone: 'bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300' },
]

const integrationCategories = {
  de: [
    {
      title: 'Chat-Plattformen',
      description: 'Lebt dort, wo Ihr Team kommuniziert.',
      items: ['Slack', 'Microsoft Teams', 'WhatsApp', 'Discord', 'Telegram', 'Signal', 'Google Chat'],
    },
    {
      title: 'KI-Modelle',
      description: 'Nutzt die leistungsfähigsten KI-Modelle.',
      items: ['Claude (Anthropic)', 'GPT-4 (OpenAI)', 'Gemini (Google)', 'Mistral', 'Llama (Meta)', 'Lokale Modelle'],
    },
    {
      title: 'Produktivität',
      description: 'Verbindet sich mit Ihren Arbeitstools.',
      items: [
        'Notion',
        'Linear',
        'Jira',
        'Confluence',
        'Asana',
        'Trello',
        'Monday.com',
        'ClickUp',
        'Airtable',
        'Google Workspace',
      ],
    },
    {
      title: 'CRM & Sales',
      description: 'Ihre Vertriebspipeline im Griff.',
      items: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Close.io', 'Freshsales'],
    },
    {
      title: 'Entwicklung',
      description: 'Für Ihr Engineering-Team.',
      items: ['GitHub', 'GitLab', 'Bitbucket', 'VS Code', 'Vercel', 'AWS', 'Docker', 'Sentry', 'Datadog', 'PagerDuty'],
    },
    {
      title: 'Analytics & Daten',
      description: 'Daten automatisch analysieren.',
      items: ['Posthog', 'Mixpanel', 'Google Analytics', 'Amplitude', 'Segment', 'Snowflake', 'BigQuery'],
    },
    {
      title: 'Marketing',
      description: 'Marketing-Workflows automatisieren.',
      items: ['Google Ads', 'Meta Ads', 'Mailchimp', 'SendGrid', 'Webflow', 'WordPress', 'Canva', 'Figma'],
    },
    {
      title: 'Finanzen & ERP',
      description: 'Finanz- und Unternehmenssoftware.',
      items: ['SAP', 'Stripe', 'QuickBooks', 'Xero', 'DATEV', 'Sage'],
    },
  ],
  en: [
    {
      title: 'Chat Platforms',
      description: 'Lives where your team communicates.',
      items: ['Slack', 'Microsoft Teams', 'WhatsApp', 'Discord', 'Telegram', 'Signal', 'Google Chat'],
    },
    {
      title: 'AI Models',
      description: 'Uses the most powerful AI models.',
      items: ['Claude (Anthropic)', 'GPT-4 (OpenAI)', 'Gemini (Google)', 'Mistral', 'Llama (Meta)', 'Local Models'],
    },
    {
      title: 'Productivity',
      description: 'Connects to your work tools.',
      items: [
        'Notion',
        'Linear',
        'Jira',
        'Confluence',
        'Asana',
        'Trello',
        'Monday.com',
        'ClickUp',
        'Airtable',
        'Google Workspace',
      ],
    },
    {
      title: 'CRM & Sales',
      description: 'Your sales pipeline under control.',
      items: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Close.io', 'Freshsales'],
    },
    {
      title: 'Development',
      description: 'For your engineering team.',
      items: ['GitHub', 'GitLab', 'Bitbucket', 'VS Code', 'Vercel', 'AWS', 'Docker', 'Sentry', 'Datadog', 'PagerDuty'],
    },
    {
      title: 'Analytics & Data',
      description: 'Analyze data automatically.',
      items: ['Posthog', 'Mixpanel', 'Google Analytics', 'Amplitude', 'Segment', 'Snowflake', 'BigQuery'],
    },
    {
      title: 'Marketing',
      description: 'Automate marketing workflows.',
      items: ['Google Ads', 'Meta Ads', 'Mailchimp', 'SendGrid', 'Webflow', 'WordPress', 'Canva', 'Figma'],
    },
    {
      title: 'Finance & ERP',
      description: 'Finance and enterprise software.',
      items: ['SAP', 'Stripe', 'QuickBooks', 'Xero', 'DATEV', 'Sage'],
    },
  ],
}

const integrationSectionCopy = {
  de: {
    badge: 'INTEGRATIONEN',
    titlePrefix: '3.000+ ',
    titleHighlight: 'Integrationen.',
    subtitle: 'AIvalanche startet im Chat, arbeitet in Ihren Tools und meldet Ergebnisse im selben Thread zurück.',
    coverageLabel: 'Abdeckung',
    categoriesLabel: 'Kategorien',
    listedToolsLabel: 'Gelistete Tools',
    customLabel: 'Custom Connector',
    customValue: 'Auf Anfrage',
    flowBadge: 'INTEGRATION FLOW',
    flowTitle: 'Von Anfrage zu Ausführung in Minuten.',
    flowDescription:
      'Sie senden eine Aufgabe im Chat. Der Agent orchestriert APIs, Daten und Automationen und liefert den Status transparent zurück.',
    steps: ['Aufgabe im Chat senden', 'Agent führt über Tools aus', 'Ergebnis und nächster Schritt'],
    stacksLabel: 'Häufige Stack-Kombinationen',
    stacks: ['Slack + HubSpot', 'Teams + Jira', 'WhatsApp + Salesforce', 'Notion + GitHub'],
    moreLabel: 'weitere',
    lessLabel: 'weniger',
    openclawBadge: 'Powered by OpenClaw',
    openclawDescription:
      'OpenClaw verbindet AIvalanche mit Ihren Chat-Kanälen und bringt Aufgaben ohne Toolwechsel in die Ausführung.',
  },
  en: {
    badge: 'INTEGRATIONS',
    titlePrefix: '3,000+ ',
    titleHighlight: 'Integrations.',
    subtitle: 'AIvalanche starts in chat, executes inside your tools, and reports outcomes back in the same thread.',
    coverageLabel: 'Coverage',
    categoriesLabel: 'Categories',
    listedToolsLabel: 'Listed Tools',
    customLabel: 'Custom Connector',
    customValue: 'On request',
    flowBadge: 'INTEGRATION FLOW',
    flowTitle: 'From request to execution in minutes.',
    flowDescription:
      'Your team posts a task in chat. The agent orchestrates APIs, data, and automations, then returns clear status and next actions.',
    steps: ['Send request in chat', 'Agent executes across tools', 'Result and next action'],
    stacksLabel: 'Common stack combinations',
    stacks: ['Slack + HubSpot', 'Teams + Jira', 'WhatsApp + Salesforce', 'Notion + GitHub'],
    moreLabel: 'more',
    lessLabel: 'less',
    openclawBadge: 'Powered by OpenClaw',
    openclawDescription:
      'OpenClaw connects AIvalanche across your chat channels so work moves from request to execution without tool switching.',
  },
}

const useCaseCardMeta = [
  {
    surface: 'bg-gradient-to-br from-orange-50 to-white dark:from-orange-500/10 dark:to-dark-200',
    iconTone: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300',
  },
  {
    surface: 'bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-500/10 dark:to-dark-200',
    iconTone: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300',
  },
  {
    surface: 'bg-gradient-to-br from-lime-50 to-white dark:from-lime-500/10 dark:to-dark-200',
    iconTone: 'bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300',
  },
]

const featureCardMeta = [
  {
    chip: { de: 'Langlaufend', en: 'Long-running' },
    glow: 'from-cyan-400/45 to-primary/10',
    iconTone: 'from-cyan-500 to-cyan-400',
  },
  {
    chip: { de: 'Selbststeuernd', en: 'Self-directed' },
    glow: 'from-primary/45 to-lime-300/20',
    iconTone: 'from-primary to-lime-400',
  },
  {
    chip: { de: 'Orchestriert', en: 'Orchestrated' },
    glow: 'from-emerald-400/45 to-cyan-300/20',
    iconTone: 'from-emerald-500 to-cyan-400',
  },
  {
    chip: { de: 'Chat-native', en: 'Chat-native' },
    glow: 'from-sky-400/45 to-indigo-300/20',
    iconTone: 'from-sky-500 to-indigo-500',
  },
  {
    chip: { de: 'Policy Guardrails', en: 'Policy Guardrails' },
    glow: 'from-orange-400/45 to-primary/20',
    iconTone: 'from-orange-500 to-primary',
  },
  {
    chip: { de: 'Sandboxed', en: 'Sandboxed' },
    glow: 'from-violet-400/45 to-cyan-300/20',
    iconTone: 'from-violet-500 to-cyan-500',
  },
]

const featureSectionCopy = {
  de: {
    panelEyebrow: 'AGENT EXECUTION LOOP',
    panelTitle: 'Plant, führt aus, verifiziert.',
    executionLoop: [
      {
        title: 'Plan',
        description: 'Bricht Ziele in konkrete Schritte mit Kontext und Priorität herunter.',
      },
      {
        title: 'Execute',
        description: 'Handelt direkt in Ihren verbundenen Tools und Systemen.',
      },
      {
        title: 'Verify',
        description: 'Prüft Ergebnisse und fragt bei riskanten Aktionen vor der Ausführung nach.',
      },
    ],
    competencySignals: ['Nachvollziehbare Tool-Aktionen', 'Freigaben bei Risiko', 'Kontext über Sessions'],
    detailsLabel: 'Details',
    collapseLabel: 'Schliessen',
    detailHeading: 'So arbeitet dieses Modul',
    detailsByIcon: {
      brain: {
        summary: 'Der Agent bleibt aktiv, erinnert an offene Punkte und priorisiert Aufgaben ueber mehrere Tage.',
        points: [
          'Behält Status und Ziele ohne erneutes Briefing',
          'Erkennt blockierte Aufgaben und eskaliert rechtzeitig',
          'Dokumentiert Fortschritt direkt im Team-Thread',
        ],
      },
      zap: {
        summary:
          'Entscheidungslogik bewertet Signale aus Ihren Systemen und schlaegt den naechsten besten Schritt vor.',
        points: [
          'Erkennt Auffaelligkeiten in KPIs und Deadlines',
          'Priorisiert sichere Aktionen vor risikoreichen Schritten',
          'Fragt vor kritischen Eingriffen aktiv nach Freigabe',
        ],
      },
      plug: {
        summary: 'AIvalanche orchestriert Aktionen ueber CRM, Ticketing, Analytics, Code und interne Datenquellen.',
        points: [
          'Ein Task kann mehrere Systeme in einer Kette ausloesen',
          'Zwischenschritte und Ergebnisse bleiben nachvollziehbar',
          'Fehlende Schnittstellen koennen als Connector ergänzt werden',
        ],
      },
      messageSquare: {
        summary: 'Die Zusammenarbeit bleibt im Chat. Kein Wechsel in ein separates Agenten-Dashboard noetig.',
        points: [
          'Tasks starten per Nachricht oder Mention',
          'Antworten enthalten Ergebnis, Kontext und naechste Optionen',
          'Teams arbeiten in bekannten Kanaelen weiter',
        ],
      },
      shield: {
        summary: 'Sicherheitsregeln werden im Ausfuehrungsfluss durchgesetzt, nicht erst nachgelagert.',
        points: [
          'Rollenbasierte Freigaben fuer sensible Aktionen',
          'Verschluesselte Datenwege und isolierte Runtime',
          'Keine Trainingsnutzung Ihrer proprietaeren Inhalte',
        ],
      },
      monitor: {
        summary: 'Jeder Agent arbeitet in einem isolierten Workspace mit Zugriff auf Code, Browser und APIs.',
        points: [
          'Automationen laufen getrennt pro Tenant',
          'Tasks koennen Code ausfuehren und Web-Schritte uebernehmen',
          'Outputs sind reproduzierbar und auditierbar',
        ],
      },
    },
  },
  en: {
    panelEyebrow: 'AGENT EXECUTION LOOP',
    panelTitle: 'Plan, execute, verify.',
    executionLoop: [
      {
        title: 'Plan',
        description: 'Breaks goals into concrete steps with context and priority.',
      },
      {
        title: 'Execute',
        description: 'Acts directly inside your connected tools and systems.',
      },
      {
        title: 'Verify',
        description: 'Validates outcomes and asks before high-risk actions are executed.',
      },
    ],
    competencySignals: ['Traceable tool actions', 'Risk-based approvals', 'Context across sessions'],
    detailsLabel: 'Details',
    collapseLabel: 'Close',
    detailHeading: 'How this capability works',
    detailsByIcon: {
      brain: {
        summary: 'The agent stays active, tracks open loops, and prioritizes work across days and weeks.',
        points: [
          'Keeps status and goals without repeated briefing',
          'Detects blocked work and escalates on time',
          'Posts progress updates directly in team threads',
        ],
      },
      zap: {
        summary: 'Decision logic evaluates signals from your systems and recommends the next best step.',
        points: [
          'Flags KPI and deadline drift early',
          'Prioritizes safe actions before risky operations',
          'Requests approval before critical execution',
        ],
      },
      plug: {
        summary: 'AIvalanche orchestrates actions across CRM, ticketing, analytics, code, and internal data.',
        points: [
          'One task can trigger multi-system execution chains',
          'Intermediate steps and outcomes remain traceable',
          'Missing integrations can be added as connectors',
        ],
      },
      messageSquare: {
        summary: 'Work stays in chat. Teams do not need to switch into a separate agent interface.',
        points: [
          'Tasks start from mentions or short requests',
          'Replies include outcome, context, and next options',
          'Execution updates stay in familiar channels',
        ],
      },
      shield: {
        summary: 'Security guardrails are enforced inside execution, not added as an afterthought.',
        points: [
          'Role-based approvals for sensitive actions',
          'Encrypted data paths and isolated runtime',
          'No training on proprietary customer content',
        ],
      },
      monitor: {
        summary: 'Each agent runs in an isolated workspace with code, browser, and API execution.',
        points: [
          'Automations are isolated per tenant',
          'Tasks can run code and complete web actions',
          'Outputs are reproducible and auditable',
        ],
      },
    },
  },
}

export default function HomePageClient() {
  const { locale } = useLocale()
  const waitlistRef = useRef(null)
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(null)
  const [expandedIntegrationIndex, setExpandedIntegrationIndex] = useState(null)
  const t = translations[locale]
  const integrations = integrationCategories[locale]
  const integrationCopy = integrationSectionCopy[locale]
  const featureCopy = featureSectionCopy[locale]
  const totalListedIntegrations = integrations.reduce((sum, category) => sum + category.items.length, 0)
  const heroFlow =
    locale === 'de'
      ? ['Anfrage im Chat', 'Agent führt aus', 'Ergebnis mit Kontext']
      : ['Request in chat', 'Agent executes', 'Outcome with context']
  const useCasesIntro =
    locale === 'de'
      ? 'AIvalanche übernimmt wiederkehrende Aufgaben über Teams hinweg: vom Trigger in Slack bis zur fertigen Ausführung in CRM, Tickets, Code und Reporting.'
      : 'AIvalanche handles repeatable work across teams: from the initial trigger in chat to completed execution in CRM, tickets, code, and reporting.'
  const integrationStats = [
    { label: integrationCopy.categoriesLabel, value: `${integrations.length}` },
    { label: integrationCopy.listedToolsLabel, value: `${totalListedIntegrations}+` },
    { label: integrationCopy.customLabel, value: integrationCopy.customValue },
  ]
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.slice(0, 8).map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
  const primaryUseCase = t.useCases.items[0]
  const PrimaryUseCaseIcon = useCaseIcons[0]
  const secondaryUseCases = t.useCases.items.slice(1)

  const scrollToWaitlist = useCallback(() => waitlistRef.current?.scrollIntoView({ behavior: 'smooth' }), [])

  return (
    <>
      <SecondaryNavbar locale={locale} setLocale={useLocale().setLocale} scrollToWaitlist={scrollToWaitlist} />
      <main className="relative isolate overflow-x-clip bg-white dark:bg-dark-300">
        {/* ========== HERO ========== */}
        <section className="hero relative overflow-hidden pb-32 pt-[180px] max-lg:pb-25 max-lg:pt-[160px]" id="scene">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/5" />

          <FadeUpAnimation className="container">
            <div className="relative z-10 text-center">
              <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-xs font-medium tracking-wider text-primary dark:bg-primary/20">
                {t.hero.badge}
              </span>
              <h1 className="mx-auto mb-8 max-w-4xl text-5xl/tight font-extrabold drop-shadow-icon md:text-7xl/tight">
                {t.hero.title}{' '}
                <span className="relative inline-block text-primary">
                  {t.hero.titleHighlight}
                  <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-primary/20" />
                </span>
              </h1>

              <p className="mx-auto mb-8 max-w-[650px] text-lg text-paragraph-light dark:text-white/80">
                {t.hero.subtitle}
              </p>

              <div className="mx-auto mb-10 flex max-w-2xl flex-wrap items-center justify-center gap-2.5">
                {heroFlow.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-borderColor bg-white/85 px-3.5 py-1.5 text-xs font-semibold tracking-[0.08em] text-paragraph-light dark:border-borderColor-dark dark:bg-dark-200/75 dark:text-white/70">
                    {item}
                  </span>
                ))}
              </div>

              {/* OpenClaw badge */}
              <div className="mx-auto mb-12 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-borderColor bg-paragraph/5 px-4 py-2 text-sm text-paragraph-light dark:border-borderColor-dark dark:bg-white/10 dark:text-white/70">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Plugs className="h-3 w-3 text-paragraph" weight="fill" />
                  </span>
                  {locale === 'de'
                    ? 'Powered by OpenClaw — setzt sich automatisch auf allen Kanälen auf'
                    : 'Powered by OpenClaw — sets up across all your channels'}
                </span>
              </div>

              <div className="mx-auto flex flex-col items-center justify-center gap-4 md:flex-row">
                <button
                  onClick={scrollToWaitlist}
                  className="group relative overflow-hidden rounded-full bg-primary px-8 py-3.5 font-semibold text-paragraph shadow-md shadow-primary/30 transition-all duration-300 hover:bg-primary-200 hover:shadow-lg hover:shadow-primary/40">
                  <span className="relative z-10 flex items-center gap-2">
                    {t.hero.cta}
                    <ArrowRight className="h-4 w-4" weight="bold" />
                  </span>
                </button>
                <a
                  href="#features"
                  className="flex items-center rounded-full border-2 border-paragraph/20 px-7 py-3.5 font-medium text-paragraph transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary dark:border-white/20 dark:text-white">
                  <span>{t.hero.ctaSecondary}</span>
                  <CaretDown className="ml-2 h-4 w-4" weight="bold" />
                </a>
              </div>

              {/* Platform badges */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
                {['Slack', 'Teams', 'WhatsApp'].map((name) => (
                  <span
                    key={name}
                    className="flex items-center gap-1.5 rounded-full border border-borderColor bg-white px-4 py-2 text-sm text-paragraph shadow-sm dark:border-borderColor-dark dark:bg-dark-200 dark:text-white/80">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {name}
                  </span>
                ))}
              </div>

              {/* Scroll indicator */}
              <div className="mt-24 hidden md:block">
                <a href="#features" className="group inline-flex cursor-pointer flex-col items-center transition-all">
                  <span className="mb-3 text-sm text-paragraph-light transition-colors group-hover:text-primary dark:text-white/60">
                    {locale === 'de' ? 'Weiter scrollen' : 'Scroll down'}
                  </span>
                  <div className="relative mx-auto h-10 w-6 rounded-full border-2 border-gray-300 transition-colors group-hover:border-primary dark:border-gray-600">
                    <div className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 animate-bounce rounded-full bg-primary" />
                  </div>
                </a>
              </div>
            </div>
          </FadeUpAnimation>
        </section>

        {/* ========== FEATURES ========== */}
        <section id="features" className="relative overflow-hidden py-24 md:py-32">
          <div className="pointer-events-none absolute left-1/2 top-20 h-64 w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px] dark:bg-primary/5" />
          <div className="container relative">
            <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-xs font-medium tracking-[0.16em] text-primary dark:bg-primary/20">
                  {t.features.badge}
                </span>
                <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight text-paragraph dark:text-white md:text-5xl">
                  {t.features.title} <span className="text-primary">{t.features.titleHighlight}</span>
                </h2>
                <p className="mt-5 max-w-[700px] text-lg leading-relaxed text-paragraph-light dark:text-white/80">
                  {t.features.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {featureCopy.competencySignals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border border-borderColor bg-white/85 px-3.5 py-1.5 text-xs font-medium text-paragraph-light dark:border-borderColor-dark dark:bg-dark-200/80 dark:text-white/70">
                      {signal}
                    </span>
                  ))}
                </div>
              </div>

              <aside className="relative overflow-hidden rounded-3xl border border-borderColor bg-white/85 p-6 backdrop-blur dark:border-borderColor-dark dark:bg-dark-200/80 md:p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl dark:bg-primary/15" />
                <p className="relative text-xs font-semibold tracking-[0.18em] text-paragraph-light/85 dark:text-white/60">
                  {featureCopy.panelEyebrow}
                </p>
                <h3 className="relative mt-3 text-2xl font-semibold leading-tight text-paragraph dark:text-white">
                  {featureCopy.panelTitle}
                </h3>

                <div className="relative mt-5 space-y-3.5">
                  {featureCopy.executionLoop.map((step, index) => (
                    <div
                      key={step.title}
                      className="flex items-start gap-3 rounded-2xl border border-borderColor/70 bg-white/90 p-3.5 dark:border-borderColor-dark dark:bg-dark-100/70">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary dark:bg-primary/20">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-paragraph dark:text-white">{step.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-paragraph-light dark:text-white/70">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {t.features.items.map((feature, i) => {
                const Icon = featureIconMap[feature.icon] ?? PersistentAgentGlyph
                const cardMeta = featureCardMeta[i % featureCardMeta.length]
                const chipLabel = cardMeta.chip[locale] ?? cardMeta.chip.en
                const isActive = activeFeatureIndex === i
                const featureDetails = featureCopy.detailsByIcon?.[feature.icon]

                return (
                  <article
                    key={i}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    onClick={() => setActiveFeatureIndex((prev) => (prev === i ? null : i))}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setActiveFeatureIndex((prev) => (prev === i ? null : i))
                      }
                    }}
                    className={`group relative min-h-[255px] cursor-pointer overflow-hidden rounded-3xl border border-borderColor/80 bg-white/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_22px_55px_-28px_rgba(132,204,22,0.5)] dark:border-borderColor-dark dark:bg-dark-200/80 dark:hover:border-primary/40 dark:hover:shadow-[0_24px_60px_-32px_rgba(132,204,22,0.45)] ${isActive ? 'border-primary/60 shadow-[0_24px_58px_-30px_rgba(132,204,22,0.55)] dark:border-primary/55' : ''}`}>
                    <div
                      className={`pointer-events-none absolute -right-10 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${cardMeta.glow} opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
                    />
                    <div className="relative mb-5 flex items-start justify-between">
                      <span className="rounded-full border border-borderColor bg-white/70 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-paragraph-light dark:border-borderColor-dark dark:bg-dark-100/70 dark:text-white/55">
                        {`0${i + 1}`}
                      </span>
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${cardMeta.iconTone} text-white shadow-md shadow-black/10`}>
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="relative mb-2 text-lg font-semibold text-paragraph dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="relative text-sm leading-relaxed text-paragraph-light dark:text-white/70">
                      {feature.description}
                    </p>
                    <div className="relative mt-6 flex items-center justify-between">
                      <span className="rounded-full border border-borderColor/80 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-paragraph-light/85 dark:border-borderColor-dark dark:text-white/60">
                        {chipLabel}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary/80">
                        {isActive ? featureCopy.collapseLabel : featureCopy.detailsLabel}
                      </span>
                    </div>

                    <div
                      onClick={(event) => event.stopPropagation()}
                      className={`absolute inset-0 z-20 rounded-3xl border border-primary/35 bg-white/95 p-5 backdrop-blur-xl transition-all duration-300 dark:bg-dark-200/95 ${
                        isActive ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
                      }`}>
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[10px] font-semibold tracking-[0.14em] text-paragraph-light dark:text-white/55">
                          {featureCopy.detailHeading}
                        </p>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            setActiveFeatureIndex(null)
                          }}
                          className="rounded-full border border-borderColor/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-paragraph-light transition-colors hover:border-primary hover:text-primary dark:border-borderColor-dark dark:text-white/60">
                          {featureCopy.collapseLabel}
                        </button>
                      </div>
                      <h4 className="mt-2 text-sm font-semibold text-paragraph dark:text-white">{feature.title}</h4>
                      <p className="mt-2 text-xs leading-relaxed text-paragraph-light dark:text-white/75">
                        {featureDetails?.summary ?? feature.description}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {(featureDetails?.points ?? []).map((point) => (
                          <li
                            key={point}
                            className="rounded-lg border border-borderColor/70 bg-white/75 px-2.5 py-1.5 text-[11px] leading-relaxed text-paragraph-light dark:border-borderColor-dark dark:bg-dark-100/70 dark:text-white/70">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ========== CHAT DEMO ========== */}
        <ChatDemo />

        {/* ========== USE CASES ========== */}
        <section id="use-cases" className="relative overflow-hidden py-24 md:py-32">
          <div className="container relative">
            <div className="mb-14 md:mb-16">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-xs font-medium tracking-wider text-primary dark:bg-primary/20">
                {t.useCases.badge}
              </span>
              <h2 className="mt-5 text-3xl font-bold text-paragraph dark:text-white md:text-4xl lg:text-5xl">
                {t.useCases.title} <span className="text-primary">{t.useCases.titleHighlight}</span>
              </h2>
              <p className="mt-5 max-w-[760px] text-lg text-paragraph-light dark:text-white/80">{useCasesIntro}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <article className="relative overflow-hidden rounded-3xl border border-borderColor/80 bg-white/80 p-8 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-borderColor-dark dark:bg-dark-200/80 md:p-10">
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl dark:bg-primary/20" />
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
                      <PrimaryUseCaseIcon className="h-7 w-7 text-paragraph" weight="duotone" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] text-paragraph-light dark:text-white/60">
                        {locale === 'de' ? 'FOCUS BEREICH' : 'FOCUS AREA'}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-paragraph dark:text-white md:text-3xl">
                        {primaryUseCase.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-6 leading-relaxed text-paragraph-light dark:text-white/80">
                    {primaryUseCase.description}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {primaryUseCase.examples.map((example) => (
                      <div
                        key={example}
                        className="flex items-center gap-2 rounded-xl border border-borderColor/80 bg-white/75 px-3 py-2 dark:border-borderColor-dark dark:bg-dark-100/70">
                        <CheckCircle className="h-4 w-4 text-primary" weight="fill" />
                        <span className="text-sm text-paragraph dark:text-white/85">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <div className="grid gap-4">
                {secondaryUseCases.map((useCase, i) => {
                  const Icon = useCaseIcons[i + 1]
                  const style = useCaseCardMeta[i % useCaseCardMeta.length]
                  return (
                    <article
                      key={useCase.title}
                      className={`cursor-pointer rounded-2xl border border-borderColor/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-28px_rgba(15,23,42,0.35)] dark:border-borderColor-dark ${style.surface}`}>
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl ${style.iconTone}`}>
                          <Icon className="h-5 w-5" weight="duotone" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-paragraph dark:text-white">{useCase.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-paragraph-light dark:text-white/75">
                            {useCase.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {useCase.examples.slice(0, 3).map((example) => (
                          <span
                            key={example}
                            className="rounded-full border border-borderColor/80 bg-white/85 px-3 py-1 text-xs font-medium text-paragraph-light dark:border-borderColor-dark dark:bg-dark-100/80 dark:text-white/70">
                            {example}
                          </span>
                        ))}
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ========== INTEGRATIONS ========== */}
        <section id="integrations" className="relative overflow-hidden py-24 md:py-32">
          <div className="container relative">
            <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-end">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-xs font-medium tracking-wider text-primary dark:bg-primary/20">
                  {integrationCopy.badge}
                </span>
                <h2 className="mt-5 text-3xl font-bold text-paragraph dark:text-white md:text-4xl lg:text-5xl">
                  {integrationCopy.titlePrefix}
                  <span className="text-primary">{integrationCopy.titleHighlight}</span>
                </h2>
                <p className="mt-5 max-w-[720px] text-lg text-paragraph-light dark:text-white/80">
                  {integrationCopy.subtitle}
                </p>
              </div>

              <div className="rounded-3xl border border-borderColor/80 bg-white/85 p-5 backdrop-blur-xl dark:border-borderColor-dark dark:bg-dark-200/85">
                <p className="text-xs font-semibold tracking-[0.18em] text-paragraph-light/80 dark:text-white/60">
                  {integrationCopy.coverageLabel}
                </p>
                <ul className="mt-4 space-y-3">
                  {integrationStats.map((stat) => (
                    <li
                      key={stat.label}
                      className="flex items-center justify-between rounded-xl border border-borderColor/80 bg-white/75 px-3 py-2 dark:border-borderColor-dark dark:bg-dark-100/75">
                      <span className="text-sm text-paragraph-light dark:text-white/70">{stat.label}</span>
                      <span className="text-sm font-semibold text-paragraph dark:text-white">{stat.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {integrations.map((category, i) => {
                  const style = integrationCardMeta[i % integrationCardMeta.length]
                  const Icon = style.icon
                  const visibleItems = category.items.slice(0, 4)
                  const hiddenItemsCount = Math.max(category.items.length - visibleItems.length, 0)
                  const isExpanded = expandedIntegrationIndex === i
                  const displayedItems = isExpanded ? category.items : visibleItems

                  return (
                    <article
                      key={i}
                      role={hiddenItemsCount > 0 ? 'button' : undefined}
                      tabIndex={hiddenItemsCount > 0 ? 0 : -1}
                      aria-expanded={hiddenItemsCount > 0 ? isExpanded : undefined}
                      onClick={() => {
                        if (hiddenItemsCount > 0) {
                          setExpandedIntegrationIndex((prev) => (prev === i ? null : i))
                        }
                      }}
                      onKeyDown={(event) => {
                        if (hiddenItemsCount > 0 && (event.key === 'Enter' || event.key === ' ')) {
                          event.preventDefault()
                          setExpandedIntegrationIndex((prev) => (prev === i ? null : i))
                        }
                      }}
                      className={`group relative overflow-hidden rounded-2xl border border-borderColor/80 bg-white/85 p-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_-28px_rgba(132,204,22,0.35)] dark:border-borderColor-dark dark:bg-dark-200/85 ${hiddenItemsCount > 0 ? 'cursor-pointer' : ''} ${isExpanded ? 'border-primary/55 dark:border-primary/45' : ''}`}>
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl ${style.tone}`}>
                            <Icon className="h-5 w-5" weight="duotone" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-paragraph dark:text-white">{category.title}</h3>
                            <p className="mt-1 text-sm text-paragraph-light dark:text-white/65">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full border border-borderColor bg-gray-50 px-3 py-1 text-xs font-semibold text-paragraph-light dark:border-borderColor-dark dark:bg-dark-100 dark:text-white/70">
                          {category.items.length}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {displayedItems.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-borderColor bg-white px-3 py-1 text-xs font-medium text-paragraph-light dark:border-borderColor-dark dark:bg-dark-100 dark:text-white/75">
                            {item}
                          </span>
                        ))}
                        {hiddenItemsCount > 0 && (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation()
                              setExpandedIntegrationIndex((prev) => (prev === i ? null : i))
                            }}
                            className="rounded-full border border-dashed border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-paragraph transition-colors hover:bg-primary/20 dark:bg-primary/20">
                            {isExpanded
                              ? integrationCopy.lessLabel
                              : `+${hiddenItemsCount} ${integrationCopy.moreLabel}`}
                          </button>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>

              <aside className="relative overflow-hidden rounded-3xl border border-borderColor bg-paragraph p-6 text-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.55)] dark:border-borderColor-dark dark:bg-dark-200">
                <div className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-primary/30 blur-3xl" />
                <p className="text-xs font-semibold tracking-[0.18em] text-white/60">{integrationCopy.flowBadge}</p>
                <h3 className="mt-4 text-2xl font-bold text-white">{integrationCopy.flowTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{integrationCopy.flowDescription}</p>

                <ul className="mt-6 space-y-3">
                  {integrationCopy.steps.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-paragraph">
                        {i + 1}
                      </span>
                      <span className="text-sm text-white/90">{step}</span>
                      <CheckCircle className="ml-auto h-4 w-4 text-primary" weight="fill" />
                    </li>
                  ))}
                </ul>

                {/* OpenClaw badge in integrations panel */}
                <div className="mt-6 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3">
                  <p className="text-xs font-semibold tracking-wider text-primary">{integrationCopy.openclawBadge}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/80">{integrationCopy.openclawDescription}</p>
                </div>

                <p className="mt-7 text-xs font-semibold tracking-[0.18em] text-white/60">
                  {integrationCopy.stacksLabel}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {integrationCopy.stacks.map((stack) => (
                    <span
                      key={stack}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90">
                      {stack}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <FaqAccordion />

        {/* ========== WAITLIST CTA ========== */}
        <div ref={waitlistRef}>
          <WaitlistForm />
        </div>
      </main>

      <Footer locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
    </>
  )
}
