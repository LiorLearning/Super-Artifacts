import LegoGame from '../lego-game/first';
import Header from '../components/header1';
import { useGameState } from '../state-utils';
import { COLORS } from './constants';
import { Button } from '@/components/custom_ui/button';
import { useEffect, useRef, useState } from 'react';
import { CorrectAnswer, FinalAnswer, StepModule } from './components/first';
import FirstQuestion from '../components/first-question';
import { goToStep, nextStep } from '../utils/helper';
import { Input } from '@/components/custom_ui/input';
import { ChooseHolder } from '../components/choose-holder';
import { GameProps } from '../../addition-within-20/components/types';

const MainContent = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction, piecesAtYOne } = gameStateRef.current.state1;
  const numerator = fraction.numerator;
  const denominator = fraction.denominator;

  const color = step <= 3 ? COLORS.pink : step <= 6 ? COLORS.blue : COLORS.purple;
  const stepNumber = step <= 3 ? 1 : step <= 6 ? 2 : 3;
  const stepText = step <= 6 ? 'FILL THE BLOCKS IN THE HOLDERS' : 'THE ANSWER';

  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAnswer(inputValue);
    if (inputValue === numerator.toString()) {
      goToStep('first', setGameStateRef, 4);
    }
  };

  const nextScreen = () => {
    setGameStateRef(prev => ({ ...prev, screen: 'second' }));
  };

  return (
    <div className="flex flex-col m-4">
      {step === 0 && (
        <FirstQuestion />
      )}
      {step > 0 && (
        <StepModule screen={step <= 3 ? 'first' : 'second'} color={color} stepNumber={stepNumber} numerator={numerator} denominator={denominator} stepText={stepText} />
      )}
      {step === 3 && (
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
            <Input 
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
      {step === 6 && (
        <div className="flex justify-center mt-4 items-center space-x-4">
          <div className="text-3xl font-bold text-center border border-black px-4 py-2 rounded-lg">
            <span className="text-3xl">{numerator} ÷ {denominator} = </span>
            <span className="text-purple-500">{Math.floor(numerator / denominator)}</span>
            <span className="text-3xl"> R </span>
            <span className="text-green-500">{numerator % denominator}</span>
          </div>
        </div>
      )}
      {step === 7 && (
        <CorrectAnswer numerator={numerator} denominator={denominator} large={true} nextScreen={nextScreen} />
      )}
    </div>
  );
};


const Footer = ({sendAdminMessage}: GameProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction, denomOptions, piecesAtYOne } = gameStateRef.current.state1;
  const denominator = fraction.denominator;
  const numerator = fraction.numerator;
  const [isIncorrect, setIsIncorrect] = useState(false);

  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [isVerifiedFalse, setIsVerifiedFalse] = useState(false);

  const verifyAnswer = () => {
    const integer = Math.floor(numerator / denominator);
    const remainder = numerator - integer * denominator;
    if (answer1 === integer.toString() && answer2 === remainder.toString()) {
      goToStep('first', setGameStateRef, 5);
    } else {
      setIsVerifiedFalse(true);
    }
  }

  const handleDoneClick = () => {
    if (numerator === piecesAtYOne) {
      setIsIncorrect(false);
      goToStep('first', setGameStateRef, 3);
    } else {
      setIsIncorrect(true);
      sendAdminMessage('agent', "Hmmm, let's give that another try!");
      sendAdminMessage('admin', "Diagnosis socratically and ask user to drag more or less blocks as needed");
    }
  };

  return (
    <div className="relative">
      {step === 1 && (
        <>
          <ChooseHolder
            sendAdminMessage={sendAdminMessage}
            answer={denominator}
            denomOptions={denomOptions}
            onSuccess={() => {nextStep('first', setGameStateRef)}}
          />
          <div className="text-center text-3xl mt-8 space-y-2">
            <span>Which holder can hold groups of {denominator}</span>
          </div>
        </>


      )}
      {step === 2 && (
        <>
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
              <span>?</span>
              <div className="w-full h-px bg-black my-1" />
              <span>{denominator}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center pb-8">
            <div className="flex justify-center mt-4">
              <Button 
                className={`text-white px-6 py-3 mx-2 shadow-[-5px_5px_0px_black] text-xl rounded-none`} 
                style={{
                  backgroundColor: isIncorrect ? 'red' : COLORS.pink,
                }}
                onClick={handleDoneClick}
              >
                I've created {numerator}/{denominator}ths
              </Button>
            </div>
            {isIncorrect && (
              <div className="mx-auto flex items-center justify-center mt-4 rounded-lg border border-red-300 p-2">
                <span className="text-red-400 text-2xl">Keep dragging the blocks</span>
              </div>
            )}
          </div>
        </>
      )}
      {step === 4 && (
        <div>
          <div className="text-center text-3xl mt-8 space-y-2">
            <span>How many holders can you fill completely with green legos?</span>
          </div>
          <div className="text-4xl font-bold text-center m-8">
            <Input 
              type="text" 
              value={answer1} 
              placeholder="?"
              onChange={(e) => setAnswer1(e.target.value)}
              className="w-16 h-16 text-center shadow-[-5px_5px_0px_black] border-4 border-black rounded-md"
            />
          </div>
          <div className="text-center text-3xl mt-8 space-y-2">
            <span>How many green legos will be left over?</span>
          </div>
          <div className="text-4xl font-bold text-center m-8">
            <Input 
              type="text" 
              value={answer2} 
              placeholder="?"
              onChange={(e) => setAnswer2(e.target.value)}
              className="w-16 h-16 text-center shadow-[-5px_5px_0px_black] border-4 border-black rounded-md"
            />
          </div>
          <div className="flex justify-center mt-4 mb-16">
            <Button 
              className="text-white px-6 py-3 mx-2 shadow-lg text-xl rounded-none" 
              style={{ backgroundColor: isVerifiedFalse ? COLORS.red : COLORS.blue }}
              onClick={verifyAnswer}
            >
              Let's verify
            </Button>
          </div>
        </div>
      )}
      {step === 6 && (
        <>
          <div className="flex justify-center mt-4 items-center space-x-4">
            <div className="bg-white py-2 inline-flex flex-col items-center text-3xl">
              <span>{numerator}</span>
              <div className="w-4 h-px bg-black" />
              <span>{denominator}</span>
            </div>
            <span className="text-3xl">th is the same as</span>
            <span className="text-3xl text-purple-500">1 (whole)</span>
            <span className="text-3xl"> and </span>
            <div className="bg-white py-2 inline-flex flex-col items-center text-3xl text-green-500">
              <span>{numerator % denominator}</span>
              <div className="w-4 h-px bg-black" />
              <span>{denominator}</span>
            </div>
            <span className="text-3xl">th</span>
          </div>
          <FinalAnswer numerator={numerator} denominator={denominator} nextStep={() => nextStep('first', setGameStateRef)} />
        </>
      )}
    </div>
  );
};


export default function FirstScreen({sendAdminMessage}: GameProps) {
    const { gameStateRef } = useGameState();
    const { fraction, step } = gameStateRef.current.state1;
    const hasGameStartedRef = useRef(false);

    useEffect(() => {
      if (!hasGameStartedRef.current && step === 0) {
        hasGameStartedRef.current = true;
        sendAdminMessage('agent', "Let’s build something fun! We’ll use legos to understand mixed numbers. Ready to start?");

        setTimeout(() => {
          sendAdminMessage('agent', "Click Start to proceed");
        }, 7000);
      } else if (step === 1) {
        sendAdminMessage('agent', `Which holder would you choose to make groups of ${fraction.denominator}?`);

        setTimeout(() => {
          sendAdminMessage('agent', "A hint: Look at the denominator");
        }, 7000);
      } else if (step === 2) {
        sendAdminMessage('agent', `Alright, builder! Drag the 1/${fraction.denominator}th sized green block and copy it until you make ${fraction.numerator}/${fraction.denominator}ths! Keep watching the counter at the top`);
      } else if (step === 4) {
        sendAdminMessage('agent', `We have ${fraction.numerator}/${fraction.denominator}ths now! How many holders you think you can fill completely?`);
      } else if (step === 5) {
        sendAdminMessage('agent', `Let's drag the legos and drop them in the holder!`);
      } else if (step === 6) {
        sendAdminMessage('agent', "Now let’s connect the math! Quotient goes in the purple box. Remainder in the green box.");
      }
    }, [step]);

    return (
      <div className="mx-auto">
        {step > 0 && <Header fraction={fraction} />}
        <MainContent />
        {step <= 6 && step > 0 && (
          <div className="flex items-center justify-center">
            <LegoGame sendAdminMessage={sendAdminMessage} />
          </div>
        )}
        <Footer sendAdminMessage={sendAdminMessage} />
      </div>
    )
  }