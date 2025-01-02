import React from 'react';

interface ScoreDisplayProps {
  score: number;
  color: 'green' | 'blue' | 'purple';
  position: { top: number; left: number };
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, color, position }) => {
  const borderColor = `border-${color}-500`;
  const textColor = `text-${color}-500`;
  
  return (
    <div className={`absolute text-5xl font-bold px-4 py-2 bg-white border ${borderColor} z-10 ${textColor}`}
         style={position}>
      {score}
    </div>
  );
};