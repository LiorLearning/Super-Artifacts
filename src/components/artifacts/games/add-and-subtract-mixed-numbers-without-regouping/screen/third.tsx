import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { Button } from '@/components/ui/button';
import { MixedFractionProps } from '../utils/types';
import React, { useState, useEffect, useRef } from 'react';

export default function ThirdScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction1, fraction2 } = gameStateRef.current.state3;
  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage("agent","Keep the pizzas in your mind when you solve this new challenge. Wholes to the left and fractions to the right. Fill the boxes carefully!");
    }
    start.current = true;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Header fraction1={fraction1} fraction2={fraction2} version={1} type='addition' />
      <CombineFractionInput fraction1={fraction1} fraction2={fraction2} onComplete={() => setGameStateRef(prev => ({...prev, state3: {...prev.state3, step: 1}}))} sendAdminMessage={sendAdminMessage} />
      {step === 1 ?
        <Button 
          onClick={() => setGameStateRef(prev => ({...prev, screen: 4}))} 
          className='m-2 p-6 mx-auto bg-[#F97315] border-2 text-3xl border-black text-white shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#F97315] max-w-3xl rounded-none'>
          Next
          </Button>
      : null}
    </div>
  );
}




const CombineFractionInput = ({ onComplete, fraction1, fraction2, sendAdminMessage }: { onComplete: () => void, fraction1: MixedFractionProps, fraction2: MixedFractionProps, sendAdminMessage: (role: string, content: string) => void }) => {
  const [whole1, setWhole1] = useState<string>('');
  const [whole2, setWhole2] = useState<string>('');
  const [whole3, setWhole3] = useState<string>('');

  const [numerator1, setNumerator1] = useState<string>('');
  const [numerator2, setNumerator2] = useState<string>('');
  const [numerator3, setNumerator3] = useState<string>('');

  const [denominator1, setDenominator1] = useState<string>('');
  const [denominator2, setDenominator2] = useState<string>('');
  const [denominator3, setDenominator3] = useState<string>('');

  const [second, setSecond] = useState<number>(0);

  const handleWholeChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhole1(e.target.value);
    checkfirst(e.target.value,whole2,numerator1,numerator2,denominator1,denominator2)
    if(whole1 === '' && parseInt(e.target.value) !== fraction1.whole) {
      sendAdminMessage("agent","Try again! Try imagining the pizzas again, how many wholes and how many slices");
    }
  }

  const handleWholeChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhole2(e.target.value);
    checkfirst(whole1,e.target.value,numerator1,numerator2,denominator1,denominator2)
    if(whole2 === '' && parseInt(e.target.value) !== fraction2.whole) {
      sendAdminMessage("agent","Try again! Try imagining the pizzas again, how many wholes and how many slices");
    }
  }

  const handleNumeratorChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumerator1(e.target.value);
    checkfirst(whole1,whole2,e.target.value,numerator2,denominator1,denominator2)
    if(numerator1 === '' && parseInt(e.target.value) !== fraction1.numerator) {
      sendAdminMessage("agent","Try again! Try imagining the pizzas again, how many wholes and how many slices");
    }
  }

  const handleNumeratorChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumerator2(e.target.value);
    checkfirst(whole1,whole2,numerator1,e.target.value,denominator1,denominator2)
    if(numerator2 === '' && parseInt(e.target.value) !== fraction2.numerator) {
      sendAdminMessage("agent","Try again! Try imagining the pizzas again, how many wholes and how many slices");
    }
    setNumerator2(e.target.value);
    checkfirst(whole1,whole2,numerator1,e.target.value,denominator1,denominator2)
  }

  const handleDenominatorChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDenominator1(e.target.value);
    checkfirst(whole1,whole2,numerator1,numerator2,e.target.value,denominator2)
    if(denominator1 === '' && parseInt(e.target.value) !== fraction1.denominator) {
      sendAdminMessage("agent","Try again! Try imagining the pizzas again, how many wholes and how many slices");
    }
  }

  const handleDenominatorChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDenominator2(e.target.value);
    checkfirst(whole1,whole2,numerator1,numerator2,denominator1,e.target.value)
    if(denominator2 === '' && parseInt(e.target.value) !== fraction2.denominator) {
      sendAdminMessage("agent","Try again! Try imagining the pizzas again, how many wholes and how many slices");
    }
  }

  const checkfirst = (whole1: string, whole2: string, numerator1: string, numerator2: string, denominator1: string, denominator2: string) => {
    if (
      parseInt(whole1)===fraction1.whole && 
      parseInt(whole2)===fraction2.whole && 
      parseInt(numerator1)===fraction1.numerator && 
      parseInt(numerator2)===fraction2.numerator && 
      parseInt(denominator1)===fraction1.denominator && 
      parseInt(denominator2)===fraction2.denominator
    ) {
      setSecond(1);
      sendAdminMessage("agent","Good job! Now write this as mixed fraction and we're good to go to next question");
    }
  }

  const handleWholeChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhole3(e.target.value);
    checksecond(e.target.value,numerator3,denominator3)
    if(whole3 === '' && parseInt(e.target.value) !== (fraction1.whole+fraction2.whole)) {
      sendAdminMessage("agent","It Seems like you made a mistake in adding. You can always go back to the pizzas analogy");
    }
  }

  const handleNumeratorChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumerator3(e.target.value);
    checksecond(whole3,e.target.value,denominator3)
    if(numerator3 === '' && parseInt(e.target.value) !== (fraction1.numerator+fraction2.numerator)) {
      sendAdminMessage("agent","It Seems like you made a mistake in adding. You can always go back to the pizzas analogy");
    }
  }

  const handleDenominatorChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDenominator3(e.target.value);
    checksecond(whole3,numerator3,e.target.value)
    if(denominator3 === '' && parseInt(e.target.value) !== fraction2.denominator) {
      sendAdminMessage("agent","It Seems like you made a mistake in adding. You can always go back to the pizzas analogy");
    }
  }


  const checksecond = (whole3: string, numerator3: string, denominator3: string) => {
    console.log(whole3, numerator3, denominator3)
    console.log(fraction1.whole + fraction2.whole, fraction1.numerator + fraction2.numerator, fraction1.denominator)
    if (
      parseInt(whole3) === (fraction1.whole + fraction2.whole) && 
      parseInt(numerator3) === (fraction1.numerator + fraction2.numerator) && 
      parseInt(denominator3) === fraction1.denominator
    ) {
      sendAdminMessage('agent', "Wow, you are almost a master! There's one last challenge before you become a complete master!");
      onComplete();
    }
  }

  useEffect(() => {
    if (numerator1 !== '' && denominator1 !== '' && numerator2 !== '' && denominator2 !== ''){
    }
  }, [whole1, whole2, numerator1, numerator2, denominator1, denominator2])

  return (
    <div className='w-full bg-green-50 flex py-20 flex-col justify-center items-center'>
      <div className="flex flex-col gap-8 items-center">
        <p className='text-2xl font-bold'>
          Rearrange to add the portions
        </p>

        <div className="flex gap-8 items-center">
          <div className="flex flex-col gap-2">
            <div className="border-4 shadow-[-2px_2px_0px_rgba(0,150,0,1)] border-green-600 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={whole1}
                  onChange={handleWholeChange1}
                  min={0}
                  max={10}
                  placeholder="?"
                  className={`w-12 h-24 outline-none text-center text-2xl font-bold border-2 border-green-600 rounded ${whole1!=='' ? ( parseInt(whole1)===fraction1.whole ? 'bg-green-200' : 'bg-red-200') : ''}`}
                />
                <span className="text-2xl font-bold">+</span>
                <input
                  type="text"
                  value={whole2}
                  onChange={handleWholeChange2}
                  min={0}
                  max={10}
                  placeholder="?"
                  className={`w-12 h-24 outline-none text-center text-2xl font-bold border-2 border-green-600 rounded ${whole2!=='' ? ( parseInt(whole2)===fraction2.whole ? 'bg-green-200' : 'bg-red-200') : ''}`}
                />
              </div>
            </div>
            <p 
              className='text-2xl font-bold text-center'
            >
              Wholes
            </p>
          </div>

          <span className="text-2xl font-bold">+</span>

          <div className='flex flex-col gap-2'>         
            <div className="border-4 shadow-[-2px_2px_0px_rgba(150,0,0,1)] border-purple-600 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={numerator1}
                    onChange={handleNumeratorChange1}
                    min={0}
                    max={10}
                    placeholder="?"
                    className={`w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded ${numerator1!=='' ? ( parseInt(numerator1)===fraction1.numerator ? 'bg-green-200' : 'bg-red-200') : ''}`}
                  />
                  <div className="w-full my-1 h-[2px] bg-purple-600" />
                  <input
                    type="text"
                    value={denominator1}
                    onChange={handleDenominatorChange1}
                    min={0}
                    max={10}
                    placeholder="?"
                    className={`w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded ${denominator1!=='' ? ( parseInt(denominator1)===fraction1.denominator ? 'bg-green-200' : 'bg-red-200') : ''}`}
                  />
                </div>
                <span className="text-2xl font-bold">+</span>
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={numerator2}
                    onChange={handleNumeratorChange2}
                    min={0}
                    max={10}
                    placeholder="?"
                    className={`w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded ${numerator2!=='' ? ( parseInt(numerator2)===fraction2.numerator ? 'bg-green-200' : 'bg-red-200') : ''}`}
                  />
                  <div className="w-full my-1 h-[2px] bg-purple-600" />
                  <input
                    type="text"
                    value={denominator2}
                    onChange={handleDenominatorChange2}
                    min={0}
                    max={10}
                    placeholder="?"
                    className={`w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded ${denominator2!=='' ? ( parseInt(denominator2)===fraction2.denominator ? 'bg-green-200' : 'bg-red-200') : ''}`}
                  />
                </div>
              </div>
            </div>
            <p 
              className='text-2xl font-bold text-center'
            >
              Fractions
            </p>
          </div>
        </div>

        {(numerator1 !== '' && denominator1 !== '' && numerator2 !== '' && denominator2 !== '') && (
          <>
            <hr className='w-full border-1 border-black' />

            <p className="text-2xl font-bold text-green-600">Write in mixed form</p>
            <div className='flex flex-col gap-2'>
              <div className="flex items-center gap-8">
                <input
                  type="text"
                  value={whole3}
                  onChange={handleWholeChange3}
                  min={0}
                  max={10}
                  placeholder="?"
                  className={`w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-green-600 rounded ${whole3!=='' ? ( parseInt(whole3)===(fraction1.whole + fraction2.whole) ? 'bg-green-200' : 'bg-red-200') : ''}`}
                />
                
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={numerator3}
                    onChange={handleNumeratorChange3}
                    min={0}
                    max={10}
                    placeholder="?"
                    className={`w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded ${numerator3!=='' ? ( parseInt(numerator3)===(fraction1.numerator + fraction2.numerator) ? 'bg-green-200' : 'bg-red-200') : ''}`}
                  />
                  <div className="w-full my-1 h-[2px] bg-purple-600" />
                  <input
                    type="text"
                    value={denominator3}
                    onChange={handleDenominatorChange3}
                    min={0}
                    max={10}
                    placeholder="?"
                    className={`w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded ${denominator3!=='' ? ( parseInt(denominator3)===fraction1.denominator ? 'bg-green-200' : 'bg-red-200') : ''}`}
                  />
                </div>
              </div>
              <span className='flex text-sm font-bold justify-between'>
                <p>Whole</p>
                <p>Fraction</p>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}