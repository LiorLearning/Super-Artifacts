import React, { useState } from 'react';

const categories: any = [
  { color: '#4CAF50', name: 'Savings', icon: '🏦' },
  { color: '#FF9800', name: 'Toys', icon: '🎮' },
  { color: '#2196F3', name: 'Books', icon: '📚' },
  { color: '#E91E63', name: 'Charity', icon: '🤝' },
  { color: '#9C27B0', name: 'Snacks', icon: '🍪' },
  { color: '#00BCD4', name: 'Movies', icon: '🎬' },
  { color: '#FFEB3B', name: 'Sports', icon: '⚽' },
  { color: '#FF5722', name: 'Gifts', icon: '🎁' },
];

interface MoneyBoxProps {
  color: string;
  icon: string;
  id: string;
  category: string;
}

const MoneyBox: React.FC<MoneyBoxProps> = ({ color, icon, id, category }) => (
  <svg width="120" height="60" viewBox="0 0 120 60" className="transition-all duration-300" id={id}>
    <rect 
      x="10" 
      y="10" 
      width="100" 
      height="40" 
      fill={color} 
      stroke="#333"
      strokeWidth="2"
      rx="10"
    />
    <text x="60" y="35" textAnchor="middle" fontSize="20">{icon}</text>
    <text x="60" y="50" textAnchor="middle" fontSize="10" fill="#333">{category}</text>
  </svg>
);

const MoneyManager = () => {
  const [allocatedFunds, setAllocatedFunds] = useState(0);
  const totalParts: any = 8;
  const allowance: any = 40; // $40 total allowance

  const generateStory = (allocated: any) => {
    const stories: any = [
      `You received your $${allowance} allowance! Let's plan how to use it wisely.`,
      `Put $${allowance/8} in ${categories[0].name}. That's 1/8 of your money planned!`,
      `Allocated $${allowance/8} for ${categories[1].name}. Now 2/8 (or 1/4) is planned.`,
      `Set aside $${allowance/8} for ${categories[2].name}. 3/8 of your allowance is organized.`,
      `Added $${allowance/8} to ${categories[3].name}. Half your money is planned!`,
      `Put $${allowance/8} towards ${categories[4].name}. 5/8 of your allowance is allocated.`,
      `Saved $${allowance/8} for ${categories[5].name}. Now 6/8 (or 3/4) is planned.`,
      `Added $${allowance/8} for ${categories[6].name}. Just one portion left!`,
      "Great job planning your allowance! You're becoming money smart!"
    ];
    return stories[allocated];
  };

  const handleAllocate = () => {
    if (allocatedFunds < totalParts) {
      setAllocatedFunds(allocatedFunds + 1);
    }
  };

  const handleReset = () => {
    setAllocatedFunds(0);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold text-green-600">Money Management Adventure!</h2>
      <div className="flex flex-col-reverse items-center space-y-2 space-y-reverse" style={{ height: '480px' }}>
        {[...Array(totalParts)].map((_, i) => (
          <MoneyBox
            key={i}
            color={i < allocatedFunds ? categories[i].color : '#E0E0E0'}
            category={i < allocatedFunds ? categories[i].name : 'Unplanned'}
            icon={i < allocatedFunds ? categories[i].icon : '💵'}
            id={`money-box-${i}`}
          />
        ))}
      </div>
      <p className="text-lg text-center max-w-md">{generateStory(allocatedFunds)}</p>
      <div className="flex space-x-4">
        <button
          onClick={handleAllocate}
          disabled={allocatedFunds === totalParts}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          id="allocate-funds-button"
        >
          Allocate Funds
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          id="reset-budget-button"
        >
          Reset Budget
        </button>
      </div>
      <p className="text-md font-semibold">
        Allocated: ${(allocatedFunds * allowance/8).toFixed(2)} of ${allowance.toFixed(2)} ({allocatedFunds}/{totalParts} or {Math.round((allocatedFunds/totalParts) * 100)}%)
      </p>
    </div>
  );
};

export default MoneyManager;
