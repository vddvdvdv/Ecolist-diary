import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { TargetIcon, RecycleIcon, BicycleIcon, LightbulbIcon, UsersIcon, CheckIcon, CameraIcon } from '../components/icons'

const missions = [
  {
    id: 1,
    title: 'Ətsiz Bazar Ertəsi',
    description: 'Karbon izinizi azaltmaq üçün bir tam gün ət yeməkdən çəkinin.',
    points: 20,
    icon: RecycleIcon,
    category: 'daily',
    status: 'available',
    progress: null,
  },
  {
    id: 2,
    title: 'Velosipedlə İşə',
    description: 'Bu həftə 3 dəfə velosipedlə işə gedin.',
    points: 50,
    icon: BicycleIcon,
    category: 'weekly',
    status: 'in_progress',
    progress: { current: 2, total: 3 },
  },
  {
    id: 3,
    title: 'Sıfır Tullantılı Nahar',
    description: 'Naharınızı təkrar istifadə edilən qablarda hazırlayın.',
    points: 15,
    icon: RecycleIcon,
    category: 'daily',
    status: 'available',
    progress: null,
  },
  {
    id: 4,
    title: 'Elektronikları Söndür',
    description: 'Yatmadan əvvəl bütün lazımsız elektronikları söndürün.',
    points: 10,
    icon: LightbulbIcon,
    category: 'daily',
    status: 'completed',
    progress: null,
  },
]

const categories = [
  { id: 'all', label: 'Hamısı' },
  { id: 'daily', label: 'Gündəlik' },
  { id: 'weekly', label: 'Həftəlik' },
  { id: 'bonus', label: 'Bonus' },
]

const filters = ['Hamısı', 'Təkrar Emal', 'Enerji Qənaəti', 'Qoruma']

export default function Missions() {
  const { user, updatePoints } = useAuth()
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeFilter, setActiveFilter] = useState('Hamısı')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedMission, setSelectedMission] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedMissions, setCompletedMissions] = useState(
    JSON.parse(localStorage.getItem('ekolist_completed_missions') || '[]')
  )

  const filteredMissions = missions.filter(m => 
    activeCategory === 'all' || m.category === activeCategory
  )

  const handleComplete = (mission) => {
    setSelectedMission(mission)
    setShowUploadModal(true)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedFile(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    // Check if camera is available
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          // Create video element
          const video = document.createElement('video')
          video.srcObject = stream
          video.play()
          
          // Create canvas to capture frame
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          video.addEventListener('loadedmetadata', () => {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            ctx.drawImage(video, 0, 0)
            
            // Convert to blob and set as uploaded file
            canvas.toBlob((blob) => {
              const reader = new FileReader()
              reader.onloadend = () => {
                setUploadedFile(reader.result)
              }
              reader.readAsDataURL(blob)
              
              // Stop camera stream
              stream.getTracks().forEach(track => track.stop())
            })
          })
        })
        .catch((error) => {
          alert('Kamera istifadəsi üçün icazə lazımdır. Zəhmət olmasa icazə verin.')
        })
    } else {
      alert('Kamera dəstəklənmir. Zəhmət olmasa şəkil yükləyin.')
    }
  }

  const handleSubmitMission = async () => {
    if (!uploadedFile) {
      alert('Zəhmət olmasa şəkil və ya video yükləyin!')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      // Mark mission as completed
      setCompletedMissions(prev => {
        const updated = [...prev, selectedMission.id]
        localStorage.setItem('ekolist_completed_missions', JSON.stringify(updated))
        return updated
      })

      // Add points
      updatePoints(selectedMission.points)

      setIsSubmitting(false)
      setShowUploadModal(false)
      setUploadedFile(null)
      setSelectedMission(null)
      
      alert(`Təbriklər! "${selectedMission.title}" missiyası tamamlandı! +${selectedMission.points} xal qazandınız!`)
    }, 1500)
  }

  const isMissionCompleted = (missionId) => {
    return completedMissions.includes(missionId)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-light dark:text-text-dark">Eko-Missiyalar</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">Missiyaları tamamla və xal qazan!</p>
        </div>
        <Link to="/missions/team" className="btn-secondary">
          <UsersIcon className="w-5 h-5 mr-2" />
          Komanda Missiyaları
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-4">
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Ümumi Xal</p>
          <p className="text-2xl font-bold text-text-light dark:text-text-dark">1,250</p>
          <p className="text-sm text-green-500">+150 bu həftə</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Həftəlik İrəliləyiş</p>
          <p className="text-2xl font-bold text-text-light dark:text-text-dark">75%</p>
          <p className="text-sm text-green-500">+10% keçən həftəyə görə</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex p-1 bg-primary/20 rounded-lg">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-card-light dark:bg-card-dark shadow text-text-light dark:text-text-dark'
                : 'text-text-secondary-light dark:text-text-secondary-dark'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      {/* <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-primary/20 text-text-light dark:text-text-dark'
                : 'bg-card-light dark:bg-card-dark text-text-secondary-light hover:bg-primary/10'
            }`}
          >
            {filter}
          </button>
        ))}
      </div> */}

      {/* Missions Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredMissions.map((mission) => {
          const isCompleted = isMissionCompleted(mission.id) || mission.status === 'completed'
          return (
          <div 
            key={mission.id} 
            className={`card p-6 ${isCompleted ? 'opacity-60' : ''}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  mission.status === 'completed' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-primary/20'
                }`}>
                  <mission.icon className={`w-5 h-5 ${
                    mission.status === 'completed' ? 'text-gray-400' : 'text-primary'
                  }`} />
                </div>
                <h3 className="font-bold text-text-light dark:text-text-dark">{mission.title}</h3>
              </div>
              <span className={`font-bold ${
                mission.status === 'completed' ? 'text-gray-400' : 'text-yellow-500'
              }`}>
                +{mission.points} xal
              </span>
            </div>

            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
              {mission.description}
            </p>

            {mission.progress && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-text-secondary-light mb-1">
                  <span>İrəliləyiş</span>
                  <span>{mission.progress.current}/{mission.progress.total}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${(mission.progress.current / mission.progress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {isCompleted ? (
              <button disabled className="btn-secondary w-full opacity-50 cursor-not-allowed flex items-center justify-center gap-2">
                <CheckIcon className="w-4 h-4" />
                Tamamlandı
              </button>
            ) : mission.progress ? (
              <button 
                onClick={() => handleComplete(mission)}
                className="btn-primary w-full"
              >
                Bugünkü Fəaliyyəti Qeyd Et
              </button>
            ) : (
              <button 
                onClick={() => handleComplete(mission)}
                className="btn-primary w-full"
              >
                Missiyanı Tamamla
              </button>
            )}
          </div>
          )
        })}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Sübut Yüklə</h2>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-text-secondary-light hover:text-text-light"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
              "{selectedMission?.title}" missiyasını tamamlamaq üçün şəkil və ya video yükləyin.
            </p>

            <div className="border-2 border-dashed border-border-light dark:border-border-dark rounded-xl p-8 text-center mb-4">
              {uploadedFile ? (
                <div className="relative">
                  <img src={uploadedFile} alt="Uploaded" className="w-full h-48 object-cover rounded-lg mb-2" />
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <CameraIcon className="w-12 h-12 text-text-secondary-light mx-auto mb-2" />
                  <p className="font-semibold text-text-light dark:text-text-dark">Faylları bura sürükləyin</p>
                  <p className="text-xs text-text-secondary-light">və ya</p>
                  <label className="mt-2 text-primary font-medium cursor-pointer hover:underline">
                    Faylları seçin
                    <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileUpload} />
                  </label>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleCameraCapture}
                className="btn-secondary flex-1 flex items-center justify-center gap-2"
              >
                <CameraIcon className="w-5 h-5" />
                Kameranı İstifadə Et
              </button>
            </div>
            <div className="flex gap-3 mt-3">
              <button 
                onClick={() => {
                  setShowUploadModal(false)
                  setUploadedFile(null)
                  setSelectedMission(null)
                }}
                className="btn-secondary flex-1"
              >
                Ləğv et
              </button>
              <button 
                onClick={handleSubmitMission}
                disabled={!uploadedFile || isSubmitting}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Göndərilir...' : 'Göndər'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

