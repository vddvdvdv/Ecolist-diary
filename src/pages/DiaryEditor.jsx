import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ImageIcon, RecycleIcon, BicycleIcon, LightbulbIcon, WaterDropIcon } from '../components/icons'

const activityTags = [
  { icon: RecycleIcon, label: 'Təkrar emal', value: 'recycle' },
  { icon: BicycleIcon, label: 'Velosiped', value: 'bike' },
  { icon: LightbulbIcon, label: 'Enerji', value: 'energy' },
  { icon: WaterDropIcon, label: 'Su', value: 'water' },
]

export default function DiaryEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, updatePoints } = useAuth()
  const isEditing = !!id
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [photos, setPhotos] = useState([])
  const [analysis, setAnalysis] = useState(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [published, setPublished] = useState(false)

  // Load entry if editing
  useEffect(() => {
    if (isEditing && id) {
      const entries = JSON.parse(localStorage.getItem('ekolist_diary_entries') || '[]')
      const entry = entries.find(e => e.id === id)
      if (entry) {
        setTitle(entry.title || '')
        setContent(entry.content || '')
        setSelectedTags(entry.tags || [])
        setPhotos(entry.photos || [])
        setAnalysis(entry.analysis || null)
      }
    }
  }, [id, isEditing])

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const analyzeContent = () => {
    // Mock analysis
    setAnalysis({
      score: 50,
      beneficial: 75,
      harmful: 25,
      feedback: 'Gündəlik qeydinizdə eko-dostu fəaliyyətlər var! Velosiped istifadəsi və təkrar istifadə edilən fincan əla seçimdir.'
    })
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Başlıq və məzmun doldurulmalıdır!')
      return
    }

    setIsPublishing(true)
    
    // Calculate points based on content
    let points = 10 // Base points
    points += selectedTags.length * 5 // 5 points per tag
    points += photos.length * 10 // 10 points per photo
    points += Math.floor(content.length / 50) // 1 point per 50 characters
    
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false)
      setPublished(true)
      updatePoints(points)
      
      // Save to localStorage
      const diaryEntry = {
        id: id || Date.now().toString(),
        title,
        content,
        tags: selectedTags,
        photos,
        date: new Date().toISOString(),
        points,
        analysis,
      }
      
      const existingEntries = JSON.parse(localStorage.getItem('ekolist_diary_entries') || '[]')
      if (isEditing) {
        const updated = existingEntries.map(entry => entry.id === id ? diaryEntry : entry)
        localStorage.setItem('ekolist_diary_entries', JSON.stringify(updated))
      } else {
        localStorage.setItem('ekolist_diary_entries', JSON.stringify([...existingEntries, diaryEntry]))
      }
      
      setTimeout(() => {
        navigate('/diary')
      }, 1500)
    }, 1000)
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-black text-text-light dark:text-text-dark">
            {new Date().toLocaleDateString('az-AZ', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handlePublish}
            disabled={isPublishing || published}
            className="btn-primary px-6 py-2.5"
          >
            {isPublishing ? 'Dərc olunur...' : published ? 'Dərc olundu! ✓' : 'Dərc Et'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Qeydinə başlıq ver"
            className="w-full text-xl font-bold input-field"
          />

          {/* Content Editor */}
          <div className="card">
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                if (e.target.value.length > 50) analyzeContent()
              }}
              placeholder="Bu gün hansı eko-fəaliyyətləri etdin? Günün haqqında yaz..."
              className="w-full h-96 p-4 bg-transparent resize-none focus:outline-none text-text-light dark:text-text-dark placeholder-text-secondary-light/60"
            />
            
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border-light dark:border-border-dark">
              <div className="flex gap-2">
                {activityTags.map((tag) => (
                  <button
                    key={tag.value}
                    onClick={() => toggleTag(tag.value)}
                    className={`p-2 rounded-lg transition-colors ${
                      selectedTags.includes(tag.value)
                        ? 'bg-primary text-text-light'
                        : 'hover:bg-primary/10 text-text-secondary-light dark:text-text-secondary-dark'
                    }`}
                    title={tag.label}
                  >
                    <tag.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {content.length} simvol
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Eco-Impact Analysis */}
          {analysis && (
            <div className="card p-4">
              <h3 className="font-bold text-text-light dark:text-text-dark mb-4">Eko-Təsir Analizi</h3>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 animate-pulse">
                  <span className="text-2xl font-black text-primary">+{analysis.score}</span>
                </div>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">xal</p>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-500">Faydalı</span>
                    <span>{analysis.beneficial}%</span>
                  </div>
                  <div className="h-2 bg-border-light dark:bg-border-dark rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${analysis.beneficial}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-500">Zərərli</span>
                    <span>{analysis.harmful}%</span>
                  </div>
                  <div className="h-2 bg-border-light dark:bg-border-dark rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${analysis.harmful}%` }} />
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-4">
                {analysis.feedback}
              </p>
            </div>
          )}

          {/* Photos */}
          <div className="card p-4">
            <h3 className="font-bold text-text-light dark:text-text-dark mb-4">Şəkillər</h3>
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {photos.map((photo, idx) => (
                  <div 
                    key={idx}
                    className="aspect-square rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${photo})` }}
                  />
                ))}
              </div>
            )}
            <label className="btn-secondary w-full cursor-pointer flex items-center justify-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Şəkil Əlavə Et
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Tips */}
          <div className="card p-4 bg-primary/10 border-primary/20">
            <h3 className="font-bold text-text-light dark:text-text-dark mb-2">💡 İpucu</h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              Daha çox xal qazanmaq üçün ətraflı yazın və fəaliyyət etiketlərini seçin. Şəkil əlavə etmək əlavə bonus verir!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

