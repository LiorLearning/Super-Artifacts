import { BaseProps } from "../utils/types";
import { useGameState } from "../state-utils";
import Header from "../components/header";
import Bar from "../components/bar";
import Fraction from "../components/Fraction";
import RedBox from "../components/RedBox";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { use, useEffect } from "react";
import Proceed from "../components/proceed";

export default function Level3({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.screen3;
  const {numerator1, denominator1, denominator2, denominator3} = gameStateRef.current.screen3.question;
  const {numerator, multiplier1_numerator, multiplier1_denominator, multiplier2_numerator, multiplier2_denominator} = gameStateRef.current.screen3.answers;

  useEffect(() => {
    if (numerator === numerator1/denominator1*denominator2) {
      setGameStateRef(prev => ({
        ...prev,
        screen3: {
          ...prev.screen3,
          step: prev.screen3.step + 1
        }
      }));
    }
  }, [numerator]);

  useEffect(() => {
    if (multiplier1_numerator && multiplier1_denominator && 
        multiplier1_numerator === denominator2/denominator1 && 
        multiplier1_denominator === multiplier2_numerator) {
      setGameStateRef(prev => ({
        ...prev,
        screen3: {
          ...prev.screen3,
          step: prev.screen3.step + 1
        }
      }));
    }
  }, [multiplier1_numerator, multiplier1_denominator]);

  return (
    <div className="w-full space-y-8 mb-12">
    <Header 
      numerator1={numerator1}
      denominator1={denominator1}
        denominator2={denominator2}
        step={{
          id: 4,
          text: "More Equivalent Fractions"
        }}
        level={3}
      />
      <div className="flex flex-col max-w-screen-sm gap-4 mx-auto items-center justify-center">

        <div className="flex w-full justify-center items-center relative">
          <Bar numerator={numerator1} denominator={denominator1} handlePieceClick={() => {}} />
          <div className="absolute top-0 left-full text-3xl font-bold mx-4">
            <Fraction numerator={numerator1} denominator={denominator1} />
          </div>
        </div>

        <div className="flex w-full justify-center items-center relative">
          <Bar numerator={numerator1/denominator1*denominator2} denominator={denominator2} handlePieceClick={() => {}} />
          <div className="absolute top-0 left-full text-3xl font-bold mx-4">
            <Fraction numerator={numerator1/denominator1*denominator2} denominator={denominator2} />
          </div>
        </div>

        <div className="flex w-full justify-center items-center relative">
          <Bar numerator={numerator1*denominator3/denominator1} denominator={denominator3} handlePieceClick={() => {}} />
          <div className="absolute top-0 left-full text-3xl font-bold mx-4">
            <Fraction numerator={numerator1*denominator3/denominator1} denominator={denominator3} />
          </div>
        </div>


        <div className='flex mt-8 justify-center items-center gap-4'>
          <div className="flex items-center gap-4">
            <RedBox>Step 5</RedBox>
            <p className='text-xl min-w-56 text-center bg-red-600 font-bold text-white px-4 py-6'>
              Reflex
            </p>
          </div>
        </div>

        <div className='flex flex-col mt-8 justify-center items-center gap-4'>
        {step==2&& (
            <div className="w-full flex flex-col justify-center items-center">
              <Input 
                type="number"
                value={multiplier1_numerator ? multiplier1_numerator.toString() : ''}
                onChange={(e) => {
                setGameStateRef(prev => ({
                  ...prev,
                  screen3: {
                    ...prev.screen3,
                    answers: {
                      ...prev.screen3.answers,
                      multiplier1_numerator: Number(e.target.value)
                    }
                  }
                }))
              }}
              placeholder=""
              className=""
            />
            <div>
              <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-12" />
            </div>
          </div>
          )}
          <div className="flex justify-center items-center gap-4">
            <Fraction numerator={numerator1} denominator={denominator1} className="text-3xl font-bold" /> 
            <span className="text-3xl font-bold">=</span>
            <div className="text-3xl font-bold">
              <Input 
                type="text"
                value={numerator ? numerator.toString() : ''}
                onChange={(e) => {
                  setGameStateRef(prev => ({
                    ...prev,
                    screen3: {
                      ...prev.screen3,
                      answers: {
                        ...prev.screen3.answers,
                        numerator: Number(e.target.value)
                      }
                    }
                  }))
                }}
                className="w-24"
              />
              <span className="border-b-2 border-black w-12" />
              <span className="text-3xl font-bold">
                {denominator2}
              </span>

            </div>
          </div>
          {step ==2 && (
            <div className="flex flex-col w-full">
              <div className="flex justify-center items-center">
                <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-12 -scale-x-100 rotate-180" />
              </div>    
              <Input 
                type="number"
                value={multiplier1_denominator ? multiplier1_denominator.toString() : ''}
                onChange={(e) => {
                  setGameStateRef(prev => ({
                    ...prev,
                    screen3: {
                      ...prev.screen3,
                      answers: {
                        ...prev.screen3.answers,
                        multiplier1_denominator: Number(e.target.value)
                      }
                    }
                  }))
                }}
                placeholder=""
                className=""
              />
            </div>
          )
          }

        {step == 3 && (
          <div className="flex flex-col">
            <Proceed onComplete={() => {
              setGameStateRef(prev => ({
                ...prev,
                screen3: {
                  ...prev.screen3,
                  step: 4
                }
              }))
            }} />
          </div>
        )}
        </div>
      </div>
    </div>
  )
}