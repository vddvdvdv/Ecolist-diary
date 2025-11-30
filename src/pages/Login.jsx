import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GoogleIcon, HomeIcon } from '../components/icons'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      await login(email, password)
      navigate('/home')
    } catch (err) {
      setError('Email və ya şifrə yanlışdır')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Home Button */}
      <div className="flex justify-end mb-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 dark:bg-primary/30 text-primary hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors"
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Ana Səhifə</span>
        </Link>
      </div>

      <h1 className="text-3xl font-black text-text-light dark:text-text-dark mb-2">
        Xoş gəldin!
      </h1>
      <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
        Hesabına daxil ol və eko-səyahətinə davam et.
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
            Şifrə
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light hover:text-text-light transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 rounded border-border-light text-primary focus:ring-primary" />
            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Məni yadda saxla</span>
          </label>
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">
            Şifrəni unutdun?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-3 text-base disabled:opacity-50"
        >
          {isLoading ? 'Daxil olunur...' : 'Daxil ol'}
        </button>
      </form>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">və ya</span>
        <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
      </div>

      <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg font-medium text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark transition-colors">
        <GoogleIcon className="w-5 h-5" />
        Google ilə davam et
      </button>

      <p className="mt-6 text-center text-text-secondary-light dark:text-text-secondary-dark">
        Hesabın yoxdur?{' '}
        <Link to="/register" className="text-primary font-semibold hover:underline">
          Qeydiyyatdan keç
        </Link>
      </p>
    </div>
  )
}

