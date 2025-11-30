import { LeafIcon } from './icons'

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className={`animate-spin ${sizes[size]} ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background-light dark:bg-background-dark flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <LeafIcon className="w-16 h-16 text-primary animate-bounce" />
          <div className="absolute inset-0 w-16 h-16 bg-primary/20 rounded-full animate-ping" />
        </div>
        <p className="mt-4 text-text-secondary-light dark:text-text-secondary-dark animate-pulse">
          Yüklənir...
        </p>
      </div>
    </div>
  )
}

export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <LoadingSpinner size="lg" className="text-primary mx-auto" />
        <p className="mt-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
          Məlumatlar yüklənir...
        </p>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-border-light dark:bg-border-dark rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-border-light dark:bg-border-dark rounded w-3/4" />
          <div className="h-3 bg-border-light dark:bg-border-dark rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-border-light dark:bg-border-dark rounded" />
        <div className="h-3 bg-border-light dark:bg-border-dark rounded w-5/6" />
      </div>
    </div>
  )
}

