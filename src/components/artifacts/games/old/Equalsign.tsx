
import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from "@/components/custom_ui/alert";
import { Sparkles, Heart, Trophy, Check, X, GraduationCap } from 'lucide-react';
import { Button } from "@/components/custom_ui/button";
import { Input } from "@/components/custom_ui/input";

interface MagicNumberBoxProps {
  value: number;
  onChange: (value: number) => void;
  color: string;
  character: string;
  isLocked: boolean;
}

const MagicNumberBox: React.FC<MagicNumberBoxProps> = ({ value, onChange, color, character, isLocked }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`text-sm font-bold ${color.replace('border', 'text')}`}>
        {character}
      </div>
      <Input
        id="magic-number-input"
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className={`w-16 h-16 text-2xl text-center border-4 rounded-lg ${color} focus:ring-2 
          bg-white/90 backdrop-blur-sm shadow-inner transition-transform hover:scale-105
          ${isLocked ? 'opacity-70 cursor-not-allowed' : ''}`}
        min="0"
        max={10}
        disabled={isLocked}
      />
      <div className="flex flex-wrap gap-1 justify-center max-w-[120px]">
        {[...Array(value)].map((_, i) => (
          <div key={i} className="relative" style={{ animationDelay: `${i * 100}ms` }}>
            <Sparkles 
              className={`w-5 h-5 ${color.replace('border', 'text')}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const OzMathDiscovery = () => {
  const [leftFirst, setLeftFirst] = useState(0);
  const [leftSecond, setLeftSecond] = useState(0);
  const [rightFirst, setRightFirst] = useState(0);
  const [rightSecond, setRightSecond] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  
  const leftSum = leftFirst + leftSecond;
  const rightSum = rightFirst + rightSecond;
  const isEqual = leftSum === rightSum;

  const handleNumberChange = (setter: any) => (value: any) => {
    setter(Math.min(Math.max(0, value), 10));
  };

  useEffect(() => {
    generateNewProblem();
  }, [level]);

  const generateNewProblem = () => {
    const maxNum = Math.min(3 + level, 10);
    const leftNum = Math.floor(Math.random() * maxNum) + 1;
    const rightNum = Math.floor(Math.random() * maxNum) + 1;
    
    setLeftFirst(leftNum);
    setLeftSecond(0);
    setRightFirst(rightNum);
    setRightSecond(0);
    setIsSubmitted(false);
    setFeedback(null);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    
    if (isEqual && leftSum > 0) {
      setFeedback({
        type: 'success',
        message: `Wonderful Aeryn! Both paths have ${leftSum} crystals! +${level * 10} points!`,
        icon: <Check className="text-green-500 w-6 h-6" />
      });
      setScore(score + (level * 10));
      
      setTimeout(() => {
        setLevel(level + 1);
        generateNewProblem();
      }, 2000);
    } else {
      setFeedback({
        type: 'error',
        message: leftSum > rightSum ? 
          `Hint: Dorothy's path has more crystals (${leftSum}) than Glinda's path (${rightSum}). Try adding more to Glinda's side!` :
          `Hint: Glinda's path has more crystals (${rightSum}) than Dorothy's path (${leftSum}). Try adding more to Dorothy's side!`,
        icon: <X className="text-red-500 w-6 h-6" />
      });
    }
  };

  const renderTotal = (sum: any, baseColor: any) => (
    <div className="flex flex-col items-center mt-4 pt-4 border-t-2 border-yellow-200">
      <div className="text-2xl font-bold mb-2 text-yellow-600">{sum} Crystals</div>
      <div className="flex flex-wrap gap-1 justify-center max-w-[150px]">
        {[...Array(sum)].map((_, i) => (
          <Sparkles 
            key={i}
            className={`w-5 h-5 text-yellow-400 ${isSubmitted && isEqual ? 'animate-spin' : 'animate-pulse'}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-100 to-yellow-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3">
            <GraduationCap className="w-12 h-12 text-purple-600" />
            <h1 className="text-4xl font-bold text-purple-600">
              Aeryn's Magical Math Adventure
            </h1>
            <GraduationCap className="w-12 h-12 text-purple-600" />
          </div>
          <p className="text-xl text-purple-700">
            Help Glinda collect equal amounts of magical crystals!
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-md">
              <Trophy className="text-yellow-500 w-6 h-6" />
              <span className="text-xl font-bold text-purple-600">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-md">
              <Sparkles className="text-purple-500 w-6 h-6" />
              <span className="text-xl font-bold text-purple-600">Level: {level}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-12 bg-white/40 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          <div className="space-y-6 p-6 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-yellow-300 shadow-lg">
            <div className="text-center text-xl font-bold text-purple-600 mb-4">
              Dorothy's Path
            </div>
            <div className="flex items-center space-x-4">
              <MagicNumberBox 
                value={leftFirst} 
                onChange={handleNumberChange(setLeftFirst)}
                color="border-pink-400"
                character="Dorothy"
                isLocked={true}
              />
              <span className="text-3xl font-bold text-yellow-600">+</span>
              <MagicNumberBox 
                value={leftSecond} 
                onChange={handleNumberChange(setLeftSecond)}
                color="border-yellow-400"
                character="Scarecrow"
                isLocked={false}
              />
            </div>
            {renderTotal(leftSum, "text-yellow-400")}
          </div>

          <div className="text-5xl font-bold text-yellow-600">=</div>

          <div className="space-y-6 p-6 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-yellow-300 shadow-lg">
            <div className="text-center text-xl font-bold text-purple-600 mb-4">
              Glinda's Path
            </div>
            <div className="flex items-center space-x-4">
              <MagicNumberBox 
                value={rightFirst} 
                onChange={handleNumberChange(setRightFirst)}
                color="border-purple-400"
                character="Glinda"
                isLocked={true}
              />
              <span className="text-3xl font-bold text-yellow-600">+</span>
              <MagicNumberBox 
                value={rightSecond} 
                onChange={handleNumberChange(setRightSecond)}
                color="border-blue-400"
                character="Friends"
                isLocked={false}
              />
            </div>
            {renderTotal(rightSum, "text-yellow-400")}
          </div>
        </div>

        <div className="text-center mt-8">
          <Button 
            id="submit-button"
            onClick={handleSubmit}
            className="bg-purple-500 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-purple-600 
              shadow-lg transform transition hover:scale-105 flex mx-auto items-center gap-2"
          >
            Check My Answer
          </Button>
        </div>

        {feedback && (
          <div className="mt-6">
            <Alert className={`${feedback.type === 'success' ? 'bg-green-100/90' : 'bg-red-100/90'} 
              backdrop-blur-sm border-${feedback.type === 'success' ? 'green' : 'red'}-500 max-w-2xl mx-auto`}>
              <AlertTitle className="text-center flex items-center justify-center gap-2 text-lg">
                {feedback.icon}
                {feedback.message}
                {feedback.type === 'success' && <Heart className="text-pink-500 animate-bounce" />}
              </AlertTitle>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default OzMathDiscovery;
