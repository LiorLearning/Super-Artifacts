import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import Bar from '../components/bar';
import { useState, useEffect, useRef } from 'react';
import FractionBox from '../components/FractionBox';
import DecimalBox from '../components/DecimalBox';
import Proceed from '../components/proceed';
import { sounds } from '../utils/sound';
import HintVisual from '../components/HintVisual';
import HintVisual2 from '../components/HintVisual2';


export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step } = gameStateRef.current.state2;
  const start = useRef(false);

  return (
    <div>
      {step <= 3 ? <Tenth sendAdminMessage={sendAdminMessage} /> : step <= 6 ? <Hundred sendAdminMessage={sendAdminMessage} /> : <ThirdScreen sendAdminMessage={sendAdminMessage} />}
    </div>
  );
}

function Tenth({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { question2 } = gameStateRef.current.question;
  const [selectedPieces, setSelectedPieces] = useState(0);
  const {step} = gameStateRef.current.state2;
  const [fractionNumerator, setFractionNumerator] = useState('');
  const [fractionDenominator, setFractionDenominator] = useState('');
  const [wholes, setWholes] = useState('');
  const [tenths, setTenths] = useState('');
  const [isWholesCorrect, setIsWholesCorrect] = useState(false);
  const [isTenthsCorrect, setIsTenthsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hintRef = useRef<HTMLDivElement>(null);
  const [showHintVisual, setShowHintVisual] = useState(false);
  const [isTenthsIncorrect, setIsTenthsIncorrect] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tenthsInputRef = useRef<HTMLInputElement>(null);
  const hundredthsInputRef = useRef<HTMLInputElement>(null);
  const proceedRef = useRef<HTMLDivElement>(null);

  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `Let's practice converting more visuals into fractions and decimals. What fraction of the chocolate do you get here?`);
      start.current = true;
    }
  }, []);

  const setStep = (value: number) => {
    setGameStateRef(prev => ({
      ...prev,
      state2: {
        ...prev.state2,
        step: value
      }
    }));
  };

  useEffect(() => {
    if (fractionNumerator === String(question2.numerator) && 
        fractionDenominator === String(question2.denominator)) 
    {
      setStep(2);
      sounds.levelUp();
      sendAdminMessage('agent', 'Perfect! You got the fraction right. Now, how do we write that as a decimal?');
    }
  }, [fractionNumerator, fractionDenominator, question2]);

  useEffect(() => {
    if (step === 2 && wholes === '0' && tenths === String(question2.numerator)) {
      setStep(3);
      sounds.levelUp();
      sendAdminMessage('agent', `Excellent! You've successfully converted ${question2.numerator}/${question2.denominator} to ${wholes}.${tenths}. Let's try another one!`);
    }
  }, [wholes, tenths, step, question2]);

  const handleProceed = () => {
    setStep(4);
    sounds.levelUp();
  };

  const handleFractionNumeratorChange = (value: string) => {
    setFractionNumerator(value);
    
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.length > 0) {
      if (value.length < question2.numerator.toString().length) {
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `The answer seems incomplete. The numerator should be ${question2.numerator}. Diagnose socratically. Don't repeat the same narration for every wrong answer.`);
        }, 5000);
        return;
      }

      if (parseInt(value) !== question2.numerator) {
        sounds.join();
        sendAdminMessage('admin', `User answered incorrectly for the fraction numerator, correct answer is ${question2.numerator}, but user answered ${value}. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.`);
      } else {
        sounds.levelUp();
        sendAdminMessage('agent', 'Great! That\'s the correct numerator.');
      }
    }
  };

  const handleFractionDenominatorChange = (value: string) => {
    setFractionDenominator(value);
    
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.length > 0) {
      if (value.length < question2.denominator.toString().length) {
        // Set timeout for incomplete answer feedback
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `The answer seems incomplete. The denominator should be ${question2.denominator}. Try entering the full number.`);
        }, 5000);
        return;
      }

      if (parseInt(value) !== question2.denominator) {
        sounds.join();
        sendAdminMessage('admin', `User answered incorrectly for the fraction denominator, correct answer is ${question2.denominator}, but user answered ${value}. Diagnose socratically.Don't repeat the same narration for every wrong answer.`);
      } else {
        sounds.levelUp();
        sendAdminMessage('agent', 'Perfect! You got the denominator right.');
      }
    }
  };

  const handleWholesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWholes(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const correctWholes = Math.floor(question2.numerator/question2.denominator);
    
    if (value.length > 0) {
      if (value.length < correctWholes.toString().length) {
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `User has entered wrong wholes.The answer should be ${correctWholes}. Your answer ${value} seems incomplete. Try entering the full number.`);
        }, 5000);
        return;
      }
      if (parseInt(value) !== correctWholes) {
        sounds.join();
        sendAdminMessage('admin', `User has entered wrong wholes.The answer should be ${correctWholes}, but user answered ${value}. Diagnose socratically. Explain everytime deeply and in detail but remember just hints. `);
        setIsWholesCorrect(false);
      } else {
        sounds.levelUp();
        sendAdminMessage('agent', 'Excellent! Now enter the tenths digit.');
        setIsWholesCorrect(true);
        setTimeout(() => tenthsInputRef.current?.focus(), 100);
      }
    }
  };

  const handleTenthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTenths(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const correctTenths = Math.floor((question2.numerator * 10) / question2.denominator) % 10;
    
    if (value.length > 0) {
      if (value.length < correctTenths.toString().length) {
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `The answer should be ${correctTenths}. Your answer ${value} seems incomplete. Try entering the full number.`);
        }, 5000);
        return;
      }
      if (parseInt(value) !== correctTenths) {
        sounds.join();
        scrollToHint();
        sendAdminMessage('admin', `The answer should be ${correctTenths}, but user answered ${value}. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.`);
        setIsTenthsCorrect(false);
        setIsTenthsIncorrect(true);
      } else {
        sounds.levelUp();
        sendAdminMessage('agent', 'Perfect! Finally, enter the hundredths digit.');
        setIsTenthsCorrect(true);
        setIsTenthsIncorrect(false);
        setTimeout(() => proceedRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  };

  const handleHundredthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTenths(value);
    
    const correctTenths = Math.floor((question2.numerator * 10) / question2.denominator) % 10;
    if (value.length > 0 && parseInt(value) !== correctTenths) {
      sounds.join();
      scrollToHint();
      sendAdminMessage('admin', `User answered incorrectly for the Tenths, correct answer is ${correctTenths}, but  user answered ${value}. Diagnose socratically. If User giving the wrong answer, Explain the correct answer in a way that helps them understand.`);
    } else if (value.length > 0 && parseInt(value) === correctTenths) {
      sounds.levelUp();
      sendAdminMessage('agent', 'Perfect! Finally, enter the hundredths digit.');
    }
  };      

  const scrollToHint = () => {
    if (!showHint) {  
      setShowHint(true);
      setTimeout(() => {
        hintRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleNeedHelp = () => {
    sounds.join();
    setShowHintVisual(true);
    sendAdminMessage('agent', `Let's look at a simpler example first to understand how tenths work in a decimal.`);
  };

  return (
    <div className='flex flex-col items-center justify-center h-full w-full pb-16'>
      <Header
        title={
          <div className='flex items-center justify-center'>
            <h1 className='text-4xl flex items-center whitespace-nowrap'> 
              Convert visuals to decimal
            </h1>
          </div>
        }
        level="Level 2"
        leftBox={`STEP ${step}`}
        rightBox={
          step === 1 
            ? "Enter mixed fraction" 
            : "Enter decimal form"
        }
      />

      <div className='flex w-full flex-col max-w-screen-md mx-auto items-center justify-center gap-8 mt-8 transform scale-90'>
        <Bar
          numerator={question2.numerator}
          denominator={question2.denominator}
          handlePieceClick={(index) => setSelectedPieces(index)}
          active={false}
        />

        <div className="flex w-full">
          {/* Left side - Fraction section */}
          <div className="flex-1 bg-[#EDFFEE] flex justify-end pr-16 pb-8">
            <div className="pt-8">
              <FractionBox 
                numerator={fractionNumerator}
                denominator={fractionDenominator}
                onChange={{
                  numerator: handleFractionNumeratorChange,
                  denominator: handleFractionDenominatorChange
                }}
                correctnumerator={String(question2.numerator)}
                correctdenominator={String(question2.denominator)}
              />
            </div>
          </div>

          {/* Right side - Decimal section */}
          <div className={`flex-1 bg-[#F7F5DD] flex justify-start pl-16 pb-8 ${step === 1 ? 'opacity-50' : 'opacity-100'}`}>
            <div className="pt-8">
              <DecimalBox 
                wholes={wholes}
                tenths={tenths}
                onChange={{
                  wholes: (value: string) => handleWholesChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>),
                  tenths: (value: string) => handleTenthsChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)
                }}
                correctWholes={String(Math.floor(question2.numerator/question2.denominator))}
                correctTenths={String(Math.floor((question2.numerator * 10) / question2.denominator) % 10)}
                disabled={step === 1}
                tenthsRef={tenthsInputRef}
                hundredthsRef={hundredthsInputRef}
              />
            </div>
          </div>
        </div>

        {step === 3 && (
          <Proceed
            onComplete={handleProceed}
            text="Proceed"
          />
        )}
      </div>
    </div>
  );
} 

function Hundred({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { question3 } = gameStateRef.current.question;
  const [selectedPieces, setSelectedPieces] = useState(0);
  const {step} = gameStateRef.current.state2;
  const [fractionNumerator, setFractionNumerator] = useState('');
  const [fractionDenominator, setFractionDenominator] = useState('');
  const [wholes, setWholes] = useState('');
  const [tenths, setTenths] = useState('');
  const [hundredths, setHundredths] = useState('');
  const [showHint, setShowHint] = useState(false);
  const hintRef = useRef<HTMLDivElement>(null);
  const [showHintVisual, setShowHintVisual] = useState(false);
  const [isWholesCorrect, setIsWholesCorrect] = useState(false);
  const [isTenthsCorrect, setIsTenthsCorrect] = useState(false);
  const [isTenthsIncorrect, setIsTenthsIncorrect] = useState(false);
  const [isHundredthsIncorrect, setIsHundredthsIncorrect] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tenthsInputRef = useRef<HTMLInputElement>(null);
  const hundredthsInputRef = useRef<HTMLInputElement>(null);

  const start = useRef(false);

  // Add ref for container
  const containerRef = useRef<HTMLDivElement>(null);

  // Add useEffect for auto-scroll
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', "Here's a giant chocolate bar with 100 pieces. Enter the fraction for the pieces selected!");
      start.current = true;
    }
  }, []);


  const setStep = (value: number) => {
    setGameStateRef(prev => ({
      ...prev,
      state2: {
        ...prev.state2,
        step: value
      }
    }));
  };

  useEffect(() => {
    if (fractionNumerator === String(question3.numerator) && 
        fractionDenominator === String(question3.denominator)) {
      setStep(5);
      sounds.levelUp();
      sendAdminMessage('agent', 'Great job with the fraction! Now let\'s convert it to a decimal.');
    }
  }, [fractionNumerator, fractionDenominator, question3]);

  useEffect(() => {
    if (
      parseInt(wholes) === Math.floor(question3.numerator / question3.denominator) &&
      parseInt(tenths) === Math.floor((question3.numerator * 10) / question3.denominator) % 10 &&
      parseInt(hundredths) === Math.floor((question3.numerator * 100) / question3.denominator) % 10
    ) {
      setStep(6);
      sounds.levelUp();
    }
  }, [wholes, tenths, hundredths, step, question3]);

  const handleProceed = () => {
    setStep(7);
    sounds.levelUp();
  };

  const handleFractionNumeratorChange = (value: string) => {
    setFractionNumerator(value);
    
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.length > 0) {
      if (value.length < question3.numerator.toString().length) {
        // Set timeout for incomplete answer feedback
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `The answer seems incomplete. The numerator should be ${question3.numerator}. Try entering the full number.`);
        }, 3000);
        return;
      }

      if (parseInt(value) !== question3.numerator) {
        sounds.join();
        sendAdminMessage('admin', `User answered incorrectly for the fraction numerator, correct answer is ${question3.numerator}, but user answered ${value}. Diagnose socratically. Explain everytime deeply and in detail but remember just hints. `);
      } else {
        sounds.levelUp();
        sendAdminMessage('agent', 'Great! That\'s the correct numerator.');
      }
    }
  };

  const handleFractionDenominatorChange = (value: string) => {
    setFractionDenominator(value);
    
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.length > 0) {
      if (value.length < question3.denominator.toString().length) {
        // Set timeout for incomplete answer feedback
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `The answer seems incomplete. The denominator should be ${question3.denominator}. but user answered ${value}. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.`);
        }, 5000);
        return;
      }

      if (parseInt(value) !== question3.denominator) {
        sounds.join();
        sendAdminMessage('admin', `User answered incorrectly for the fraction denominator, correct answer is ${question3.denominator}, but user answered ${value}. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.`);
      } else {
        sounds.levelUp();
        sendAdminMessage('agent', 'Perfect! You got the denominator right.');
      }
    }
  };

  const scrollToHint = () => {
    if (!showHint) {  
      setShowHint(true);
      setTimeout(() => {
        hintRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleWholesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWholes(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const correctWholes = Math.floor(question3.numerator/question3.denominator);
    
    if (value.length > 0) {
      if (value.length < correctWholes.toString().length) {
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `The answer should be ${correctWholes}. Your answer ${value} seems incomplete. Try entering the full number.`);
        }, 5000);
        return;
      }
      if (parseInt(value) !== correctWholes) {
        sounds.join();
        sendAdminMessage('admin', `User answered incorrectly for the wholes, correct answer is ${correctWholes}, but  user answered ${value}. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.`);
        setIsWholesCorrect(false);
      } else {
        sounds.levelUp();
        sendAdminMessage('agent', 'Excellent! Now enter the tenths digit.');    
        setIsWholesCorrect(true);
        setTimeout(() => tenthsInputRef.current?.focus(), 100);
      }
    }
  };

  const handleTenthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTenths(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const correctTenths = Math.floor((question3.numerator * 10) / question3.denominator) % 10;
    
    if (value.length > 0) {
      if (value.length < correctTenths.toString().length) {
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `User answered incorrectly for the tenths, The answer should be ${correctTenths}. Your answer ${value} seems incomplete. Explain everytime deeply and in detail but remember just hints.`);
        }, 5000);
        return;
      }
      if (parseInt(value) !== correctTenths) {
        sounds.join();
        scrollToHint();
        sendAdminMessage('agent', 'Oops, I see what you did there. Let\'s click on the hint to understand this better');
        setIsTenthsCorrect(false);
        setIsTenthsIncorrect(true); 
      } else {
        sounds.levelUp();
        sendAdminMessage('agent', 'Perfect! Finally, enter the hundredths digit.');
        setIsTenthsCorrect(true);
        setIsTenthsIncorrect(false);
        setTimeout(() => hundredthsInputRef.current?.focus(), 100);
      }
    }
  };

  const handleHundredthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHundredths(value);
    
    const correctHundredths = Math.floor((question3.numerator * 100) / question3.denominator) % 10;
    if (value.length > 0) {
      if (parseInt(value) !== correctHundredths) {
        sounds.join();
        scrollToHint();
        sendAdminMessage('agent', 'Oops, I see what you did there. Let\'s click on the hint to understand this better');
        setIsHundredthsIncorrect(true);
      } else {
        sounds.levelUp();
        sendAdminMessage('agent', "Excellent! You've converted the fraction to a decimal.");
        setIsHundredthsIncorrect(false);
      }
    }
  };

  const handleNeedHelp = () => {
    sounds.join();
    setShowHintVisual(true);
    sendAdminMessage('agent', `Let's look at a simpler example first to understand how tenths work in a decimal.`);
  };

  return (
    <div ref={containerRef} className='flex flex-col items-center justify-center h-full w-full pb-16'>
      <Header
        title={
          <div className='flex items-center justify-center'>
            <h1 className='text-4xl flex items-center whitespace-nowrap'> 
              Convert visuals to decimal
            </h1>
          </div>
        }
        level="Level 2"
        leftBox={`STEP ${step === 4 ? 1 : 2}`}
        rightBox={
          step === 4 
            ? "Enter mixed fraction" 
            : "Enter decimal form"
        }
      />

      <div className='flex w-full flex-col max-w-screen-md mx-auto items-center justify-center gap-8 mt-8 transform scale-90'>
        <Bar
          numerator={question3.numerator}
          denominator={question3.denominator}
          handlePieceClick={(index) => setSelectedPieces(index)}
          active={false}
        />

<div className="flex w-full">
  {/* Left side - Fraction section */}
  <div className="flex-1 bg-[#EDFFEE] flex justify-end pr-16 pb-8">
    <div className="pt-8">
      <FractionBox 
        numerator={fractionNumerator}
        denominator={fractionDenominator}
        onChange={{
          numerator: handleFractionNumeratorChange,
          denominator: handleFractionDenominatorChange
        }}
        correctnumerator={String(question3.numerator)}
        correctdenominator={String(question3.denominator)}
      />
    </div>
  </div>

  {/* Right side - Decimal section */}
  <div className={`flex-1 bg-[#F7F5DD] flex justify-start pl-16 pb-16 ${step >= 5 ? 'opacity-100' : 'opacity-50'}`}>
    <div className="pt-8">
      <DecimalBox 
        wholes={wholes}
        tenths={tenths}
        hundredths={hundredths}
        onChange={{
          wholes: (value: string) => handleWholesChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>),
          tenths: (value: string) => handleTenthsChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>),
          hundredths: (value: string) => handleHundredthsChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)
        }}
        correctWholes={String(Math.floor(question3.numerator/question3.denominator))}
        correctTenths={String(Math.floor((question3.numerator * 10) / question3.denominator) % 10)}
        correctHundredths={String(Math.floor((question3.numerator * 100) / question3.denominator) % 10)}
        disabled={step < 5}
        showHundredths={true}
        tenthsRef={tenthsInputRef}
        hundredthsRef={hundredthsInputRef}
      />
    </div>
  </div>
</div>

        {(isTenthsIncorrect || isHundredthsIncorrect) && (
          <div className="relative mt-8" ref={hintRef}>
            <button
              onClick={handleNeedHelp}
              className="bg-[#ff3971] text-white text-xl rounded-none px-4 py-2 shadow-[-5px_5px_0px_rgba(0,0,0,1)]"
            >
              Need a hint?
            </button>
          </div>
        )}

        {showHintVisual && (
          <HintVisual
            numerator={7}
            denominator={10}
            onClose={() => setShowHintVisual(false)}
            sendAdminMessage={sendAdminMessage}
            setGameStateRef={setGameStateRef}
          />
        )}

        {step === 6 && (
          <Proceed
            onComplete={handleProceed}
            text="Onward! 🚀"
          />
        )}
      </div>
    </div>
  );
}

function ThirdScreen({ sendAdminMessage }: BaseProps) {
    const { gameStateRef, setGameStateRef } = useGameState();
    const { question4 } = gameStateRef.current.question;
    const [selectedPieces, setSelectedPieces] = useState(0);
    const {step} = gameStateRef.current.state2;
    const [fractionNumerator, setFractionNumerator] = useState('');
    const [fractionDenominator, setFractionDenominator] = useState('');
    const [wholes, setWholes] = useState('');
    const [tenths, setTenths] = useState('');
    const [hundredths, setHundredths] = useState('');
    const [showHint, setShowHint] = useState(false);
    const hintRef = useRef<HTMLDivElement>(null);
    const [showHintVisual, setShowHintVisual] = useState(false);
    const [isWholesCorrect, setIsWholesCorrect] = useState(false);
    const [isTenthsCorrect, setIsTenthsCorrect] = useState(false);
    const [isTenthsIncorrect, setIsTenthsIncorrect] = useState(false);
    const [isHundredthsIncorrect, setIsHundredthsIncorrect] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const tenthsInputRef = useRef<HTMLInputElement>(null);
    const hundredthsInputRef = useRef<HTMLInputElement>(null);

    const start = useRef(false);
  
    // Add ref for container
    const containerRef = useRef<HTMLDivElement>(null);

    // Add useEffect for auto-scroll
    useEffect(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);
  
    useEffect(() => {
      if (!start.current) {
        sendAdminMessage('agent', `Let's try a slightly tougher challenge. Enter the fraction and the decimal for the selected pieces. I'm here if you need help`);
        start.current = true;
      }
    }, []);
  
  
    const setStep = (value: number) => {
      setGameStateRef(prev => ({
        ...prev,
        state2: {
          ...prev.state2,
          step: value
        }
      }));
    };
  
    useEffect(() => {
      console.log(fractionNumerator, fractionDenominator, question4);
      if (fractionNumerator === String(question4.numerator) && 
          fractionDenominator === String(question4.denominator)) {
        setStep(8);
        sounds.levelUp();
        sendAdminMessage('agent', 'Excellent work on the fraction! Now for the final step - converting to decimal.');
      }
    }, [fractionNumerator, fractionDenominator, question4]);
  
    useEffect(() => {
      if (
        wholes.length > 0 && 
        tenths.length > 0 && 
        hundredths.length > 0 &&
        parseInt(wholes) === Math.floor(question4.numerator / question4.denominator) &&
        parseInt(tenths) === Math.floor((question4.numerator * 10) / question4.denominator) % 10 &&
        parseInt(hundredths) === Math.floor((question4.numerator * 100) / question4.denominator) % 10
      ) {
        setStep(9);
        sounds.levelUp();
        sendAdminMessage('agent', `Outstanding! You've mastered converting ${question4.numerator}/${question4.denominator} to ${wholes}.${tenths}${hundredths}. You're really getting good at this!`);
      }
    }, [wholes, tenths, hundredths, step, question4]);
  
    const handleProceed = () => {
      setGameStateRef(prev => ({
        ...prev,
        screen: 'third'
      }));
      sounds.levelUp();
    };
  
    const scrollToHint = () => {
      if (!showHint) {  // Only scroll if hint wasn't already showing
        setShowHint(true);
        setTimeout(() => {
          hintRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };
  
    const handleWholesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setWholes(value);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const correctWholes = Math.floor(question4.numerator/question4.denominator);
      
      if (value.length > 0) {
        if (value.length < correctWholes.toString().length) {
          timeoutRef.current = setTimeout(() => {
            sounds.join();
            sendAdminMessage('admin', `User has answered incorrectly wholes wrong.The answer should be ${correctWholes}. Your answer ${value} seems incomplete. Explain everytime deeply and in detail but remember just hints.`);
          }, 5000);
          return;
        }
        if (parseInt(value) !== correctWholes) {
          sounds.join();
          sendAdminMessage('admin', `User answered incorrectly for the wholes, correct answer is ${correctWholes}, but  user answered ${value}. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.`);
          setIsWholesCorrect(false);
        } else {
          sounds.levelUp();
          sendAdminMessage('agent', 'Excellent! That\'s the correct number of wholes.');
          setIsWholesCorrect(true);
          setTimeout(() => tenthsInputRef.current?.focus(), 100);
        }
      }
    };
  
    const handleTenthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setTenths(value);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const correctTenths = Math.floor((question4.numerator * 10) / question4.denominator) % 10;
      
      if (value.length > 0) {
        if (value.length < correctTenths.toString().length) {
          timeoutRef.current = setTimeout(() => {
            sounds.join();
            sendAdminMessage('admin', `User answered incorrectly for the tenths.The answer should be ${correctTenths}. Your answer ${value} seems incomplete. Explain everytime deeply and in detail but remember just hints.`);
          }, 5000);
          return;
        }
        if (parseInt(value) !== correctTenths) {
          sounds.join();
          scrollToHint();
          sendAdminMessage('agent', 'Oops, I see what you did there. Let\'s click on the hint to understand this better');
          setIsTenthsCorrect(false);
          setIsTenthsIncorrect(true);
        } else {
          sounds.levelUp();
          sendAdminMessage('agent', 'Perfect! Finally, enter the hundredths digit.');
          setIsTenthsCorrect(true);
          setIsTenthsIncorrect(false);
          setTimeout(() => hundredthsInputRef.current?.focus(), 100);
        }
      }
    };
  
    const handleHundredthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setHundredths(value);
      
      const correctHundredths = Math.floor((question4.numerator * 100) / question4.denominator) % 10;
      if (value.length > 0) {
        if (parseInt(value) !== correctHundredths) {
          sounds.join();
          scrollToHint();
          sendAdminMessage('agent', 'Oops, I see what you did there. Let\'s click on the hint to understand this better');
          setIsHundredthsIncorrect(true);
        } else {
          sounds.levelUp();
          sendAdminMessage('agent', "Excellent! You've converted the fraction to a decimal.");
          setIsHundredthsIncorrect(false);
        }
      }
    };
  
    const handleFractionNumeratorChange = (value: string) => {
      setFractionNumerator(value);
      
      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (value.length > 0) {
        if (value.length < question4.numerator.toString().length) {
          // Set timeout for incomplete answer feedback
          timeoutRef.current = setTimeout(() => {
            sounds.join();
            sendAdminMessage('admin', `The answer seems incomplete. The numerator should be ${question4.numerator}. But user has entered ${value}. Explain everytime deeply and in detail but remember just hints.`);
          }, 5000);
          return;
        }

        if (parseInt(value) !== question4.numerator) {
          sounds.join();
          sendAdminMessage('admin', `User answered incorrectly, correct answer is ${question4.numerator}. But user has entered ${value}. Diagnose socratically.Explain everytime deeply and in detail but remember just hints. `);
        } else {
          sounds.levelUp();
          sendAdminMessage('agent', 'Great! That\'s the correct numerator.');
        }
      }
    };

    const handleFractionDenominatorChange = (value: string) => {
      setFractionDenominator(value);
      
      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (value.length > 0) {
        if (value.length < question4.denominator.toString().length) {
          // Set timeout for incomplete answer feedback
          timeoutRef.current = setTimeout(() => {
            sounds.join();
            sendAdminMessage('agent', `Let's think about this - we're looking at a chocolate bar divided into 10 rows of 10 pieces each. How many total pieces would that make?`);
          }, 5000);
          return;
        }

        if (parseInt(value) !== question4.denominator) {
          sounds.join();
          sendAdminMessage('agent', `Let's think about this - we're looking at a chocolate bar divided into 10 rows of 10 pieces each. How many total pieces would that make?`);
        } else {
          sounds.levelUp();
          sendAdminMessage('agent', 'Perfect! You got the denominator right.');
        }
      }
    };
  
    const handleNeedHelp = () => {
      sounds.join();
      setShowHintVisual(true);
      sendAdminMessage('agent', `Let's look at this step by step to understand how to convert ${question4.numerator}/100 to a decimal.`);
    };
  
    return (
      <div ref={containerRef} className='flex flex-col items-center justify-center h-full w-full pb-16'>
        <Header
          title={
            <div className='flex items-center justify-center'>
              <h1 className='text-4xl flex items-center whitespace-nowrap'> 
                Convert visuals to decimal
              </h1>
            </div>
          }
          level="Level 2"
          leftBox={`STEP ${step === 7 ? 1 : 2}`}
          rightBox={
            step === 7 
              ? "Enter mixed fraction" 
              : "Enter decimal form"
          }
        />
  
        <div className='flex w-full flex-col max-w-screen-md mx-auto items-center justify-center gap-8 mt-8 transform scale-90'>
          {showHintVisual ? (
            <HintVisual2
              numerator={21}
              denominator={100}
              onClose={() => setShowHintVisual(false)}
              sendAdminMessage={sendAdminMessage}
              setGameStateRef={setGameStateRef}
              currentScreen="second"
            />
          ) : (
            <>
              <Bar
                numerator={question4.numerator}
                denominator={question4.denominator}
                handlePieceClick={(index) => setSelectedPieces(index)}
                active={false}
              />
  
  <div className="flex w-full">
  {/* Left side - Fraction section */}
  <div className="flex-1 bg-[#EDFFEE] flex justify-end pr-16 pb-8">
    <div className="pt-8">
      <FractionBox 
        numerator={fractionNumerator}
        denominator={fractionDenominator}
        onChange={{
          numerator: handleFractionNumeratorChange,
          denominator: handleFractionDenominatorChange
        }}
        correctnumerator={String(question4.numerator)}
        correctdenominator={String(question4.denominator)}
      />
    </div>
  </div>

  {/* Right side - Decimal section */}
  <div className={`flex-1 bg-[#F7F5DD] flex justify-start pl-16 pb-16 ${step >= 5 ? 'opacity-100' : 'opacity-50'}`}>
    <div className="pt-8">
      <DecimalBox 
        wholes={wholes}
        tenths={tenths}
        hundredths={hundredths}
        onChange={{
          wholes: (value: string) => handleWholesChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>),
          tenths: (value: string) => handleTenthsChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>),
          hundredths: (value: string) => handleHundredthsChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)
        }}
        correctWholes={String(Math.floor(question4.numerator/question4.denominator))}
        correctTenths={String(Math.floor((question4.numerator * 10) / question4.denominator) % 10)}
        correctHundredths={String(Math.floor((question4.numerator * 100) / question4.denominator) % 10)}
        disabled={step < 5}
        showHundredths={true}
        tenthsRef={tenthsInputRef}
        hundredthsRef={hundredthsInputRef}
      />
    </div>
  </div>
</div>
  
              {showHint && step === 8 && (
                <div className="relative mt-8" ref={hintRef}>
                  <button
                    onClick={handleNeedHelp}
                    className="bg-[#ff3971] text-white text-xl rounded-none px-4 py-2 shadow-[-5px_5px_0px_rgba(0,0,0,1)]"
                  >
                    Need a hint?
                  </button>
                </div>
              )}
  
              {step === 9 && (
                <Proceed 
                  onComplete={handleProceed}
                  text="Onward! 🚀"
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  }