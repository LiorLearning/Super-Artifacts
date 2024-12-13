import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, HelpCircle } from 'lucide-react';

const GhostBuster = () => {
  const locations = [
    {
      name: "Enchanted Garden",
      description: "A magical garden where friendly number sprites play hide and seek...",
      theme: "from-green-400 to-blue-500",
      icon: "🌸",
      friendEmoji: "🦋"
    },
    {
      name: "Rainbow Castle",
      description: "A sparkling castle where number magic comes to life...",
      theme: "from-purple-400 to-pink-500",
      icon: "🏰",
      friendEmoji: "✨"
    },
    {
      name: "Cloud Kingdom",
      description: "Where playful number fairies dance among fluffy clouds!",
      theme: "from-blue-300 to-purple-400",
      icon: "☁️",
      friendEmoji: "🌟"
    }
  ];

  const [ghosts, setGhosts] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [gameState, setGameState] = useState('ready');
  const [shake, setShake] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(0);
  const [story, setStory] = useState('');
  const [foundFactors, setFoundFactors] = useState([]);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [showHint, setShowHint] = useState(false);

  const generateStory = (locationIndex, level) => {
    const stories = [
      `Level ${level}: Welcome to the ${locations[locationIndex].name}! ${level === 1 ? "Let's start our magical adventure!" : "More number magic awaits..."}`,
      `The ${locations[locationIndex].friendEmoji} number sprites are playing hide and seek! Can you help find them all?`,
      `Hey Dallas! The friendly sprites in ${locations[locationIndex].name} need your help with some number magic!`
    ];
    return stories[Math.floor(Math.random() * stories.length)];
  };

  const generateGhosts = () => {
    const number = Math.floor(Math.random() * 61) + 40;
    const factors = Array.from(Array(number + 1), (_, i) => i).filter(i => number % i === 0);
    
    setQuestion({
      number,
      text: `${locations[currentLocation].name} Challenge: The magical number ${number} has special friends! Can you find ALL its factors to help the ${factors.length} number sprites?`,
      answer: factors,
      hint: `Try dividing ${number} by small numbers first... ${factors[1]} is a friendly number!`
    });
    setGhosts(Array(factors.length).fill({ defeated: false }));
    setFoundFactors([]);
    setStory(generateStory(currentLocation, level));
    setHintsRemaining(3);
    setShowHint(false);
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setCurrentLocation(0);
    generateGhosts();
  };

  const checkAnswer = () => {
    const userNumber = parseInt(answer.trim());
    if (isNaN(userNumber)) {
      setFeedback("Please enter a number!");
      return;
    }

    if (question.answer.includes(userNumber) && !foundFactors.includes(userNumber)) {
      playSound('ghost');
      setFoundFactors([...foundFactors, userNumber]);
      setGhosts(prev => {
        const newGhosts = [...prev];
        const firstAlive = newGhosts.findIndex(g => !g.defeated);
        if (firstAlive !== -1) {
          newGhosts[firstAlive] = { defeated: true };
        }
        return newGhosts;
      });
      setFeedback(`WONDERFUL! ${userNumber} is a factor friend! ${question.answer.length - foundFactors.length - 1} sprites to go!`);
      
      if (foundFactors.length + 1 === question.answer.length) {
        playSound('victory');
        if (currentLocation === locations.length - 1) {
          setLevel(level + 1);
          setCurrentLocation(0);
        } else {
          setCurrentLocation(currentLocation + 1);
        }
        setGameState('victory');
        setScore(score + question.answer.length);
      }
    } else if (foundFactors.includes(userNumber)) {
      playSound('wrong');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setFeedback(`You've already found ${userNumber}! Try another number friend!`);
    } else {
      playSound('wrong');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setFeedback(`${userNumber} isn't a factor of our magical number. Keep trying!`);
    }
    setAnswer('');
  };

  const useHint = () => {
    if (hintsRemaining > 0) {
      setHintsRemaining(prev => prev - 1);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 5000);
    }
  };

  const playSound = (type) => {
    const audio = new Audio();
    switch(type) {
      case 'ghost':
        audio.src = 'data:audio/wav;base64,UklGRmR...';
        break;
      case 'victory':
        audio.src = 'data:audio/wav;base64,UklGRmR...';
        break;
      case 'wrong':
        audio.src = 'data:audio/wav;base64,UklGRmR...';
        break;
    }
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  return (
    <>
    <Card className={`w-full max-w-4xl bg-gradient-to-b ${locations[currentLocation].theme} p-6 text-white transition-colors duration-1000`}>
      <CardContent>
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-4 text-yellow-300 font-magical">
            Dallas's Magic School of Numbers 
            <span className="text-5xl ml-2">{locations[currentLocation].icon}</span>
          </h1>
          <div className="flex justify-center items-center gap-4 text-2xl">
            <Star className="text-yellow-300 w-8 h-8" />
            <span>Level {level} - {locations[currentLocation].name}</span>
            <Star className="text-yellow-300 w-8 h-8" />
          </div>
          <div className="text-xl mt-2 text-yellow-200">
            Magic Stars Collected: {score}
          </div>
        </div>

        {gameState === 'ready' && (
          <div className="text-center space-y-6">
            <h2 className="text-3xl mb-4">Ready for a magical adventure, Dallas?</h2>
            <p className="text-xl mb-4">{locations[0].description}</p>
            <Button 
              onClick={startGame}
              className="bg-yellow-500 hover:bg-yellow-400 text-2xl p-6 text-purple-900"
            >
              Start the Magic! {locations[0].friendEmoji}
            </Button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="space-y-6">
            <div className="text-xl italic text-center mb-4 text-white">
              {story}
            </div>
            
            <div className="grid grid-cols-5 gap-4 mb-6">
              {ghosts.map((ghost, index) => (
                <div 
                  key={index}
                  className={`text-6xl ${ghost.defeated ? 'animate-bounce-out opacity-50' : 'animate-float'}`}
                >
                  {ghost.defeated ? '⭐' : locations[currentLocation].friendEmoji}
                </div>
              ))}
            </div>

            <div className={`rounded-lg p-6 bg-white bg-opacity-20 shadow-lg ${shake ? 'animate-shake' : ''}`}>
              <p className="text-2xl mb-4">{question?.text}</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter one factor..."
                  className="flex-1 p-4 text-xl rounded bg-white bg-opacity-30 text-white border-yellow-300 border-2 placeholder-white placeholder-opacity-70"
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                />
                <Button 
                  onClick={checkAnswer}
                  className="bg-yellow-500 hover:bg-yellow-400 text-xl p-6 text-purple-900"
                >
                  Find Friend! 🌈
                </Button>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-white">
                  Found friends: {foundFactors.join(', ')}
                </div>
                <Button
                  onClick={useHint}
                  disabled={hintsRemaining === 0}
                  className="bg-purple-500 hover:bg-purple-400 text-white"
                >
                  <HelpCircle className="mr-2" />
                  Magic Hints: {hintsRemaining}
                </Button>
              </div>
              
              {showHint && (
                <div className="mt-4 p-3 bg-purple-500 bg-opacity-50 rounded-lg text-white">
                  {question?.hint}
                </div>
              )}
            </div>
          </div>
        )}

        {gameState === 'victory' && (
          <div className="text-center animate-victory space-y-6">
            <h2 className="text-4xl mb-4">🌈 MAGICAL SUCCESS! 🌈</h2>
            <p className="text-2xl mb-6">
              {currentLocation === locations.length - 1 
                ? `Amazing work! Level ${level} complete! Ready for more magical challenges?`
                : `${locations[currentLocation].name} is sparkling with joy! ${locations[currentLocation + 1].name} awaits your number magic!`}
            </p>
            <Button 
              onClick={() => {
                setGameState('playing');
                generateGhosts();
              }}
              className="bg-yellow-500 hover:bg-yellow-400 text-2xl p-6 text-purple-900"
            >
              {currentLocation === locations.length - 1 ? 'Next Adventure! 🌈' : 'Continue Magic! ✨'}
            </Button>
          </div>
        )}

        {feedback && (
          <div className="mt-4 text-2xl text-center p-4 rounded-lg bg-white bg-opacity-20 text-white animate-feedback">
            {feedback}
          </div>
        )}
      </CardContent>

      <style jsx>{`
        @keyframes bounce-out {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes victory {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes feedback {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-bounce-out {
          animation: bounce-out 0.5s forwards;
        }
        .animate-shake {
          animation: shake 0.5s;
        }
        .animate-victory {
          animation: victory 0.5s;
        }
        .animate-feedback {
          animation: feedback 0.3s;
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        .font-magical {
          text-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700;
        }
      `}</style>
    </Card>
    </>
  );
};

export default GhostBuster;