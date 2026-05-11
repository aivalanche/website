'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'

// ───────────────────────────────────────────────────────
// Platform glyphs (kept from the previous version)
// ───────────────────────────────────────────────────────
const RedditIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
)

const HackerNewsIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M0 0v24h24V0H0zm11.09 13.57V18.1h1.818v-4.53l4.364-7.726h-2.01l-3.21 5.932L8.84 5.844H6.727l4.364 7.726z" />
  </svg>
)

const LobstersIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" opacity="0.15" />
    <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor" fontFamily="serif">
      L
    </text>
  </svg>
)

const sources = [
  { name: 'Reddit', detail: 'subreddits · keywords', Icon: RedditIcon },
  { name: 'Hacker News', detail: 'stories · comments', Icon: HackerNewsIcon },
  { name: 'Lobsters', detail: 'tags · comments', Icon: LobstersIcon },
]

const whatYouGet = [
  'High-intent alerts only',
  'Thread summary + key quotes',
  'Suggested reply draft',
  'Competitor mentions flagged',
  'Daily digest at 08:00 CET',
]

const howItWorksSteps = [
  {
    n: '01',
    title: 'Choose what to watch',
    body: 'Keywords, subreddits, competitors. Quoted phrases for precision matching.',
  },
  {
    n: '02',
    title: 'Agent filters + scores',
    body: 'Deduplication, spam blocking, GPT relevance scoring. Only signal survives.',
  },
  {
    n: '03',
    title: 'You get an alert + chat',
    body: 'Ask for summary, suggested reply, or next steps. Act in seconds.',
  },
]

const detailsAcc = [
  {
    t: 'Filtering &amp; scoring',
    c: 'Subreddit denylist, promo detection, MD5 dedup. GPT-4o-mini scores every post 1–10 for relevance with reasoning.',
  },
  {
    t: 'Digests &amp; alerts',
    c: 'Daily HTML report at 08:00 CET. Real-time watchdog for threads with 5+ comments. Throttled to 3 alerts/hour.',
  },
  {
    t: 'Tracking competitors',
    c: 'Auto-detects Wise, Remitly, Western Union, and 8+ others. Surfaces unanswered pain points.',
  },
  {
    t: 'Team workflows',
    c: 'Share alerts with your team channel. Assign threads. Track replies.',
  },
  {
    t: 'Integrations &amp; roadmap',
    c: 'Telegram today. Slack, Discord, and webhook support coming soon.',
  },
]

const securityBullets = [
  'Tokens encrypted at rest — never stored in plain text',
  'We never post, comment, or vote on your behalf',
  'Data retained 30 days, then deleted',
]

const plans = [
  {
    name: 'Free',
    subtitle: 'Beta sandbox',
    price: '$0',
    cadence: '/mo',
    billing: 'Good for testing your first watchlist.',
    cta: 'Join beta',
    highlight: false,
  },
  {
    name: 'Power',
    subtitle: 'Most teams',
    price: '$49',
    cadence: '/mo',
    billing: 'Best for active monitoring + replies.',
    cta: 'Get early access',
    highlight: true,
  },
  {
    name: 'Ultra',
    subtitle: 'Best for business',
    price: '$149',
    cadence: '/mo',
    billing: 'Higher limits + team workflows.',
    cta: 'Get early access',
    highlight: false,
  },
]

const planRows = [
  { label: 'Watch topics', values: ['2', '10', '30'] },
  { label: 'Keywords per topic', values: ['25', '150', '500'] },
  { label: 'Platforms covered', values: ['Reddit + HN', 'Reddit + HN + Lobsters', 'All supported'] },
  { label: 'AI relevance scoring', values: ['—', '✓', '✓'] },
  { label: 'Daily digest', values: ['✓', '✓', '✓'] },
  { label: 'Real-time alerts', values: ['—', '✓', '✓'] },
  { label: 'Thread summaries', values: ['✓', '✓', '✓'] },
  { label: 'Suggested reply drafts', values: ['—', '✓', '✓'] },
  { label: 'Competitor mention flags', values: ['—', '✓', '✓'] },
  { label: 'Telegram chat seats', values: ['1', '2', '5'] },
  { label: 'Team workflows', values: ['—', '—', '✓'] },
  { label: 'Alert throughput', values: ['Digest only', 'Up to 3/hr', 'Higher cap'] },
  { label: 'Setup support', values: ['Self-serve', 'Guided setup', 'White-glove'] },
]

export default function RedditMonitorPage() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [openAcc, setOpenAcc] = useState(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const ctaRef = useRef(null)

  const scrollToCta = useCallback(() => ctaRef.current?.scrollIntoView({ behavior: 'smooth' }), [])

  useEffect(() => {
    if (!submitted) return
    const t = setTimeout(() => setSubmitted(false), 4000)
    return () => clearTimeout(t)
  }, [submitted])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale: 'en', source: 'reddit-monitor' }),
      })
    } catch {
      // optimistic — keep success state if tracking is briefly unavailable
    }
    setSubmitted(true)
    setEmail('')
    setSubmitting(false)
  }

  return (
    <div className="lf-root">
      <SecondaryNavbar />

      {/* HERO */}
      <section className="lf-page-hero">
        <div className="container">
          <div className="meta-row">
            <div className="cell">SUB-AGENT · LF-RM</div>
            <div className="cell">SOURCES · REDDIT · HN · LOBSTERS</div>
            <div className="cell" />
            <div className="cell" style={{ justifyContent: 'flex-end' }}>
              DELIVERY · TELEGRAM
            </div>
          </div>

          <div className="lf-eyebrow">REDDIT MONITOR / SUB-AGENT</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'end' }}>
            <div>
              <h1 className="lf-h1">An agent that watches the internet for your customers.</h1>
              <p className="lf-lede" style={{ maxWidth: '56ch' }}>
                Your future customers are posting right now — asking questions you can answer, complaining about
                competitors, looking for exactly what you sell. This sub-agent monitors those conversations across
                Reddit, Hacker News and Lobsters, filters the noise, and sends you only the threads worth replying to.
              </p>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <button onClick={scrollToCta} className="btn orange" style={{ height: 48 }}>
                  Get early access <span className="arr">→</span>
                </button>
                <a href="#demo-video" className="mono upp" style={{ fontSize: 11, color: 'var(--ink-2)' }}>
                  Watch demo ↓
                </a>
              </div>
            </div>

            {/* Coverage card */}
            <div className="lf-card">
              <div className="mono upp" style={{ fontSize: 10, color: 'var(--ink-2)', marginBottom: 14 }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    background: 'var(--orange)',
                    marginRight: 8,
                    verticalAlign: 'middle',
                  }}
                />
                COVERS · 24/7
              </div>
              {sources.map(({ name, detail, Icon }, i) => (
                <div
                  key={name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '32px 1fr',
                    gap: 12,
                    padding: '10px 0',
                    borderTop: i > 0 ? '1px solid var(--line)' : '0',
                  }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      border: '1px solid var(--line)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--ink)',
                    }}>
                    <Icon />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{name}</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--ink-2)' }}>
                      {detail}
                    </div>
                  </div>
                </div>
              ))}
              <div
                className="mono upp"
                style={{
                  fontSize: 10,
                  color: 'var(--ink-2)',
                  borderTop: '1px solid var(--line)',
                  paddingTop: 10,
                  marginTop: 6,
                }}>
                ⚡ Delivered to Telegram
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO FACADE */}
      <section id="demo-video" className="lf-page" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div className="lf-eyebrow">DEMO / 0:30</div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setVideoLoaded(true)}
            onKeyDown={(e) => e.key === 'Enter' && setVideoLoaded(true)}
            style={{
              position: 'relative',
              aspectRatio: '16 / 9',
              border: '1px solid var(--ink)',
              background: '#0c0c0b',
              cursor: 'pointer',
              overflow: 'hidden',
            }}>
            {!videoLoaded ? (
              <>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(145deg, #0c0c0b 0%, #1c1c1a 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      background: 'var(--orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: 24,
                    }}>
                    ▶
                  </div>
                </div>
                <div
                  className="mono upp"
                  style={{ position: 'absolute', bottom: 18, left: 22, color: '#a5a5a0', fontSize: 11 }}>
                  <div style={{ color: 'var(--orange)' }}>● DEMO</div>
                  <div style={{ marginTop: 4 }}>See how alerts + chat work</div>
                </div>
                <div
                  className="mono upp"
                  style={{ position: 'absolute', bottom: 18, right: 22, color: '#7a7a76', fontSize: 11 }}>
                  0:30
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
        </div>
      </section>

      {/* SAMPLE THREAD + CALLOUTS */}
      <section className="lf-page" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="lf-eyebrow">SAMPLE / LIVE THREAD</div>
          <h2 className="lf-h2">From a noisy feed to a clean, scored thread.</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr minmax(0, 460px) 1fr',
              gap: 0,
              marginTop: 24,
              alignItems: 'stretch',
            }}>
            {/* left labels */}
            <div style={{ paddingTop: 16 }}>
              <div className="mono upp" style={{ fontSize: 10, color: 'var(--ink-2)', marginBottom: 4 }}>
                ◄ MONITORS
              </div>
              <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 14, maxWidth: '20ch' }}>
                Reddit, HN, Lobsters, keywords
              </p>
              <div
                className="mono upp"
                style={{ fontSize: 10, color: 'var(--ink-2)', marginTop: 64, marginBottom: 4 }}>
                ◄ DELIVERS
              </div>
              <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 14, maxWidth: '20ch' }}>
                Telegram alerts, daily digest
              </p>
            </div>

            {/* center artifact */}
            <div className="lf-card" style={{ alignSelf: 'stretch' }}>
              <div className="mono upp" style={{ fontSize: 10, color: 'var(--orange)', marginBottom: 12 }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    background: 'var(--orange)',
                    marginRight: 8,
                    verticalAlign: 'middle',
                  }}
                />
                NEW THREAD DETECTED
              </div>
              <p style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>
                &ldquo;Best alternatives to Western Union for sending money to Nigeria?&rdquo;
              </p>
              <p className="mono" style={{ margin: 0, fontSize: 11, color: 'var(--ink-2)' }}>
                r/personalfinance · 12 min ago · ⬆142 · 💬23
              </p>
              <ul style={{ margin: '14px 0 0', padding: 0, listStyle: 'none', borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                {[
                  'User sends $500/mo, frustrated with 7% fees',
                  'Comparing Wise, Remitly, crypto options',
                  'Thread gaining traction — 5 new comments/hr',
                ].map((b) => (
                  <li key={b} style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 6 }}>
                    · {b}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                <div className="mono upp" style={{ fontSize: 10, color: 'var(--ink-2)', marginBottom: 4 }}>
                  SUGGESTED REPLY
                </div>
                <p style={{ margin: 0, fontStyle: 'italic', fontSize: 14, color: 'var(--ink-2)' }}>
                  &ldquo;I switched from WU to a stablecoin rail — cost dropped from 7% to under 1%.&rdquo;
                </p>
              </div>
            </div>

            {/* right labels */}
            <div style={{ paddingTop: 16, textAlign: 'right' }}>
              <div className="mono upp" style={{ fontSize: 10, color: 'var(--ink-2)', marginBottom: 4 }}>
                FILTERS ►
              </div>
              <p style={{ margin: '0 0 0 auto', color: 'var(--ink-2)', fontSize: 14, maxWidth: '20ch' }}>
                noise, spam, duplicates, low intent
              </p>
              <div
                className="mono upp"
                style={{ fontSize: 10, color: 'var(--ink-2)', marginTop: 64, marginBottom: 4 }}>
                YOU CHAT ►
              </div>
              <p style={{ margin: '0 0 0 auto', color: 'var(--ink-2)', fontSize: 14, maxWidth: '20ch' }}>
                ask, reply, decide next steps
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">WHAT YOU GET</div>
          <h2 className="lf-h2">Signal — not feeds.</h2>
          <ul
            style={{
              listStyle: 'none',
              margin: '32px 0 0',
              padding: 0,
              borderTop: '1px solid var(--line)',
            }}>
            {whatYouGet.map((item) => (
              <li
                key={item}
                style={{
                  padding: '18px 0',
                  borderBottom: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  fontSize: 17,
                }}>
                <span
                  style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--orange)', flexShrink: 0 }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="lf-page" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="lf-eyebrow">HOW IT WORKS</div>
          <h2 className="lf-h2">Three steps from feed to action.</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 0,
              borderTop: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
              marginTop: 24,
            }}>
            {howItWorksSteps.map((s, i) => (
              <div
                key={s.n}
                style={{
                  padding: '24px 24px 28px',
                  borderRight: i < howItWorksSteps.length - 1 ? '1px solid var(--line)' : 0,
                }}>
                <div className="mono upp" style={{ fontSize: 11, color: 'var(--orange)', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 10 }}>
                  STEP / {s.n}
                  <span style={{ flex: 1, height: 1, background: 'var(--orange)', opacity: 0.4 }} />
                </div>
                <h3 className="lf-h3" style={{ fontSize: 22 }}>{s.title}</h3>
                <p style={{ margin: 0, color: 'var(--ink-2)', fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, lineHeight: 1.55 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO CHAT */}
      <section className="lf-page">
        <div className="container">
          <div className="lf-eyebrow">DEMO / ASK THE AGENT</div>
          <h2 className="lf-h2">Ask in plain English. Get a plan.</h2>

          <div style={{ marginTop: 24, maxWidth: 560, display: 'grid', gap: 16 }}>
            <div className="lf-card">
              <div className="mono upp" style={{ fontSize: 10, color: 'var(--ink-2)', marginBottom: 6 }}>
                YOU
              </div>
              <p style={{ margin: 0, fontSize: 16 }}>
                What&apos;s the best angle here? They seem price-sensitive.
              </p>
            </div>
            <div className="lf-card lf-card-orange">
              <div className="mono upp" style={{ fontSize: 10, marginBottom: 6 }}>
                AGENT
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {[
                  'Lead with cost savings — $35/mo saved is $420/yr',
                  'Mention speed: same-day vs 3–5 business days',
                  "Don't pitch directly — share personal experience",
                ].map((b) => (
                  <li key={b} style={{ marginBottom: 6, fontSize: 15 }}>
                    · {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mono upp" style={{ fontSize: 10, color: 'var(--ink-2)' }}>
              ASK: &ldquo;SUMMARIZE&rdquo; · &ldquo;SUGGEST A REPLY&rdquo; · &ldquo;TRACK THIS TOPIC&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="lf-page" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="lf-eyebrow">PRICING</div>
          <h2 className="lf-h2">Straightforward pricing for the beta.</h2>
          <p className="lf-lede">
            Same agent, same workflow, different limits. Start free, then upgrade when you want more topics, faster
            alerts, and team collaboration.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 0,
              borderTop: '1px solid var(--line)',
              borderLeft: '1px solid var(--line)',
              marginTop: 24,
            }}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                style={{
                  borderRight: '1px solid var(--line)',
                  borderBottom: '1px solid var(--line)',
                  padding: 28,
                  background: plan.highlight ? 'var(--bg)' : 'var(--bg)',
                  position: 'relative',
                }}>
                {plan.highlight && (
                  <span
                    className="mono upp"
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: 'var(--orange)',
                      color: '#fff',
                      fontSize: 10,
                      padding: '4px 8px',
                      letterSpacing: '.12em',
                    }}>
                    MOST POPULAR
                  </span>
                )}
                <div className="mono upp" style={{ fontSize: 10, color: plan.highlight ? 'var(--orange)' : 'var(--ink-2)' }}>
                  {plan.subtitle}
                </div>
                <h3 className="lf-h3" style={{ fontSize: 26, marginTop: 8 }}>
                  {plan.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 14 }}>
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 800,
                      letterSpacing: '-.03em',
                      color: plan.highlight ? 'var(--orange)' : 'var(--ink)',
                    }}>
                    {plan.price}
                  </span>
                  <span style={{ color: 'var(--ink-2)', fontSize: 15 }}>{plan.cadence}</span>
                </div>
                <p style={{ minHeight: 44, color: 'var(--ink-2)', fontSize: 14, margin: '12px 0 20px' }}>
                  {plan.billing}
                </p>
                <button
                  onClick={scrollToCta}
                  className={plan.highlight ? 'btn orange' : 'btn'}
                  style={{ height: 44, width: '100%', justifyContent: 'center' }}>
                  {plan.cta} <span className="arr">→</span>
                </button>
              </div>
            ))}
          </div>

          {/* Feature comparison table */}
          <div style={{ marginTop: 32, overflowX: 'auto', border: '1px solid var(--line)', background: 'var(--bg)' }}>
            <table style={{ width: '100%', minWidth: 720, borderCollapse: 'collapse', fontFamily: 'var(--font-archivo)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
                  <th
                    className="mono upp"
                    style={{ padding: '14px 18px', textAlign: 'left', fontSize: 10, color: 'var(--ink-2)', fontWeight: 600 }}>
                    Feature
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.name}
                      style={{
                        padding: '14px 18px',
                        textAlign: 'center',
                        borderLeft: '1px solid var(--line)',
                        color: p.highlight ? 'var(--orange)' : 'var(--ink)',
                        fontSize: 14,
                      }}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planRows.map((row) => (
                  <tr key={row.label} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '12px 18px', fontSize: 14, color: 'var(--ink-2)' }}>{row.label}</td>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        style={{
                          padding: '12px 18px',
                          textAlign: 'center',
                          borderLeft: '1px solid var(--line)',
                          fontSize: 14,
                          color: v === '✓' ? 'var(--orange)' : v === '—' ? 'var(--ink-3)' : 'var(--ink)',
                          fontWeight: v === '✓' ? 700 : 400,
                          background: plans[i].highlight ? 'rgba(255,77,18,0.03)' : 'transparent',
                        }}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DETAILS + CTA */}
      <section id="details" className="lf-page">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div>
              <div className="lf-eyebrow">DETAILS</div>
              <h2 className="lf-h2">Specifics for the engineers.</h2>
              <div style={{ marginTop: 24 }}>
                {detailsAcc.map((item, i) => (
                  <div key={item.t} style={{ borderBottom: '1px solid var(--line)' }}>
                    <button
                      onClick={() => setOpenAcc(openAcc === i ? null : i)}
                      style={{
                        background: 'transparent',
                        border: 0,
                        color: 'var(--ink)',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left',
                        padding: '16px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 15,
                        fontWeight: 600,
                      }}>
                      <span dangerouslySetInnerHTML={{ __html: item.t }} />
                      <span style={{ color: 'var(--orange)', fontSize: 14, transform: openAcc === i ? 'rotate(45deg)' : 'none', transition: 'transform .2s' }}>+</span>
                    </button>
                    {openAcc === i && (
                      <p
                        style={{
                          margin: 0,
                          padding: '0 0 16px',
                          color: 'var(--ink-2)',
                          fontSize: 14,
                          maxWidth: '52ch',
                          fontFamily: 'var(--font-jetbrains-mono)',
                          lineHeight: 1.6,
                        }}
                        dangerouslySetInnerHTML={{ __html: item.c }}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 40 }}>
                <div className="lf-eyebrow">SECURITY &amp; PRIVACY</div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {securityBullets.map((s) => (
                    <li key={s} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--ink-2)', marginBottom: 8 }}>
                      <span style={{ color: 'var(--good)', fontWeight: 700 }}>✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div ref={ctaRef} id="waitlist" style={{ alignSelf: 'start', position: 'sticky', top: 32 }}>
              <div className="lf-card">
                <div className="lf-eyebrow" style={{ marginBottom: 14 }}>GET EARLY ACCESS</div>
                <h2 className="lf-h2" style={{ fontSize: 28 }}>
                  Join the waitlist.
                </h2>
                <p style={{ margin: '8px 0 20px', color: 'var(--ink-2)', fontSize: 14 }}>
                  We&apos;ll set up your agent and ping you when it&apos;s live.
                </p>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    disabled={submitting}
                    className="lf-input"
                  />
                  <button type="submit" disabled={submitting} className="lf-submit" style={{ justifyContent: 'center' }}>
                    {submitting ? 'Sending…' : submitted ? "You're on the list ✓" : 'Join waitlist'}{' '}
                    {!submitting && !submitted && <span className="arr">→</span>}
                  </button>
                </form>
                <p className="mono upp" style={{ fontSize: 10, color: 'var(--ink-2)', marginTop: 16, letterSpacing: '.12em' }}>
                  FREE DURING BETA · CANCEL ANYTIME
                </p>
              </div>

              <div style={{ marginTop: 18 }}>
                <Link
                  href="/request-demo"
                  className="mono upp"
                  style={{ color: 'var(--orange)', fontSize: 12, letterSpacing: '.1em' }}>
                  Need a walkthrough instead? →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {submitted && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'var(--orange)',
            color: '#fff',
            padding: '10px 16px',
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: 12,
            letterSpacing: '.05em',
            zIndex: 1001,
          }}>
          ✓ You&apos;re on the list.
        </div>
      )}

      <Footer />
    </div>
  )
}
