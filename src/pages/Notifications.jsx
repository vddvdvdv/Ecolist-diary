import { useState } from 'react'
import { TargetIcon, StarIcon, BookIcon, UsersIcon, CheckIcon, BellIcon } from '../components/icons'

const notifications = [
  {
    id: 1,
    type: 'mission',
    title: 'Yeni Həftəlik Missiya Açıldı: "Tullantı Müşahidəçiləri"',
    description: '50 xal qazanmaq üçün indi başla!',
    time: '5 dəqiqə əvvəl',
    icon: TargetIcon,
    color: 'bg-blue-secondary',
    isNew: true,
  },
  {
    id: 2,
    type: 'reward',
    title: 'Təbriklər! 25 xal bonus qazandın.',
    description: '7 günlük streak üçün mükafat!',
    time: '1 saat əvvəl',
    icon: StarIcon,
    color: 'bg-yellow-accent',
    isNew: true,
  },
  {
    id: 3,
    type: 'reminder',
    title: 'Bugünkü eko-fəaliyyətlərini qeyd etməyi unutma!',
    description: 'Gündəlik qeydini indi əlavə et.',
    time: '2 saat əvvəl',
    icon: BookIcon,
    color: 'bg-teal-500',
    isNew: false,
  },
  {
    id: 4,
    type: 'social',
    title: 'Alex Green postuna şərh yazdı.',
    description: '"Kompostlaşdırma haqqında əla fikir!"',
    time: 'Dünən',
    icon: UsersIcon,
    color: 'bg-purple-500',
    isNew: false,
  },
  {
    id: 5,
    type: 'welcome',
    title: 'Ekolist Diary-ə Xoş Gəldin!',
    description: 'Başlamaq üçün profilini tamamla.',
    time: '3 gün əvvəl',
    icon: CheckIcon,
    color: 'bg-gray-500',
    isNew: false,
  },
]

export default function Notifications() {
  const [notifs, setNotifs] = useState(notifications)

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, isNew: false })))
  }

  const newCount = notifs.filter(n => n.isNew).length

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-text-light dark:text-text-dark">Bildirişlər</h1>
          {newCount > 0 && (
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              {newCount} yeni bildiriş
            </p>
          )}
        </div>
        <button 
          onClick={markAllRead}
          className="flex items-center gap-2 text-sm font-medium text-text-secondary-light hover:text-primary transition-colors"
        >
          <CheckIcon className="w-5 h-5" />
          Hamısını oxunmuş et
        </button>
      </div>

      {/* Notifications */}
      <div className="space-y-2">
        {/* New Section */}
        {newCount > 0 && (
          <>
            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-2 py-2">
              Yeni
            </p>
            {notifs.filter(n => n.isNew).map((notif) => (
              <div 
                key={notif.id}
                className="card p-4 flex gap-4 bg-primary/10 border-primary/30"
              >
                <div className={`${notif.color} p-3 rounded-full text-white shrink-0`}>
                  <notif.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-light dark:text-text-dark">{notif.title}</p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{notif.description}</p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{notif.time}</p>
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
              </div>
            ))}
          </>
        )}

        {/* Earlier Section */}
        <p className="text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark px-2 py-2 mt-6">
          Əvvəlki
        </p>
        {notifs.filter(n => !n.isNew).map((notif) => (
          <div 
            key={notif.id}
            className="p-4 flex gap-4 rounded-xl hover:bg-card-light dark:hover:bg-card-dark transition-colors"
          >
            <div className={`${notif.color} p-3 rounded-full text-white shrink-0`}>
              <notif.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-text-light dark:text-text-dark">{notif.title}</p>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{notif.description}</p>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark shrink-0">{notif.time}</p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {notifs.length === 0 && (
        <div className="card p-12 text-center">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BellIcon className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">Hamısı oxundu!</h3>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Yeni missiyalar, irəliləyiş və sosial yeniləmələr burada görünəcək.
          </p>
        </div>
      )}
    </div>
  )
}

