import { GameScreen, GameState } from '../game-state';

export const nextStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: prev.state1.step + 1 } }));
  } else {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
  }
}

export const goToStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void,
  step: number
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step } }));
  } else {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step } }));
  }
}

export const prevStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void,
) => {
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: Math.max(prev.state1.step - 1, 0) } }));
  } else {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: Math.max(prev.state2.step - 1, 0) } }));
  }
}
