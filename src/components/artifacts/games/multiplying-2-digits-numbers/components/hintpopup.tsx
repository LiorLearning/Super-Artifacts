import { useEffect, useRef, useState } from "react";
import { NewInput } from "@/components/ui/newinput";
import { BaseProps } from "../utils/types";
import { narrations } from "../narrations";
import { formatMessage } from "./commonFunctions";

interface HintPopupProps extends BaseProps {
  number: number;
  setHintPopup: (value: boolean) => void;
}

export default function HintPopup({ number, setHintPopup, sendAdminMessage }: HintPopupProps) {
  const [tensInput, setTensInput] = useState("");
  const [onesInput, setOnesInput] = useState("");
  const [showOnesQuestion, setShowOnesQuestion] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [tensBounce, setTensBounce] = useState(false);
  const [onesBounce, setOnesBounce] = useState(false);
  const onesRef = useRef<HTMLInputElement>(null);

  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      if(narrations.Screen2Step0Message6.send) {
        sendAdminMessage(narrations.Screen2Step0Message6.role, formatMessage(narrations.Screen2Step0Message6.content, { number }));
      }
      setTensBounce(true);
    }
  }, []);


  // Calculate the correct values
  const tensValue = Math.floor(number / 10).toString();
  const onesValue = (number % 10).toString();

  // Handle correct answers
  const handleTensCorrect = () => {
    setShowOnesQuestion(true);
    if(onesInput === onesValue) {
      setShowContinueButton(true);
    }
    onesRef.current?.focus();
    if(narrations.Screen2Step0Message7.send) {
      sendAdminMessage(narrations.Screen2Step0Message7.role, formatMessage(narrations.Screen2Step0Message7.content, {}));
      setTimeout(() => {
        setOnesBounce(true);
      }, 1000);
    }
  };
  
  const handleOnesCorrect = () => {
    setTensBounce(false);
    setOnesBounce(false);
    if(tensInput === tensValue) {
      setShowContinueButton(true);
    }
    if(narrations.Screen2Step0Message8.send) {
      sendAdminMessage(narrations.Screen2Step0Message8.role, formatMessage(narrations.Screen2Step0Message8.content, { number }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center right-0 ml-[25.5%] w-[75%]">
        <div className="z-50 flex flex-col items-center justify-center gap-[3vh] content-center px-[2vw] py-[2vh] bg-white border-[1.5vh] border-[#007179] rounded-[5vh]">
          <div className="flex items-center justify-center gap-[2vh]">
            <div className="text-[4vh]">{number}</div>
            <div className="text-[3vh]">=</div>
            <div className={`flex flex-col items-center justify-center gap-[2vh]`}>
              <div className="flex flex-wrap gap-[1vh] w-[24vh]">
                {Array(Math.floor(number / 10)).fill(0).map((_, i) => (
                  <span key={i} className="bg-[#ffa500] rounded-[1vh] w-full h-[4vh] shadow-[0.2vh_0.2vh_0_0_#393f3f] flex items-center justify-center text-[3vh] leading-none text-white">10</span>
                ))}
              </div>
              <div className={`flex items-center justify-center text-[3vh]`}>
                <NewInput
                  className={`border-2 border-black rounded-[1vh] w-[5vh] h-[5vh] flex items-center justify-center mr-[1vh] text-center ${tensBounce ? 'animate-[bounce_0.5s_ease-in-out_infinite]' : ''}`}
                  value={tensInput}
                  onValueChange={(value) => {
                    setTensInput(value);
                    setTensBounce(false);
                  }}
                  correctValue={tensValue}
                  onCorrect={handleTensCorrect}
                  useColor={true}
                  placeholder='?'
                /> tens
              </div>
            </div>
            <div className="text-[3vh]">+</div>
            <div className={`flex flex-col items-center justify-center gap-[2vh]`}>
              <div className="flex flex-wrap gap-[1vh] w-[20vh]">
                {Array(number % 10).fill(0).map((_, i) => (
                  <span key={i} className="bg-[#5cdbec] rounded-[1vh] w-[4vh] h-[4vh] shadow-[0.2vh_0.2vh_0_0_#393f3f] flex items-center justify-center text-[2.6vh] leading-none text-white">1 </span>
                ))}
              </div>
              <div className={`flex items-center justify-center text-[3vh]`}>
                <NewInput
                  className={`border-2 border-black rounded-[1vh] w-[5vh] h-[5vh] flex items-center justify-center mr-[1vh] text-center ${onesBounce ? 'animate-[bounce_0.5s_ease-in-out_infinite]' : ''}`}
                  value={onesInput}
                  onValueChange={setOnesInput}
                  correctValue={onesValue}
                  onCorrect={handleOnesCorrect}
                  useColor={true}
                  placeholder='?'
                  ref={onesRef}
                /> ones
              </div>
            </div>
          </div>

          {!showContinueButton ? <div className="text-[3vh]">
            {showOnesQuestion ? 'Now, how many ones does ' + number + ' have?' : 'How many 10s does ' + number + ' have?'}
          </div> : <div className="text-[3vh]">
            Therefore, {number} = {tensValue} x 10 + {onesValue} x 1
          </div>}

          <button className={`mt-[1vh] text-white text-[2.5vh] py-[1vh] px-[3vh] rounded-[6vh] shadow-[0.2vh_0.2vh_0_0_#393f3f] transition-all duration-500 ${ showContinueButton ? 'opacity-100 bg-[#007179]' : 'opacity-20 bg-[#007179]'}`}
            onClick={() => {showContinueButton ? setHintPopup(false) : undefined}}>
            {'CONTINUE >>'}
          </button>
                  
        </div>
      </div>
  )
}