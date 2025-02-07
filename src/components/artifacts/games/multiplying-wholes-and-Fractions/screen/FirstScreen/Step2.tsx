import { useEffect, useState, useRef } from "react";
import FractionHeader from "../../components/fractionheader";
import StepCreateBox from "../../components/stepcreatebox";
import { useGameState } from "../../state-utils";
import SuccessAnimation from '@/components/artifacts/utils/success-animate';
import Bar from "../../components/bar";
import { goToScreen } from "../../utils/helper";
import { BaseProps } from "../../utils/types";


export default function Screen1Step2({sendAdminMessage} : BaseProps) {

  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction, whole } = gameStateRef.current.state1;
  const [isDoneActive, setIsDoneActive] = useState(false);
  const [bar, setBar] = useState(0);
  const hasStartedRef = useRef(false);
  const [success, setSuccess] = useState(false);
  const ansRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      sendAdminMessage('agent', `Now let's multiply! How many pieces do you think will ${whole * fraction.numerator} times 1/${fraction.denominator} will have? 🎯`);
    }
  }, []);


  function handleDone() {
    if (bar === fraction.numerator * whole) {
      ansRef.current?.scrollIntoView({ behavior: 'smooth' });
      sendAdminMessage('agent', `Perfect! You've selected ${bar} pieces. That means ${whole} times ${fraction.numerator}/${fraction.denominator}th is equal to ${bar}/${fraction.denominator}th 🎉`, () => goToScreen('second', setGameStateRef));
      setSuccess(true);
    } else {
      if (bar < fraction.numerator * whole) {
        sendAdminMessage('agent', `Not quite! You've selected less than the required pieces. We need to select 1/${fraction.denominator} piece ${whole * fraction.numerator} times. Try again! 🔄`);
      } else {
        sendAdminMessage('agent', `Oops! You've picked more pieces than needed. Remember, we need to select 1/${fraction.denominator} piece ${whole * fraction.numerator} times. Give it another shot! 🔄`);
      }
    }
    setIsDoneActive(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <FractionHeader level={1} whole={whole} numerator={fraction.numerator} denominator={fraction.denominator}/>
      <StepCreateBox step={2} numerator={fraction.numerator} denominator={fraction.denominator} heading={"MULTIPLY BY WHOLES"} />

      <div className="flex max-w-screen-md my-4 mx-auto w-[60%] justify-center items-center min-w-52">
        <Bar denominator={fraction.denominator} numerator={fraction.numerator} />
        <div className="flex flex-col items-center justify-center content-center text-2xl leading-none text-black border-4 border-[#b9550b] px-4 ml-8">
          <div className="p-2 border-b-2 border-black">{fraction.numerator}</div>
          <div className="p-2">{fraction.denominator}</div>
        </div>
      </div>

      <div className="my-8 bg-[#fff0e5] p-6 py-8">
        <div className="flex justify-center items-center gap-4 text-2xl text-black">
          <div>Pick</div>
          <div className="flex flex-col items-center justify-center text-2xl">
            <div className="text-center p-2 w-12 px-4 border-2 bg-white border-black rounded-md leading-none">1</div>
            <div className="px-8 my-2 border border-black h-0 leading-none"></div>
            <div className="p-2 px-4 border-2 w-12 bg-white rounded-md border-black leading-none">{fraction.denominator}</div>
          </div>
          <div>Pieces</div>
          <div className="p-2 px-4 bg-white border-2 w-12 border-black leading-none rounded-md">{fraction.numerator * whole}</div>
          <div>times</div>
        </div>

        <div className="display flex justify-center items-center gap-6 text-black text-2xl leading-none mx-auto my-8">
          <div className="flex text-center">{fraction.numerator * whole} times</div>
          <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b]  px-4 leading-none">
            <div className="p-2 border-b-2 border-black">1</div>
            <div className="p-2">{fraction.denominator}</div>
          </div>
          <div className="w-[60%]">
            <Bar denominator={fraction.denominator} numerator={0}
              handlePieceClick={(index) => {
                setBar(index);
                setIsDoneActive(true);
              }} />
          </div>
          <div>=</div>
          <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
            { bar == 0 ? <div className="p-2 border-b-2 border-black">?</div> : <div className="p-2 border-b-2 border-black">{bar}</div>}
            <div className="p-2">{fraction.denominator}</div>
          </div>
        </div>

        <div className={`bg-[#b9550b] text-center mx-auto w-fit text-white text-2xl leading-none p-3 px-12 shadow-[-3px_3px_0px_0px_rgba(0,0,0)] mt-4 cursor-pointer ${!isDoneActive ? 'opacity-50' : ''}`} onClick={handleDone}>DONE</div>
      </div>

      {success && <SuccessAnimation />}

      <div ref={ansRef}>{success && <div className="flex flex-col items-center gap-6 my-4 mb-20 text-2xl leading-none text-white" >
        <div className="text-[#b9550b]">CORRECT! ⭐</div>
        <div className="flex justify-center items-center gap-3 p-4 px-6 bg-[#b9550b] shadow-[-3px_3px_0px_0px_rgba(0,0,0)] rounded-lg">
          <div>{whole}</div>
          <div>times</div>
          <div className="flex flex-col items-center justify-center">
            <div className="border-b-2 px-2 border-white">{fraction.numerator}</div>
            <div>{fraction.denominator}</div>
          </div>
          <div>=</div>
          <div className="flex flex-col items-center justify-center">
            <div className="border-b-2 px-2 border-white">{fraction.numerator * whole}</div>
            <div>{fraction.denominator}</div>
          </div>
        </div>
      </div>}</div>

    </div>
  )
}