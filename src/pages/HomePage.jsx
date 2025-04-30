import { Link } from 'react-router-dom'
import { FaGlobeAmericas, FaPlay, FaUsers, FaTrophy } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function HomePage({ user }) {
  return (
    <div className="text-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mb-6">
          <FaGlobeAmericas className="text-4xl text-primary-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Globetrotter</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Test your travel knowledge with cryptic clues about famous destinations around the world!
        </p>


        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/play"
            className="px-8 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg font-medium flex items-center justify-center gap-2 transition"
          >
            <FaPlay /> Play Now
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition"
          >
            Create Account
          </Link>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <div className="text-primary-400 text-2xl mb-4">
            <FaGlobeAmericas />
          </div>
          <h3 className="text-xl font-semibold mb-2">Explore the World</h3>
          <p className="text-gray-400">
            Discover hundreds of famous destinations through clever clues and fascinating facts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <div className="text-primary-400 text-2xl mb-4">
            <FaUsers />
          </div>
          <h3 className="text-xl font-semibold mb-2">Challenge Friends</h3>
          <p className="text-gray-400">
            Compete against friends and see who's the ultimate globetrotter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <div className="text-primary-400 text-2xl mb-4">
            <FaTrophy />
          </div>
          <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
          <p className="text-gray-400">
            Earn points, build streaks, and climb the leaderboard.
          </p>
        </motion.div>
      </div>
    </div>
  )
}