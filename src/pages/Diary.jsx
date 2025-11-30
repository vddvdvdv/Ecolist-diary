import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PlusIcon, BookIcon, ChartIcon, CheckIcon, XIcon } from '../components/icons'

const stats = [
  { label: 'Ümumi Qeydlər', value: '45', icon: BookIcon },
  { label: 'Bu Ay', value: '12', icon: ChartIcon },
  { label: 'Streak', value: '7 gün', icon: CheckIcon },
]

export default function Diary() {
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')
  const [diaryEntries, setDiaryEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  useEffect(() => {
    // Load entries from localStorage
    const savedEntries = JSON.parse(localStorage.getItem('ekolist_diary_entries') || '[]')
    // Sort by date (newest first)
    const sorted = savedEntries.sort((a, b) => new Date(b.date) - new Date(a.date))
    setDiaryEntries(sorted)
  }, [])

  const filteredEntries = filter === 'all' 
    ? diaryEntries 
    : diaryEntries.filter(entry => {
        // Determine mood from analysis or default to positive
        const mood = entry.analysis?.beneficial > 50 ? 'positive' : 
                     entry.analysis?.harmful > 50 ? 'negative' : 'neutral'
        return mood === filter
      })

  const totalEntries = diaryEntries.length
  const thisMonthEntries = diaryEntries.filter(entry => {
    const entryDate = new Date(entry.date)
    const now = new Date()
    return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear()
  }).length

  const stats = [
    { label: 'Ümumi Qeydlər', value: totalEntries.toString(), icon: BookIcon },
    { label: 'Bu Ay', value: thisMonthEntries.toString(), icon: ChartIcon },
    { label: 'Streak', value: `${user?.streak || 0} gün`, icon: CheckIcon },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-light dark:text-text-dark">Gündəliyim</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">Eko-fəaliyyətlərini qeyd et və irəliləyişini izlə</p>
        </div>
        <Link to="/diary/new" className="btn-primary">
          <PlusIcon className="w-5 h-5 mr-2" />
          Yeni Qeyd
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="card p-4 text-center">
            <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-light dark:text-text-dark">{stat.value}</p>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'positive', 'neutral', 'negative'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filter === f 
                ? 'bg-primary text-text-light' 
                : 'bg-card-light dark:bg-card-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10'
            }`}
          >
            {f === 'all' ? 'Hamısı' : f === 'positive' ? 'Müsbət' : f === 'neutral' ? 'Neytral' : 'Mənfi'}
          </button>
        ))}
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => {
          const entryDate = new Date(entry.date)
          const mood = entry.analysis?.beneficial > 50 ? 'positive' : 
                       entry.analysis?.harmful > 50 ? 'negative' : 'neutral'
          const preview = entry.content?.substring(0, 100) + (entry.content?.length > 100 ? '...' : '')
          const activities = entry.tags || []
          
          return (
          <div 
            key={entry.id} 
            onClick={() => {
              setSelectedEntry(entry)
              setIsDetailOpen(true)
            }}
            className="card p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {new Date(entry.date).toLocaleDateString('az-AZ', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    mood === 'positive' ? 'bg-green-500/20 text-green-500' :
                    mood === 'neutral' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {mood === 'positive' ? 'Müsbət' : mood === 'neutral' ? 'Neytral' : 'Mənfi'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2">{entry.title}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">{preview}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {activities.map((activity, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-primary">+{entry.points}</span>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">xal</p>
              </div>
            </div>
          </div>
          )
        })}
      </div>

      {/* Detail View Modal */}
      {isDetailOpen && selectedEntry && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsDetailOpen(false)}
        >
          <div 
            className="bg-card-light dark:bg-card-dark rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark p-6 flex items-start justify-between z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {new Date(selectedEntry.date).toLocaleDateString('az-AZ', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    })}
                    {' • '}
                    {new Date(selectedEntry.date).toLocaleTimeString('az-AZ', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {(() => {
                    const mood = selectedEntry.analysis?.beneficial > 50 ? 'positive' : 
                                 selectedEntry.analysis?.harmful > 50 ? 'negative' : 'neutral'
                    return (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        mood === 'positive' ? 'bg-green-500/20 text-green-500' :
                        mood === 'neutral' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {mood === 'positive' ? 'Müsbət' : mood === 'neutral' ? 'Neytral' : 'Mənfi'}
                      </span>
                    )
                  })()}
                </div>
                <h2 className="text-2xl font-black text-text-light dark:text-text-dark">
                  {selectedEntry.title}
                </h2>
              </div>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors ml-4"
              >
                <XIcon className="w-6 h-6 text-text-secondary-light dark:text-text-secondary-dark" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Photos */}
              {selectedEntry.photos && selectedEntry.photos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedEntry.photos.map((photo, idx) => (
                    <div 
                      key={idx}
                      className="relative aspect-video rounded-lg overflow-hidden bg-background-light dark:bg-background-dark"
                    >
                      <img 
                        src={photo} 
                        alt={`Qeyd şəkli ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Content Text */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-text-light dark:text-text-dark whitespace-pre-wrap leading-relaxed">
                  {selectedEntry.content}
                </p>
              </div>

              {/* Tags */}
              {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Analysis */}
              {selectedEntry.analysis && (
                <div className="card p-6 bg-primary/5 border-primary/20">
                  <h3 className="font-bold text-text-light dark:text-text-dark mb-4">Eko-Təsir Analizi</h3>
                  <div className="flex items-center justify-center mb-4">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20">
                      <span className="text-3xl font-black text-primary">+{selectedEntry.points || selectedEntry.analysis.score}</span>
                    </div>
                    <span className="ml-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">xal</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-500 font-medium">Faydalı</span>
                        <span className="text-text-light dark:text-text-dark">{selectedEntry.analysis.beneficial}%</span>
                      </div>
                      <div className="h-3 bg-border-light dark:bg-border-dark rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all" 
                          style={{ width: `${selectedEntry.analysis.beneficial}%` }} 
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-500 font-medium">Zərərli</span>
                        <span className="text-text-light dark:text-text-dark">{selectedEntry.analysis.harmful}%</span>
                      </div>
                      <div className="h-3 bg-border-light dark:bg-border-dark rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500 rounded-full transition-all" 
                          style={{ width: `${selectedEntry.analysis.harmful}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                  {selectedEntry.analysis.feedback && (
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-4 p-3 bg-background-light dark:bg-background-dark rounded-lg">
                      {selectedEntry.analysis.feedback}
                    </p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border-light dark:border-border-dark">
                <Link
                  to={`/diary/${selectedEntry.id}`}
                  className="btn-primary flex-1 text-center"
                >
                  Redaktə Et
                </Link>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="btn-secondary flex-1"
                >
                  Bağla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredEntries.length === 0 && (
        <div className="card p-12 text-center">
          <BookIcon className="w-16 h-16 text-text-secondary-light/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">Hələ qeyd yoxdur</h3>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
            İlk eko-qeydini yazmağa başla!
          </p>
          <Link to="/diary/new" className="btn-primary inline-flex">
            <PlusIcon className="w-5 h-5 mr-2" />
            İlk Qeydimi Yaz
          </Link>
        </div>
      )}
    </div>
  )
}

