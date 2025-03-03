import { BaseProps } from "../utils/types";
import { useGameState } from "../state-utils";
import { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import Bar from "../components/bar";
import Fraction from "../components/Fraction";
import Proceed from "../components/proceed";
import KnifeSelector from "../components/knifeselector";
import HoneySelector from "../components/honeyselctor";



export default function Level2({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {numerator1, denominator1, denominator2, denominator3 } = gameStateRef.current.state2.question;  
  const { step, substep } = gameStateRef.current.state2;
  const [answer1, setAnswer1] = useState('');

  const [selectedPieces1, setSelectedPieces1] = useState(0);
  const [selectedPieces2, setSelectedPieces2] = useState(0);
  const [selectedKnife, setSelectedKnife] = useState<number | null>(null);
  const [selectedHoney, setSelectedHoney] = useState<number | null>(null);

  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `Alright, let's try finding another equivalent fraction for ${numerator1}/${denominator1}! This time, we need to divide the chocolate into ${denominator2} equal pieces.`);
      start.current = true;
    }
  }, []);

  const handlePieceClick = (index: number) => {
    setSelectedPieces1(index);
  };

  useEffect(() => {
    if(selectedKnife && selectedKnife*denominator1 === denominator2){
      setGameStateRef(prev => ({
        ...prev,
        state2: {
          ...prev.state2,
          step: {
            ...prev.state2.step,
            id: prev.state2.step.id + 1
          },
          substep: 1
        }
      }));
      // sendAdminMessage('agent', `Time for you to grab the same amount of chocolate again!`);
    } else if (selectedKnife) {
      sendAdminMessage('agent', `Hmm, right now, you've used the knife labeled ${selectedKnife}, and that gave us ${selectedKnife*denominator1} pieces, but we need ${denominator2} pieces. Can you figure out which knife will get us to ${denominator2}?`);
    }
  }, [selectedKnife]);

  useEffect(() => {
    if (!selectedHoney) return;
    console.log(denominator3,denominator1/selectedHoney)
    if(denominator1/selectedHoney === denominator3){
      setGameStateRef(prev => ({
        ...prev,
        state2: {
          ...prev.state2,
          substep: 3
        }
      }));
      console.log(selectedHoney, denominator1/selectedHoney, denominator3, substep)
      sendAdminMessage('agent', `Sweet! You picked the perfect amount of honey. Let's select pieces to grab the same amount of chocolate`);
    }
  }, [selectedHoney]);

  useEffect(() => {
    if(selectedPieces1 === denominator2/denominator1*numerator1){
      setGameStateRef({
        ...gameStateRef.current,
        state2: {
          ...gameStateRef.current.state2,
          substep: 2  
        }
      });
      sendAdminMessage('agent', `Great, let's try another one! This time, let's use honey to merge the chocolate into ${denominator3} pieces`);
    }
  }, [selectedPieces1]);

  useEffect(() => {
    if(selectedPieces2 === numerator1/denominator1*denominator3){
      setGameStateRef({
        ...gameStateRef.current,
        state2: {
          ...gameStateRef.current.state2,
          substep: 4  
        }
      });
      // sendAdminMessage('agent', `Awesome, you're now ready for the next level`);
    }
  }, [selectedPieces2]);

  return (
    <div className="w-full space-y-8 pb-12">
      <Header 
        numerator1={numerator1}
        denominator1={denominator1}
        denominator2={denominator2}
        step={{
          id: 3,
          text: "More Equivalent Fractions"
        }}
        level={2}
      />


      <div className="flex flex-col w-full max-w-screen-sm mx-auto items-center justify-center">
        <div className="flex flex-col gap-8 w-full  items-center justify-center">

          <p className="text-2xl text-left w-full mb-4">
          {substep === 0 && ("Use a knife to split the chocolate into the required number of pieces.")}
          </p>

          <div className="flex w-full relative items-center justify-center">
            <Bar 
              numerator={numerator1} 
              denominator={denominator1} 
              handlePieceClick={() => {}}
              disabled={true}
            />
            <div className="absolute top-0 left-full text-center text-2xl font-bold ml-6">
              <Fraction numerator={!numerator1 ? '?' : numerator1} denominator={denominator1} className="text-3xl bg-white p-2 h-full flex items-center" />
            </div>
          </div>


          <div className="flex w-full relative items-center justify-center">
            <Bar 
              numerator={selectedPieces1} 
              denominator={selectedKnife ? selectedKnife*denominator1  : denominator1}
              handlePieceClick={(index) => {
                setSelectedPieces1(index);
              }}
              disabled={substep !== 1}
            />
            {substep === 0 && (
              <div className="absolute top-0 right-full text-center text-2xl font-bold mx-6">
                <KnifeSelector 
                  options={[2,3,5]}
                selectedKnife={selectedKnife}
                setSelectedKnife={(index) => {
                  setSelectedKnife(index);
                }}
                />
              </div>      
            )}
              
            <div className="absolute top-0 left-full flex flex-col text-2xl font-bold ml-6">
              {substep > 0 &&
                <Fraction numerator={selectedPieces1 ? selectedPieces1 : ''} denominator={denominator2} className="text-3xl bg-white p-2 h-full flex items-center" />
              }
            </div>
          </div>

          {substep === 0 ? (
            <p className="text-2xl text-center w-full mb-4 mt-2">
              <span className="font-bold bg-white border-2 mr-2 border-orange-500 text-orange-500 px-2 py-1">
                {selectedKnife ? selectedKnife*denominator1 : denominator1}
              </span>
              pieces, but you need {denominator2} pieces.
            </p>
          ) : substep === 1 ?  (
            <p className="text-2xl text-left w-full mb-4">
              Select pieces to get the same amount of chocolate!            
            </p>
          ) : (
            <div className="flex font-medium gap-4 flex-col text-center items-center justify-center">
                <h2 className="text-2xl font-bold">
                  Great, lets try another one!
                </h2>
                <p className="text-2xl text-center w-full mb-4">

                  This time, let's use honey to merge the chocolate into the required number of pieces.

                </p>
            </div>
          )}
        </div>
      </div>


      {substep >= 2 && (
        <div className="flex flex-col max-w-screen-sm mx-auto items-center justify-center">
          <div className="flex w-full items-center justify-center relative">
            <Bar 
              numerator={selectedPieces2} 
              denominator={selectedHoney ? denominator1/selectedHoney : denominator1} 
              handlePieceClick={(index) => {
                setSelectedPieces2(index);
              }}
              disabled={substep === 2}
            />
            <div className="absolute top-0 left-full text-center text-2xl font-bold ml-6">
              {substep > 2 &&
                <Fraction numerator={selectedPieces2} denominator={denominator3} />
              }
            </div>

            <div className="absolute top-0 right-full text-center text-2xl mx-4 font-bold ml-6">
              {substep === 2 && (
                <HoneySelector 
                  options={[2,3,6]}
                  selectedHoney={selectedHoney}
                  setSelectedHoney={(index) => {
                    setSelectedHoney(index);
                  }}
                />
              )}
            </div>

          </div>

          {substep === 2 ?(
            <p className="text-2xl text-center w-full my-4">
              <span className="font-bold bg-white border-2 mr-2 border-orange-500 text-orange-500 px-2 py-1">
                {selectedHoney ? denominator1/selectedHoney : denominator1}
              </span>
              pieces, but you need {denominator3} pieces.
            </p>
          ) : (
            <p className="text-2xl text-left w-full mb-4 mt-4">
              Select pieces to get the same amount of chocolate!
            </p>
          )}

          {substep === 4 && (
            <Proceed onComplete={() => {
              setGameStateRef({
                ...gameStateRef.current,
                screen: 3
              });
            }} />
          )}
          
        </div>
      )}
    </div>
  );
}