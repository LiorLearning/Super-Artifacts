
import { useState, useEffect } from 'react';
import { Plus, Minus, Star, Sparkles } from 'lucide-react';
import { Card } from '@/components/custom_ui/card';
import { Alert, AlertDescription } from '@/components/custom_ui/alert';

// Custom Bunny component
const Bunny = ({ className, delay = 0 }: any) => (
  <div 
    className={`relative ${className}`}
    style={{ 
      animation: 'hop 1s infinite',
      animationDelay: `${delay}s`,
      animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }}
  >
    <div className="w-8 h-8 bg-pink-200 rounded-full relative shadow-md">
      <div className="absolute -top-4 left-1 w-2 h-4 bg-pink-200 rounded-full transform -rotate-6"></div>
      <div className="absolute -top-4 right-1 w-2 h-4 bg-pink-200 rounded-full transform rotate-6"></div>
      <div className="absolute top-2 left-2 w-1 h-1 bg-pink-900 rounded-full"></div>
      <div className="absolute top-2 right-2 w-1 h-1 bg-pink-900 rounded-full"></div>
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-pink-400 rounded-full"></div>
    </div>
  </div>
);

// Custom Equals component
const Equals = () => (
  <div className="flex flex-col gap-1">
    <div className="h-1 w-6 bg-purple-600 rounded"></div>
    <div className="h-1 w-6 bg-purple-600 rounded"></div>
  </div>
);

// Story elements for different levels
const STORY_STAGES: any = {
  1: {
    title: "The Meadow",
    description: "Help Charlotte count her first group of bunnies in the peaceful meadow!",
    range: { min: 1, max: 5 }
  },
  2: {
    title: "The Forest",
    description: "More bunnies join Charlotte as she ventures into the magical forest!",
    range: { min: 3, max: 8 }
  },
  3: {
    title: "The Mountains",
    description: "Charlotte needs to count carefully as her bunny army grows in the misty mountains!",
    range: { min: 5, max: 12 }
  },
  4: {
    title: "The Crystal Cave",
    description: "Deep in the caves, Charlotte prepares her strongest bunnies to face the Enderman!",
    range: { min: 8, max: 15 }
  }
};

// Celebration component
const Celebration = () => {
  const particles: any = Array(8).fill(null);
  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((_: any, i: number) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        >
          {Math.random() > 0.5 ? 
            <Star className="text-yellow-400 w-6 h-6" /> : 
            <Sparkles className="text-purple-400 w-6 h-6" />
          }
        </div>
      ))}
    </div>
  );
};

// BunnyGroupDisplay Component
const BunnyGroupDisplay = ({ number, title, subtitle }: any) => (
  <Card className="p-6 bg-white border-2 w-48 shadow-lg relative overflow-hidden">
    <div className="absolute top-2 left-2 text-sm font-bold text-pink-800">{title}</div>
    {subtitle && (
      <div className="absolute top-6 left-2 text-xs text-pink-600">{subtitle}</div>
    )}
    <div className="mt-8">
      <div className="grid grid-cols-5 gap-1 mb-4 place-items-center">
        {[...Array(number)].map((_, i) => (
          <Bunny 
            key={i} 
            delay={i * 0.1}
            className="transform transition-transform hover:scale-110"
          />
        ))}
      </div>
      <div className="text-center">
        <span className="text-2xl font-bold text-pink-800">{number}</span>
      </div>
    </div>
  </Card>
);

export default function BunnyAdditionQuiz() {
  const [number1, setNumber1] = useState(2);
  const [number2, setNumber2] = useState(1);
  const [userAnswer, setUserAnswer] = useState(0);
  const [xp, setXp] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [level, setLevel] = useState(1);
  const [powerLevel, setPowerLevel] = useState(0);
  
  const correctAnswer = number1 + number2;

  const generateNewQuestion = () => {
    const stage: any = STORY_STAGES[level];
    const newNum1 = Math.floor(Math.random() * (stage.range.max - stage.range.min + 1)) + stage.range.min;
    let newNum2: any;
    do {
      newNum2 = Math.floor(Math.random() * (stage.range.max - stage.range.min + 1)) + stage.range.min;
    } while (newNum1 + newNum2 > stage.range.max * 2);
    
    setNumber1(newNum1);
    setNumber2(newNum2);
    setUserAnswer(0);
    setFeedback('');
    setIsChecking(false);
  };

  const checkAnswer = () => {
    if (isChecking) return;
    setIsChecking(true);
    
    if (userAnswer === correctAnswer) {
      const xpGain = 10 + (streak * 5) + (level * 5);
      const newXP = xp + xpGain;
      setXp(newXP);
      setStreak(prev => prev + 1);
      setShowCelebration(true);
      setPowerLevel(Math.floor(newXP / 100));
      
      // Level progression
      if (streak === 4 && level < 4) {
        setLevel(prev => prev + 1);
        setFeedback(`🎉 Amazing! You've unlocked ${STORY_STAGES[level + 1].title}! +${xpGain} XP!`);
      } else {
        setFeedback(`✨ Charlotte's bunnies multiply correctly! +${xpGain} XP! Streak: ${streak + 1}`);
      }
      
      setTimeout(() => {
        setShowCelebration(false);
        generateNewQuestion();
      }, 2000);
    } else {
      setStreak(0);
      setFeedback('Oh no! The Enderman is getting closer! Count the bunnies again, Charlotte! ⭐');
      setIsChecking(false);
    }
  };

  useEffect(() => {
    generateNewQuestion();
  }, [level]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-gradient-to-b from-purple-100 to-pink-100 min-h-screen">
      {showCelebration && <Celebration />}
      
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-purple-800 mb-2">Charlotte's Bunny Kingdom</h1>
        <p className="text-xl text-purple-600 mb-2">{STORY_STAGES[level].title}</p>
        <p className="text-lg text-purple-500">{STORY_STAGES[level].description}</p>
        
        <div className="mt-4 flex gap-4 justify-center flex-wrap">
          <div className="bg-purple-100 px-4 py-2 rounded-lg">
            <span className="text-lg font-bold text-purple-700">Bunny Power: {powerLevel}</span>
          </div>
          <div className="bg-pink-100 px-4 py-2 rounded-lg">
            <span className="text-lg font-bold text-pink-700">XP: {xp}</span>
          </div>
          <div className="bg-yellow-100 px-4 py-2 rounded-lg">
            <span className="text-lg font-bold text-yellow-700">Streak: {streak}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <BunnyGroupDisplay 
          number={number1} 
          title="Charlotte's Bunnies"
          subtitle="First Group" 
        />
        <Plus className="text-purple-600 w-8 h-8" />
        <BunnyGroupDisplay 
          number={number2} 
          title="Reinforcements"
          subtitle="Second Group"
        />
        <div className="flex items-center justify-center w-8 h-8">
          <Equals />
        </div>
        <Card className="p-6 bg-white border-2 w-48 shadow-lg relative">
          <div className="absolute top-2 left-2 text-sm font-bold text-pink-800">Total Army</div>
          <div className="mt-8">
            <div className="grid grid-cols-5 gap-1 mb-4 place-items-center">
              {[...Array(userAnswer)].map((_, i) => (
                <Bunny 
                  key={i} 
                  delay={i * 0.1}
                  className="transform transition-transform hover:scale-110"
                />
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                id="decrement-button"
                onClick={() => setUserAnswer(Math.max(0, userAnswer - 1))}
                className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
                disabled={isChecking}
              >
                <Minus size={20} />
              </button>
              <span className="text-2xl font-bold text-purple-800">{userAnswer}</span>
              <button
                id="increment-button"
                onClick={() => setUserAnswer(Math.min(30, userAnswer + 1))}
                className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
                disabled={isChecking}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <button
          id="check-answer-button"
          onClick={checkAnswer}
          disabled={isChecking}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Count Your Army!
        </button>
        
        {feedback && (
          <Alert className={`${feedback.includes('Amazing') || feedback.includes('unlocked') ? 'bg-green-100 animate-bounce' : 'bg-yellow-100'} max-w-md`}>
            <AlertDescription className="text-lg">{feedback}</AlertDescription>
          </Alert>
        )}
      </div>

      {powerLevel >= 5 && (
        <div className="text-purple-600 bg-purple-100 p-4 rounded-lg shadow-lg animate-pulse text-center">
          <span className="font-bold">⚡ Charlotte's Bunny Power is Growing! ⚡</span>
          <br />
          The Enderman's glow dims as your army strengthens!
        </div>
      )}

      {level === 4 && powerLevel >= 10 && (
        <div className="text-pink-600 bg-pink-100 p-4 rounded-lg shadow-lg animate-pulse text-center max-w-md">
          <span className="font-bold">🌟 Charlotte's Ultimate Power! 🌟</span>
          <br />
          Your bunny army is now strong enough to face the Enderman! Keep practicing to become even stronger!
        </div>
      )}
    </div>
  );
}
