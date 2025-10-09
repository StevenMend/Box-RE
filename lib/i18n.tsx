"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations } from "./translations"

type Language = "en" | "es"
type TranslationKeys = keyof (typeof translations)["en"]

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKeys) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Solo acceder a localStorage después del mount (client-side)
    const storedLang = localStorage.getItem("appLang") as Language
    if (storedLang && translations[storedLang]) {
      setLanguageState(storedLang)
      document.documentElement.lang = storedLang
    } else {
      localStorage.setItem("appLang", "en")
      document.documentElement.lang = "en"
    }
  }, [])

  const setLanguage = (lang: Language) => {
    if (translations[lang]) {
      setLanguageState(lang)
      if (mounted) {
        localStorage.setItem("appLang", lang)
        document.documentElement.lang = lang
      }
    } else {
      console.warn(`Language '${lang}' not supported.`)
    }
  }

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || translations["en"][key] || key
  }

  // Evitar flash de contenido incorrecto durante SSR
  if (!mounted) {
    return null
  }

  return <TranslationContext.Provider value={{ language, setLanguage, t }}>{children}</TranslationContext.Provider>
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}