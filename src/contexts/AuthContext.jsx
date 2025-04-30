import { createContext, useContext, useEffect, useState } from 'react'
import api from "../services/api"; // ✅ correct path

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  async function register(email, password, username) {
    const { data } = await api.post('/api/auth/register', {
      email,
      password,
      username,
    })
    setCurrentUser(data.user)
    localStorage.setItem('token', data.token)
  }

  async function login(email, password) {
    const { data } = await api.post('/api/auth/login', { email, password })
    setCurrentUser(data.user)
    localStorage.setItem('token', data.token)
  }

  function logout() {
    setCurrentUser(null)
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.get('/api/auth/me').then((res) => setCurrentUser(res.data.user))
    }
  }, [])

  const value = {
    currentUser,
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
