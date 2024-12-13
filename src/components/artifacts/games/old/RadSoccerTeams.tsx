
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/custom_ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/custom_ui/select';

const EverlysRadSoccerTeams = () => {
  const [totalPlayers, setTotalPlayers] = useState(12 as any);
  const [teamSize, setTeamSize] = useState(3 as any);
  const [teams, setTeams] = useState([] as any);
  const [remainder, setRemainder] = useState(0 as any);
  const [userAnswer, setUserAnswer] = useState('' as any);
  const [isCorrect, setIsCorrect] = useState(null as any);
  const [showFeedback, setShowFeedback] = useState(false as any);
  
  const captains = ['Everly 🎸', 'Emelia 🎮', 'Gina 🏄‍♀️'];
  const playerEmojis = ['🧑‍🎤', '🕵️', '🦸', '🥷', '🧚', '🧙'];

  useEffect(() => {
    updateTeams();
  }, [totalPlayers, teamSize]);

  const updateTeams = () => {
    const newTeams = Math.floor(totalPlayers / teamSize);
    setTeams(Array.from({ length: newTeams }, (_, i) => i));
    setRemainder(totalPlayers % teamSize);
    setIsCorrect(null);
    setUserAnswer('');
    setShowFeedback(false);
  };

  const checkAnswer = () => {
    const correctAnswer = totalPlayers % teamSize === 0;
    const userAnswerBool = userAnswer.toLowerCase() === 'yes';
    setIsCorrect(userAnswerBool === correctAnswer);
    setShowFeedback(userAnswerBool === correctAnswer);
  };

  const NumberInput = ({ value, setValue, label, max }: { value: any; setValue: any; label: any; max: any; }) => (
    <div className="flex items-center space-x-2 bg-purple-800/30 p-2 rounded-lg">
      <span className="text-lg font-medium text-purple-100">{label}</span>
      <Button 
        onClick={() => setValue(Math.max(1, value - 1))} 
        className="bg-pink-600 hover:bg-pink-700 text-white font-bold h-8 w-8 rounded-full p-0"
        id="decrement-button"
      >
        -
      </Button>
      <span className="text-xl font-bold text-purple-100 w-8 text-center">{value}</span>
      <Button 
        onClick={() => setValue(Math.min(max, value + 1))} 
        className="bg-pink-600 hover:bg-pink-700 text-white font-bold h-8 w-8 rounded-full p-0"
        id="increment-button"
      >
        +
      </Button>
    </div>
  );

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl shadow-xl text-white">
      <h2 className="text-4xl font-bold mb-8 text-center text-pink-300 drop-shadow-lg">Everly's Rad Soccer Teams 🏆</h2>
      
      <div className="flex justify-between mb-8">
        <NumberInput value={totalPlayers} setValue={setTotalPlayers} label="Players:" max={24} />
        <NumberInput value={teamSize} setValue={setTeamSize} label="Team Size:" max={12} />
      </div>
      
      <div className="mt-10">
        <h3 className="text-3xl font-bold mb-6 text-center text-pink-300">Epic Team Lineup 🌟</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {teams.map((_: any, index: any) => (
            <div key={index} className="bg-indigo-800/50 p-6 rounded-lg shadow-md">
              <p className="font-bold mb-3 text-pink-300 text-xl">{captains[index % 3]}</p>
              {Array.from({ length: teamSize }, (_, i) => (
                <span key={i} role="img" aria-label="player" className="text-3xl mr-2">
                  {playerEmojis[(index + i) % playerEmojis.length]}
                </span>
              ))}
            </div>
          ))}
        </div>
        {remainder > 0 && (
          <div className="mt-8 text-center">
            <p className="font-bold text-pink-300 text-xl mb-3">Subs Bench 🪑</p>
            {Array.from({ length: remainder }, (_, i) => (
              <span key={i} role="img" aria-label="sub player" className="text-3xl mr-2">
                {playerEmojis[i % playerEmojis.length]}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-2xl font-bold text-pink-300 mb-4">
          Is {teamSize} a factor of {totalPlayers}?
        </p>
        <p className="text-sm italic mb-4 text-purple-200">
          A factor is a number that divides evenly into another number with no remainder.
        </p>
        <div className="flex justify-center items-center space-x-4">
          <div className="w-32 bg-white rounded-md shadow-md">
            <Select onValueChange={(value) => setUserAnswer(value)}>
              <SelectTrigger className="w-full bg-white text-indigo-900">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={checkAnswer} className="bg-pink-600 hover:bg-pink-700 text-white font-bold" id="check-answer-button">
            Check
          </Button>
        </div>
        {isCorrect !== null && (
          <p className={`mt-4 text-xl ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'Correct! Great job! 🎉' : 'Not quite. Try again!'}
          </p>
        )}
        {showFeedback && (
          <div className="mt-6 p-4 bg-indigo-700 rounded-lg">
            <p className="text-xl font-bold">Awesome work! 🌟</p>
            <p className="mt-2">
              You've got a great understanding of factors! Why not try some different combinations? 
              Can you find all the perfect matches where every player gets to play without any subs?
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EverlysRadSoccerTeams;
