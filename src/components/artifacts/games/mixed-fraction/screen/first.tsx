import LegoGame from '../lego-game/first';
import Header from '../components/header';
import { useGameState } from '../state-utils';
import { firstScreenFooterTexts, COLORS } from './constants';
import { Button } from '@/components/custom_ui/button';
import { useState } from 'react';
import { CorrectAnswer, FinalAnswer, StepModule } from './components/first';

const STEPS_WITH_PROCEED = [0, 1, 11, 12];

const MainContent = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction, piecesAtYOne } = gameStateRef.current.state1;
  const numerator = fraction.numerator;
  const denominator = fraction.denominator;

  const color = step <= 6 ? COLORS.pink : step <= 12 ? COLORS.blue : COLORS.purple;
  const stepNumber = step <= 6 ? 1 : step <= 12 ? 2 : 3;
  const stepText = step <= 12 ? 'FILL THE BLOCKS IN THE HOLDERS' : 'THE ANSWER';

  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAnswer(inputValue);
    if (inputValue === numerator.toString()) {
      setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: prev.state1.step + 1 } }));
    }
  };

  const nextScreen = () => {
    setGameStateRef(prev => ({ ...prev, screen: 'second' }));
  };

  return (
    <div className="flex flex-col m-4">
      {step === 0 && (
        <div className="p-8 bg-white">
          <h2 className="text-3xl font-bold">
            Hey let us understand mixed fractions, with{' '}
            <span className="text-red-500 relative">
              LEGOS!
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500" />
            </span>
          </h2>
        </div>
      )}
      {step > 0 && (
        <StepModule screen={step <= 6 ? 'first' : 'second'} color={color} stepNumber={stepNumber} numerator={numerator} denominator={denominator} stepText={stepText} />
      )}
      {step === 6 && (
        <div className="flex justify-center mt-4 items-center space-x-4">
          <div className="text-3xl font-bold text-center">
            <span>1</span>
            <div className="w-full h-px bg-black my-1" />
            <span>{denominator}</span>
          </div>
          <span className="text-3xl">x</span>
          <div className="text-3xl font-bold text-center text-purple-500 border-4 border-purple-500 px-3 py-1">
            <span>{piecesAtYOne}</span>
          </div>
          <span className="text-3xl">=</span>
          <div className="text-3xl font-bold text-center">
            <input 
              type="text" 
              value={answer} 
              placeholder="?"
              onChange={handleAnswerChange} 
              className="w-12 text-center"
            />
            <div className="w-full h-px bg-black my-1" />
            <span>{denominator}</span>
          </div>
        </div>
      )}
      {step === 14 && (
        <CorrectAnswer numerator={numerator} denominator={denominator} large={true} nextScreen={nextScreen} />
      )}
    </div>
  );
};


const Footer = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction, piecesAtYOne } = gameStateRef.current.state1;
  const denominator = fraction.denominator;
  const numerator = fraction.numerator;
  const stepText = firstScreenFooterTexts(numerator, denominator)[step];

  const handleNumeratorClick = () => {
    // Send admin message
  };

  const nextStep = () => {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: prev.state1.step + 1 } }));
  };

  return (
    <div className="relative">
      {step === 5 && (
        <div className="flex justify-center mt-4 items-center space-x-4">
          <div className="text-3xl font-bold text-center">
            <span>1</span>
            <div className="w-full h-px bg-black my-1" />
            <span>{denominator}</span>
          </div>
          <span className="text-3xl">x</span>
          <div className="text-3xl font-bold text-center text-purple-500 border-4 border-purple-500 px-3 py-1">
            <span>{piecesAtYOne}</span>
          </div>
        </div>
      )}
      <div className="text-center text-3xl font-bold mt-8 space-y-2">
        {stepText.lines.map((line, index) => (
          <span key={index} style={{ color: line.color || 'black' }}>{line.text}<br /></span>
        ))}
      </div>
      {step === 2 && (
        <div className="flex justify-center mt-4">
          <Button className={`bg-[${COLORS.pink}] text-white px-6 py-3 mx-2 shadow-lg text-xl rounded-none`} onClick={handleNumeratorClick}>NUMERATOR ({numerator})</Button>
          <Button className={`bg-[${COLORS.pink}] text-white px-6 py-3 mx-2 shadow-lg text-xl rounded-none`} onClick={nextStep}>DENOMINATOR ({denominator})</Button>
        </div>
      )}
      {STEPS_WITH_PROCEED.includes(step) && (
        <div className="flex justify-center mt-4">
          <Button className="bg-blue-500 text-white px-6 py-3 mx-2 shadow-lg text-xl rounded-none" onClick={nextStep}>
            Proceed
          </Button>
        </div>
      )}
      {step === 13 && (
        <FinalAnswer numerator={numerator} denominator={denominator} nextStep={nextStep} />
      )}
    </div>
  );
};


export default function FirstScreen() {
    const { gameStateRef } = useGameState();
    const { fraction, step } = gameStateRef.current.state1;

    return (
      <div className="mx-auto">
        <Header fraction={fraction} />
        <MainContent />
        {step <= 13 && (
          <div className="flex items-center justify-center">
            <LegoGame />
          </div>
        )}
        <Footer />
      </div>
    )
  }