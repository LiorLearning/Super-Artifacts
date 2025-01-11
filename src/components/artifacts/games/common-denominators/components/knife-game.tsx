import { ChocolateBarWithFraction } from "./chocolate-bar";
import { ChocolateRow } from "./chocolate-row";
import { Fraction } from "../game-state";
import { useState } from "react";

const KnifeGame = ({ fraction, onCorrect }: { fraction: Fraction, onCorrect: () => void }) => {
  const [ firstCorrect, setFirstCorrect ] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center m-8">
        <span className="text-2xl font-bold">Use the knife to make equivalent fractions from {fraction.numerator}/{fraction.denominator}.</span>
      </div>

      <div className="w-full flex flex-col items-center gap-16 m-8">
        {/* Original 1/2 */}
        <div className="flex flex-col items-center justify-center gap-8">
          <ChocolateBarWithFraction fraction={fraction} />
        </div>

        <ChocolateRow
          multiplier={2}
          originalFraction={fraction}
          onCorrect={() => setFirstCorrect(true)}
        />

        <ChocolateRow
          multiplier={3}
          originalFraction={fraction}
          onCorrect={() => {if (firstCorrect) {onCorrect();}}}
        />
      </div>
    </>
  )
}

export default KnifeGame;