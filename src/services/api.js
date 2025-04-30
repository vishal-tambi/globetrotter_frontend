import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      console.error('API Error:', error.response.data)
      return Promise.reject(error.response.data)
    }
    console.error('API Error:', error.message)
    return Promise.reject(error)
  }
)

// =======================
// Auth Endpoints
// =======================
export const registerUser = (data) => api.post('/api/auth/register', data)
export const loginUser = (data) => api.post('/api/auth/login', data)
export const getCurrentUser = () => api.get('/api/auth/me')
export const getAdminToken = (data) => api.post('/api/auth/admin', data)

// =======================
// Game Endpoints
// =======================
export const getRandomDestination = () => api.get('/api/destinations/random')
export const submitAnswer = (data) => api.post('/api/game/answer', data)
export const createChallenge = (data) => api.post('/api/game/challenge', data)
export const getChallenge = (id) => api.get(`/api/game/challenge/${id}`)
export const submitChallengeAnswer = (challengeId, data) =>
  api.post(`/api/game/challenge/${challengeId}/answer`, data)

// =======================
// User Profile Endpoint (if applicable)
// =======================
export const getUserProfile = (username) => api.get(`/api/users/${username}`)

export default api
