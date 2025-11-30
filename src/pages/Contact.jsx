import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LeafIcon, MailIcon, PhoneIcon, MapPinIcon } from '../components/icons'
import { useLanguage } from '../context/LanguageContext'
import { showSuccess, showError } from '../utils/toast'

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      showError('Zəhmət olmasa bütün sahələri doldurun!')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      showSuccess('Mesajınız göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1000)
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
              <Link to="/contact" className="nav-link text-primary font-bold">Əlaqə</Link>
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
            Əlaqə
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
            Bizimlə əlaqə saxlayın. Suallarınız, təklifləriniz və ya təklifləriniz varsa, bizə yazın!
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-black text-text-light dark:text-text-dark mb-6">
                Bizə Yazın
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field w-full"
                    placeholder="Adınızı daxil edin"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field w-full"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                    Mövzu
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-field w-full"
                    placeholder="Mesajın mövzusu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                    Mesaj
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field w-full h-32 resize-none"
                    placeholder="Mesajınızı yazın..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? 'Göndərilir...' : 'Göndər'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card p-8">
                <h2 className="text-2xl font-black text-text-light dark:text-text-dark mb-6">
                  Əlaqə Məlumatları
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <MailIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-light dark:text-text-dark mb-1">Email</h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        info@ekolist.az
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <PhoneIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-light dark:text-text-dark mb-1">Telefon</h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        +994 12 123 45 67
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <MapPinIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-light dark:text-text-dark mb-1">Ünvan</h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        Bakı, Azərbaycan
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* <div className="card p-8 bg-primary/10">
                <h3 className="font-bold text-text-light dark:text-text-dark mb-3">
                  İş Saatları
                </h3>
                <div className="space-y-2 text-text-secondary-light dark:text-text-secondary-dark">
                  <p>Bazar ertəsi - Cümə: 09:00 - 18:00</p>
                  <p>Şənbə: 10:00 - 16:00</p>
                  <p>Bazar: Qapalı</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

