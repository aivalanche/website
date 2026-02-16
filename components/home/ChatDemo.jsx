'use client'
import { useState } from 'react'
import { useLocale } from './LocaleProvider'
import { translations } from '@/utils/translations'
import { Sparkle, PaperPlaneTilt } from '@phosphor-icons/react'

export default function ChatDemo() {
    const { locale } = useLocale()
    const [activeConvo, setActiveConvo] = useState(0)
    const t = translations[locale]
    const processChips = locale === 'de'
        ? ['Aufgabe im Chat', 'Agent fuehrt aus', 'Status fuer das Team']
        : ['Task in chat', 'Agent executes', 'Status for the team']

    return (
        <section id="how-it-works" className="relative overflow-hidden py-24 md:py-32">
            <div className="pointer-events-none absolute left-1/2 top-12 h-64 w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px] dark:bg-primary/5" />

            <div className="container relative">
                <div className="mb-16 text-center md:mb-20">
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-xs font-medium tracking-wider text-primary dark:bg-primary/20">
                        {t.chatDemo.badge}
                    </span>
                    <h2 className="mb-6 mt-4 text-3xl font-bold text-paragraph dark:text-white md:text-4xl lg:text-5xl">
                        {t.chatDemo.title}{' '}
                        <span className="text-primary">{t.chatDemo.titleHighlight}</span>
                    </h2>

                    {t.chatDemo.subtitle && (
                        <p className="mx-auto max-w-[760px] text-lg text-paragraph-light dark:text-white/75">
                            {t.chatDemo.subtitle}
                        </p>
                    )}

                    <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2.5">
                        {processChips.map((chip) => (
                            <span
                                key={chip}
                                className="rounded-full border border-borderColor bg-white/85 px-3.5 py-1.5 text-xs font-semibold tracking-[0.08em] text-paragraph-light dark:border-borderColor-dark dark:bg-dark-200/75 dark:text-white/70"
                            >
                                {chip}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-10 flex justify-center gap-3">
                    {t.chatDemo.conversations.map((convo, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveConvo(i)}
                            className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-300 ${activeConvo === i
                                ? 'border-primary bg-primary text-paragraph shadow-lg shadow-primary/25'
                                : 'border-borderColor bg-white/80 text-paragraph-light backdrop-blur-sm hover:border-primary dark:border-borderColor-dark dark:bg-dark-200/80 dark:text-white/70'
                                }`}
                        >
                            {convo.platform}
                        </button>
                    ))}
                </div>

                <div className="mx-auto max-w-3xl">
                    <div className="overflow-hidden rounded-3xl border border-borderColor/80 bg-white/85 shadow-[0_22px_55px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-borderColor-dark dark:bg-dark-200/85">
                        <div className="flex items-center gap-3 border-b border-borderColor bg-white/80 px-6 py-4 dark:border-borderColor-dark dark:bg-dark-100/80">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                                <Sparkle className="h-4 w-4 text-white" weight="fill" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-paragraph dark:text-white">AIvalanche</p>
                                <p className="text-xs text-paragraph-light dark:text-white/60">
                                    {t.chatDemo.conversations[activeConvo].platform} • Online
                                </p>
                            </div>
                            <div className="ml-auto flex items-center gap-1.5">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                                <span className="text-xs text-green-600 dark:text-green-400">Active</span>
                            </div>
                        </div>

                        <div className="min-h-[320px] space-y-5 p-6">
                            {t.chatDemo.conversations[activeConvo].messages.map((msg, i) => (
                                <div key={`${activeConvo}-${i}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[85%] px-5 py-4 ${msg.role === 'user'
                                            ? 'rounded-2xl rounded-tr-md border border-primary/20 bg-primary/10 dark:bg-primary/20'
                                            : 'rounded-2xl rounded-tl-md border border-borderColor bg-white/75 dark:border-borderColor-dark dark:bg-dark-100/80'
                                            }`}
                                    >
                                        {msg.role === 'user' && <p className="mb-1 text-xs font-medium text-primary">{msg.name}</p>}
                                        {msg.role === 'agent' && <p className="mb-1 text-xs font-medium text-primary">AIvalanche</p>}
                                        <p className="whitespace-pre-line text-sm leading-relaxed text-paragraph dark:text-white/90">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-borderColor bg-white/80 px-6 py-4 dark:border-borderColor-dark dark:bg-dark-100/80">
                            <div className="flex items-center gap-3 rounded-xl border border-borderColor bg-white/85 px-4 py-2.5 dark:border-borderColor-dark dark:bg-dark-200/85">
                                <span className="text-sm text-paragraph-light dark:text-white/40">@AIvalanche ...</span>
                                <PaperPlaneTilt className="ml-auto h-4 w-4 text-paragraph-light dark:text-white/30" weight="fill" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
