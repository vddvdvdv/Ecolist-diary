import { useLanguage } from '../context/LanguageContext'
import { GlobeIcon } from './icons'

export default function LanguageSelector({ className = '', variant = 'select' }) {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  ]

  if (variant === 'button') {
    return (
      <div className={`relative ${className}`}>
        <button
          className="flex items-center gap-2 px-3 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg hover:bg-primary/10 transition-colors"
          onClick={() => {
            const currentIndex = languages.findIndex(l => l.code === language)
            const nextIndex = (currentIndex + 1) % languages.length
            setLanguage(languages[nextIndex].code)
          }}
          title={languages.find(l => l.code === language)?.name}
        >
          <GlobeIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{language.toUpperCase()}</span>
        </button>
      </div>
    )
  }

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className={`px-3 py-1.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 ${className}`}
      title="Dil seçin"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
         {lang.name}
        </option>
      ))}
    </select>
  )
}

