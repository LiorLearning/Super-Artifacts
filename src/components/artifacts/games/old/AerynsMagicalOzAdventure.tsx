import React, { useState, useEffect } from 'react';
import { Star, Heart, Moon } from 'lucide-react';
import { Button } from '@/components/custom_ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/custom_ui/alert';

interface PlaceValueProps {
  value: number;
  color: string;
  placeValue: string;
  onChange: (change: number) => void;
  icon: React.ComponentType;
  character: string;
}

const PlaceValue: React.FC<PlaceValueProps> = ({ value, color, placeValue, onChange, icon: Icon, character }) => {
  const circles = Array(value).fill(null);
  const bgColor = `bg-${color}-200`;
  const textColor = `text-${color}-500`;
  const borderColor = `border-${color}-300`;

  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-bold mb-1 text-purple-600">{character}</div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className={`w-28 h-40 border-2 ${borderColor} rounded-lg flex flex-wrap content-start justify-center p-2 relative bg-white`}>
        {circles.map((_, index) => (
          <div key={index} className={`w-7 h-7 ${bgColor} rounded-full m-1 shadow-sm flex items-center justify-center`}>
            <div className="w-5 h-5 text-white">
              <Icon />
            </div>
          </div>
        ))}
        <div className="absolute -bottom-4 left-0 right-0 flex justify-center space-x-2">
          <Button 
            onClick={() => onChange(-1)} 
            className="rounded-full p-1" 
            variant="outline"
            disabled={value === 0}
          >
            -
          </Button>
          <Button 
            onClick={() => onChange(1)} 
            className="rounded-full p-1" 
            variant="outline"
            disabled={value === 9}
          >
            +
          </Button>
        </div>
      </div>
      <div className={`text-sm ${textColor} font-semibold mt-8`}>
        {placeValue}
      </div>
    </div>
  );
};

const items = [
  { name: 'magical crystals', icon: Star },
  { name: 'enchanted hearts', icon: Heart },
  { name: 'moonbeams', icon: Moon },
  { name: 'emerald stars', icon: Star },
  { name: 'rainbow gems', icon: Star }
];

const generateQuestion = (itemName: string): string => {
  const questions = [
    `Dorothy and the Scarecrow need to collect ${itemName} for Glinda's spell. Can you help them?`,
    `Help our friends gather ${itemName} along the Yellow Brick Road!`,
    `Glinda needs exactly this many ${itemName} to create magical protection!`,
    `The Emerald City gates will open when we collect the right number of ${itemName}!`,
    `Our Oz friends need these ${itemName} to help light their way home!`
  ];
  return questions[Math.floor(Math.random() * questions.length)];
};

export default function AerynsOzAdventure() {
  const [placeValues, setPlaceValues] = useState([
    { value: 4, color: 'pink', placeValue: 'Tens', icon: Star, character: 'Dorothy' },
    { value: 5, color: 'purple', placeValue: 'Ones', icon: Star, character: 'Glinda' },
  ]);

  const [targetNumber, setTargetNumber] = useState(45);
  const [showCongrats, setShowCongrats] = useState(false);
  const [currentItem, setCurrentItem] = useState(items[0]);
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion(items[0].name));


  const handleChange = (index:any, change:any) => {
    setPlaceValues(prev => {
      const newValues = [...prev];
      newValues[index].value = Math.max(0, Math.min(9, newValues[index].value + change));
      return newValues;
    });
  };

  const total = placeValues.reduce((sum, place, index) => sum + place.value * Math.pow(10, 1 - index), 0);

  const generateNewChallenge = () => {
    const newTarget = Math.floor(Math.random() * 90) + 10; // Generate number between 10 and 99
    setTargetNumber(newTarget);
    const newItem = items[Math.floor(Math.random() * items.length)];
    setCurrentItem(newItem);
    setCurrentQuestion(generateQuestion(newItem.name));
    setPlaceValues(prev => prev.map(place => ({ ...place, icon: newItem.icon })));
  };

  useEffect(() => {
    if (total === targetNumber) {
      setShowCongrats(true);
      const timer = setTimeout(() => {
        setShowCongrats(false);
        generateNewChallenge();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [total, targetNumber]);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-yellow-50 rounded-lg border-4 border-emerald-500">
      <h1 className="text-4xl font-bold text-center mb-6 text-emerald-600">Aeryn's Magical Oz Adventure</h1>
      <p className="text-center mb-8 text-purple-700 text-xl">{currentQuestion}</p>
      <div className="flex justify-center mb-8 space-x-16">
        {placeValues.map((place, index) => (
          <PlaceValue 
            key={index} 
            {...place} 
            onChange={(change) => handleChange(index, change)}
          />
        ))}
      </div>
      <div className="flex justify-center items-center text-2xl mb-6">
        {placeValues.map((place, index) => (
          <React.Fragment key={index}>
            <span className={`text-${place.color}-500 font-semibold`}>
              {place.value * Math.pow(10, 1 - index)}
            </span>
            {index < placeValues.length - 1 && <span className="mx-2">+</span>}
          </React.Fragment>
        ))}
        <span className="mx-2">=</span>
        <span className="text-gray-700">{total}</span>
      </div>
      <div className="text-center mt-6">
        {showCongrats ? (
          <Alert className="bg-emerald-100 border-emerald-500">
            <AlertTitle className="text-emerald-700">Wonderful magic, Aeryn! ✨</AlertTitle>
            <AlertDescription className="text-emerald-600">
              You've helped collect exactly {targetNumber} {currentItem.name}! The Yellow Brick Road leads to another adventure!
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <p className="text-gray-700 text-2xl mb-4">
              Magical items collected: {total}
            </p>
            <p className="text-xl">
              <span className="text-purple-700">Target: </span>
              <span className="font-bold text-emerald-600">{targetNumber}</span>
              <span className="text-purple-700"> {currentItem.name}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}