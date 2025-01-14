import { BaseProps } from "../utils/types";
import { useGameState } from "../state-utils";  
import Bar from "../components/bar";
import Fraction from "../components/Fraction";
import RedBox from "../components/RedBox";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { use, useEffect } from "react";
import Proceed from "../components/proceed";
import { useState } from "react";
import { cn } from "@/lib/utils";


export default function Level4({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.screen4;
  const {question1, question2} = gameStateRef.current.screen4;
  const [answerNumerator, setAnswerNumerator] = useState(0);
  const [answerDenominator, setAnswerDenominator] = useState(0);
  const multiplier1 = question1.denominator2/question1.denominator1;
  const multiplier2 = question2.numerator2/question2.numerator1;
  
  const [multiplier1_numerator, setmultiplier1_numerator] = useState(0);
  const [multiplier1_denominator, setmultiplier1_denominator] = useState(0);
  const [multiplier2_numerator, setmultiplier2_numerator] = useState(0);
  const [multiplier2_denominator, setmultiplier2_denominator] = useState(0);
  const [hint1, setHint1] = useState(false);
  const [hint2, setHint2] = useState(false);
  useEffect(() => {
    if (answerNumerator == question1.numerator1*question1.denominator2/question1.denominator1) {
      setGameStateRef({
        ...gameStateRef.current,
        screen4: {
          ...gameStateRef.current.screen4,
          step: 2
        }
      });
    }
  }, [answerNumerator]);

  useEffect(() => {
    if (answerDenominator == question2.numerator1*question2.denominator2/question2.numerator2) {
      setGameStateRef({
        ...gameStateRef.current,
        screen4: {
          ...gameStateRef.current.screen4,
          step: 4
        }
      });
    }
  }, [answerDenominator]);

  useEffect(() => {
    if (!multiplier1_denominator || !multiplier1_numerator) return;

    if (multiplier1_denominator === multiplier1 && multiplier1_denominator === multiplier1) setHint1(false);
  }, [multiplier1_numerator, multiplier1_denominator]);

  useEffect(() => {
    if (!multiplier2_denominator || !multiplier2_numerator) return;

    if (multiplier2_denominator === multiplier2 && multiplier2_denominator === multiplier2) setHint2(false);
  }, [multiplier2_numerator, multiplier2_denominator]);


  return (
    <div className="w-full space-y-8 mb-12">
      <Header 
        level={4}
      />
      <div className="flex flex-col justify-center items-center gap-8 bg-red-100 p-4 relative">
        {step <= 2 ? ( 
          
          <div className="max-w-screen-sm flex gap-4 justify-center items-center">
            <div className="flex flex-col mt-10 py-10 bg-red-100 w-full">
            {hint1 && (
              <div className="flex flex-col w-full">
                <div className="flex justify-center items-center">
                  x
                  <input 
                    type="text"
                    value={multiplier1_numerator ? multiplier1_numerator.toString() : ''}
                    onChange={(e) => setmultiplier1_numerator(Number(e.target.value))}
                    placeholder=""
                    className="w-10 text-center mb-2 ml-2 border-2 border-black"
                  />
                  
                </div>
                <div className="flex justify-center items-center">
                  <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8" />
                </div>  
              </div>
              )}
              <div className="flex justify-center items-center gap-4">
                <Fraction numerator={question1.numerator1} denominator={question1.denominator1} className="text-3xl font-bold" /> 
                <span className="text-3xl font-bold">=</span>
                <div className="flex flex-col gap-2 px-2 bg-white w-24">
                  <span className="text-3xl text-center font-bold flex flex-col justify-end pt-6"> 
                    <input 
                      type="text"
                      disabled={step != 1}
                      value={answerNumerator ? answerNumerator.toString() : ''}
                      placeholder="?"
                      onChange={(e) => setAnswerNumerator(parseInt(e.target.value || '0'))}
                      className="border-none outline-none text-3xl text-center"
                    />
                  </span>
                  <span className="border-b-2 border-black w-full"/>
                  <span className="text-3xl text-center font-bold flex flex-col justify-end pb-6"> {question1.denominator2} </span>
                </div>
              </div>
              {hint1 && (
              <div className="flex flex-col w-full">
                <div className="flex justify-center items-center">
                  <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8 -scale-x-100 rotate-180" />
                </div>  
                <div className="flex justify-center items-center">
                  x
                  <input 
                    type="text"
                    value={multiplier1_denominator === 0 ? "" : multiplier1_denominator?.toString()}
                    onChange={(e) => setmultiplier1_denominator(Number(e.target.value))}
                    placeholder="?"
                    className="w-10 text-center mt-2 ml-2 border-2 border-black"
                  />
                  
                </div>
              </div>
              )}
            </div>
            {step == 1 && <Hint setShowHint={() => {setHint1(true)}} className="absolute cursor-pointer bottom-10 right-10"/>}
          </div>
        ) : (
          <div className="max-w-screen-sm flex gap-4 justify-center items-center">
            <div className="flex flex-col mt-10 py-10 bg-red-100 w-full">
            {hint2 && (
              <div className="flex flex-col w-full">
                <div className="flex justify-center items-center">
                  x
                  <input 
                    type="text"
                    value={multiplier2_numerator ? multiplier2_numerator.toString() : ''}
                    onChange={(e) => setmultiplier2_numerator(Number(e.target.value))}
                    placeholder=""
                    className="w-10 text-center mb-2 ml-2 border-2 border-black"
                  />
                  
                </div>
                <div className="flex justify-center items-center">
                  <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8" />
                </div>  
              </div>
              )}
              <div className="flex justify-center items-center gap-4">
                <div className="flex flex-col gap-2 px-2 bg-white w-24">
                  <span className="text-3xl text-center font-bold flex flex-col justify-end"> {question2.numerator1} </span>
                  <span className="border-b-2 border-black w-full"/>
                  <span className="text-3xl text-center font-bold flex flex-col justify-end"> 
                    <input 
                      type="text"
                      value={answerDenominator ? answerDenominator.toString() : ''}
                      onChange={(e) => setAnswerDenominator(parseInt(e.target.value || '0'))}
                      placeholder="?"
                      className="border-none outline-none text-3xl text-center"
                    />
                  </span>
                </div>
                <span className="text-3xl font-bold">=</span>
                <Fraction numerator={question2.numerator2} denominator={question2.denominator2} className="text-3xl font-bold" /> 
              </div>
              {hint2 && (
              <div className="flex flex-col w-full">
                <div className="flex justify-center items-center">
                  <img src='https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/curvearrow.svg' className="h-8 -scale-x-100 rotate-180" />
                </div>  
                <div className="flex justify-center items-center">
                  x
                  <input 
                    type="text"
                    value={multiplier2_denominator === 0 ? "" : multiplier2_denominator?.toString()}
                    onChange={(e) => setmultiplier2_denominator(Number(e.target.value))}
                    placeholder="?"
                    className="w-10 text-center mt-2 ml-2 border-2 border-black"
                  />
                  
                </div>
              </div>
              )}
            </div>
            {step == 1 && <Hint setShowHint={() => {setHint1(true)}} className="absolute cursor-pointer bottom-10 right-10"/>}
            {step == 3 && <Hint setShowHint={() => {setHint2(true)}} className="absolute cursor-pointer bottom-10 right-10"/>}  
          </div>
        )}
      </div>

      {step == 2 && (
        <div className="flex flex-col justify-center items-center gap-8 p-4">
          <p className="text-3xl font-bold">You got it right!</p>
          <Proceed onComplete={() => {
            setGameStateRef({
              ...gameStateRef.current,
              screen4: {
                ...gameStateRef.current.screen4,
                step: 3
              }
            });
          }} />
        </div>
      )}

      {step == 4 && (
        <div className="flex flex-col justify-center items-center gap-8 text-3xl font-bold text-green-500 p-4">
          Correct!
          {/* <Celebr */}
        </div>
      )}
    </div>
  )
}




const Header = ({ level }: { level: number }) => {
  return (
    <div className='w-full space-y-16 flex flex-col'>
      <div className={cn('flex justify-center items-center gap-4 bg-[#F9F871] p-4 shadow-[0_5px_1px_rgba(0,0,0,1)]')}>

        <span className='w-full'/>
        <p className='flex w-full items-center gap-2 text-2xl font-bold'>
          Equivalent Fractions
        </p>
        <div className='w-full flex justify-end'>
          {level && <RedBox>Level {level}</RedBox>}
        </div>
      </div>

      <div className='flex justify-center items-center gap-4'>
        <div className="flex items-center gap-4">
          <RedBox>Question</RedBox>
          <p className='text-xl bg-red-500 font-bold text-white px-4 py-6'>
            Fill the box
          </p>
        </div>
      </div>
    </div>
  );
}


const Hint = ({ setShowHint, className }: { setShowHint: () => void, className: string }) => {
  return (
    <div 
      className={cn("bg-red-500 shadow-[-4px_4px_0_rgba(0,0,0,1)] font-bold px-4 py-2 text-white", className)}
      onClick={() => {
        setShowHint();
      }}
    >
      Need a hint?
    </div>
  );
}