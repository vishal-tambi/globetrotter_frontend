import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { createChallenge, getChallenge, submitChallengeAnswer } from '../services/api'
import { useGame } from '../contexts/GameContext'
import { motion } from 'framer-motion'
import { FaShare, FaCopy } from 'react-icons/fa'
import AnswerOptions from '../components/game/AnswerOptions'
import ChallengeCard from '../components/game/ChallengeCard'

export default function ChallengePage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [challenge, setChallenge] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [isCreator, setIsCreator] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        if (id === 'new') {
          const destination = new URLSearchParams(location.search).get('destination')
          if (!destination) {
            navigate('/play')
            return
          }
          
          const { data } = await createChallenge({ destination })
          setChallenge(data.challenge)
          setShareUrl(`${window.location.origin}/challenge/${data.challenge.id}`)
          setIsCreator(true)
        } else {
          const { data } = await getChallenge(id)
          setChallenge(data.challenge)
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load challenge')
      } finally {
        setIsLoading(false)
      }
    }

    loadChallenge()
  }, [id, location.search, navigate])

  const handleAnswer = async (answer) => {
    setSelectedAnswer(answer)
    const correct = answer === challenge.destination.name
    setIsCorrect(correct)
    
    try {
      await submitChallengeAnswer(challenge.id, {
        isCorrect: correct,
        answer: answer
      })
    } catch (err) {
      console.error('Error submitting answer:', err)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Copy failed:', err))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl text-center">
        <div className="bg-red-500/20 text-red-500 p-4 rounded-lg">
          {error}
        </div>
        <button
          onClick={() => navigate('/play')}
          className="mt-4 px-4 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition"
        >
          Back to Game
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {isCreator ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-500/20 p-4 rounded-lg mb-6"
        >
          <h3 className="font-bold text-lg mb-2">Share this challenge</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-grow px-3 py-2 bg-white/10 rounded"
            />
            <button
              onClick={copyToClipboard}
              className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded flex items-center gap-2"
            >
              <FaCopy /> Copy
            </button>
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=Can%20you%20guess%20this%20destination?%20${shareUrl}`, '_blank')}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded flex items-center gap-2"
            >
              <FaShare /> Share
            </button>
          </div>
        </motion.div>
      ) : (
        <ChallengeCard challenge={challenge} />
      )}

      <div className="space-y-6 mt-6">
        {!selectedAnswer ? (
          <>
            <h2 className="text-xl font-semibold">Can you guess this destination?</h2>
            <div className="space-y-4">
              {challenge.destination.clues.map((clue, index) => (
                <div key={index} className="bg-white/10 p-4 rounded-lg">
                  <p className="text-lg font-medium">{clue.text}</p>
                </div>
              ))}
            </div>
            <AnswerOptions
              options={challenge.options}
              onSelect={handleAnswer}
              disabled={false}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-lg ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}
          >
            <h3 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {isCorrect ? '🎉 Correct!' : '😢 Incorrect!'}
            </h3>
            <p>{challenge.destination.fact}</p>
            <p className="mt-2 text-sm">
              The correct answer was <span className="font-bold">{challenge.destination.name}</span>
            </p>
            <button
              onClick={() => navigate('/play')}
              className="mt-4 px-4 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}