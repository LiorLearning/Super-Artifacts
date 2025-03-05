import { BaseProps } from "../../utils/types";
import practicebg from '../../assets/practicebg.png'
import { useGameState } from "../../state-utils";
import { useEffect, useRef, useState } from "react";
import { goToScreen } from "../../utils/helper";
import { GameScreen } from "../../game-state";

export default function Step1({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { number1, number2 } = gameStateRef.current.state1;
  const hasGameStartedRef = useRef(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
    //   sendAdminMessage('agent', `Let's compare the numbers!`);
    }
  }, []);

  const handleOptionClick = (answer: string) => {
    setSelectedOption(answer);
    
    const correctAnswer = number1 > number2 ? 'A' : 
                         number2 > number1 ? 'B' : 'C';

    if (answer === correctAnswer) {
      setTimeout(() => {
        setGameStateRef(prevState => ({
          ...prevState,
          state1: {
            ...prevState.state1,
            step: 2
          }
        }));
      }, 1000);
    } else {
      let message = '';
      if (number1 > number2) {
        message = `${number1} is bigger than ${number2}. Let's try again!`;
      } else if (number2 > number1) {
        message = `${number2} is bigger than ${number1}. Let's try again!`;
      } else {
        message = `${number1} and ${number2} are equal. Let's try again!`;
      }
    //   sendAdminMessage('admin', message);
    }
  };

  const getButtonStyle = (option: string) => {
    if (selectedOption !== option) return "bg-[black]/50";
    return selectedOption === option ? "bg-[#5C9F00]" : "bg-[black]/50";
  };

  return (
    <div className="min-h-screen overflow-hidden flex flex-col items-center justify-center gap-[4vh]" 
         style={{ backgroundImage: `url(${practicebg.src})`, backgroundSize: '100% 100%', backgroundPosition: 'center' }}>
      
      {/* Question Display */}
      <div className="flex items-center justify-center gap-[2vh]">
        <div className="bg-white p-[2vh] px-[4vh]">
          <span className="text-[6vh]">{number1}</span>
        </div>
        
        <span className="text-[6vh]">x</span>
        
        <div className="bg-white p-[2vh] px-[4vh]">
          <span className="text-[6vh]">{number2}</span>
        </div>
      </div>

      {/* Question Text */}
      <div className="text-[4vh]">
        Which is bigger?
      </div>

      {/* Options */}
      <div className="flex flex-col gap-[2vh] items-center w-[50vh]">
        <button 
          onClick={() => handleOptionClick('A')}
          className={`relative ${getButtonStyle('A')} text-white text-[3vh] h-[8vh] rounded-[4vh] w-full flex items-center`}
          disabled={selectedOption !== null}
        >
          <div className="bg-[#407000] h-full aspect-square rounded-full flex items-center justify-center">A</div>
          <div className="flex-1 flex items-center justify-center gap-[2vh]">
            <span className="bg-white text-black px-[2vh] py-[1vh]">{number1}</span>
            <span>is bigger</span>
          </div>
        </button>

        <button 
          onClick={() => handleOptionClick('B')}
          className={`relative ${getButtonStyle('B')} text-white text-[3vh] h-[8vh] rounded-[4vh] w-full flex items-center`}
          disabled={selectedOption !== null}
        >
          <div className="bg-[#407000] h-full aspect-square rounded-full flex items-center justify-center">B</div>
          <div className="flex-1 flex items-center justify-center gap-[2vh]">
            <span className="bg-white text-black px-[2vh] py-[1vh]">{number2}</span>
            <span>is bigger</span>
          </div>
        </button>

        <button 
          onClick={() => handleOptionClick('C')}
          className={`relative ${getButtonStyle('C')} text-white text-[3vh] h-[8vh] rounded-[4vh] w-full flex items-center`}
          disabled={selectedOption !== null}
        >
          <div className="bg-[#407000] h-full aspect-square rounded-full flex items-center justify-center">C</div>
          <div className="flex-1 flex justify-center">
            <span>Both are equal</span>
          </div>
        </button>
      </div>
    </div>
  );
}
