import { useState, useEffect, useRef } from "react";
import { useGameState } from "../../state-utils";
import FractionHeader from "../../components/fractionheader";
import StepCreateBox from "../../components/stepcreatebox";
import ChocolateBar from "../../components/chocolatebar";
import { goToStep } from "../../utils/helper";

export default function Screen1Step1() {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction, whole } = gameStateRef.current.state1;

  const [bar, setBar] = useState({ numerator: 0, denominator: 1 });
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (bar.numerator === fraction.numerator && bar.denominator === fraction.denominator) {
      setActive(false);
      goToStep('first', setGameStateRef, 2)
    }
  }, [bar.numerator]);

  return (
    <div className="flex flex-col min-h-screen">
      <FractionHeader level={1}  whole={whole} numerator={fraction.numerator} denominator={fraction.denominator} onClick={() => {
          setGameStateRef({ ...gameStateRef.current, state1: { ...gameStateRef.current.state1, step: gameStateRef.current.state1.step + 1 } });
        }
      }/>
      <StepCreateBox step={1} numerator={fraction.numerator} denominator={fraction.denominator} />
      <div className="flex flex-col items-center gap-4 my-8">
        <ChocolateBar 
          numerator={bar.numerator} 
          denominator={bar.denominator} 
          handlePieceClick={(index) => {
            if (bar.denominator === fraction.denominator) {
              setBar(prev => ({...prev, numerator: index}));
            }
          }} 
          handleKnifeClick={() => {
            if (bar.denominator < fraction.denominator) {
              setBar(prev => ({...prev, denominator: prev.denominator + 1}));
            }
          }}
          handleJoinClick={() => {
            if (bar.denominator > 1) {
              setBar(prev => ({...prev, denominator: prev.denominator - 1}));
            }
          }}
          active={active}
        />

        <div className="text-4xl  text-black mt-8">
          {bar.denominator !== fraction.denominator ? (
            `Split into ${fraction.denominator} pieces`
          ) : (
            `Now, let's select ${fraction.numerator}/${fraction.denominator} pieces`
          )}
        </div>
      </div>
    </div>
  );
}