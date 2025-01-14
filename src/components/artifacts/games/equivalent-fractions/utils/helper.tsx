import { GameState } from '../game-state';

export const nextStep = (
  screen: number, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 1) {
    setGameStateRef(prev => ({
      ...prev,
      screen1: {
        ...prev.screen1,
        step: {
          ...prev.screen1.step,
          id: prev.screen1.step.id + 1
        }
      }
    }));
  } else if (screen === 2) {
    setGameStateRef(prev => ({
      ...prev,
      screen2: {
        ...prev.screen2,
        step: {
          ...prev.screen2.step,
          id: prev.screen2.step.id + 1
        }
      }
    }));
  } else if (screen === 3) {
    setGameStateRef(prev => ({
      ...prev,
      screen3: {
        ...prev.screen3,
        step: prev.screen3.step + 1
      }
    }));
  }
};

export const prevStep = (
  screen: number, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 1) {
    setGameStateRef(prev => ({
      ...prev,
      screen1: {
        ...prev.screen1,
        step: {
          ...prev.screen1.step,
          id: prev.screen1.step.id - 1
        }
      }
    }));
  }
};