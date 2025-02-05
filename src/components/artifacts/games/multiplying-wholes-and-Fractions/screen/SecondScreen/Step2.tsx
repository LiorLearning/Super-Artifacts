import { useEffect, useRef, useState } from "react";
import Bar from "../../components/bar";
import FractionHeader from "../../components/fractionheader";
import StepCreateBox from "../../components/stepcreatebox";
import { useGameState } from "../../state-utils";
import SuccessAnimation from '@/components/artifacts/utils/success-animate';
import { goToScreen } from "../../utils/helper";
import NewInput from '@/components/ui/newinput';
import { BaseProps } from "../../utils/types";

export default function Screen2Step2({sendAdminMessage}: BaseProps) {

  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction, whole } = gameStateRef.current.state2;
  const [fractionValue, setFractionValue] = useState({ numerator: '?', denominator: fraction.denominator });
  const [bars, setBars] = useState([0]);
  const [totalSelected, setTotalSelected] = useState(0);
  const examplesRef = useRef<HTMLDivElement>(null);


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

  const onIncorrect = () => {
    sendAdminMessage('agent', "Hmmm, let's give that another try!");
  }

  const onCorrect = () => {
    sendAdminMessage('agent', "Great job! That's correct!");
  }

  const inputStyling = 'w-10 text-center outline-none';

  useEffect(() => {
    if (totalSelected === fraction.numerator * whole && examplesRef.current) {
      setTimeout(() => {
        if (examplesRef.current) {
          examplesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  }, [totalSelected]);

  useEffect(() => {
    if (example1State.firstInput && example1State.secondInput && example1State.thirdInput && example2State.firstInput && example2State.secondInput) {
      setTimeout(() => {
        goToScreen('third', setGameStateRef)
      }, 4000);
    }
  }, [example1State, example2State]);


  const targetValue = fraction.numerator * whole;
  const maxPiecesWithCurrentBars = bars.length * fraction.denominator;
  const canAddMoreBars = maxPiecesWithCurrentBars < targetValue;

  function addBar() {
    if (canAddMoreBars) {
      setBars([...bars, 0]);
    }
  }

  const handlePieceClick = (barIndex: number, selectedPieces: number) => {
    const newBars = [...bars];
    newBars[barIndex] = selectedPieces;
    setBars(newBars);

    const total = newBars.reduce((sum, pieces) => sum + pieces, 0);

    setTotalSelected(total);
    setFractionValue({
      numerator: total.toString(),
      denominator: fraction.denominator
    });
  };


  return (
    <div className="flex flex-col min-h-screen">
      <FractionHeader level={2} whole={whole} numerator={fraction.numerator} denominator={fraction.denominator} />
      <StepCreateBox step={2} numerator={fraction.numerator} denominator={fraction.denominator} heading={"MULTIPLY BY WHOLES"} />

      <div className="flex max-w-screen-md my-4 mx-auto w-full justify-center items-center min-w-52">
        <Bar denominator={fraction.denominator} numerator={2} />
        <div className="flex flex-col items-center justify-center content-center text-4xl leading-none text-black border-4 border-[#b9550b] px-4 ml-8">
          <div className="p-2 border-b-2 border-black">{fraction.numerator}</div>
          <div className="p-2">{fraction.denominator}</div>
        </div>
      </div>

      <div className="my-12 bg-[#fff0e5] p-10 relative">
        <div
          onClick={addBar}
          className={`bg-[#b7611c] text-white p-4 leading-none text-3xl absolute right-8 top-8 shadow-[-4px_4px_0px_0px_rgba(0,0,0)] shadow-black 
          ${canAddMoreBars ? 'cursor-pointer' : 'opacity-50'}`}
        >
          ADD BAR +
        </div>
        <div className="flex justify-center items-center gap-4 text-4xl text-black">
          <div>Pick</div>
          <div className="p-2 px-4 bg-white border-2 border-black rounded-md">{whole}</div>
          <div>times</div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-center p-2 px-4 border-2 bg-white border-black rounded-md leading-none">{whole}</div>
            <div className="px-8 my-2 border border-black h-0 leading-none"></div>
            <div className="p-2 px-4 border-2 bg-white rounded-md border-black leading-none">{fraction.denominator}</div>
          </div>
          <div>pieces</div>
        </div>

        <div className="display flex justify-center items-center gap-6 text-black text-4xl leading-none mx-auto my-10">
          <div className="flex text-center">{whole} times</div>
          <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b]  px-4 leading-none">
            <div className="p-2 border-b-2 border-black">{fraction.numerator}</div>
            <div className="p-2">{fraction.denominator}</div>
          </div>
          <div className="w-[60%] flex flex-col gap-4">
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
          <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
            <div className="p-2 border-b-2 border-black">{fractionValue.numerator}</div>
            <div className="p-2">{fractionValue.denominator}</div>
          </div>
        </div>
      </div>

      {totalSelected !== fraction.numerator * whole && <div className="mx-auto shadow-[-3px_3px_0px_0px_rgba(0,0,0)] bg-[#b9550b] p-6 leading-none text-4xl text-white text-center my-8">
        LISTEN TO THE HINT 🔊
      </div>}
      

      
      {totalSelected === fraction.numerator * whole &&
        <div className="flex flex-col items-center justify-center">
          <div className='flex justify-between items-center gap-4 bg-[#b9550b] shadow-[-3px_3px_0px_0px_rgba(0,0,0)] mx-auto p-2 mt-12 text-3xl text-white px-16 py-7' ref={examplesRef}>
            SOME EXAMPLES
          </div>

          <div className="my-12 w-full bg-[#fff0e5] p-10 flex items-center justify-center gap-4 text-4xl leading-none text-black">
            <div>3</div>
            <div>x</div>
            <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
              <div className="p-3 border-b-2 border-black">{fraction.numerator}</div>
              <div className="p-3">{fraction.denominator}</div>
            </div>
            <div>=</div>
            <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
              <div className="p-2 border-b-2 border-black">
                <NewInput
                  value={inputs.example1First}
                  onValueChange={(value) => setInputs(prev => ({ ...prev, example1First: value }))}
                  correctValue="3"
                  useColor={true}
                  onCorrect={() => {
                    onCorrect();
                    setExample1State(prev => ({ ...prev, firstInput: true }));
                    (document.querySelector('[id="example1-second"]') as HTMLInputElement)?.focus();
                  }}
                  onIncorrect={onIncorrect}
                  placeholder="?"
                  className={inputStyling}
                /> x <span className="p-2">{fraction.numerator}</span>
              </div>
              <div className="p-3">{fraction.denominator}</div>
            </div>
            <div>=</div>
            <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
              <div className="p-2 border-b-2 border-black">
                <NewInput
                  id="example1-second"
                  value={inputs.example1Second}
                  onValueChange={(value) => setInputs(prev => ({ ...prev, example1Second: value }))}
                  correctValue={(3 * fraction.numerator).toString()}
                  useColor={true}
                  onCorrect={() => {
                    setExample1State(prev => ({ ...prev, secondInput: true }));
                    (document.querySelector('[id="example1-third"]') as HTMLInputElement)?.focus();
                  }}
                  placeholder="?"
                  className={inputStyling}
                />
              </div>
              <div className="p-2">
                <NewInput
                  id="example1-third"
                  value={inputs.example1Third}
                  onValueChange={(value) => setInputs(prev => ({ ...prev, example1Third: value }))}
                  correctValue={fraction.denominator.toString()}
                  useColor={true}
                  onCorrect={() => {
                    setExample1State(prev => ({ ...prev, thirdInput: true }));
                    if (example1State.firstInput && example1State.secondInput) {
                      (document.querySelector('[id="example2-first"]') as HTMLInputElement)?.focus();
                    }
                  }}
                  placeholder="?"
                  className={inputStyling}
                />
              </div>
            </div>
          </div>

          <div className="w-full bg-[#fff0e5] p-10 flex items-center justify-center gap-4 text-4xl leading-none text-black second-example">
            <div>4</div>
            <div>x</div>
            <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
              <div className="p-3 border-b-2 border-black">{fraction.numerator}</div>
              <div className="p-3">{fraction.denominator}</div>
            </div>
            <div>=</div>
            <div className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-4 leading-none">
              <div className="p-2 border-b-2 border-black">
                <NewInput
                  id="example2-first"
                  value={inputs.example2First}
                  onValueChange={(value) => setInputs(prev => ({ ...prev, example2First: value }))}
                  correctValue={(4 * fraction.numerator).toString()}
                  useColor={true}
                  onCorrect={() => {
                    setExample2State(prev => ({ ...prev, firstInput: true }));
                    (document.querySelector('[id="example2-second"]') as HTMLInputElement)?.focus();
                  }}
                  placeholder="?"
                  className={inputStyling}
                />
              </div>
              <div className="p-2">
                <NewInput
                  id="example2-second"
                  value={inputs.example2Second}
                  onValueChange={(value) => setInputs(prev => ({ ...prev, example2Second: value }))}
                  correctValue={fraction.denominator.toString()}
                  useColor={true}
                  onCorrect={() => {
                    setExample2State(prev => ({ ...prev, secondInput: true }));
                  }}
                  placeholder="?"
                  className={inputStyling}
                />
              </div>
            </div>
          </div>

          {example1State.firstInput && example1State.secondInput && example1State.thirdInput && 
           example2State.firstInput && example2State.secondInput && 
           <SuccessAnimation />}
        </div>
      }
    </div>
  )
}