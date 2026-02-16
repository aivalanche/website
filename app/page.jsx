'use client'
import { useState, useRef, useEffect } from 'react'
import { translations } from '@/utils/translations'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import Footer from '@/components/footer/Footer'
import { HeroDarkShapeSVG, HeroLightShapeSVG } from '@/data/svgImages'
import FadeUpAnimation from '@/components/animations/FadeUpAnimation'
import {
  Brain, Zap, Plug, MessageSquare, Shield, Monitor,
  ChevronDown, Check, ArrowRight, Sparkles,
  BarChart3, Users, Code2, HeartHandshake, Send
} from 'lucide-react'

const iconMap = { brain: Brain, zap: Zap, plug: Plug, messageSquare: MessageSquare, shield: Shield, monitor: Monitor }
const useCaseIcons = [BarChart3, Users, Code2, HeartHandshake]

// === Integration categories ===
const integrationCategories = {
  de: [
    {
      title: 'Chat-Plattformen',
      description: 'Lebt dort, wo Ihr Team kommuniziert.',
      items: ['Slack', 'Microsoft Teams', 'WhatsApp', 'Discord', 'Telegram', 'Signal', 'Google Chat'],
    },
    {
      title: 'KI-Modelle',
      description: 'Nutzt die leistungsfÃ¤higsten KI-Modelle.',
      items: ['Claude (Anthropic)', 'GPT-4 (OpenAI)', 'Gemini (Google)', 'Mistral', 'Llama (Meta)', 'Lokale Modelle'],
    },
    {
      title: 'ProduktivitÃ¤t',
      description: 'Verbindet sich mit Ihren Arbeitstools.',
      items: ['Notion', 'Linear', 'Jira', 'Confluence', 'Asana', 'Trello', 'Monday.com', 'ClickUp', 'Airtable', 'Google Workspace'],
    },
    {
      title: 'CRM & Sales',
      description: 'Ihre Vertriebspipeline im Griff.',
      items: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Close.io', 'Freshsales'],
    },
    {
      title: 'Entwicklung',
      description: 'FÃ¼r Ihr Engineering-Team.',
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
      items: ['Notion', 'Linear', 'Jira', 'Confluence', 'Asana', 'Trello', 'Monday.com', 'ClickUp', 'Airtable', 'Google Workspace'],
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

const integrationCardMeta = [
  { icon: MessageSquare, tone: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300' },
  { icon: Brain, tone: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' },
  { icon: Check, tone: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300' },
  { icon: Users, tone: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300' },
  { icon: Code2, tone: 'bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300' },
  { icon: BarChart3, tone: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300' },
  { icon: Zap, tone: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300' },
  { icon: Shield, tone: 'bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300' },
]

const integrationSectionCopy = {
  de: {
    badge: 'INTEGRATIONEN',
    titlePrefix: '3.000+ ',
    titleHighlight: 'Integrationen.',
    subtitle: 'AIvalanche verbindet Ihre Tools in einem durchgehenden Workflow. Wenn etwas fehlt, bauen wir den Connector dazu.',
    coverageLabel: 'Abdeckung',
    categoriesLabel: 'Kategorien',
    listedToolsLabel: 'Gelistete Tools',
    customLabel: 'Custom Connector',
    customValue: 'Auf Anfrage',
    flowBadge: 'INTEGRATION FLOW',
    flowTitle: 'Von Anfrage zu Ausfuehrung in Minuten.',
    flowDescription: 'Ein Agent kann ueber Chat ausloesen, in Ihrem Stack handeln und Ergebnisse direkt zurueckmelden.',
    steps: ['App anbinden', 'Berechtigungen setzen', 'Ablauf ausfuehren'],
    stacksLabel: 'Haeufige Stack-Kombinationen',
    stacks: ['Slack + HubSpot', 'Teams + Jira', 'WhatsApp + Salesforce', 'Notion + GitHub'],
    moreLabel: 'weitere',
  },
  en: {
    badge: 'INTEGRATIONS',
    titlePrefix: '3,000+ ',
    titleHighlight: 'Integrations.',
    subtitle: 'AIvalanche connects your tools into one operating workflow. If something is missing, we build the connector.',
    coverageLabel: 'Coverage',
    categoriesLabel: 'Categories',
    listedToolsLabel: 'Listed Tools',
    customLabel: 'Custom Connector',
    customValue: 'On request',
    flowBadge: 'INTEGRATION FLOW',
    flowTitle: 'From request to execution in minutes.',
    flowDescription: 'An agent can trigger from chat, act across your stack, and post results back to the team.',
    steps: ['Connect apps', 'Set permissions', 'Run workflow'],
    stacksLabel: 'Common stack combinations',
    stacks: ['Slack + HubSpot', 'Teams + Jira', 'WhatsApp + Salesforce', 'Notion + GitHub'],
    moreLabel: 'more',
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

const featureSectionCopy = {
  de: {
    panelTitle: 'Arbeitet proaktiv statt nur zu antworten.',
    panelPoints: [
      'Behaelt Ziele, Deadlines und Kontext im Blick',
      'Handelt direkt in Ihren verbundenen Tools',
      'Fragt bei riskanten Aktionen vor der Ausfuehrung',
    ],
  },
  en: {
    panelTitle: 'Acts proactively instead of only replying.',
    panelPoints: [
      'Keeps goals, deadlines, and context in memory',
      'Acts directly inside your connected tools',
      'Asks before executing high-risk actions',
    ],
  },
}

const featureIconTones = [
  'bg-primary text-paragraph',
  'bg-sky-500 text-white',
  'bg-emerald-500 text-white',
  'bg-orange-500 text-white',
  'bg-slate-600 text-white',
  'bg-lime-600 text-white',
]

const HomePage = () => {
  const [locale, setLocale] = useState('de')
  const [openFaq, setOpenFaq] = useState(null)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [activeConvo, setActiveConvo] = useState(0)
  const waitlistRef = useRef(null)
  const t = translations[locale]
  const integrations = integrationCategories[locale]
  const integrationCopy = integrationSectionCopy[locale]
  const featureCopy = featureSectionCopy[locale]
  const totalListedIntegrations = integrations.reduce((sum, category) => sum + category.items.length, 0)
  const useCasesIntro = locale === 'de'
    ? 'Von Marketing bis Operations: AIvalanche uebernimmt wiederholbare Arbeit und meldet Ergebnisse direkt im Team-Chat zurueck.'
    : 'From marketing to operations, AIvalanche executes repeatable work and reports results directly back in team chat.'
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
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
  const primaryUseCase = t.useCases.items[0]
  const PrimaryUseCaseIcon = useCaseIcons[0]
  const secondaryUseCases = t.useCases.items.slice(1)

  useEffect(() => {
    window.__setLocale = setLocale
    window.__getLocale = () => locale
    return () => { delete window.__setLocale; delete window.__getLocale }
  }, [locale])

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/early-access', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      })
    } catch (err) { /* still show success */ }
    setSubmitSuccess(true)
    setEmail('')
    setSubmitting(false)
    setTimeout(() => setSubmitSuccess(false), 4000)
  }

  const scrollToWaitlist = () => waitlistRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <SecondaryNavbar locale={locale} setLocale={setLocale} scrollToWaitlist={scrollToWaitlist} />
      <main className="relative isolate overflow-x-clip bg-white dark:bg-dark-300">

        {/* ========== HERO ========== */}
        <section className="hero relative overflow-hidden pb-32 pt-[180px] max-lg:pb-25 max-lg:pt-[160px]" id="scene">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/5" />

          <FadeUpAnimation className="container">
            <div className="relative z-10 text-center">
              <span className="inline-block px-4 py-2 mb-6 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full dark:bg-primary/20">
                {t.hero.badge}
              </span>
              <h1 className="text-5xl/tight md:text-7xl/tight font-extrabold mx-auto max-w-4xl drop-shadow-icon mb-8">
                {t.hero.title}{' '}
                <span className="text-primary relative inline-block">
                  {t.hero.titleHighlight}
                  <span className="absolute -bottom-2 left-0 w-full h-2 bg-primary/20 rounded-full" />
                </span>
              </h1>

              <p className="mx-auto mb-12 max-w-[650px] text-lg text-paragraph-light dark:text-white/80">
                {t.hero.subtitle}
              </p>

              <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
                <button onClick={scrollToWaitlist} className="relative overflow-hidden group bg-primary hover:bg-primary-200 text-paragraph px-8 py-3.5 rounded-full transition-all duration-300 font-semibold shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40">
                  <span className="relative z-10 flex items-center gap-2">
                    {t.hero.cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
                <a href="#features" className="px-7 py-3.5 rounded-full border-2 border-paragraph/20 dark:border-white/20 text-paragraph dark:text-white hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center font-medium">
                  <span>{t.hero.ctaSecondary}</span>
                  <ChevronDown className="ml-2 w-4 h-4" />
                </a>
              </div>

              {/* Platform badges */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
                {['Slack', 'Teams', 'WhatsApp'].map((name) => (
                  <span key={name} className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-dark-200 rounded-full text-sm text-paragraph dark:text-white/80 border border-borderColor dark:border-borderColor-dark shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {name}
                  </span>
                ))}
              </div>

              {/* Scroll indicator */}
              <div className="mt-24 hidden md:block">
                <a href="#features" className="group inline-flex flex-col items-center cursor-pointer transition-all">
                  <span className="text-sm text-paragraph-light dark:text-white/60 mb-3 group-hover:text-primary transition-colors">
                    {locale === 'de' ? 'Weiter scrollen' : 'Scroll down'}
                  </span>
                  <div className="mx-auto w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full relative group-hover:border-primary transition-colors">
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-bounce" />
                  </div>
                </a>
              </div>
            </div>
          </FadeUpAnimation>
        </section>

        {/* ========== FEATURES ========== */}
        <section id="features" className="relative py-24 md:py-32">

          <div className="container relative">
            <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-end">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-xs font-medium tracking-wider text-primary dark:bg-primary/20">
                  {t.features.badge}
                </span>
                <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight text-paragraph dark:text-white md:text-5xl">
                  {t.features.title}{' '}
                  <span className="text-primary">{t.features.titleHighlight}</span>
                </h2>
                <p className="mt-5 max-w-[680px] text-lg leading-relaxed text-paragraph-light dark:text-white/80">
                  {t.features.subtitle}
                </p>
              </div>

              <aside className="rounded-2xl border border-borderColor bg-white/75 p-5 backdrop-blur dark:border-borderColor-dark dark:bg-dark-200/75">
                <p className="text-xs font-semibold tracking-[0.18em] text-paragraph-light/80 dark:text-white/60">
                  {locale === 'de' ? 'OPERATIVES SYSTEM' : 'OPERATING SYSTEM'}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-snug text-paragraph dark:text-white">
                  {featureCopy.panelTitle}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {featureCopy.panelPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-paragraph-light dark:text-white/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {t.features.items.map((feature, i) => {
                const Icon = iconMap[feature.icon]
                const iconTone = featureIconTones[i % featureIconTones.length]

                return (
                  <article key={i} className="group relative overflow-hidden rounded-2xl border border-borderColor/80 bg-gray-50/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg dark:border-borderColor-dark dark:bg-dark-200/50 dark:hover:border-primary/30">
                    {/* Bottom accent bar */}
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${iconTone}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-paragraph dark:text-white">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-paragraph-light dark:text-white/70">{feature.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ========== CHAT DEMO (How It Works) ========== */}
        <section id="how-it-works" className="py-24 md:py-32">
          <div className="container">
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block px-4 py-2 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full dark:bg-primary/20">
                {t.chatDemo.badge}
              </span>
              <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-paragraph dark:text-white">
                {t.chatDemo.title}{' '}
                <span className="text-primary">{t.chatDemo.titleHighlight}</span>
              </h2>
            </div>

            {/* Platform tabs */}
            <div className="flex justify-center gap-3 mb-10">
              {t.chatDemo.conversations.map((convo, i) => (
                <button key={i} onClick={() => setActiveConvo(i)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeConvo === i
                    ? 'bg-primary text-paragraph border-primary shadow-lg shadow-primary/20'
                    : 'bg-white dark:bg-dark-200 text-paragraph-light dark:text-white/70 border-borderColor dark:border-borderColor-dark hover:border-primary'
                    }`}>
                  {convo.platform}
                </button>
              ))}
            </div>

            {/* Chat window */}
            <div className="max-w-2xl mx-auto">
              <div className="rounded-2xl overflow-hidden border border-borderColor dark:border-borderColor-dark bg-white dark:bg-dark-200 shadow-box">
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-borderColor dark:border-borderColor-dark bg-gray-50 dark:bg-dark-100">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-paragraph dark:text-white">AIvalanche</p>
                    <p className="text-xs text-paragraph-light dark:text-white/60">{t.chatDemo.conversations[activeConvo].platform} â€¢ Online</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-600 dark:text-green-400">Active</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-6 space-y-5 min-h-[320px]">
                  {t.chatDemo.conversations[activeConvo].messages.map((msg, i) => (
                    <div key={`${activeConvo}-${i}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] px-5 py-4 ${msg.role === 'user'
                        ? 'bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-2xl rounded-tr-md'
                        : 'bg-gray-50 dark:bg-dark-100 border border-borderColor dark:border-borderColor-dark rounded-2xl rounded-tl-md'
                        }`}>
                        {msg.role === 'user' && <p className="text-xs text-primary font-medium mb-1">{msg.name}</p>}
                        {msg.role === 'agent' && <p className="text-xs text-primary font-medium mb-1">AIvalanche</p>}
                        <p className="text-sm text-paragraph dark:text-white/90 whitespace-pre-line leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input bar */}
                <div className="px-6 py-4 border-t border-borderColor dark:border-borderColor-dark bg-gray-50 dark:bg-dark-100">
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white dark:bg-dark-200 border border-borderColor dark:border-borderColor-dark">
                    <span className="text-paragraph-light dark:text-white/40 text-sm">@AIvalanche ...</span>
                    <Send className="w-4 h-4 text-paragraph-light dark:text-white/30 ml-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== USE CASES ========== */}
        <section id="use-cases" className="relative overflow-hidden py-24 md:py-32">

          <div className="container relative">
            <div className="mb-14 md:mb-16">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-xs font-medium tracking-wider text-primary dark:bg-primary/20">
                {t.useCases.badge}
              </span>
              <h2 className="mt-5 text-3xl font-bold text-paragraph dark:text-white md:text-4xl lg:text-5xl">
                {t.useCases.title}{' '}
                <span className="text-primary">{t.useCases.titleHighlight}</span>
              </h2>
              <p className="mt-5 max-w-[760px] text-lg text-paragraph-light dark:text-white/80">
                {useCasesIntro}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <article className="relative overflow-hidden rounded-3xl border border-borderColor bg-white p-8 shadow-sm dark:border-borderColor-dark dark:bg-dark-200 md:p-10">
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl dark:bg-primary/20" />
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
                      <PrimaryUseCaseIcon className="h-7 w-7 text-paragraph" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] text-paragraph-light dark:text-white/60">
                        {locale === 'de' ? 'FOCUS BEREICH' : 'FOCUS AREA'}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-paragraph dark:text-white md:text-3xl">{primaryUseCase.title}</h3>
                    </div>
                  </div>

                  <p className="mt-6 text-paragraph-light dark:text-white/80 leading-relaxed">{primaryUseCase.description}</p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {primaryUseCase.examples.map((example) => (
                      <div key={example} className="flex items-center gap-2 rounded-xl border border-borderColor bg-gray-50 px-3 py-2 dark:border-borderColor-dark dark:bg-dark-100">
                        <Check className="h-4 w-4 text-primary" />
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
                    <article key={useCase.title} className={`rounded-2xl border border-borderColor p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-box dark:border-borderColor-dark ${style.surface}`}>
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl ${style.iconTone}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-paragraph dark:text-white">{useCase.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-paragraph-light dark:text-white/75">{useCase.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {useCase.examples.slice(0, 3).map((example) => (
                          <span key={example} className="rounded-full border border-borderColor bg-white/80 px-3 py-1 text-xs font-medium text-paragraph-light dark:border-borderColor-dark dark:bg-dark-100/80 dark:text-white/70">
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

              <div className="rounded-3xl border border-borderColor bg-white/90 p-5 backdrop-blur dark:border-borderColor-dark dark:bg-dark-200/90">
                <p className="text-xs font-semibold tracking-[0.18em] text-paragraph-light/80 dark:text-white/60">
                  {integrationCopy.coverageLabel}
                </p>
                <ul className="mt-4 space-y-3">
                  {integrationStats.map((stat) => (
                    <li key={stat.label} className="flex items-center justify-between rounded-xl border border-borderColor bg-gray-50/80 px-3 py-2 dark:border-borderColor-dark dark:bg-dark-100/80">
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

                  return (
                    <article key={i} className="group relative overflow-hidden rounded-2xl border border-borderColor/90 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-box dark:border-borderColor-dark dark:bg-dark-200/90">
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl ${style.tone}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-paragraph dark:text-white">{category.title}</h3>
                            <p className="mt-1 text-sm text-paragraph-light dark:text-white/65">{category.description}</p>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full border border-borderColor bg-gray-50 px-3 py-1 text-xs font-semibold text-paragraph-light dark:border-borderColor-dark dark:bg-dark-100 dark:text-white/70">
                          {category.items.length}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {visibleItems.map((item) => (
                          <span key={item} className="rounded-full border border-borderColor bg-white px-3 py-1 text-xs font-medium text-paragraph-light dark:border-borderColor-dark dark:bg-dark-100 dark:text-white/75">
                            {item}
                          </span>
                        ))}
                        {hiddenItemsCount > 0 && (
                          <span className="rounded-full border border-dashed border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-paragraph dark:bg-primary/20">
                            +{hiddenItemsCount} {integrationCopy.moreLabel}
                          </span>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>

              <aside className="relative overflow-hidden rounded-3xl border border-borderColor bg-paragraph p-6 text-white shadow-box dark:border-borderColor-dark dark:bg-dark-200">
                <div className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-primary/30 blur-3xl" />
                <p className="text-xs font-semibold tracking-[0.18em] text-white/60">{integrationCopy.flowBadge}</p>
                <h3 className="mt-4 text-2xl font-bold text-white">{integrationCopy.flowTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{integrationCopy.flowDescription}</p>

                <ul className="mt-6 space-y-3">
                  {integrationCopy.steps.map((step, i) => (
                    <li key={step} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-paragraph">
                        {i + 1}
                      </span>
                      <span className="text-sm text-white/90">{step}</span>
                      <Check className="ml-auto h-4 w-4 text-primary" />
                    </li>
                  ))}
                </ul>

                <p className="mt-7 text-xs font-semibold tracking-[0.18em] text-white/60">{integrationCopy.stacksLabel}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {integrationCopy.stacks.map((stack) => (
                    <span key={stack} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90">
                      {stack}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <section id="faq" className="py-24 md:py-32">
          <div className="container max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full dark:bg-primary/20">
                {t.faq.badge}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-paragraph dark:text-white">
                {t.faq.title}
              </h2>
            </div>

            <div className="space-y-3">
              {t.faq.items.map((item, i) => (
                <div key={i} className="rounded-xl border border-borderColor dark:border-borderColor-dark overflow-hidden bg-white dark:bg-dark-200 hover:shadow-box transition-shadow">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left">
                    <span className="font-medium text-paragraph dark:text-white pr-4">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 text-paragraph-light dark:text-white/60 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="px-6 pb-5 text-paragraph-light dark:text-white/80 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== WAITLIST CTA ========== */}
        <section ref={waitlistRef} id="waitlist" className="relative overflow-hidden py-24 md:py-32">
          <div className="container relative">
            <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-borderColor bg-white/80 p-8 shadow-box backdrop-blur-sm dark:border-borderColor-dark dark:bg-dark-200/80 md:p-12 lg:p-16">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />

              <div className="relative text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-xs font-medium tracking-wider text-primary dark:bg-primary/20">
                  {t.waitlist.badge}
                </span>
                <h2 className="mt-5 text-3xl font-bold text-paragraph dark:text-white md:text-4xl lg:text-5xl">
                  {t.waitlist.title}
                </h2>
                <p className="mx-auto mt-4 max-w-[480px] text-paragraph-light dark:text-white/80">
                  {t.waitlist.subtitle}
                </p>

                <form onSubmit={handleWaitlistSubmit} className="mx-auto mt-8 max-w-lg">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.waitlist.placeholder} required disabled={submitting}
                      className="flex-1 rounded-xl border border-borderColor bg-white px-5 py-3.5 text-paragraph placeholder:text-paragraph-light/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:border-borderColor-dark dark:bg-dark-100 dark:text-white dark:placeholder:text-white/40"
                    />
                    <button type="submit" disabled={submitting}
                      className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-7 py-3.5 font-semibold transition-all duration-300 ${submitting ? 'bg-primary/50' : 'bg-primary hover:bg-primary-200 shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40'} text-paragraph`}>
                      {submitting ? (
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <>
                          {t.waitlist.cta}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-paragraph-light/70 dark:text-white/50">{t.waitlist.privacyNote}</p>
                </form>

                <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-6 max-sm:flex-col max-sm:gap-3">
                  {[
                    locale === 'de' ? 'DSGVO-konform' : 'GDPR-compliant',
                    locale === 'de' ? 'Kostenloser Early Access' : 'Free early access',
                    locale === 'de' ? 'Setup in Minuten' : 'Setup in minutes',
                  ].map((text, i) => (
                    <span key={i} className="flex items-center gap-2 text-sm text-paragraph-light dark:text-white/70">
                      <Check className="h-4 w-4 text-primary" />
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      {/* Success Toast */}
      {submitSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-[1001] flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-medium">{t.waitlist.success}</p>
            <p className="text-xs">{t.waitlist.successSub}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default HomePage
