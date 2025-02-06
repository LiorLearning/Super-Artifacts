import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import MixedFraction from '../components/mixedFraction';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import QuestionDescription from '../components/questionDescription';
import Intro from '../components/intro';
import Proceed from '../components/proceed';
import DragDropPizza from '../components/dragDropPizza';
import { goToStep, nextStep } from '../utils/helper';
import { QuestionDescriptionProps } from '../game-state';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction1, fraction2 } = gameStateRef.current.state1;
  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage("agent","Today, we're learning to add mixed numbers! Let's Start!");

    }
    start.current = true;
  }, []);



  return (
      step === 0 ? 
        <Step0 sendAdminMessage={sendAdminMessage} />
      :
      <div className="">
      <Header fraction1={fraction1} fraction2={fraction2} type='addition' version={step === 2 ? 2 : 1} />
      {step === 1 ?

          <Step1 sendAdminMessage={sendAdminMessage} />
        : step === 2 ?
          <Step2 sendAdminMessage={sendAdminMessage} />
        : <Step3 sendAdminMessage={sendAdminMessage} />
      }
    </div>
  );
}

const Step0 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className='my-14 mx-auto'>
        <Button 
          onClick={() => {
            goToStep(1, setGameStateRef, 1); 
            sendAdminMessage('agent', "Let's break it down! Start with the pepperoni pizzas")}
          }
          className='m-2 p-6 mx-auto bg-[#F97315] text-3xl text-white shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#F97315] max-w-3xl'
        >
          Start &gt;&gt;
        </Button>
      </div>
    </div>
  );
} 

const Step1 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.state1;
  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage("agent","Here's your order, can figure out the total number of pizzas? Let’s get started—click 'Next'!");
    }
    start.current = true;
  }, []);

  return (
    <div className="flex gap-8 flex-col w-full">
      <div className="w-full max-w-3xl mx-auto mt-20">
        <div className="bg-[#F97315] text-white text-2xl py-4 mb-[2px] border-2 font-extrabold border-gray-800 px-4  text-center shadow-[-2px_2px_0px_rgba(0,0,0,1)]">
          PIZZA ORDER
        </div>
        <div className="flex items-center justify-center gap-4 mt-8 shadow-[inset_-3px_3px_1px_rgba(0,0,0,0.3)] p-8 border-2 border-gray-800">
          <div className="flex bg-[#FFC5C6] p-2 items-stretch gap-2 border-2 border-gray-500 rounded-lg shadow-[-2px_2px_1px_rgba(0,0,0,0.7)]">
            <span className='bg-white rounded-lg border-2 border-gray-500 flex items-center shadow-[inset_-1px_1px_0px_rgba(0,0,0,0.7)]'>
              <MixedFraction
                whole={fraction1.whole}
                numerator={fraction1.numerator}
                denominator={fraction1.denominator}
                className='text-xl font-extrabold p-2'
              />
            </span>
            <p className='text-xl font-extrabold p-3 border-2 border-gray-500 bg-white rounded-lg flex-grow flex gap-2 items-center shadow-[inset_-1px_1px_0px_rgba(0,0,0,0.7)]'>
              <div className={`flex flex-col items-center justify-center p-1 rounded-full border-[1px] border-black bg-[#FFC98F]`}>
                <div className={`w-12 h-12 bg-[#E65A5A] border-[1px] shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.5)] border-black rounded-full`} />
              </div>
              Pepperoni Pizza
            </p>
          </div>
          <span className="text-5xl font-bold text-black">+</span>
          <div className="flex bg-yellow-200 p-2 items-stretch gap-2 border-2 border-gray-500 rounded-lg shadow-[-1px_1px_0px_rgba(0,0,0,0.7)]">
            <span className='bg-white rounded-lg border-2 border-gray-500 flex items-center shadow-[inset_-1px_1px_0px_rgba(0,0,0,0.7)]'>
              <MixedFraction
                whole={fraction2.whole}
                numerator={fraction2.numerator}
                denominator={fraction2.denominator}
                className='text-xl font-extrabold p-2'
              />
            </span>
            <p className='text-xl font-extrabold p-3 border-2 border-gray-500 bg-white rounded-lg flex-grow flex gap-2 items-center shadow-[inset_-1px_1px_0px_rgba(0,0,0,0.7)]'>
              <div className={`flex flex-col items-center justify-center p-1 rounded-full border-[1px] border-black bg-[#FFC98F]`}>
                <div className={`w-12 h-12 bg-yellow-200 border-[1px] shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.5)] border-black rounded-full`} />
              </div>
              Cheese Pizza
            </p>
          </div>
        </div>
      </div>
      <Button 
      onClick={() => {
        goToStep(1, setGameStateRef, 2); 
        sendAdminMessage('agent', "Let's break it down! Start with the pepperoni pizzas")}
      } 
      className='m-2 p-6 mx-auto bg-[#F97315] text-3xl text-white shadow-[-3px_3px_0px_rgba(0,0,0,1)] hover:bg-[#F97315] max-w-3xl rounded-none'>
        Next &gt;&gt;
      </Button>
    </div>
  );
};

const Step2 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.state1;
  const [complete, setComplete] = useState(0);
  const [question1description, setQuestion1description] = useState({
    showFirstRow: true,
    showSecondRow: false,
    showThirdRow: false,
    inputWhole: '',
    inputNumerator: '',
    inputDenominator: '',
  } as QuestionDescriptionProps);

  const [question2description, setQuestion2description] = useState({
    showFirstRow: false,
    showSecondRow: false,
    showThirdRow: false,
    inputWhole: '',
    inputNumerator: '',
    inputDenominator: '',
  } as QuestionDescriptionProps);


  useEffect(() => {
    if (complete === 1) {
      sendAdminMessage('agent', "Awesome! The pepperoni pizza order is complete, let's revise the Cheese pizza order too");
    } else if (complete === 2) {
      sendAdminMessage('agent', "Sharp work pizza wizard! See, mixed numbers are like pizzas—wholes and slices added together");
    }
  }, [complete])

  useEffect(() => {
    if (parseInt(question1description.inputWhole) === fraction1.whole){
      sendAdminMessage('agent', `That's right! There are ${fraction1.whole} whole pepperoni pizzas. Now, let’s look at the leftover slices!`);
    } else if (parseInt(question1description.inputWhole) > 0) {
      sendAdminMessage('admin', "Oops! Take a closer look at the picture to count the full ones. Try again!");
    }
  }, [question1description.inputWhole])

  useEffect(() => {
    if (parseInt(question1description.inputNumerator) === fraction1.numerator && parseInt(question1description.inputDenominator) === fraction1.denominator){
      sendAdminMessage('agent', `Great job! There's ${fraction1.numerator} slice left out of ${fraction1.denominator}. That makes it ${fraction1.numerator}/${fraction1.denominator} of a pizza!`);
    } else if (parseInt(question1description.inputNumerator) > 0 && parseInt(question1description.inputNumerator) !== fraction1.numerator) {

      sendAdminMessage('admin', "Almost! Count the leftover slices carefully—how many do you see?");
    }
  }, [question1description.inputNumerator])

  useEffect(() => {
    if (parseInt(question1description.inputDenominator) === fraction1.denominator && parseInt(question1description.inputNumerator) === fraction1.numerator){
      sendAdminMessage('agent', `Great job! There's ${fraction1.numerator} slice left out of ${fraction1.denominator}. That makes it ${fraction1.numerator}/${fraction1.denominator} of a pizza!`);
    } else if (parseInt(question1description.inputDenominator) > 0 && parseInt(question1description.inputDenominator) !== fraction1.denominator){
      sendAdminMessage('admin', "Not quite! Think about how many slices make up a whole pizza. Try again!");
    }
  }, [question1description.inputDenominator])

  useEffect(() => {
    if (parseInt(question2description.inputWhole) === fraction2.whole){
      sendAdminMessage('agent', `That's right! There are ${fraction2.whole} whole cheeze pizzas. Now, let’s look at the leftover slices!`);
    } else if (parseInt(question2description.inputWhole) > 0) {
      sendAdminMessage('agent', "Oops! Take a closer look at the picture to count the full ones. Try again!");
    }
  }, [question2description.inputWhole])

  useEffect(() => {
    if (parseInt(question2description.inputNumerator) === fraction2.numerator && parseInt(question2description.inputDenominator) === fraction2.denominator){
      sendAdminMessage('agent', `Great job! There's ${fraction2.numerator} slice left out of ${fraction2.denominator}. That makes it ${fraction2.numerator}/${fraction2.denominator} of a pizza!. Now quickly fill in the Cheese order`);
    } else if (parseInt(question2description.inputNumerator) > 0 && parseInt(question2description.inputNumerator) !== fraction2.numerator) {
      sendAdminMessage('agent', "Almost! Count the leftover slices carefully—how many do you see?");
    }
  }, [question2description.inputNumerator])

  useEffect(() => {
    if (parseInt(question2description.inputDenominator) === fraction2.denominator && parseInt(question2description.inputNumerator) === fraction2.numerator){
      sendAdminMessage('agent', `Great job! There's ${fraction2.numerator} slice left out of ${fraction2.denominator}. That makes it ${fraction2.numerator}/${fraction2.denominator} of a pizza!. Now quickly fill in the Cheese order`);
    } else if (parseInt(question2description.inputDenominator) > 0 && parseInt(question2description.inputDenominator) !== fraction2.denominator) {

      sendAdminMessage('agent', "Not quite! Think about how many slices make up a whole pizza. Try again!");
    }
  }, [question2description.inputDenominator])

  return (
    <div className='flex flex-col gap-6 max-w-3xl mx-auto'>
    <div className={`flex gap-8 ${complete<2 && 'flex-col'} w-full mx-auto`}>
    {/* explaining inital pizzas */}
    { complete >= 0 &&
        <QuestionDescription 
          showFirstRow={question1description.showFirstRow}
          setShowFirstRow={(value) => setQuestion1description(prev => ({ ...prev, showFirstRow: value }))}
          showSecondRow={question1description.showSecondRow}
          setShowSecondRow={(value) => setQuestion1description(prev => ({ ...prev, showSecondRow: value }))}
          showThirdRow={question1description.showThirdRow}
          setShowThirdRow={(value) => setQuestion1description(prev => ({ ...prev, showThirdRow: value }))}

          inputWhole={question1description.inputWhole}
          setInputWhole={(value) => setQuestion1description(prev => ({ ...prev, inputWhole: value }))}
          inputNumerator={question1description.inputNumerator}
          setInputNumerator={(value) => setQuestion1description(prev => ({ ...prev, inputNumerator: value }))}
          inputDenominator={question1description.inputDenominator}
          setInputDenominator={(value) => setQuestion1description(prev => ({ ...prev, inputDenominator: value }))}

          whole={fraction1.whole} 
          numerator={fraction1.numerator} 
          denominator={fraction1.denominator} 
          pizzaName='pepperoni' 
          color={['#FFE6E6','#E65A5A','#FFF0F0','#E65A5A']}
          pizzacolor={['#FFC5C6', '#E65A5A']}

          onComplete={() => {
            setComplete(1)
            setQuestion2description(prev => ({ ...prev, showFirstRow: true }))
          }} 
        />
    }
    { complete >= 2 && (
        <div className="flex items-center justify-center w-full">
          <span className="text-5xl font-bold">
            +
          </span>
        </div>
    )}
    { complete >= 1 &&
        <QuestionDescription 
          showFirstRow={question2description.showFirstRow}
          setShowFirstRow={(value) => setQuestion2description(prev => ({ ...prev, showFirstRow: value }))}
          showSecondRow={question2description.showSecondRow}
          setShowSecondRow={(value) => setQuestion2description(prev => ({ ...prev, showSecondRow: value }))}
          showThirdRow={question2description.showThirdRow}
          setShowThirdRow={(value) => setQuestion2description(prev => ({ ...prev, showThirdRow: value }))}

          inputWhole={question2description.inputWhole}
          setInputWhole={(value) => setQuestion2description(prev => ({ ...prev, inputWhole: value }))}
          inputNumerator={question2description.inputNumerator}
          setInputNumerator={(value) => setQuestion2description(prev => ({ ...prev, inputNumerator: value }))}
          inputDenominator={question2description.inputDenominator}
          setInputDenominator={(value) => setQuestion2description(prev => ({ ...prev, inputDenominator: value }))}

          whole={fraction2.whole}
          numerator={fraction2.numerator} 
          denominator={fraction2.denominator} 
          pizzaName='Cheese' 
          color={['#FFFDD1', '#DBD556', '#FFFEE6', '#D39400']}
          pizzacolor={['#FFC98F','#E6DF5A']}

          onComplete={() => setComplete(2)} 
        />
    }
    </div>
    { complete >= 2 && 
      <div className='flex flex-col gap-4 max-w-3xl mx-auto'>
          <Button 
            onClick={() => goToStep(1, setGameStateRef, 3)}
            className='bg-[#F97315] text-2xl text-white shadow-[-3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#F97315] font-bold py-6 px-8 rounded-none'
        >
          NEXT &gt;&gt;
          </Button> 
      </div>
    }

    </div>
  
  )
};

const Step3 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.state1;
  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage("agent","Now all you need to do is drag the wholes on the left side, and the slices on the right. No stealing slices!!");
    }
    start.current = true;
  }, []);

  // States for first section (Whole Pizzas)
  const [wholeInputs, setWholeInputs] = useState({
    input: '',
    isCorrect: false
  });

  // States for second section (Slices)
  const [fractionInputs, setFractionInputs] = useState({
    numerator: '',
    denominator: '',
    isCorrect: false
  });

  // States for mixed form
  const [mixedFormInputs, setMixedFormInputs] = useState({
    whole: '',
    numerator: '',
    denominator: '',
    isCorrect: false
  });

  // Computed values
  const totalWhole = fraction1.whole + fraction2.whole;
  const totalNumerator = fraction1.numerator + fraction2.numerator;
  const commonDenominator = fraction1.denominator; // Assuming same denominator

  // Handle whole number input
  const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isCorrect = parseInt(value) === totalWhole;
    setWholeInputs({
      input: value,
      isCorrect
    });
  };

  // Handle fraction inputs
  const handleFractionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newInputs = {
      ...fractionInputs,
      [name]: value
    };

    const isCorrect = 
      parseInt(newInputs.numerator || '0') === totalNumerator && 
      parseInt(newInputs.denominator || '0') === commonDenominator;

    setFractionInputs({
      ...newInputs,
      isCorrect
    });
  };

  // Handle mixed form inputs
  const handleMixedFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newInputs = {
      ...mixedFormInputs,
      [name]: value
    };

    const isCorrect = 
      parseInt(newInputs.whole || '0') === totalWhole &&
      parseInt(newInputs.numerator || '0') === totalNumerator &&
      parseInt(newInputs.denominator || '0') === commonDenominator;

    if (isCorrect) {
      sendAdminMessage("agent", "Wohoo! Great job on this question partner. Now that you are trained, let's do some more");
    }

    setMixedFormInputs({
      ...newInputs,
      isCorrect
    });
  };

  const [showMixedForm, setShowMixedForm] = useState(false);

  // Show proceed button when mixed form is correct
  const showProceedButton = mixedFormInputs.isCorrect;

  const handleProceed = () => {
    setGameStateRef(prev => ({ ...prev, screen: 2 }));
  };

  // Helper function to get input style based on correctness
  const getInputStyle = (isCorrect: boolean, baseColor: string) => {
    return `border-2 text-center font-extrabold rounded p-2 w-12 h-12 text-xl
      ${isCorrect ? 'border-green-600 bg-green-100' : `border-${baseColor}-600`}
      ${isCorrect ? 'text-green-800' : `text-${baseColor}-800`}`;
  };

  return (
    <div className='flex flex-col pb-16 scale-90 origin-top'>
      <DragDropPizza
        fraction1={{
          whole: fraction1.whole,
          numerator: fraction1.numerator,
          denominator: fraction1.denominator,
          color: ['#FFC5C6', '#E65A5A', '#FFC5C6'],
          name: 'Pepperoni'
        }}
        fraction2={{
          whole: fraction2.whole,
          numerator: fraction2.numerator,
          denominator: fraction2.denominator,
          color: ['#FFC98F', '#E6DF5A', '#FFF29A'], 
          name: 'Cheese'
        }}
        onComplete={() => {
          setShowMixedForm(true);
          sendAdminMessage("agent", "Fill these boxes to arrive at your answer");
          sendAdminMessage("agent", "Fill these boxes to arrive at your answer");
        }}
        sendAdminMessage={sendAdminMessage}
      />

      {showMixedForm && (
        <div className='flex flex-col py-16 items-center gap-8 p-4 bg-green-50'>
            <div className="text-3xl font-bold text-green-600 mb-4">Write in mixed form</div>
            <div className="flex items-start gap-16">
              {/* Wholes Input Box */}
              <div className="relative flex h-24 flex-col justify-center items-center">
                <div className="w-20 h-20 border-[3px] border-green-600 rounded-lg flex items-center justify-center bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                  <input
                    type="text"
                    name="whole"
                    value={mixedFormInputs.whole}
                    onChange={handleMixedFormChange}
                    className={`w-full h-full text-4xl font-bold text-center bg-transparent outline-none ${parseInt(mixedFormInputs.whole) === totalWhole ? 'text-green-600' : ''}`}
                    placeholder="?"
                  />
                </div>
                <div className="absolute -bottom-8 text-lg font-bold text-gray-700 whitespace-nowrap">Wholes</div>
              </div>

              {/* Fraction Input Box */}
              <div className="relative h-24 flex flex-col items-center">
                <div className="w-20 border-[3px] border-purple-500 rounded-lg flex flex-col items-center bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                  <input
                    type="text"
                    name="numerator"
                    value={mixedFormInputs.numerator}
                    onChange={handleMixedFormChange}
                    className={`w-full h-10 text-4xl font-bold text-center bg-transparent outline-none ${parseInt(mixedFormInputs.numerator) === totalNumerator ? 'text-purple-600' : ''}`}
                    placeholder="?"
                  />
                  <div className="w-12 h-[2px] bg-purple-500 my-1" />
                  <input
                    type="text"
                    name="denominator"
                    value={mixedFormInputs.denominator}
                    onChange={handleMixedFormChange}
                    className={`w-full h-10 text-4xl font-bold text-center bg-transparent outline-none ${parseInt(mixedFormInputs.denominator) === commonDenominator ? 'text-purple-600' : ''}`}
                    placeholder="?"
                  />
                </div>
                <div className="absolute -bottom-8 text-lg font-bold text-gray-700 whitespace-nowrap">Fraction</div>
              </div>
            </div>
        </div>
      )}

      {showProceedButton && <Proceed onComplete={handleProceed} />}
    </div>
  );
};
