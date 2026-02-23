'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import { ArrowRight, Check, ChevronDown, Menu, X, Play, Zap } from 'lucide-react'

// ─── Platform SVG icons ───
const RedditIcon = ({ size = 40, className = '' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
)

const HackerNewsIcon = ({ size = 40, className = '' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M0 0v24h24V0H0zm11.09 13.57V18.1h1.818v-4.53l4.364-7.726h-2.01l-3.21 5.932L8.84 5.844H6.727l4.364 7.726z" />
  </svg>
)

const LobstersIcon = ({ size = 40, className = '' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" opacity="0.15" />
    <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor" fontFamily="serif">
      L
    </text>
  </svg>
)

const space = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'] })

// ─── Biscuit palette ───
const theme = {
  bg: '#F3EDE3',
  bgAlt: '#EBE4D8',
  text: '#191612',
  textSoft: 'rgba(25,22,18,0.55)',
  textMuted: 'rgba(25,22,18,0.28)',
  line: '#D9D2C5',
  surface: 'rgba(25,22,18,0.03)',
  accent: '#C9783A',
  navBg: 'rgba(243,237,227,0.9)',
  videoPosterA: '#191612',
  videoPosterB: '#2A241C',
  videoText: 'rgba(255,255,255,0.7)',
  videoTextMuted: 'rgba(255,255,255,0.3)',
  selection: 'rgba(201,120,58,0.15)',
}

// ─── Scroll reveal ───
function useReveal() {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setV(true)
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, v]
}

// Mono label
const Label = ({ children, className = '' }) => (
  <span className={`${mono.className} label ${className}`}>{children}</span>
)

export default function RedditMonitorPage() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [sticky, setSticky] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [openAcc, setOpenAcc] = useState(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const ctaRef = useRef(null)

  const scrollToCta = useCallback(() => ctaRef.current?.scrollIntoView({ behavior: 'smooth' }), [])

  useEffect(() => {
    const h = () => setSticky(window.scrollY >= 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'reddit-monitor' }),
      })
    } catch {
      // Keep optimistic UX even if tracking endpoint is temporarily unavailable.
    }
    setSubmitted(true)
    setEmail('')
    setSubmitting(false)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <>
      <style jsx global>{`
        .rm-page {
          transition:
            background 0.5s ease,
            color 0.5s ease;
          background: var(--rm-bg);
          min-height: 100vh;
          color: var(--rm-text);
          font-family: inherit;
        }
        .rm-page .label {
          color: var(--rm-text-muted);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .rm-page a,
        .rm-page button {
          color: inherit;
        }
        .rm-page ::selection {
          background: var(--rm-selection);
        }

        .rm-video-facade {
          position: relative;
          transition: transform 0.3s ease;
          cursor: pointer;
          border-radius: 12px;
          aspect-ratio: 16/9;
          overflow: hidden;
        }
        .rm-video-facade:hover {
          transform: scale(1.005);
        }
        .rm-video-facade .play-btn {
          display: flex;
          position: absolute;
          justify-content: center;
          align-items: center;
          z-index: 2;
          inset: 0;
        }
        .rm-video-facade .play-btn span {
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.2s ease;
          border-radius: 50%;
          background: var(--rm-accent);
          width: 72px;
          height: 72px;
        }
        .rm-video-facade:hover .play-btn span {
          transform: scale(1.08);
        }
        .rm-video-facade .poster-text {
          position: absolute;
          bottom: 24px;
          left: 24px;
          z-index: 2;
        }
        /* Hide global dark/light toggle on this page */
        .toggle-button {
          display: none !important;
        }
      `}</style>

      <div
        className="rm-page"
        style={{
          '--rm-bg': theme.bg,
          '--rm-bg-alt': theme.bgAlt,
          '--rm-text': theme.text,
          '--rm-text-soft': theme.textSoft,
          '--rm-text-muted': theme.textMuted,
          '--rm-line': theme.line,
          '--rm-surface': theme.surface,
          '--rm-accent': theme.accent,
          '--rm-selection': theme.selection,
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
              <div className="ml-auto hidden items-center gap-6 md:flex">
                <a href="#how-it-works" className="text-[13px] opacity-50 transition-opacity hover:opacity-100">
                  How it works
                </a>
                <a href="#details" className="text-[13px] opacity-50 transition-opacity hover:opacity-100">
                  Details
                </a>
                <button
                  onClick={scrollToCta}
                  className="rounded-full px-5 py-2 text-[13px] font-semibold transition-colors"
                  style={{ background: 'var(--rm-accent)', color: 'var(--rm-bg)' }}>
                  Get early access
                </button>
              </div>
              <button className="ml-auto md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
                {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              {mobileMenu && (
                <div
                  className="absolute left-0 right-0 top-full space-y-3 p-6 md:hidden"
                  style={{ background: 'var(--rm-bg)', borderBottom: '1px solid var(--rm-line)' }}>
                  <a href="#how-it-works" onClick={() => setMobileMenu(false)} className="block text-sm">
                    How it works
                  </a>
                  <a href="#details" onClick={() => setMobileMenu(false)} className="block text-sm">
                    Details
                  </a>
                  <button
                    onClick={() => {
                      setMobileMenu(false)
                      scrollToCta()
                    }}
                    className="w-full rounded-full py-2.5 text-sm font-semibold"
                    style={{ background: 'var(--rm-accent)', color: 'var(--rm-bg)' }}>
                    Get early access
                  </button>
                </div>
              )}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-[1100px] px-6">
          {/* ═══════════════════════════════════════
               SECTION 1 — HERO
          ═══════════════════════════════════════ */}
          <section className="pb-20 pt-[140px] md:pb-28 md:pt-[180px]">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr,400px] lg:gap-16">
              {/* Left — copy */}
              <div>
                <h1
                  className={`${space.className} text-[2.2rem] font-bold leading-[1.1] tracking-[-0.025em] sm:text-[2.8rem] md:text-[3.5rem]`}>
                  An agent that watches Reddit, Hacker News & Lobsters for you.
                </h1>

                <p className="mt-8 max-w-[560px] text-[17px] leading-[1.65] opacity-60">
                  Your future customers are posting right now — asking questions you can answer, complaining about
                  competitors, looking for exactly what you sell. This agent monitors those conversations across
                  platforms, filters the noise with AI, and sends you only the threads worth replying to.
                </p>

                <p className="mt-5 max-w-[560px] text-[17px] leading-[1.65] opacity-60">
                  You chat back like texting a teammate: &ldquo;summarize this thread&rdquo;, &ldquo;draft a
                  reply&rdquo;, &ldquo;what angle should I take?&rdquo; — and it answers in seconds. No dashboards, no
                  logins. Just Telegram.
                </p>

                <div className="mt-10 flex items-center gap-6">
                  <button
                    onClick={scrollToCta}
                    className="group flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors"
                    style={{ background: 'var(--rm-accent)', color: 'var(--rm-bg)' }}>
                    Get early access <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <a href="#demo-video" className="text-[13px] opacity-40 transition-opacity hover:opacity-80">
                    Watch demo ↓
                  </a>
                </div>

                <p className={`${mono.className} mt-8 text-[10px] tracking-[0.14em] opacity-25`}>
                  REDDIT · HACKER NEWS · LOBSTERS · 24/7 · TELEGRAM ALERTS
                </p>
              </div>

              {/* Right — coverage annotation (YZiLabs poster style) */}
              <div className="hidden lg:block">
                <div className="ml-auto max-w-[360px] py-2 pl-8" style={{ borderLeft: '1px solid var(--rm-line)' }}>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p
                      className={`${mono.className} flex items-center gap-2 text-[10px] uppercase tracking-[0.15em]`}
                      style={{ color: 'var(--rm-text-muted)' }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--rm-accent)' }} />
                      Covers
                    </p>
                    <span
                      className={`${mono.className} rounded-full px-2 py-1 text-[10px] tracking-[0.12em]`}
                      style={{
                        color: 'var(--rm-text-muted)',
                        border: '1px solid rgba(25,22,18,0.06)',
                        background: 'rgba(25,22,18,0.015)',
                      }}>
                      24/7
                    </span>
                  </div>

                  <div
                    className="overflow-hidden rounded-2xl"
                    style={{
                      border: '1px solid rgba(25,22,18,0.05)',
                      background: 'rgba(25,22,18,0.02)',
                    }}>
                    {[
                      { name: 'Reddit', detail: 'subreddits \u2022 keywords', Icon: RedditIcon, color: '#FF4500' },
                      { name: 'HN', detail: 'stories \u2022 comments', Icon: HackerNewsIcon, color: '#FF6600' },
                      { name: 'Lobsters', detail: 'tags \u2022 comments', Icon: LobstersIcon, color: '#8A5A44' },
                    ].map(({ name, detail, Icon, color }, i) => (
                      <div
                        key={name}
                        className="grid grid-cols-[34px,1fr] items-start gap-3 px-4 py-3.5"
                        style={{ borderTop: i > 0 ? '1px solid rgba(25,22,18,0.05)' : 'none' }}>
                        <div
                          className="flex h-[34px] w-[34px] items-center justify-center rounded-full"
                          style={{
                            border: '1px solid rgba(25,22,18,0.05)',
                            background: 'rgba(25,22,18,0.025)',
                            color,
                          }}>
                          <Icon size={16} />
                        </div>

                        <div className="min-w-0 pt-0.5">
                          <p className="text-[14px] font-semibold leading-none">{name}</p>
                          <p
                            className={`${mono.className} mt-1.5 text-[11px]`}
                            style={{ color: 'var(--rm-text-muted)' }}>
                            {detail}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div
                      className="flex items-center justify-between gap-3 px-4 py-3"
                      style={{ borderTop: '1px solid rgba(25,22,18,0.05)' }}>
                      <p
                        className={`${mono.className} flex items-center gap-2 text-[10px] uppercase tracking-[0.1em]`}
                        style={{ color: 'var(--rm-text-muted)' }}>
                        <Zap className="h-3 w-3" />
                        Delivered to Telegram
                      </p>
                      <span className={`${mono.className} text-[10px] opacity-30`}>alerts + digests</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════
               SECTION 2 — VIDEO PLACEHOLDER
               Facade pattern: no iframe until click
          ═══════════════════════════════════════ */}
          <section id="demo-video" className="pb-24 md:pb-32">
            <div
              className="rm-video-facade"
              onClick={() => setVideoLoaded(true)}
              role="button"
              tabIndex={0}
              aria-label="Play demo video"
              onKeyDown={(e) => e.key === 'Enter' && setVideoLoaded(true)}>
              {!videoLoaded ? (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(145deg, ${theme.videoPosterA} 0%, ${theme.videoPosterB} 100%)`,
                    }}
                  />
                  <div className="play-btn">
                    <span>
                      <Play className="ml-1 h-7 w-7" style={{ color: theme.isDark ? theme.bg : '#fff' }} />
                    </span>
                  </div>
                  <div className="poster-text">
                    <p
                      className={`${mono.className} text-[10px] tracking-[0.14em]`}
                      style={{ color: theme.videoTextMuted }}>
                      DEMO
                    </p>
                    <p className={`${space.className} mt-1 text-sm font-medium`} style={{ color: theme.videoText }}>
                      See how alerts + chat work
                    </p>
                  </div>
                  <div style={{ position: 'absolute', bottom: 24, right: 24, zIndex: 2 }}>
                    <span
                      className={`${mono.className} text-[10px] tracking-[0.1em]`}
                      style={{ color: theme.videoTextMuted }}>
                      0:30
                    </span>
                  </div>
                </>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                  title="Reddit Monitor Demo"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                />
              )}
            </div>
          </section>

          <div style={{ height: 1, background: 'var(--rm-line)' }} />

          {/* ═══════════════════════════════════════
               SECTION 3 — DIAGRAM + CALLOUTS
          ═══════════════════════════════════════ */}
          <section className="py-24 md:py-32">
            {/* Desktop: grid with center artifact + callout labels */}
            <div className="hidden grid-cols-[1fr,380px,1fr] items-center gap-0 lg:grid">
              {/* Left-top label */}
              <div className="flex items-center gap-0 self-start pt-4">
                <div className="shrink-0">
                  <Label>Monitors</Label>
                  <p className="mt-1 max-w-[180px] text-[15px] leading-relaxed opacity-50">
                    Reddit, HN, Lobsters, keywords
                  </p>
                </div>
                <div className="ml-4 h-px flex-1" style={{ background: 'var(--rm-line)' }} />
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--rm-text-muted)' }} />
              </div>

              {/* Center artifact — spans 3 rows */}
              <div
                className="row-span-3 mx-2 rounded-lg p-5"
                style={{ border: '1px solid var(--rm-line)', background: 'var(--rm-surface)' }}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--rm-accent)]" />
                  <Label className="!text-[var(--rm-text)] !opacity-60">New thread detected</Label>
                </div>
                <p className={`${space.className} mb-2 text-[16px] font-semibold leading-snug`}>
                  &ldquo;Best alternatives to Western Union for sending money to Nigeria?&rdquo;
                </p>
                <p className={`${mono.className} mb-4 text-[10px] opacity-30`}>
                  r/personalfinance · 12 min ago · ⬆142 · 💬23
                </p>
                <div className="space-y-1.5 pt-3" style={{ borderTop: '1px solid var(--rm-line)' }}>
                  {[
                    'User sends $500/mo, frustrated with 7% fees',
                    'Comparing Wise, Remitly, crypto options',
                    'Thread gaining traction — 5 new comments/hr',
                  ].map((b, i) => (
                    <p key={i} className="flex items-start gap-2 text-[15px] leading-relaxed opacity-55">
                      <span className="mt-1.5 text-[5px]">●</span> {b}
                    </p>
                  ))}
                </div>
                <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--rm-line)' }}>
                  <Label className="!text-[var(--rm-text)] !opacity-40">Suggested reply</Label>
                  <p className="mt-1 text-[15px] italic leading-relaxed opacity-60">
                    &ldquo;I switched from WU to a stablecoin rail — cost dropped from 7% to under 1%.&rdquo;
                  </p>
                </div>
              </div>

              {/* Right-top label */}
              <div className="flex items-center gap-0 self-start pt-4">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--rm-text-muted)' }} />
                <div className="mr-4 h-px flex-1" style={{ background: 'var(--rm-line)' }} />
                <div className="shrink-0 text-right">
                  <Label>Filters</Label>
                  <p className="ml-auto mt-1 max-w-[180px] text-[15px] leading-relaxed opacity-50">
                    noise, spam, duplicates, low intent
                  </p>
                </div>
              </div>

              <div />
              <div />

              {/* Left-bottom label */}
              <div className="flex items-center gap-0 self-end pb-4">
                <div className="shrink-0">
                  <Label>Delivers</Label>
                  <p className="mt-1 max-w-[180px] text-[15px] leading-relaxed opacity-50">
                    Telegram alerts, daily digest
                  </p>
                </div>
                <div className="ml-4 h-px flex-1" style={{ background: 'var(--rm-line)' }} />
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--rm-text-muted)' }} />
              </div>

              {/* Right-bottom label */}
              <div className="flex items-center gap-0 self-end pb-4">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--rm-text-muted)' }} />
                <div className="mr-4 h-px flex-1" style={{ background: 'var(--rm-line)' }} />
                <div className="shrink-0 text-right">
                  <Label>You chat</Label>
                  <p className="ml-auto mt-1 max-w-[180px] text-[15px] leading-relaxed opacity-50">
                    ask, reply, decide next steps
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile: stacked */}
            <div className="lg:hidden">
              <div
                className="mb-8 rounded-lg p-5"
                style={{ border: '1px solid var(--rm-line)', background: 'var(--rm-surface)' }}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--rm-accent)]" />
                  <Label className="!opacity-60">New thread detected</Label>
                </div>
                <p className={`${space.className} mb-2 text-[16px] font-semibold leading-snug`}>
                  &ldquo;Best alternatives to Western Union for sending money to Nigeria?&rdquo;
                </p>
                <p className={`${mono.className} text-[10px] opacity-30`}>r/personalfinance · ⬆142 · 💬23</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  ['Monitors', 'subreddits, keywords'],
                  ['Filters', 'noise, spam, duplicates'],
                  ['Delivers', 'Telegram alerts'],
                  ['You chat', 'ask, reply, act'],
                ].map(([t, d], i) => (
                  <div key={i}>
                    <Label>{t}</Label>
                    <p className="mt-1 text-[15px] leading-relaxed opacity-50">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div style={{ height: 1, background: 'var(--rm-line)' }} />

          {/* ═══════════════════════════════════════
               SECTION 4 — WHAT YOU GET
          ═══════════════════════════════════════ */}
          <WhatYouGet />

          <div style={{ height: 1, background: 'var(--rm-line)' }} />

          {/* ═══════════════════════════════════════
               SECTION 5 — HOW IT WORKS
          ═══════════════════════════════════════ */}
          <HowItWorks />

          <div style={{ height: 1, background: 'var(--rm-line)' }} />

          {/* ═══════════════════════════════════════
               SECTION 6 — DEMO CONVERSATION
          ═══════════════════════════════════════ */}
          <DemoChat />

          <div style={{ height: 1, background: 'var(--rm-line)' }} />

          <PricingSection />

          <div style={{ height: 1, background: 'var(--rm-line)' }} />

          {/* ═══════════════════════════════════════
               SECTION 7 — DETAILS + CTA
          ═══════════════════════════════════════ */}
          <section id="details" className="py-24 md:py-32">
            <div className="grid gap-20 lg:grid-cols-2">
              <div>
                <h2 className={`${space.className} mb-10 text-2xl font-bold md:text-[1.75rem]`}>Details</h2>
                <div>
                  {[
                    {
                      t: 'Filtering & scoring',
                      c: 'Subreddit denylist, promo detection, MD5 dedup. GPT-4o-mini scores every post 1–10 for relevance with reasoning.',
                    },
                    {
                      t: 'Digests & alerts',
                      c: 'Daily HTML report at 8 AM CET. Real-time watchdog for threads with 5+ comments. Throttled to 3 alerts/hour.',
                    },
                    {
                      t: 'Tracking competitors',
                      c: 'Auto-detects Wise, Remitly, Western Union, and 8+ others. Surfaces unanswered pain points.',
                    },
                    { t: 'Team workflows', c: 'Share alerts with your team channel. Assign threads. Track replies.' },
                    {
                      t: 'Integrations & roadmap',
                      c: 'Telegram today. Slack, Discord, and webhook support coming soon.',
                    },
                  ].map((item, i) => (
                    <div key={i} style={{ borderBottom: '1px solid var(--rm-line)' }}>
                      <button
                        onClick={() => setOpenAcc(openAcc === i ? null : i)}
                        className="group flex w-full items-center justify-between py-4 text-left">
                        <span className="text-[15px] font-medium transition-opacity group-hover:opacity-70">
                          {item.t}
                        </span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 opacity-25 transition-transform duration-300 ${openAcc === i ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${openAcc === i ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="max-w-[440px] text-[15px] leading-relaxed opacity-50">{item.c}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Security */}
                <div className="mt-12">
                  <Label>Security & privacy</Label>
                  <ul className="mt-4 space-y-2.5">
                    {[
                      'Tokens encrypted at rest — never stored in plain text',
                      'We never post, comment, or vote on your behalf',
                      'Data retained 30 days, then deleted',
                    ].map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-[15px] leading-relaxed opacity-55">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div ref={ctaRef} id="waitlist" className="lg:sticky lg:top-28 lg:self-start">
                <h2 className={`${space.className} mb-3 text-2xl font-bold md:text-[1.75rem]`}>Get early access</h2>
                <p className="mb-8 max-w-[380px] text-[15px] leading-relaxed opacity-50">
                  Join the waitlist. We&apos;ll set up your agent and ping you when it&apos;s live.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    disabled={submitting}
                    className="focus:ring-[var(--rm-accent)]/30 w-full rounded-lg bg-transparent px-4 py-3 text-[15px] transition-all placeholder:opacity-25 focus:outline-none focus:ring-1"
                    style={{ border: '1px solid var(--rm-line)' }}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-[15px] font-semibold transition-all ${
                      submitting ? 'opacity-40' : 'hover:bg-[#333]'
                    }`}
                    style={{ background: 'var(--rm-accent)', color: 'var(--rm-bg)' }}>
                    {submitting ? (
                      '...'
                    ) : (
                      <>
                        {submitted ? (
                          "You're on the list ✓"
                        ) : (
                          <>
                            Join waitlist <ArrowRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </>
                    )}
                  </button>
                </form>
                <p className={`${mono.className} mt-4 text-[10px] tracking-[0.1em] opacity-20`}>
                  FREE DURING BETA · CANCEL ANYTIME
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer
          className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-8"
          style={{ borderTop: '1px solid var(--rm-line)' }}>
          <p className={`${mono.className} text-[10px] opacity-20`}>© 2026 AIvalanche</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-[11px] opacity-20 transition-opacity hover:opacity-60">
              Privacy
            </Link>
            <Link href="/terms" className="text-[11px] opacity-20 transition-opacity hover:opacity-60">
              Terms
            </Link>
            <Link href="/sitemap" className="text-[11px] opacity-20 transition-opacity hover:opacity-60">
              Sitemap
            </Link>
          </div>
        </footer>

        {submitted && (
          <div
            className="fixed bottom-4 right-4 z-[1001] flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm"
            style={{ background: 'var(--rm-accent)', color: 'var(--rm-bg)' }}>
            <Check className="h-3.5 w-3.5" /> You&apos;re on the list.
          </div>
        )}
      </div>
    </>
  )
}

// ═══════════════════════════════════════
function WhatYouGet() {
  const [ref, v] = useReveal()
  const items = [
    'High-intent alerts only',
    'Thread summary + key quotes',
    'Suggested reply draft',
    'Competitor mentions flagged',
    'Daily digest at 8 AM',
  ]
  return (
    <section ref={ref} className="py-24 md:py-32">
      <h2
        className={`${space.className} mb-10 text-2xl font-bold transition-all duration-700 md:text-[1.75rem] ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}>
        What you get
      </h2>
      <ul>
        {items.map((item, i) => (
          <li
            key={i}
            className={`py-3.5 text-[16px] leading-relaxed opacity-60 transition-all duration-500 ${v ? 'opacity-60' : 'translate-y-2 opacity-0'}`}
            style={{ borderBottom: '1px solid var(--rm-line)', transitionDelay: `${i * 80}ms` }}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

// ═══════════════════════════════════════
function HowItWorks() {
  const [ref, v] = useReveal()
  const steps = [
    { t: 'Choose what to watch', d: 'Keywords, subreddits, competitors. Quoted phrases for precision.' },
    { t: 'Agent filters + scores', d: 'Deduplication, spam blocking, GPT relevance scoring. Only signal survives.' },
    { t: 'You get an alert + chat', d: 'Ask for summary, suggested reply, or next steps. Act in seconds.' },
  ]
  return (
    <section id="how-it-works" ref={ref} className="py-24 md:py-32">
      <h2
        className={`${space.className} mb-12 text-2xl font-bold transition-all duration-700 md:text-[1.75rem] ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}>
        How it works
      </h2>
      <div className="relative">
        <div
          className="absolute bottom-2 left-[7px] top-2 hidden w-px md:block"
          style={{ background: 'var(--rm-line)' }}
        />
        <div className="space-y-10 md:space-y-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`duration-600 flex items-start gap-5 transition-all ${v ? 'opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: `${i * 150}ms` }}>
              <span
                className={`${mono.className} relative z-10 flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full text-[8px] font-medium opacity-40`}
                style={{ border: '1px solid var(--rm-line)', background: 'var(--rm-bg)' }}>
                {i + 1}
              </span>
              <div className="max-w-[440px]">
                <p className="mb-1 text-[16px] font-semibold">{step.t}</p>
                <p className="text-[15px] leading-relaxed opacity-50">{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
function PricingSection() {
  const [ref, v] = useReveal()

  const plans = [
    {
      name: 'Free',
      subtitle: 'Beta sandbox',
      price: '$0',
      cadence: '/mo',
      billing: 'Good for testing your first watchlist',
      cta: 'Join beta',
      highlight: false,
    },
    {
      name: 'Power',
      subtitle: 'Most teams',
      price: '$49',
      cadence: '/mo',
      billing: 'Best for active monitoring + replies',
      cta: 'Get early access',
      highlight: true,
    },
    {
      name: 'Ultra',
      subtitle: 'Best for business',
      price: '$149',
      cadence: '/mo',
      billing: 'Higher limits + team workflows',
      cta: 'Get early access',
      highlight: false,
    },
  ]

  const rows = [
    { label: 'Watch topics', values: ['2', '10', '30'] },
    { label: 'Keywords per topic', values: ['25', '150', '500'] },
    { label: 'Platforms covered', values: ['Reddit + HN', 'Reddit + HN + Lobsters', 'All supported'] },
    { label: 'AI relevance scoring', values: [false, true, true] },
    { label: 'Daily digest', values: [true, true, true] },
    { label: 'Real-time alerts', values: [false, true, true] },
    { label: 'Thread summaries', values: [true, true, true] },
    { label: 'Suggested reply drafts', values: [false, true, true] },
    { label: 'Competitor mention flags', values: [false, true, true] },
    { label: 'Telegram chat seats', values: ['1', '2', '5'] },
    { label: 'Team workflows', values: [false, false, true] },
    { label: 'Alert throughput', values: ['Digest only', 'Up to 3/hr', 'Higher cap'] },
    { label: 'Setup support', values: ['Self-serve', 'Guided setup', 'White-glove'] },
  ]

  const renderCell = (value, highlighted = false) => {
    if (value === true) {
      return (
        <Check
          className={`mx-auto h-4 w-4 ${highlighted ? 'opacity-100' : 'opacity-80'}`}
          style={{ color: 'var(--rm-accent)' }}
        />
      )
    }
    if (value === false) {
      return <X className="mx-auto h-4 w-4 opacity-30" />
    }
    return <span className="text-[14px] leading-relaxed md:text-[15px]">{value}</span>
  }

  return (
    <section id="pricing" ref={ref} className="py-24 md:py-32">
      <div className={`transition-all duration-700 ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}>
        <Label>Pricing</Label>
        <div className="mt-3 grid items-start gap-6 lg:grid-cols-[1fr,320px] lg:gap-14">
          <div>
            <h2 className={`${space.className} text-2xl font-bold md:text-[1.75rem]`}>
              Straightforward pricing for the beta
            </h2>
            <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed opacity-55">
              Same agent, same workflow, different limits. Start free, then upgrade when you want more topics, faster
              alerts, and team collaboration.
            </p>
          </div>
          <div className={`${mono.className} text-[10px] uppercase leading-relaxed tracking-[0.12em] opacity-25`}>
            <p>Telegram-first experience</p>
            <p className="mt-2">No dashboard required • Cancel anytime • Beta pricing</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:gap-5 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={`overflow-hidden rounded-2xl transition-all duration-700 ${v ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{
              transitionDelay: `${120 + i * 90}ms`,
              border: plan.highlight ? '1px solid rgba(201,120,58,0.22)' : '1px solid var(--rm-line)',
              background: 'rgba(25,22,18,0.012)',
            }}>
            <div
              className="px-5 py-3"
              style={{
                background: plan.highlight ? 'rgba(201,120,58,0.10)' : 'rgba(25,22,18,0.02)',
                borderBottom: '1px solid rgba(25,22,18,0.05)',
              }}>
              <p
                className={`${mono.className} text-[10px] uppercase tracking-[0.12em]`}
                style={{ color: plan.highlight ? 'var(--rm-accent)' : 'var(--rm-text-muted)' }}>
                {plan.subtitle}
              </p>
            </div>

            <div className="p-5 md:p-6">
              <h3 className={`${space.className} text-[22px] font-semibold tracking-tight`}>{plan.name}</h3>
              <div className="mt-3 flex items-end gap-1.5">
                <span
                  className={`${space.className} text-[34px] font-bold leading-none tracking-tight`}
                  style={{ color: plan.highlight ? 'var(--rm-accent)' : 'var(--rm-text)' }}>
                  {plan.price}
                </span>
                <span className="mb-1 text-[15px] opacity-45">{plan.cadence}</span>
              </div>
              <p className="mt-3 min-h-[44px] text-[15px] leading-relaxed opacity-55">{plan.billing}</p>

              <a
                href="#waitlist"
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-[15px] font-semibold transition-colors ${plan.highlight ? '' : 'hover:opacity-80'}`}
                style={
                  plan.highlight
                    ? { background: 'var(--rm-accent)', color: 'var(--rm-bg)' }
                    : { border: '1px solid var(--rm-line)', color: 'var(--rm-text)' }
                }>
                {plan.cta}
                {plan.highlight && <ArrowRight className="h-3.5 w-3.5" />}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mt-6 overflow-hidden rounded-2xl transition-all duration-700 ${v ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        style={{
          transitionDelay: '320ms',
          border: '1px solid var(--rm-line)',
          background: 'rgba(25,22,18,0.012)',
        }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--rm-line)' }}>
                <th className="px-4 py-3 text-left text-[13px] font-medium opacity-45 md:px-5">Feature</th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className={`px-4 py-3 text-center md:px-5 ${plan.highlight ? '' : ''}`}
                    style={{
                      borderLeft: '1px solid rgba(25,22,18,0.04)',
                      background: plan.highlight ? 'rgba(201,120,58,0.05)' : 'transparent',
                    }}>
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={`${space.className} text-[15px] font-semibold tracking-tight`}
                        style={{ color: plan.highlight ? 'var(--rm-accent)' : 'var(--rm-text)' }}>
                        {plan.name}
                      </span>
                      <span className={`${mono.className} text-[10px] uppercase tracking-[0.1em] opacity-25`}>
                        {plan.subtitle}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={row.label} style={{ borderTop: rowIdx > 0 ? '1px solid rgba(25,22,18,0.04)' : 'none' }}>
                  <td className="whitespace-nowrap px-4 py-3.5 text-[15px] leading-relaxed opacity-60 md:px-5">
                    {row.label}
                  </td>
                  {row.values.map((value, i) => (
                    <td
                      key={`${row.label}-${plans[i].name}`}
                      className="px-4 py-3.5 text-center align-middle md:px-5"
                      style={{
                        borderLeft: '1px solid rgba(25,22,18,0.04)',
                        background: plans[i].highlight ? 'rgba(201,120,58,0.02)' : 'transparent',
                      }}>
                      <div className={`mx-auto w-full ${typeof value === 'string' ? 'max-w-[180px]' : ''}`}>
                        {renderCell(value, plans[i].highlight)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`mt-6 grid gap-4 transition-all duration-700 md:grid-cols-3 ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}
        style={{ transitionDelay: '420ms' }}>
        {[
          ['Beta setup included', 'We help you configure your first watch topics and competitor terms.'],
          ['Telegram-first workflow', 'Alerts, summaries, and drafts arrive where your team already works.'],
          ['Need more than this?', 'Route edge cases to your contact section instead of expanding the pricing table.'],
        ].map(([title, copy], i) => (
          <div
            key={title}
            className="rounded-xl p-4"
            style={{
              border: '1px solid rgba(25,22,18,0.05)',
              background: 'rgba(25,22,18,0.01)',
              transitionDelay: `${460 + i * 80}ms`,
            }}>
            <p className="text-[15px] font-semibold">{title}</p>
            <p className="mt-1.5 text-[15px] leading-relaxed opacity-50">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function DemoChat() {
  const [ref, v] = useReveal()
  return (
    <section id="demo" ref={ref} className="py-24 md:py-32">
      <Label>Demo</Label>
      <h2
        className={`${space.className} mb-10 mt-3 text-2xl font-bold transition-all duration-700 md:text-[1.75rem] ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}>
        Ask your agent anything
      </h2>
      <div className="max-w-[480px] space-y-4">
        <div
          className={`transition-all duration-500 ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}
          style={{ transitionDelay: '100ms' }}>
          <Label className="mb-1.5 block">You</Label>
          <p className="text-[16px] leading-relaxed">What&apos;s the best angle here? They seem price-sensitive.</p>
        </div>
        <div style={{ height: 1, background: 'var(--rm-line)' }} />
        <div
          className={`transition-all duration-500 ${v ? 'opacity-100' : 'translate-y-3 opacity-0'}`}
          style={{ transitionDelay: '300ms' }}>
          <Label className="mb-1.5 block">Agent</Label>
          <ul className="space-y-2">
            {[
              'Lead with cost savings — $35/mo saved is $420/yr',
              'Mention speed: same-day vs 3–5 business days',
              "Don't pitch directly — share personal experience",
            ].map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-[16px] leading-relaxed opacity-60">
                <span className="mt-1.5 text-[5px]">●</span> {b}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`pt-2 transition-all duration-500 ${v ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '500ms' }}>
          <p className={`${mono.className} text-[10px] tracking-[0.1em] opacity-20`}>
            ASK: &ldquo;SUMMARIZE&rdquo; · &ldquo;SUGGEST A REPLY&rdquo; · &ldquo;TRACK THIS TOPIC&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
