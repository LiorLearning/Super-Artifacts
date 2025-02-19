import React, { useState, useEffect, useRef } from 'react';
import FractionBox from './FractionBox';
import DecimalBox from './DecimalBox';
import { sounds } from '../utils/sound';
import Proceed from '../components/proceed';

interface HintVisualProps {
  numerator: number;
  denominator: number;
  onClose: () => void;
  sendAdminMessage?: (role: string, message: string) => void;
  setGameStateRef: (updater: (prev: any) => any) => void;
}

export default function HintVisual({ numerator, denominator, onClose, sendAdminMessage, setGameStateRef }: HintVisualProps) {
  const [tenths, setTenths] = useState('');
  const [hundredths, setHundredths] = useState('');
  const [showProceed, setShowProceed] = useState(false);
  const chocolateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sendAdminMessage?.('agent', "Notice that one complete horizontal bar makes one tenth. How many complete tenths do you see in the chocolate?");
  }, []);

  const correctTenths = Math.floor(numerator / 10); 
  const correctHundredths = numerator % 10; 

  const handleTenthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTenths(value);
    
    if (value.length > 0 && parseInt(value) !== correctTenths) {
      sounds.join();
      sendAdminMessage?.('admin', `User answered incorrectly for the Tenths, correct answer is ${correctTenths}, but  user answered ${value}. Diagnose socratically. If User giving the wrong answer, Explain the correct answer in a way that helps them understand.`);
    } else if (value.length > 0 && parseInt(value) === correctTenths) {
      sounds.levelUp();
      sendAdminMessage?.('agent', "Awesome, now how many complete hundredths do you see?");
    }
  };

  const handleHundredthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (tenths !== String(correctTenths)) return;
    setHundredths(value);
    
    if (value.length > 0 && parseInt(value) !== correctHundredths) {
      sounds.join();
      sendAdminMessage?.('admin', `User answered incorrectly for the Hundredths, correct answer is ${correctHundredths}, but  user answered ${value}. Diagnose socratically. If User giving the wrong answer, Explain the correct answer in a way that helps them understand.`);
    } else if (value.length > 0 && parseInt(value) === correctHundredths) {
      sounds.levelUp();
      sendAdminMessage?.('agent', "Excellent! You've correctly converted the fraction to a decimal!");
      setShowProceed(true);
      setTimeout(() => {
        sendAdminMessage?.('agent', "Click on Onwards to continue to the next challenge!");
      }, 2500);
    }
  };

  const handleProceed = () => {
    onClose();
    sounds.levelUp();
    setGameStateRef(prev => ({
      ...prev,
      state2: {
        ...prev.state2,
        step: 7
      }
    }));
  };

  return (
    <div className='fixed inset-0 bg-white z-50 flex items-center justify-center'>
      <div className='absolute top-[50px] w-full max-w-[1000px] transform scale-110 px-8'>
        <div className="flex my-4 mx-auto w-[600px] relative -space-x-[3px] min-w-52">
          <div className="flex flex-col w-full -space-y-[3px] min-w-52">
            <div className="flex w-full -space-x-[3px]">
              {[...Array(10)].map((_, index) => (
                <div
                  key={`piece-${index}`}
                  className={`w-full h-[60px] relative border-[5px] border-[#906547] ${
                    index < numerator
                      ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                      : 'bg-gradient-to-br from-[#906547] to-[#785339]'
                  } flex items-center justify-center`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-white text-sm">1</span>
                    <div className="w-8 border-t border-white"></div>
                    <span className="text-white text-sm">100</span>
                  </div>
                  <div className="absolute inset-0 border-l-4 border-t-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#FFFFFF20]"></div>
                  <div className="absolute inset-0 border-r-4 border-b-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#00000040]"></div>
                </div>
              ))}
            </div>

            {[...Array(9)].map((_, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className="w-full h-[60px] relative border-[5px] border-[#906547] bg-gradient-to-br from-[#906547] to-[#785339] flex items-center justify-center"
              >
                <div className="flex flex-col items-center">
                  <span className="text-white text-sm">1</span>
                  <div className="w-6 border-t border-white"></div>
                  <span className="text-white text-sm">10</span>
                </div>
                <div className="absolute inset-0 border-l-4 border-t-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#FFFFFF20]"></div>
                <div className="absolute inset-0 border-r-4 border-b-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#00000040]"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full mt-8">
          <div className="w-1/2 bg-[#E8FFE9] flex items-center justify-center py-8">
            <FractionBox 
              numerator={String(numerator)}
              denominator="100"
              onChange={{
                numerator: () => {},
                denominator: () => {}
              }}
              correctnumerator={String(numerator)}
              correctdenominator="100"
            />
          </div>

          <div className="w-1/2 bg-[#FFF8E7] flex flex-col items-center py-8">
            <div className="text-center mb-2">
              <span className="text-lg bg-[#FFE4B5] px-4 py-1">Decimal</span>
            </div>
            <div className="border-2 border-black p-4 bg-white">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="text-sm">Wholes</span>
                  <input
                    type="text"
                    value="0"
                    className="w-16 h-16 border-4 border-green-600 rounded-lg text-center text-2xl bg-green-100"
                    disabled
                  />
                </div>
                <span className="text-4xl mb-6">.</span>
                <div className='flex flex-col items-center'>
                  <span className="text-sm">Tenths</span>
                  <input 
                    type="text"
                    value={tenths}
                    onChange={handleTenthsChange}
                    className={`w-16 h-16 border-4 border-pink-400 rounded-lg text-center text-2xl ${
                      tenths === String(correctTenths)
                        ? 'bg-green-100' 
                        : tenths.length > 0 ? 'bg-red-100' : 'bg-white'
                    }`}
                    maxLength={1}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm">Hundredths</span>
                  <input
                    type="text"
                    value={hundredths}
                    onChange={handleHundredthsChange}
                    className={`w-16 h-16 border-4 border-pink-400 rounded-lg text-center text-2xl ${
                      hundredths === String(correctHundredths)
                        ? 'bg-green-100' 
                        : hundredths.length > 0 ? 'bg-red-100' : 'bg-white'
                    }`}
                    maxLength={1}
                    disabled={tenths !== String(correctTenths)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {showProceed && (
          <div className="w-full flex justify-center py-12">
            <div className="transform scale-125">
              <Proceed 
                onComplete={handleProceed}
                text="Onward! 🚀"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 