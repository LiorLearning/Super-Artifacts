import { GameScreen } from './game-state';
import FirstScreen from './screen/first';
import SecondScreen from './screen/second';
import ThirdScreen from './screen/third';
import FourthScreen from './screen/fourth';
import FifthScreen from './screen/fifth';
import SixthScreen from './screen/sixth';
import { useGameState } from './state-utils';
import { prevStep, nextStep } from './utils/helper';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const DevHelper = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step: step1 } = gameStateRef.current.state1;
  const { step: step2 } = gameStateRef.current.state2;
  const { step: step3 } = gameStateRef.current.state3;
  const { step: step4 } = gameStateRef.current.state4;
  const { step: step5 } = gameStateRef.current.state5;
  const { step: step6 } = gameStateRef.current.state6;

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
            <SelectItem value="third">Third Screen</SelectItem>
            <SelectItem value="fourth">Fourth Screen</SelectItem>
            <SelectItem value="fifth">Fifth Screen</SelectItem>
            <SelectItem value="sixth">Sixth Screen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {screen === 'first' && <span>Step: {step1}</span>}
      {screen === 'second' && <span>Step: {step2}</span>}
      {screen === 'third' && <span>Step: {step3}</span>}
      {screen === 'fourth' && <span>Step: {step4}</span>}
      {screen === 'fifth' && <span>Step: {step5}</span>}
      {screen === 'sixth' && <span>Step: {step6}</span>}
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
      {screen === 'third' && <ThirdScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'fourth' && <FourthScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'fifth' && <FifthScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'sixth' && <SixthScreen sendAdminMessage={sendAdminMessage} />}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
        .font-jersey {
          font-family: 'Jersey 25', cursive;
        }
      `}</style>
    </div>
  )
}


/*
•⁠  ⁠2nd screen redesigned on Figma for clarity [ DONE ]

Figma misalignments:
•⁠  ⁠⁠3rd screen, step 1 and 2: wording for each line should be different (as per figma, eg, "3 pieces, split into 2 each, give...")
•⁠  ⁠⁠Feedback loop on MCQs on all screens (screen 3 etc) should be similar to subtract fractions (try again, red color and so on; green color for correct)
•⁠  ⁠⁠Step 3: answer should be colored as in figma
•⁠  ⁠⁠Screen 4 step 1 is wrong: make it as per Figma (boxes empty; clicking hammer splits pieces; read comments)
•⁠  ⁠⁠Step 2: add both as the right option (make it green on selecting) in MCQ

•⁠  ⁠⁠Add conversation
*/