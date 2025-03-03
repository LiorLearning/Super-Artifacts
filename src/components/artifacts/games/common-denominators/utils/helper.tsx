import { Button } from '@/components/ui/button';
import { GameScreen, GameState } from '../game-state';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGameState } from '../state-utils';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { COLORS } from './types';

export const DevHelper = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step: step1 } = gameStateRef.current.state1;
  const { step: step2 } = gameStateRef.current.state2;
  const { step: step3 } = gameStateRef.current.state3;
  const { step: step4 } = gameStateRef.current.state4;
  const { step: step5 } = gameStateRef.current.state5;
  const { step: step6 } = gameStateRef.current.state6;
  const [directStep, setDirectStep] = useState('');

  const getCurrentStep = () => {
    switch(screen) {
      case 1: return step1;
      case 2: return step2;
      case 3: return step3;
      case 4: return step4;
      case 5: return step5;
      case 6: return step6;
      default: return 0;
    }
  }

  const handleDirectStepChange = () => {
    const stepNumber = parseInt(directStep);
    if (!isNaN(stepNumber)) {
      goToStep(screen, setGameStateRef, stepNumber);
    }
  }

  return (
    <div className="flex justify-between mt-4">
      <Button className='m-2' onClick={() => prevStep(screen, setGameStateRef)}>Previous Step</Button>
      <div className="text-lg">
        <Select 
          value={screen.toString()} 
          onValueChange={(selectedScreen) => {
            setGameStateRef(prev => ({ 
              ...prev, 
              screen: parseInt(selectedScreen) as GameScreen
            }));
          }}
        >
          <SelectTrigger className="m-2">
            <SelectValue placeholder="Select a screen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">First Screen</SelectItem>
            <SelectItem value="2">Second Screen</SelectItem>
            <SelectItem value="3">Third Screen</SelectItem>
            <SelectItem value="4">Fourth Screen</SelectItem>
            <SelectItem value="5">Fifth Screen</SelectItem>
            <SelectItem value="6">Sixth Screen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <span className="mr-2">Step: {getCurrentStep()}</span>
      <div className="flex items-center">
        <Input 
          type="number" 
          value={directStep} 
          onChange={(e) => setDirectStep(e.target.value)}
          className="w-16 mr-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleDirectStepChange();
            }
          }}
          placeholder="Step"
        />
        <Button onClick={handleDirectStepChange}>Go to Step</Button>
      </div>
      <Button className='m-2' onClick={() => nextStep(screen, setGameStateRef)}>Next Step</Button>
    </div>
  );
};

export const nextStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void
) => {
  if (screen === 1) {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: prev.state1.step + 1 } }));
  } else if (screen === 2) {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
  } else if (screen === 3) {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step: prev.state3.step + 1 } }));
  } else if (screen === 4) {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: prev.state4.step + 1 } }));
  } else if (screen === 5) {
    setGameStateRef(prev => ({ ...prev, state5: { ...prev.state5, step: prev.state5.step + 1 } }));
  } else if (screen === 6) {
    setGameStateRef(prev => ({ ...prev, state6: { ...prev.state6, step: prev.state6.step + 1 } }));
  }
}

export const goToStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void,
  step: number
) => {
  if (screen === 1) {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: step } }));
  } else if (screen === 2) {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: step } }));
  } else if (screen === 3) {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step: step } }));
  } else if (screen === 4) {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: step } }));
  } else if (screen === 5) {
    setGameStateRef(prev => ({ ...prev, state5: { ...prev.state5, step: step } }));
  } else if (screen === 6) {
    setGameStateRef(prev => ({ ...prev, state6: { ...prev.state6, step: step } }));
  }
}

export const goToScreen = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void,
) => {
  setGameStateRef(prev => ({ ...prev, screen }));
}

export const prevStep = (
  screen: GameScreen, 
  setGameStateRef: (newState: (prevState: GameState) => GameState) => void,
) => {
  if (screen === 1) {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: Math.max(prev.state1.step - 1, 0) } }));
  } else if (screen === 2) {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: Math.max(prev.state2.step - 1, 0) } }));
  } else if (screen === 3) {
    setGameStateRef(prev => ({ ...prev, state3: { ...prev.state3, step: Math.max(prev.state3.step - 1, 0) } }));
  } else if (screen === 4) {
    setGameStateRef(prev => ({ ...prev, state4: { ...prev.state4, step: Math.max(prev.state4.step - 1, 0) } }));
  } else if (screen === 5) {
    setGameStateRef(prev => ({ ...prev, state5: { ...prev.state5, step: Math.max(prev.state5.step - 1, 0) } }));
  } else if (screen === 6) {
    setGameStateRef(prev => ({ ...prev, state6: { ...prev.state6, step: Math.max(prev.state6.step - 1, 0) } }));
  }
}

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