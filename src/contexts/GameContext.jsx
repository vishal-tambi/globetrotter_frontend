import { createContext, useContext, useReducer } from 'react'

const GameContext = createContext()

const initialState = {
  score: { correct: 0, incorrect: 0, streak: 0, maxStreak: 0 },
  currentGame: null,
  leaderboard: []
}

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCORE':
      return { ...state, score: action.payload }
    case 'SET_GAME':
      return { ...state, currentGame: action.payload }
    default:
      return state
  }
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}