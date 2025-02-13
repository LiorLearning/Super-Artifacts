import React, { useState } from 'react';
import { useGameState } from '../state-utils';
import Step1 from '../common/Step1';
import Step2 from '../common/Step2';
import Step3 from '../common/Step3';

interface SecondProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
  onComplete: () => void;
}

const Second: React.FC<SecondProps> = ({ sendAdminMessage, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentFraction, setCurrentFraction] = useState<'fraction1' | 'fraction2' | 'fraction3'>('fraction1');
  const [selectedMultiple, setSelectedMultiple] = useState<number>(0);
  const { gameStateRef } = useGameState();

  const getCurrentFraction = () => {
    switch (currentFraction) {
      case 'fraction1':
        return { ...gameStateRef.current.state2.fraction1, isLast: false };
      case 'fraction2':
        return { ...gameStateRef.current.state2.fraction2, isLast: false };
      case 'fraction3':
        return { ...gameStateRef.current.state2.fraction3, isLast: true }; 
    }
  };

  const { numerator, denominator, isLast } = getCurrentFraction();

  const handleStep1Complete = (multiple: number) => {
    setSelectedMultiple(multiple);
    setCurrentStep(2);
    sendAdminMessage('assistant', 'Correct! Moving to next step...', () => {});
  };

  const handleStep2Complete = () => {
    setCurrentStep(3);
    sendAdminMessage('assistant', 'Great job! Now write the decimal.', () => {});
  };

  const handleStep3Complete = async () => {
    if (currentFraction === 'fraction1') {
      setCurrentFraction('fraction2');
      setCurrentStep(1);
      setSelectedMultiple(0);
      sendAdminMessage('assistant', 'Great! Let\'s solve the next fraction.', () => {});
    } else if (currentFraction === 'fraction2') {
      setCurrentFraction('fraction3');
      setCurrentStep(1);
      setSelectedMultiple(0);
      sendAdminMessage('assistant', 'Excellent! One more fraction to go.', () => {});
    } else {
      console.log('Current fraction:', currentFraction);
      console.log('Completing fraction3...');
      try {
        await sendAdminMessage('assistant', 'Congratulations! Moving to the next level!');
        setTimeout(() => {
          console.log('Message callback executed');
          onComplete(); 
        }, 200);
      } catch (error) {
        console.error('Error in handleStep3Complete:', error);
      }
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
          isLastQuestion={currentFraction === 'fraction3'}
          isGameComplete={false}
        />
      )}
    </div>
  );
};

export default Second;






