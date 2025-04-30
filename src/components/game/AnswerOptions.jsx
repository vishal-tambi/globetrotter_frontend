import { motion } from 'framer-motion'

export default function AnswerOptions({ options, onSelect, disabled }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {options.map((option, index) => (
        <motion.button
          key={option.name}
          whileHover={{ scale: disabled ? 1 : 1.03 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          onClick={() => !disabled && onSelect(option.name)}
          className={`p-4 rounded-xl text-left transition-all ${disabled 
            ? 'bg-gray-700 cursor-not-allowed' 
            : 'bg-white/5 hover:bg-white/10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.05 }}
        >
          <h3 className="font-bold text-lg">{option.name}</h3>
          <p className="text-sm text-gray-400">{option.country}</p>
        </motion.button>
      ))}
    </div>
  )
}