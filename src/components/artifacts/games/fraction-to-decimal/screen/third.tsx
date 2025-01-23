import React, { useEffect, useRef, useState } from 'react';
import { useGameState } from '../state-utils';
import Bar, { Bar2d } from '../components/bar';
import Proceed from '../components/proceed';
import RedBox, { RedBox2 } from '../components/RedBox';
import Header from '../components/header';
import Fraction from '../components/Fraction';
import KnifeSelector from '../components/knifeselector';
import DecimalBox from '../components/DecimalBox';
import { sounds } from '../utils/sound';

interface ThirdScreenProps {
  sendAdminMessage: (role: string, content: string) => void;
}

const ThirdScreen: React.FC<ThirdScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.state3
  const {numerator, denominator} = gameStateRef.current.question.question5

  return (
    <div className="flex flex-col mb-10 h-full w-full">
      <Header 
        title={
          <>
            Convert 
            <span className='bg-white px-2 text-lg py-1 rounded-md'>
              <Fraction numerator={numerator} denominator={denominator} />
            </span>
            to decimal
          </>
        }
        level='Level 3'
        leftBox={step < 2 ? 'STEP 1' : 'STEP 2'}
        rightBox={step < 2 ? <>
          CREATE 
          <span className='bg-white px-2 ml-2 rounded-md'>
            <Fraction numerator={numerator} denominator={denominator} />
          </span>
        </> : <>
          Enter decimal
        </>}
      />
      {step < 2 ? <Part1 sendAdminMessage={sendAdminMessage} /> : <Part2 sendAdminMessage={sendAdminMessage} />}
    </div>
  )
}


const Part1: React.FC <ThirdScreenProps> = ({sendAdminMessage}) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.state3
  const {numerator, denominator} = gameStateRef.current.question.question5

  const [selectedKnife, setSelectedKnife] = useState<number>(1)
  const [selectedPieces, setSelectedPieces] = useState<number>(0);
  const [chocolate, setChocolate] = useState<number>(1);
  const [wholechocolate, setWholechocolate] = useState<number>(0);

  const [allowadd, setAllowadd] = useState<boolean>(false)

  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `Let's practice more challenging problems now. Try creating ${numerator}/${denominator} of a chocolate"`);
      start.current = true;
    }
  }, []);


  const setStep = (value: number) => {
    setGameStateRef((prev) => ({
      ...prev,
      state3: {
        ...prev.state3,
        step: value
      }
    }))
  }

  useEffect(() => {
    if (selectedKnife*chocolate === denominator) {
      setStep(1)
      sendAdminMessage('agent', `Awesome, now select pieces to get ${numerator}/${denominator} of the chocolate. Feel free to use more than 1 chocolate`);
    }
  }, [selectedKnife])

  useEffect(() => {
    if (selectedPieces + wholechocolate * selectedKnife * chocolate === numerator) {
      setStep(2)
    }
  }, [selectedPieces])

  const handleadd = () => {
    setWholechocolate(prev => prev + 1)
    setAllowadd(false)
    setSelectedPieces(0)
    sounds.break()
  }

  useEffect(() => {
    if (wholechocolate * selectedKnife + selectedPieces < numerator && selectedPieces === 100) {
      setAllowadd(true)
    } else {
      setAllowadd(false)
    }
  }, [selectedPieces])

  return (
      <div className="flex flex-col items-center max-w-screen-lg w-full mx-auto justify-center flex-1 gap-8">
        <div className='flex w-full justify-center'>
          
          <span className='flex flex-col justify-center h-full mx-16 w-1/6 text-center text-xl'>
            {Array.from({length: wholechocolate}, (_, index) => (
              <div 
                key={index}
              >
                <Bar2d
                  numerator={100}
                  denominator={100}
                  handlePieceClick={() => {}}
                  active={false}
              />
              </div>
            ))}
          </span>

          <span className='relative w-4/6 text-center text-xl'>
            <Bar2d
              numerator={selectedPieces}
              denominator={selectedKnife * chocolate}
              handlePieceClick={(index) => {
                setSelectedPieces(index)
                sounds.join()  
              }}
              active={step < 2}
            />
          </span>

          <span className='relative flex flex-col justify-center mx-10 w-1/6 text-center text-xl'>
              {step === 0 ?
                <KnifeSelector
                  options={[10, 100]}
                  selectedKnife={selectedKnife}
                  setSelectedKnife={setSelectedKnife}
                />
              :
                <div 
                  className={`m-2 bg-amber-800/50 rounded-md aspect-square flex font-extrabold text-5xl items-center justify-center hover:bg-amber-800/60 transition-all duration-100 ${!allowadd ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => { if (allowadd) handleadd(); }}
                >
                  +
                </div>
              }
          </span>

        </div>
        {step === 0 ?
          <div className="flex text-2xl items-center gap-4">
            <RedBox2>
              {chocolate * selectedPieces}
            </RedBox2>
              piece(s), but you need 100
          </div>
        :
          <div className="flex justify-center text-2xl font-bold items-center gap-4">
            <span className='border-2 border-[#fa787f] px-2 py-1 rounded-md'>
              <Fraction numerator={selectedPieces + wholechocolate * selectedKnife * chocolate} denominator={selectedKnife * chocolate} />
            </span>
          </div>
        }
      </div>
  );
};

const Part2: React.FC <ThirdScreenProps> = ({sendAdminMessage}) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.state3
  const {numerator, denominator} = gameStateRef.current.question.question5
  const wholechocolate = Math.floor(numerator / denominator)
  const [decimal, setDecimal] = useState<number>(0)

  const [wholes, setWholes] = useState<string>('')
  const [tenths, setTenths] = useState<string>('')
  const [hundredths, setHundredths] = useState<string>('')

  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `Awesome, now that we've created ${numerator}/${denominator}, try entering it in decimal form`)
      start.current = true;
    }
  }, []);

  useEffect(() => {
    if (parseInt(wholes) === Math.floor(numerator / denominator) && parseInt(tenths) === Math.floor((numerator % denominator) / 10) && parseInt(hundredths) === Math.floor((numerator % denominator) % 10)) {
      setGameStateRef((prev) => ({
        ...prev,
        state3: {
          ...prev.state3,
          step: 3
        }
      }))
    }
  }, [wholes, tenths, hundredths])


  return (
    <div className="flex flex-col items-center max-w-screen-lg w-full mx-auto justify-center flex-1 gap-8">
      <div className="flex gap-7">
          {Array.from({length: wholechocolate}, (_, index) => (
            <div 
              key={index}
            >
              <Bar2d
                numerator={100}
                denominator={100}
                handlePieceClick={() => {}}
                active={false}
            />
            </div>
          ))}
          <Bar2d
            numerator={numerator % denominator}
            denominator={100}
            handlePieceClick={() => {}}
            active={false}
          />
      </div>

      <div className="flex flex-col items-center gap-2 text-2xl">
        <div className="text-center mb-2">
          <span className="text-lg font-bold bg-[#FFE4B5] px-4 py-1">Decimal</span>
        </div>
        <div className="border-2 border-black p-4 bg-white">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold">Wholes</span>
              <input
                type="text"
                value={wholes}
                onChange={(e) => setWholes(e.target.value)}
                className="w-16 h-16 border-4 border-green-600 rounded-lg text-center text-2xl"
                maxLength={1}
              />
            </div>
            <span className="text-4xl mt-6">.</span>

            
            <div className='flex flex-col items-center'>
              <span className="text-sm font-bold">Tenths</span>
              <input 
                type="text"
                value={tenths}
                onChange={(e) => setTenths(e.target.value)}
                className="w-16 h-16 border-4 border-pink-400 rounded-lg text-center text-2xl"
                maxLength={1}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold">Hundredths</span>
              <input
                type="text"
                value={hundredths}
                onChange={(e) => setHundredths(e.target.value)}
                className="w-16 h-16 border-4 border-pink-400 rounded-lg text-center text-2xl"
                maxLength={2}
              />
            </div>
          </div>
        </div>
      </div>
      {
        step === 3 && (
            <Proceed 
              onComplete={() => setGameStateRef((prev) => ({
                ...prev,
                screen: 'fourth'
              }))}
              text='onwards'
            />
        )
      }
    </div>
  )
}

export default ThirdScreen; 