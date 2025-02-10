import { useEffect, useRef, useState } from "react";
import Bar from "../../components/bar";
import FractionHeader from "../../components/fractionheader";
import StepCreateBox from "../../components/stepcreatebox";
import { useGameState } from "../../state-utils";
import SuccessAnimation from '@/components/artifacts/utils/success-animate';
import { goToScreen } from "../../utils/helper";
import NewInput from '@/components/ui/newinput';
import { BaseProps } from "../../utils/types";
import DropDown from "../../components/dropdown";

export default function Screen2Step2({ sendAdminMessage }: BaseProps) {

  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction, whole } = gameStateRef.current.state2;
  const [bars, setBars] = useState([0]);
  const [totalSelected, setTotalSelected] = useState(0);
  const examplesRef = useRef<HTMLDivElement>(null);
  const [isDoneActive, setIsDoneActive] = useState(false);
  const hasStartedRef = useRef(false);
  const [showProcess, setShowProcess] = useState(false);
  const [showExamples, setShowExamples] = useState({
    example1: false,
    example2: false
  });
  const [selectedFraction, setSelectedFraction] = useState({
    numerator: '?',
    denominator: '?',
  });
  const [showDropDown, setShowDropDown] = useState(false);
  const [questionMarkValue, setQuestionMarkValue] = useState('');
  const firstWrongAttemptRef = useRef(0);

  function generateArray(center: number): string[] {
    const start = center - 1;
    return Array.from({ length: 3 }, (_, i) => (start + i).toString());
  }


  const [example1State, setExample1State] = useState({
    firstInput: false,  // 3
    secondInput: false, // 9 (3 * fraction.numerator)
    thirdInput: false,  // fraction.denominator
  });

  const [example2State, setExample2State] = useState({
    firstInput: false,  // 12 (4 * fraction.numerator)
    secondInput: false, // fraction.denominator
  });

  const [inputs, setInputs] = useState({
    example1First: '',
    example1Second: '',
    example1Third: '',
    example2First: '',
    example2Second: ''
  });

  const onIncorrect = (attempt: string, correctAnswer: string, inputType: string, wholeNumber?: string) => {
    const diff = parseInt(attempt) - parseInt(correctAnswer);

    switch (inputType) {
      case 'multiply':
        sendAdminMessage('agent', `Think about how we can write ${correctAnswer} times ${fraction.numerator}/${fraction.denominator} in the numerator part. Try again! 🤔`);
        break;
      case 'numerator':
        if (diff > 0) {
          sendAdminMessage('agent', `${attempt} is too high! When we multiply ${wholeNumber} times ${fraction.numerator}, we get a smaller number. Try again! 🔄`);
        } else {
          sendAdminMessage('agent', `${attempt} is too low! When we multiply ${wholeNumber} times ${fraction.numerator}, we get a larger number. Try again! 🔄`);
        }
        break;
      case 'denominator':
        sendAdminMessage('agent', `Remember, the denominator stays the same when multiplying by a whole number! Try again! 🎯`);
        break;
    }
  };

  const onCorrect = (example: 'first' | 'second') => {
    if (example === 'first') {
      sendAdminMessage('agent', `Great! You've completed the first example! Let's try one more! ➡️`);
    } else {
      sendAdminMessage('agent', `Excellent! You've mastered multiplying fractions by whole numbers! 🎉 Let's move on to solving problems!`, () => goToScreen('third', setGameStateRef));
    }
  };

  const inputStyling = 'w-10 text-center outline-none';


  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      sendAdminMessage('agent',
        `Let's start multiplying! How many pieces will you get when you multiply ${whole} by ${fraction.numerator}/${fraction.denominator}? 🤔`
      );
    }
  }, []);

  useEffect(() => {
    if (example1State.firstInput && example1State.secondInput && example1State.thirdInput) {
      sendAdminMessage('agent', `Great job with the first example! Let's try another one! 🎯`);
      setShowExamples(prev => ({ ...prev, example2: true }));
    }
  }, [example1State]);

  const targetValue = fraction.numerator * whole;
  const maxPiecesWithCurrentBars = bars.length * fraction.denominator;
  // const isCurrentBarsFull = () => {
  //   return bars.every(bar => bar === fraction.denominator);
  // };
  const canAddMoreBars = maxPiecesWithCurrentBars < targetValue;

  function addBar() {
    if (canAddMoreBars) {
      setBars([...bars, 0]);
      setIsDoneActive(false);
    }
    firstWrongAttemptRef.current = 1;
  }

  const handlePieceClick = (barIndex: number, selectedPieces: number) => {
    const newBars = [...bars];
    newBars[barIndex] = selectedPieces;
    setBars(newBars);

    const total = newBars.reduce((sum, pieces) => sum + pieces, 0);
    setTotalSelected(total);
    setIsDoneActive(true);
  };

  function handleDone() {

    if (totalSelected === fraction.numerator * whole) {
      sendAdminMessage('agent',
        `Perfect! You've selected ${whole * fraction.numerator} pieces in total. Now enter the fraction it represents! 📝🔢`);
      setShowDropDown(true);
    } else if (totalSelected > fraction.numerator * whole) {
      firstWrongAttemptRef.current = 1;
      sendAdminMessage('agent',
        `Oops! You've selected too many pieces (${totalSelected}). 
        We need less pieces in total. Try selecting fewer pieces! 🔄`
      );
    } else {

      if (totalSelected < targetValue && firstWrongAttemptRef.current === 0) {
        firstWrongAttemptRef.current = 1;
        sendAdminMessage('agent',
          `Looks like you need more pieces! You can use the Add Bar ➕ button to select more pieces. Try adding another bar! 🎯`
        );
      } else {
        sendAdminMessage('agent',
          `Almost there! You've selected ${totalSelected} pieces. Select few more pieces! 🔄`
        );
      }
    }
    setIsDoneActive(false);
  }

  useEffect(() => {
    if (examplesRef.current && showExamples.example1) {
      examplesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showExamples]);


  return (
    <div className="flex flex-col min-h-screen">
      <FractionHeader level={2} whole={whole} numerator={fraction.numerator} denominator={fraction.denominator} />
      <StepCreateBox step={2} numerator={fraction.numerator} denominator={fraction.denominator} heading={"MULTIPLY BY WHOLES"} />

      <div className="flex my-4 mx-auto w-full justify-center items-center px-6">
        <div className="px-[78px]"></div>
        <div className="w-[50%] ml-2">
          <Bar denominator={fraction.denominator} numerator={2} />
        </div>
        <div className="flex flex-col items-center justify-center content-center text-2xl leading-none text-black border-4 border-[#b9550b] px-4 ml-8">
          <div className="p-2 border-b-2 border-black">{fraction.numerator}</div>
          <div className="p-2">{fraction.denominator}</div>
        </div>
      </div>

      <div className="my-8 bg-[#fff0e5] p-6 py-8 relative">
        <div
          onClick={canAddMoreBars ? addBar : undefined}
          className={`bg-[#b7611c] text-white py-3 px-6 leading-none text-2xl absolute right-8 bottom-8 shadow-[-3px_3px_0px_0px_rgba(0,0,0)] shadow-black 
            ${canAddMoreBars ? 'cursor-pointer hover:opacity-90' : 'opacity-30 cursor-default'}`}
        >
          ADD BAR +
        </div>


        <div className="display flex justify-center items-center gap-4 text-black text-2xl leading-none mx-auto my-4">
          <div className="flex text-center">{whole} times</div>
          <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b]  px-4 leading-none">
            <div className="p-2 border-b-2 border-black">{fraction.numerator}</div>
            <div className="p-2">{fraction.denominator}</div>
          </div>
          <div className="w-[50%] flex flex-col gap-4 ml-2">
            {bars.map((barValue, index) => (
              <Bar
                key={index}
                denominator={fraction.denominator}
                numerator={barValue}
                handlePieceClick={(pieces) => handlePieceClick(index, pieces)}
              />
            ))}
          </div>
          <div>=</div>
          <div className={`flex flex-col items-center justify-center gap-2 ${!showDropDown ? 'opacity-50' : ''}`}>
            <DropDown options={generateArray(fraction.numerator * whole)} selected={selectedFraction.numerator} showDropDown={showDropDown} correctValue={fraction.numerator * whole + ""} onSelect={(selected) => {
              setSelectedFraction((prev) => ({ ...prev, numerator: selected }));
            }}
              onIncorrect={() => {
                sendAdminMessage('agent', `Think about it: we're multiplying ${whole} by ${fraction.numerator}. What would that give us? 🤔`);
              }}
              onCorrect={() => {
                sendAdminMessage('agent', `That's correct! Now, let's select the denominator of the fraction! 📝🔢`);
              }}
            />
            <div className="h-0 px-8 border-b-2 border-black"></div>
            <DropDown options={generateArray(fraction.denominator)} selected={selectedFraction.denominator} correctValue={fraction.denominator + ""} showDropDown={showDropDown} onSelect={(selected) => {
              setSelectedFraction((prev) => ({ ...prev, denominator: selected }));
            }}
              onCorrect={() => {
                sendAdminMessage('agent', `Right!, can you replace the question mark ❓`);
                setShowProcess(true);
              }}
              onIncorrect={() => {
                sendAdminMessage('agent', `Think about it: when multiplying by a whole number (${whole}), what happens to the denominator? Does it change? 🤔`);
              }}

            />
          </div>



          {showProcess && <><div>=</div>
            <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
              <div className="p-2 border-b-2 border-black">
                <NewInput
                  value={questionMarkValue}
                  placeholder="?"
                  nthIncorrect={2}
                  onValueChange={(value) => {
                    setQuestionMarkValue(value);
                    setIsDoneActive(true);
                  }}
                  useColor={true}
                  onIncorrect={() => {
                    sendAdminMessage('agent', `Not quite! Think about how we can write ${whole} times ${fraction.numerator}/${fraction.denominator} in the numerator part. Try again! 🔄`);
                  }}
                  onCorrect={() => {
                    sendAdminMessage('agent',
                      `Perfect! this means ${whole} times ${fraction.numerator}/${fraction.denominator} equals ${totalSelected}/${fraction.denominator}. 
                      Now let's try some examples to practice! 🎉`);

                    setTimeout(() => {
                      setShowExamples({
                        example1: true,
                        example2: false
                      })
                    }, 3000);
                  }}
                  correctValue={whole.toString()}
                  className="w-6 text-center mr-1 outline-none"
                /> x <span className="p-2">{fraction.numerator}</span>
              </div>
              <div className="p-2">{fraction.denominator}</div>
            </div></>}
        </div>
        <div className="flex justify-center items-center gap-4 text-2xl mt-8 text-black">
          <div>Pick</div>
          <div className="p-1 px-4 bg-white border-2 border-black rounded-md">{whole}</div>
          <div>times</div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-center p-2 px-4 border-2 bg-white border-black rounded-md leading-none">{whole}</div>
            <div className="px-8 my-2 border border-black h-0 leading-none"></div>
            <div className="p-2 px-4 border-2 bg-white rounded-md border-black leading-none">{fraction.denominator}</div>
          </div>
          <div>pieces</div>
        </div>

        {!showDropDown && <div className={`bg-[#b9550b] text-center mx-auto w-fit text-white text-2xl leading-none p-3 px-12 shadow-[-3px_3px_0px_0px_rgba(0,0,0)] mt-8 cursor-pointer ${!isDoneActive ? 'opacity-50' : ''}`}
          onClick={isDoneActive ? handleDone : undefined}>
          {'DONE'}
        </div>}
      </div>

      {showExamples.example1 &&
        <div className="flex flex-col items-center justify-center my-8 mb-20">
          <div className='flex justify-between items-center gap-4 bg-[#b9550b] shadow-[-3px_3px_0px_0px_rgba(0,0,0)] mx-auto p-2  text-2xl text-white px-16 py-4 relative' ref={examplesRef}>
            SOME EXAMPLES
          </div>

          {showExamples.example1 && <div className="my-12 w-full bg-[#fff0e5] p-10 flex items-center justify-center gap-4 text-2xl leading-none text-black">
            <div>3</div>
            <div>x</div>

            <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
              <div className="p-2 border-b-2 border-black">{fraction.numerator}</div>
              <div className="p-2">{fraction.denominator}</div>
            </div>
            <div>=</div>
            <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
              <div className="p-2 border-b-2 border-black">
                <NewInput
                  value={inputs.example1First}
                  onValueChange={(value) => setInputs(prev => ({ ...prev, example1First: value }))}
                  correctValue="3"
                  nthIncorrect={2}
                  useColor={true}
                  onCorrect={() => {
                    setExample1State(prev => ({ ...prev, firstInput: true }));
                    (document.querySelector('[id="example1-second"]') as HTMLInputElement)?.focus();
                  }}
                  onIncorrect={(attempt) => onIncorrect(attempt, 3 + "", 'multiply')}
                  placeholder="?"
                  className={inputStyling}
                /> x <span className="p-2">{fraction.numerator}</span>
              </div>
              <div className="p-2">{fraction.denominator}</div>
            </div>
            <div>=</div>
            <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
              <div className="p-2 border-b-2 border-black">
                <NewInput
                  id="example1-second"
                  nthIncorrect={2}
                  value={inputs.example1Second}
                  onValueChange={(value) => setInputs(prev => ({ ...prev, example1Second: value }))}
                  correctValue={(3 * fraction.numerator).toString()}
                  useColor={true}
                  onCorrect={() => {
                    setExample1State(prev => ({ ...prev, secondInput: true }));
                    (document.querySelector('[id="example1-third"]') as HTMLInputElement)?.focus();
                  }}
                  placeholder="?"
                  onIncorrect={(attempt) => onIncorrect(attempt, (3 * fraction.numerator).toString(), 'numerator', 3 + "")}
                  className={inputStyling}
                />
              </div>
              <div className="p-2">
                <NewInput
                  id="example1-third"
                  nthIncorrect={2}
                  value={inputs.example1Third}
                  onValueChange={(value) => setInputs(prev => ({ ...prev, example1Third: value }))}
                  correctValue={fraction.denominator.toString()}
                  useColor={true}
                  onCorrect={() => {
                    onCorrect('first');
                    setExample1State(prev => ({ ...prev, thirdInput: true }));
                    if (example1State.firstInput && example1State.secondInput) {
                      (document.querySelector('[id="example2-first"]') as HTMLInputElement)?.focus();
                    }
                  }}
                  onIncorrect={(attempt) => onIncorrect(attempt, fraction.denominator.toString(), 'denominator')}
                  placeholder="?"
                  className={inputStyling}
                />
              </div>
            </div>
          </div>}

          {showExamples.example2 && <div className="w-full bg-[#fff0e5] p-10 flex items-center justify-center gap-4 text-2xl leading-none text-black second-example">
            <div>4</div>
            <div>x</div>
            <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
              <div className="p-2 border-b-2 border-black">{fraction.numerator}</div>
              <div className="p-2">{fraction.denominator}</div>
            </div>
            <div>=</div>
            <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
              <div className="p-2 border-b-2 border-black">
                <NewInput
                  id="example2-first"
                  value={inputs.example2First}
                  nthIncorrect={2}
                  onValueChange={(value) => setInputs(prev => ({ ...prev, example2First: value }))}
                  correctValue={(4 * fraction.numerator).toString()}
                  useColor={true}
                  onCorrect={() => {
                    setExample2State(prev => ({ ...prev, firstInput: true }));
                    (document.querySelector('[id="example2-second"]') as HTMLInputElement)?.focus();
                  }}
                  placeholder="?"
                  onIncorrect={(attempt) => onIncorrect(attempt, (4 * fraction.numerator).toString(), 'numerator', 4 + "")}
                  className={inputStyling}
                />
              </div>
              <div className="p-2">
                <NewInput
                  id="example2-second"
                  value={inputs.example2Second}
                  onValueChange={(value) => setInputs(prev => ({ ...prev, example2Second: value }))}
                  correctValue={fraction.denominator.toString()}
                  nthIncorrect={2}
                  useColor={true}
                  onCorrect={() => {
                    onCorrect('second');
                    setExample2State(prev => ({ ...prev, secondInput: true }));
                  }}
                  onIncorrect={(attempt) => onIncorrect(attempt, fraction.denominator.toString(), 'denominator')}
                  placeholder="?"
                  className={inputStyling}
                />
              </div>
            </div>
          </div>}

          {example1State.firstInput && example1State.secondInput && example1State.thirdInput &&
            example2State.firstInput && example2State.secondInput &&
            <SuccessAnimation />}
        </div>
      }
    </div>
  )
}