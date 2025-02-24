import { BaseProps } from "../../utils/types";
import { images } from "../../assets/image";
import { useGameState } from "../../state-utils";
import { useEffect, useRef, useState } from "react";
import { NewInput } from "@/components/ui/newinput";
import { goToScreen } from "../../utils/helper";
import SuccessAnimation from "@/components/artifacts/utils/success-animate";


export default function SixthScreen({ sendAdminMessage }: BaseProps) {

  const { gameStateRef, setGameStateRef } = useGameState();
  const number1 = gameStateRef.current.state6.number1;
  const number2 = gameStateRef.current.state6.number2;

  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');

  const [blurAns2, setBlurAns2] = useState(true);
  const [blurAns3, setBlurAns3] = useState(true);
  const [blurAns4, setBlurAns4] = useState(true);

  const [hint1, setHint1] = useState(false);
  const [hint2, setHint2] = useState(false);
  const [hint3, setHint3] = useState(false);

  const [showPopUp, setShowPopUp] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const ans1Ref = useRef<HTMLInputElement>(null);
  const ans2Ref = useRef<HTMLInputElement>(null);
  const ans3Ref = useRef<HTMLInputElement>(null);
  const ans4Ref = useRef<HTMLInputElement>(null);

  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      // sendAdminMessage('agent', `Let's practice multiplying 2-digit numbers by 1-digit numbers with partial products!`);
      ans1Ref.current?.focus();
    }
  }, []);

  return (
    <div className="min-h-screen overflow-hidden flex flex-col items-center gap-[2vh] justify-center" style={{ backgroundImage: `url(${images.practiceBg})`, backgroundSize: '100% 100%', backgroundPosition: 'center' }}>

      {showPopUp && <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center w-[74.5%]">
        <button className="bg-[#007179] mt-[3vh] border-[2vh] border-white text-white text-[5vh] py-[1vh] px-[7vh] rounded-[8vw]"
          onClick={() => { setShowPopUp(false); goToScreen('sixth', setGameStateRef); }}>
          {'NEXT >>'}
        </button>
      </div>}



      <div className={`flex items-center justify-center leading-none text-center bg-white text-[6vh]`}>
        <h1 className="p-[1.5vh] px-[3vh]">{number1.toString()[0]}</h1>
        <h1 className="p-[1.5vh] px-[3vh]">{number1.toString()[1]}</h1>
        <h1 className="p-[1.5vh] px-[3vh]">{number1.toString()[2]}</h1>
      </div>

      <div className={`flex items-center justify-center leading-none text-center  text-[6vh]`}>
        <h1 className="p-[1.5vh] px-[3vh] pl-[12vh]">x</h1>
        <h1 className="p-[1.5vh] px-[3vh] bg-white">{number2}</h1>
      </div>

      <div className="px-[15vh] h-0 border-t-[0.4vh] border-black"></div>

      <div className="flex items-center justify-center gap-[2vh] ml-[15.5vh] leading-none text-center bg-white text-[5vh] p-[1.5vh]">
        <NewInput
          value={ans1}
          correctValue={(Number(number1.toString()[2]) * number2).toString()}
          onValueChange={(value) => setAns1(value)}
          placeholder="?"
          className="w-[16vh] text-white placeholder:text-white border-none outline-none p-[1vh]   text-center text-[5vh] bg-[#c45500]"
          ref={ans1Ref}
          onCorrect={() => { setBlurAns2(false); ans2Ref.current?.focus(); }}
          onIncorrect={(attempt, correct) => {
            sendAdminMessage('agent', `User has entered ${attempt} which is wrong for ${(number1 % 10)} x ${number2}, the answer is ${correct}, the question is ${number1} x ${number2} partial product, diagnose socratically with respect to user's current game state`);
          }}
        />
        {hint1 && <><div className="pl-[5vh]">{number1 % 10}</div>
          <div>x</div>
          <div>{number2}</div></>}

        {!hint1 && <button className="px-[2vh] mx-[1vh] text-[4vh] bg-[#ffde73]" onClick={() => setHint1(true)}>HINT</button>}
      </div>


      <div className={`flex items-center justify-center gap-[2vh] ml-[15.5vh] leading-none text-center bg-white text-[5vh] p-[1.5vh] ${blurAns2 ? 'blur-[0.5vh]' : ''}`}>
        <NewInput
          value={ans2}
          correctValue={(Number(number1.toString()[1]) * 10 * number2).toString()}
          onValueChange={(value) => setAns2(value)}
          placeholder="?"
          className="w-[16vh] text-white placeholder:text-white border-none outline-none p-[1vh]   text-center text-[5vh] bg-[#0095b7]"
          ref={ans2Ref}
          onCorrect={() => { setBlurAns3(false); ans3Ref.current?.focus(); }}
          onIncorrect={(attempt, correct) => {
            sendAdminMessage('agent', `User has entered ${attempt} which is wrong for ${parseInt(number1.toString()[1]) * 10} x ${number2}, the answer is ${correct}, the question is ${number1} x ${number2} partial product, diagnose socratically with respect to user's current game state`);
          }}
        />
        {hint2 && <><div className="pl-[2.5vh]">{parseInt(number1.toString()[1]) * 10}</div>
          <div>x</div>
          <div>{number2}</div></>}

        {!hint2 && <button className="px-[2vh] mx-[1vh] text-[4vh] bg-[#ffde73]" onClick={() => setHint2(true)}>HINT</button>}
      </div>

      <div className={`flex items-center justify-center gap-[2vh] ml-[10vh] transition-all duration-500 ${blurAns3 ? 'blur-[0.5vh]' : ''}`}>
        <div className="text-[7vh]">+</div>

        <div className="flex items-center justify-center gap-[2vh] leading-none text-center bg-white text-[5vh] p-[1.5vh]">
          <NewInput
            value={ans3}
            correctValue={(parseInt(number1.toString()[0]) * 100 * number2).toString()}
            onValueChange={(value) => setAns3(value)}
            placeholder="?"
            className="w-[16vh] text-white placeholder:text-white border-none outline-none p-[1vh]   text-center text-[5vh] bg-[#b100c4]"
            ref={ans3Ref}
            onCorrect={() => { setBlurAns4(false); ans4Ref.current?.focus(); }}
            onIncorrect={(attempt, correct) => {
              sendAdminMessage('agent', `User has entered ${attempt} which is wrong for ${parseInt(number1.toString()[0]) * 100} x ${number2}, the answer is ${correct}, the question is ${number1} x ${number2} partial product, diagnose socratically with respect to user's current game state`);
            }}
          />
          {hint3 && <><div>{parseInt(number1.toString()[0]) * 100}</div>
            <div>x</div>
            <div>{number2}</div></>}

          {!hint3 && <button className="px-[2vh] mx-[1vh] text-[4vh] bg-[#ffde73]" onClick={() => setHint3(true)}>HINT</button>}
        </div>
      </div>

      <div className="px-[15vh] h-0 border-t-[0.4vh] border-black"></div>

      <div className={`flex items-center justify-center gap-[2vh] leading-none text-center bg-white text-[5vh] p-[1.5vh] transition-all duration-500 ${blurAns4 ? 'blur-[0.5vh]' : ''}`}>
        <NewInput
          value={ans4}
          correctValue={(number1 * number2).toString()}
          onValueChange={(value) => setAns4(value)}
          placeholder="?"
          className="w-[16vh] text-white placeholder:text-white border-none outline-none p-[1vh]   text-center text-[5vh] bg-[#5c9f00]"
          ref={ans4Ref}
          onCorrect={() => {
            setShowSuccess(true);
            // setTimeout(() => {
            //   setShowPopUp(true);
            // }, 4000);
          }}
          onIncorrect={(attempt, correct) => {
            sendAdminMessage('agent', `User has entered wrong sum ${attempt}, the answer is ${correct}, the question is sum after partial product  ${number1} x ${number2}, diagnose socratically with respect to user's current game state`);
          }}
        />
      </div>

      {showSuccess && <SuccessAnimation />}
    </div>
  );
}