import React, { useState } from 'react';
import { useGameState } from '../state-utils';
import Step1 from '../common/Step1';
import Step2 from '../common/Step2';
import Step3 from '../common/Step3';

interface FirstProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

const First: React.FC<FirstProps> = ({ sendAdminMessage }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMultiple, setSelectedMultiple] = useState<number>(0);
  const { gameStateRef } = useGameState();
  const { numerator, denominator } = gameStateRef.current.state1.fraction;

  const handleStep1Complete = (multiple: number) => {
    setSelectedMultiple(multiple);
    setCurrentStep(2);
    sendAdminMessage('assistant', 'Correct! Moving to next step...', () => {});
  };

  const handleStep2Complete = () => {
    setCurrentStep(3);
    sendAdminMessage('assistant', 'Great job! Now write the decimal.', () => {});
  };

  const handleStep3Complete = () => {
    sendAdminMessage('assistant', `Excellent! You've completed this level!`, () => {
      // Handle level completion
    });
  };

  return (
    <div className="min-h-screen">
      {currentStep === 1 ? (
        <Step1 
          numerator={numerator} 
          denominator={denominator}
          onComplete={handleStep1Complete}
        />
      ) : currentStep === 2 ? (
        <Step2 
          numerator={numerator} 
          denominator={denominator}
          selectedMultiple={selectedMultiple}
          onComplete={handleStep2Complete}
        />
      ) : (
        <Step3
          numerator={numerator}
          denominator={denominator}
          selectedMultiple={selectedMultiple}
          onComplete={handleStep3Complete}
        />
      )}
    </div>
  );
};

export default First;
