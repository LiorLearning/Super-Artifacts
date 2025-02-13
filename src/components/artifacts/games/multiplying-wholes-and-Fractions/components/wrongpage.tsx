import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useGameState } from "../state-utils";
import { BaseProps } from "../utils/types";
import Bar from "./bar";
import NewInput from "@/components/ui/newinput";

interface WrongPageProps extends BaseProps {
  level: number;
  whole: number;
  numerator: number;
  denominator: number;
  setSelectedFraction: Dispatch<SetStateAction<{ numerator: string; denominator: string; }>>;
  setShowWrongPage: Dispatch<SetStateAction<boolean>>;
}

export default function WrongPageProps({ level, whole, numerator, denominator, sendAdminMessage, setSelectedFraction, setShowWrongPage }: WrongPageProps) {

  const { gameStateRef, setGameStateRef } = useGameState();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [showNext, setShowNext] = useState(false);

  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', `How many total pieces does ${whole * numerator}/${whole * denominator} have? `);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full bg-[#fff049] py-5 shadow-md flex justify-between items-center gap-4 px-10 border border-black">
        <div className='text-center bg-white w-auto min-w-[100px] p-4 text-2xl leading-none font-normal text-[#957000] shadow-[-4px_4px_0px_0px_rgba(0,0,0)]'>
          LEVEL {level}
        </div>
        <div className="text-black text-2xl leading-none flex items-center gap-4 px-6">
          <div className="p-2 px-4 text-center bg-white">
            {whole}
          </div>

          <div className="text-black">
            x
          </div>

          <div className="flex flex-col items-center bg-white px-1">
            <div className="p-1 px-4">
              {numerator}
            </div>
            <div className="border-t-2 border-black p-1">
              {denominator}
            </div>
          </div>

          <div className="text-black">
            =
          </div>

          <div className="flex flex-col items-center bg-white px-1">
            <div className="p-1 px-4">
              ?
            </div>
            <div className="border-t-2 border-black p-1">
              ?
            </div>
          </div>
        </div>
        <div className={`text-2xl bg-white rounded-full p-3 leading-none shadow-[-3px_3px_0px_0px_rgba(0,0,0)] opacity-0  cursor-default`}>
          {`>>`}
        </div>
      </div>

      <div className="my-12 bg-[#FFF0E5] flex flex-col items-center p-8">
        <div className="w-[60%]">
          <Bar denominator={whole * denominator} numerator={whole*numerator} />
        </div>
        <div className="flex justify-ceter items-center mt-8 leading-none text-2xl">
          <div className="">{whole * numerator}/{whole * denominator} gives me {whole * numerator} pieces of size</div>
          <div className="flex flex-col items-center justify-center leading-none mx-3">
            <div className="border-2 border-gray-600 rounded-lg p-2 bg-white w-12 text-center">1</div>
            <div className="w-12 h-0 border-b-2 border-black my-2"></div>
            <NewInput
              value={value1}
              useColor={true}
              correctValue={(whole * denominator).toString()}
              onValueChange={(value) => setValue1(value)}
              onCorrect={() => {
                sendAdminMessage('agent', `That's correct! Now, how many pieces are there in ${whole} times ${numerator}/${denominator}?`);
                setTimeout(() => {
                  setShowNext(true);
                }, 2000);
              }}
              onIncorrect={() => {
                sendAdminMessage('admin', `User answered incorrectly for selecting the pieces of the chocolate as the denominator, correct answer is ${whole * denominator} but user answered ${value1}, Help user solve the problem according to the single chocolate bar. Diagnose socratically.`);
              }}
              placeholder="?"
              className="w-12 p-2 text-center inline outline-none border-2 border-gray-600 rounded-lg"
            />
          </div>
        </div>
      </div>


      {showNext && <div className="my-4 bg-[#FFF0E5] flex flex-col items-center p-8">
        <div className="w-[60%] flex gap-4 flex-col">
          {Array.from({ length: Math.ceil(((whole * numerator) / denominator)) - 1 }).map((_, index) => (
            <Bar key={index} denominator={denominator} numerator={denominator} />
          ))}
          {whole * numerator % denominator !== 0 && <Bar denominator={denominator} numerator={whole * numerator % denominator} />}
        </div>
        <div className="flex justify-ceter items-center mt-8 leading-none text-2xl">
          <div className="">However I have {whole * numerator} pieces of size</div>
          <div className="flex flex-col items-center justify-center leading-none mx-3">
            <div className="border-2 border-gray-600 rounded-lg p-2 bg-white w-12 text-center">1</div>
            <div className="w-12 h-0 border-b-2 border-black my-2"></div>
            <NewInput
              value={value2}
              useColor={true}
              correctValue={(denominator).toString()}
              onValueChange={(value) => setValue2(value)}
              onCorrect={() => {
                sendAdminMessage('agent', `Correct!, Now, do you want to change your previous answer for denominator?`, () => {
                  setSelectedFraction(prev => ({ ...prev, denominator: '?' }));
                  setShowWrongPage(false);
                });
              }}
              onIncorrect={() => {
                sendAdminMessage('admin', `User answered incorrectly for the denominator part, correct answer is ${denominator} but user answered ${value2}, Help user solve the problem according to the single chocolate bar. Diagnose socratically.`);
              }}
              placeholder="?"
              className="w-12 p-2 text-center inline outline-none border-2 border-gray-600 rounded-lg"
            />
          </div>
        </div>
      </div>}
    </div>
  );
}