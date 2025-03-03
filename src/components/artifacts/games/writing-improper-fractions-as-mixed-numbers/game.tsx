import FirstScreen from './screen/first';
import SecondScreen from './screen/second';
import ThirdScreen from './screen/third';
import { useGameState } from './state-utils';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { prevStep, nextStep } from './utils/helper';
import { GameScreen } from './game-state';
import { useEffect } from 'react';
import { useRef } from 'react';
import { GameProps } from './utils/types';


const DevHelper = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step: step1 } = gameStateRef.current.state1;
  const { step: step2 } = gameStateRef.current.state2;

  return (
    <div className="flex justify-between mt-4">
      <Button className='m-2' onClick={() => prevStep(screen, setGameStateRef)}>Previous Step</Button>
      <div className="text-lg">
        <Select 
          value={screen.toString()} 
          onValueChange={(selectedScreen) => {
            setGameStateRef(prev => ({ ...prev, screen: parseInt(selectedScreen) as GameScreen }));
          }}
        >
          <SelectTrigger className="m-2">
            <SelectValue placeholder="Select a screen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">First Screen</SelectItem>
            <SelectItem value="2">Second Screen</SelectItem>
            <SelectItem value="3">Third Screen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {screen === 1 && <span>Step: {step1}</span>}
      {screen === 2 && <span>Step: {step2}</span>}
      <Button className='m-2' onClick={() => nextStep(screen, setGameStateRef)}>Next Step</Button>
    </div>
  );
};

export default function Game({sendAdminMessage}: GameProps) {
  const { gameStateRef } = useGameState();
  const { screen } = gameStateRef.current;

  const { step: step1 } = gameStateRef.current.state1;
  const { step: step2 } = gameStateRef.current.state2;
  const { step: step3 } = gameStateRef.current.state3;
  
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step1, step2, step3]);

  return (
    <div className="mx-auto game font-jersey">
      <DevHelper />
      {screen === 1 && <FirstScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 2 && <SecondScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 3 && <ThirdScreen sendAdminMessage={sendAdminMessage} />}
      
      <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
          .font-jersey {
            font-family: 'Jersey 25', cursive;
          }
        `}</style>
      <div ref={bottomRef} style={{ height: 0 }} />
    </div>
  )
}