import { motion } from 'framer-motion'

export default function ClueCard({ clue, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/20"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold px-2 py-1 bg-primary-dark rounded-full">
          Clue {index + 1}
        </span>
        <span className="text-xs text-gray-300">
          Difficulty: {'⭐'.repeat(clue.difficulty)}
        </span>
      </div>
      <p className="text-lg font-medium">{clue.text}</p>
    </motion.div>
  )
}