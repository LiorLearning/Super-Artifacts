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
import { ChocolateBar } from "../../different-numerator-denominator/components/ChocolateBar";
import KnifeSelector from "../components/knifeselector";
import HoneySelector from "../components/honeyselctor";


export default function Level2({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {numerator1, denominator1, denominator2, denominator3 } = gameStateRef.current.screen2.question;  
  const { step, selectedKnife, selectedPieces1, selectedPieces2, substep, selectedHoney } = gameStateRef.current.screen2;
  const [answer1, setAnswer1] = useState('');

  const handlePieceClick = (index: number) => {
    setGameStateRef({
      ...gameStateRef.current,
      screen1: {
        ...gameStateRef.current.screen1,
        selectedPieces: index
      }
    });
  };

  useEffect(() => {
    if(selectedKnife && selectedKnife*denominator1 === denominator2){
      setGameStateRef({
        ...gameStateRef.current,
        screen2: {
          ...gameStateRef.current.screen2,
          substep: 1  
        }
      });
    }
  }, [selectedKnife]);

  useEffect(() => {
    if(selectedHoney && denominator1/selectedHoney === denominator3){
      setGameStateRef({
        ...gameStateRef.current,
        screen2: {
          ...gameStateRef.current.screen2,
          substep: 3
        }
      });
    }
  }, [selectedHoney]);

  useEffect(() => {
    if(selectedPieces1 === denominator2/denominator1*numerator1){
      setGameStateRef({
        ...gameStateRef.current,
        screen2: {
          ...gameStateRef.current.screen2,
          substep: 2  
        }
      });
    }
  }, [selectedPieces1]);

  useEffect(() => {
    if(selectedPieces2 === numerator1/denominator1*denominator3){
      setGameStateRef({
        ...gameStateRef.current,
        screen2: {
          ...gameStateRef.current.screen2,
          substep: 4  
        }
      });
    }
  }, [selectedPieces2]);

  return (
    <div className="w-full space-y-8 pb-12">
      <Header 
        numerator1={numerator1}
        denominator1={denominator1}
        denominator2={denominator2}
        step={{
          id: 3,
          text: "More Equivalent Fractions"
        }}
        level={2}
      />


      <div className="flex flex-col max-w-screen-sm mx-auto items-center justify-center">
        <div className="flex flex-col gap-8  items-center justify-center">

          {substep === 0 && (
            <>
              <p className="text-2xl text-left w-full mb-4">
                Use a knife to split the chocolate into the required number of pieces.
              </p>
            </>
          )}

          <div className="flex w-full relative items-center justify-center">
            <Bar 
              numerator={numerator1} 
              denominator={denominator1} 
              handlePieceClick={() => {}}
            />
            <div className="absolute top-0 left-full text-center text-2xl font-bold ml-6">
              <Fraction numerator={numerator1} denominator={denominator1} />
            </div>
          </div>


          <div className="flex w-full relative items-center justify-center">
            <Bar 
              numerator={selectedPieces1} 
              denominator={selectedKnife ? selectedKnife*denominator1  : denominator1}
              handlePieceClick={(index) => {
                setGameStateRef({
                  ...gameStateRef.current,
                  screen2: {
                    ...gameStateRef.current.screen2,
                    selectedPieces1: index
                  }
                });
              }}
            />
            {substep === 0 && (
              <div className="absolute top-0 right-full text-center text-2xl font-bold mx-6">
                <KnifeSelector 
                  options={[2,3,5]}
                selectedKnife={selectedKnife}
                setSelectedKnife={(index) => {
                  setGameStateRef({
                    ...gameStateRef.current,
                    screen2: {
                      ...gameStateRef.current.screen2,
                      selectedKnife: index
                    }
                  });
                }}
                />
              </div>      
            )}
              
              
            <div className="absolute top-0 left-full flex flex-col text-2xl font-bold ml-6">
              <Fraction numerator={selectedPieces1 ? selectedPieces1 : ''} denominator={denominator2} />
            </div>
          </div>

          {substep === 0 ? (
            <p className="text-2xl text-center w-full mb-4 mt-2">
              <span className="font-bold bg-white border-2 mr-2 border-orange-500 text-orange-500 px-2 py-1">
                {selectedKnife ? selectedKnife*denominator1 : denominator1}
              </span>
              pieces, but you need {denominator2} pieces.
            </p>
          ) : substep === 1 ?  (
            <p className="text-2xl text-left w-full mb-4">
              Select pieces to get the same amount of chocolate!            
            </p>
          ) : (
            <div className="flex flex-col text-center items-center justify-center">
                <h2 className="text-2xl font-bold">
                  Great, lets try another one!
                </h2>
                <p className="text-2xl text-left w-full mb-4">
                  This time, let’s use honey to merge the chocolate into the required number of pieces.
                </p>
            </div>
          )}
        </div>
      </div>


      {substep >= 2 && (
        <div className="flex flex-col max-w-screen-sm mx-auto items-center justify-center">
          <div className="flex w-full items-center justify-center relative">
            <Bar 
              numerator={selectedPieces2} 
              denominator={selectedHoney ? denominator1/selectedHoney : denominator1} 
              handlePieceClick={(index) => {
                setGameStateRef({
                  ...gameStateRef.current,
                  screen2: {
                    ...gameStateRef.current.screen2,
                    selectedPieces2: index
                  }
                });
              }}
            />
            <div className="absolute top-0 left-full text-center text-2xl font-bold ml-6">
              <Fraction numerator={selectedPieces2} denominator={denominator3} />
            </div>

            <div className="absolute top-0 right-full text-center text-2xl mx-4 font-bold ml-6">
              <HoneySelector 
                options={[2,3,4]}
                selectedHoney={selectedHoney}
                setSelectedHoney={(index) => {
                  setGameStateRef({
                    ...gameStateRef.current,
                    screen2: {
                      ...gameStateRef.current.screen2,
                      selectedHoney: index
                    }
                  });
                }}
              />
            </div>

          </div>

          {substep === 2 ?(
            <p className="text-2xl text-center w-full mb-4">
              <span className="font-bold bg-white border-2 mr-2 border-orange-500 text-orange-500 px-2 py-1">
                {selectedHoney ? denominator1/selectedHoney : denominator1}
              </span>
              pieces, but you need {denominator3} pieces.
            </p>
          ) : (
            <p className="text-2xl text-left w-full mb-4">
              Select the number of pieces you need to get the same amount of chocolate!
            </p>
          )}

          {substep === 3 && (
            <Proceed onComplete={() => {
              setGameStateRef({
                ...gameStateRef.current,
                level: 3
              });
            }} />
          )}
          
        </div>
      )}


    </div>
  );
}