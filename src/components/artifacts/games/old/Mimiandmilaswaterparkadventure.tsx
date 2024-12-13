
import React, { useState, useEffect } from 'react'
import { Card } from '@/components/custom_ui/card'
import { Button } from '@/components/custom_ui/button'
import { CheckCircle2, RefreshCcw, Trophy, Zap, Waves } from 'lucide-react'
import { Input } from '@/components/custom_ui/input'
import { Progress } from '@/components/custom_ui/progress'

const WaterparkDivision = () => {
  const [xp, setXP] = useState<number>(0);
  const maxXP = 1500;
  const [currentProblem, setCurrentProblem] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
  const problems = [
    {
      question: "Help divide the baby whales into equal groups!",
      total: 6,
      groups: 2,
      type: 'Baby Whale',
      emoji: '🐋',
      hint: "If we split 6 whales into 2 groups, how many whales per group?",
      xpValue: 100
    },
    {
      question: "Organize the baby dolphins into equal swimming classes!",
      total: 9,
      groups: 3,
      type: 'Baby Dolphin',
      emoji: '🐬',
      hint: "9 dolphins need to be split into 3 equal groups.",
      xpValue: 100
    },
    {
      question: "Split the baby penguins into equal teams!",
      total: 8,
      groups: 4,
      type: 'Baby Penguin',
      emoji: '🐧',
      hint: "8 penguins need to be divided into 4 equal teams.",
      xpValue: 100
    },
    {
      question: "Organize the baby turtles into equal racing lanes!",
      total: 10,
      groups: 2,
      type: 'Baby Turtle',
      emoji: '🐢',
      hint: "10 turtles need to be split into 2 equal lanes.",
      xpValue: 100
    },
    {
      question: "Divide the baby whales into equal pods!",
      total: 12,
      groups: 3,
      type: 'Baby Whale',
      emoji: '🐋',
      hint: "12 whales need to be organized into 3 equal pods.",
      xpValue: 100
    },
    {
      question: "Split the baby dolphins into equal shows!",
      total: 15,
      groups: 5,
      type: 'Baby Dolphin',
      emoji: '🐬',
      hint: "15 dolphins need to perform in 5 equal shows.",
      xpValue: 100
    },
    {
      question: "Organize the baby penguins into equal skating groups!",
      total: 16,
      groups: 4,
      type: 'Baby Penguin',
      emoji: '🐧',
      hint: "16 penguins need to be split into 4 equal skating groups.",
      xpValue: 100
    },
    {
      question: "Divide the baby turtles into equal swimming lessons!",
      total: 14,
      groups: 2,
      type: 'Baby Turtle',
      emoji: '🐢',
      hint: "14 turtles need to be split into 2 equal swimming lessons.",
      xpValue: 100
    },
    {
      question: "Sort the baby whales into equal watching stations!",
      total: 18,
      groups: 3,
      type: 'Baby Whale',
      emoji: '🐋',
      hint: "18 whales need to be divided into 3 equal stations.",
      xpValue: 100
    },
    {
      question: "Group the baby dolphins into equal training sessions!",
      total: 20,
      groups: 4,
      type: 'Baby Dolphin',
      emoji: '🐬',
      hint: "20 dolphins need to be split into 4 equal training sessions.",
      xpValue: 100
    },
    {
      question: "Divide the baby penguins into equal ice rinks!",
      total: 21,
      groups: 3,
      type: 'Baby Penguin',
      emoji: '🐧',
      hint: "21 penguins need to be divided among 3 equal ice rinks.",
      xpValue: 100
    },
    {
      question: "Sort the baby turtles into equal relaxation pools!",
      total: 24,
      groups: 6,
      type: 'Baby Turtle',
      emoji: '🐢',
      hint: "24 turtles need to be split into 6 equal relaxation pools.",
      xpValue: 100
    },
    {
      question: "Organize the baby whales into equal performance areas!",
      total: 25,
      groups: 5,
      type: 'Baby Whale',
      emoji: '🐋',
      hint: "25 whales need to be divided into 5 equal performance areas.",
      xpValue: 100
    },
    {
      question: "Split the baby dolphins into equal play zones!",
      total: 27,
      groups: 3,
      type: 'Baby Dolphin',
      emoji: '🐬',
      hint: "27 dolphins need to be split into 3 equal play zones.",
      xpValue: 100
    },
    {
      question: "Divide the baby penguins into equal celebration groups!",
      total: 28,
      groups: 4,
      type: 'Baby Penguin',
      emoji: '🐧',
      hint: "28 penguins need to be split into 4 equal celebration groups.",
      xpValue: 100
    }
  ];

  const generateCharacters = () => {
    const currentType = problems[currentProblem].type;
    const currentEmoji = problems[currentProblem].emoji;
    return Array(problems[currentProblem].total).fill(null).map((_, index) => ({
      id: index,
      type: currentType,
      emoji: currentEmoji
    }));
  };

  const [characters, setCharacters] = useState(generateCharacters());
  const [groups, setGroups] = useState(Array(problems[0].groups).fill([]));
  const [draggedChar, setDraggedChar] = useState<{ id: number, type: string, emoji: string } | null>(null);

  useEffect(() => {
    setCharacters(generateCharacters());
    setGroups(Array(problems[currentProblem].groups).fill([]));
  }, [currentProblem]);

  const handleDragStart = (char: { id: number, type: string, emoji: string }) => {
    setDraggedChar(char);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (groupIndex: number) => {
    if (!draggedChar) return;
    
    const newGroups = [...groups];
    newGroups[groupIndex] = [...(newGroups[groupIndex] || []), draggedChar];
    setGroups(newGroups);
    setDraggedChar(null);
  };

  const calculateStars = () => {
    const percentage = (xp / maxXP) * 100;
    return Math.floor(percentage / 20);
  };

  const checkAnswer = () => {
    const correctAnswer = problems[currentProblem].total / problems[currentProblem].groups;
    if (parseInt(answer) === correctAnswer) {
      const xpGained = problems[currentProblem].xpValue + Math.max(0, 50 - (attempts * 10));
      setXP((prev: number) => Math.min(prev + xpGained, maxXP));
      setShowSuccess(true);
      setTimeout(() => {
        if (currentProblem < problems.length - 1) {
          setCurrentProblem((prev: number) => prev + 1);
          resetProblem();
        }
      }, 2000);
    } else {
      setAttempts((prev: number) => prev + 1);
      setShowHint(true);
    }
  };

  const resetProblem = () => {
    setAnswer('');
    setAttempts(0);
    setShowHint(false);
    setShowSuccess(false);
    setGroups(Array(problems[currentProblem].groups).fill([]));
    setCharacters(generateCharacters());
  };

  const renderCharacter = (type: string, emoji: string) => {
    const styles: { [key: string]: { bg: string } } = {
      'Baby Whale': { bg: 'bg-blue-200' },
      'Baby Bunny': { bg: 'bg-pink-200' },
      'Baby Turtle': { bg: 'bg-green-200' },
      'Baby Dolphin': { bg: 'bg-cyan-200' },
      'Baby Penguin': { bg: 'bg-purple-200' }
    };

    return (
      <div className={`flex flex-col items-center justify-center w-12 h-12 ${styles[type].bg} rounded-full`}>
        <div className="text-xl">{emoji}</div>
        <Waves className="w-3 h-3 text-blue-500" />
      </div>
    );
  };

  return (
    <Card className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="text-center mb-2">
        <h1 className="text-xl font-bold text-blue-600">Mimi and Mila's Waterpark Adventure</h1>
        <p className="text-sm text-cyan-600">Help our friends organize the perfect water party!</p>
      </div>

      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold text-yellow-600">
              {xp} / {maxXP} XP
            </span>
          </div>
          <div className="flex items-center gap-1">
            {Array(5).fill(null).map((_, i) => (
              <Trophy 
                key={i} 
                className={`w-4 h-4 ${i < calculateStars() ? 'text-yellow-500' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>
        <Progress value={(currentProblem / problems.length) * 100} className="h-1.5" />
        <div className="text-center text-xs text-cyan-600 mt-0.5">
          Question {currentProblem + 1} of {problems.length}
        </div>
      </div>

      <div className="text-center mb-3">
        <div className="text-2xl font-bold text-blue-600 mb-2">
          {problems[currentProblem].total} ÷ {problems[currentProblem].groups} = ?
        </div>
        
        <div className="bg-white rounded-lg p-2 mb-2 shadow-sm">
          <p className="text-sm text-cyan-600 mb-2">
            {problems[currentProblem].question}
          </p>
          
          <div className="flex items-center justify-center gap-2">
            <Input 
              type="number" 
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter answer"
              className="w-24 text-center text-base h-8"
              id="answer-input"
            />
            <span className="text-sm text-blue-600 font-bold">
              per group
            </span>
          </div>
        </div>
      </div>

      <div className="text-center mb-2 text-sm text-cyan-600">
        Drag characters into equal groups!
      </div>

      <div className="flex flex-wrap gap-1 justify-center mb-3 p-2 bg-white rounded-lg">
        {characters.filter(char => !groups.flat().find(grouped => grouped?.id === char.id)).map(char => (
          <div
            key={char.id}
            draggable
            onDragStart={() => handleDragStart(char)}
            className="cursor-move hover:scale-110 transition-transform"
          >
            {renderCharacter(char.type, char.emoji)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
        {Array(problems[currentProblem].groups).fill(null).map((_, index) => (
          <div
            key={index}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className="min-h-[100px] p-2 rounded-lg bg-white border-2 border-dashed border-blue-300 flex flex-wrap gap-1 items-start justify-center"
          >
            <div className="w-full text-center text-blue-500 font-bold text-sm mb-1">
              Group {index + 1}
            </div>
            {groups[index]?.map((char: { id: string; type: string; emoji: string }) => (
              <div key={char.id}>
                {renderCharacter(char.type, char.emoji)}
              </div>
            ))}
          </div>
        ))}
      </div>

      {showHint && (
        <div className="text-center mb-2 text-sm text-cyan-600">
          {problems[currentProblem].hint}
        </div>
      )}

      <div className="flex justify-center gap-2">
        <Button
          onClick={checkAnswer}
          className="bg-blue-500 hover:bg-blue-600 text-white h-8 text-sm"
          id="check-answer-button"
        >
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Check Answer
        </Button>
        <Button
          onClick={resetProblem}
          variant="outline"
          className="border-blue-500 text-blue-500 hover:bg-blue-50 h-8 text-sm"
          id="try-again-button"
        >
          <RefreshCcw className="mr-1 h-3 w-3" />
          Try Again
        </Button>
      </div>

      {showSuccess && (
        <div className="mt-2 text-center">
          <div className="text-green-600 text-sm font-bold mb-1">
            🎉 Splash-tastic! +{problems[currentProblem].xpValue + Math.max(0, 50 - (attempts * 10))} XP!
          </div>
          {currentProblem < problems.length - 1 && (
            <div className="text-xs text-cyan-600">
              Get ready for the next water adventure!
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default WaterparkDivision;
