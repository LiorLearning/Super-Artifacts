
import React, { useState } from 'react';
import { Button } from '@/components/custom_ui/button';
import { Path } from '@/components/custom_ui/path';

const friends: any = [
  { name: 'River-lee', color: '#FF6B6B', topping: 'Pepperoni', story: 'loves spicy food' },
  { name: 'Mavrick', color: '#4ECDC4', topping: 'Veggie Supreme', story: 'always picks the healthiest option' },
  { name: 'Maizey', color: '#FFD93D', topping: 'Four Cheese', story: 'is a cheese enthusiast' },
  { name: 'Emmy', color: '#95E1D3', topping: 'Margherita', story: 'keeps it classic' },
  { name: 'Quin', color: '#A8E6CF', topping: 'Pesto', story: 'tries adventurous flavors' },
  { name: 'Ethan', color: '#FF8B94', topping: 'Hawaiian', story: 'believes pineapple belongs on pizza' },
  { name: 'Willow', color: '#DCD6F7', topping: 'BBQ Chicken', story: 'enjoys sweet and tangy tastes' },
  { name: 'Atticus', color: '#F4A460', topping: 'Buffalo', story: 'picks anything with a kick' }
];

const PizzaWheel = ({ sharedSlices }: any) => {
  const radius = 150;
  const centerX = 200;
  const centerY = 200;
  const sliceCount = 8;
  const anglePerSlice = (2 * Math.PI) / sliceCount;

  const getSlicePath = (index: any) => {
    const startAngle = index * anglePerSlice - Math.PI / 2;
    const endAngle = startAngle + anglePerSlice;
    
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);
    
    const largeArcFlag = 0;
    
    return `M ${centerX} ${centerY}
            L ${startX} ${startY}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
            Z`;
  };

  const createToppingDots = (sliceIndex: any) => {
    const dots: any = [];
    const dotCount = 5;
    const dotRadius = 3;
    
    for (let i = 0; i < dotCount; i++) {
      const angle = (sliceIndex * anglePerSlice) + (anglePerSlice / 2) - Math.PI / 2;
      const distance = (radius * (i + 1)) / (dotCount + 1);
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);
      
      dots.push(
        <circle
          key={`dot-${sliceIndex}-${i}`}
          cx={x}
          cy={y}
          r={dotRadius}
          fill="#8B4513"
          opacity="0.6"
        />
      );
    }
    return dots;
  };

  return (
    <svg width="400" height="400" viewBox="0 0 400 400" className="transition-all duration-300">
      <circle
        cx={centerX}
        cy={centerY}
        r={radius + 5}
        fill="#D2691E"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="#FFF2CC"
      />
      {[...Array(sliceCount)].map((_, index) => (
        <g key={`slice-${index}`}>
          <Path
            d={getSlicePath(index)}
            fill={index < sharedSlices ? friends[index].color : '#FFF2CC'}
            stroke="#8B4513"
            strokeWidth="2"
            className="transition-all duration-300"
          />
          {createToppingDots(index)}
        </g>
      ))}
    </svg>
  );
};

const PizzaSharing = () => {
  const [sharedSlices, setSharedSlices] = useState(0);
  const totalSlices = 8;

  const generateStory = (shared: any) => {
    const stories: any = [
      "Asher's hosting a pizza party! Everyone's excited to share a delicious 8-slice pizza.",
      `${friends[0].name} goes first - they ${friends[0].story}! That's 1/8 of the pizza shared.`,
      `${friends[1].name} picks next - ${friends[1].story}. Now 2/8 (or 1/4) is shared.`,
      `${friends[2].name} chooses their slice - ${friends[2].story}. 3/8 of the pizza found a home.`,
      `${friends[3].name} takes their turn - ${friends[3].story}. Half the pizza is shared!`,
      `${friends[4].name}'s up next - ${friends[4].story}. 5/8 of the pizza is enjoyed.`,
      `${friends[5].name} grabs their slice - ${friends[5].story}. Now 6/8 (or 3/4) is shared.`,
      `${friends[6].name} picks their piece - ${friends[6].story}. Just one slice left!`,
      `Last slice goes to ${friends[7].name}, who ${friends[7].story}. The perfect end to a fun pizza party!`
    ];
    return stories[shared];
  };

  const handleShare = () => {
    if (sharedSlices < totalSlices) {
      setSharedSlices(sharedSlices + 1);
    }
  };

  const handleReset = () => {
    setSharedSlices(0);
  };

  const getFractionDisplay = (num: any) => {
    if (num === 0) return "0";
    if (num === 4) return "1/2";
    if (num === 2) return "1/4";
    if (num === 6) return "3/4";
    return `${num}/8`;
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold text-red-600 text-center mb-6">Pizza Party with Friends!</h2>
      <div className="flex flex-col items-center gap-8">
        <div className="flex justify-center">
          <PizzaWheel sharedSlices={sharedSlices} />
        </div>
        <div className="flex flex-col items-center gap-4 max-w-2xl">
          <p className="text-lg text-center">{generateStory(sharedSlices)}</p>
          <div className="flex space-x-4">
            <Button
              onClick={handleShare}
              disabled={sharedSlices === totalSlices}
              id="share-slice-button"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
            >
              Share Next Slice
            </Button>
            <Button
              onClick={handleReset}
              id="reset-button"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Start New Pizza
            </Button>
          </div>
          <p className="text-md font-semibold">
            Shared: {getFractionDisplay(sharedSlices)} ({Math.round((sharedSlices/totalSlices) * 100)}% of the pizza)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PizzaSharing;
