import { useState } from 'react';
import  MixedFraction from './mixedFraction';



const QuestionDescription = ({ whole, numerator, denominator, pizzaName, color, onComplete }: { whole: number, numerator: number, denominator: number, pizzaName: string, color: string, onComplete: () => void }) => {
  const [showSecondRow, setShowSecondRow] = useState(false);
  const [showThirdRow, setShowThirdRow] = useState(false);

  const [inputWhole, setInputWhole] = useState('');
  const [inputNumerator, setInputNumerator] = useState('');
  const [inputDenominator, setInputDenominator] = useState('');

  const [inputWhole2, setInputWhole2] = useState('');
  const [inputNumerator2, setInputNumerator2] = useState('');
  const [inputDenominator2, setInputDenominator2] = useState('');
  

  const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputWhole(value);
    if (parseInt(value) === whole) {
      setShowSecondRow(true);
    } else {
      setShowSecondRow(false);
      setShowThirdRow(false);
    }
  };

  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputNumerator(value);
    if (parseInt(value) === numerator) {
      setShowThirdRow(true);
    } else {
      setShowThirdRow(false);
    }
  }

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputDenominator(value);
    if (parseInt(value) === denominator) {
      setShowThirdRow(true);
    } else {
      setShowThirdRow(false);
    }
  }

  const handleWholeChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputWhole2(value);
    handleComplete(parseInt(value), parseInt(inputNumerator2), parseInt(inputDenominator2));
  }

  const handleNumeratorChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputNumerator2(value);
    handleComplete(parseInt(inputWhole2), parseInt(value), parseInt(inputDenominator2));
  }

  const handleDenominatorChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputDenominator2(value);
    handleComplete(parseInt(inputWhole2), parseInt(inputNumerator2), parseInt(value));
  }

  const handleComplete = (whole2: number, numerator2: number, denominator2: number) => {
    if (whole2 === whole && numerator2 === numerator && denominator2 === denominator) {
      console.log('complete');
      onComplete();
    }
  }

  return (
    <div className={`flex flex-col gap-4 max-w-3xl mx-auto`}>
      <div className="flex gap-4 items-center">
        <span className={`flex items-center w-full h-full justify-between border-2 border-${color}-800 bg-${color}-100 p-8 rounded-lg`}>
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
            className={`border-2 text-center font-extrabold border-gray-600 rounded p-2 w-12 h-16 text-xl text-${color}-800`}
          />
        </span>

        <span className={`flex items-center w-full h-full justify-between border-2 border-${color}-800 bg-${color}-100 p-8 rounded-lg`}>
          <div className='flex gap-2'>
            {Array.from({ length: whole }).map((_, index) => (
              <div key={index} className={`flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-${color}-800 bg-${color}-500`}>
                <div className={`w-14 h-14 bg-${color}-600 border-2 border-${color}-800 rounded-full`} />
              </div>
            ))}
          </div>
        </span>
      </div>
      {showSecondRow && (
        <div className="flex gap-4 items-center mt-4">
          <span className={`flex items-center w-full h-full justify-between border-2 border-${color}-800 bg-${color}-100 p-8 rounded-lg`}>
            <div className="flex justify-between items-center">
              <div className="mb-2 text-xl w-2/3">What fraction of {pizzaName} pizza is left?</div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  min={0}
                  max={10}
                  value={inputNumerator}
                  onChange={handleNumeratorChange}
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`}
                />
                <span className='border-b-2 border-gray-600 w-12'></span>
                <input
                  type="text"
                  min={0}
                  max={10}
                  value={inputDenominator}
                  onChange={handleDenominatorChange}
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`}
                />
              </div>
            </div>
          </span>

          <span className={`flex items-center w-full h-full justify-between border-2 border-${color}-800 bg-${color}-100 p-8 rounded-lg`}>
            <div className="relative w-16 h-16">
              <div className={`w-16 h-16 rounded-full border-2 border-${color}-800 bg-${color}-500 flex items-center justify-center`}>
                {numerator > 0 && denominator > 0 && (
                  <div className="absolute inset-0">
                    {Array.from({ length: denominator }).map((_, index) => (
                      <div
                        key={index}
                        className={`absolute w-1/2 h-1/2 origin-bottom-right transform -translate-x-1/2 -translate-y-1/2 
                          ${index < numerator ? `bg-${color}-600` : 'bg-transparent'}`}
                        style={{
                          transform: `rotate(${(360 / denominator) * index}deg) skewY(${90 - (360 / denominator)}deg)`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </span>
        </div>
      )}
      {showThirdRow && (
        <div className={`bg-${color}-100 p-8 rounded-lg border-2 border-${color}-800`}>
          <div className="flex items-center justify-center gap-8">
            {/* Left side - Mixed Fraction */}
            <div className="flex items-center">
              <MixedFraction
                whole={whole}
                numerator={numerator}
                denominator={denominator}
                className='text-2xl font-extrabold'
              />
            </div>

            {/* Equals sign */}
            <div className="text-2xl font-bold">=</div>

            {/* Right side - Input fields */}
            <div className="flex items-center gap-4">
              {/* Whole number input */}
              <div className="flex flex-col items-center">
                <input 
                  type="text" 
                  value={inputWhole2} 
                  onChange={handleWholeChange2}
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`} 
                />
                <span className="text-sm mt-1">Wholes</span>
              </div>

              <div className="text-2xl font-bold">+</div>

              {/* Fraction input */}
              <div className="flex flex-col items-center">
                <input 
                  type="text" 
                  value={inputNumerator2} 
                  onChange={handleNumeratorChange2}
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`} 
                />
                <div className="w-12 border-b-2 border-gray-600 my-1"></div>
                <input 
                  type="text" 
                  value={inputDenominator2} 
                  onChange={handleDenominatorChange2}
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`} 
                />
                <span className="text-sm mt-1">Slices</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default QuestionDescription;