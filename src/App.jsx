import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameProvider } from './contexts/GameContext'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import ChallengePage from './pages/ChallengePage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GameProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/play" element={<GamePage />} />
              <Route path="/challenge/:id" element={<ChallengePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App