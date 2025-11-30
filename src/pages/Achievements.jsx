import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { StarIcon, LockIcon, SparklesIcon, LeafIcon, AwardIcon } from '../components/icons'

const newlyEarned = [
  {
    id: 1,
    name: 'Waste Warrior',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzirogIFeeEpMMJNO-YSCJd1-GOIrQkPa9gQH4qzDum1tk3Wf7bcWk4spgkVoQE_efT8tSukLWlh9A6D4VeBPBz8RKrNR9DkSo0Y6LjfBkbXB3mDBBIAzfUv9NfOhEiQtSd_RqjvHz599e1gnUP_rzz5DX2JxTzYiJefutxxkZil0-N7BKqswPHBhfludj_4ZFlZ0rTtNQgxTZwgTE9V2azOSZ5g-pp35iASR3dwO8Hm28eoAz5YgN-wzjhscYlER4k_qG3bvskqhC',
    earned: true,
  },
  {
    id: 2,
    name: 'Community Champion',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7HYJYob6vEvnsm9Vq5jVTB1H_dYEV1ZpawyGda8w_35LbTH5-taU68rX93njsdRAy2wECg9Q2JVYQ9Y0gfqtflLv_8nvnhyvcsbVWXL9XvdTOzY9195HZ5b0tuYCKcUqwnYxnha1zIf7dfprW4-pFOxSiKhoYhghEdpQN-DVfT6vaqFIecl0tUcpDuGgQ9CZN13I45Cjlz-mHv4ubiFrjSHGWWwZ92LQis6wpTgXhhF4pBtE94qt6vb6-Xhg6zwyNqHuBNXKgFdc1',
    earned: true,
  },
]

const allBadges = [
  {
    id: 1,
    name: 'Waste Warrior',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAUjvljn8LTI3HZ4TJMFebBq8idGwAcSdvqliVdJ0Qql498Ra9xQpXGYzZJjDKabUVhH3Bjt8l-ymY150sU6vNxxZly3ByQZC4cERw14ZsCXydNqZS6OYzOJAKJCuMFe_GsAnOzqkn94lzq9_d2YKw3L5phZr7Z3dI-cd5RIiQPK33wyEkKo2xbdeNK8-RPkoA1g0Yer7062bd9ZNRzUvpusLYzhEcf4ZQrmAz5Ujw1o0vfNT79XUs6dmXLdykr1h_eiQNQWKKfw1A',
    earned: true,
  },
  {
    id: 2,
    name: 'Community Champion',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnefMywwjKdDkNVHbqC_KSHa8bIQo2o_jmljnR0mD43v6vtkgDn51aA3pM9HVNSdgCE3ICch_Snr8BZO_bVR9LI7zAbN-GKIW8WYIYT7XQhNVR9yPmJlkvdFLkFTTM3YFoF7R6Yrf3IbctGuNcVXvRCqCScdKzmstSK9GSLf25OyVnem1ujXcG6cl9Nwk0B6lgCiUzkUyPcCEPBIqzmOx-Hgtao4uTHhjL4RIXYnseWw7YJnyXceM3jydZMuYEuPfRW8vl2zCI7Sfs',
    earned: true,
  },
  {
    id: 3,
    name: 'Tree Planter',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-QzwXxTdshY1fsmi3GDe5Mq6mndRxa2kVT-EU9QXobI7g4ERXOtnsZ1b-P6fqAxMcrHaIwb1zBaNvyF8ZhxVipJmR8nBhmMI79a1xQU_nvlGuH-QSzAJtF-x2lGg2aEQzywfvoVOubCWD7NyPcn6oOzgfnV-lrCrJp4THUZbSUUumJGC_Pwenenps20brcKJct8-U3gXx3W-rGFRMHb5eCW_cHGIM_9ZkKT6ZlCa-wpyu-C9HczdJcXUpMEXZ4u1kjy-6mCCutnWM',
    earned: true,
  },
  {
    id: 4,
    name: 'Energy Saver',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsnsNuv070-sQrwYqnUiT1f0hSuUCLLF-EAed0hZGJ8PfSG7hYmgDj8vF14S4-353_maJNACTWMRjqkCvAIG9bqsv2Tq4ylCgUvt5c2QNNpBmjLff6C_nhWbseGQ7__HYo2Rs_5M6TkwDy-2a6HfjGoMb785NGLVapOL-DXotFL7oKjdii7jrqsjptfc10S-qzKbv5tpLUPTZGykNOO-MpOa2Ln-ddOHqH4NSBYDypKWNSmdPLWfVh61FyLjqShLqPcylDJgWjlI5Y',
    earned: true,
  },
  {
    id: 5,
    name: 'Recycling Rookie',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0vnWFWEfcDnHVmqzevGO8YvYR4Z6CAk6VNFrWORzORXk0JygcHBaFBu90LBbBZ9YpyTd6Uoqpt4PTXbNC0xP5QzKHh47-ZMsNsx6DEOv0bC8R6DiqY4_DbOn23PvseVHO8mO65xgA7T7YJc7ezCEbPh3MSFUKrRPKN2t6Nr4uypuv0cnTspFlMXmWnxVv9GJpxNZM7e-EJY0r79Y0-mlA5BX1YKjAZysnEaOcVfg0vzBPxSF3_OqnINT-zsFX6FaUab_6frbliO2x',
    earned: true,
  },
  {
    id: 6,
    name: 'Water Wizard',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkwc9WUjlo4x0QxczmrzOj4xlozBMjO6ZUrn9nlyIfA4Z2ABAYmUL5AUmr7DOL5mzuUtSDFtit1jMqfR2FaNZ2zPrwCkLEDVpq3k-dOFp7I6jVrVAaQeWy7kEmDxlpLearf6BT5woKsUm9eEz0H4W83oZyjBR5ish3hmKZ9jbUBYhsP2Z9ULk_1J-fs8zn48HJ0a3hrf0UMxe1R1SjQaSpMs84GCRQ03GezOFBsZeZyvNOCBbWJiMSbckTxgP20myG_bs0Z1XHTx83',
    earned: true,
  },
  {
    id: 7,
    name: 'Eco Commuter',
    earned: false,
  },
  {
    id: 8,
    name: 'Green Thumb',
    earned: false,
  },
]

export default function Achievements() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [showCertificate, setShowCertificate] = useState(false)
  const [certificateName, setCertificateName] = useState(user?.name || 'Alex Green')
  const [certificateHackathon, setCertificateHackathon] = useState('Ekolist Diary 2024')
  const [certificateExcursion, setCertificateExcursion] = useState('Göygöl Milli Parkı')

  const filteredBadges = allBadges.filter(badge =>
    badge.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const generateCertificate = () => {
    setShowCertificate(true)
  }

  const downloadCertificate = () => {
    // Create certificate HTML
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
          .certificate { border: 5px solid #22c55e; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #22c55e; font-size: 32px; }
          h2 { font-size: 24px; margin: 20px 0; }
          p { font-size: 18px; line-height: 1.8; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <h1>Ekoloji Fəaliyyət Sertifikatı</h1>
          <p>Bu sertifikat Ekolist Diary 2024 tədbirində əldə edilmişdir</p>
          <h2>Bu sertifikat təsdiq edir ki,</h2>
          <h2>${certificateName}</h2>
          <p>${certificateHackathon} tədbirində fəal iştirak etmiş və</p>
          <h2>${certificateExcursion}</h2>
          <p>ekskursiyasına qatılmışdır.</p>
          <p style="margin-top: 40px;">Tarix: ${new Date().toLocaleDateString('az-AZ')}</p>
          <p>Yer: Azərbaycan</p>
        </div>
      </body>
      </html>
    `
    
    // Save to achievements
    const achievements = JSON.parse(localStorage.getItem('ekolist_achievements') || '[]')
    achievements.push({
      id: Date.now(),
      type: 'certificate',
      name: 'Ekoloji Fəaliyyət Sertifikatı',
      date: new Date().toISOString(),
      data: {
        name: certificateName,
        hackathon: certificateHackathon,
        excursion: certificateExcursion,
      }
    })
    localStorage.setItem('ekolist_achievements', JSON.stringify(achievements))
    
    // Download as HTML file
    const blob = new Blob([certificateHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Ekolist_Certificate.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    alert('Sertifikat yükləndi və Achievements-ə əlavə olundu!')
    setShowCertificate(false)
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
              <Link to="/faq" className="nav-link">FAQ</Link>
            </nav>
            
            <div className="flex items-center gap-3">
              {user ? (
                <Link to="/home" className="btn-primary px-4 py-2 text-sm">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary px-4 py-2 text-sm">
                    {t('hero.login')}
                  </Link>
                  <Link to="/register" className="btn-primary px-4 py-2 text-sm">
                    {t('hero.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-4xl font-black leading-tight tracking-tight text-text-light dark:text-text-dark">
            My Achievements & Badges
          </p>
          <p className="text-base font-normal leading-normal text-text-secondary-light dark:text-text-secondary-dark">
            Collect badges by completing missions and logging eco-friendly activities.
          </p>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="flex p-4">
        <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex gap-4">
            <img
              src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeLcs0IDSVhzWreTf0igIOQ2_ZLDER4gNNjiikIHAcw6-BVu_E2PKhtUqwFGe79P0ouh-6poU8uMSWAGKQHTokYBR95EQ169bq0weO0mkKLs8DjuHD11jfKCk7bme8D0y5VvR3wxhhxtfM8zrkakzNY7UDN-mAD_nlWfO4QGBmaV78FbhubtMO8c2BVFGoUFifSW0OZ-W9dpaGCPrzGKahARyK7h3KXPY7Ye-wEI_S8J-9GK23m0PqFKlp4LjDyPYFu1nzS6NQ1ZhD'}
              alt="User profile picture"
              className="w-32 h-32 rounded-full bg-primary/20 shrink-0"
            />
            <div className="flex flex-col justify-center">
              <p className="text-[22px] font-bold leading-tight tracking-tight text-text-light dark:text-text-dark">
                {user?.name || 'Alex Green'}
              </p>
              <p className="text-base font-normal leading-normal text-text-secondary-light dark:text-text-secondary-dark">
                Level {user?.level || 12}
              </p>
              <p className="text-base font-normal leading-normal text-text-secondary-light dark:text-text-secondary-dark">
                {user?.points?.toLocaleString() || '12,500'} Points
              </p>
            </div>
          </div>
          <button
            onClick={generateCertificate}
            className="btn-primary px-6 py-3 flex items-center gap-2"
          >
            <AwardIcon className="w-5 h-5" />
            Sertifikat Yarat
          </button>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCertificate(false)
            }
          }}
        >
          <div className="card p-4 sm:p-6 md:p-8 w-full max-w-lg md:max-w-2xl bg-gradient-to-br from-primary/10 to-eco-leaf/10 my-4 max-h-[95vh] overflow-y-auto">
            <div className="text-center mb-4 sm:mb-6">
              <AwardIcon className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-text-light dark:text-text-dark mb-2">
                Ekoloji Fəaliyyət Sertifikatı
              </h2>
              <p className="text-sm sm:text-base text-text-secondary-light dark:text-text-secondary-dark">
                Sertifikatı düzenlə və yüklə
              </p>
            </div>

            {/* Editable Fields */}
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-text-light dark:text-text-dark mb-1 sm:mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={certificateName}
                  onChange={(e) => setCertificateName(e.target.value)}
                  className="input-field text-sm sm:text-base"
                  placeholder="Ad və soyadınızı daxil edin"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-text-light dark:text-text-dark mb-1 sm:mb-2">
                  Tədbir/Hakaton
                </label>
                <input
                  type="text"
                  value={certificateHackathon}
                  onChange={(e) => setCertificateHackathon(e.target.value)}
                  className="input-field text-sm sm:text-base"
                  placeholder="Tədbir adı"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-text-light dark:text-text-dark mb-1 sm:mb-2">
                  Ekskursiya
                </label>
                <input
                  type="text"
                  value={certificateExcursion}
                  onChange={(e) => setCertificateExcursion(e.target.value)}
                  className="input-field text-sm sm:text-base"
                  placeholder="Ekskursiya yeri"
                />
              </div>
            </div>

            {/* Certificate Preview */}
            <div className="card p-4 sm:p-6 bg-card-light dark:bg-card-dark mb-4 sm:mb-6">
              <div className="text-center space-y-2 sm:space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-text-secondary-light dark:text-text-secondary-dark">
                  Bu sertifikat təsdiq edir ki,
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-primary break-words">
                  {certificateName}
                </p>
                <p className="text-sm sm:text-base md:text-lg text-text-secondary-light dark:text-text-secondary-dark">
                  {certificateHackathon} tədbirində fəal iştirak etmiş və
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-text-light dark:text-text-dark break-words">
                  {certificateExcursion}
                </p>
                <p className="text-sm sm:text-base md:text-lg text-text-secondary-light dark:text-text-secondary-dark">
                  ekskursiyasına qatılmışdır.
                </p>
                <div className="flex items-center justify-center gap-4 sm:gap-8 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border-light dark:border-border-dark">
                  <div>
                    <p className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark">Tarix</p>
                    <p className="text-sm sm:text-base font-bold text-text-light dark:text-text-dark">{new Date().toLocaleDateString('az-AZ')}</p>
                  </div>
                  <div className="w-px h-8 sm:h-12 bg-border-light dark:border-border-dark" />
                  <div>
                    <p className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark">Yer</p>
                    <p className="text-sm sm:text-base font-bold text-text-light dark:text-text-dark">Azərbaycan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => setShowCertificate(false)}
                className="btn-secondary flex-1 text-sm sm:text-base py-2 sm:py-2.5"
              >
                Bağla
              </button>
              <button
                onClick={downloadCertificate}
                className="btn-primary flex-1 text-sm sm:text-base py-2 sm:py-2.5"
              >
                Yüklə (HTML)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Newly Earned Section */}
      <div className="border-t border-b border-border-light dark:border-border-dark my-6">
        <h2 className="text-[22px] font-bold leading-tight tracking-tight text-text-light dark:text-text-dark px-4 pb-3 pt-5">
          Newly Earned!
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {newlyEarned.map((badge) => (
            <div
              key={badge.id}
              className="relative bg-cover bg-center flex flex-col gap-3 items-center rounded-full justify-center aspect-square border-2 border-dashed border-yellow-400 p-1"
              style={{
                backgroundImage: badge.image
                  ? `linear-gradient(0deg, rgba(20, 20, 20, 0.4) 0%, rgba(20, 20, 20, 0.4) 100%), url(${badge.image})`
                  : 'none',
                backgroundColor: badge.image ? 'transparent' : 'var(--card-light)',
              }}
            >
              <p className="text-white text-base font-bold leading-tight w-[70%] text-center line-clamp-2">
                {badge.name}
              </p>
              <SparklesIcon className="absolute top-2 right-2 text-yellow-300 w-8 h-8" />
            </div>
          ))}
        </div>
      </div>

      {/* All Badges Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 gap-4">
        <h2 className="text-[22px] font-bold leading-tight tracking-tight text-text-light dark:text-text-dark">
          All Badges
        </h2>
        <div className="relative w-full sm:w-64">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary-light"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Search badges..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={`bg-cover bg-center flex flex-col gap-3 items-center rounded-full justify-center aspect-square ${
              badge.earned ? '' : 'bg-card-light dark:bg-card-dark opacity-60'
            }`}
            style={
              badge.earned && badge.image
                ? {
                    backgroundImage: `linear-gradient(0deg, rgba(20, 20, 20, 0.4) 0%, rgba(20, 20, 20, 0.4) 100%), url(${badge.image})`,
                  }
                : {}
            }
          >
            {badge.earned ? (
              <>
                <p className="text-white text-base font-bold leading-tight w-[70%] text-center line-clamp-2">
                  {badge.name}
                </p>
              </>
            ) : (
              <>
                <LockIcon className="text-text-secondary-light dark:text-text-secondary-dark w-12 h-12" />
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-bold leading-tight w-[70%] text-center line-clamp-2">
                  {badge.name}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

