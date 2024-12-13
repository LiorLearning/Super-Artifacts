'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import GameContainer from '@/components/GameContainer';

interface Step {
  dividend: number;
  subtrahend: number | null;
  remainder: number | null;
}

const InteractiveLongDivisionGame: React.FC = () => {
  const [dividend, setDividend] = useState(0);
  const [divisor, setDivisor] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [quotient, setQuotient] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const newDividend = Math.floor(Math.random() * 9000) + 1000;
    const newDivisor = Math.floor(Math.random() * 90) + 10;
    setDividend(newDividend);
    setDivisor(newDivisor);
    setSteps([{ dividend: Math.floor(newDividend / 1000), subtrahend: null, remainder: null }]);
    setCurrentStep(0);
    setUserInput('');
    setFeedback(null);
    setIsComplete(false);
    setShowCelebration(false);
    setQuotient('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    const currentDividend = steps[currentStep].dividend;
    const quotientDigit = Math.floor(currentDividend / divisor);
    
    if (parseInt(userInput) === quotientDigit) {
      setFeedback('correct');
      const newQuotient = quotient + quotientDigit;
      setQuotient(newQuotient);
      
      const subtrahend = quotientDigit * divisor;
      const remainder = currentDividend - subtrahend;
      
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        newSteps[currentStep].subtrahend = subtrahend;
        newSteps[currentStep].remainder = remainder;
        
        if (currentStep < 3) {
          const nextDividend = remainder * 10 + Math.floor((dividend % Math.pow(10, 3 - currentStep)) / Math.pow(10, 2 - currentStep));
          newSteps.push({ dividend: nextDividend, subtrahend: null, remainder: null });
        }
        
        return newSteps;
      });
      
      if (currentStep === 3) {
        setIsComplete(true);
        setShowCelebration(true);
      } else {
        setCurrentStep(prevStep => prevStep + 1);
      }
    } else {
      setFeedback('incorrect');
    }
    setUserInput('');
  };

  const renderStep = (step: Step, index: number) => {
    const isCurrentStep = index === currentStep;
    const isPastStep = index < currentStep;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">{step.dividend}</div>
          {step.subtrahend !== null && (
            <>
              <div className="text-xl">-</div>
              <div className="text-2xl text-blue-500 font-bold">{step.subtrahend}</div>
            </>
          )}
        </div>
        {step.remainder !== null && (
          <>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5 }}
              className="h-0.5 bg-gray-400 my-2"
            />
            <div className="text-2xl font-bold text-green-500">{step.remainder}</div>
          </>
        )}
      </motion.div>
    );
  };

  return (
  <GameContainer
    title="Visual Long Division"
    score={score}
    instructions='Divide the given number by the divisor and enter the next digit of the quotient.'
  >
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Visual Long Division</h1>
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold">{dividend} ÷ {divisor}</div>
            <div className="text-xl">
              Quotient: {isComplete ? quotient : '?'}
            </div>
          </div>

          <div className="border-2 border-gray-400 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-4">{divisor}</div>
              <div className="flex-grow border-t-2 border-gray-400"></div>
              <div className="text-2xl font-bold ml-4">{dividend}</div>
            </div>
            <AnimatePresence>
              {steps.map((step, index) => renderStep(step, index))}
            </AnimatePresence>
          </div>

          {!isComplete && (
            <div className="space-y-4">
              <Label htmlFor="userInput">
                Enter the next digit of the quotient:
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="userInput"
                  type="number"
                  value={userInput}
                  onChange={handleInputChange}
                  className="text-lg"
                  placeholder="Your answer"
                />
                <Button onClick={handleSubmit} size="lg">
                  Submit
                </Button>
              </div>
            </div>
          )}

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-4 p-2 rounded-md ${feedback === 'correct' ? 'bg-green-100' : 'bg-red-100'}`}
            >
              {feedback === 'correct' ? (
                <div className="flex items-center text-green-700">
                  <CheckCircle2 className="mr-2" />
                  Correct! Good job!
                </div>
              ) : (
                <div className="flex items-center text-red-700">
                  <AlertCircle className="mr-2" />
                  That's not quite right. Try again!
                </div>
              )}
            </motion.div>
          )}

          {isComplete && (
            <div className="mt-6 flex justify-center">
              <Button onClick={generateNewProblem} size="lg" variant="outline">
                New Problem
              </Button>
            </div>
          )}

          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              >
                <div className="bg-white p-8 rounded-lg text-center">
                  <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
                  <p className="text-xl mb-4">You've mastered this long division!</p>
                  <Button onClick={() => setShowCelebration(false)}>Close</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  </GameContainer>
  );
};

export default InteractiveLongDivisionGame;