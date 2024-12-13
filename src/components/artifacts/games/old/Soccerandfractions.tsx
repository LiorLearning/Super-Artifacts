
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/custom_ui/card';
import { Button } from '@/components/custom_ui/button';
import { Input } from '@/components/custom_ui/input';
import { Alert, AlertDescription } from '@/components/custom_ui/alert';
import { Trophy, Heart } from 'lucide-react';

interface GameState {
  aliTeamScore: number;
  opponentScore: number;
  difficulty: 'easy' | 'medium' | 'hard';
  lives: number;
  timeLeft: number;
  isPlaying: boolean;
  ballPosition: number;
  ballAnimation: boolean;
}

interface Fraction {
  num: number;
  den: number;
}

interface Problem {
  fraction1: Fraction;
  fraction2: Fraction;
  operation: string;
  difficulty: string;
}

interface UserAnswer {
  numerator: string;
  denominator: string;
}

const AliziannasSoccerGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    aliTeamScore: 0,
    opponentScore: 0,
    difficulty: 'medium',
    lives: 3,
    timeLeft: 600,
    isPlaying: false,
    ballPosition: 50,
    ballAnimation: false
  });

  const [userAnswer, setUserAnswer] = useState<UserAnswer>({ numerator: '', denominator: '' });
  const [problem, setProblem] = useState<Problem | null>(null);
  const [message, setMessage] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.isPlaying && gameState.timeLeft > 0) {
      timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState.isPlaying, gameState.timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generateProblem = (difficulty: string): Problem => {
    let num1: number = 0, num2: number = 0, den1: number = 0, den2: number = 0, operation: string = '';

    switch(difficulty) {
      case 'easy':
        den1 = den2 = [2, 4, 6][Math.floor(Math.random() * 3)];
        num1 = Math.floor(Math.random() * (den1 - 1)) + 1;
        num2 = Math.floor(Math.random() * (den1 - 1)) + 1;
        operation = '+';
        break;
      
      case 'medium':
        den1 = [2, 3, 4][Math.floor(Math.random() * 3)];
        den2 = den1 * 2;
        num1 = Math.floor(Math.random() * (den1 - 1)) + 1;
        num2 = Math.floor(Math.random() * (den2 - 1)) + 1;
        operation = Math.random() < 0.7 ? '+' : '-';
        break;
      
      case 'hard':
        den1 = [3, 4, 6, 8][Math.floor(Math.random() * 4)];
        den2 = [3, 4, 6, 8][Math.floor(Math.random() * 4)];
        num1 = Math.floor(Math.random() * (den1 - 1)) + 1;
        num2 = Math.floor(Math.random() * (den2 - 1)) + 1;
        operation = Math.random() < 0.5 ? '+' : '-';
        break;
    }

    return {
      fraction1: { num: num1, den: den1 },
      fraction2: { num: num2, den: den2 },
      operation: operation,
      difficulty: difficulty
    };
  };

  const calculateAnswer = (problem: Problem) => {
    const { fraction1, fraction2, operation } = problem;
    const lcm = getLCM(fraction1.den, fraction2.den);
    
    const num1 = fraction1.num * (lcm / fraction1.den);
    const num2 = fraction2.num * (lcm / fraction2.den);
    
    const resultNum = operation === '+' ? num1 + num2 : num1 - num2;
    const gcd = getGCD(Math.abs(resultNum), lcm);
    
    return {
      num: resultNum / gcd,
      den: lcm / gcd
    };
  };

  const getLCM = (a: number, b: number): number => (a * b) / getGCD(a, b);
  const getGCD = (a: number, b: number): number => b === 0 ? a : getGCD(b, a % b);

  const handleSubmit = () => {
    if (!problem) return;

    const correctAnswer = calculateAnswer(problem);
    const isCorrect = 
      parseInt(userAnswer.numerator) === correctAnswer.num && 
      parseInt(userAnswer.denominator) === correctAnswer.den;

    setGameState(prev => ({
      ...prev,
      ballAnimation: true,
      ballPosition: isCorrect ? 100 : 0
    }));

    setTimeout(() => {
      if (isCorrect) {
        setGameState(prev => ({
          ...prev,
          aliTeamScore: prev.aliTeamScore + 1,
          difficulty: 'hard',
          ballAnimation: false,
          ballPosition: 50
        }));
        setMessage("GOOOOOAL! Brilliant work, Alizianna! 🌟⚽");
      } else {
        setGameState(prev => ({
          ...prev,
          opponentScore: prev.opponentScore + 1,
          difficulty: 'easy',
          lives: prev.lives - 1,
          ballAnimation: false,
          ballPosition: 50
        }));
        const hint = "Let's try an easier one. Remember: " + 
          getHintForDifficulty(problem.difficulty);
        setMessage(hint);
        setShowHint(true);
      }

      setUserAnswer({ numerator: '', denominator: '' });
      setTimeout(() => {
        setProblem(generateProblem(gameState.difficulty));
        setShowHint(false);
      }, 1500);
    }, 1000);
  };

  const getHintForDifficulty = (difficulty: string): string => {
    switch(difficulty) {
      case 'easy':
        return "With same denominators, we just add/subtract the top numbers!";
      case 'medium':
        return "Look for a common denominator between these fractions.";
      case 'hard':
        return "Find the least common multiple of the denominators first.";
      default:
        return "Take your time and break it down step by step.";
    }
  };

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true
    }));
    setProblem(generateProblem('medium'));
  };

  const livesArray = Array.from({ length: Math.max(0, gameState.lives) }, (_, index) => index);

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-b from-blue-100 to-green-100">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Alizianna's Soccer Championship</h1>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="font-bold">Team Ali: {gameState.aliTeamScore}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {livesArray.map((i) => (
                  <Heart key={i} className="w-5 h-5 text-red-500" />
                ))}
              </div>
              <span className="font-bold text-xl">{formatTime(gameState.timeLeft)}</span>
            </div>
            <div>
              <span className="font-bold">Opponents: {gameState.opponentScore}</span>
            </div>
          </div>
        </div>

        <div className="relative w-full h-32 bg-green-600 rounded-lg mb-4 overflow-hidden">
          <div className="absolute w-full h-full border-2 border-white rounded-lg">
            <div className="absolute left-1/2 top-1/2 w-16 h-16 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute left-0 top-1/2 w-8 h-16 border-2 border-white transform -translate-y-1/2"></div>
            <div className="absolute right-0 top-1/2 w-8 h-16 border-2 border-white transform -translate-y-1/2"></div>
          </div>
          
          <div 
            className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ${gameState.ballAnimation ? 'ease-in-out' : ''}`}
            style={{
              left: `${gameState.ballPosition}%`,
              transform: `translate(-50%, -50%) ${gameState.ballAnimation ? 'rotate(360deg)' : ''}`
            }}
          >
            <div className="w-6 h-6 bg-white rounded-full border-2 border-black"></div>
          </div>
        </div>

        {!gameState.isPlaying ? (
          <div className="text-center">
            <Button 
              onClick={startGame}
              className="bg-blue-500 hover:bg-blue-600"
              id="start-game"
            >
              Start Game! ⚽
            </Button>
          </div>
        ) : (
          problem && (
            <div className="space-y-6">
              <div className="text-center text-2xl font-bold">
                <span className="inline-block bg-white p-3 rounded-lg shadow">
                  {problem.fraction1.num}/{problem.fraction1.den}
                </span>
                <span className="mx-4 text-3xl">{problem.operation}</span>
                <span className="inline-block bg-white p-3 rounded-lg shadow">
                  {problem.fraction2.num}/{problem.fraction2.den}
                </span>
              </div>

              <div className="flex justify-center items-center gap-4">
                <Input
                  type="number"
                  value={userAnswer.numerator}
                  onChange={(e) => setUserAnswer(prev => ({...prev, numerator: e.target.value}))}
                  className="w-20 text-center text-lg"
                  placeholder="?"
                  id="numerator-input"
                />
                <div className="text-2xl font-bold">/</div>
                <Input
                  type="number"
                  value={userAnswer.denominator}
                  onChange={(e) => setUserAnswer(prev => ({...prev, denominator: e.target.value}))}
                  className="w-20 text-center text-lg"
                  placeholder="?"
                  id="denominator-input"
                />
                <Button 
                  onClick={handleSubmit}
                  className="ml-4 bg-blue-500 hover:bg-blue-600"
                  disabled={gameState.ballAnimation}
                  id="submit-answer"
                >
                  Shoot! ⚽
                </Button>
              </div>

              {message && (
                <Alert className={`mt-4 ${showHint ? 'bg-yellow-100' : 'bg-green-100'}`}>
                  <AlertDescription className="text-center text-lg">
                    {message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default AliziannasSoccerGame;
