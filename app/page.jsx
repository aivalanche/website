'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { translations } from '@/utils/translations'
import Link from 'next/link'
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Brain,
  Zap,
  Plug,
  MessageSquare,
  Shield,
  Monitor,
  BarChart3,
  Users,
  Code2,
  HeartHandshake,
  Send,
  Sparkles,
} from 'lucide-react'

const space = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'] })

const iconMap = { brain: Brain, zap: Zap, plug: Plug, messageSquare: MessageSquare, shield: Shield, monitor: Monitor }
const useCaseIcons = [BarChart3, Users, Code2, HeartHandshake]

// ─── Warm Paper palette ───
const theme = {
  bg: '#F4F0E8',
  bgAlt: '#EDE8DD',
  text: '#121417',
  textSoft: 'rgba(18,20,23,0.55)',
  textMuted: 'rgba(18,20,23,0.3)',
  line: '#D8D1C5',
  surface: 'rgba(18,20,23,0.03)',
  accent: '#1DBF73',
  navBg: 'rgba(244,240,232,0.9)',
}

// ─── Integration categories ───
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
      title: 'DevOps',
      description: 'Entwickler-Workflows automatisieren.',
      items: ['GitHub', 'GitLab', 'Bitbucket', 'Jenkins', 'Docker', 'Vercel', 'Railway', 'AWS'],
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
      description: 'Your sales pipeline, managed.',
      items: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Close.io', 'Freshsales'],
    },
    {
      title: 'DevOps',
      description: 'Automate developer workflows.',
      items: ['GitHub', 'GitLab', 'Bitbucket', 'Jenkins', 'Docker', 'Vercel', 'Railway', 'AWS'],
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

// ─── Mono label ───
const Label = ({ children, className = '' }) => (
  <span
    className={`${mono.className} text-[10px] uppercase tracking-[0.14em] ${className}`}
    style={{ color: 'var(--wp-text-muted)' }}>
    {children}
  </span>
)

// ─── Scroll reveal ───
function useReveal() {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, v]
}

const HomePage = () => {
  const [locale, setLocale] = useState('de')
  const [openFaq, setOpenFaq] = useState(null)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [activeConvo, setActiveConvo] = useState(0)
  const [sticky, setSticky] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const waitlistRef = useRef(null)
  const t = translations[locale]
  const integrations = integrationCategories[locale]

  useEffect(() => {
    window.__setLocale = setLocale
    window.__getLocale = () => locale
    return () => {
      delete window.__setLocale
      delete window.__getLocale
    }
  }, [locale])

  useEffect(() => {
    const h = () => setSticky(window.scrollY >= 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const scrollToWaitlist = useCallback(() => waitlistRef.current?.scrollIntoView({ behavior: 'smooth' }), [])

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      })
    } catch {
      // Keep optimistic UX even if tracking endpoint is temporarily unavailable.
    }
    setSubmitSuccess(true)
    setEmail('')
    setSubmitting(false)
    setTimeout(() => setSubmitSuccess(false), 4000)
  }

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.slice(0, 8).map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <style>{`
        .wp-page {
          background: var(--wp-bg); color: var(--wp-text);
          min-height: 100vh; transition: color 0.5s, background 0.5s;
        }
        .wp-page ::selection { background: var(--wp-selection); }
        /* Hide global toggle */
        .toggle-button { display: none !important; }
      `}</style>

      <div
        className="wp-page"
        style={{
          '--wp-bg': theme.bg,
          '--wp-bg-alt': theme.bgAlt,
          '--wp-text': theme.text,
          '--wp-text-soft': theme.textSoft,
          '--wp-text-muted': theme.textMuted,
          '--wp-line': theme.line,
          '--wp-surface': theme.surface,
          '--wp-accent': theme.accent,
          '--wp-selection': 'rgba(29,191,115,0.15)',
        }}>
        {/* ═══ NAV ═══ */}
        <header className="relative">
          <div
            className={`fixed left-0 z-50 w-full transition-all duration-300 ${sticky ? 'backdrop-blur-md' : ''}`}
            style={{ backgroundColor: sticky ? theme.navBg : 'transparent' }}>
            <nav className="mx-auto flex max-w-[1100px] items-center px-6 py-5">
              <Link href="/" className={`${space.className} text-base font-semibold tracking-tight`}>
                AIvalanche
              </Link>

              {/* Language toggle */}
              <button
                onClick={() => setLocale(locale === 'de' ? 'en' : 'de')}
                className={`${mono.className} ml-4 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] opacity-40 transition-opacity hover:opacity-80`}
                style={{ border: '1px solid var(--wp-line)' }}>
                {locale === 'de' ? 'EN' : 'DE'}
              </button>

              <div className="ml-auto hidden items-center gap-6 md:flex">
                <a href="#features" className="text-[13px] opacity-50 transition-opacity hover:opacity-100">
                  {locale === 'de' ? 'Features' : 'Features'}
                </a>
                <a href="#how-it-works" className="text-[13px] opacity-50 transition-opacity hover:opacity-100">
                  {locale === 'de' ? "So funktioniert's" : 'How it works'}
                </a>
                <a href="#integrations" className="text-[13px] opacity-50 transition-opacity hover:opacity-100">
                  {locale === 'de' ? 'Integrationen' : 'Integrations'}
                </a>
                <button
                  onClick={scrollToWaitlist}
                  className="rounded-full px-5 py-2 text-[13px] font-semibold transition-colors"
                  style={{ background: 'var(--wp-accent)', color: 'var(--wp-bg)' }}>
                  {t.hero.cta}
                </button>
              </div>
              <button className="ml-auto md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
                {mobileMenu ? <span className="text-xl">✕</span> : <span className="text-xl">☰</span>}
              </button>
              {mobileMenu && (
                <div
                  className="absolute left-0 right-0 top-full space-y-3 p-6 md:hidden"
                  style={{ background: 'var(--wp-bg)', borderBottom: '1px solid var(--wp-line)' }}>
                  <a href="#features" onClick={() => setMobileMenu(false)} className="block text-sm">
                    Features
                  </a>
                  <a href="#how-it-works" onClick={() => setMobileMenu(false)} className="block text-sm">
                    {locale === 'de' ? "So funktioniert's" : 'How it works'}
                  </a>
                  <a href="#integrations" onClick={() => setMobileMenu(false)} className="block text-sm">
                    {locale === 'de' ? 'Integrationen' : 'Integrations'}
                  </a>
                  <button
                    onClick={() => {
                      setMobileMenu(false)
                      scrollToWaitlist()
                    }}
                    className="w-full rounded-full py-2.5 text-sm font-semibold"
                    style={{ background: 'var(--wp-accent)', color: 'var(--wp-bg)' }}>
                    {t.hero.cta}
                  </button>
                </div>
              )}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-[1100px] px-6">
          {/* ═══ HERO ═══ */}
          <section className="pb-20 pt-[140px] md:pb-28 md:pt-[180px]">
            <div className="grid items-start gap-16 lg:grid-cols-[1fr,340px] lg:gap-20">
              {/* Left — headline + CTA */}
              <div>
                <h1
                  className={`${space.className} text-[2.2rem] font-bold leading-[1.1] tracking-[-0.025em] sm:text-[2.8rem] md:text-[3.5rem]`}>
                  {t.hero.title} <span style={{ color: 'var(--wp-accent)' }}>{t.hero.titleHighlight}</span>
                </h1>

                <p className="mt-8 max-w-[560px] text-[17px] leading-[1.65] opacity-60">{t.hero.subtitle}</p>

                <div className="mt-10 flex items-center gap-6">
                  <button
                    onClick={scrollToWaitlist}
                    className="group flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors"
                    style={{ background: 'var(--wp-accent)', color: 'var(--wp-bg)' }}>
                    {t.hero.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <a
                    href="#features"
                    className="flex items-center gap-1 text-[13px] opacity-40 transition-opacity hover:opacity-80">
                    {t.hero.ctaSecondary} <ChevronDown className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Platform badges */}
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  {['Slack', 'Teams', 'WhatsApp'].map((name) => (
                    <span
                      key={name}
                      className={`${mono.className} flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] tracking-[0.06em]`}
                      style={{ border: '1px solid var(--wp-line)', color: 'var(--wp-text-soft)' }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--wp-accent)' }} />
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — capability annotation */}
              <div className="mt-8 hidden lg:block">
                <div className="pl-8" style={{ borderLeft: '1px solid var(--wp-line)' }}>
                  {/* Header */}
                  <p
                    className={`${mono.className} mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em]`}
                    style={{ color: 'var(--wp-text-muted)' }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--wp-accent)' }} />
                    {locale === 'de' ? 'Agent' : 'Agent'}
                  </p>

                  {/* Capability rows */}
                  <div className="space-y-0">
                    {[
                      { label: locale === 'de' ? 'Arbeitet in' : 'Works in', detail: 'Slack • Teams • WhatsApp' },
                      {
                        label: locale === 'de' ? 'Verbindet' : 'Connects',
                        detail: locale === 'de' ? '3.000+ Tools' : '3,000+ tools',
                      },
                      {
                        label: locale === 'de' ? 'Führt aus' : 'Executes',
                        detail: locale === 'de' ? 'Aufgaben end-to-end' : 'Tasks end-to-end',
                      },
                    ].map(({ label, detail }, i) => (
                      <div
                        key={label}
                        className="py-3"
                        style={{ borderTop: i > 0 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                        <span className={`${space.className} text-[14px] font-semibold`}>{label}</span>
                        <span
                          className={`${mono.className} ml-3 text-[11px]`}
                          style={{ color: 'var(--wp-text-muted)' }}>
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stats strip */}
                  <div className="mt-5 flex gap-6">
                    {[
                      { value: '3K+', label: locale === 'de' ? 'Tools' : 'Tools' },
                      { value: '24/7', label: locale === 'de' ? 'Aktiv' : 'Active' },
                      { value: '<2s', label: locale === 'de' ? 'Antwort' : 'Response' },
                    ].map(({ value, label }) => (
                      <div key={label} className="flex flex-col">
                        <span
                          className={`${space.className} text-[18px] font-bold`}
                          style={{ color: 'var(--wp-accent)' }}>
                          {value}
                        </span>
                        <span
                          className={`${mono.className} mt-0.5 text-[9px] uppercase tracking-[0.1em]`}
                          style={{ color: 'var(--wp-text-muted)' }}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <p
                    className={`${mono.className} mt-6 flex items-center gap-1.5 text-[10px] tracking-[0.1em] opacity-25`}>
                    <Zap className="h-3 w-3" />
                    {locale === 'de' ? 'Live in Ihrem Chat' : 'Live in your chat'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div style={{ height: 1, background: 'var(--wp-line)' }} />

          {/* ═══ FEATURES ═══ */}
          <FeaturesSection t={t} locale={locale} />

          <div style={{ height: 1, background: 'var(--wp-line)' }} />

          {/* ═══ CHAT DEMO ═══ */}
          <ChatDemoSection t={t} locale={locale} activeConvo={activeConvo} setActiveConvo={setActiveConvo} />

          <div style={{ height: 1, background: 'var(--wp-line)' }} />

          {/* ═══ USE CASES ═══ */}
          <UseCasesSection t={t} locale={locale} />

          <div style={{ height: 1, background: 'var(--wp-line)' }} />

          {/* ═══ INTEGRATIONS ═══ */}
          <IntegrationsSection integrations={integrations} locale={locale} />

          <div style={{ height: 1, background: 'var(--wp-line)' }} />

          <OpenClawSection locale={locale} />

          <div style={{ height: 1, background: 'var(--wp-line)' }} />

          {/* ═══ FAQ ═══ */}
          <FaqSection t={t} openFaq={openFaq} setOpenFaq={setOpenFaq} />

          <div style={{ height: 1, background: 'var(--wp-line)' }} />

          {/* ═══ WAITLIST CTA ═══ */}
          <section ref={waitlistRef} id="waitlist" className="py-24 md:py-32">
            <div className="mx-auto max-w-[560px] text-center">
              <Label>{t.waitlist.badge}</Label>
              <h2 className={`${space.className} mt-4 text-2xl font-bold md:text-[2rem]`}>{t.waitlist.title}</h2>
              <p className="mt-4 text-[16px] leading-relaxed opacity-55">{t.waitlist.subtitle}</p>

              <form onSubmit={handleWaitlistSubmit} className="mt-8 space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.waitlist.placeholder}
                  required
                  disabled={submitting}
                  className="focus:ring-[var(--wp-accent)]/30 w-full rounded-lg bg-transparent px-4 py-3 text-[15px] transition-all placeholder:opacity-25 focus:outline-none focus:ring-1"
                  style={{ border: '1px solid var(--wp-line)' }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-[15px] font-semibold transition-all ${submitting ? 'opacity-40' : ''}`}
                  style={{ background: 'var(--wp-accent)', color: 'var(--wp-bg)' }}>
                  {submitting ? (
                    '...'
                  ) : (
                    <>
                      {t.waitlist.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
                {[
                  locale === 'de' ? 'DSGVO-konform' : 'GDPR-compliant',
                  locale === 'de' ? 'Kostenloser Early Access' : 'Free early access',
                  locale === 'de' ? 'Setup in Minuten' : 'Setup in minutes',
                ].map((text) => (
                  <span key={text} className="flex items-center gap-1.5 text-[13px] opacity-50">
                    <Check className="h-3.5 w-3.5" style={{ color: 'var(--wp-accent)' }} />
                    {text}
                  </span>
                ))}
              </div>

              <p className={`${mono.className} mt-6 text-[10px] tracking-[0.1em] opacity-20`}>
                {t.waitlist.privacyNote}
              </p>
            </div>
          </section>
        </main>

        {/* ═══ FOOTER ═══ */}
        <footer
          className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-8"
          style={{ borderTop: '1px solid var(--wp-line)' }}>
          <p className={`${mono.className} text-[10px] opacity-20`}>© 2026 AIvalanche</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-[11px] opacity-20 transition-opacity hover:opacity-60">
              {locale === 'de' ? 'Datenschutz' : 'Privacy'}
            </Link>
            <Link href="/terms" className="text-[11px] opacity-20 transition-opacity hover:opacity-60">
              {locale === 'de' ? 'AGB' : 'Terms'}
            </Link>
            <Link href="/impressum" className="text-[11px] opacity-20 transition-opacity hover:opacity-60">
              {locale === 'de' ? 'Impressum' : 'Imprint'}
            </Link>
            <Link href="/sitemap" className="text-[11px] opacity-20 transition-opacity hover:opacity-60">
              Sitemap
            </Link>
          </div>
        </footer>

        {/* Success toast */}
        {submitSuccess && (
          <div
            className="fixed bottom-4 right-4 z-[1001] flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm"
            style={{ background: 'var(--wp-accent)', color: 'var(--wp-bg)' }}>
            <Check className="h-3.5 w-3.5" /> {t.waitlist.success}
          </div>
        )}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
    </>
  )
}

// ═══════════════════════════════════════
// FEATURES
// ═══════════════════════════════════════
function FeaturesSection({ t, locale }) {
  const [ref, v] = useReveal()
  const featureCopy = {
    de: {
      panelTitle: 'Ein Agent. Kein Toolkit.',
      panelPoints: ['Führt Aufgaben end-to-end aus', 'Verbindet 3.000+ Tools', 'Lernt Ihre Workflows'],
    },
    en: {
      panelTitle: 'One agent. Not a toolkit.',
      panelPoints: ['Executes tasks end-to-end', 'Connects 3,000+ tools', 'Learns your workflows'],
    },
  }[locale]

  return (
    <section id="features" ref={ref} className="py-24 md:py-32">
      <div className={`transition-all duration-700 ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}>
        <Label>{t.features.badge}</Label>
        <h2 className={`${space.className} mt-3 text-2xl font-bold md:text-[2rem]`}>
          {t.features.title} <span style={{ color: 'var(--wp-accent)' }}>{t.features.titleHighlight}</span>
        </h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed opacity-55">{t.features.subtitle}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {t.features.items.map((feature, i) => (
          <article
            key={i}
            className={`group rounded-xl p-6 transition-all duration-500 hover:-translate-y-0.5 ${v ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
            style={{
              border: '1px solid var(--wp-line)',
              background: 'var(--wp-surface)',
              transitionDelay: `${100 + i * 80}ms`,
            }}>
            <span
              className={`${mono.className} mb-4 block text-[11px] tracking-[0.1em]`}
              style={{ color: 'var(--wp-accent)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={`${space.className} mb-2 text-[16px] font-semibold`}>{feature.title}</h3>
            <p className="text-[14px] leading-relaxed opacity-55">{feature.description}</p>
          </article>
        ))}
      </div>

      {/* Operating system panel */}
      <div
        className={`mt-8 rounded-xl p-6 transition-all duration-700 ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}
        style={{ border: '1px solid var(--wp-line)', background: 'var(--wp-surface)', transitionDelay: '500ms' }}>
        <Label>{locale === 'de' ? 'OPERATIVES SYSTEM' : 'OPERATING SYSTEM'}</Label>
        <h3 className={`${space.className} mt-2 text-[18px] font-semibold`}>{featureCopy.panelTitle}</h3>
        <ul className="mt-4 space-y-2">
          {featureCopy.panelPoints.map((point) => (
            <li key={point} className="flex items-start gap-2 text-[15px] opacity-55">
              <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--wp-accent)' }} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
// CHAT DEMO
// ═══════════════════════════════════════
function ChatDemoSection({ t, locale, activeConvo, setActiveConvo }) {
  const [ref, v] = useReveal()
  const convo = t.chatDemo.conversations[activeConvo]

  return (
    <section id="how-it-works" ref={ref} className="py-24 md:py-32">
      <div className={`transition-all duration-700 ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}>
        <Label>{t.chatDemo.badge}</Label>
        <h2 className={`${space.className} mt-3 text-2xl font-bold md:text-[2rem]`}>
          {t.chatDemo.title} <span style={{ color: 'var(--wp-accent)' }}>{t.chatDemo.titleHighlight}</span>
        </h2>
      </div>

      {/* Platform tabs */}
      <div
        className={`mt-10 flex flex-wrap justify-center gap-2 transition-all duration-700 ${v ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '200ms' }}>
        {t.chatDemo.conversations.map((c, i) => (
          <button
            key={i}
            onClick={() => setActiveConvo(i)}
            className={`${mono.className} rounded-full px-4 py-2 text-[11px] tracking-[0.08em] transition-all`}
            style={{
              background: activeConvo === i ? 'var(--wp-accent)' : 'transparent',
              color: activeConvo === i ? 'var(--wp-bg)' : 'var(--wp-text)',
              border: activeConvo === i ? 'none' : '1px solid var(--wp-line)',
              opacity: activeConvo === i ? 1 : 0.5,
            }}>
            {c.platform}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div
        className={`mx-auto mt-8 max-w-2xl overflow-hidden rounded-xl transition-all duration-700 ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}
        style={{ border: '1px solid var(--wp-line)', background: 'var(--wp-surface)', transitionDelay: '300ms' }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: '1px solid var(--wp-line)' }}>
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{ background: 'var(--wp-accent)' }}>
            <Sparkles className="h-3.5 w-3.5" style={{ color: 'var(--wp-bg)' }} />
          </div>
          <div>
            <p className="text-[13px] font-semibold">AIvalanche</p>
            <p className={`${mono.className} text-[10px]`} style={{ color: 'var(--wp-text-muted)' }}>
              {convo.platform} • Online
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="min-h-[280px] space-y-4 p-5">
          {convo.messages.map((msg, i) => (
            <div
              key={`${activeConvo}-${i}`}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[85%] rounded-xl px-4 py-3"
                style={{
                  background: msg.role === 'user' ? 'rgba(29,191,115,0.08)' : 'var(--wp-bg)',
                  border: msg.role === 'user' ? '1px solid rgba(29,191,115,0.15)' : '1px solid var(--wp-line)',
                }}>
                <p className={`${mono.className} mb-1 text-[10px]`} style={{ color: 'var(--wp-accent)' }}>
                  {msg.role === 'user' ? msg.name : 'AIvalanche'}
                </p>
                <p className="whitespace-pre-line text-[14px] leading-relaxed opacity-70">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="px-5 py-3" style={{ borderTop: '1px solid var(--wp-line)' }}>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ border: '1px solid var(--wp-line)' }}>
            <span className="text-[13px] opacity-25">@AIvalanche ...</span>
            <Send className="ml-auto h-3.5 w-3.5 opacity-20" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
// USE CASES
// ═══════════════════════════════════════
function UseCasesSection({ t, locale }) {
  const [ref, v] = useReveal()
  const useCasesIntro =
    locale === 'de'
      ? 'Von Marketing bis Operations: AIvalanche übernimmt wiederholbare Arbeit und meldet Ergebnisse direkt im Team-Chat zurück.'
      : 'From marketing to operations, AIvalanche executes repeatable work and reports results directly back in team chat.'

  return (
    <section id="use-cases" ref={ref} className="py-24 md:py-32">
      <div className={`transition-all duration-700 ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}>
        <Label>{t.useCases.badge}</Label>
        <h2 className={`${space.className} mt-3 text-2xl font-bold md:text-[2rem]`}>
          {t.useCases.title} <span style={{ color: 'var(--wp-accent)' }}>{t.useCases.titleHighlight}</span>
        </h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed opacity-55">{useCasesIntro}</p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {t.useCases.items.map((useCase, i) => (
          <article
            key={useCase.title}
            className={`rounded-xl p-6 transition-all duration-500 ${v ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
            style={{
              border: '1px solid var(--wp-line)',
              background: 'var(--wp-surface)',
              transitionDelay: `${100 + i * 80}ms`,
            }}>
            <span
              className={`${mono.className} mb-3 block text-[11px] tracking-[0.1em]`}
              style={{ color: 'var(--wp-accent)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={`${space.className} mb-1 text-[16px] font-semibold`}>{useCase.title}</h3>
            <p className="mb-4 text-[14px] leading-relaxed opacity-55">{useCase.description}</p>
            <div className="flex flex-wrap gap-2">
              {useCase.examples.slice(0, 3).map((example) => (
                <span
                  key={example}
                  className={`${mono.className} rounded-full px-2.5 py-1 text-[10px] tracking-[0.06em]`}
                  style={{ border: '1px solid var(--wp-line)', color: 'var(--wp-text-soft)' }}>
                  {example}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
// INTEGRATIONS
// ═══════════════════════════════════════
function IntegrationsSection({ integrations, locale }) {
  const [ref, v] = useReveal()
  const totalListed = integrations.reduce((sum, c) => sum + c.items.length, 0)

  return (
    <section id="integrations" ref={ref} className="py-24 md:py-32">
      <div className={`transition-all duration-700 ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}>
        <Label>{locale === 'de' ? 'INTEGRATIONEN' : 'INTEGRATIONS'}</Label>
        <h2 className={`${space.className} mt-3 text-2xl font-bold md:text-[2rem]`}>
          3,000+{' '}
          <span style={{ color: 'var(--wp-accent)' }}>{locale === 'de' ? 'Integrationen.' : 'Integrations.'}</span>
        </h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed opacity-55">
          {locale === 'de'
            ? 'AIvalanche verbindet Ihre Tools in einen operativen Workflow. Falls etwas fehlt, bauen wir den Connector.'
            : 'AIvalanche connects your tools into one operating workflow. If something is missing, we build the connector.'}
        </p>
      </div>

      {/* Stats */}
      <div
        className={`mt-8 flex flex-wrap gap-6 transition-all duration-700 ${v ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '200ms' }}>
        {[
          { label: locale === 'de' ? 'Kategorien' : 'Categories', value: `${integrations.length}` },
          { label: locale === 'de' ? 'Tools gelistet' : 'Listed tools', value: `${totalListed}+` },
          { label: 'Custom', value: locale === 'de' ? 'Auf Anfrage' : 'On request' },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <span className={`${space.className} text-[20px] font-bold`} style={{ color: 'var(--wp-accent)' }}>
              {stat.value}
            </span>
            <span
              className={`${mono.className} text-[11px] uppercase tracking-[0.08em]`}
              style={{ color: 'var(--wp-text-muted)' }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Integration cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((category, i) => {
          const visible = category.items.slice(0, 4)
          const hidden = Math.max(category.items.length - 4, 0)
          return (
            <div
              key={i}
              className={`rounded-xl p-5 transition-all duration-500 ${v ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
              style={{
                border: '1px solid var(--wp-line)',
                background: 'var(--wp-surface)',
                transitionDelay: `${200 + i * 60}ms`,
              }}>
              <div className="mb-1 flex items-center justify-between">
                <h3 className={`${space.className} text-[15px] font-semibold`}>{category.title}</h3>
                <span
                  className={`${mono.className} rounded-full px-2 py-0.5 text-[10px]`}
                  style={{ border: '1px solid var(--wp-line)', color: 'var(--wp-text-muted)' }}>
                  {category.items.length}
                </span>
              </div>
              <p className="mb-3 text-[13px] opacity-45">{category.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {visible.map((item) => (
                  <span
                    key={item}
                    className={`${mono.className} rounded-full px-2 py-1 text-[10px] tracking-[0.04em]`}
                    style={{ border: '1px solid var(--wp-line)', color: 'var(--wp-text-soft)' }}>
                    {item}
                  </span>
                ))}
                {hidden > 0 && (
                  <span
                    className={`${mono.className} rounded-full px-2 py-1 text-[10px] font-medium`}
                    style={{
                      background: 'rgba(29,191,115,0.08)',
                      color: 'var(--wp-accent)',
                      border: '1px dashed rgba(29,191,115,0.3)',
                    }}>
                    +{hidden} {locale === 'de' ? 'weitere' : 'more'}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
// OPENCLAW
// ═══════════════════════════════════════
function OpenClawSection({ locale }) {
  const [ref, v] = useReveal()
  const copy =
    locale === 'de'
      ? {
          badge: 'OPENCLAW',
          title: 'OpenClaw fuer deutsche KI-Workflows.',
          subtitle:
            'OpenClaw verbindet AIvalanche mit Ihren Chat-Kanaelen und Unternehmens-Tools, damit Teams Aufgaben ohne Toolwechsel von der Anfrage bis zur Ausfuehrung steuern koennen.',
          points: [
            'OpenClaw mit Slack, Teams und WhatsApp',
            'OpenClaw-Connectoren fuer CRM, Ticketing und Analytics',
            'OpenClaw fuer DSGVO-orientierte Prozesse im DACH-Raum',
          ],
          cta: 'OpenClaw Demo anfragen',
        }
      : {
          badge: 'OPENCLAW',
          title: 'OpenClaw for AI workflow execution.',
          subtitle:
            'OpenClaw connects AIvalanche to your chat channels and business tools so teams can move from request to execution without tool switching.',
          points: [
            'OpenClaw with Slack, Teams, and WhatsApp',
            'OpenClaw connectors for CRM, ticketing, and analytics',
            'OpenClaw-ready setup for compliance-sensitive teams',
          ],
          cta: 'Request OpenClaw demo',
        }

  return (
    <section id="openclaw" ref={ref} className="py-24 md:py-32">
      <div className={`transition-all duration-700 ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}>
        <Label>{copy.badge}</Label>
        <h2 className={`${space.className} mt-3 text-2xl font-bold md:text-[2rem]`}>{copy.title}</h2>
        <p className="mt-4 max-w-[760px] text-[16px] leading-relaxed opacity-55">{copy.subtitle}</p>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {copy.points.map((point, i) => (
          <div
            key={point}
            className={`rounded-xl p-5 transition-all duration-500 ${v ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
            style={{
              border: '1px solid var(--wp-line)',
              background: 'var(--wp-surface)',
              transitionDelay: `${100 + i * 70}ms`,
            }}>
            <p className="text-[14px] leading-relaxed opacity-65">{point}</p>
          </div>
        ))}
      </div>

      <div
        className={`mt-8 transition-all duration-700 ${v ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '320ms' }}>
        <Link
          href="/openclaw"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
          style={{ background: 'var(--wp-accent)', color: 'var(--wp-bg)' }}>
          {copy.cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

// FAQ
function FaqSection({ t, openFaq, setOpenFaq }) {
  const [ref, v] = useReveal()

  return (
    <section id="faq" ref={ref} className="py-24 md:py-32">
      <div className={`transition-all duration-700 ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}>
        <Label>{t.faq.badge}</Label>
        <h2 className={`${space.className} mb-10 mt-3 text-2xl font-bold md:text-[2rem]`}>{t.faq.title}</h2>
      </div>

      <div className="max-w-[720px]">
        {t.faq.items.map((item, i) => (
          <div
            key={i}
            className={`transition-all duration-500 ${v ? 'opacity-100' : 'translate-y-2 opacity-0'}`}
            style={{ borderBottom: '1px solid var(--wp-line)', transitionDelay: `${i * 60}ms` }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="group flex w-full items-center justify-between py-4 text-left">
              <span className="pr-4 text-[15px] font-medium transition-opacity group-hover:opacity-70">{item.q}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 opacity-25 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-[500px] pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="max-w-[560px] text-[15px] leading-relaxed opacity-50">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomePage
