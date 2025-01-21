import { useEffect, useRef, useState } from "react";
import { useGameState } from "../../state-utils";
import { Input } from "@/components/custom_ui/input";
import { Button } from "@/components/custom_ui/button";
import { goToStep, nextStep } from "../../utils/helper";
import { GameProps } from "../../utils/types";

// Footer components
export const VerifyPiecesAndDivisions = ({sendAdminMessage}: GameProps) => {
  const { setGameStateRef } = useGameState();
  const [answer, setAnswer] = useState({numLego: '', numDiv: ''});
  const [show2ndQues, setShow2ndQues] = useState(false);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  }

  const onChangeNumLego = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const prev = answer.numLego;
    setAnswer(prev => ({ ...prev, numLego: value }));
    if (value != '' && prev === '') {
      setShow2ndQues(true);
      sendAdminMessage('agent', `And how many green legos will be left over?`);
      scrollToBottom();
    }
  }

  const onChangeNumDiv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const prev = answer.numDiv;
    setAnswer(prev => ({ ...prev, numDiv: value }));
    if (value != '' && prev === '') {
      setShowNextSteps(true);
      sendAdminMessage('agent', `We got your guesses, now how do you want to verify your answer? It's upto you lego builder!`);
      scrollToBottom();
    }
  }

  
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="flex flex-row items-center mb-8">
        <label className="text-4xl mr-4 max-w-lg break-words">How many holders can you fill completely with green legos?</label>
        <Input 
          type="text" 
          placeholder="?"
          className="w-16 h-16 text-center border-4 border-black text-4xl shadow-[-3px_3px_0px_0px_rgba(0,0,0,1)] rounded-md"
          value={answer.numLego}
          onChange={onChangeNumLego}
        />
      </div>
      {show2ndQues && (
        <>
          <div className="w-[40%] h-0.5 bg-gray-500 my-2" />
          <div className="flex flex-row items-center m-8">
            <label className="text-4xl mr-4 max-w-lg break-words">How many green legos will be left over?</label>
        <Input 
          type="text" 
          placeholder="?"
          className="w-16 h-16 text-center border-4 border-black text-4xl shadow-[-3px_3px_0px_0px_rgba(0,0,0,1)] rounded-md"
          value={answer.numDiv}
          onChange={onChangeNumDiv}
            />
          </div>
        </>
      )}
      {showNextSteps && (
        <div className="flex flex-col items-center justify-center m-16 bg-pink-100 w-screen">
          <div className="flex justify-center m-4">
            <div className="flex flex-col items-center">
              <label className="text-4xl my-4">How do you want to verify your answer?</label>
            <Button 
              className="bg-pink-500 text-white px-6 py-1 w-72 text-3xl rounded-none shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] my-2"
              onClick={() => {
                goToStep('second', setGameStateRef, 4)
              }}
            >
              I want to VISUALIZE
            </Button>
            <Button 
              className="bg-pink-500 text-white px-6 py-1 w-72 text-3xl rounded-none shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] my-2 mb-8"
              onClick={() => {
                sendAdminMessage('agent', `As you say! Here’s how it looks: ${answer.numLego} holders are full, and 1 is partly filled!`);
                goToStep('second', setGameStateRef, 6)
              }}
            >
              I can DIVIDE!
            </Button>
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}

// export const ChooseHolder = () => {
//   const { gameStateRef, setGameStateRef } = useGameState();
//   const { denomOptions, fraction } = gameStateRef.current.state2;


//   const handleDenomOptionClick = (option: number) => {
//     if (option === fraction.denominator) {
//       setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
//     } else {
//       // TODO: Show error message
//     }
//   };


//   return (
//     <div className="flex flex-col items-center justify-center mt-4 space-y-2">
//       <div className="flex justify-center space-x-4">
//         {denomOptions.map((option, index) => (
//           <Button 
//             key={index} 
//             className="bg-blue-500 text-white px-4 py-2 text-xl rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md"
//             onClick={() => handleDenomOptionClick(option)}
//           >
//             {option}
//           </Button>
//         ))}
//       </div>
//       <div className="text-center">
//         <span className="text-3xl font-bold block mb-2">Now choose the holder</span>
//         <span className="text-2xl text-gray-600">Hint: Number of Divisions should be same as denominator</span>
//       </div>
//     </div>
//   )
// }

export const CreateBlocks = ({sendAdminMessage}: GameProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction } = gameStateRef.current.state2;
  const denominator = fraction.denominator;
  const numerator = fraction.numerator;
  
  const [answer, setAnswer] = useState({count: '', numerator: '', denominator: ''});

  const verifyMixedFraction = () => {
    const answerNumerator = parseInt(answer.count) * parseInt(answer.numerator);
    const answerDenominator = parseInt(answer.denominator);
    if (answerNumerator === numerator && answerDenominator === denominator) {
      sendAdminMessage('agent', `Great! We need ${answerNumerator} legos, each sized 1/${answerDenominator}. Let’s create them!`);
      nextStep('second', setGameStateRef);
    } else if (answerNumerator !== numerator) {
      sendAdminMessage('agent', `Hmm, how many legos do you think we need to make ${numerator}/${denominator}?`);
    } else if (answerDenominator !== denominator) {
      sendAdminMessage('agent', `Remember, each lego matches the denominator. What’s the size of each piece?`);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-4 items-center space-x-4">
        <span className="text-3xl">I need </span>
        <div className="text-3xl font-bold text-center">
          <Input 
              type="text" 
              value={answer.count} 
              placeholder="?"
              onChange={(e) => setAnswer(prev => ({ ...prev, count: e.target.value }))}
              className="w-12 text-3xl text-center border-2 border-black"
            />
        </div>
        <span className="text-3xl"> legos X size </span>
        <div className="text-3xl font-bold text-center">
          <Input 
            type="text" 
            value={answer.numerator} 
            placeholder="?"
            onChange={(e) => setAnswer(prev => ({ ...prev, numerator: e.target.value }))} 
            className="w-12 text-center border-2 border-black"
          />
          <div className="w-full h-px bg-black my-2" />
          <Input 
            type="text" 
            value={answer.denominator}
            placeholder="?"
            onChange={(e) => setAnswer(prev => ({ ...prev, denominator: e.target.value }))}
            className="w-12 text-center border-2 border-black"
          />
        </div>
        <span className="text-3xl"> to create </span>
        <span className="text-3xl font-bold text-center w-6">
          <span>{numerator}</span>
            <div className="w-full h-px bg-black my-1" />
          <span>{denominator}</span>
        </span>
      </div>

      <div className="flex justify-center mt-4 mb-8">
        <Button className="bg-pink-400 text-white px-6 py-3 mx-2 shadow-lg text-xl rounded-none" onClick={verifyMixedFraction}>
          CREATE
        </Button>
      </div>
    </>
  )
}