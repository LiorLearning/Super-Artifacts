import FirstScreen from './screen/first';
import SecondScreen from './screen/second';
import { useGameState } from './state-utils';
import { prevStep, nextStep } from './utils/helper';


const DevHelper = () => {
  const { gameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step: step1 } = gameStateRef.current.state1;
  const { step: step2 } = gameStateRef.current.state2;

  return (
    <div className="flex justify-between mt-4">
      <button onClick={() => nextStep(screen)}>Next Step</button>
      <div className="text-lg">
        Current Step:  {screen} 
        {screen === 'first' && <span>{step1}</span>}
        {screen === 'second' && <span>{step2}</span>}
      </div>
      <button onClick={() => prevStep(screen)}>Previous Step</button>
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