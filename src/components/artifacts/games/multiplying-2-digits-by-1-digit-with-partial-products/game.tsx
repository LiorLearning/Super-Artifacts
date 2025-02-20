import { useEffect } from 'react';
import { useRef } from 'react';
import FirstScreen from './screen/FirstScreen/first';
// import SecondScreen from './screen/SecondScreen/second';
// import ThirdScreen from './screen/ThirdScreen/third';
// import FourthScreen from './screen/FourthScreen/fourth';
import { useGameState } from './state-utils';
import { DevHelper } from './utils/helper';


interface GameProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => Promise<string>;
}

export default function Game({sendAdminMessage}: GameProps) {
  const { gameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step: step1 } = gameStateRef.current.state1;
  // const { step: step2 } = gameStateRef.current.state2;
  // const { step: step3 } = gameStateRef.current.state3;
  // const { step: step4 } = gameStateRef.current.state4;
  
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step1]);

  return (
    <div className="mx-auto game font-jersey">
      <div ref={bottomRef} style={{ height: 0 }} />
      <DevHelper />
      {/* Game screens */}
      {screen === 'first' && <FirstScreen sendAdminMessage={sendAdminMessage} />}
      {/* {screen === 'second' && <SecondScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'third' && <ThirdScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'fourth' && <FourthScreen sendAdminMessage={sendAdminMessage} />} */}
      
      {/* Select font */}
      <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
          .font-jersey {
            font-family: 'Jersey 25', cursive;
          }
          @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
          .font-patrick {
            font-family: 'Patrick Hand', cursive;
          }
        `}</style>

    </div>
  )
}