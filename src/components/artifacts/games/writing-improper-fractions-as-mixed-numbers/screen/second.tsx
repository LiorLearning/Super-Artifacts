import LegoGame from '../lego-game/second';
import Header from '../components/header2';
import { useGameState } from '../state-utils';
import { VerifyPiecesAndDivisions, CreateBlocks } from './components/second';
import { ChooseHolder } from '../components/choose-holder';
import { FinalAnswer, CorrectAnswer, StepModule } from './components/first';
import { COLORS } from './constants';
import { nextStep } from '../utils/helper';
import { GameProps } from '../utils/types';
import { useEffect, useRef } from 'react';
import FirstQuestion from '../components/first-question';
import AnswerContent from '../components/answer-content';
import SuccessAnimation from '@/components/artifacts/utils/success-animate';

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
      {step === 0 && (
        <FirstQuestion fraction={fraction} onNext={() => nextStep('second', setGameStateRef)} />
      )}
      {step >= 1 && (
        <StepModule screen={step <= 1 ? 'first' : 'second'} color={color} stepNumber={stepNumber} numerator={numerator} denominator={denominator} stepText={stepText} />
      )}
      {step === 2 && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center justify-center h-full">
            <div className="text-3xl font-bold text-center my-2">
              Here you go!
            </div>
          </div>
        </div>
      )}
      {step === 7 && (
        <>
          <CorrectAnswer numerator={numerator} denominator={denominator} large={true} />
          <SuccessAnimation/>
        </>
      )}
    </div>
  );
};


const Footer = ({sendAdminMessage}: GameProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction, denomOptions } = gameStateRef.current.state2;
  const numerator = fraction.numerator;
  const denominator = fraction.denominator;
  const showFinalAnswerRef = useRef(false);

  useEffect(() => {
    if (step === 6) {
      setTimeout(() => {
        sendAdminMessage('agent', `Easy peasy! Keep the denominator the same and turn it into a mixed fraction!`);
        showFinalAnswerRef.current = true;
      }, 7000)
    }
  }, [step]);

  return (
    <div className="relative">
      {step === 1 && (
        <>
          <ChooseHolder 
            answer={fraction.denominator} 
            denomOptions={denomOptions} 
            onSuccess={() => {nextStep('second', setGameStateRef)}} 
            sendAdminMessage={sendAdminMessage}
          />
          <div className="text-center mt-4">
            <span className="text-3xl font-bold block mb-2">Now choose the holder</span>
            <span className="text-2xl text-gray-600">Hint: Number of Divisions should be same as denominator</span>
          </div>
        </>
      )}
      {step === 2 && (
        <CreateBlocks sendAdminMessage={sendAdminMessage} />
      )}
      {step === 3 && (
        <VerifyPiecesAndDivisions sendAdminMessage={sendAdminMessage} />
      )}
      {step >= 4 && step <= 6 && (
        <AnswerContent numerator={numerator} denominator={denominator} showFull={step === 6} sendAdminMessage={sendAdminMessage} />
      )}
      {step === 6 && (
        <div>
          <div className="flex justify-center my-16">
            <FinalAnswer numerator={numerator} denominator={denominator} nextStep={() => nextStep('second', setGameStateRef)} sendAdminMessage={sendAdminMessage} />
          </div>
        </div>
      )}
    </div>
  );
};


export default function SecondScreen({sendAdminMessage}: GameProps) {
    const { gameStateRef } = useGameState();
    const { fraction, step } = gameStateRef.current.state2;

    useEffect(() => {
      if (step === 0) {
        sendAdminMessage('agent', `Ready for a new challenge? Let’s turn ${fraction.numerator}/${fraction.denominator} into a mixed fraction!`);
      } else if (step === 1) {
        sendAdminMessage('agent', `Step 1: Pick the holder that can fit ${fraction.denominator} legos completely.`);
      } else if (step === 2) {
        sendAdminMessage('agent', `Now fill in the blanks! How many legos do we need to make ${fraction.numerator}/${fraction.denominator}? And what size should each lego be?`);
      } else if (step === 3) {
        sendAdminMessage('agent', `Here you go!! How many holders can you fill with green legos?`);
      } else if (step === 4) {
        sendAdminMessage('agent', `Awesome, let’s divide! How many groups of ${fraction.denominator} can you make from ${fraction.numerator}, and what’s left over?`);
      } else if (step === 5) {
        sendAdminMessage('agent', `Here's how the legos will look when arranged, can you answer now?`);
      }
    }, [step]);

    return (
      <div className="mx-auto">
        {step > 0 && <Header fraction={fraction} />}
        <MainContent />
        {step > 0 && step !== 4 && step <= 6 && (
          <div className="flex items-center justify-center">
            <LegoGame />
          </div>
        )}
        <Footer sendAdminMessage={sendAdminMessage} />
      </div>
    )
  }