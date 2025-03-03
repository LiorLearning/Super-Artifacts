import { GameState } from '../game-state';
import { COLORS } from './types';

export const nextStep = (
  screen: number, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 1) {
    setGameStateRef(prev => ({
      ...prev,
      state1: {
        ...prev.state1,
        step: {
          ...prev.state1.step,
          id: prev.state1.step.id + 1
        }
      }
    }));
  } else if (screen === 2) {
    setGameStateRef(prev => ({
      ...prev,
      state2: {
        ...prev.state2,
        step: {
          ...prev.state2.step,
          id: prev.state2.step.id + 1
        }
      }
    }));
  } else if (screen === 3) {
    setGameStateRef(prev => ({
      ...prev,
      state3: {
        ...prev.state3,
        step: prev.state3.step + 1
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
      state1: {
        ...prev.state1,
        step: {
          ...prev.state1.step,
          id: prev.state1.step.id - 1
        }
      }
    }));
  }
};


export const NOT_ATTEMPTED = 'not_attempted';
export const ATTEMPTED = 'attempted';
export const CORRECT = 'correct';
export const INCORRECT = 'incorrect';

export const getState = (input: string, actual: string) => {
  if (input === '') {
    return NOT_ATTEMPTED;
  } else {
    if (input.length === actual.length) {
      if (input === actual) {
        return CORRECT;
      } else {
        return INCORRECT;
      }
    } else if (input.length > actual.length) {
      return INCORRECT;
    }
  }
  return ATTEMPTED;
}

export const getInputColor = (input: string, actual: string) => {
  const state = getState(input, actual);
  if (state === NOT_ATTEMPTED) {
    return COLORS.white;
  } else if (state === CORRECT) {
    return COLORS.light2Green;
  } else if (state === INCORRECT) {
    return COLORS.lightRed;
  }
  return COLORS.white;
}