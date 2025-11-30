import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { TrophyIcon, SchoolIcon, FireIcon, LeafIcon } from '../components/icons'

const timeframes = ['Bu Həftə', 'Bu Ay', 'Bütün Vaxt']

const topUsers = [
  { rank: 1, name: 'Jordan Lee', points: 35800, streak: 150, missions: 95, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan' },
  { rank: 2, name: 'Alex Ray', points: 32150, streak: 120, missions: 88, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexRay' },
  { rank: 3, name: 'Casey Garcia', points: 30900, streak: 110, missions: 82, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey' },
]

const leaderboardData = [
  { rank: 4, name: 'Morgan Riley', points: 28450, streak: 120, missions: 78 },
  { rank: 5, name: 'Taylor Green', points: 27980, streak: 115, missions: 75 },
  { rank: 15, name: 'Sən', points: 25100, streak: 95, missions: 68, isCurrentUser: true },
  { rank: 16, name: 'Jamie Woods', points: 27500, streak: 112, missions: 74 },
  { rank: 17, name: 'Pat River', points: 26990, streak: 110, missions: 72 },
]

export default function Leaderboard() {
  const [activeTimeframe, setActiveTimeframe] = useState('Bu Həftə')
  const { user } = useAuth()
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-light dark:text-text-dark">Qlobal Leaderboard</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Dünya üzrə eko-döyüşçülərlə müqayisə et!
          </p>
        </div>
        <Link to="/leaderboard/school" className="btn-secondary">
          <SchoolIcon className="w-5 h-5 mr-2" />
          Məktəb Leaderboard
        </Link>
      </div>

      {/* Timeframe Tabs */}
      <div className="flex p-1 bg-primary/20 rounded-lg">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setActiveTimeframe(tf)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTimeframe === tf
                ? 'bg-card-light dark:bg-card-dark shadow text-text-light dark:text-text-dark'
                : 'text-text-secondary-light dark:text-text-secondary-dark'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 items-end">
        {/* 2nd Place */}
        <div className="order-1">
          <div 
            className="card p-4 text-center bg-cover bg-center aspect-square flex flex-col justify-end rounded-xl relative overflow-hidden"
            style={{ backgroundImage: `url(${topUsers[1].avatar})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative">
              <p className="text-white font-bold">{topUsers[1].name}</p>
              <p className="text-gray-300 text-sm">{topUsers[1].points.toLocaleString()} xal</p>
            </div>
          </div>
          <div className="bg-gray-400 p-3 rounded-b-xl text-center">
            <p className="text-xl font-bold text-gray-900">GÜMÜş</p>
          </div>
        </div>

        {/* 1st Place */}
        <div className="order-2">
          <div 
            className="card p-4 text-center bg-cover bg-center aspect-square flex flex-col justify-end rounded-xl relative overflow-hidden"
            style={{ backgroundImage: `url(${topUsers[0].avatar})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative">
              <p className="text-white text-lg font-bold">{topUsers[0].name}</p>
              <p className="text-gray-300">{topUsers[0].points.toLocaleString()} xal</p>
            </div>
          </div>
          <div className="bg-yellow-400 p-4 rounded-b-xl text-center">
            <p className="text-2xl font-bold text-gray-900">QIZIL</p>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="order-3">
          <div 
            className="card p-4 text-center bg-cover bg-center aspect-square flex flex-col justify-end rounded-xl relative overflow-hidden"
            style={{ backgroundImage: `url(${topUsers[2].avatar})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative">
              <p className="text-white font-bold">{topUsers[2].name}</p>
              <p className="text-gray-300 text-sm">{topUsers[2].points.toLocaleString()} xal</p>
            </div>
          </div>
          <div className="bg-orange-400 p-3 rounded-b-xl text-center">
            <p className="text-xl font-bold text-gray-900">BÜRÜNC</p>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary/10">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark w-16">Sıra</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">İstifadəçi</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Xal</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hidden md:table-cell">Streak</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hidden lg:table-cell">Missiya</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((row) => (
              <tr 
                key={row.rank} 
                className={`border-t border-border-light dark:border-border-dark ${
                  row.isCurrentUser ? 'bg-primary/20' : ''
                }`}
              >
                <td className="px-4 py-4">
                  <span className={`font-bold ${row.isCurrentUser ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
                    {row.rank}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`font-medium ${row.isCurrentUser ? 'text-primary font-bold' : 'text-text-light dark:text-text-dark'}`}>
                    {row.name}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className={row.isCurrentUser ? 'font-bold text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}>
                    {row.points.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-4 text-right hidden md:table-cell">
                  <span className="text-text-secondary-light dark:text-text-secondary-dark flex items-center justify-end gap-1">
                    {row.streak} <FireIcon className="w-4 h-4 text-orange-500" />
                  </span>
                </td>
                <td className="px-4 py-4 text-right hidden lg:table-cell text-text-secondary-light dark:text-text-secondary-dark">
                  {row.missions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

