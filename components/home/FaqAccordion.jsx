'use client'
import { useState } from 'react'
import { useLocale } from './LocaleProvider'
import { translations } from '@/utils/translations'
import { CaretDown } from '@phosphor-icons/react'

export default function FaqAccordion() {
    const { locale } = useLocale()
    const [openFaq, setOpenFaq] = useState(null)
    const t = translations[locale]
    const intro = locale === 'de'
        ? 'Kurz und klar: Setup, Sicherheit, Integrationen und wie AIvalanche im Alltag arbeitet.'
        : 'Clear and practical: setup, security, integrations, and how AIvalanche works in daily operations.'

    return (
        <section id="faq" className="relative overflow-hidden py-24 md:py-32">
            <div className="pointer-events-none absolute left-1/2 top-12 h-64 w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px] dark:bg-primary/5" />

            <div className="container mx-auto max-w-3xl">
                <div className="mb-16 text-center">
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-xs font-medium tracking-wider text-primary dark:bg-primary/20">
                        {t.faq.badge}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-paragraph dark:text-white md:text-4xl lg:text-5xl">
                        {t.faq.title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-[720px] text-lg text-paragraph-light dark:text-white/75">
                        {intro}
                    </p>
                </div>

                <div className="space-y-3.5">
                    {t.faq.items.map((item, i) => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-2xl border border-borderColor/80 bg-white/85 backdrop-blur-sm transition-all duration-300 hover:border-primary/35 hover:shadow-[0_18px_35px_-28px_rgba(15,23,42,0.35)] dark:border-borderColor-dark dark:bg-dark-200/85"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="flex w-full items-center justify-between px-6 py-5 text-left"
                            >
                                <span className="pr-4 font-medium text-paragraph dark:text-white">{item.q}</span>
                                <CaretDown
                                    weight="bold"
                                    className={`h-5 w-5 flex-shrink-0 text-paragraph-light transition-transform duration-300 dark:text-white/60 ${openFaq === i ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="px-6 pb-5 leading-relaxed text-paragraph-light dark:text-white/80">{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
