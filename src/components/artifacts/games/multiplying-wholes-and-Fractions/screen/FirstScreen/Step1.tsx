import { useState, useEffect, useRef } from "react";
import { useGameState } from "../../state-utils";
import FractionHeader from "../../components/fractionheader";
import StepCreateBox from "../../components/stepcreatebox";
import ChocolateBar from "../../components/chocolatebar";
import { goToStep } from "../../utils/helper";
import { BaseProps } from "../../utils/types";


export default function Screen1Step1({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction, whole } = gameStateRef.current.state1;
  const [split, setSplit] = useState(true);
  const [nextStep, setNextStep] = useState(false);
  const [canSelect, setCanSelect] = useState(false);
  const [isDoneActive, setIsDoneActive] = useState(false);
  const [bar, setBar] = useState({ numerator: 0, denominator: 1 });

  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent',
        `How would you split this chocolate bar to create 1/5th? 🍫`
      );
    }
  }, []);

  function handleDone() {
    if (!canSelect) {
      if (bar.denominator === fraction.denominator) {  //for spliting
        setSplit(false);
        setCanSelect(true);
        sendAdminMessage('agent', `Awesome! Now select as many pieces as ${fraction.numerator}/${fraction.denominator}ths! And click done when completed 🍫`);
      } else {
        if (bar.denominator > fraction.denominator) {
          sendAdminMessage('agent', `Oops! You've split too many times. We need exactly ${fraction.denominator} pieces. Try joining some pieces back together! 🔄`);
        } else {
          sendAdminMessage('agent', `Keep splitting until you have ${fraction.denominator} equal pieces! 🔪`);
        }
      }
    } else {  //for selecting
      if (bar.numerator === fraction.numerator) {
        sendAdminMessage('agent', `Perfect! You've created ${fraction.numerator}/${fraction.denominator}! 🎉 Let's go to the Next Step ➡️`, () => setNextStep(true));
      } else if (bar.numerator > fraction.numerator) {
        sendAdminMessage('agent', `Oops! That's too many pieces. We only need ${fraction.numerator} pieces to make ${fraction.numerator}/${fraction.denominator}. Try again! 🍫`);
      } else {
        sendAdminMessage('agent', `Not quite enough pieces. We need ${fraction.numerator} pieces to make ${fraction.numerator}/${fraction.denominator}. Try again! 🍫`);
      }
    }

    setIsDoneActive(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <FractionHeader level={1} whole={whole} numerator={fraction.numerator} denominator={fraction.denominator} nextStep={nextStep} onClick={() => {
        goToStep('first', setGameStateRef, 2);
      }
      } />
      <StepCreateBox step={1} numerator={fraction.numerator} denominator={fraction.denominator} heading={"CREATE FRACTION"} />
      <div className="flex flex-col items-center gap-4 my-2">
        <ChocolateBar
          numerator={bar.numerator}
          denominator={bar.denominator}
          handlePieceClick={(index) => {
            if (bar.denominator === fraction.denominator && canSelect) {
              setBar(prev => ({ ...prev, numerator: index }));
              setIsDoneActive(true);
            }
          }}
          handleKnifeClick={() => {
            if (bar.denominator <= fraction.denominator + fraction.denominator * 0.5) {
              setBar(prev => ({ ...prev, denominator: prev.denominator + 1 }));
              setIsDoneActive(true);
            }
          }}
          handleJoinClick={() => {
            if (bar.denominator > 1) {
              setBar(prev => ({ ...prev, denominator: prev.denominator - 1 }));
            }
          }}
          active={true}
        />

        <div className="text-3xl  text-black mt-8">
          {split ? (
            `Split into ${fraction.denominator} pieces`
          ) : (
            `Now, let's select ${fraction.numerator}/${fraction.denominator} pieces`
          )}
        </div>

        <div className={`bg-[#b9550b] text-center mx-auto w-fit text-white text-2xl leading-none p-3 px-12 shadow-[-3px_3px_0px_0px_rgba(0,0,0)] mt-4 cursor-pointer ${!isDoneActive ? 'opacity-50' : ''}`} onClick={handleDone}>DONE</div>
      </div>
    </div>
  );
}