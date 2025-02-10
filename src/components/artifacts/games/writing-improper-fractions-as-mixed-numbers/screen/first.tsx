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
import { GameProps } from '../../addition-within-20-using-ten-frames/components/types';
import { Statement } from '../components/statement';

const MainContent = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction, piecesAtYOne } = gameStateRef.current.state1;
  const numerator = fraction.numerator;
  const denominator = fraction.denominator;

  const color = step <= 3 ? COLORS.pink : step <= 6 ? COLORS.blue : COLORS.purple;
  const stepNumber = step <= 3 ? 1 : step <= 6 ? 2 : 3;
  const stepText = step <= 6 ? 'FILL THE BLOCKS IN THE HOLDERS' : 'THE ANSWER';

  const nextScreen = () => {
    setGameStateRef(prev => ({ ...prev, screen: 2 }));
  };

  return (
    <div className="flex flex-col m-4">
      {step === 0 && (
        <FirstQuestion fraction={fraction} onNext={() => nextStep(1, setGameStateRef)} />
      )}
      {step > 0 && (
        <StepModule screen={step <= 3 ? 1 : 2} color={color} stepNumber={stepNumber} numerator={numerator} denominator={denominator} stepText={stepText} />
      )}
      {step === 3 && (
        <Statement numerator={numerator} denominator={denominator} count={numerator} />
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

  const showStep6Ans = useRef(false);

  const verifyAnswer = () => {
    if (answer1 !== '' && answer2 !== '') {
      goToStep(1, setGameStateRef, 5);
    }
  }

  const handleDoneClick = () => {
    if (numerator === piecesAtYOne) {
      setIsIncorrect(false);
      // sendAdminMessage('agent', `Woohoo! You built ${numerator}/${denominator}th perfectly! Now let’s see what happens next!`);
      goToStep(1, setGameStateRef, 3);
    } else {
      setIsIncorrect(true);
      // sendAdminMessage('agent', "Hmmm, let's give that another try!");
      sendAdminMessage('admin', `User has dragged ${piecesAtYOne} blocks but we need ${numerator} blocks to make ${fraction.numerator}/${fraction.denominator}th! Diagnosis socratically to ask how many blocks to drag in or out`);
    }
  };

  useEffect(() => {
    const integer = Math.floor(numerator / denominator);
    if (answer1 === integer.toString()) {
      sendAdminMessage('agent', `And how many green legos will be left over?`);
    }
  }, [answer1]);

  useEffect(() => {
    if (step === 6) {
      setTimeout(() => {
        sendAdminMessage('agent', "Now let's connect the math by filling in the boxes!");
        showStep6Ans.current = true;
      }, 7000);
    }
  }, [step])

  return (
    <div className="relative">
      {step === 1 && (
        <div className="flex flex-col items-center justify-center">
          <ChooseHolder
            sendAdminMessage={sendAdminMessage}
            answer={denominator}
            denomOptions={denomOptions}
            onSuccess={() => {nextStep(1, setGameStateRef)}}
          />
          <div className="text-center text-3xl mt-8 space-y-2">
            <span>Which holder can hold groups of {denominator}</span>
          </div>
        </div>
      )}
      {step === 2 && (
        <>
          <div className="flex justify-center mt-4 items-center space-x-4">
            <Statement numerator={numerator} denominator={denominator} count={piecesAtYOne} />
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
              className="text-white px-6 py-3 mx-2 text-xl rounded-none shadow-[-5px_5px_0px_black]" 
              onClick={verifyAnswer}
              style={{
                backgroundColor: COLORS.pink,
              }}
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
          {showStep6Ans.current && <FinalAnswer numerator={numerator} denominator={denominator} nextStep={() => nextStep(1, setGameStateRef)} sendAdminMessage={sendAdminMessage} />}
        </>
      )}
    </div>
  );
};


export default function FirstScreen({sendAdminMessage}: GameProps) {
    const { gameStateRef, setGameStateRef } = useGameState();
    const { fraction, step } = gameStateRef.current.state1;
    const hasGameStartedRef = useRef(false);

    useEffect(() => {
      if (!hasGameStartedRef.current && step === 0) {
        hasGameStartedRef.current = true;
        // sendAdminMessage('agent', "Let’s build something fun! We’ll use legos to understand mixed numbers. Ready to start?");
      } else if (step === 1) {
        sendAdminMessage('agent', `Which holder would you choose to make groups of ${fraction.denominator}?`);
      } else if (step === 2) {
        // sendAdminMessage('agent', `Alright, builder! That was correct, let's create fresh legos by copying and dragging the green one. Our mission is to make ${fraction.numerator}/${fraction.denominator}th!`);
        sendAdminMessage('agent', `Alright, builder, let's create fresh legos by copying and dragging the green one. Our mission is to make ${fraction.numerator}/${fraction.denominator}th!`);
      } else if (step === 3) {
        nextStep(1, setGameStateRef);
      } else if (step === 4) {
        sendAdminMessage('agent', `Amazing, now that we have ${fraction.numerator}/${fraction.denominator}th, how many holders can you fill with green legos?`);
      } else if (step === 5) {
        sendAdminMessage('agent', `Let's find out if your guess is correct. Start by dropping the legos in the holder.`);
      } else if (step === 6) {
        // sendAdminMessage('agent', `This is exactly what happens when you divide ${fraction.numerator} by ${fraction.denominator}: ${Math.floor(fraction.numerator / fraction.denominator)} whole and ${fraction.numerator % fraction.denominator}/${fraction.denominator}th left!`);
        sendAdminMessage('agent', `Awesome! ${fraction.numerator}/${fraction.denominator}th gives you ${Math.floor(fraction.numerator / fraction.denominator)} whole and ${fraction.numerator % fraction.denominator}/${fraction.denominator}th left!`);
      }
    }, [step]);

    return (
      <div className="mx-auto">
        {step > 0 && <Header fraction={fraction} />}
        <MainContent />
        {step <= 6 && step > 0 && (
          <div className={`flex items-center justify-center ${(step === 4 || step === 3) ? 'opacity-50 pointer-events-none' : ''}`}>
            <LegoGame sendAdminMessage={sendAdminMessage} />
          </div>
        )}
        <Footer sendAdminMessage={sendAdminMessage} />
      </div>
    )
  }