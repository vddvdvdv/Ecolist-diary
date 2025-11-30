import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GoogleIcon, MapPinIcon, HomeIcon, CheckIcon } from '../components/icons'
import { showSuccess, showError } from '../utils/toast'

const schools = [
  { id: '1', name: 'Greenwood Academy' },
  { id: '2', name: 'Oak Valley University' },
  { id: '3', name: 'Pine Ridge Academy' },
  { id: '4', name: 'Maple Leaf School' },
  { id: '5', name: 'Riverdale High' },
]

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    school: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showGpsModal, setShowGpsModal] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowGpsModal(true)
  }

  const handleGpsPermission = async (allowed) => {
    setShowGpsModal(false)
    setIsLoading(true)
    
    try {
      if (allowed) {
        // Request GPS permission
        navigator.geolocation?.getCurrentPosition(
          () => {
            console.log('GPS allowed')
            showSuccess('GPS icazəsi verildi!')
          },
          () => {
            console.log('GPS denied')
            showError('GPS icazəsi verilmədi')
          }
        )
      }
      
      await register(formData)
      showSuccess('Qeydiyyat uğurla tamamlandı!')
      navigate('/home')
    } catch (err) {
      setError('Qeydiyyat zamanı xəta baş verdi')
      showError('Qeydiyyat zamanı xəta baş verdi')
    } finally {
      setIsLoading(false)
    }
  }

  const validatePassword = (password) => {
    const minLength = password.length >= 8
    const hasNumber = /\d/.test(password)
    const hasLetter = /[a-zA-Z]/.test(password)
    return { minLength, hasNumber, hasLetter, isValid: minLength && hasNumber && hasLetter }
  }

  const passwordValidation = formData.password ? validatePassword(formData.password) : null

  return (
    <div className="w-full">
      {/* Home Button */}
      <div className="flex justify-end mb-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors text-sm"
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Ana Səhifə</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-text-light dark:text-text-dark mb-2">
          Hesab Yarat
        </h1>
        <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
          Eko-hərəkatına qoşul və planetimizi birlikdə dəyişdirək 🌱
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
            Ad Soyad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ad və soyadınızı daxil edin"
            className="input-field w-full py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="input-field w-full py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
            Şifrə <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 simvol, rəqəm və hərf"
              className={`input-field w-full pr-12 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50 ${
                passwordValidation && !passwordValidation.isValid ? 'border-red-500/50' : ''
              }`}
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light hover:text-primary transition-colors p-1"
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
          
          {/* Password Validation */}
          {passwordValidation && (
            <div className="mt-2 space-y-1">
              <div className={`flex items-center gap-2 text-xs ${
                passwordValidation.minLength ? 'text-green-500' : 'text-text-secondary-light'
              }`}>
                {passwordValidation.minLength ? (
                  <CheckIcon className="w-3.5 h-3.5" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-text-secondary-light" />
                )}
                Minimum 8 simvol
              </div>
              <div className={`flex items-center gap-2 text-xs ${
                passwordValidation.hasNumber ? 'text-green-500' : 'text-text-secondary-light'
              }`}>
                {passwordValidation.hasNumber ? (
                  <CheckIcon className="w-3.5 h-3.5" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-text-secondary-light" />
                )}
                Ən azı bir rəqəm
              </div>
              <div className={`flex items-center gap-2 text-xs ${
                passwordValidation.hasLetter ? 'text-green-500' : 'text-text-secondary-light'
              }`}>
                {passwordValidation.hasLetter ? (
                  <CheckIcon className="w-3.5 h-3.5" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-text-secondary-light" />
                )}
                Ən azı bir hərf
              </div>
            </div>
          )}
        </div>

        {/* School Field */}
        <div>
          <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
            Məktəb <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="input-field w-full py-2.5 text-sm appearance-none bg-no-repeat bg-right pr-10 transition-all focus:ring-2 focus:ring-primary/50"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234c9a66'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundPosition: 'right 12px center',
                backgroundSize: '20px',
              }}
              required
            >
              <option value="">Məktəbinizi seçin</option>
              {schools.map(school => (
                <option key={school.id} value={school.id}>{school.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20">
          <input 
            type="checkbox" 
            id="terms"
            className="mt-1 w-4 h-4 rounded border-border-light text-primary focus:ring-primary cursor-pointer flex-shrink-0" 
            required
          />
          <label htmlFor="terms" className="text-xs text-text-secondary-light dark:text-text-secondary-dark cursor-pointer leading-relaxed">
            <Link to="/terms" className="text-primary hover:underline font-semibold">Xidmət Şərtləri</Link> və{' '}
            <Link to="/privacy" className="text-primary hover:underline font-semibold">Gizlilik Siyasəti</Link>ni oxudum və qəbul edirəm.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || (passwordValidation && !passwordValidation.isValid)}
          className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Qeydiyyat...
            </span>
          ) : (
            'Hesab Yarat'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-5">
        <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">və ya</span>
        <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
      </div>

      {/* Google Sign In */}
      <button 
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg text-sm font-semibold text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark hover:border-primary/30 transition-all"
      >
        <GoogleIcon className="w-5 h-5" />
        Google ilə davam et
      </button>

      {/* Login Link */}
      <p className="mt-5 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
        Artıq hesabın var?{' '}
        <Link to="/login" className="text-primary font-bold hover:underline transition-colors">
          Daxil ol
        </Link>
      </p>

      {/* GPS Permission Modal */}
      {showGpsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 fade-in">
          <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-2xl w-full max-w-md p-8 text-center scale-in">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-eco-leaf/20 mx-auto mb-6 animate-pulse-slow">
              <MapPinIcon className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-black text-text-light dark:text-text-dark mb-3">
              Yaxınlıqdakı Yaşıl Məkanları Tap 🌳
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 leading-relaxed">
              Ekolist Diary-ə yaxınlıqdakı parkları, təkrar emal məntəqələrini və eko-tədbirləri göstərmək üçün konumunuza daxil olmağa icazə verin.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleGpsPermission(true)}
                className="btn-primary w-full py-3.5 text-base font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                İcazə Ver
              </button>
              <button
                onClick={() => handleGpsPermission(false)}
                className="w-full py-3.5 text-text-secondary-light dark:text-text-secondary-dark font-semibold hover:bg-background-light dark:hover:bg-background-dark rounded-xl transition-colors"
              >
                İndi yox
              </button>
            </div>
            <p className="mt-4 text-xs text-text-secondary-light dark:text-text-secondary-dark">
              Bu icazəni istənilən vaxt tənzimləmələrdən dəyişə bilərsiniz.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

