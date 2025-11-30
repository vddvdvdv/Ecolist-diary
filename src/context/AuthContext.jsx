import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// Mock user data
const mockUser = {
  id: '1',
  name: 'Alex Green',
  email: 'alex.green@email.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  school: 'Greenwood Academy',
  level: 12,
  points: 12450,
  streak: 7,
  badges: ['water-hero', 'tree-friend', 'loyal-ecolist'],
  ecoPet: {
    name: 'Sprouty',
    type: 'plant',
    health: 85,
    happiness: 92,
    energy: 70,
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for logged in user
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('ekolist_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem('ekolist_user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      // If email matches, use saved user, otherwise use mock
      if (userData.email === email) {
        setUser(userData)
        return userData
      }
    }
    // Mock login - use saved user or create new with email
    const userToLogin = savedUser ? JSON.parse(savedUser) : { 
      ...mockUser, 
      email,
      name: mockUser.name || 'User'
    }
    setUser(userToLogin)
    localStorage.setItem('ekolist_user', JSON.stringify(userToLogin))
    return userToLogin
  }

  const register = async (data) => {
    // Create new user with provided data
    const newUser = {
      id: Date.now().toString(),
      name: data.name || 'User',
      email: data.email || '',
      avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name || 'User')}`,
      school: data.school || '',
      level: 1,
      points: 0,
      streak: 0,
      badges: [],
      ecoPet: {
        name: 'Sprouty',
        type: 'plant',
        health: 50,
        happiness: 50,
        energy: 50,
      }
    }
    setUser(newUser)
    localStorage.setItem('ekolist_user', JSON.stringify(newUser))
    return newUser
  }

  const updateUser = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData }
      setUser(updatedUser)
      localStorage.setItem('ekolist_user', JSON.stringify(updatedUser))
      return updatedUser
    }
  }


  
  const logout = () => {
    setUser(null)
    localStorage.removeItem('ekolist_user')
  }

  const updatePoints = (points) => {
    if (user) {
      const updatedUser = { ...user, points: user.points + points }
      setUser(updatedUser)
      localStorage.setItem('ekolist_user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      updatePoints,
      updateUser,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

