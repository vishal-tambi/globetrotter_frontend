import { motion } from 'framer-motion'
import { FaUser } from 'react-icons/fa'

export default function ChallengeCard({ challenge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-purple-500/20 p-4 rounded-lg mb-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center">
          <FaUser className="text-purple-300" />
        </div>
        <div>
          <h3 className="font-bold">{challenge.creator.username}'s Challenge</h3>
          <p className="text-sm text-gray-300">
            Created {new Date(challenge.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="text-gray-300">
        Can you guess this destination better than {challenge.creator.username}?
      </p>
    </motion.div>
  )
}