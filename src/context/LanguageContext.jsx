import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('ekolist_language')
    return saved || 'az'
  })

  useEffect(() => {
    localStorage.setItem('ekolist_language', language)
  }, [language])

  const t = (key) => {
    return translations[language]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    console.warn('useLanguage must be used within LanguageProvider')
    // Return default values to prevent crashes
    return {
      language: 'az',
      setLanguage: () => {},
      t: (key) => key
    }
  }
  return context
}

