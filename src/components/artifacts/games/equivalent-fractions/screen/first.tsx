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


export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {numerator1, denominator1, denominator2} = gameStateRef.current.state1.question;  
  const { step, selectedKnife, selectedPieces } = gameStateRef.current;

  const handlePieceClick = (index: number) => {
    setGameStateRef({
      ...gameStateRef.current,
      selectedPieces: index
    });
  };

  return (
    <div className="w-full space-y-8 mb-12">
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
              Choose a suitable knife to split the chocolate into {denominator2} pieces
            </p>
            <div className="flex justify-center relative">
              <Bar numerator={0} denominator={selectedKnife ? selectedKnife * denominator1 : denominator1} handlePieceClick={handlePieceClick} />
              <div className="flex flex-col gap-2 ml-2 absolute top-0 left-full">
                {[2,3,4,5].map((pieces) => (
                  <button
                    key={pieces}
                    onClick={() => setGameStateRef({
                      ...gameStateRef.current,
                      selectedKnife: pieces
                    })}
                    className={`flex items-center gap-2 px-4 py-2 rounded ${
                      selectedKnife === pieces ? 'bg-red-500' : 'bg-red-200'
                    }`}
                  >
                    <span className="text-lg">{pieces}</span>
                    <div className="w-8 h-1 bg-gray-800 transform -rotate-45" />
                  </button>
                ))}
              </div>
          </div>
          <span className="text-xl flex items-center justify-center font-bold">
              <span className={`
                  border-4 bg-white text-2xl px-2 font-extrabold py-1 mr-1
                  ${selectedKnife && selectedKnife * denominator1 === denominator2 ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}
                `}
              > {selectedKnife ? selectedKnife * denominator1 : denominator1}
              </span>
              pieces
            </span>
        </div>

        {selectedKnife && selectedKnife * denominator1 === denominator2 && (
            <Proceed onComplete={() => {
              setGameStateRef({
                ...gameStateRef.current,
                step: {
                  id: 2,
                  text: 'Create equivalent fractions'
                }
              })
            }} />
          )}
      </div>
    </div>
  );
}
