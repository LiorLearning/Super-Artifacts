import { BaseProps } from "../utils/types";
import { useGameState } from "../state-utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Header from "../components/header";
import Intro from "../components/intro";
import Bar from "../components/bar";
import { ArrowBigDown, ArrowDown } from "lucide-react";
import Fraction from "../components/Fraction";
import Proceed from "../components/proceed";
import { Input } from "@/components/custom_ui/input";


export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {numerator1, denominator1, denominator2} = gameStateRef.current.state1.question;  
  const { step, selectedKnife, selectedPieces } = gameStateRef.current;
  const [correct, setCorrect] = useState(false);
  const [numerator, setNumerator] = useState(0);
  const [denominator, setDenominator] = useState(0);

  const handlePieceClick = (index: number) => {
    setGameStateRef({
      ...gameStateRef.current,
      selectedPieces: index
    });
  };

  return (
    <div className="w-full space-y-8 pb-12">
      <Header 
        numerator1={numerator1}
        denominator1={denominator1}
        denominator2={denominator2}
        step={step}
        level={1}
      />

      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-col gap-4 w-full">
          <p className="text-xl">Let's split this chocolate into {denominator2} pieces.</p>
            <div className="flex justify-center relative">
              <Bar numerator={numerator1} denominator={denominator1} handlePieceClick={() => {}} />
              <Fraction numerator={numerator1} denominator={denominator1} className="text-xl font-bold ml-4 absolute top-0 left-full" />
            </div>
            <div className="flex justify-center">
              <ArrowDown className="w-16 h-16 text-black fill-black"/>
            </div>

            <p className="text-xl">
              Select pieces to get the same amount of chocolate
            </p>
            <div className="flex justify-center relative">
              <Bar numerator={0} denominator={denominator2} handlePieceClick={handlePieceClick} />
              {correct && (
                <div className="flex flex-col gap-2 ml-2 absolute top-0 left-full">
                  <Input 
                    type="text"
                  value={numerator.toString() === '0' ? '' : numerator.toString()}
                  placeholder="?"
                  onChange={(e) => setNumerator(parseInt(e.target.value))}
                  className={`
                    p-2 w-12 border-2 text-center
                    ${numerator == numerator1 * denominator2 / denominator1 ? 'border-green-500 text-green-500' : 'border-black'}
                  `}
                />
                <span className="border-b-2 border-black w-12" />
                <Input 
                  type="text"
                  value={denominator.toString() === '0' ? '' : denominator.toString()}
                  placeholder="?"
                  onChange={(e) => setDenominator(parseInt(e.target.value))}
                    className={`
                      p-2 w-12 border-2 text-center
                      ${denominator == denominator2 ? 'border-green-500 text-green-500' : 'border-black'}
                    `}
                  />
                </div>
              )}
          </div>
          {selectedPieces}
        </div>

        <div 
          className={`text-xl cursor-pointer bg-red-500 text-white shadow-[-3px_3px_0px_#000000] px-8 py-2 font-bold ${correct && 'bg-gray-500'}`}
          onClick={() => { 
            if (!correct && selectedPieces === 6) { setCorrect(true) } else { setCorrect(false) };
            console.log(correct)   
          }}
        >
          Check
        </div>
      </div>
    </div>
  );
}
