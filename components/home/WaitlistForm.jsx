'use client'
import { useState } from 'react'
import { useLocale } from './LocaleProvider'
import { translations } from '@/utils/translations'
import { ArrowRight, CheckCircle } from '@phosphor-icons/react'

export default function WaitlistForm() {
    const { locale } = useLocale()
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const t = translations[locale]

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
            // keep optimistic success state
        }
        setSubmitSuccess(true)
        setEmail('')
        setSubmitting(false)
        setTimeout(() => setSubmitSuccess(false), 4000)
    }

    const trustItems = locale === 'de'
        ? ['DSGVO-konform', 'Schnelles Onboarding', 'Enterprise-ready']
        : ['GDPR-compliant', 'Fast onboarding', 'Enterprise-ready']

    return (
        <>
            <section id="waitlist" className="relative overflow-hidden py-24 md:py-32">
                <div className="pointer-events-none absolute left-1/2 top-12 h-72 w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/5" />

                <div className="container relative">
                    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-borderColor/80 bg-white/80 p-8 shadow-[0_26px_65px_-34px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-borderColor-dark dark:bg-dark-200/80 md:p-12 lg:p-16">
                        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />

                        <div className="relative text-center">
                            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-xs font-medium tracking-wider text-primary dark:bg-primary/20">
                                {t.waitlist.badge}
                            </span>
                            <h2 className="mt-5 text-3xl font-bold text-paragraph dark:text-white md:text-4xl lg:text-5xl">
                                {t.waitlist.title}
                            </h2>
                            <p className="mx-auto mt-4 max-w-[560px] text-paragraph-light dark:text-white/80">
                                {t.waitlist.subtitle}
                            </p>

                            <form onSubmit={handleWaitlistSubmit} className="mx-auto mt-8 max-w-xl">
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t.waitlist.placeholder}
                                        required
                                        disabled={submitting}
                                        className="flex-1 rounded-xl border border-borderColor bg-white/90 px-5 py-3.5 text-paragraph placeholder:text-paragraph-light/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-borderColor-dark dark:bg-dark-100/90 dark:text-white dark:placeholder:text-white/40"
                                    />
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-7 py-3.5 font-semibold transition-all duration-300 ${submitting
                                            ? 'bg-primary/55'
                                            : 'bg-primary text-paragraph shadow-md shadow-primary/30 hover:bg-primary-200 hover:shadow-lg hover:shadow-primary/40'
                                            }`}
                                    >
                                        {submitting ? (
                                            <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        ) : (
                                            <>
                                                {t.waitlist.cta}
                                                <ArrowRight className="h-4 w-4" weight="bold" />
                                            </>
                                        )}
                                    </button>
                                </div>
                                <p className="mt-3 text-xs text-paragraph-light/70 dark:text-white/50">{t.waitlist.privacyNote}</p>
                            </form>

                            <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-6 max-sm:flex-col max-sm:gap-3">
                                {trustItems.map((text, i) => (
                                    <span key={i} className="flex items-center gap-2 text-sm text-paragraph-light dark:text-white/70">
                                        <CheckCircle className="h-4 w-4 text-primary" weight="fill" />
                                        {text}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {submitSuccess && (
                <div className="fixed bottom-4 right-4 z-[1001] flex items-center rounded-lg bg-green-600 px-4 py-3 text-white shadow-lg">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
