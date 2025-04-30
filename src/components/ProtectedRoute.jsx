// filepath: c:\Users\visha\OneDrive\Desktop\globetrotter\frontend\src\components\ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute() {
  const { user } = useAuth()

  // Allow access to the "/play" route without authentication
  const isPlayRoute = window.location.pathname === '/play'
  if (isPlayRoute) {
    return <Outlet />
  }

  // Redirect to login if not authenticated
  return user ? <Outlet /> : <Navigate to="/login" />
}