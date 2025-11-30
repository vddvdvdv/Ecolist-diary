import { Link } from 'react-router-dom'
import { LeafIcon, ChartIcon, TargetIcon, UsersIcon, TrophyIcon, MapPinIcon } from '../components/icons'
import { useLanguage } from '../context/LanguageContext'
import LanguageSelector from '../components/LanguageSelector'

const features = [
  {
    icon: ChartIcon,
    title: 'Təsirini İzlə',
    description: 'Gündəlik eko-fəaliyyətlərini qeyd et və birlikdə etdiyimiz fərqi gör.'
  },
  {
    icon: TargetIcon,
    title: 'Missiyaları Tamamla',
    description: 'Əyləncəli və çağırışlı missiyalarla xal qazan və yeni uğurlar əldə et.'
  },
  {
    icon: UsersIcon,
    title: 'Dostlarla Əlaqə Qur',
    description: 'Qlobal icmaya qoşul, irəliləyişini paylaş və başqalarına ilham ver.'
  }
]

export default function Landing() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <LeafIcon className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-text-light dark:text-text-dark">Ekolist Diary</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="nav-link">{t('nav.home')}</Link>
              <Link to="/about" className="nav-link">{t('nav.about')}</Link>
              <Link to="/contact" className="nav-link">{t('nav.contact')}</Link>
              <Link to="/faq" className="nav-link">{t('nav.faq')}</Link>
            </nav>
            
            <div className="flex items-center gap-3">
              <LanguageSelector />
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

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-eco-forest/20 to-transparent" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-eco-leaf/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black text-text-light dark:text-text-dark leading-tight mb-6">
              {t('hero.title')}
              <span className="text-gradient"> {t('hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary px-8 py-3 text-lg w-full sm:w-auto">
                {t('hero.start')}
              </Link>
              <Link to="/login" className="btn-outline px-8 py-3 text-lg w-full sm:w-auto">
                {t('hero.login')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-card-light dark:bg-card-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-text-light dark:text-text-dark mb-4">
              {t('features.title')}
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
              {t('features.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">{feature.title}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-eco-forest relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-eco-forest to-background-dark opacity-90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-eco-leaf mb-8">
            {t('cta.description')}
          </p>
          <Link to="/register" className="btn-primary px-8 py-3 text-lg inline-flex">
            {t('cta.register')}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <LeafIcon className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold text-text-light dark:text-text-dark">Ekolist Diary</span>
              </div>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Planetimizi birlikdə qoruyan ekoloji icma platforması.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-text-light dark:text-text-dark mb-4">Sürətli Keçidlər</h3>
              <ul className="space-y-2">
                <li><Link to="/home" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">{t('nav.home')}</Link></li>
                <li><Link to="/feed" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">Feed</Link></li>
                <li><Link to="/leaderboard" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">{t('nav.leaderboard')}</Link></li>
                <li><Link to="/achievements" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">{t('nav.achievements')}</Link></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="font-bold text-text-light dark:text-text-dark mb-4">Məlumat</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">{t('footer.about')}</a></li>
                <li><a href="#" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">{t('footer.contact')}</a></li>
                <li><a href="#" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">{t('footer.privacy')}</a></li>
                <li><a href="#" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">{t('footer.terms')}</a></li>
              </ul>
            </div>
            
            {/* Social */}
            <div>
              <h3 className="font-bold text-text-light dark:text-text-dark mb-4">Bizimlə Əlaqə</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="pt-8 border-t border-border-light dark:border-border-dark">
            <p className="text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

