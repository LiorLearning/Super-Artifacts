import { useGameState } from '../state-utils';
import { HeaderAddition } from '../components/header';
import { BaseProps } from '../utils/types';
import { CombineFractionInput } from './second';
import { Button } from '@/components/ui/button';

export default function ThirdScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {fraction1, fraction2} = gameStateRef.current.questions.question3;

  const { step } = gameStateRef.current.state3;


  return (
    <div className="flex flex-col items-center justify-center">
      <HeaderAddition fraction1={fraction1} fraction2={fraction2} />
      <CombineFractionInput fraction1={fraction1} fraction2={fraction2} onComplete={() => setGameStateRef(prev => ({...prev, state3: {...prev.state3, step: 1}}))} />
      {step === 1 ?
        <Button onClick={() => setGameStateRef(prev => ({...prev, screen: 4}))} className='m-2 mx-auto bg-lime-500 hover:bg-lime-600 max-w-3xl'>Next Step</Button>
      : null}
    </div>
  );
}