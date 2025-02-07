import { useState, useEffect, useRef } from "react";
import NewInput from '@/components/ui/newinput';
import { BaseProps } from "../utils/types";

interface SolveQuestionBoxProps extends BaseProps {
  whole: number;
  numerator: number;
  denominator: number;
  lastquestion: boolean;
  onCorrectAnswer: () => void;
}

export default function SolveQuestionBox({ whole, numerator, denominator, lastquestion, onCorrectAnswer, sendAdminMessage }: SolveQuestionBoxProps) {
  const [hint, setHint] = useState<boolean>(false);
  const [complete, setIsComplete] = useState<boolean>(false)
  const hintValue = useRef(0)
  const [inputs, setInputs] = useState({
    numerator: '',
    denominator: ''
  });
  const [isCorrect, setIsCorrect] = useState(false);

  const onIncorrectAnswer = () => {

    if (!hint) {
      if (hintValue.current < 1)
        sendAdminMessage('agent', `Oops! That’s not quite right. You can use HINT! 🤔💡`)
      hintValue.current += 1;
    } else
      sendAdminMessage('admin', `User answered incprrectly, correct answer is ${whole * numerator}/${denominator} but user answered ${inputs.numerator}/${inputs.denominator}, Now find the difference between the user input and the correct answer and then tell the correct answer accordingly. Diagonise socratically.`);
  }

  const onIncorrect = (attempt: string, correctAnswer: string, inputType: string) => {

    if (!hint) {
      if (hintValue.current < 1)
        sendAdminMessage('agent', `Oops! That’s not quite right. You can use HINT! 🤔💡`)
      hintValue.current += 1;
    } else {
      const diff = parseInt(attempt) - parseInt(correctAnswer);

      switch (inputType) {
        case 'numerator':
          if (diff > 0) {
            sendAdminMessage('agent', `${attempt} is too high! When we multiply ${whole} × ${numerator}, we get a smaller number. Try again! 🔄`);
          } else {
            sendAdminMessage('agent', `${attempt} is too low! When we multiply ${whole} × ${numerator}, we get a larger number. Try again! 🔄`);
          }
          break;
        case 'denominator':
          sendAdminMessage('agent', `Remember, the denominator stays the same when multiplying by a whole number! Try again! 🎯`);
          break;
      }
    }
  };

  useEffect(() => {
    if (inputs.numerator === (whole * numerator).toString() &&
      inputs.denominator === denominator.toString()) {
      setIsCorrect(true);

      if (!lastquestion) {
        setTimeout(() => {
          onCorrectAnswer();
          setInputs({ numerator: '', denominator: '' });
          setHint(false);
          hintValue.current = 0;
          setIsCorrect(false);
        }, 1000);
      } else {
        setTimeout(() => {
          onCorrectAnswer();
          setHint(false);
          setIsCorrect(false);
          setIsComplete(true);
          hintValue.current = 0;
        }, 1000);
      }
    }
  }, [inputs, , lastquestion]);

  useEffect(() => {
    (document.querySelector('[id="numerator-input"]') as HTMLElement)?.focus();
  }, [whole, numerator, denominator])

  const inputStyling = "w-12 p-2 text-center outline-none transition-colors duration-300";

  return (
    <div className={`flex flex-col justify-center items-center my-12 transition-opacity duration-500 ${isCorrect ? 'opacity-50' : 'opacity-100'}`}>
      <div className="text-black text-3xl text-center p-6">SOLVE THIS</div>

      <div className="bg-[#b9550b] text-black text-2xl leading-none flex items-center gap-4 p-4 px-8 m-4 rounded-md shadow-[-4px_4px_0px_0px_rgba(0,0,0)]">
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
          <NewInput
            value={inputs.numerator}
            id='numerator-input'
            onValueChange={(value) => !isCorrect && setInputs(prev => ({ ...prev, numerator: value }))}
            correctValue={(whole * numerator).toString()}
            useColor={true}
            nthIncorrect={2}
            placeholder="?"
            className={inputStyling}
            onCorrect={() => {
              if (inputs.denominator === denominator.toString()) {
                setIsCorrect(true);
              } else {
                (document.querySelector('[id="denominator-input"]') as HTMLElement)?.focus();
              }
            }}
            onIncorrect={(attempt, correctAnswer) => onIncorrect(attempt, correctAnswer, 'numerator')}
          />
          <div className="border-t-2 border-black w-full h-0"></div>
          <NewInput
            id="denominator-input"
            value={inputs.denominator}
            onValueChange={(value) => !isCorrect && setInputs(prev => ({ ...prev, denominator: value }))}
            correctValue={denominator.toString()}
            useColor={true}
            nthIncorrect={2}
            placeholder="?"
            className={inputStyling}
            onCorrect={() => {
              if (inputs.numerator === (whole * numerator).toString()) {
                setIsCorrect(true);
              }
            }}
            onIncorrect={(attempt, correctAnswer) => onIncorrect(attempt, correctAnswer, 'denominator')}
          />
        </div>
      </div>

      <div
        className={`bg-[#b9550b] text-white text-2xl leading-none py-5 px-6 shadow-[-4px_4px_0px_0px_rgba(0,0,0)] cursor-pointer m-10 transition-opacity duration-300 ${isCorrect ? 'opacity-50' : 'hover:opacity-90'}`}
        onClick={() => !isCorrect && setHint(prev => !prev)}
      >
        {complete ? `That's right! 👍` : (hint ? `GO BACK <<` : `NEED A HINT ?`)}
      </div>
    </div>
  );
}