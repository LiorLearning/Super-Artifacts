import { BaseProps } from "../../utils/types";
import practicebg from '../../assets/practicebg.png'
import { useGameState } from "../../state-utils";
import { useEffect, useRef, useState } from "react";
import { NewInput } from "@/components/ui/newinput";

export default function Step2({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { number1, number2 } = gameStateRef.current.state1;
  const hasGameStartedRef = useRef(false);
  
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [showFirstCircle, setShowFirstCircle] = useState(false);
  const [showSecondCircle, setShowSecondCircle] = useState(false);
  const [narrationComplete, setNarrationComplete] = useState(false);
  const answer1Ref = useRef<HTMLInputElement>(null);
  const answer2Ref = useRef<HTMLInputElement>(null);
  const [isSecondInputCorrect, setIsSecondInputCorrect] = useState(false);
  const [isFirstInputWrong, setIsFirstInputWrong] = useState(false);
  const [isSecondInputWrong, setIsSecondInputWrong] = useState(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', "Let's look at the right side numbers.");
    }
  }, []);

  // Separate effect for circle animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstCircle(true);
      // Start narration after circle appears
      sendAdminMessage('agent', "Now let's solve this multiplication step by step.").then(() => {
        setNarrationComplete(true);
        answer2Ref.current?.focus();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const correctAnswer = (number1 * number2).toString();

  const getInputBgColor = (isCorrect: boolean, isWrong: boolean) => {
    if (isCorrect) return 'bg-green-500';
    if (isWrong) return 'bg-red-500';
    return 'bg-[#FF8800]/90';
  };

  return (
    <div className="min-h-screen overflow-hidden flex flex-col items-center justify-center" 
         style={{ backgroundImage: `url(${practicebg.src})`, backgroundSize: '100% 100%', backgroundPosition: 'center' }}>
      
      <div className="flex flex-col items-center gap-[1vh] relative">
        {/* First Circle Animation - for 2 and 4 */}
        {showFirstCircle && !isSecondInputCorrect && (
          <svg 
            className="absolute -right-[2vh] top-0 w-[14vh] h-[18vh]"
            viewBox="0 0 100 140"
          >
            <path 
              d="M 80 20 Q 100 60, 80 120 Q 60 140, 40 120 Q 20 100, 40 20 Q 60 0, 80 20"
              className="animate-drawCircle"
              style={{ 
                fill: 'none',
                stroke: '#23486A',
                strokeWidth: '4',
              }}
            />
          </svg>
        )}

        {/* Second Circle Animation - diagonal line for 1 and 4 */}
        {showSecondCircle && (
          <svg 
            className="absolute left-0 top-0 w-[21vh] h-[18vh]"
            viewBox="0 0 100 140"
          >
            <path 
              d="M 20 20 L 80 120"
              className="animate-drawCircle"
              style={{ 
                fill: 'none',
                stroke: '#23486A',
                strokeWidth: '4',
                strokeLinecap: 'round'
              }}
            />
          </svg>
        )}

        {/* First Row */}
        <div className="flex gap-[1vh]">
          <div className={`w-[10vh] h-[8vh] bg-white flex items-center justify-center text-[4vh] transition-opacity duration-300 ${!isSecondInputCorrect ? 'opacity-50' : ''}`}>1</div>
          <div className={`w-[10vh] h-[8vh] bg-white flex items-center justify-center text-[4vh] transition-opacity duration-300 ${isSecondInputCorrect ? 'opacity-50' : ''}`}>2</div>
        </div>
        
        {/* Second Row */}
        <div className="flex gap-[1vh]">
          <div className="w-[10vh] h-[8vh] flex items-center justify-center text-[4vh]">x</div>
          <div className="w-[10vh] h-[8vh] bg-white flex items-center justify-center text-[4vh]">4</div>
        </div>

        {/* Line */}
        <div className="w-[21vh] h-[0.3vh] bg-black my-[0.5vh]"></div>
        
        {/* Input Boxes */}
        <div className="flex gap-[1vh]">
          <NewInput
            value={answer1}
            correctValue={correctAnswer}
            onValueChange={(value) => {
              setAnswer1(value);
              setIsFirstInputWrong(false);
            }}
            placeholder="?"
            className={`w-[10vh] h-[8vh] ${getInputBgColor(false, isFirstInputWrong)} text-white text-[4vh] text-center outline-none transition-colors duration-300 ${!isSecondInputCorrect ? 'opacity-50' : ''}`}
            ref={answer1Ref}
            disabled={!isSecondInputCorrect}
            onCorrect={() => {
              setGameStateRef(prevState => ({
                ...prevState,
                state1: {
                  ...prevState.state1,
                  step: 3
                }
              }));
            }}
            onIncorrect={(attempt) => {
              setIsFirstInputWrong(true);
              sendAdminMessage('admin', `Let's try again. What is 1 × 4?`);
            }}
          />
          <NewInput
            value={answer2}
            correctValue={(4 * 2).toString()}
            onValueChange={(value) => {
              setAnswer2(value);
              setIsSecondInputWrong(false);
            }}
            placeholder="?"
            className={`w-[10vh] h-[8vh] ${getInputBgColor(isSecondInputCorrect, isSecondInputWrong)} text-white text-[4vh] text-center outline-none transition-colors duration-300 ${!narrationComplete ? 'opacity-50' : ''}`}
            ref={answer2Ref}
            onCorrect={() => {
              setIsSecondInputCorrect(true);
              setShowFirstCircle(false);
              setTimeout(() => {
                setShowSecondCircle(true);
                answer1Ref.current?.focus();
              }, 500);
            }}
            onIncorrect={(attempt) => {
              setIsSecondInputWrong(true);
              sendAdminMessage('admin', `Let's try again. What is 4 × 2?`);
            }}
          />
        </div>
      </div>

    </div>
  );
}

// Add this to your global CSS or tailwind config
const styles = `
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
`;
