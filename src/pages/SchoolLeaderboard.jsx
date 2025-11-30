import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ChevronLeftIcon, TrophyIcon, SchoolIcon } from '../components/icons'

const timeframes = ['Bu Həftə', 'Bu Ay', 'Bütün Vaxt']

const schools = [
  { rank: 1, name: 'Greenwood Academy', points: 150000, color: 'bg-yellow-400/10' },
  { rank: 2, name: 'Riverdale High', points: 145000, color: 'bg-gray-300/10' },
  { rank: 3, name: 'Oakridge International', points: 138000, color: 'bg-orange-400/10' },
  { rank: 4, name: 'Maple Leaf School', points: 132000, color: '' },
  { rank: 5, name: 'Pinecrest Prep', points: 125000, color: '' },
]

const schoolStudents = [
  { rank: 1, name: 'Olivia Chen', points: 12450, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia' },
  { rank: 2, name: 'Sən', points: 11980, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You', isCurrentUser: true },
  { rank: 3, name: 'Ben Carter', points: 11200, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ben' },
  { rank: 4, name: 'Sofia Rodriguez', points: 10550, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia' },
  { rank: 5, name: 'Liam Goldberg', points: 9870, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam' },
]

export default function SchoolLeaderboard() {
  const [activeTimeframe, setActiveTimeframe] = useState('Bu Həftə')
  const { user } = useAuth()

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/leaderboard" className="p-2 rounded-lg hover:bg-primary/10">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-text-light dark:text-text-dark">Məktəb Leaderboard</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">Məktəbini zirvəyə daşı!</p>
        </div>
      </div>

      {/* Timeframe Tabs */}
      {/* <div className="flex gap-2 flex-wrap">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setActiveTimeframe(tf)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTimeframe === tf
                ? 'bg-primary text-text-light'
                : 'bg-card-light dark:bg-card-dark text-text-secondary-light hover:bg-primary/10'
            }`}
          >
            {tf}
          </button>
        ))}
      </div> */}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Schools Table */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Məktəblərarası Yarış</h2>
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark w-16">Sıra</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Məktəb</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Ümumi Xal</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school) => (
                  <tr key={school.rank} className={`border-t border-border-light dark:border-border-dark ${school.color}`}>
                    <td className="px-6 py-4">
                      <span className="font-bold text-lg text-text-light dark:text-text-dark">{school.rank}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <SchoolIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-text-light dark:text-text-dark">{school.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-text-light dark:text-text-dark">{school.points.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* My School */}
          <div className="card p-6">
            <h3 className="font-bold text-lg text-text-light dark:text-text-dark mb-4">Mənim Məktəbim</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                <SchoolIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-bold text-xl text-text-light dark:text-text-dark">{user?.school || 'Greenwood Academy'}</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  Ümumi Sıra: <span className="font-bold text-primary">#1</span>
                </p>
              </div>
            </div>
            <div className="border-t border-border-light dark:border-border-dark pt-4">
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Ümumi Məktəb Xalı</p>
              <p className="text-3xl font-black text-text-light dark:text-text-dark">150,000</p>
            </div>
            <button className="btn-secondary w-full mt-4">Məktəb Profilini Gör</button>
          </div>

          {/* Top Students */}
          <div className="card p-6">
            <h3 className="font-bold text-lg text-text-light dark:text-text-dark mb-4">Greenwood-un Ən Yaxşıları</h3>
            <div className="space-y-3">
              {schoolStudents.map((student) => (
                <div 
                  key={student.rank}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    student.isCurrentUser ? 'bg-primary/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-bold w-6 text-center ${
                      student.isCurrentUser ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'
                    }`}>
                      {student.rank}
                    </span>
                    <img 
                      src={student.avatar}
                      alt={student.name}
                      className={`w-10 h-10 rounded-full bg-primary/20 ${
                        student.isCurrentUser ? 'ring-2 ring-primary' : ''
                      }`}
                    />
                    <span className={`font-medium ${
                      student.isCurrentUser ? 'text-primary font-bold' : 'text-text-light dark:text-text-dark'
                    }`}>
                      {student.name}
                    </span>
                  </div>
                  <span className={`font-bold ${
                    student.isCurrentUser ? 'text-primary' : 'text-text-light dark:text-text-dark'
                  }`}>
                    {student.points.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

