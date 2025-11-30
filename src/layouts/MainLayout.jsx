import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { 
  LeafIcon, HomeIcon, BookIcon, TargetIcon, TrophyIcon, 
  UsersIcon, BellIcon, MapPinIcon, GiftIcon,
  PlantIcon, SunIcon, MoonIcon, LogOutIcon, ChartIcon, CoinIcon
} from '../components/icons'
import BottomNav from '../components/BottomNav'
import LanguageSelector from '../components/LanguageSelector'

const getNavItems = (t) => [
  { path: '/home', icon: HomeIcon, label: t('nav.home') },
  { path: '/dashboard', icon: ChartIcon, label: t('nav.dashboard') },
  { path: '/diary', icon: BookIcon, label: t('nav.diary') },
  { path: '/missions', icon: TargetIcon, label: t('nav.missions') },
  { path: '/eco-pet', icon: PlantIcon, label: t('nav.ecoPet') },
  { path: '/leaderboard', icon: TrophyIcon, label: t('nav.leaderboard') },
  { path: '/feed', icon: UsersIcon, label: t('nav.feed') },
  { path: '/map', icon: MapPinIcon, label: t('nav.map') },
  { path: '/achievements', icon: TrophyIcon, label: t('nav.achievements') },
  { path: '/eco-facts', icon: SunIcon, label: t('nav.ecoFacts') },
]

export default function MainLayout() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  
  const navItems = getNavItems(t)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-card-light dark:bg-card-dark border-r border-border-light dark:border-border-dark
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <button
            onClick={() => {
              logout()
              navigate('/')
            }}
            className="w-full flex items-center gap-3 px-6 py-5 border-b border-border-light dark:border-border-dark hover:bg-primary/5 transition-colors text-left"
          >
            <LeafIcon className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-text-light dark:text-text-dark">Ekolist Diary</span>
          </button>

                 {/* User Info */}
                 <div className="px-6 py-4 border-b border-border-light dark:border-border-dark">
                   <button
                     onClick={() => navigate('/profile')}
                     className="w-full flex items-center gap-3 hover:bg-primary/5 rounded-lg p-2 -m-2 transition-colors"
                   >
                     <img
                       src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                       alt="Avatar"
                       className="w-10 h-10 rounded-full bg-primary/20"
                     />
                     <div className="flex-1 min-w-0 text-left">
                       <p className="font-semibold text-text-light dark:text-text-dark truncate">
                         {user?.name || 'User'}
                       </p>
                       <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                         Level {user?.level || 1} • {user?.points || 0} xal
                       </p>
                     </div>
                   </button>
                 </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-primary/20 dark:bg-primary/30 text-primary font-semibold' 
                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 dark:hover:bg-primary/20'
                  }
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="px-3 py-4 border-t border-border-light dark:border-border-dark space-y-1">
            <div className="px-3 py-2.5">
              <LanguageSelector className="w-full" />
            </div>
            
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 transition-all duration-200"
            >
              {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              <span>{isDark ? t('profile.lightMode') : t('profile.darkMode')}</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOutIcon className="w-5 h-5" />
              <span>{t('common.logout') || 'Çıxış'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between px-4 lg:px-8 py-3">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-primary/10"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Axtar..."
                  className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const query = e.target.value.trim()
                      if (query) {
                        // Global search - navigate to search results or show modal
                        navigate(`/search?q=${encodeURIComponent(query)}`)
                      }
                    }
                  }}
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <NavLink 
                to="/notifications"
                className="relative p-2 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <BellIcon className="w-6 h-6 text-text-secondary-light dark:text-text-secondary-dark" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </NavLink>
              
              {/* Profile Menu - Only show when user is logged in */}
              {user && (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors border border-border-light dark:border-border-dark"
                  >
                    <img
                      src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                      alt="Profile"
                      className="w-8 h-8 rounded-full bg-primary/20 ring-2 ring-primary/30"
                    />
                    <span className="hidden sm:block text-sm font-semibold text-text-light dark:text-text-dark">
                      {user?.name || 'User'}
                    </span>
                    <svg className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Profile Dropdown Menu */}
                  {isProfileMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-card-light dark:bg-card-dark rounded-lg shadow-lg border border-border-light dark:border-border-dark z-50 overflow-hidden">
                        <div className="p-4 border-b border-border-light dark:border-border-dark">
                          <div className="flex items-center gap-3">
                            <img
                              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                              alt="Profile"
                              className="w-12 h-12 rounded-full bg-primary/20 ring-2 ring-primary/30"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-text-light dark:text-text-dark truncate">
                                {user?.name || 'User'}
                              </p>
                              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark truncate">
                                {user?.email || 'user@example.com'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <button
                            onClick={() => {
                              navigate('/profile')
                              setIsProfileMenuOpen(false)
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-left text-text-light dark:text-text-dark hover:bg-primary/10 transition-colors font-semibold"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Profil</span>
                          </button>
                          <button
                            onClick={() => {
                              toggleTheme()
                              setIsProfileMenuOpen(false)
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-left text-text-light dark:text-text-dark hover:bg-primary/10 transition-colors"
                          >
                            {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                            <span>{isDark ? 'İşıqlı rejim' : 'Qaranlıq rejim'}</span>
                          </button>
                          <button
                            onClick={() => {
                              handleLogout()
                              setIsProfileMenuOpen(false)
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-500 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOutIcon className="w-5 h-5" />
                            <span>Çıxış</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-20 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  )
}

