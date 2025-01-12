import { GameScreen, GameState } from '../game-state';

export const nextStep = (
  screen: number, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 1) {
    setGameStateRef(prev => ({ ...prev, step: { ...prev.step, id: prev.step.id + 1 } }));
  } else {
    setGameStateRef(prev => ({ ...prev, step: { ...prev.step, id: prev.step.id + 1 } }));
  }
}

export const prevStep = (
  screen: number, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 1) {
    setGameStateRef(prev => ({ ...prev, step: { ...prev.step, id: prev.step.id - 1 } }));
  }
}