
import React, { useState, useEffect } from 'react';
import { Star, Moon, Sun, Cloud, Flower, Apple, Book, Feather } from 'lucide-react';
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
      <div className="text-lg font-bold mb-1">{character}</div>
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
            id={`decrement-${character}`} 
            onClick={() => onChange(-1)} 
            className="rounded-full p-1" 
            variant="outline"
            disabled={value === 0}
          >
            -
          </Button>
          <Button 
            id={`increment-${character}`} 
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

interface Item {
  name: string;
  icon: React.ComponentType;
}

const items: Item[] = [
  { name: 'magical gems', icon: Star },
  { name: 'enchanted flowers', icon: Flower },
  { name: 'mystical apples', icon: Apple },
  { name: 'glowing stars', icon: Star },
  { name: 'silver moons', icon: Moon },
  { name: 'golden suns', icon: Sun },
  { name: 'floating clouds', icon: Cloud },
  { name: 'wisdom books', icon: Book },
  { name: 'phoenix feathers', icon: Feather }
];

const generateQuestion = (itemName: string): string => {
  const questions = [
    `Help Dorothy and her friends gather the right number of ${itemName} to unlock the next challenge!`,
    `The Wizard needs ${itemName} for his latest spell. Can you collect the correct amount?`,
    `Glinda the Good Witch requests ${itemName} for her magic potion. How many can you find?`,
    `The Emerald City requires ${itemName} to power its defenses. Gather the exact number!`,
    `The Munchkins are throwing a party and need ${itemName} for decorations. Can you help?`,
    `The Wicked Witch's castle is protected by ${itemName}. Collect the right number to break the spell!`,
    `Toto has hidden ${itemName} all over Oz. Can you find the exact number he's looking for?`,
    `The Yellow Brick Road needs ${itemName} for repairs. Gather the precise amount needed!`
  ];
  return questions[Math.floor(Math.random() * questions.length)];
};

interface PlaceValueState {
  value: number;
  color: string;
  placeValue: string;
  icon: React.ComponentType;
  character: string;
}


interface AerynsEnchantedNumberQuestProps {
  changeGame: (gameKey: string) => void;
}

export default function AerynsEnchantedNumberQuest({ changeGame }: AerynsEnchantedNumberQuestProps): React.ReactElement {
  const [placeValues, setPlaceValues] = useState<PlaceValueState[]>([
    { value: 3, color: 'pink', placeValue: 'Thousands', icon: Star, character: 'Tin Man' },
    { value: 4, color: 'orange', placeValue: 'Hundreds', icon: Star, character: 'Dorothy' },
    { value: 7, color: 'green', placeValue: 'Tens', icon: Star, character: 'Scarecrow' },
    { value: 1, color: 'blue', placeValue: 'Ones', icon: Star, character: 'Lion' },
  ]);

  const [targetNumber, setTargetNumber] = useState<number>(3571);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Item>(items[0]);
  const [currentQuestion, setCurrentQuestion] = useState<string>(generateQuestion(items[0].name));

  const handleChange = (index: number, change: number): void => {
    setPlaceValues(prev => {
      const newValues = [...prev];
      newValues[index].value = Math.max(0, Math.min(9, newValues[index].value + change));
      return newValues;
    });
  };

  const total = placeValues.reduce((sum, place, index) => sum + place.value * Math.pow(10, 3 - index), 0);

  const generateNewChallenge = (): void => {
    const newTarget = Math.floor(Math.random() * 9000) + 1000;
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
    <div className="max-w-5xl mx-auto p-8 bg-indigo-100 rounded-lg border-4 border-purple-500">
      <h1 className="text-4xl font-bold text-center mb-6 text-purple-600">Aeryn's Enchanted Number Quest</h1>
      <p className="text-center mb-8 text-gray-700 text-xl">{currentQuestion}</p>
      <div className="flex justify-between mb-8 space-x-4">
        {placeValues.map((place, index) => (
          <PlaceValue 
            key={index} 
            {...place} 
            onChange={(change) => handleChange(index, change)}
          />
        ))}
      </div>
      <div className="flex justify-between items-center text-2xl mb-6">
        {placeValues.map((place, index) => (
          <span key={index} className={`text-${place.color}-500 font-semibold w-28 text-center`}>
            {(place.value * Math.pow(10, 3 - index)).toLocaleString()}
          </span>
        ))}
      </div>
      <div className="flex justify-center items-center text-2xl mb-6">
        {placeValues.map((place, index) => (
          <React.Fragment key={index}>
            <span className={`text-${place.color}-500 font-semibold`}>
              {(place.value * Math.pow(10, 3 - index)).toLocaleString()}
            </span>
            {index < placeValues.length - 1 && <span className="mx-2">+</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center mt-6">
        {showCongrats ? (
          <Alert className="bg-green-100 border-green-500">
            <AlertTitle className="text-green-700">Congratulations!</AlertTitle>
            <AlertDescription className="text-green-600">
              You've collected the perfect number of {currentItem.name}! Get ready for the next challenge!
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <p className="text-2xl font-bold text-purple-600 mb-4">
              Total {currentItem.name} collected: {total.toLocaleString()}
            </p>
            <p className="text-xl text-gray-700">
              Current Target: {targetNumber.toLocaleString()} {currentItem.name}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
