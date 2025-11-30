import { NavLink } from 'react-router-dom'
import { HomeIcon, BookIcon, TargetIcon, PlantIcon, TrophyIcon } from './icons'

const navItems = [
  { path: '/home', icon: HomeIcon, label: 'Ana Səhifə' },
  { path: '/diary', icon: BookIcon, label: 'Gündəlik' },
  { path: '/missions', icon: TargetIcon, label: 'Missiya' },
  { path: '/eco-pet', icon: PlantIcon, label: 'Eko-Pet' },
  { path: '/leaderboard', icon: TrophyIcon, label: 'Sıralama' },
]

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-lg border-t border-border-light dark:border-border-dark safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200
              ${isActive 
                ? 'text-primary bg-primary/10' 
                : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary hover:bg-primary/5'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

