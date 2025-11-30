import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LeafIcon, ChevronDownIcon } from '../components/icons'
import { useLanguage } from '../context/LanguageContext'

const faqs = [
  {
    question: 'Ekolist Diary nədir?',
    answer: 'Ekolist Diary, gündəlik ekoloji fəaliyyətlərinizi qeyd etməyə, xal qazanmağa və planetimizi qorumağa kömək edən bir platformadır. Oyunlaşdırma, missiyalar və icma dəstəyi ilə davamlı həyat tərzini əyləncəli edirik.',
  },
  {
    question: 'Xal sistemi necə işləyir?',
    answer: 'Gündəlik qeydlər, missiyalar, quiz və digər fəaliyyətlər üçün xal qazanırsınız. Bu xalları pet aksessuarları, temalar və digər mükafatlar üçün xərcləyə bilərsiniz.',
  },
  {
    question: 'Eko-Pet nədir?',
    answer: 'Eko-Pet, ekoloji fəaliyyətlərinizə görə böyüyən və inkişaf edən virtual bir petdir. Xal qazandıqca petiniz level atlayır və yeni petlər açıla bilər.',
  },
  {
    question: 'Missiyaları necə tamamlayıram?',
    answer: 'Missiyaları tamamlamaq üçün tələb olunan fəaliyyəti yerinə yetirin və şəkil/video ilə sübut yükləyin. Təsdiqləndikdən sonra xal və badge qazanırsınız.',
  },
  {
    question: 'Leaderboard-da necə yüksələ bilərəm?',
    answer: 'Daha çox xal qazanmaq üçün gündəlik qeydlər yazın, missiyaları tamamlayın, quizlərə qatılın və streak-inizi davam etdirin. Ardıcıl fəaliyyət bonus xal verir.',
  },
  // {
  //   question: 'Hesabımı necə silə bilərəm?',
  //   answer: 'Hesabınızı silmək üçün Tənzimləmələr səhifəsinə gedin və "Hesabı Sil" seçimini tapın. Və ya bizimlə əlaqə saxlayın.',
  // },
  // {
  //   question: 'Mükafatlar realdır?',
  //   answer: 'Bəli! Top 10 istifadəçi ekoloji ekskursiyalar, termos, çanta və digər real hədiyyələr qazana bilər.',
  // },
  {
    question: 'GPS məlumatım təhlükəsizdir?',
    answer: 'Bəli, GPS məlumatlarınız yalnız yaxınlıqdakı parklar, təkrar emal məntəqələri və tədbirləri göstərmək üçün istifadə olunur. Məlumatlarınız təhlükəsiz saxlanılır.',
  },
]

export default function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <LeafIcon className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-text-light dark:text-text-dark">Ekolist Diary</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="nav-link">{t('nav.home')}</Link>
              <Link to="/about" className="nav-link">Haqqımızda</Link>
              <Link to="/contact" className="nav-link">Əlaqə</Link>
              <Link to="/faq" className="nav-link text-primary font-bold">FAQ</Link>
            </nav>
            
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn-secondary px-4 py-2 text-sm">
                {t('hero.login')}
              </Link>
              <Link to="/register" className="btn-primary px-4 py-2 text-sm">
                {t('hero.register')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-primary/20 to-eco-leaf/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-text-light dark:text-text-dark mb-6">
            Tez-tez Verilən Suallar
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
            Ekolist Diary haqqında ən çox verilən suallar və cavablar
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-primary/5 transition-colors"
                >
                  <h3 className="text-lg font-bold text-text-light dark:text-text-dark pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDownIcon 
                    className={`w-6 h-6 text-primary transition-transform flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

