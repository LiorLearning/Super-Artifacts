import LegoGame from '../lego-game/second';
import Header from '../components/header';
import { useGameState } from '../state-utils';
import { VerifyPiecesAndDivisions, ChooseHolder, CreateBlocks } from './components/second';

const MainContent = () => {
  const { gameStateRef } = useGameState();
  const { step, fraction } = gameStateRef.current.state2;
  const numerator = fraction.numerator;
  const denominator = fraction.denominator;

  const color = step <= 1 ? 'pink-400' : step <= 2 ? 'blue-500' : 'purple-500';
  const stepNumber = step <= 1 ? 1 : step <= 2 ? 2 : 3;
  const stepText = step <= 2 ? 'FILL THE BLOCKS IN THE HOLDERS' : 'THE ANSWER';

  return (
    <div className="flex flex-col m-4">
      {step >= 0 && (
        <div className="flex items-stretch justify-center gap-4">
          <div className={`bg-white text-${color} border-8 border-${color} px-6 py-2 flex items-center justify-center`}>
            <span className="text-2xl font-bold">STEP {stepNumber}</span>
          </div>
          <div className={`flex-1 bg-${color} border-8 border-${color} flex items-center max-w-xl`}>
            <h2 className="text-white text-2xl font-bold flex items-center gap-4 mx-auto">
              {step <= 1 && (
                <>
                  <span>CREATE</span>
                  <div className="bg-white text-black px-3 py-1 inline-flex flex-col items-center">
                    <span>{numerator}</span>
                    <div className="w-3 h-px bg-black" />
                    <span>{denominator}</span>
                  </div>
                  <span>LEGO BLOCKS</span>
                </>
              )}
              {step > 1 && (
                <div className="flex items-center justify-center my-4">
                  <span>{stepText}</span>
                </div>
              )}
            </h2>
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center justify-center h-full">
            <div className="text-3xl font-bold text-center my-2">
              Here you go!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const Footer = () => {
  const { gameStateRef } = useGameState();
  const { step } = gameStateRef.current.state2;

  return (
    <div className="relative">
      {step === 0 && (
        <CreateBlocks />
      )}
      {step === 1 && (
        <ChooseHolder />
      )}
      {step === 2 && (
        <VerifyPiecesAndDivisions />
      )}
    </div>
  );
};


export default function SecondScreen() {
    const { gameStateRef } = useGameState();
    const { fraction, step } = gameStateRef.current.state2;

    return (
      <div className="mx-auto">
        <Header fraction={fraction} />
        <MainContent />
        {step <= 5 && (
          <div className="flex items-center justify-center">
            <LegoGame />
          </div>
        )}
        <Footer />
      </div>
    )
  }
  
  