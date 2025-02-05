import { useState, useEffect } from "react";

interface SolveQuestionBoxProps {
  whole: number;
  numerator: number;
  denominator: number;
  lastquestion: boolean;
  onCorrectAnswer: () => void;
}

export default function SolveQuestionBox({ whole, numerator, denominator, lastquestion, onCorrectAnswer }: SolveQuestionBoxProps) {
  const [hint, setHint] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    numerator: '',
    denominator: ''
  });
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const correctNumerator = (whole * numerator).toString();
    const correctDenominator = denominator.toString();

    if (inputs.numerator === correctNumerator && inputs.denominator === correctDenominator) {
      setIsCorrect(true);

      if(!lastquestion) {
        setTimeout(() => {
          onCorrectAnswer();
          setInputs({ numerator: '', denominator: '' });
          setHint(false);
          setIsCorrect(false);
        }, 1000);
      } else {
        setTimeout(() => {
          onCorrectAnswer();
          setIsCorrect(false);
          setHint(false);
        }, 1000);
      }
    }
  }, [inputs, whole, numerator, denominator]);

  return (
    <div className={`flex flex-col justify-center items-center my-12 transition-opacity duration-500 ${isCorrect ? 'opacity-50' : 'opacity-100'}`}>
      <div className="text-black text-4xl text-center p-6">SOLVE THIS</div>

      <div className="bg-[#b9550b] text-black text-4xl leading-none flex items-center gap-4 p-6 px-16 m-4 rounded-md shadow-[-4px_4px_0px_0px_rgba(0,0,0)]">
        <div className="p-2 px-4 bg-white">{whole}</div>
        <div className="text-white">x</div>
        <div className="bg-white flex flex-col justify-center items-center p-2 px-4">
          <div className="p-2">{numerator}</div>
          <div className="border-t-2 border-black p-2">{denominator}</div>
        </div>
        {hint &&
          <>
            <div className="text-white">=</div>
            <div className="flex flex-col justify-center items-center p-2">
              <div className="bg-white p-2 px-4 my-2">{whole} x {numerator}</div>
              <div className="border-t-2 border-white w-full text-center p-2 text-white">{denominator}</div>
            </div>
          </>
        }
        <div className="text-white">=</div>
        <div className="flex flex-col justify-center items-center bg-white p-2">
          <input
            type="text"
            placeholder="?"
            value={inputs.numerator}
            disabled={isCorrect}
            className="w-12 p-2 text-center outline-none transition-colors duration-300"
            onChange={(e) => !isCorrect && setInputs(prev => ({ ...prev, numerator: e.target.value }))}
          />
          <div className="border-t-2 border-black w-full h-0"></div>
          <input
            type="text"
            placeholder="?"
            value={inputs.denominator}
            disabled={isCorrect}
            className="w-12 p-2 text-center outline-none transition-colors duration-300"
            onChange={(e) => !isCorrect && setInputs(prev => ({ ...prev, denominator: e.target.value }))}
          />
        </div>
      </div>

      <div 
        className={`bg-[#b9550b] text-white text-4xl leading-none py-5 px-6 shadow-[-4px_4px_0px_0px_rgba(0,0,0)] cursor-pointer m-10 transition-opacity duration-300 ${isCorrect ? 'opacity-50' : 'hover:opacity-90'}`}
        onClick={() => !isCorrect && setHint(prev => !prev)}
      >
        NEED A HINT ?
      </div>
    </div>
  );
}