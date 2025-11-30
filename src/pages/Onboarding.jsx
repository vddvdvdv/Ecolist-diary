import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon, BookIcon, TargetIcon, TrophyIcon } from '../components/icons'

const slides = [
  {
    icon: BookIcon,
    title: 'Gündəlik Yaz',
    description: 'Gündəlik eko-fəaliyyətlərini qeyd et və müsbət təsirini izlə.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop'
  },
  {
    icon: TargetIcon,
    title: 'Missiya Et',
    description: 'Əyləncəli və çağırışlı missiyalarla ətraf mühitə kömək et və yeni vərdişlər qazan.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop'
  },
  {
    icon: TrophyIcon,
    title: 'Xal Topla',
    description: 'Fəaliyyətlərin üçün xal qazan, badge əldə et və leaderboard-da yüksəl.',
    image: 'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=400&h=400&fit=crop'
  }
]

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          {/* Slides */}
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 rounded-full hover:bg-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeftIcon className="w-8 h-8 text-text-light dark:text-text-dark" />
            </button>
            
            <div className="flex-1 flex gap-8 overflow-hidden">
              {slides.map((slide, index) => (
                <div 
                  key={index}
                  className={`flex-shrink-0 w-full flex flex-col items-center text-center transition-all duration-500 ${
                    index === currentSlide ? 'opacity-100 scale-100' : 'opacity-30 scale-95'
                  }`}
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  <div className="w-64 h-64 rounded-2xl overflow-hidden mb-6 shadow-lg">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-4">
                    <slide.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-sm">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="p-2 rounded-full hover:bg-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRightIcon className="w-8 h-8 text-text-light dark:text-text-dark" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide ? 'bg-primary w-8' : 'bg-primary/30'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center gap-3 mt-12 max-w-sm mx-auto">
            <Link to="/home" className="btn-primary w-full py-3 text-base">
              Başla
            </Link>
            <Link to="/register" className="btn-secondary w-full py-3 text-base">
              Qeydiyyat
            </Link>
            <Link to="/login" className="w-full py-3 text-base text-center font-bold text-text-light dark:text-text-dark hover:text-primary transition-colors">
              Daxil ol
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

