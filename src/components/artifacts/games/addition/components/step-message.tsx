import React from 'react';

interface StepMessageProps {
  message: React.ReactNode;
  isHighlighted?: boolean;
}

export const StepMessage: React.FC<StepMessageProps> = ({ message, isHighlighted }) => {
  return (
    <div className={`w-2/3 mx-auto text-2xl ${isHighlighted ? 'bg-purple-600' : 'bg-purple-100'} border-2 shadow-[-5px_5px_0_0] border-black p-4 mb-5`}>
      <p className={`font-bold text-center ${isHighlighted ? 'text-purple-100' : 'text-purple-600'}`}>
        {message}
      </p>
    </div>
  );
};