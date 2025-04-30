import { Link, NavLink } from 'react-router-dom'
import { FaGlobeAmericas, FaUser } from 'react-icons/fa'

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <FaGlobeAmericas className="text-primary-400" />
          <span>Globetrotter</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <NavLink 
            to="/play" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md ${isActive ? 'bg-primary-500' : 'hover:bg-gray-700'}`
            }
          >
            Play
          </NavLink>
          
          {user ? (
            <div className="flex items-center gap-4">
              <NavLink 
                to="/profile"
                className="flex items-center gap-2 hover:text-primary-300"
              >
                <FaUser /> {user.username}
              </NavLink>
              <button 
                onClick={onLogout}
                className="px-3 py-1 text-sm bg-red-500/20 hover:bg-red-500/30 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink 
                to="/login" 
                className="px-3 py-1 text-sm hover:bg-gray-700 rounded-md"
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className="px-3 py-1 text-sm bg-primary-500 hover:bg-primary-600 rounded-md"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}