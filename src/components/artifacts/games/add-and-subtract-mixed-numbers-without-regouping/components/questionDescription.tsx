import { useState } from 'react';
import  MixedFraction from './mixedFraction';
import PizzaSlices from './pizzaSlices';

interface QuestionDescriptionProps {
  showFirstRow: boolean;
  setShowFirstRow: (show: boolean) => void;
  showSecondRow: boolean;
  setShowSecondRow: (show: boolean) => void;
  showThirdRow: boolean;
  setShowThirdRow: (show: boolean) => void;

  inputWhole: string;
  setInputWhole: (input: string) => void;
  inputNumerator: string;
  setInputNumerator: (input: string) => void;
  inputDenominator: string;
  setInputDenominator: (input: string) => void;

  whole: number;
  numerator: number;
  denominator: number;
  pizzaName: string;
  color: string[];
  pizzacolor: string[];
  onComplete: () => void;
  sendAdminMessage: (role: string, message: string) => void;
}



const QuestionDescription = ({ 
  showFirstRow,
  setShowFirstRow,
  showSecondRow,
  setShowSecondRow,
  showThirdRow,
  setShowThirdRow,

  inputWhole,
  setInputWhole,
  inputNumerator,
  setInputNumerator,
  inputDenominator,
  setInputDenominator,

  whole, 
  numerator, 
  denominator, 
  pizzaName, 
  color, 
  pizzacolor,
  onComplete,
  sendAdminMessage
}: QuestionDescriptionProps) => {

  const [showNextButton, setShowNextButton] = useState(false);

  const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputWhole(value);
    
    if (parseInt(value) === whole) {
      setShowSecondRow(true);
    }
  };

  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputNumerator(value);
    handleComplete(parseInt(value), parseInt(inputDenominator || '0'));
  };

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputDenominator(value);
    handleComplete(parseInt(inputNumerator || '0'), parseInt(value));
  };

  const handleComplete = (inputNumerator: number, inputDenominator: number) => {
    if (
      inputNumerator === numerator && 
      inputDenominator === denominator && 
      !isNaN(inputNumerator) && 
      !isNaN(inputDenominator)
    ) {
      setShowNextButton(true);
    }
  }

  const handleNextClick = () => {
    setShowFirstRow(false);
    setShowSecondRow(false);
    setShowThirdRow(true);
    onComplete();
  }

  console.log(`bg-[${color}]`);

  const getInputStyle = (value: string, correctValue: number) => `
    border-2 text-center font-extrabold rounded p-2 w-12 h-12 text-xl
    ${value !== '' ? 
      (parseInt(value) === correctValue ? 
        'border-green-600 bg-green-100 text-green-800' : 
        'border-red-600 bg-red-100 text-red-800'
      ) : 
      'border-gray-600'
    }
  `;

  return (
    <div className={`flex flex-col gap-4 max-w-3xl w-full mx-auto`}>
      {showFirstRow &&
        <div className="flex w-full gap-4 items-center font-jost">
          <span className={`flex items-center w-1/2 h-full justify-between p-6 rounded-lg`} style={{backgroundColor: color[0]}}>
            <p className='text-xl w-2/3'>
              How many <span className='font-bold'>whole</span> {pizzaName} pizzas
              are ordered?
            </p>
            <input
              type="text"
              min={0}
              max={10}
              value={inputWhole}
              onChange={handleWholeChange}
              className={getInputStyle(inputWhole, whole)} 

              style={{ color: 'black' }}
              disabled={showSecondRow}
            />
          </span>

          <span className="flex items-center w-1/2 h-full justify-between p-[28px] rounded-lg" style={{ borderWidth: 2, borderColor: color[1], backgroundColor: color[2] }}>
            <div className='flex gap-2'>
              {Array.from({ length: whole }).map((_, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-1 rounded-full border-[1px] border-black" style={{ backgroundColor: pizzacolor[0] }}>
                  <div className="w-14 h-14 border-[1px] border-black shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.5)] rounded-full" style={{ backgroundColor: pizzacolor[1] }} />
                </div>
              ))}
            </div>
          </span>
        </div>
      }
      {showSecondRow && (
        <div className="flex gap-4 w-full items-center font-jost">
          <span className="flex items-center w-1/2 h-full justify-between p-4 rounded-lg" style={{ backgroundColor: color[0] }}>
            <div className="flex justify-between items-center w-full">
              <div className="text-xl w-2/3">What <span className='font-bold'>fraction</span> of {pizzaName} pizza is left?</div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  min={0}
                  max={10}
                  value={inputNumerator}
                  onChange={handleNumeratorChange}
                  className={getInputStyle(inputNumerator, numerator)} 
                  style={{ color: 'black' }}
                  disabled={showNextButton}
                />
                <span className='border-b-2 border-gray-600 w-12'></span>
                <input
                  type="text"
                  min={0}
                  max={10}
                  value={inputDenominator}
                  onChange={handleDenominatorChange}
                  className={getInputStyle(inputDenominator, denominator)} 
                  style={{ color: 'black' }}
                  disabled={showNextButton}
                />
              </div>
            </div>
          </span>
          <span className="flex items-center w-1/2 h-full justify-between p-10 rounded-lg" style={{ borderWidth: 2, borderColor: color[1], backgroundColor: color[2] }}>
            <PizzaSlices
              numerator={numerator}
              denominator={denominator}
              color={pizzacolor}
            />
          </span>
        </div>
      )}
      {showNextButton && !showThirdRow && (
        <button
          onClick={handleNextClick}
          className='m-2 px-6 py-2 mx-auto bg-[#F97315] text-xl text-white shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] max-w-3xl rounded-none font-bold'
        >
          NEXT &gt;&gt;
        </button>
      )}
      {showThirdRow && (
        <div className="bg-[#f7f7f7] p-2 w-full rounded-2xl border-[6px] border-[#f7f7f7] transition-all duration-100" style={{ backgroundColor: color[2], borderColor: color[1] }}>
          <div className="flex items-center w-full justify-center gap-4 p-8">
            <div className="flex items-center">
              <MixedFraction
                whole={whole}
                numerator={numerator}
                denominator={denominator}
                className='text-4xl'
              />
            </div>

            {/* Equals sign */}
            <div className="text-4xl font-bold">=</div>

            {/* Right side - Input fields */}
            <div className="flex items-center gap-4">
              {/* Whole number input */}
              <div className="relative h-[100px] flex flex-col items-center justify-center border-2 border-black bg-white px-2">
                <input 
                  type="text" 
                  value={whole} 
                  readOnly
                  className="text-center bg-transparent border-none outline-none w-12 text-4xl"
                  style={{ color: color[3] }}
                />
                <span className="absolute top-[110%] mt-1">Wholes</span>
              </div>

              <div className="text-4xl font-bold text-[#9B4949]">+</div>

              <span className='relative h-[100px] flex flex-col items-center justify-center border-2 border-black bg-white px-2'>
                <input 
                  type="text" 
                  value={numerator} 
                  readOnly
                  className="text-center bg-transparent border-none outline-none w-12 text-4xl"
                  style={{ color: color[3] }}
                />
                <div className="w-8 border-b-2 border-gray-600 my-1"></div>
                <input 
                  type="text" 
                  value={denominator} 
                  readOnly
                  className="text-center bg-transparent border-none outline-none w-12 text-4xl"
                  style={{ color: color[3] }}
                />
                <span className="absolute top-[110%] mt-1">Slices</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default QuestionDescription;