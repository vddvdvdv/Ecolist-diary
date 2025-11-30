import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { SettingsIcon, BellIcon, LogOutIcon, SunIcon, MoonIcon, SchoolIcon } from '../components/icons'

const languages = [
  { code: 'az', name: 'Azərbaycan' },
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'tr', name: 'Türkçe' },
]

export default function Settings() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [language, setLanguage] = useState('az')
  const [isStudent, setIsStudent] = useState(true)
  const [notifications, setNotifications] = useState({
    missions: true,
    reminders: true,
    social: true,
  })

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-text-light dark:text-text-dark">Tənzimləmələr</h1>
      </div>

      {/* User Profile */}
      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <img 
            src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
            alt="Avatar"
            className="w-16 h-16 rounded-full bg-primary/20"
          />
          <div>
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">{user?.name || 'İstifadəçi'}</h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">{user?.email || 'email@example.com'}</p>
          </div>
        </div>
        <button className="btn-secondary w-full">Profili Redaktə Et</button>
      </div>

      {/* Language */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Tətbiq Dili</h3>
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="input-field"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.name}>{lang.name}</option>
          ))}
        </select>
      </div>

      {/* Appearance */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Görünüş</h3>
        <div className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-lg">
          <div className="flex items-center gap-3">
            {isDark ? <MoonIcon className="w-5 h-5 text-primary" /> : <SunIcon className="w-5 h-5 text-primary" />}
            <div>
              <p className="font-medium text-text-light dark:text-text-dark">Qaranlıq Rejim</p>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {isDark ? 'Aktivdir' : 'Deaktivdir'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              isDark ? 'bg-primary' : 'bg-border-light dark:bg-border-dark'
            }`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${
              isDark ? 'right-1' : 'left-1'
            }`} />
          </button>
        </div>
      </div>

      {/* Student Mode */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Rejim</h3>
        <div className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-lg">
          <div className="flex items-center gap-3">
            <SchoolIcon className="w-5 h-5 text-primary" />
            <div>
              <p className="font-bold text-text-light dark:text-text-dark">Şagird Rejimi</p>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                İnterfeysi sadələşdirir və şagirdlər üçün təhsil missiyalarını aktivləşdirir.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsStudent(!isStudent)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              isStudent ? 'bg-primary' : 'bg-border-light dark:bg-border-dark'
            }`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${
              isStudent ? 'right-1' : 'left-1'
            }`} />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Bildirişlər</h3>
        <div className="space-y-4">
          {[
            { key: 'missions', label: 'Missiya Bildirişləri', desc: 'Yeni və tamamlanmış missiyalar haqqında xəbərdar ol' },
            { key: 'reminders', label: 'Gündəlik Xatırlatmalar', desc: 'Gündəlik qeyd etməyi unutma' },
            { key: 'social', label: 'Sosial Bildirişlər', desc: 'Bəyənmələr, şərhlər və izləyicilər' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-light dark:text-text-dark">{item.label}</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications[item.key] ? 'bg-primary' : 'bg-border-light dark:bg-border-dark'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${
                  notifications[item.key] ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button className="btn-primary w-full">Dəyişiklikləri Saxla</button>
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-3 text-red-500 font-bold hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOutIcon className="w-5 h-5" />
          Çıxış
        </button>
      </div>
    </div>
  )
}

