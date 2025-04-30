import { useEffect, useState } from 'react'
import { useGame } from '../contexts/GameContext'
import { getUserProfile } from '../services/api'
import { FaTrophy, FaChartLine, FaHistory, FaGlobeAmericas } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function ProfilePage({ user }) {
  const { state } = useGame()
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await getUserProfile(user.username)
        setProfile(data)
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [user.username])

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-8 items-start mb-12"
      >
        <div className="w-32 h-32 rounded-full bg-primary-500/20 flex items-center justify-center">
          <FaGlobeAmericas className="text-5xl text-primary-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
          <p className="text-gray-400 mb-4">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
          <div className="flex gap-4">
            <div className="bg-white/5 px-4 py-2 rounded-lg">
              <span className="text-gray-400 text-sm">Correct</span>
              <p className="text-2xl font-bold text-green-500">{profile?.score.correct || 0}</p>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-lg">
              <span className="text-gray-400 text-sm">Incorrect</span>
              <p className="text-2xl font-bold text-red-500">{profile?.score.incorrect || 0}</p>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-lg">
              <span className="text-gray-400 text-sm">Streak</span>
              <p className="text-2xl font-bold text-yellow-500">{profile?.score.streak || 0}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaTrophy className="text-primary-400 text-xl" />
            <h2 className="text-xl font-semibold">Achievements</h2>
          </div>
          <div className="space-y-3">
            {profile?.achievements.length ? (
              profile.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <FaTrophy className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-medium">{achievement.name}</p>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No achievements yet. Keep playing!</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaHistory className="text-primary-400 text-xl" />
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {profile?.recentActivity.length ? (
              profile.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`mt-1 w-2 h-2 rounded-full ${activity.type === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="font-medium">{activity.message}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No recent activity</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="md:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine className="text-primary-400 text-xl" />
            <h2 className="text-xl font-semibold">Stats by Continent</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {profile?.continentStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="h-24 flex items-end justify-center mb-2">
                  <div 
                    className="w-full bg-primary-500 rounded-t-sm"
                    style={{ height: `${(stat.correct / (stat.correct + stat.incorrect || 1)) * 100}%` }}
                  ></div>
                </div>
                <p className="font-medium">{stat.continent}</p>
                <p className="text-sm text-gray-400">
                  {stat.correct}/{stat.correct + stat.incorrect}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}