import { useState, useEffect } from 'react'
import { MapPinIcon, RecycleIcon, TreeIcon, BicycleIcon } from '../components/icons'

// Real locations in Baku with coordinates
const locations = [
  { 
    id: 1, 
    name: 'Şəhər Parkı', 
    type: 'park', 
    lat: 40.3777, 
    lng: 49.8500,
    icon: TreeIcon, 
    color: 'bg-green-500' 
  },
  { 
    id: 2, 
    name: 'Təkrar Emal Məntəqəsi', 
    type: 'recycle', 
    lat: 40.3950, 
    lng: 49.8600,
    icon: RecycleIcon, 
    color: 'bg-blue-500' 
  },
  { 
    id: 3, 
    name: 'Eko-Ferma', 
    type: 'farm', 
    lat: 40.3650, 
    lng: 49.8400,
    icon: TreeIcon, 
    color: 'bg-yellow-500' 
  },
  { 
    id: 4, 
    name: 'Velosiped Yolu', 
    type: 'bike', 
    lat: 40.3850, 
    lng: 49.8550,
    icon: BicycleIcon, 
    color: 'bg-purple-500' 
  },
]

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`
}

// Convert lat/lng to pixel position on map (approximate for Azerbaijan)
const latLngToPixel = (lat, lng, mapBounds) => {
  // Azerbaijan approximate bounds
  const minLat = 38.4
  const maxLat = 41.9
  const minLng = 44.8
  const maxLng = 50.4
  
  // Calculate percentage position
  const latPercent = ((lat - minLat) / (maxLat - minLat)) * 100
  const lngPercent = ((lng - minLng) / (maxLng - minLng)) * 100
  
  return {
    top: `${100 - latPercent}%`, // Invert because map coordinates
    left: `${lngPercent}%`
  }
}

const events = [
  { id: 1, name: 'Ağac Əkmə Günü', date: '28 Noyabr', location: 'Şəhər Parkı', participants: 45 },
  { id: 2, name: 'Sahil Təmizliyi', date: '2 Dekabr', location: 'Xəzər Sahili', participants: 120 },
  { id: 3, name: 'Eko-Workshop', date: '5 Dekabr', location: 'Yaşıl Mərkəz', participants: 30 },
]

const filters = [
  { id: 'all', label: 'Hamısı', icon: MapPinIcon },
  { id: 'park', label: 'Parklar', icon: TreeIcon },
  { id: 'recycle', label: 'Təkrar Emal', icon: RecycleIcon },
  { id: 'bike', label: 'Velosiped Yolları', icon: BicycleIcon },
]

export default function Map() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)
  const [locationsWithDistance, setLocationsWithDistance] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 40.4093, lng: 49.8671 }) // Baku default

  useEffect(() => {
    // Request GPS permission and get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(userLoc)
          setMapCenter(userLoc)
          
          // Calculate distances and update locations
          const locationsWithDist = locations.map(loc => ({
            ...loc,
            distance: calculateDistance(userLoc.lat, userLoc.lng, loc.lat, loc.lng),
            pixelPosition: latLngToPixel(loc.lat, loc.lng, {})
          }))
          setLocationsWithDistance(locationsWithDist)
        },
        (error) => {
          setLocationError('GPS icazəsi verilmədi')
          // Use default location (Baku)
          const defaultLoc = { lat: 40.4093, lng: 49.8671 }
          setUserLocation(defaultLoc)
          setMapCenter(defaultLoc)
          
          // Calculate distances with default location
          const locationsWithDist = locations.map(loc => ({
            ...loc,
            distance: calculateDistance(defaultLoc.lat, defaultLoc.lng, loc.lat, loc.lng),
            pixelPosition: latLngToPixel(loc.lat, loc.lng, {})
          }))
          setLocationsWithDistance(locationsWithDist)
        }
      )
    } else {
      setLocationError('GPS dəstəklənmir')
      const defaultLoc = { lat: 40.4093, lng: 49.8671 }
      setUserLocation(defaultLoc)
      setMapCenter(defaultLoc)
      
      // Calculate distances with default location
      const locationsWithDist = locations.map(loc => ({
        ...loc,
        distance: calculateDistance(defaultLoc.lat, defaultLoc.lng, loc.lat, loc.lng),
        pixelPosition: latLngToPixel(loc.lat, loc.lng, {})
      }))
      setLocationsWithDistance(locationsWithDist)
    }
  }, [])

  const filteredLocations = activeFilter === 'all' 
    ? locationsWithDistance 
    : locationsWithDistance.filter(l => l.type === activeFilter)
  
  // Sort by distance
  const sortedLocations = [...filteredLocations].sort((a, b) => {
    const distA = parseFloat(a.distance.replace(/[^0-9.]/g, '')) || 0
    const distB = parseFloat(b.distance.replace(/[^0-9.]/g, '')) || 0
    return distA - distB
  })

  const getDirections = (location) => {
    if (userLocation) {
      // Open Google Maps directions
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${location.lat},${location.lng}`
      window.open(url, '_blank')
    } else {
      alert('GPS məlumatı yoxdur. Zəhmət olmasa GPS icazəsi verin.')
    }
  }

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col lg:flex-row gap-6">
      {/* Map Area */}
      <div className="flex-1 card overflow-hidden relative bg-background-light dark:bg-background-dark">
        {/* Google Maps iframe - Using provided embed code */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d681958.2520936347!2d47.5769!3d40.1431!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403f6432c25a03bb%3A0xebb0972b0b704deb!2sAzerbaijan!5e0!3m2!1sen!2saz!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
          title="Azərbaycan Xəritəsi"
        />
        
        {/* Map Overlay for markers */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Gradient overlay for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-dark/20 dark:to-background-dark/30 pointer-events-none" />
        </div>
        
        {/* Map Markers - Dynamic positioning based on coordinates and filter */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {sortedLocations.length > 0 ? (
            sortedLocations.map((loc) => {
              const position = loc.pixelPosition || { top: '50%', left: '50%' }
              
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`absolute ${loc.color} p-2.5 rounded-full shadow-xl transform hover:scale-125 transition-all border-2 border-white dark:border-background-dark pointer-events-auto cursor-pointer z-30`}
                  style={position}
                  title={`${loc.name} - ${loc.distance}`}
                >
                  <loc.icon className="w-5 h-5 text-white" />
                  {/* Pulse animation */}
                  <div className={`absolute inset-0 ${loc.color} rounded-full animate-ping opacity-20`} />
                  {/* Distance badge */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium text-text-light dark:text-text-dark shadow border border-border-light dark:border-border-dark">
                    {loc.distance}
                  </div>
                </button>
              )
            })
          ) : (
            // No locations message when filter returns empty
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <div className="bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg border border-border-light dark:border-border-dark text-center">
                <p className="text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Bu filtrə uyğun yer tapılmadı
                </p>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="btn-primary text-sm px-4 py-2 pointer-events-auto"
                >
                  Bütün Yerləri Göstər
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Current Location - Dynamic based on GPS */}
        {userLocation && (() => {
          const userPosition = latLngToPixel(userLocation.lat, userLocation.lng, {})
          return (
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              style={userPosition}
            >
              <div className="relative">
                <div className="w-5 h-5 bg-primary rounded-full ring-4 ring-primary/40 animate-pulse shadow-lg" />
                <div className="absolute inset-0 w-5 h-5 bg-primary rounded-full animate-ping opacity-30" />
              </div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-text-light dark:text-text-dark shadow-lg border border-border-light dark:border-border-dark">
                Sizin Yeriniz
              </div>
            </div>
          )
        })()}
        
        {/* Map Title */}
        <div className="absolute top-4 left-4 z-30 pointer-events-none">
          <div className="bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-border-light dark:border-border-dark">
            <h3 className="text-sm font-bold text-text-light dark:text-text-dark">Azərbaycan Xəritəsi</h3>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Eko-yerlər və tədbirlər</p>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-2">
          <button 
            onClick={() => {
              // Refresh location
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const userLoc = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    }
                    setUserLocation(userLoc)
                    setMapCenter(userLoc)
                    
                    const locationsWithDist = locations.map(loc => ({
                      ...loc,
                      distance: calculateDistance(userLoc.lat, userLoc.lng, loc.lat, loc.lng),
                      pixelPosition: latLngToPixel(loc.lat, loc.lng, {})
                    }))
                    setLocationsWithDistance(locationsWithDist)
                  },
                  (error) => {
                    alert('GPS icazəsi verilmədi')
                  }
                )
              }
            }}
            className="w-10 h-10 bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center hover:bg-primary/20 transition-colors border border-border-light dark:border-border-dark"
            title="Konumunu yenilə"
          >
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button 
            onClick={() => {
              // Open Google Maps in new tab with current location
              if (userLocation) {
                window.open(`https://www.google.com/maps/@${userLocation.lat},${userLocation.lng},12z`, '_blank')
              } else {
                window.open('https://www.google.com/maps/place/Azerbaijan', '_blank')
              }
            }}
            className="w-10 h-10 bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center hover:bg-primary/20 transition-colors border border-border-light dark:border-border-dark"
            title="Google Maps-də aç"
          >
            <MapPinIcon className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Selected Location Popup */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-16 z-30 bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-border-light dark:border-border-dark">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`${selectedLocation.color} p-2 rounded-lg`}>
                  <selectedLocation.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-text-light dark:text-text-dark">{selectedLocation.name}</p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{selectedLocation.distance} uzaqlıqda</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLocation(null)}
                className="text-text-secondary-light hover:text-text-light transition-colors p-1"
                title="Bağla"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => getDirections(selectedLocation)}
                className="btn-primary flex-1 text-sm flex items-center justify-center gap-1"
              >
                <MapPinIcon className="w-4 h-4" />
                Yol Göstər
              </button>
              <button
                onClick={() => {
                  // Open location on Google Maps with coordinates
                  window.open(`https://www.google.com/maps/search/?api=1&query=${selectedLocation.lat},${selectedLocation.lng}`, '_blank')
                }}
                className="btn-secondary flex-1 text-sm"
              >
                Xəritədə Axtar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 space-y-6">
        {/* Filters */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-text-light dark:text-text-dark">Filtr</h3>
            {activeFilter !== 'all' && (
              <button
                onClick={() => setActiveFilter('all')}
                className="text-xs text-primary hover:underline"
              >
                Təmizlə
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {filters.map((filter) => {
              const count = filter.id === 'all' 
                ? locationsWithDistance.length 
                : locationsWithDistance.filter(l => l.type === filter.id).length
              
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center justify-between gap-2 p-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter.id
                      ? 'bg-primary text-text-light shadow-md scale-105'
                      : 'bg-background-light dark:bg-background-dark text-text-secondary-light hover:bg-primary/10 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <filter.icon className="w-4 h-4" />
                    <span>{filter.label}</span>
                  </div>
                  {count > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      activeFilter === filter.id
                        ? 'bg-text-light/20 text-text-light'
                        : 'bg-primary/20 text-primary'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Nearby Locations - Sorted by distance and filtered */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-text-light dark:text-text-dark">Yaxınlıqdakı Yerlər</h3>
            {activeFilter !== 'all' && (
              <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                {sortedLocations.length} tapıldı
              </span>
            )}
          </div>
          {userLocation ? (
            sortedLocations.length > 0 ? (
              <div className="space-y-2">
                {sortedLocations.map((loc, index) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left border border-transparent hover:border-primary/20"
                  >
                    <div className={`${loc.color} p-2 rounded-lg shrink-0`}>
                      <loc.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-light dark:text-text-dark text-sm truncate">{loc.name}</p>
                      <p className="text-xs text-text-secondary-light">{loc.distance} uzaqlıqda</p>
                    </div>
                    <div className="text-xs text-primary font-medium shrink-0">
                      #{index + 1}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">
                  Bu filtrə uyğun yer tapılmadı
                </p>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Bütün Yerləri Göstər
                </button>
              </div>
            )
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">
                Konum məlumatı yoxdur
              </p>
              <button
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        const userLoc = {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude,
                        }
                        setUserLocation(userLoc)
                        setMapCenter(userLoc)
                      },
                      () => alert('GPS icazəsi verilmədi')
                    )
                  }
                }}
                className="btn-primary text-sm px-4 py-2"
              >
                Konum İcazəsi Ver
              </button>
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="card p-4">
          <h3 className="font-bold text-text-light dark:text-text-dark mb-3">Yaxınlaşan Tədbirlər</h3>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="p-3 bg-background-light dark:bg-background-dark rounded-lg">
                <p className="font-medium text-text-light dark:text-text-dark text-sm">{event.name}</p>
                <p className="text-xs text-text-secondary-light">{event.date} • {event.location}</p>
                <p className="text-xs text-primary mt-1">{event.participants} iştirakçı</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
