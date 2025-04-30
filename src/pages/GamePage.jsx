import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../contexts/GameContext'
import { getRandomDestination, submitAnswer } from '../services/api'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import ClueCard from '../components/game/ClueCard'
import AnswerOptions from '../components/game/AnswerOptions'
import ScoreDisplay from '../components/game/ScoreDisplay'
import { useWindowSize } from '../hooks/useWindowSize'

export default function GamePage({ user }) {
  const { state, dispatch } = useGame()
  const [gameData, setGameData] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()
  const navigate = useNavigate()

  const fetchQuestion = async () => {
    try {
      const { data } = await getRandomDestination()
      setGameData(data)
      setSelectedAnswer(null)
      setIsCorrect(null)
    } catch (error) {
      console.error('Error fetching question:', error)
    }
  }

  const handleAnswer = async (answer) => {
    setSelectedAnswer(answer)
    const correct = answer === gameData.correctAnswer
    setIsCorrect(correct)
    
    // Update local score
    const newScore = {
      correct: correct ? state.score.correct + 1 : state.score.correct,
      incorrect: correct ? state.score.incorrect : state.score.incorrect + 1
    }
    dispatch({ type: 'SET_SCORE', payload: newScore })
    
    if (correct) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }

    // Send to backend if logged in
    if (user) {
      await submitAnswer({
        username: user.username,
        destination: gameData.correctAnswer,
        isCorrect: correct
      })
    }
  }

  useEffect(() => {
    fetchQuestion()
  }, [])

  if (!gameData) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      
      <ScoreDisplay score={state.score} />

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Can you guess this destination?</h2>
        
        <div className="space-y-4">
          {gameData.question.clues.map((clue, index) => (
            <ClueCard key={index} clue={clue} index={index} />
          ))}
        </div>

        <AnswerOptions
          options={gameData.options}
          onSelect={handleAnswer}
          disabled={selectedAnswer !== null}
        />

        {selectedAnswer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-lg mt-6 ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}
          >
            <h3 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {isCorrect ? '🎉 Correct!' : '😢 Incorrect!'}
            </h3>
            <p>{gameData.question.fact.text}</p>
            <p className="mt-2 text-sm">
              The correct answer was <span className="font-bold">{gameData.correctAnswer}</span>
            </p>
            <button
              onClick={fetchQuestion}
              className="mt-4 px-4 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition"
            >
              Next Question
            </button>

            {user && (
              <button
                onClick={() => navigate(`/challenge/new?destination=${gameData.correctAnswer}`)}
                className="mt-2 ml-4 px-4 py-2 bg-secondary-500 rounded-lg hover:bg-secondary-600 transition"
              >
                Challenge a Friend
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}