import { GameScreen, GameState } from '../game-state';

export const nextStep = (
  screen: GameScreen, 
  gameState: GameState, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: prev.state1.step + 1 } }));
  } else {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
  }
}

export const prevStep = (
  screen: GameScreen, 
  gameState: GameState, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: Math.max(prev.state1.step - 1, 0) } }));
  } else {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: Math.max(prev.state2.step - 1, 0) } }));
  }
}

export const nextScreen = (
  screen: GameScreen, 
  gameState: GameState, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  setGameStateRef(prev => ({ ...prev, screen }));
}