import { BaseProps } from "../../utils/types";
import { images } from "../../utils/image";
import { useGameState } from "../../state-utils";
import { useEffect, useRef, useState } from "react";
import { NewInput } from "@/components/ui/newinput";
import { goToScreen } from "../../utils/helper";
import SuccessAnimation from "@/components/artifacts/utils/success-animate";
import { sounds } from "../../utils/sound";


export default function SeventhScreen({ sendAdminMessage }: BaseProps) {

  const { gameStateRef, setGameStateRef } = useGameState();
  const number1 = gameStateRef.current.state7.number1;
  const number2 = gameStateRef.current.state7.number2;

  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');
  const [ans5, setAns5] = useState('');

  const [blurAns2, setBlurAns2] = useState(true);
  const [blurAns3, setBlurAns3] = useState(true);
  const [blurAns4, setBlurAns4] = useState(true);
  const [blurAns5, setBlurAns5] = useState(true);
  
  const [hint1, setHint1] = useState(false);
  const [hint2, setHint2] = useState(false);
  const [hint3, setHint3] = useState(false);
  const [hint4, setHint4] = useState(false);
  
  const [showSuccess, setShowSuccess] = useState(false);
  
  const ans1Ref = useRef<HTMLInputElement>(null);
  const ans2Ref = useRef<HTMLInputElement>(null);
  const ans3Ref = useRef<HTMLInputElement>(null);
  const ans4Ref = useRef<HTMLInputElement>(null);
  const ans5Ref = useRef<HTMLInputElement>(null);

  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', `${number1} × ${number2} can be broken into (${Math.floor(number1 / 10) * 10} + ${number1 % 10}) × (${Math.floor(number2 / 10) * 10} + ${number2 % 10}). Can you complete the partial products?`);
      ans1Ref.current?.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#B9F7FF] overflow-hidden flex flex-col items-center justify-end">
      <div className="absolute w-full h-[25vh] "
        style={{ backgroundImage: `url(${images.grass})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className="flex flex-col items-center gap-[2vh] justify-center min-h-screen drop-shadow-xl">
        <div className={`flex items-center justify-center leading-none text-center bg-white text-[4vh]`}>
          <h1 className="p-[1.5vh] text-center w-[7vh]">{Math.floor(number1 / 10)}</h1>
          <h1 className="p-[1.5vh] text-center w-[7vh]">{number1 % 10}</h1>
        </div>

        <div className={`flex items-center justify-center leading-none text-cente text-[4vh]`}>
          <h1 className="p-[1.5vh] px-[3vh]">x</h1>
          <h1 className="p-[1.5vh] text-center w-[7vh] bg-white">{number2.toString()[0]}</h1>
          <h1 className="p-[1.5vh] text-center w-[7vh] bg-white mr-[8vh]">{number2.toString()[1]}</h1>
        </div>

        <div className="px-[15vh] h-0 border-t-[0.3vh] border-black"></div>

        <div className="flex items-center justify-center gap-[1vh] ml-[17vh] leading-none text-center bg-white text-[4vh] p-[0.8vh]">
          <NewInput
            value={ans1}
            correctValue={((number2 % 10) * (number1 % 10)).toString()}
            onValueChange={(value) => setAns1(value)}
            placeholder="?"
            className="w-[14vh] text-white placeholder:text-white border-none outline-none p-[0.7vh] text-center text-[4vh] bg-[#0095b7]"
            ref={ans1Ref}
            onCorrect={() => { setBlurAns2(false); ans2Ref.current?.focus(); sounds.right(); }}
            onIncorrect={(attempt, correct) => {
              sounds.wronginput();
              sendAdminMessage('admin', `User has entered ${attempt} which is wrong for ${number1 % 10} x ${number2 % 10}, the answer is ${correct}, diagnose socratically`);
            }}
          />
          {hint1 && 
            <div className={`flex items-center justify-center leading-none text-cente text-[4vh]`}>
              <h1 className="p-[0.7vh] text-center w-[7vh] bg-white">{number2 % 10}</h1>
              <h1 className="">x</h1>
              <h1 className="p-[0.7vh] text-center w-[7vh] bg-white">{number1 % 10}</h1>
            </div>
          }
          {!hint1 && <button className="w-[10vh] py-[0.5vh] mx-[3vh] text-[3.5vh] bg-[#ffde73]" onClick={() => setHint1(true)}>HINT</button>}
        </div>

        <div className={`flex items-center justify-center gap-[2vh] ml-[13vh] transition-all duration-500 ${blurAns2 ? 'blur-[0.5vh]' : ''}`}>
          <div className="text-[4.5vh]">+</div>
          
          <div className="flex items-center justify-center gap-[1vh] leading-none text-center bg-white text-[4vh] p-[0.8vh]">
            <NewInput
              value={ans2}
              correctValue={((number2 % 10) * Math.floor(number1 / 10) * 10).toString()}
              onValueChange={(value) => setAns2(value)}
              placeholder="?"
              className="w-[14vh] text-white placeholder:text-white border-none outline-none p-[0.7vh] text-center text-[4vh] bg-[#c45500]"
              ref={ans2Ref}
              onCorrect={() => { setBlurAns3(false); ans3Ref.current?.focus(); sounds.right(); }}
              onIncorrect={(attempt, correct) => {
                sounds.wronginput();
                sendAdminMessage('admin', `User has entered ${attempt} which is wrong for ${Math.floor(number1 / 10) * 10} x ${number2 % 10}, the answer is ${correct}, diagnose socratically`);
              }}
            />
            {hint2 && 
              <div className={`flex items-center justify-center leading-none text-cente text-[4vh]`}>
                <h1 className="p-[0.7vh] text-center w-[7vh] bg-white">{number2 % 10}</h1>
                <h1 className="">x</h1>
                <h1 className="p-[0.7vh] text-center w-[7vh] bg-white">{Math.floor(number1 / 10) * 10}</h1>
              </div>
            }
            {!hint2 && <button className="w-[10vh] py-[0.5vh] mx-[3vh] text-[3.5vh] bg-[#ffde73]" onClick={() => setHint2(true)}>HINT</button>}
          </div>
        </div>

        <div className={`flex items-center justify-center gap-[2vh] ml-[13vh] transition-all duration-500 ${blurAns3 ? 'blur-[0.5vh]' : ''}`}>
          <div className="text-[4.5vh]">+</div>

          <div className="flex items-center justify-center gap-[1vh] leading-none text-center bg-white text-[4vh] p-[0.8vh]">
            <NewInput
              value={ans3}
              correctValue={((number1 % 10) * Math.floor(number2 / 10) * 10).toString()}
              onValueChange={(value) => setAns3(value)}
              placeholder="?"
              className="w-[14vh] text-white placeholder:text-white border-none outline-none p-[0.7vh] text-center text-[4vh] bg-[#d3cc3f]"
              ref={ans3Ref}
              onCorrect={() => { setBlurAns4(false); ans4Ref.current?.focus(); sounds.right(); }}
              onIncorrect={(attempt, correct) => {
                sounds.wronginput();
                sendAdminMessage('admin', `User has entered ${attempt} which is wrong for ${number1 % 10} x ${Math.floor(number2 / 10) * 10}, the answer is ${correct}, diagnose socratically`);
              }}
            />
            {hint3 && 
              <div className={`flex items-center justify-center leading-none text-cente text-[4vh]`}>
                <h1 className="p-[0.7vh] text-center w-[7vh] bg-white">{Math.floor(number2 / 10) * 10}</h1>
                <h1 className="">x</h1>
                <h1 className="p-[0.7vh] text-center w-[7vh] bg-white">{number1 % 10}</h1>
              </div>
            }
            {!hint3 && <button className="w-[10vh] py-[0.5vh] mx-[3vh] text-[3.5vh] bg-[#ffde73]" onClick={() => setHint3(true)}>HINT</button>}
          </div>
        </div>

        <div className={`flex items-center justify-center gap-[2vh] ml-[13vh] transition-all duration-500 ${blurAns4 ? 'blur-[0.5vh]' : ''}`}>
          <div className="text-[4.5vh]">+</div>

          <div className="flex items-center justify-center gap-[1vh] leading-none text-center bg-white text-[4vh] p-[0.8vh]">
            <NewInput
              value={ans4}
              correctValue={(Math.floor(number1 / 10) * 10 * Math.floor(number2 / 10) * 10).toString()}
              onValueChange={(value) => setAns4(value)}
              placeholder="?"
              className="w-[14vh] text-white placeholder:text-white border-none outline-none p-[0.7vh] text-center text-[4vh] bg-[#ba5cec]"
              ref={ans4Ref}
              onCorrect={() => { setBlurAns5(false); ans5Ref.current?.focus(); sounds.right(); }}
              onIncorrect={(attempt, correct) => {
                sounds.wronginput();
                sendAdminMessage('admin', `User has entered ${attempt} which is wrong for ${Math.floor(number1 / 10) * 10} x ${Math.floor(number2 / 10) * 10}, the answer is ${correct}, diagnose socratically`);
              }}
            />
            {hint4 && 
              <div className={`flex items-center justify-center leading-none text-cente text-[4vh]`}>
                <h1 className="p-[0.7vh] text-center w-[7vh] bg-white">{Math.floor(number2 / 10) * 10}</h1>
                <h1 className="">x</h1>
                <h1 className="p-[0.7vh] text-center w-[7vh] bg-white">{Math.floor(number1 / 10) * 10}</h1>
              </div>
            }
              {!hint4 && <button className="w-[10vh] py-[0.5vh] mx-[3vh] text-[3.5vh] bg-[#ffde73]" onClick={() => setHint4(true)}>HINT</button>}
          </div>
        </div>

        <div className="px-[15vh] h-0 border-t-[0.4vh] border-black"></div>

        <div className={`flex items-center justify-center gap-[2vh] leading-none text-center bg-white text-[4vh] p-[1vh] transition-all duration-500 ${blurAns5 ? 'blur-[0.5vh]' : ''}`}>
          <NewInput
            value={ans5}
            correctValue={(number1 * number2).toString()}
            onValueChange={(value) => setAns5(value)}
            placeholder="?"
            className="w-[14vh] text-white placeholder:text-white border-none outline-none p-[0.7vh] text-center text-[4vh] bg-[#5c9f00]"
            ref={ans5Ref}
            onCorrect={() => {
              setShowSuccess(true);
              sounds.right();
              sendAdminMessage('agent', `Excellent! You've mastered multiplying with partial products!`);
              sounds.complete();
              sounds.stopBgm();
            }}
            onIncorrect={(attempt, correct) => {
              sounds.wronginput();
              sendAdminMessage('admin', `User has entered wrong sum ${attempt}, the answer is ${correct}, the question is sum of all partial products for ${number1} x ${number2}, diagnose socratically`);
            }}
          />
        </div>
      </div>

      {showSuccess && <SuccessAnimation />}
    </div>
  );
}