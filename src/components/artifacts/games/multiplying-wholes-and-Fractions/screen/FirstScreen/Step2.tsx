import { useEffect, useState } from "react";
import FractionHeader from "../../components/fractionheader";
import StepCreateBox from "../../components/stepcreatebox";
import { useGameState } from "../../state-utils";
import SuccessAnimation from '@/components/artifacts/utils/success-animate';
import Bar from "../../components/bar";
import { goToScreen } from "../../utils/helper";

export default function Screen1Step2() {

  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction, whole } = gameStateRef.current.state1;
  const [bar, setBar] = useState(0);
  

  useEffect(() => {
    if (bar === fraction.numerator * whole) {
      setTimeout(() => {
        goToScreen('second', setGameStateRef);
      }, 4000)
    }
  }, [bar])

  return (
    <div className="flex flex-col min-h-screen">
      <FractionHeader level={1} whole={whole} numerator={fraction.numerator} denominator={fraction.denominator}/>
      <StepCreateBox step={2} numerator={fraction.numerator} denominator={fraction.denominator} heading={"MULTIPLY BY WHOLES"} />

      <div className="flex max-w-screen-md my-4 mx-auto w-full justify-center items-center min-w-52">
        <Bar denominator={fraction.denominator} numerator={fraction.numerator} />
        <div className="flex flex-col items-center justify-center content-center text-4xl leading-none text-black border-4 border-[#b9550b] px-4 ml-8">
          <div className="p-2 border-b-2 border-black">{fraction.numerator}</div>
          <div className="p-2">{fraction.denominator}</div>
        </div>
      </div>

      <div className="my-12 bg-[#fff0e5] p-10">
        <div className="flex justify-center items-center gap-4 text-4xl text-black">
          <div>Pick</div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-center p-2 px-4 border-2 bg-white border-black rounded-md leading-none">1</div>
            <div className="px-8 my-2 border border-black h-0 leading-none"></div>
            <div className="p-2 px-4 border-2 bg-white rounded-md border-black leading-none">{fraction.denominator}</div>
          </div>
          <div>Pieces</div>
          <div className="p-2 px-4 bg-white border-2 border-black rounded-md">{fraction.numerator * whole}</div>
          <div>times</div>
        </div>

        <div className="display flex justify-center items-center gap-6 text-black text-4xl leading-none mx-auto my-10">
          <div className="flex text-center">{fraction.numerator * whole} times</div>
          <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b]  px-4 leading-none">
            <div className="p-2 border-b-2 border-black">1</div>
            <div className="p-2">{fraction.denominator}</div>
          </div>
          <div className="w-[60%]">
            <Bar denominator={fraction.denominator} numerator={0}
              handlePieceClick={(index) => {
                setBar(index);
              }} />
          </div>
          <div>=</div>
          {bar === fraction.numerator * whole ? <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
            <div className="p-2 border-b-2 border-black">{fraction.numerator * whole}</div>
            <div className="p-2">{fraction.denominator}</div>
          </div> :
          <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
            <div className="p-2 border-b-2 border-black">?</div>
            <div className="p-2">?</div>
          </div>}
        </div>
      </div>

      {bar != fraction.numerator * whole && <div className="mx-auto shadow-[-3px_3px_0px_0px_rgba(0,0,0)] bg-[#b9550b] p-6 leading-none text-4xl text-white text-center my-8">
        LISTEN TO THE HINT 🔊
      </div>}

      {bar === fraction.numerator * whole && <SuccessAnimation />}

    </div>
  )
}