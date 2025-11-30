import { useAuth } from '../context/AuthContext'
import { ChartIcon, CheckIcon, LightbulbIcon } from '../components/icons'

const weekDays = ['Baz.e', 'Ç.ax', 'Çər', 'C.ax', 'Cümə', 'Şən', 'Baz']
const streakData = [true, true, false, true, true, true, true]


const missions = [
  { name: 'Tullantı Döyüşçüsü', progress: 60, current: 3, total: 5, unit: 'Gün' },
  { name: 'Sərnişin Çağırışı', progress: 50, current: 10, total: 20, unit: 'km' },
  { name: 'Ətsiz Bazar ertəsi', progress: 100, current: 1, total: 1, unit: 'Tamamlandı!' },
]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="max-w-6xl mx-auto space-y-6 page-enter">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-text-light dark:text-text-dark">Dashboard</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">Eko-fəaliyyətlərinin ümumi icmalı</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Total Points Card */}
          <div className="card p-6 bg-gradient-to-r from-primary/20 to-eco-leaf/20">
            <h3 className="text-text-secondary-light dark:text-text-secondary-dark font-medium">Ümumi Eko-Xal</h3>
            <p className="text-5xl font-black text-yellow-accent mt-2">{user?.points?.toLocaleString() || '12,450'}</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary-light dark:text-text-secondary-dark">Növbəti səviyyəyə</span>
                <span className="font-bold">450 xal qaldı</span>
              </div>
              <div className="progress-bar h-3">
                <div className="progress-bar-fill bg-yellow-accent" style={{ width: '75%' }} />
              </div>
            </div>
          </div>

          {/* Weekly Progress Chart - Line Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-text-light dark:text-text-dark">Bu Həftənin İrəliləyişi</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Son 7 gün</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">1,280 Xal</p>
                <p className="text-sm text-green-500">+150</p>
              </div>
            </div>
            
            {/* Line Chart Visualization */}
            <div className="h-48 relative">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
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
                
                {/* Data points */}
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
                
                {/* Line path */}
                <path
                  d={`M 0 ${200 - (60 * 2)} L ${400 / 6} ${200 - (80 * 2)} L ${(400 * 2) / 6} ${200 - (40 * 2)} L ${(400 * 3) / 6} ${200 - (90 * 2)} L ${(400 * 4) / 6} ${200 - (70 * 2)} L ${(400 * 5) / 6} ${200 - (100 * 2)} L 400 ${200 - (85 * 2)}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-primary"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Area under line */}
                <path
                  d={`M 0 ${200 - (60 * 2)} L ${400 / 6} ${200 - (80 * 2)} L ${(400 * 2) / 6} ${200 - (40 * 2)} L ${(400 * 3) / 6} ${200 - (90 * 2)} L ${(400 * 4) / 6} ${200 - (70 * 2)} L ${(400 * 5) / 6} ${200 - (100 * 2)} L 400 ${200 - (85 * 2)} L 400 200 L 0 200 Z`}
                  fill="currentColor"
                  className="text-primary opacity-20"
                />
              </svg>
              
              {/* Day labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
                {weekDays.map((day, idx) => (
                  <span key={idx} className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 7-Day Streak */}
          <div className="card p-6">
            <h3 className="font-bold text-text-light dark:text-text-dark mb-2">7 Günlük Streak</h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">Əla! Yaşıl streak-i davam etdir.</p>
            <div className="flex justify-between items-center gap-2">
              {weekDays.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                  <div className={`
                    flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full
                    ${streakData[idx] 
                      ? 'bg-primary text-white' 
                      : 'bg-border-light dark:bg-border-dark text-text-secondary-light'
                    }
                    ${idx === 6 ? 'ring-4 ring-primary/30' : ''}
                  `}>
                    {streakData[idx] && <CheckIcon className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-bold text-text-light dark:text-text-dark">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Eco Fact */}
          <div className="card p-6 bg-blue-secondary/10 border-blue-secondary/20">
            <div className="flex items-center gap-3 mb-3">
              <LightbulbIcon className="w-5 h-5 text-blue-secondary" />
              <h3 className="font-bold text-text-light dark:text-text-dark">Günün Eko-Faktı</h3>
            </div>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              Bir alüminium qutuunu təkrar emal etmək televizoru üç saat işlətmək üçün kifayət qədər enerji saxlayır.
            </p>
            <button className="mt-3 text-sm font-bold text-blue-secondary hover:underline flex items-center gap-1">
              Yeni Fakt
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Active Missions */}
          <div className="card p-6">
            <h3 className="font-bold text-text-light dark:text-text-dark mb-4">Aktiv Missiyalar</h3>
            <div className="space-y-4">
              {missions.map((mission, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-text-light dark:text-text-dark">{mission.name}</span>
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      {mission.progress === 100 ? mission.unit : `${mission.current}/${mission.total} ${mission.unit}`}
                    </span>
                  </div>
                  <div className="progress-bar h-1.5">
                    <div 
                      className={`progress-bar-fill ${
                        mission.progress === 100 ? 'bg-yellow-accent' : 
                        idx === 1 ? 'bg-blue-secondary' : 'bg-primary'
                      }`}
                      style={{ width: `${mission.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

