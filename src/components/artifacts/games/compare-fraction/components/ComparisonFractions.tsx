import React, { useState, useEffect } from "react";
import Fraction from "./Fraction";

interface ComparisonFractionsProps {
  fraction1: {
    numerator: number;
    denominator: number;
  };
  fraction2: {
    numerator: number;
    denominator: number;
  };
  onComplete: () => void;
}

export default function ComparisonFractions({
  fraction1,
  fraction2,
  onComplete
}: ComparisonFractionsProps) {
  const [answer, setAnswer] = useState("");
  const correctAnswer = fraction1.numerator > fraction2.numerator ? ">" : (
    fraction1.numerator < fraction2.numerator ? "<" : "="
  );
  const commonDenominator = fraction1.denominator * fraction2.denominator;
  const newNumerator1 = fraction1.numerator * fraction2.denominator;
  const newNumerator2 = fraction2.numerator * fraction1.denominator;

  useEffect(() => {
    if (answer === correctAnswer) {
      onComplete();
    }
  }, [answer]);

  return (
    <div className="flex flex-col items-center gap-8 w-full bg-yellow-100 py-16">
      <div className="flex items-center justify-center gap-8">
        <div className="flex items-center gap-4">
          <Fraction 
            numerator={fraction1.numerator} 
            denominator={fraction1.denominator} 
            className="text-3xl font-bold"
          />
          <span className="text-3xl font-bold">=</span>
          <div className="bg-white px-4 py-2">
            <Fraction 
              numerator={newNumerator1} 
              denominator={commonDenominator} 
              className="text-3xl font-bold"
            />
          </div>
        </div>
        <span className="text-3xl font-bold">&</span>
        <div className="flex items-center gap-4">
          <Fraction 
            numerator={fraction2.numerator} 
            denominator={fraction2.denominator} 
            className="text-3xl font-bold"
          />
          <span className="text-3xl font-bold">=</span>
          <div className="bg-white px-4 py-2">
            <Fraction 
              numerator={newNumerator2} 
              denominator={commonDenominator} 
              className="text-3xl font-bold"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <Fraction 
          numerator={fraction1.numerator} 
          denominator={fraction1.denominator} 
          className="text-3xl font-bold"
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="?"
          className={`w-16 h-16 text-center text-3xl font-bold border-2 border-black ${
            answer === "<" || answer === ">" || answer === "=" ? ( answer=== correctAnswer ? "bg-green-500 text-white": "bg-red-500 text-white") : "bg-white"
          }`}
        />
        <Fraction 
          numerator={fraction2.numerator} 
          denominator={fraction2.denominator} 
          className="text-3xl font-bold"
        />
      </div>
    </div>
  );
}
