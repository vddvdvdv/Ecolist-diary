import { Link } from 'react-router-dom'
import { LeafIcon, UsersIcon, TargetIcon, TrophyIcon } from '../components/icons'
import { useLanguage } from '../context/LanguageContext'

const values = [
  { icon: LeafIcon, title: 'Ekoloji Məsuliyyət', description: 'Planetimizin gələcəyi üçün davamlı həllər təqdim edirik.' },
  { icon: UsersIcon, title: 'İcma', description: 'Minlərlə istifadəçi ilə birlikdə müsbət dəyişiklik yaradırıq.' },
  { icon: TargetIcon, title: 'Məqsəd', description: 'Hər bir fəaliyyətin ekoloji təsirini ölçür və təkmilləşdiririk.' },
  { icon: TrophyIcon, title: 'Uğur', description: 'Oyunlaşdırma ilə ekoloji fəaliyyətləri əyləncəli edirik.' },
]

export default function About() {
  const { t } = useLanguage()

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
              <Link to="/about" className="nav-link text-primary font-bold">Haqqımızda</Link>
              <Link to="/contact" className="nav-link">Əlaqə</Link>
              <Link to="/faq" className="nav-link">FAQ</Link>
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
            Haqqımızda
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
            Ekolist Diary - Planetimizi qorumaq üçün birlikdə hərəkət edən ekoloji icma platforması
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8">
            <h2 className="text-3xl font-black text-text-light dark:text-text-dark mb-4">Missiyamız</h2>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
              Ekolist Diary, hər bir insanın gündəlik həyatında ekoloji fəaliyyətlərini qeyd etməsinə, 
              təsirini izləməsinə və planetimizi qorumaq üçün addımlar atmasına kömək edir. 
              Oyunlaşdırma, missiyalar və icma dəstəyi ilə davamlı həyat tərzini əyləncəli və asan edirik.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card-light dark:bg-card-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-text-light dark:text-text-dark text-center mb-12">
            Dəyərlərimiz
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="card p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">{value.title}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

