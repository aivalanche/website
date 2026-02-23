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
        <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor" fontFamily="serif">L</text>
    </svg>
)

const space = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'] })

// ─── Biscuit palette ───
const theme = {
    bg: '#F3EDE3', bgAlt: '#EBE4D8', text: '#191612', textSoft: 'rgba(25,22,18,0.55)',
    textMuted: 'rgba(25,22,18,0.28)', line: '#D9D2C5', surface: 'rgba(25,22,18,0.03)',
    accent: '#C9783A', navBg: 'rgba(243,237,227,0.9)',
    videoPosterA: '#191612', videoPosterB: '#2A241C', videoText: 'rgba(255,255,255,0.7)',
    videoTextMuted: 'rgba(255,255,255,0.3)', selection: 'rgba(201,120,58,0.15)',
}

// ─── Scroll reveal ───
function useReveal() {
    const ref = useRef(null)
    const [v, setV] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.1 })
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
        try { await fetch('/api/early-access', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source: 'reddit-monitor' }) }) } catch { }
        setSubmitted(true); setEmail(''); setSubmitting(false)
        setTimeout(() => setSubmitted(false), 4000)
    }

    return (
        <>
            <style jsx global>{`
        .rm-page {
          background: var(--rm-bg);
          color: var(--rm-text);
          font-family: inherit;
          min-height: 100vh;
          transition: background 0.5s ease, color 0.5s ease;
        }
        .rm-page .label {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--rm-text-muted);
        }
        .rm-page a, .rm-page button { color: inherit; }
        .rm-page ::selection { background: var(--rm-selection); }

        .rm-video-facade {
          position: relative;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .rm-video-facade:hover { transform: scale(1.005); }
        .rm-video-facade .play-btn {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center; z-index: 2;
        }
        .rm-video-facade .play-btn span {
          width: 72px; height: 72px; border-radius: 50%;
          background: var(--rm-accent);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s ease;
        }
        .rm-video-facade:hover .play-btn span { transform: scale(1.08); }
        .rm-video-facade .poster-text {
          position: absolute; bottom: 24px; left: 24px; z-index: 2;
        }
        /* Hide global dark/light toggle on this page */
        .toggle-button { display: none !important; }
      `}</style>

            <div className="rm-page" style={{
                '--rm-bg': theme.bg, '--rm-bg-alt': theme.bgAlt, '--rm-text': theme.text,
                '--rm-text-soft': theme.textSoft, '--rm-text-muted': theme.textMuted,
                '--rm-line': theme.line, '--rm-surface': theme.surface, '--rm-accent': theme.accent,
                '--rm-selection': theme.selection,
            }}>

                {/* ═══ NAV ═══ */}
                <header className="relative">
                    <div className={`fixed left-0 z-50 w-full transition-all duration-300 ${sticky ? 'backdrop-blur-md' : ''}`}
                        style={{ backgroundColor: sticky ? theme.navBg : 'transparent' }}>
                        <nav className="max-w-[1100px] mx-auto px-6 flex items-center py-5">
                            <Link href="/" className={`${space.className} text-base font-semibold tracking-tight`}>
                                AIvalanche
                            </Link>
                            <div className="hidden md:flex items-center gap-6 ml-auto">
                                <a href="#how-it-works" className="text-[13px] opacity-50 hover:opacity-100 transition-opacity">How it works</a>
                                <a href="#details" className="text-[13px] opacity-50 hover:opacity-100 transition-opacity">Details</a>
                                <button onClick={scrollToCta}
                                    className="text-[13px] font-semibold px-5 py-2 rounded-full transition-colors"
                                    style={{ background: 'var(--rm-accent)', color: 'var(--rm-bg)' }}>
                                    Get early access
                                </button>
                            </div>
                            <button className="md:hidden ml-auto" onClick={() => setMobileMenu(!mobileMenu)}>
                                {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                            {mobileMenu && (
                                <div className="absolute top-full left-0 right-0 md:hidden p-6 space-y-3" style={{ background: 'var(--rm-bg)', borderBottom: '1px solid var(--rm-line)' }}>
                                    <a href="#how-it-works" onClick={() => setMobileMenu(false)} className="block text-sm">How it works</a>
                                    <a href="#details" onClick={() => setMobileMenu(false)} className="block text-sm">Details</a>
                                    <button onClick={() => { setMobileMenu(false); scrollToCta() }}
                                        className="w-full py-2.5 font-semibold rounded-full text-sm"
                                        style={{ background: 'var(--rm-accent)', color: 'var(--rm-bg)' }}>Get early access</button>
                                </div>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="max-w-[1100px] mx-auto px-6">

                    {/* ═══════════════════════════════════════
               SECTION 1 — HERO
          ═══════════════════════════════════════ */}
                    <section className="pt-[140px] md:pt-[180px] pb-20 md:pb-28">
                        <div className="grid lg:grid-cols-[1fr,400px] gap-12 lg:gap-16 items-center">
                            {/* Left — copy */}
                            <div>
                                <h1 className={`${space.className} text-[2.2rem] sm:text-[2.8rem] md:text-[3.5rem] font-bold leading-[1.1] tracking-[-0.025em]`}>
                                    An agent that watches Reddit, Hacker News & Lobsters for you.
                                </h1>

                                <p className="mt-8 text-[17px] leading-[1.65] opacity-60 max-w-[560px]">
                                    Your future customers are posting right now — asking questions you can answer,
                                    complaining about competitors, looking for exactly what you sell.
                                    This agent monitors those conversations across platforms, filters the noise with AI,
                                    and sends you only the threads worth replying to.
                                </p>

                                <p className="mt-5 text-[17px] leading-[1.65] opacity-60 max-w-[560px]">
                                    You chat back like texting a teammate:
                                    &ldquo;summarize this thread&rdquo;, &ldquo;draft a reply&rdquo;,
                                    &ldquo;what angle should I take?&rdquo; — and it answers in seconds.
                                    No dashboards, no logins. Just Telegram.
                                </p>

                                <div className="mt-10 flex items-center gap-6">
                                    <button onClick={scrollToCta}
                                        className="px-7 py-3.5 rounded-full font-semibold text-sm transition-colors flex items-center gap-2 group"
                                        style={{ background: 'var(--rm-accent)', color: 'var(--rm-bg)' }}>
                                        Get early access <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                    <a href="#demo-video" className="text-[13px] opacity-40 hover:opacity-80 transition-opacity">
                                        Watch demo ↓
                                    </a>
                                </div>

                                <p className={`${mono.className} mt-8 text-[10px] tracking-[0.14em] opacity-25`}>
                                    REDDIT · HACKER NEWS · LOBSTERS · 24/7 · TELEGRAM ALERTS
                                </p>
                            </div>

                            {/* Right — coverage annotation (YZiLabs poster style) */}
                            <div className="hidden lg:block">
                                <div className="max-w-[360px] ml-auto pl-8 py-2" style={{ borderLeft: '1px solid var(--rm-line)' }}>
                                    <div className="flex items-center justify-between gap-3 mb-4">
                                        <p className={`${mono.className} text-[10px] tracking-[0.15em] uppercase flex items-center gap-2`}
                                            style={{ color: 'var(--rm-text-muted)' }}>
                                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--rm-accent)' }} />
                                            Covers
                                        </p>
                                        <span className={`${mono.className} text-[10px] tracking-[0.12em] px-2 py-1 rounded-full`}
                                            style={{
                                                color: 'var(--rm-text-muted)',
                                                border: '1px solid rgba(25,22,18,0.06)',
                                                background: 'rgba(25,22,18,0.015)',
                                            }}>
                                            24/7
                                        </span>
                                    </div>

                                    <div
                                        className="rounded-2xl overflow-hidden"
                                        style={{
                                            border: '1px solid rgba(25,22,18,0.05)',
                                            background: 'rgba(25,22,18,0.02)',
                                        }}
                                    >
                                        {[
                                            { name: 'Reddit', detail: 'subreddits \u2022 keywords', Icon: RedditIcon, color: '#FF4500' },
                                            { name: 'HN', detail: 'stories \u2022 comments', Icon: HackerNewsIcon, color: '#FF6600' },
                                            { name: 'Lobsters', detail: 'tags \u2022 comments', Icon: LobstersIcon, color: '#8A5A44' },
                                        ].map(({ name, detail, Icon, color }, i) => (
                                            <div
                                                key={name}
                                                className="grid grid-cols-[34px,1fr] gap-3 px-4 py-3.5 items-start"
                                                style={{ borderTop: i > 0 ? '1px solid rgba(25,22,18,0.05)' : 'none' }}
                                            >
                                                <div
                                                    className="w-[34px] h-[34px] rounded-full flex items-center justify-center"
                                                    style={{
                                                        border: '1px solid rgba(25,22,18,0.05)',
                                                        background: 'rgba(25,22,18,0.025)',
                                                        color,
                                                    }}
                                                >
                                                    <Icon size={16} />
                                                </div>

                                                <div className="min-w-0 pt-0.5">
                                                    <p className="text-[14px] font-semibold leading-none">{name}</p>
                                                    <p
                                                        className={`${mono.className} text-[11px] mt-1.5`}
                                                        style={{ color: 'var(--rm-text-muted)' }}
                                                    >
                                                        {detail}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        <div
                                            className="px-4 py-3 flex items-center justify-between gap-3"
                                            style={{ borderTop: '1px solid rgba(25,22,18,0.05)' }}
                                        >
                                            <p className={`${mono.className} text-[10px] tracking-[0.1em] uppercase flex items-center gap-2`}
                                                style={{ color: 'var(--rm-text-muted)' }}>
                                                <Zap className="w-3 h-3" />
                                                Delivered to Telegram
                                            </p>
                                            <span className={`${mono.className} text-[10px] opacity-30`}>
                                                alerts + digests
                                            </span>
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
                        <div className="rm-video-facade" onClick={() => setVideoLoaded(true)} role="button" tabIndex={0}
                            aria-label="Play demo video"
                            onKeyDown={(e) => e.key === 'Enter' && setVideoLoaded(true)}>
                            {!videoLoaded ? (
                                <>
                                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(145deg, ${theme.videoPosterA} 0%, ${theme.videoPosterB} 100%)` }} />
                                    <div className="play-btn">
                                        <span><Play className="w-7 h-7 ml-1" style={{ color: theme.isDark ? theme.bg : '#fff' }} /></span>
                                    </div>
                                    <div className="poster-text">
                                        <p className={`${mono.className} text-[10px] tracking-[0.14em]`} style={{ color: theme.videoTextMuted }}>DEMO</p>
                                        <p className={`${space.className} text-sm font-medium mt-1`} style={{ color: theme.videoText }}>See how alerts + chat work</p>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 24, right: 24, zIndex: 2 }}>
                                        <span className={`${mono.className} text-[10px] tracking-[0.1em]`} style={{ color: theme.videoTextMuted }}>0:30</span>
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
                        <div className="hidden lg:grid grid-cols-[1fr,380px,1fr] items-center gap-0">
                            {/* Left-top label */}
                            <div className="flex items-center gap-0 self-start pt-4">
                                <div className="shrink-0">
                                    <Label>Monitors</Label>
                                    <p className="text-[15px] opacity-50 mt-1 max-w-[180px] leading-relaxed">Reddit, HN, Lobsters, keywords</p>
                                </div>
                                <div className="flex-1 h-px ml-4" style={{ background: 'var(--rm-line)' }} />
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--rm-text-muted)' }} />
                            </div>

                            {/* Center artifact — spans 3 rows */}
                            <div className="row-span-3 mx-2 p-5 rounded-lg" style={{ border: '1px solid var(--rm-line)', background: 'var(--rm-surface)' }}>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-[var(--rm-accent)]" />
                                    <Label className="!text-[var(--rm-text)] !opacity-60">New thread detected</Label>
                                </div>
                                <p className={`${space.className} text-[16px] font-semibold leading-snug mb-2`}>
                                    &ldquo;Best alternatives to Western Union for sending money to Nigeria?&rdquo;
                                </p>
                                <p className={`${mono.className} text-[10px] opacity-30 mb-4`}>
                                    r/personalfinance · 12 min ago · ⬆142 · 💬23
                                </p>
                                <div className="pt-3 space-y-1.5" style={{ borderTop: '1px solid var(--rm-line)' }}>
                                    {['User sends $500/mo, frustrated with 7% fees', 'Comparing Wise, Remitly, crypto options', 'Thread gaining traction — 5 new comments/hr'].map((b, i) => (
                                        <p key={i} className="text-[15px] opacity-55 leading-relaxed flex items-start gap-2">
                                            <span className="mt-1.5 text-[5px]">●</span> {b}
                                        </p>
                                    ))}
                                </div>
                                <div className="pt-3 mt-3" style={{ borderTop: '1px solid var(--rm-line)' }}>
                                    <Label className="!text-[var(--rm-text)] !opacity-40">Suggested reply</Label>
                                    <p className="text-[15px] opacity-60 mt-1 italic leading-relaxed">
                                        &ldquo;I switched from WU to a stablecoin rail — cost dropped from 7% to under 1%.&rdquo;
                                    </p>
                                </div>
                            </div>

                            {/* Right-top label */}
                            <div className="flex items-center gap-0 self-start pt-4">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--rm-text-muted)' }} />
                                <div className="flex-1 h-px mr-4" style={{ background: 'var(--rm-line)' }} />
                                <div className="shrink-0 text-right">
                                    <Label>Filters</Label>
                                    <p className="text-[15px] opacity-50 mt-1 max-w-[180px] ml-auto leading-relaxed">noise, spam, duplicates, low intent</p>
                                </div>
                            </div>

                            <div /><div />

                            {/* Left-bottom label */}
                            <div className="flex items-center gap-0 self-end pb-4">
                                <div className="shrink-0">
                                    <Label>Delivers</Label>
                                    <p className="text-[15px] opacity-50 mt-1 max-w-[180px] leading-relaxed">Telegram alerts, daily digest</p>
                                </div>
                                <div className="flex-1 h-px ml-4" style={{ background: 'var(--rm-line)' }} />
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--rm-text-muted)' }} />
                            </div>

                            {/* Right-bottom label */}
                            <div className="flex items-center gap-0 self-end pb-4">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--rm-text-muted)' }} />
                                <div className="flex-1 h-px mr-4" style={{ background: 'var(--rm-line)' }} />
                                <div className="shrink-0 text-right">
                                    <Label>You chat</Label>
                                    <p className="text-[15px] opacity-50 mt-1 max-w-[180px] ml-auto leading-relaxed">ask, reply, decide next steps</p>
                                </div>
                            </div>
                        </div>

                        {/* Mobile: stacked */}
                        <div className="lg:hidden">
                            <div className="p-5 rounded-lg mb-8" style={{ border: '1px solid var(--rm-line)', background: 'var(--rm-surface)' }}>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-[var(--rm-accent)]" />
                                    <Label className="!opacity-60">New thread detected</Label>
                                </div>
                                <p className={`${space.className} text-[16px] font-semibold leading-snug mb-2`}>
                                    &ldquo;Best alternatives to Western Union for sending money to Nigeria?&rdquo;
                                </p>
                                <p className={`${mono.className} text-[10px] opacity-30`}>r/personalfinance · ⬆142 · 💬23</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {[['Monitors', 'subreddits, keywords'], ['Filters', 'noise, spam, duplicates'], ['Delivers', 'Telegram alerts'], ['You chat', 'ask, reply, act']].map(([t, d], i) => (
                                    <div key={i}><Label>{t}</Label><p className="text-[15px] opacity-50 mt-1 leading-relaxed">{d}</p></div>
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
                        <div className="grid lg:grid-cols-2 gap-20">
                            <div>
                                <h2 className={`${space.className} text-2xl md:text-[1.75rem] font-bold mb-10`}>Details</h2>
                                <div>
                                    {[
                                        { t: 'Filtering & scoring', c: 'Subreddit denylist, promo detection, MD5 dedup. GPT-4o-mini scores every post 1–10 for relevance with reasoning.' },
                                        { t: 'Digests & alerts', c: 'Daily HTML report at 8 AM CET. Real-time watchdog for threads with 5+ comments. Throttled to 3 alerts/hour.' },
                                        { t: 'Tracking competitors', c: 'Auto-detects Wise, Remitly, Western Union, and 8+ others. Surfaces unanswered pain points.' },
                                        { t: 'Team workflows', c: 'Share alerts with your team channel. Assign threads. Track replies.' },
                                        { t: 'Integrations & roadmap', c: 'Telegram today. Slack, Discord, and webhook support coming soon.' },
                                    ].map((item, i) => (
                                        <div key={i} style={{ borderBottom: '1px solid var(--rm-line)' }}>
                                            <button onClick={() => setOpenAcc(openAcc === i ? null : i)}
                                                className="w-full py-4 flex items-center justify-between text-left group">
                                                <span className="text-[15px] font-medium group-hover:opacity-70 transition-opacity">{item.t}</span>
                                                <ChevronDown className={`w-3.5 h-3.5 opacity-25 transition-transform duration-300 ${openAcc === i ? 'rotate-180' : ''}`} />
                                            </button>
                                            <div className={`overflow-hidden transition-all duration-300 ${openAcc === i ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                                                <p className="text-[15px] opacity-50 leading-relaxed max-w-[440px]">{item.c}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Security */}
                                <div className="mt-12">
                                    <Label>Security & privacy</Label>
                                    <ul className="mt-4 space-y-2.5">
                                        {['Tokens encrypted at rest — never stored in plain text', 'We never post, comment, or vote on your behalf', 'Data retained 30 days, then deleted'].map((s, i) => (
                                            <li key={i} className="text-[15px] opacity-55 leading-relaxed flex items-start gap-2">
                                                <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-60" /> {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* CTA */}
                            <div ref={ctaRef} id="waitlist" className="lg:sticky lg:top-28 lg:self-start">
                                <h2 className={`${space.className} text-2xl md:text-[1.75rem] font-bold mb-3`}>Get early access</h2>
                                <p className="text-[15px] opacity-50 leading-relaxed mb-8 max-w-[380px]">
                                    Join the waitlist. We&apos;ll set up your agent and ping you when it&apos;s live.
                                </p>
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@company.com" required disabled={submitting}
                                        className="w-full rounded-lg px-4 py-3 text-[15px] bg-transparent placeholder:opacity-25 focus:outline-none focus:ring-1 focus:ring-[var(--rm-accent)]/30 transition-all"
                                        style={{ border: '1px solid var(--rm-line)' }}
                                    />
                                    <button type="submit" disabled={submitting}
                                        className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-[15px] font-semibold transition-all ${submitting ? 'opacity-40' : 'hover:bg-[#333]'
                                            }`}
                                        style={{ background: 'var(--rm-accent)', color: 'var(--rm-bg)' }}>
                                        {submitting ? '...' : <>{submitted ? "You're on the list ✓" : <>Join waitlist <ArrowRight className="w-3.5 h-3.5" /></>}</>}
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
                <footer className="max-w-[1100px] mx-auto px-6 py-8 flex items-center justify-between" style={{ borderTop: '1px solid var(--rm-line)' }}>
                    <p className={`${mono.className} text-[10px] opacity-20`}>© 2026 AIvalanche</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="text-[11px] opacity-20 hover:opacity-60 transition-opacity">Privacy</Link>
                        <Link href="/terms" className="text-[11px] opacity-20 hover:opacity-60 transition-opacity">Terms</Link>
                    </div>
                </footer>

                {submitted && (
                    <div className="fixed bottom-4 right-4 px-4 py-2.5 rounded-lg text-sm z-[1001] flex items-center gap-2"
                        style={{ background: 'var(--rm-accent)', color: 'var(--rm-bg)' }}>
                        <Check className="w-3.5 h-3.5" /> You&apos;re on the list.
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
            <h2 className={`${space.className} text-2xl md:text-[1.75rem] font-bold mb-10 transition-all duration-700 ${v ? 'opacity-100' : 'opacity-0 translate-y-3'}`}>
                What you get
            </h2>
            <ul>
                {items.map((item, i) => (
                    <li key={i} className={`py-3.5 text-[16px] leading-relaxed opacity-60 transition-all duration-500 ${v ? 'opacity-60' : 'opacity-0 translate-y-2'}`}
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
            <h2 className={`${space.className} text-2xl md:text-[1.75rem] font-bold mb-12 transition-all duration-700 ${v ? 'opacity-100' : 'opacity-0 translate-y-3'}`}>
                How it works
            </h2>
            <div className="relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px hidden md:block" style={{ background: 'var(--rm-line)' }} />
                <div className="space-y-10 md:space-y-8">
                    {steps.map((step, i) => (
                        <div key={i} className={`flex gap-5 items-start transition-all duration-600 ${v ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: `${i * 150}ms` }}>
                            <span className={`${mono.className} shrink-0 w-[15px] h-[15px] rounded-full flex items-center justify-center text-[8px] font-medium opacity-40 relative z-10`}
                                style={{ border: '1px solid var(--rm-line)', background: 'var(--rm-bg)' }}>
                                {i + 1}
                            </span>
                            <div className="max-w-[440px]">
                                <p className="text-[16px] font-semibold mb-1">{step.t}</p>
                                <p className="text-[15px] opacity-50 leading-relaxed">{step.d}</p>
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
            return <Check className={`w-4 h-4 mx-auto ${highlighted ? 'opacity-100' : 'opacity-80'}`} style={{ color: 'var(--rm-accent)' }} />
        }
        if (value === false) {
            return <X className="w-4 h-4 mx-auto opacity-30" />
        }
        return <span className="text-[14px] md:text-[15px] leading-relaxed">{value}</span>
    }

    return (
        <section id="pricing" ref={ref} className="py-24 md:py-32">
            <div className={`transition-all duration-700 ${v ? 'opacity-100' : 'opacity-0 translate-y-3'}`}>
                <Label>Pricing</Label>
                <div className="mt-3 grid lg:grid-cols-[1fr,320px] gap-6 lg:gap-14 items-start">
                    <div>
                        <h2 className={`${space.className} text-2xl md:text-[1.75rem] font-bold`}>
                            Straightforward pricing for the beta
                        </h2>
                        <p className="mt-4 text-[16px] opacity-55 leading-relaxed max-w-[640px]">
                            Same agent, same workflow, different limits. Start free, then upgrade when you want more topics,
                            faster alerts, and team collaboration.
                        </p>
                    </div>
                    <div className={`${mono.className} text-[10px] tracking-[0.12em] uppercase opacity-25 leading-relaxed`}>
                        <p>Telegram-first experience</p>
                        <p className="mt-2">No dashboard required • Cancel anytime • Beta pricing</p>
                    </div>
                </div>
            </div>

            <div className="mt-10 grid lg:grid-cols-3 gap-4 md:gap-5">
                {plans.map((plan, i) => (
                    <div
                        key={plan.name}
                        className={`rounded-2xl overflow-hidden transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{
                            transitionDelay: `${120 + i * 90}ms`,
                            border: plan.highlight ? '1px solid rgba(201,120,58,0.22)' : '1px solid var(--rm-line)',
                            background: 'rgba(25,22,18,0.012)',
                        }}
                    >
                        <div
                            className="px-5 py-3"
                            style={{
                                background: plan.highlight ? 'rgba(201,120,58,0.10)' : 'rgba(25,22,18,0.02)',
                                borderBottom: '1px solid rgba(25,22,18,0.05)',
                            }}
                        >
                            <p className={`${mono.className} text-[10px] tracking-[0.12em] uppercase`}
                                style={{ color: plan.highlight ? 'var(--rm-accent)' : 'var(--rm-text-muted)' }}>
                                {plan.subtitle}
                            </p>
                        </div>

                        <div className="p-5 md:p-6">
                            <h3 className={`${space.className} text-[22px] font-semibold tracking-tight`}>{plan.name}</h3>
                            <div className="mt-3 flex items-end gap-1.5">
                                <span
                                    className={`${space.className} text-[34px] leading-none font-bold tracking-tight`}
                                    style={{ color: plan.highlight ? 'var(--rm-accent)' : 'var(--rm-text)' }}
                                >
                                    {plan.price}
                                </span>
                                <span className="text-[15px] opacity-45 mb-1">{plan.cadence}</span>
                            </div>
                            <p className="mt-3 text-[15px] opacity-55 leading-relaxed min-h-[44px]">{plan.billing}</p>

                            <a
                                href="#waitlist"
                                className={`mt-5 w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-[15px] font-semibold transition-colors ${plan.highlight ? '' : 'hover:opacity-80'}`}
                                style={
                                    plan.highlight
                                        ? { background: 'var(--rm-accent)', color: 'var(--rm-bg)' }
                                        : { border: '1px solid var(--rm-line)', color: 'var(--rm-text)' }
                                }
                            >
                                {plan.cta}
                                {plan.highlight && <ArrowRight className="w-3.5 h-3.5" />}
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div
                className={`mt-6 rounded-2xl overflow-hidden transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{
                    transitionDelay: '320ms',
                    border: '1px solid var(--rm-line)',
                    background: 'rgba(25,22,18,0.012)',
                }}
            >
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[860px] border-collapse">
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--rm-line)' }}>
                                <th className="text-left px-4 md:px-5 py-3 text-[13px] font-medium opacity-45">Feature</th>
                                {plans.map((plan) => (
                                    <th
                                        key={plan.name}
                                        className={`px-4 md:px-5 py-3 text-center ${plan.highlight ? '' : ''}`}
                                        style={{
                                            borderLeft: '1px solid rgba(25,22,18,0.04)',
                                            background: plan.highlight ? 'rgba(201,120,58,0.05)' : 'transparent',
                                        }}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`${space.className} text-[15px] font-semibold tracking-tight`}
                                                style={{ color: plan.highlight ? 'var(--rm-accent)' : 'var(--rm-text)' }}>
                                                {plan.name}
                                            </span>
                                            <span className={`${mono.className} text-[10px] tracking-[0.1em] uppercase opacity-25`}>
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
                                    <td className="px-4 md:px-5 py-3.5 text-[15px] leading-relaxed opacity-60 whitespace-nowrap">
                                        {row.label}
                                    </td>
                                    {row.values.map((value, i) => (
                                        <td
                                            key={`${row.label}-${plans[i].name}`}
                                            className="px-4 md:px-5 py-3.5 text-center align-middle"
                                            style={{
                                                borderLeft: '1px solid rgba(25,22,18,0.04)',
                                                background: plans[i].highlight ? 'rgba(201,120,58,0.02)' : 'transparent',
                                            }}
                                        >
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

            <div className={`mt-6 grid md:grid-cols-3 gap-4 transition-all duration-700 ${v ? 'opacity-100' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: '420ms' }}>
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
                        }}
                    >
                        <p className="text-[15px] font-semibold">{title}</p>
                        <p className="text-[15px] opacity-50 leading-relaxed mt-1.5">{copy}</p>
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
            <h2 className={`${space.className} text-2xl md:text-[1.75rem] font-bold mt-3 mb-10 transition-all duration-700 ${v ? 'opacity-100' : 'opacity-0 translate-y-3'}`}>
                Ask your agent anything
            </h2>
            <div className="max-w-[480px] space-y-4">
                <div className={`transition-all duration-500 ${v ? 'opacity-100' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: '100ms' }}>
                    <Label className="mb-1.5 block">You</Label>
                    <p className="text-[16px] leading-relaxed">What&apos;s the best angle here? They seem price-sensitive.</p>
                </div>
                <div style={{ height: 1, background: 'var(--rm-line)' }} />
                <div className={`transition-all duration-500 ${v ? 'opacity-100' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: '300ms' }}>
                    <Label className="mb-1.5 block">Agent</Label>
                    <ul className="space-y-2">
                        {['Lead with cost savings — $35/mo saved is $420/yr', 'Mention speed: same-day vs 3–5 business days', 'Don\'t pitch directly — share personal experience'].map((b, i) => (
                            <li key={i} className="text-[16px] opacity-60 leading-relaxed flex items-start gap-2">
                                <span className="mt-1.5 text-[5px]">●</span> {b}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`pt-2 transition-all duration-500 ${v ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '500ms' }}>
                    <p className={`${mono.className} text-[10px] tracking-[0.1em] opacity-20`}>
                        ASK: &ldquo;SUMMARIZE&rdquo; · &ldquo;SUGGEST A REPLY&rdquo; · &ldquo;TRACK THIS TOPIC&rdquo;
                    </p>
                </div>
            </div>
        </section>
    )
}
