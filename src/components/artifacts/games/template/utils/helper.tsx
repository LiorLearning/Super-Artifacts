import { GameScreen, GameState } from '../game-state';
import { useGameState } from '../state-utils';

export function nextStep(screen: GameScreen) {
  const { gameStateRef, setGameStateRef } = useGameState();
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: prev.state1.step + 1 } }));
  } else {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
  }
}

export function prevStep(screen: GameScreen) {
  const { gameStateRef, setGameStateRef } = useGameState();
  if (screen === 'first') {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: Math.max(prev.state1.step - 1, 0) } }));
  } else {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: Math.max(prev.state2.step - 1, 0) } }));
  }
}

export function nextScreen(screen: GameScreen) {
  const { setGameStateRef } = useGameState();
  setGameStateRef(prev => ({ ...prev, screen }));
}