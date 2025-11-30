import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { PlantIcon, WaterDropIcon, SunIcon, RecycleIcon, StarIcon, LockIcon, CoinIcon, SparklesIcon } from '../components/icons'

const petTypes = [
  { level: 1, name: 'Fidan', type: 'Lv1 Fidan', unlocked: true, image: '🌱' },
  { level: 5, name: 'Çiçək Pet', type: 'Lv5 Çiçək Pet', unlocked: true, image: '🌿' },
  { level: 10, name: 'Qızıl Gül Rare', type: 'Lv10 Qızıl Gül Rare', unlocked: false, image: '🌹', cost: 500 },
  { level: 20, name: 'Mistik Sarmaşıq', type: 'Lv20 Mistik Sarmaşıq', unlocked: false, image: '🌿', cost: 2000 },
]

const marketplaceItems = [
  { id: 1, name: 'Baş Geyimi', category: 'accessory', price: 50, image: '🎩' },
  { id: 2, name: 'Çiçək Tacı', category: 'accessory', price: 75, image: '👑' },
  { id: 3, name: 'Glowing Effekt', category: 'effect', price: 100, image: '✨' },
  { id: 4, name: 'Yarpaq Ornamentləri', category: 'decoration', price: 60, image: '🍃' },
  { id: 5, name: 'Habitat Dekoru', category: 'decoration', price: 150, image: '🏡' },
  { id: 6, name: 'Çiçək Qabı', category: 'decoration', price: 80, image: '🪴' },
  { id: 7, name: 'Mini Ev', category: 'decoration', price: 200, image: '🏠' },
]

const actions = [
  { icon: WaterDropIcon, label: 'Sula', color: 'text-blue-500', cost: 10, moodBoost: 5 },
  { icon: SunIcon, label: 'Enerji ver', color: 'text-yellow-500', cost: 15, moodBoost: 7 },
  { icon: RecycleIcon, label: 'Təmizlə', color: 'text-green-500', cost: 5, moodBoost: 3 },
]


export default function EcoPet() {
  const { user, updatePoints } = useAuth()
  const [activeTab, setActiveTab] = useState('pet')
  const [pet, setPet] = useState(() => {
    const saved = localStorage.getItem('ekolist_pet')
    return saved ? JSON.parse(saved) : {
      name: 'Sprouty',
      type: 'Çiçəklənən Fern',
      growth: 85,
      happiness: 92,
      energy: 70,
      level: 5,
      xp: 85,
      mood: 'happy',
    }
  })
  const [actionFeedback, setActionFeedback] = useState(null)
  const [inventory, setInventory] = useState(() => {
    return JSON.parse(localStorage.getItem('ekolist_pet_inventory') || '[]')
  })
  const [unlockedPets, setUnlockedPets] = useState(() => {
    return JSON.parse(localStorage.getItem('ekolist_unlocked_pets') || '[1,5]')
  })

  // Save pet state
  const savePet = (newPet) => {
    setPet(newPet)
    localStorage.setItem('ekolist_pet', JSON.stringify(newPet))
  }

  const handleAction = (action) => {
    if ((user?.points || 0) < action.cost) {
      alert(`Kifayət qədər coin yoxdur! Lazım: ${action.cost} coin`)
      return
    }

    updatePoints(-action.cost)
    
    const newPet = {
      ...pet,
      happiness: Math.min(100, pet.happiness + action.moodBoost),
      energy: Math.min(100, pet.energy + 3),
      xp: Math.min(100, pet.xp + 2),
    }

    // Check level up
    if (newPet.xp >= 100 && newPet.level < 20) {
      newPet.level += 1
      newPet.xp = 0
      alert(`Təbriklər! Pet Level ${newPet.level} oldu!`)
    }

    savePet(newPet)
    setActionFeedback(action.label)
    setTimeout(() => setActionFeedback(null), 2000)
  }

  const handleBuyItem = (item) => {
    if (item.owned) {
      alert('Bu aksesuar artıq inventarınızdadır!')
      return
    }

    if ((user?.points || 0) < item.price) {
      alert(`Kifayət qədər coin yoxdur! Lazım: ${item.price} coin`)
      return
    }

    if (confirm(`${item.name} alınsın? ${item.price} coin xərclənəcək.`)) {
      updatePoints(-item.price)
      setInventory(prev => {
        const updated = [...prev, item.id]
        localStorage.setItem('ekolist_pet_inventory', JSON.stringify(updated))
        return updated
      })
      alert(`${item.name} alındı! Inventarınıza əlavə olundu.`)
    }
  }

  const handleUnlockPet = (petType) => {
    if (unlockedPets.includes(petType.level)) {
      alert('Bu pet artıq açılıbdır!')
      return
    }

    if (pet.level < petType.level) {
      alert(`Bu pet-i açmaq üçün Level ${petType.level} lazımdır!`)
      return
    }

    if ((user?.points || 0) < petType.cost) {
      alert(`Kifayət qədər coin yoxdur! Lazım: ${petType.cost} coin`)
      return
    }

    if (confirm(`${petType.name} açılsın? ${petType.cost} coin xərclənəcək.`)) {
      updatePoints(-petType.cost)
      setUnlockedPets(prev => {
        const updated = [...prev, petType.level]
        localStorage.setItem('ekolist_unlocked_pets', JSON.stringify(updated))
        return updated
      })
      alert(`Təbriklər! ${petType.name} açıldı!`)
    }
  }

  const currentPetType = petTypes.find(p => p.level === pet.level) || petTypes[0]

  return (
    <div className="max-w-6xl mx-auto space-y-6 page-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-light dark:text-text-dark">{pet.name}</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">{currentPetType.type}</p>
        </div>
        <div className="flex items-center gap-4 bg-card-light dark:bg-card-dark p-3 rounded-xl border border-border-light dark:border-border-dark">
          <CoinIcon className="w-6 h-6 text-yellow-accent" />
          <div>
            <p className="font-bold text-lg text-text-light dark:text-text-dark">{user?.points?.toLocaleString() || '2,450'}</p>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Eko Coin</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border-light dark:border-border-dark">
        <button
          onClick={() => setActiveTab('pet')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'pet'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary'
          }`}
        >
          Pet
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'marketplace'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary'
          }`}
        >
          Marketplace
        </button>
        <button
          onClick={() => setActiveTab('unlock')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'unlock'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary'
          }`}
        >
          Pet Unlock
        </button>
      </div>

      {activeTab === 'pet' && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pet Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pet Card */}
            <div className="card p-8 flex items-center justify-center aspect-video bg-gradient-to-br from-primary/20 to-eco-leaf/20 relative overflow-hidden">
              {/* Action Feedback */}
              {actionFeedback && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-primary text-text-light rounded-full font-bold text-sm animate-bounce z-10">
                  ✨ {actionFeedback}!
                </div>
              )}
              
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full animate-pulse" />
                  <div className={`absolute inset-4 bg-primary/50 rounded-full animate-float flex items-center justify-center transition-transform ${actionFeedback ? 'scale-110' : ''}`}>
                    <span className="text-6xl">{currentPetType.image}</span>
                  </div>
                  {/* Sparkles when action is performed */}
                  {actionFeedback && (
                    <>
                      <div className="absolute top-0 right-0 text-2xl animate-ping">✨</div>
                      <div className="absolute bottom-0 left-0 text-2xl animate-ping delay-100">💚</div>
                      <div className="absolute top-1/2 right-0 text-xl animate-ping delay-200">🌟</div>
                    </>
                  )}
                </div>
                <p className="text-lg font-bold text-text-light dark:text-text-dark">Level {pet.level}</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  Səviyyə {pet.level + 1}-yə {100 - pet.xp}% qaldı
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-4 gap-4">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAction(action)}
                  disabled={user?.points < action.cost}
                  className="card p-4 flex flex-col items-center justify-center gap-2 hover:border-primary transition-all hover:shadow-eco hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <action.icon className={`w-8 h-8 ${action.color} transition-transform group-hover:scale-110`} />
                  <span className="text-sm font-medium text-text-light dark:text-text-dark">{action.label}</span>
                  <span className="text-xs text-text-secondary-light">{action.cost} coin</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stats & Activity */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="card p-4 space-y-4">
              <h3 className="font-bold text-text-light dark:text-text-dark">Vəziyyət</h3>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">Böyümə / XP</span>
                  <span className="font-bold text-text-light dark:text-text-dark">{pet.xp}/100</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${pet.xp}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">Xoşbəxtlik</span>
                  <span className="font-bold text-text-light dark:text-text-dark">{pet.happiness}/100</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill bg-yellow-accent" style={{ width: `${pet.happiness}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">Enerji</span>
                  <span className="font-bold text-text-light dark:text-text-dark">{pet.energy}/100</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill bg-blue-secondary" style={{ width: `${pet.energy}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">Mood</span>
                  <span className="font-bold text-text-light dark:text-text-dark capitalize">{pet.mood}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-bar-fill ${
                      pet.happiness > 80 ? 'bg-green-500' : 
                      pet.happiness > 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${pet.happiness}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="card p-4 bg-primary/10 border-primary/20">
              <h3 className="font-bold text-text-light dark:text-text-dark mb-2">💡 İpucu</h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Daha çox eko-fəaliyyət qeyd et, petini böyüt və yeni xüsusiyyətlər aç!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Pet Marketplace</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {marketplaceItems.map((item) => {
              const owned = inventory.includes(item.id)
              return (
              <div key={item.id} className="card overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-eco-leaf/20 flex items-center justify-center text-6xl">
                  {item.image}
                </div>
                <div className="p-4">
                  <p className="font-bold text-text-light dark:text-text-dark mb-1">{item.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      {item.price} coin
                    </span>
                    {owned ? (
                      <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">Sahibsiniz</span>
                    ) : (
                      <button
                        onClick={() => handleBuyItem(item)}
                        disabled={(user?.points || 0) < item.price}
                        className="text-sm font-bold text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Al
                      </button>
                    )}
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'unlock' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Pet Level Unlock</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {petTypes.map((petType) => {
              const isUnlocked = unlockedPets.includes(petType.level)
              return (
              <div
                key={petType.level}
                className={`card p-6 ${isUnlocked ? 'border-primary/30' : 'opacity-60'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{petType.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-text-light dark:text-text-dark">{petType.name}</h3>
                      {isUnlocked ? (
                        <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">Açıldı</span>
                      ) : (
                        <LockIcon className="w-4 h-4 text-text-secondary-light" />
                      )}
                    </div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">
                      Level {petType.level} üçün tələb olunur
                    </p>
                    {!isUnlocked && petType.cost && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                          {petType.cost} coin
                        </span>
                        <button
                          onClick={() => handleUnlockPet(petType)}
                          disabled={(user?.points || 0) < petType.cost || pet.level < petType.level}
                          className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Aç
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
