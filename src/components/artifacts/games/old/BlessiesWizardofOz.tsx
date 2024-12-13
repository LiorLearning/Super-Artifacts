
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/custom_ui/card';
import { CardHeader } from '@/components/custom_ui/card';
import { CardTitle } from '@/components/custom_ui/card';
import { CardContent } from '@/components/custom_ui/card';
import { Button } from '@/components/custom_ui/button';
import { Check } from 'lucide-react';
import { RefreshCw } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { Star } from 'lucide-react';
import { Input } from '@/components/custom_ui/input';
import { Path } from '@/components/custom_ui/path';

const OzFractions = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState<any>(null);
  const [splitPieces, setSplitPieces] = useState<any>([]);
  const [selectedPieces, setSelectedPieces] = useState<any>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState<any>({ numerator: '', denominator: '' });
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
  
  const generateChallenge = () => {
    const denominators = [5, 6, 8, 10];
    const denominator = denominators[Math.floor(Math.random() * denominators.length)];
    const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    const splitCount = level > 3 ? (Math.random() < 0.5 ? 2 : 3) : 2;
    return { numerator, denominator, splitCount };
  };
  
  const initializeGame = (challenge: any) => {
    setSplitPieces(Array(challenge.denominator).fill(false));
    setSelectedPieces(Array(challenge.denominator * challenge.splitCount).fill(false));
    setShowSuccess(false);
    setShowHint(false);
    setUserAnswer({ numerator: '', denominator: '' });
    setShowAnswerFeedback(false);
    setAnswerIsCorrect(false);
  };
  
  useEffect(() => {
    const newChallenge = generateChallenge();
    setCurrentChallenge(newChallenge);
    initializeGame(newChallenge);
  }, []);

  const allSplit = splitPieces.every(Boolean);
  
  const handleSplit = (index: any) => {
    const newSplit = [...splitPieces];
    newSplit[index] = true;
    setSplitPieces(newSplit);
    setSelectedPieces(Array(currentChallenge.denominator * currentChallenge.splitCount).fill(false));
    setShowSuccess(false);
    setShowAnswerFeedback(false);
  };
  
  const handleSelect = (index: any) => {
    if (!allSplit) return;
    const newSelected = [...selectedPieces];
    newSelected[index] = !newSelected[index];
    setSelectedPieces(newSelected);
    setShowAnswerFeedback(false);
  };

  const checkAnswer = () => {
    const correctNumerator = currentChallenge.numerator * currentChallenge.splitCount;
    const correctDenominator = currentChallenge.denominator * currentChallenge.splitCount;
    const isCorrect = 
      parseInt(userAnswer.numerator) === correctNumerator && 
      parseInt(userAnswer.denominator) === correctDenominator;
    
    setAnswerIsCorrect(isCorrect);
    setShowAnswerFeedback(true);
    if (isCorrect) {
      setShowSuccess(true);
    }
  };

  const nextLevel = () => {
    setLevel(level + 1);
    setScore(score + 10);
    const newChallenge = generateChallenge();
    setCurrentChallenge(newChallenge);
    initializeGame(newChallenge);
  };

  const reset = () => {
    setLevel(1);
    setScore(0);
    const newChallenge = generateChallenge();
    setCurrentChallenge(newChallenge);
    initializeGame(newChallenge);
  };

  if (!currentChallenge) return null;

  const createPizzaSlicePath = (startAngle: any, endAngle: any) => {
    const startX = 50 + 48 * Math.cos((startAngle - 90) * Math.PI / 180);
    const startY = 50 + 48 * Math.sin((startAngle - 90) * Math.PI / 180);
    const endX = 50 + 48 * Math.cos((endAngle - 90) * Math.PI / 180);
    const endY = 50 + 48 * Math.sin((endAngle - 90) * Math.PI / 180);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M 50 50 L ${startX} ${startY} A 48 48 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="bg-yellow-100 rounded-t-lg">
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-600" /> 
          Glinda's Magical Crystal Pizza Adventure 
          <Sparkles className="w-6 h-6 text-yellow-600" />
        </CardTitle>
        <div className="flex justify-between px-4">
          <div className="text-purple-600 font-medium">Level: {level}</div>
          <div className="text-purple-600 font-medium">Magic Points: {score}</div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
            <div className="text-center text-lg font-medium mb-2">🧙‍♀️ Glinda's Challenge:</div>
            <p className="text-center">
              "Dorothy and friends found <span className="text-purple-500 font-bold">{currentChallenge.numerator}/{currentChallenge.denominator}</span> of a 
              magical crystal pizza along the yellow brick road! To share its power, we must split each slice into {currentChallenge.splitCount} equal pieces. 
              How many smaller pieces would equal their share?"
            </p>
          </div>
          
          <div className="flex justify-around items-center">
            <div className="space-y-4">
              <div className="text-center font-medium p-2 bg-yellow-100 rounded-lg">
                Original Magic Crystal Share
              </div>
              <div className="relative w-80 h-80">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {[...Array(currentChallenge.denominator)].map((_, i) => {
                    const startAngle = (i * 360) / currentChallenge.denominator;
                    const endAngle = ((i + 1) * 360) / currentChallenge.denominator;
                    const isColored = i < currentChallenge.numerator;
                    return (
                      <Path
                        key={i}
                        d={createPizzaSlicePath(startAngle, endAngle)}
                        fill={isColored ? "#9F7AEA" : "#FFE5B4"}
                        stroke="#805AD5"
                        strokeWidth="0.5"
                        id={`original-slice-${i}`}
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="text-center font-medium">{currentChallenge.numerator}/{currentChallenge.denominator} = ? magical pieces</div>
            </div>

            <ArrowRight className="w-12 h-12 text-yellow-500" />

            <div className="space-y-4">
              <div className="text-center font-medium p-2 bg-purple-100 rounded-lg">
                {allSplit ? 
                  "Select pieces to match the magic share!" : 
                  `Click each slice to split into ${currentChallenge.splitCount} pieces!`}
              </div>
              <div className="relative w-80 h-80">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {splitPieces.map((isSplit: any, i: any) => {
                    const sliceAngle = (360 / currentChallenge.denominator);
                    const startAngle = i * sliceAngle;
                    
                    if (isSplit) {
                      return ([...Array(currentChallenge.splitCount)].map((_, subIndex) => {
                        const subSliceAngle = sliceAngle / currentChallenge.splitCount;
                        const subStartAngle = startAngle + (subIndex * subSliceAngle);
                        const subEndAngle = subStartAngle + subSliceAngle;
                        const index = i * currentChallenge.splitCount + subIndex;
                        const isSelected = selectedPieces[index];
                        return (
                          <Path
                            key={`${i}-${subIndex}`}
                            d={createPizzaSlicePath(subStartAngle, subEndAngle)}
                            fill={isSelected ? "#9F7AEA" : "#FFE5B4"}
                            stroke="#805AD5"
                            strokeWidth="0.5"
                            onClick={() => handleSelect(index)}
                            className={allSplit ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}
                            id={`split-slice-${i}-${subIndex}`}
                          />
                        );
                      }));
                    } else {
                      return (
                        <Path
                          key={i}
                          d={createPizzaSlicePath(startAngle, startAngle + sliceAngle)}
                          fill="#FFE5B4"
                          stroke="#805AD5"
                          strokeWidth="0.5"
                          onClick={() => handleSplit(i)}
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                          id={`unsplit-slice-${i}`}
                        />
                      );
                    }
                  })}
                </svg>
              </div>
              <div className="text-center font-medium">
                {allSplit ? 
                  `Selected: ${selectedPieces.filter(Boolean).length} magical pieces` : 
                  `Split: ${splitPieces.filter(Boolean).length}/${currentChallenge.denominator} slices`}
              </div>
            </div>
          </div>

          {allSplit && (
            <div className="flex flex-col items-center gap-4 bg-purple-50 p-6 rounded-lg">
              <div className="text-lg font-medium">What fraction represents the selected pieces?</div>
              <div className="flex items-center gap-2">
                <Input 
                  type="number"
                  value={userAnswer.numerator}
                  onChange={(e) => setUserAnswer((prev: { numerator: string, denominator: string }) => ({ ...prev, numerator: e.target.value }))}
                  className="w-20 text-center"
                  placeholder="?"
                  id="numerator-input"
                />
                <div className="text-2xl">/</div>
                <Input 
                  type="number"
                  value={userAnswer.denominator}
                  onChange={(e) => setUserAnswer((prev: { numerator: string, denominator: string }) => ({ ...prev, denominator: e.target.value }))}
                  className="w-20 text-center"
                  placeholder="?"
                  id="denominator-input"
                />
                <Button 
                  onClick={checkAnswer}
                  className="ml-4 bg-purple-500 hover:bg-purple-600"
                  id="check-answer-button"
                >
                  Check Answer
                </Button>
              </div>
              {showAnswerFeedback && !answerIsCorrect && (
                <div className="text-red-500">
                  That's not quite right. Try again!
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              className="text-sm bg-yellow-50 hover:bg-yellow-100"
              id="hint-button"
            >
              Ask Scarecrow for help
            </Button>
            <Button 
              onClick={reset}
              variant="outline"
              className="flex items-center gap-2 text-sm bg-red-50 hover:bg-red-100"
              id="reset-button"
            >
              <RefreshCw className="w-4 h-4" /> Return to Kansas
            </Button>
          </div>

          {showHint && (
            <div className="bg-yellow-50 p-4 rounded-lg text-center border-2 border-yellow-200">
              <p className="font-medium">🎭 Scarecrow's Smart Thinking:</p>
              <p className="text-sm text-gray-700">
                {!allSplit ? 
                  `First, let's use Glinda's magic to split each crystal slice into ${currentChallenge.splitCount} equal pieces!` : 
                  `If we had ${currentChallenge.numerator} big pieces, and each piece splits into ${currentChallenge.splitCount} smaller pieces, how many small pieces would that make?`}
              </p>
            </div>
          )}

          {showSuccess && (
            <div className="bg-purple-50 p-4 rounded-lg text-center border-2 border-purple-200">
              <div className="flex items-center justify-center gap-2 text-purple-600 font-medium">
                <Star className="w-5 h-5" />
                Magical Success! 🎉
              </div>
              <p className="text-sm text-gray-700 mt-2">
                "Wonderful!" says Glinda. "You've discovered that 
                <span className="font-bold"> {currentChallenge.numerator}/{currentChallenge.denominator} = 
                {currentChallenge.numerator * currentChallenge.splitCount}/{currentChallenge.denominator * currentChallenge.splitCount}</span>!"
              </p>
              <Button 
                onClick={nextLevel}
                className="mt-4 bg-purple-500 hover:bg-purple-600 text-white"
                id="next-level-button"
              >
                Continue Down the Yellow Brick Road
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OzFractions;
