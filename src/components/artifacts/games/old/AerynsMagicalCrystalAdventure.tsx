import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Crown, Star, Gem, Wand } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/custom_ui/alert';
import { Button } from '@/components/custom_ui/button';

interface AerynsMagicalCrystalAdventureProps {
  changeGame: (gameKey: string) => void;
  sendAdminMessage: (role: string, content: string) => void;
}

const AerynsMagicalCrystalAdventure = ({ changeGame, sendAdminMessage }: AerynsMagicalCrystalAdventureProps) => {
  const [crystalA, setCrystalA] = useState<any>(5);
  const [crystalB, setCrystalB] = useState<any>(5);
  const [feedback, setFeedback] = useState<any>('');
  const [quest, setQuest] = useState<any>('');
  const [isMore, setIsMore] = useState<any>(false);
  const [difference, setDifference] = useState<any>(2);
  const [isCorrect, setIsCorrect] = useState<any>(null);
  const [isDragging, setIsDragging] = useState<any>(false);
  const [targetB, setTargetB] = useState<any>(0);
  const [score, setScore] = useState<any>(0);
  const [level, setLevel] = useState<any>(1);
  const [streak, setStreak] = useState<any>(0);
  const [attempts, setAttempts] = useState<any>(0);

  const successSound = useRef<any>(typeof Audio !== 'undefined' ? new Audio('/success.mp3') : null);
  const failSound = useRef<any>(typeof Audio !== 'undefined' ? new Audio('/fail.mp3') : null);
  const magicSound = useRef<any>(typeof Audio !== 'undefined' ? new Audio('/drag.mp3') : null);

  const crystalBRef = useRef<any>(null);
  const MAX_CRYSTALS = 10;
  const LEVELS_TO_WIN = 10;
  const POINTS_TO_LEVEL_UP = 50;
  const LEVELS_TO_LEVELS_TO_WIN = 5;

  useEffect(() => {
    generateNewQuest();
  }, [level]);

  const getRandomEmoji = (isSuccess: any) => {
    const successEmojis = ['🌈', '✨', '💫', '🦁', '🎀', '🌺', '🎭', '👗', '👠'];
    const tryAgainEmojis = ['🌙', '⭐', '🎪', '🎡'];
    const emojis = isSuccess ? successEmojis : tryAgainEmojis;
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const getLocationTitle = (level: any) => {
    const locations = [
      'Munchkinland',
      'Poppy Fields',
      'Enchanted Forest',
      'Emerald Gardens',
      'Crystal Caves',
      'Rainbow Bridge',
      'Golden Gates',
      'Silver Springs',
      'Ruby Palace',
      'Emerald City'
    ];
    return locations[Math.min(level - 1, locations.length - 1)];
  };

  const playSound = (soundRef: any) => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(console.log('Magic sound prevented'));
    }
  };

  const checkAnswer = () => {
    setAttempts(attempts + 1);
    if (crystalB === targetB) {
      const emoji = getRandomEmoji(true);
      const newStreak = streak + 1;
      const pointsEarned = Math.max(3 - attempts, 1) * 10;
      
      setStreak(newStreak);
      const newScore = score + pointsEarned;
      setScore(newScore);
      setFeedback(`${emoji} Wonderful magic, Aeryn! You earned ${pointsEarned} emerald points!`);
      setIsCorrect(true);
      
      playSound(successSound);
      
      if (newScore >= level * POINTS_TO_LEVEL_UP) {
        setLevel(Math.min(level + 1, LEVELS_TO_WIN));
      }
      
      setTimeout(() => {
        generateNewQuest();
        setAttempts(0);
      }, 2000);
    } else {
      const emoji = getRandomEmoji(false);
      setStreak(0);
      setFeedback(`${emoji} Keep trying, brave adventurer! The crystal basket needs ${targetB} crystals to be ${difference} ${difference > 1 ? 'crystals' : 'crystal'} ${isMore ? 'MORE' : 'LESS'} than Dorothy's basket.`);
      setIsCorrect(false);
      playSound(failSound);
    }
  };

  const generateNewQuest = () => {
    const newCrystalA = Math.floor(Math.random() * 6) + 3;
    const newDifference = Math.min(level, 3);
    const newIsMore = Math.random() < 0.5;
    
    setCrystalA(newCrystalA);
    setDifference(newDifference);
    setIsMore(newIsMore);
    
    const newTargetB = newIsMore ? 
      Math.min(newCrystalA + newDifference, MAX_CRYSTALS) : 
      Math.max(newCrystalA - newDifference, 0);
    
    setTargetB(newTargetB);
    setCrystalB(5);
    setIsCorrect(null);
    setFeedback('');

    setQuest(`Dorothy's basket has ${newCrystalA} magical crystals. Help the Scarecrow collect ${newDifference} ${newDifference > 1 ? 'crystals' : 'crystal'} ${newIsMore ? 'MORE' : 'LESS'} than Dorothy!`);
  };

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
    playSound(magicSound);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: any) => {
    if (isDragging && crystalBRef.current) {
      const rect = crystalBRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const height = rect.height;
      let newLevel = Math.round(MAX_CRYSTALS * (1 - y / height));
      newLevel = Math.max(0, Math.min(newLevel, MAX_CRYSTALS));
      setCrystalB(newLevel);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  const renderBasket = (crystals: any, label: any, color: any, ref: React.MutableRefObject<any> | null = null) => (
    <div className="text-center relative">
      <div 
        className={`w-32 h-80 relative overflow-hidden ${ref ? 'cursor-ns-resize' : ''}`}
        ref={ref}
        onMouseDown={ref ? handleMouseDown : undefined}
        id="basket"
      >
        <div className="absolute w-40 h-40 border-t-8 rounded-full -top-14 left-1/2 transform -translate-x-1/2 
          border-amber-700 z-30" />
        
        <div className={`absolute inset-0 ${ref ? 'border-pink-800' : 'border-amber-800'} 
          border-4 rounded-b-3xl overflow-hidden bg-[#f4d03f]/20`}>
          
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 15px,
                rgba(139, 69, 19, 0.1) 15px,
                rgba(139, 69, 19, 0.1) 20px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 15px,
                rgba(139, 69, 19, 0.1) 15px,
                rgba(139, 69, 19, 0.1) 20px
              )
            `
          }} />

          {[...Array(MAX_CRYSTALS + 1)].map((_, index) => (
            <div 
              key={`grid-${index}`}
              className="absolute w-full h-8 border-t border-amber-900/20" 
              style={{ bottom: `${(index / MAX_CRYSTALS) * 100}%` }}
            />
          ))}
          
          <div 
            className={`absolute bottom-0 left-0 right-0 transition-all duration-200 ${color}`}
            style={{ height: `${(crystals / MAX_CRYSTALS) * 100}%` }}
          />
          
          {[...Array(MAX_CRYSTALS + 1)].map((_, index) => (
            <React.Fragment key={`measure-${index}`}>
              <div 
                className="absolute left-0 w-3 h-1 bg-amber-900/60 z-10" 
                style={{ bottom: `${(index / MAX_CRYSTALS) * 100}%`, transform: 'translateY(50%)' }}
              />
              <div 
                className="absolute right-1 text-xs text-amber-900/80 font-bold z-10" 
                style={{ bottom: `${(index / MAX_CRYSTALS) * 100}%`, transform: 'translateY(50%)' }}
              >
                {index}
              </div>
            </React.Fragment>
          ))}
        </div>

        {!ref ? (
          <Gem className="absolute top-4 left-1/2 transform -translate-x-1/2 text-purple-700 z-20" size={24} />
        ) : (
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 cursor-ns-resize transition-all duration-100 z-20"
            style={{ 
              top: `${((MAX_CRYSTALS - crystalB) / MAX_CRYSTALS) * 100}%`,
            }}
            id="crystal-gem-indicator"
          >
            <div className="relative">
              <Gem 
                className={`text-pink-700 ${isDragging ? 'scale-125' : ''} transition-transform`} 
                size={32}
                fill={isDragging ? "currentColor" : "none"}
              />
            </div>
          </div>
        )}
      </div>
      <p className="mt-2 text-black font-bold text-lg">{label}: {crystals} crystal{crystals !== 1 ? 's' : ''}</p>
      {ref && (
        <p className="mt-1 text-sm text-pink-700 font-semibold animate-pulse">
          Wave Glinda's wand up or down! ✨
        </p>
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-b from-pink-50 to-purple-50 text-black rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Wand className="mr-2 text-pink-700" size={32} />
          <h1 className="text-3xl font-bold text-pink-900">Aeryn's Magical Crystal Adventure</h1>
        </div>
        <div className="flex items-center bg-yellow-100 px-4 py-2 rounded-full">
          <Crown className="text-yellow-500 mr-2" />
          <span className="font-bold text-lg">{score} / {level * POINTS_TO_LEVEL_UP}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center bg-purple-100 px-4 py-2 rounded-full">
          <Sparkles className="text-purple-500 mr-2" />
          <span className="font-bold">Adventure {level} - {getLocationTitle(level)}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-bold mr-2">Magic Streak: {streak} 🌟</span>
        </div>
      </div>
      
      <Alert className="mb-6 bg-pink-100 border-pink-300 transform hover:scale-102 transition-transform">
        <Heart className="h-6 w-6 text-pink-700" />
        <AlertTitle className="text-pink-900 text-2xl font-bold mb-2">Magic Quest #{level}:</AlertTitle>
        <AlertDescription className="text-pink-900 text-2xl font-semibold">{quest}</AlertDescription>
      </Alert>

      <div className="mb-6 flex justify-around bg-white/50 p-8 rounded-lg backdrop-blur-sm">
        {renderBasket(crystalA, "Dorothy's Basket", 'bg-purple-600/50')}
        {renderBasket(crystalB, "Scarecrow's Basket", isCorrect === false ? 'bg-red-500/50' : 'bg-green-600/50', crystalBRef)}
      </div>

      <div className="flex justify-center mb-6">
        <Button 
          onClick={checkAnswer} 
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md transform transition duration-200 hover:scale-105 hover:shadow-lg"
          id="cast-spell-button"
        >
          Cast Your Spell ✨
        </Button>
      </div>

      {feedback && (
        <Alert variant={isCorrect ? 'default' : 'destructive'} 
          className={`${isCorrect ? 'bg-green-100 text-green-900' : 'bg-pink-100 text-pink-900'} 
          transform transition-all duration-300 ${isCorrect ? 'scale-105' : 'scale-100'}`}>
          <AlertTitle className="text-xl">{isCorrect ? '🎉 Magical Success!' : '🌟 Try Again!'}</AlertTitle>
          <AlertDescription className="text-lg">{feedback}</AlertDescription>
        </Alert>
      )}

      {level === LEVELS_TO_WIN && score >= POINTS_TO_LEVEL_UP * LEVELS_TO_LEVELS_TO_WIN && (
        <Alert className="mt-6 bg-yellow-100 border-yellow-300">
          <Star className="h-6 w-6 text-yellow-500" />
          <AlertTitle className="text-yellow-900 text-2xl font-bold">🏆 Congratulations, Wizard of Oz Champion!</AlertTitle>
          <AlertDescription className="text-yellow-900 text-xl">
            You've helped Dorothy and friends collect all the magical crystals! The Emerald City awaits! Final Score: {score} points!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AerynsMagicalCrystalAdventure;
