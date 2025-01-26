import React, { useState } from 'react';
import { COLORS } from '../screen/constants';
import { goToStep } from '../utils/helper';
import { useGameState } from '../state-utils';
import { GameProps } from '../utils/types';

interface AnswerContentProps extends GameProps {
  numerator: number;
  denominator: number;
  showFull: boolean;
}

const AnswerContent: React.FC<AnswerContentProps> = ({
  numerator,
  denominator,
  showFull,
  sendAdminMessage,
}) => {
  const { setGameStateRef } = useGameState();
  const [whole, setWhole] = useState(showFull ? Math.floor(numerator / denominator).toString() : '');
  const [remainder, setRemainder] = useState(showFull ? (numerator % denominator).toString() : '');

  const onDone = () => {
    const expectedRemainder = numerator % denominator;
    const expectedWhole = Math.floor(numerator / denominator);
    if (parseInt(remainder) === expectedRemainder && parseInt(whole) === expectedWhole) {
      sendAdminMessage('agent', `Aren't you a math explorer! Correct answer`);
      goToStep(2, setGameStateRef, 6);
    } else {
      sendAdminMessage('agent', `Here's how the legos will look when arranged, can you answer now?`);
      goToStep(2, setGameStateRef, 5);
      setWhole('');
      setRemainder('');
    }
  }

  
  return (
    <div className="flex flex-col gap-16 p-4 w-[80%] mx-auto">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4">
        <div className="bg-[#F7FFAC] p-6 rounded-2xl flex flex-col items-center gap-6 h-[250px]">
          <div className="bg-[#DDF500] w-full text-center py-4 rounded-xl font-bold text-2xl">FRACTION</div>
          <div className="text-4xl font-bold pb-4 flex-grow flex items-center justify-center">{`${numerator} ÷ ${denominator}`}</div>
        </div>

        <div className="text-4xl font-bold">=</div>

        <div className="bg-[#f5e6ff] p-6 rounded-2xl flex flex-col items-center gap-6 h-[250px]">
          <div className="bg-[#921FFD] w-full text-center py-4 rounded-xl font-bold text-2xl text-white">WHOLES</div>
          <div className="relative flex-grow flex items-center justify-center">
            <input 
              type="text" 
              value={whole}
              onChange={(e) => setWhole(e.target.value)}
              className="w-[80px] h-[80px] bg-white border-4 border-[#c17dff] rounded-xl text-center text-4xl shadow-[-5px_5px_0px_rgba(0,0,0,1)]" 
            />
            <div className="absolute inset-0 border-4 border-black rounded-xl translate-x-1 translate-y-1 -z-10" />
          </div>
        </div>

        <div className="text-4xl font-bold invisible">=</div>

        <div className="bg-[#D1FFDF] p-6 rounded-2xl flex flex-col items-center gap-6 h-[250px]">
          <div className="bg-[#18AF48] w-full text-center py-4 rounded-xl font-bold text-2xl text-white">REMAINDER</div>
          <div className="relative flex-grow flex items-center justify-center">
            <input 
              type="text" 
              value={remainder}
              onChange={(e) => setRemainder(e.target.value)}
              className="w-[80px] h-[80px] bg-white border-4 border-[#4caf50] rounded-xl text-center text-4xl shadow-[-5px_5px_0px_rgba(0,0,0,1)]" 
            />
            <div className="absolute inset-0 border-4 border-black rounded-xl translate-x-1 translate-y-1 -z-10" />
          </div>
        </div>
      </div>

      <button 
        onClick={onDone} 
        className="text-white px-8 py-3 text-xl font-bold self-center hover:opacity-90 shadow-[-5px_5px_0px_rgba(0,0,0,1)]"
        style={{ backgroundColor: COLORS.pink }}
      >
        DONE !
      </button>
    </div>
  );
};

export default AnswerContent;