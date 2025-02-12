import React, { useState } from 'react';
import { useGameState } from '../state-utils';
import Step1 from '../common/Step1';
import Step2 from '../common/Step2';
import Step3 from '../common/Step3';

interface ThirdProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

const Third: React.FC<ThirdProps> = ({ sendAdminMessage }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentFraction, setCurrentFraction] = useState<'fraction1' | 'fraction2'>('fraction1');
  const [selectedMultiple, setSelectedMultiple] = useState<number>(0);
  const { gameStateRef } = useGameState();

  const getCurrentFraction = () => {
    switch (currentFraction) {
      case 'fraction1':
        return gameStateRef.current.state3.fraction1;
      case 'fraction2':
        return gameStateRef.current.state3.fraction2;
    }
  };

  const { numerator, denominator } = getCurrentFraction();

  const handleStep1Complete = (multiple: number) => {
    if (currentFraction === 'fraction1') {
      setSelectedMultiple(100);
    } else {
      setSelectedMultiple(multiple);
    }
    setCurrentStep(2);
    sendAdminMessage('assistant', 'Correct! Moving to next step...', () => {});
  };

  const handleStep2Complete = () => {
    setCurrentStep(3);
    sendAdminMessage('assistant', 'Great job! Now write the decimal.', () => {});
  };

  const handleStep3Complete = () => {
    if (currentFraction === 'fraction1') {
      setCurrentFraction('fraction2');
      setCurrentStep(1);
      setSelectedMultiple(0);
      sendAdminMessage('assistant', 'Great! Let\'s solve the final fraction.', () => {});
    } else {
      sendAdminMessage('assistant', 'Congratulations! You\'ve completed the entire game!', () => {});
    }
  };

  return (
    <div className="min-h-screen">
      {currentStep === 1 ? (
        <Step1 
          numerator={numerator} 
          denominator={denominator}
          onComplete={handleStep1Complete}
          isFirstQuestion={currentFraction === 'fraction1'}
          isThirdScreen={true}
        />
      ) : currentStep === 2 ? (
        <Step2 
          numerator={numerator} 
          denominator={denominator}
          selectedMultiple={selectedMultiple}
          onComplete={handleStep2Complete}
          isThirdScreenFirstQuestion={currentFraction === 'fraction1'}
        />
      ) : (
        <Step3
          numerator={numerator}
          denominator={denominator}
          selectedMultiple={selectedMultiple}
          onComplete={handleStep3Complete}
          isLastQuestion={currentFraction === 'fraction2'}
          isGameComplete={currentFraction === 'fraction2'}
        />
      )}
    </div>
  );
};

export default Third;
