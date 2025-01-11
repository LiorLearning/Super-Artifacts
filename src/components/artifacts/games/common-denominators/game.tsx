import { GameScreen } from './game-state';
import FirstScreen from './screen/first';
import SecondScreen from './screen/second';
import ThirdScreen from './screen/third';
import FourthScreen from './screen/fourth';
import FifthScreen from './screen/fifth';
import SixthScreen from './screen/sixth';
import { useGameState } from './state-utils';
import { DevHelper } from './utils/helper';

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
•⁠  [DONE] ⁠2nd screen redesigned on Figma for clarity

Figma misalignments:
•⁠  [DONE] ⁠⁠3rd screen, step 1 and 2: wording for each line should be different (as per figma, eg, "3 pieces, split into 2 each, give...")
•⁠  ⁠⁠[DONE] Feedback loop on MCQs on all screens (screen 3 etc) should be similar to subtract fractions (try again, red color and so on; green color for correct)
•⁠  [DONE] ⁠⁠Step 3: answer should be colored as in figma
•⁠  ⁠⁠Screen 4 step 1 is wrong: make it as per Figma (boxes empty; clicking hammer splits pieces; read comments)
•⁠  [DONE] ⁠⁠Step 2: add both as the right option (make it green on selecting) in MCQ

•⁠  ⁠⁠Add conversation
*/