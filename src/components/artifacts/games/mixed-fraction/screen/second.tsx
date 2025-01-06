import LegoGame from '../lego-game/second';
import Header from '../components/header';
import { useGameState } from '../state-utils';
import { VerifyPiecesAndDivisions, ChooseHolder, CreateBlocks } from './components/second';
import { FinalAnswer, CorrectAnswer, StepModule } from './components/first';
import { COLORS } from './constants';

const MainContent = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction } = gameStateRef.current.state2;
  const numerator = fraction.numerator;
  const denominator = fraction.denominator;

  const color = step <= 1 ? COLORS.pink : step <= 2 ? COLORS.blue : COLORS.purple;
  const stepNumber = step <= 1 ? 1 : step <= 2 ? 2 : 3;
  const stepText = step <= 2 ? 'FILL THE BLOCKS IN THE HOLDERS' : 'THE ANSWER';

  const nextScreen = () => {
    setGameStateRef(prev => ({ ...prev, screen: 'third' }));
  };

  return (
    <div className="flex flex-col m-4">
      {step >= 0 && (
        <StepModule screen={step <= 1 ? 'first' : 'second'} color={color} stepNumber={stepNumber} numerator={numerator} denominator={denominator} stepText={stepText} />
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
      {step === 4 && (
        <CorrectAnswer numerator={numerator} denominator={denominator} large={false} nextScreen={nextScreen} />
      )}
    </div>
  );
};


const Footer = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction } = gameStateRef.current.state2;
  const numerator = fraction.numerator;

  const nextStep = () => {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
  };

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
      {step === 3 && (
        <>
          <div className="text-center text-3xl font-bold mt-8 space-y-2">
            <span>Number of Legos <span className="text-purple-500">÷</span> Number of Divisions</span>
          </div>
          <div className="flex justify-center mt-8 items-center space-x-4">
            <div className="text-5xl font-bold text-center">
              <span>{fraction.numerator}</span>
            </div>
            <span className="text-5xl text-purple-500">÷</span>
            <div className="text-5xl font-bold text-center">
              <span>{fraction.denominator}</span>
            </div>
          </div>
          <div className="flex justify-center my-16">
            <FinalAnswer numerator={numerator} nextStep={nextStep} />
          </div>
        </>
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
        {step <= 5 && step !== 3 && (
          <div className="flex items-center justify-center">
            <LegoGame />
          </div>
        )}
        <Footer />
      </div>
    )
  }