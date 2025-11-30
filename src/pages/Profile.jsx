import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { TrophyIcon, ChartIcon, FireIcon, TargetIcon, BookIcon, SunIcon, MoonIcon, SchoolIcon, LogOutIcon } from '../components/icons'
import { useNavigate } from 'react-router-dom'
import { showSuccess, showError } from '../utils/toast'

const badges = [
  { id: 1, name: 'Su Qəhrəmanı', icon: '💧', earned: true, description: '100 litr su qənaət et' },
  { id: 2, name: 'Ağac Dostu', icon: '🌳', earned: true, description: '5 ağac ək' },
  { id: 3, name: 'Sədaqətli Ekolist', icon: '⭐', earned: true, description: '30 gün ardıcıl qeyd et' },
  { id: 4, name: 'Velosiped Ustası', icon: '🚴', earned: false, description: '100 km velosiped sür' },
  { id: 5, name: 'Sıfır Tullantı', icon: '♻️', earned: false, description: 'Bir həftə plastik istifadə etmə' },
  { id: 6, name: 'Enerji Çempionu', icon: '⚡', earned: false, description: '50 kWh enerji qənaət et' },
]

const stats = [
  { label: 'Ümumi Xal', value: '12,450', icon: TrophyIcon },
  { label: 'Streak', value: '7 gün', icon: FireIcon },
  { label: 'Missiyalar', value: '45', icon: TargetIcon },
  { label: 'Qeydlər', value: '120', icon: BookIcon },
]

const weeklyProgress = [
  { label: 'CO2 Qənaəti', value: '15 kg', change: '+12%' },
  { label: 'Su Qənaəti', value: '45 L', change: '+8%' },
  { label: 'Enerji Qənaəti', value: '20 kWh', change: '+15%' },
]

export default function Profile() {
  const { user, logout, updatePoints, updateUser } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || '')
  const [editedEmail, setEditedEmail] = useState(user?.email || '')
  const [editedSchool, setEditedSchool] = useState(user?.school || '')
  const [editedAvatar, setEditedAvatar] = useState(user?.avatar || '')
  const [isStudent, setIsStudent] = useState(true)
  const [notifications, setNotifications] = useState({
    missions: true,
    reminders: true,
    social: true,
  })

  // Update form fields when user changes
  useEffect(() => {
    if (user) {
      setEditedName(user.name || '')
      setEditedEmail(user.email || '')
      setEditedSchool(user.school || '')
      setEditedAvatar(user.avatar || '')
    }
  }, [user])

  const handleSaveProfile = () => {
    if (!editedName.trim()) {
      showError('Ad doldurulmalıdır!')
      return
    }
    
    if (!editedEmail.trim()) {
      showError('Email doldurulmalıdır!')
      return
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(editedEmail)) {
      showError('Düzgün email ünvanı daxil edin!')
      return
    }
    
    const updatedData = {
      name: editedName.trim(),
      email: editedEmail.trim(),
      school: editedSchool.trim(),
      avatar: editedAvatar || user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(editedName.trim())}`,
    }
    
    updateUser(updatedData)
    showSuccess('Profil yeniləndi!')
    setIsEditing(false)
    // Force re-render by updating state
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }



  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img 
            src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
            alt="Avatar"
            className="w-24 h-24 rounded-full bg-primary/20 ring-4 ring-primary/30"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-black text-text-light dark:text-text-dark">{user?.name || 'User'}</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">{user?.school || user?.email || 'Məktəb seçilməyib'}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold">
                Level {user?.level || 12}
              </span>
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Eko-Döyüşçü
              </span>
            </div>
          </div>
          {/* <button 
            onClick={() => setIsEditing(!isEditing)}
            className="btn-secondary"
          >
            {isEditing ? 'Ləğv Et' : 'Profili Redaktə Et'}
          </button> */}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="card p-4 text-center">
            <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-light dark:text-text-dark">{stat.value}</p>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Emblemlər (Badges)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`p-4 rounded-xl border text-center ${
                badge.earned 
                  ? 'bg-primary/10 border-primary/30' 
                  : 'bg-card-light dark:bg-card-dark border-border-light dark:border-border-dark opacity-50'
              }`}
            >
              <span className="text-3xl">{badge.icon}</span>
              <p className={`font-bold mt-2 ${badge.earned ? 'text-primary' : 'text-text-secondary-light'}`}>
                {badge.name}
              </p>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                {badge.description}
              </p>
              {!badge.earned && (
                <span className="text-xs text-text-secondary-light mt-2 block">🔒 Kilidli</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Impact */}
      {/* <div className="card p-6">
        <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Həftəlik Təsir</h2>
        <div className="space-y-4">
          {weeklyProgress.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-lg">
              <div>
                <p className="font-medium text-text-light dark:text-text-dark">{item.label}</p>
                <p className="text-2xl font-bold text-primary">{item.value}</p>
              </div>
              <span className="text-green-500 font-bold">{item.change}</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Activity Chart Placeholder */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">30 Günlük Fəaliyyət</h2>
        <div className="h-48 flex items-end justify-between gap-1">
          {Array.from({ length: 30 }, (_, i) => (
            <div 
              key={i}
              className="flex-1 bg-primary/30 rounded-t hover:bg-primary transition-colors"
              style={{ height: `${Math.random() * 80 + 20}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-text-secondary-light mt-2">
          <span>30 gün əvvəl</span>
          <span>Bu gün</span>
        </div>
      </div>

      {/* Settings Section */}
      {isEditing && (
        <div className="card p-6 space-y-6">
          <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Profil Redaktəsi</h2>
          
          {/* Avatar Upload */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={editedAvatar || user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                alt="Avatar"
                className="w-24 h-24 rounded-full bg-primary/20 ring-4 ring-primary/30"
              />
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/80 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Ad Soyad</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="input-field w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Email</label>
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="input-field w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Məktəb</label>
            <input
              type="text"
              value={editedSchool}
              onChange={(e) => setEditedSchool(e.target.value)}
              className="input-field w-full"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Tətbiq Dili</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input-field w-full"
            >
              <option value="az">Azərbaycan</option>
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="tr">Türkçe</option>
            </select>
          </div>

          {/* Theme */}
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

          {/* Student Mode */}
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

          {/* Notifications */}
          <div>
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

          {/* Save Button */}
          <div className="flex gap-3 pt-4 border-t border-border-light dark:border-border-dark">
            <button 
              onClick={handleSaveProfile}
              className="btn-primary flex-1"
            >
              Dəyişiklikləri Saxla
            </button>
            <button 
              onClick={logout}
              className="flex items-center justify-center gap-2 px-4 py-2 text-red-500 font-bold hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOutIcon className="w-5 h-5" />
              Çıxış
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

