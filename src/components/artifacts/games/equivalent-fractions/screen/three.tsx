import { BaseProps } from "../utils/types";
import { useGameState } from "../state-utils";
import Header from "../components/header";
import Bar from "../components/bar";
import Fraction from "../components/Fraction";

export default function Level3({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.screen3;
  const {numerator1, denominator1, denominator2, denominator3} = gameStateRef.current.screen3.question;

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
          <div className="absolute top-0 left-full w-full text-3xl font-bold mx-4">
            <Fraction numerator={numerator1} denominator={denominator1} />
          </div>
        </div>

        <div className="flex w-full justify-center items-center relative">
          <Bar numerator={numerator1/denominator1*denominator2} denominator={denominator2} handlePieceClick={() => {}} />
          <div className="absolute top-0 left-full w-full text-3xl font-bold mx-4">
            <Fraction numerator={numerator1/denominator1*denominator2} denominator={denominator2} />
          </div>
        </div>

        <div className="flex w-full justify-center items-center relative">
          <Bar numerator={numerator1*denominator3/denominator1} denominator={denominator3} handlePieceClick={() => {}} />
          <div className="absolute top-0 left-full w-full text-3xl font-bold mx-4">
            <Fraction numerator={numerator1*denominator3/denominator1} denominator={denominator3} />
          </div>
        </div>


      </div>
    </div>
  )
}