import { Outlet, Link } from 'react-router-dom'
import { LeafIcon } from '../components/icons'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-eco-forest relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-eco-forest to-background-dark opacity-90" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-eco-leaf/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-10 text-white">
          <LeafIcon className="w-20 h-20 text-primary mb-5 animate-float" />
          
          <h1 className="text-3xl font-black text-center mb-3">
            Eko Hərəkatına Qoşul
          </h1>
          
          <p className="text-base text-eco-leaf text-center max-w-md mb-8">
            Gündəlik eko-fəaliyyətlərini qeyd et, xal qazan və planetimizi birlikdə dəyişdirək.
          </p>
          
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">10K+</p>
              <p className="text-xs text-eco-leaf">İstifadəçi</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">50K+</p>
              <p className="text-xs text-eco-leaf">Missiya</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">1M+</p>
              <p className="text-xs text-eco-leaf">Eko-Əməl</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
            <LeafIcon className="w-10 h-10 text-primary" />
            <span className="text-2xl font-bold text-text-light dark:text-text-dark">Ekolist Diary</span>
          </div>
          
          <Outlet />
          
          {/* Footer Links */}
          <div className="mt-6 text-center text-xs text-text-secondary-light dark:text-text-secondary-dark">
            <p>Davam edərək, <Link to="/terms" className="text-primary hover:underline">Xidmət Şərtləri</Link> və <Link to="/privacy" className="text-primary hover:underline">Gizlilik Siyasəti</Link>ni qəbul edirsiniz.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

