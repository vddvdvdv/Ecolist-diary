import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { FireIcon, TargetIcon, ChartIcon, PlusIcon, RecycleIcon, BicycleIcon } from '../components/icons'

const defaultRecentActivities = [
  { action: 'Velosipedlə işə getdim', points: '+20', time: '2 saat əvvəl', icon: BicycleIcon },
  { action: 'Plastik qablaşdırmaları təkrar emal etdim', points: '+15', time: 'Dünən', icon: RecycleIcon },
  { action: 'Təkrar istifadə edilən çanta istifadə etdim', points: '+10', time: 'Dünən', icon: RecycleIcon },
]

export default function Home() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [todayPoints, setTodayPoints] = useState(0)
  const [recentActivities, setRecentActivities] = useState([])
  const [weeklyData, setWeeklyData] = useState([])
  const [weeklyTotal, setWeeklyTotal] = useState(0)

  useEffect(() => {
    // Load today's diary entries
    const entries = JSON.parse(localStorage.getItem('ekolist_diary_entries') || '[]')
    const today = new Date().toDateString()
    const todayEntries = entries.filter(entry => new Date(entry.date).toDateString() === today)
    const totalPoints = todayEntries.reduce((sum, entry) => sum + (entry.points || 0), 0)
    setTodayPoints(totalPoints)

    // Load recent activities from missions
    const completedMissions = JSON.parse(localStorage.getItem('ekolist_completed_missions') || '[]')
    const activities = completedMissions.slice(-3).map((missionId, idx) => ({
      action: `Missiya tamamlandı #${missionId}`,
      points: '+50',
      time: idx === 0 ? '2 saat əvvəl' : idx === 1 ? 'Dünən' : '2 gün əvvəl',
      icon: TargetIcon,
    }))
    setRecentActivities(activities.length > 0 ? activities : defaultRecentActivities)

    // Calculate weekly data
    const weekDays = ['Baz.e', 'Ç.ax', 'Çər', 'C.ax', 'Cümə', 'Şən', 'Baz']
    const weeklyPoints = []
    let total = 0
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateString = date.toDateString()
      
      const dayEntries = entries.filter(entry => new Date(entry.date).toDateString() === dateString)
      const dayPoints = dayEntries.reduce((sum, entry) => sum + (entry.points || 0), 0)
      weeklyPoints.push(dayPoints)
      total += dayPoints
    }
    
    // If no data, use mock data
    if (total === 0) {
      weeklyPoints.splice(0, weeklyPoints.length, ...[60, 80, 40, 90, 70, 100, 85])
      total = 525
    }
    
    setWeeklyData(weeklyPoints)
    setWeeklyTotal(total)
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-6 page-enter">
      {/* Welcome Banner */}
      <div className="card p-6 bg-gradient-to-r from-eco-forest to-background-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">{t('home.welcome')}, {user?.name ? (user.name.split(' ')[0] || user.name) : 'User'}! 👋</h1>
          <p className="text-eco-leaf">{t('home.reminder') || 'Bugün eko-fəaliyyətlərini qeyd etməyi unutma.'}</p>
          <Link to="/diary/new" className="btn-primary mt-4 inline-flex">
            <PlusIcon className="w-5 h-5 mr-2" />
            {t('diary.newEntry')}
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        <div className="card p-6 card-hover">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-primary/20 rounded-lg">
              <ChartIcon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-base text-text-secondary-light dark:text-text-secondary-dark">{t('home.todayPoints')}</span>
          </div>
            <p className="text-4xl font-bold text-text-light dark:text-text-dark mb-1">{todayPoints}</p>
            <p className="text-sm text-green-500">+20% dünəndən</p>
        </div>

        <div className="card p-6 card-hover">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <FireIcon className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-base text-text-secondary-light dark:text-text-secondary-dark">{t('home.streak')}</span>
          </div>
          <p className="text-4xl font-bold text-text-light dark:text-text-dark mb-1">
            {user?.streak || 7} gün <span className="text-orange-400">🔥</span>
          </p>
          <p className="text-sm text-green-500">+1 gün</p>
        </div>

        <div className="card p-6 card-hover">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <TargetIcon className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-base text-text-secondary-light dark:text-text-secondary-dark">{t('home.missions')}</span>
          </div>
          <p className="text-4xl font-bold text-text-light dark:text-text-dark mb-1">3/5</p>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Bu həftə</p>
        </div>

      </div>

      <div className="grid lg:grid-cols-1 gap-6">
        {/* Daily Mission */}
        <div>
          <div className="card overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto bg-cover bg-center" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop)'
              }} />
              <div className="flex-1 p-6">
                <span className="text-sm font-medium text-primary">{t('missions.dailyMission')} </span>
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mt-1">{t('missions.dailyMissionTitle')} </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">
                  {t('missions.dailyMissionDesc')} 
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-primary">50 {t('missions.points')}</span>
                  <Link to="/missions" className="btn-primary px-4 py-2 text-sm">
                    {t('missions.start')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Weekly Progress & Total Points */}
      {/* <div className="grid lg:grid-cols-2 gap-6"> */}
      <div className="grid grid-cols-1 gap-6">

        {/* Weekly Progress Chart - Line Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-text-light dark:text-text-dark">{t('home.weeklyProgress')}</h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Son 7 gün</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-text-light dark:text-text-dark">{weeklyTotal.toLocaleString()} Xal</p>
              <p className="text-sm text-green-500">+{Math.round((weeklyTotal / 7) * 0.2)}</p>
            </div>
          </div>
          
          {/* Line Chart Visualization */}
          <div className="h-48 relative pb-6">
            <svg className="w-full h-full " viewBox="0 0 400 200" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y * 2}
                  x2="400"
                  y2={y * 2}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-border-light dark:text-border-dark opacity-30"
                />
              ))}
              
              {/* Data points and line */}
              {weeklyData.length > 0 && (() => {
                const maxValue = Math.max(...weeklyData, 100)
                const minValue = Math.min(...weeklyData, 0)
                const range = maxValue - minValue || 100
                
                // Generate path for line
                const points = weeklyData.map((value, idx) => {
                  const x = (idx * 400) / (weeklyData.length - 1 || 1)
                  const normalizedValue = ((value - minValue) / range) * 180 + 10
                  const y = 200 - normalizedValue
                  return { x, y, value }
                })
                
                // Create path string
                const pathD = points.map((point, idx) => 
                  idx === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
                ).join(' ')
                
                // Area under line
                const areaD = pathD + ` L ${points[points.length - 1].x} 200 L ${points[0].x} 200 Z`
                
                return (
                  <>
                    {/* Area under line */}
                    <path
                      d={areaD}
                      fill="currentColor"
                      className="text-primary opacity-10"
                    />
                    
                    {/* Line path */}
                    {/* <path
                      d={pathD}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-primary"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    /> */}
                       {[60, 80, 40, 90, 70, 100, 85].map((value, idx) => {
                  const x = (idx * 400) / 6
                  const y = 200 - (value * 2)
                  return (
                    <circle
                      key={idx}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="currentColor"
                      className="text-primary"
                    />
                  )
                })}
                    <path
                  d={`M 0 ${200 - (60 * 2)} L ${400 / 6} ${200 - (80 * 2)} L ${(400 * 2) / 6} ${200 - (40 * 2)} L ${(400 * 3) / 6} ${200 - (90 * 2)} L ${(400 * 4) / 6} ${200 - (70 * 2)} L ${(400 * 5) / 6} ${200 - (100 * 2)} L 400 ${200 - (85 * 2)}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-primary"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                 <path
                  d={`M 0 ${200 - (60 * 2)} L ${400 / 6} ${200 - (80 * 2)} L ${(400 * 2) / 6} ${200 - (40 * 2)} L ${(400 * 3) / 6} ${200 - (90 * 2)} L ${(400 * 4) / 6} ${200 - (70 * 2)} L ${(400 * 5) / 6} ${200 - (100 * 2)} L 400 ${200 - (85 * 2)} L 400 200 L 0 200 Z`}
                  fill="currentColor"
                  className="text-primary opacity-20"
                />
                    
                  </>
                )
              })()}
            </svg>
            
            {/* Day labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 ">
              {['Baz.e', 'Ç.ax', 'Çər', 'C.ax', 'Cümə', 'Şən', 'Baz'].map((day, idx) => (
                <span key={idx} className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 7 Day Streak Chart */}
        {/* <div className="card p-6">
          <h4 className="font-bold text-text-light dark:text-text-dark mb-2">7 Günlük Streak</h4>
          <p className="text-sm text-green-500 mb-3">Əla! Yaşıl streak-i davam etdir.</p>
          <div className="h-32 flex items-end justify-between gap-1">
            {['Baz.e', 'Ç.ax', 'Çər', 'C.ax', 'Cümə', 'Şən', 'Baz'].map((day, idx) => {
              const hasStreak = idx < (user?.streak || 7)
              return (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full rounded-t transition-colors ${
                      hasStreak ? 'bg-green-500' : 'bg-border-light dark:bg-border-dark'
                    }`}
                    style={{ height: hasStreak ? '100%' : '30%' }}
                    title={hasStreak ? `${day}: ✓` : `${day}: ✗`}
                  />
                  <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-2">{day}</span>
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <FireIcon className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-bold text-text-light dark:text-text-dark">
              Streak: {user?.streak || 7} gün 🔥
            </span>
            <span className="text-sm text-green-500">+1 gün</span>
          </div>
        </div> */}
      </div>
    </div>
  )
}

