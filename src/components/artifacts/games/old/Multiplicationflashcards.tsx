
import React, { useState, useEffect } from 'react';
import { Crown, Star } from 'lucide-react';
import { Button } from '@/components/custom_ui/button';
import { Input } from '@/components/custom_ui/input';
import { Alert } from '@/components/custom_ui/alert';

const CandyMathRescue = () => {
  const [gameState, setGameState] = useState<string>('idle');
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(7);

  const TARGET_SCORE = 1000;

  const candyColors = [
    'from-green-400 to-pink-400',
    'from-yellow-400 to-orange-400',
    'from-pink-400 to-red-400',
    'from-blue-400 to-teal-400'
  ];
  const [currentColor, setCurrentColor] = useState<string>(candyColors[0]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime: number) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      checkAnswer();
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  useEffect(() => {
    if (score >= TARGET_SCORE) {
      setGameState('victory');
      setShowAlert(true);
      setAlertMessage('🎉 You broke the candy cage! The princess is free from the witch! 🏰');
    }
  }, [score]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    generateNewProblem();
  };

  const generateNewProblem = () => {
    const getRandomNum = () => Math.floor(Math.random() * 8) + 3;
    setNum1(getRandomNum());
    setNum2(getRandomNum());
    setUserAnswer('');
    setCurrentColor(candyColors[Math.floor(Math.random() * candyColors.length)]);
    setTimeLeft(7);
  };

  const checkAnswer = () => {
    const correctAnswer = num1 * num2;
    if (parseInt(userAnswer) === correctAnswer) {
      setScore(score + 25);
      setAlertMessage('🍬 Sweet magic! The cage weakens! +25 sugar points! 🍭');
    } else {
      setAlertMessage(`🧙‍♀️ The witch cackles! The answer was ${correctAnswer}! Try again! 🪄`);
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      if (gameState === 'playing') {
        generateNewProblem();
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-pink-400 p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-red-400 to-white rounded-full transform rotate-45 border-4 border-white"></div>
        <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-r from-green-400 to-white rounded-full transform -rotate-12 border-4 border-white"></div>
        <div className="absolute bottom-10 left-1/4 w-8 h-32 bg-gradient-to-b from-yellow-500 via-red-500 to-white transform rotate-45"></div>
        <div className="absolute top-1/4 right-10 w-8 h-32 bg-gradient-to-b from-yellow-500 via-red-500 to-white transform -rotate-45"></div>
      </div>

      <div className="z-10 bg-white bg-opacity-95 p-6 rounded-2xl shadow-xl w-full max-w-md border-4 border-pink-300">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-green-600">Witch's Candy Prison</h1>
          <Crown className="h-8 w-8 text-yellow-400" />
        </div>

        <div className="mb-4">
          <div className="text-lg font-bold text-purple-600">
            Break {TARGET_SCORE - score} more sugar crystals to free the princess! 👑
          </div>
        </div>

        {gameState === 'idle' && (
          <div className="text-center p-4">
            <div className="mb-6 bg-gradient-to-b from-green-100 to-pink-100 p-4 rounded-xl border-2 border-green-300">
              <h2 className="text-xl font-bold text-purple-600 mb-2">🧙‍♀️ The Candy Witch's Challenge! 🏰</h2>
              <p className="text-lg text-gray-700">
                The wicked candy witch has trapped the princess in a sugary cage! Solve multiplication problems to break her sweet spell! Each correct answer earns 25 sugar points. But hurry - you only have 7 seconds before each spell strengthens!
              </p>
            </div>
            <Button
              id="start-game"
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:from-green-600 hover:to-pink-600 transform hover:scale-105 transition-all shadow-lg"
            >
              Face the Candy Witch!
            </Button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className={`bg-gradient-to-r ${currentColor} rounded-xl shadow-lg p-6 w-full aspect-square flex flex-col items-center justify-center border-4 border-white`}>
            <div className="text-6xl font-bold mb-4 text-white drop-shadow-lg">
              {num1} × {num2}
            </div>
            <div className="text-xl font-bold mb-4 text-white">
              ⏳ Spell Timer: {timeLeft}s
            </div>
            <Input
              id="user-answer"
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-4 text-2xl text-center rounded-lg border-4 border-white focus:outline-none focus:border-yellow-300 shadow-inner"
              placeholder="Cast your counter-spell!"
            />
          </div>
        )}

        {gameState === 'victory' && (
          <div className="text-center p-6 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-xl border-4 border-yellow-300">
            <div className="flex justify-center mb-4">
              <Star className="h-16 w-16 text-yellow-500 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-purple-700 mb-2">
              🎉 The Princess is Free! 🎉
            </h2>
            <p className="text-lg text-purple-600 mb-4">
              You've outsmarted the candy witch with {score} sugar points! The princess can now escape her candy cage!
            </p>
            <Button
              id="play-again"
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-pink-500 text-white px-6 py-2 rounded-full text-lg font-bold hover:from-green-600 hover:to-pink-600 transform hover:scale-105 transition-all"
            >
              Play Again!
            </Button>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <div className="text-xl font-bold text-pink-600">
            🍬 Sugar Points: {score}
          </div>
          {gameState === 'playing' && (
            <Button
              id="flee-castle"
              onClick={() => setGameState('idle')}
              className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-green-600 transition-all shadow-md"
            >
              Flee Castle
            </Button>
          )}
        </div>
      </div>

      {showAlert && (
        <Alert className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-xl text-center border-4 border-pink-400 animate-bounce max-w-sm shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-pink-600">{alertMessage}</h2>
            {gameState === 'playing' && (
              <p className="text-sm text-purple-600">
                Keep breaking the witch's spells! 🧙‍♀️✨
              </p>
            )}
          </div>
        </Alert>
      )}
    </div>
  );
};

export default CandyMathRescue;
