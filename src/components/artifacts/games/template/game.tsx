import { GameScreen } from './game-state';
import FirstScreen from './screen/first';
import SecondScreen from './screen/second';
import { useGameState } from './state-utils';
import { prevStep, nextStep } from './utils/helper';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

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
          value={screen} 
          onValueChange={(selectedScreen) => {
            setGameStateRef(prev => ({ ...prev, screen: selectedScreen as GameScreen }));
          }}
        >
          <SelectTrigger className="m-2">
            <SelectValue placeholder="Select a screen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first">First Screen</SelectItem>
            <SelectItem value="second">Second Screen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {screen === 'first' && <span>Step: {step1}</span>}
      {screen === 'second' && <span>Step: {step2}</span>}
      <Button className='m-2' onClick={() => nextStep(screen, setGameStateRef)}>Next Step</Button>
    </div>
  );
};


interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function Game({sendAdminMessage}: GameProps) {
  const { gameStateRef } = useGameState();
  const { screen } = gameStateRef.current;

  return (
    <div className="mx-auto game font-jersey">
      <DevHelper />
      {/* Game screens */}
      {screen === 'first' && <FirstScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'second' && <SecondScreen sendAdminMessage={sendAdminMessage} />}

      
      {/* Select font */}
      <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
          .font-jersey {
            font-family: 'Jersey 25', cursive;
          }
        `}</style>
    </div>
  )
}