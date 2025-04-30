import { motion } from 'framer-motion'

export default function ScoreDisplay({ score }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-between items-center mb-8"
    >
      <h1 className="text-3xl font-bold">Globetrotter</h1>
      <div className="flex gap-4">
        <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full">
          ✅ {score.correct}
        </span>
        <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full">
          ❌ {score.incorrect}
        </span>
      </div>
    </motion.div>
  )
}