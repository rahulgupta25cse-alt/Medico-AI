import { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext(null)
const authBypassEnabled = import.meta.env.VITE_DISABLE_AUTH === 'true'
const demoEmail = import.meta.env.VITE_DEMO_EMAIL || 'demo.clinician@hospital.com'
const demoPassword = import.meta.env.VITE_DEMO_PASSWORD || 'SecurePass123!'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const currentUser = authService.getCurrentUser()

      if (currentUser) {
        setUser(currentUser)
        setLoading(false)
        return
      }

      if (authBypassEnabled) {
        try {
          const data = await authService.login(demoEmail, demoPassword)
          setUser({ userId: data.userId, email: data.email, role: data.role })
        } catch (error) {
          setUser({ userId: 'bypass-user', email: demoEmail, role: 'CLINICIAN' })
        } finally {
          setLoading(false)
        }
        return
      }

      setUser(null)
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (email, password) => {
    const data = await authService.login(email, password)
    setUser({ userId: data.userId, email: data.email, role: data.role })
    return data
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
