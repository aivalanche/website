'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const LocaleContext = createContext({ locale: 'de', setLocale: () => {}, toggleLocale: () => {} })

export const useLocale = () => useContext(LocaleContext)

export default function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('de')
  const toggleLocale = useCallback(() => setLocale((l) => (l === 'de' ? 'en' : 'de')), [])

  useEffect(() => {
    window.__setLocale = setLocale
    window.__getLocale = () => locale
    return () => {
      delete window.__setLocale
      delete window.__getLocale
    }
  }, [locale])

  return <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>{children}</LocaleContext.Provider>
}
