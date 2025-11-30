import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UsersIcon, PlusIcon, ChevronLeftIcon, RecycleIcon, BicycleIcon } from '../components/icons'

const teamMembers = [
  { id: 1, name: 'Alex Johnson', role: 'Kapitan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', joined: '2 həftə əvvəl' },
  { id: 2, name: 'Maria Garcia', role: 'Üzv', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', joined: '1 həftə əvvəl' },
  { id: 3, name: 'Jane Doe', role: 'Üzv', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', joined: '1 ay əvvəl' },
  { id: 4, name: 'David Smith', role: 'Üzv', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', joined: '3 gün əvvəl' },
]

const goals = [
  { id: 1, title: '50 Bitki Əsaslı Yemək', progress: 70, current: 35, total: 50, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop' },
  { id: 2, title: 'Velosipedlə İşə 20 Dəfə', progress: 55, current: 11, total: 20, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop' },
  { id: 3, title: 'Bir Ay Təkrar İstifadə Edilən Çanta', progress: 90, current: 28, total: 31, image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=300&h=200&fit=crop' },
]

const activities = [
  { user: 'Alex', action: 'Velosipedlə İşə gəldi', points: 15, time: '2 saat əvvəl', icon: BicycleIcon, color: 'bg-yellow-accent/20 text-yellow-accent' },
  { user: 'Maria', action: 'Bitki Əsaslı Yemək qeyd etdi', points: 10, time: 'Dünən', icon: RecycleIcon, color: 'bg-primary/20 text-primary' },
  { user: 'David', action: 'Təkrar İstifadə Edilən Çanta istifadə etdi', points: 5, time: 'Dünən', icon: RecycleIcon, color: 'bg-blue-secondary/20 text-blue-secondary' },
]

export default function TeamMissions() {
  const [activeTeam] = useState({
    name: 'Eko Döyüşçülər',
    points: 1250,
    totalPoints: 2000,
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/missions" className="p-2 rounded-lg hover:bg-primary/10">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-black text-text-light dark:text-text-dark">{activeTeam.name}</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">Missiyaları birlikdə tamamlayın və bonus xal qazanın!</p>
        </div>
        <button className="btn-secondary">
          <PlusIcon className="w-5 h-5 mr-2" />
          Üzv Dəvət Et
        </button>
      </div>

      {/* Team Progress */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-text-secondary-light dark:text-text-secondary-dark">Kollektiv Komanda İrəliləyişi</p>
          <p className="text-sm font-bold text-primary">{activeTeam.points} / {activeTeam.totalPoints} XAL</p>
        </div>
        <div className="progress-bar h-3">
          <div 
            className="progress-bar-fill"
            style={{ width: `${(activeTeam.points / activeTeam.totalPoints) * 100}%` }}
          />
        </div>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">
          Əla iş! Növbəti mükafata cəmi {activeTeam.totalPoints - activeTeam.points} xal qaldı!
        </p>
      </div>

      {/* Mission Goals */}
      <div>
        <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Missiya Hədəfləri</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <div key={goal.id} className="card overflow-hidden">
              <div 
                className="h-32 bg-cover bg-center"
                style={{ backgroundImage: `url(${goal.image})` }}
              />
              <div className="p-4">
                <h3 className="font-medium text-text-light dark:text-text-dark mb-2">{goal.title}</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">
                  İrəliləyiş: {goal.current}/{goal.total}
                </p>
                <div className="progress-bar h-2 mb-3">
                  <div className="progress-bar-fill bg-blue-secondary" style={{ width: `${goal.progress}%` }} />
                </div>
                <button className="text-sm font-bold text-primary hover:underline">Fəaliyyət Qeyd Et</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <div>
          <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">
            Komanda Üzvləri ({teamMembers.length})
          </h2>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-12 h-12 rounded-full bg-primary/20"
                />
                <div>
                  <p className="font-semibold text-text-light dark:text-text-dark">{member.name}</p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Son Fəaliyyət</h2>
          <div className="space-y-3">
            {activities.map((activity, idx) => (
              <div key={idx} className="card p-4 flex items-start gap-4">
                <div className={`p-2 rounded-full ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-light dark:text-text-dark">
                    {activity.user} "{activity.action}" qeyd etdi!
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{activity.time}</p>
                </div>
                <p className="font-bold text-yellow-accent">+{activity.points} Xal</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

