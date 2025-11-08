"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations } from "./translations"
import { reTranslations } from "./re-translations"

type Language = "en" | "es"

// Combinar todas las traducciones
const allTranslations = {
  en: { ...translations.en, ...reTranslations.en },
  es: { ...translations.es, ...reTranslations.es }
}

type TranslationKeys = keyof typeof allTranslations.en

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
    const storedLang = localStorage.getItem("appLang") as Language
    if (storedLang && allTranslations[storedLang]) {
      setLanguageState(storedLang)
      document.documentElement.lang = storedLang
    } else {
      localStorage.setItem("appLang", "en")
      document.documentElement.lang = "en"
    }
  }, [])

  const setLanguage = (lang: Language) => {
    if (allTranslations[lang]) {
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
    return allTranslations[language][key] || allTranslations["en"][key] || key
  }

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