import { Button } from "@/components/ui/button";
import { GameProps } from "../utils/types";
import { useEffect, useState, useRef } from "react";
import { COLORS } from "../screen/constants";

interface ChooseHolderProps extends GameProps {
  answer: number;
  denomOptions: number[];
  onSuccess: () => void;
}

export const ChooseHolder = ({ answer, denomOptions, onSuccess, sendAdminMessage }: ChooseHolderProps) => {
  const hasGameStarted = useRef(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDenomOptionClick = (option: number) => {
    setIsDisabled(true);
    
    if (option === answer) {
      hasGameStarted.current = false;
      onSuccess();
      // sendAdminMessage('agent', `Awesome! The denominator is ${answer}, so this holder is perfect. Let's move on!`);
      // setTimeout(() => {
      //   onSuccess();
      // }, 7000);
    } else {
      sendAdminMessage('admin', `Guide user socratically, user has selected ${option} but the answer is ${answer}. Ask questions of the form: "Not quite! Which holder would contain exactly 1 group of ${answer}?"`);
    }

    setTimeout(() => {
      setIsDisabled(false);
    }, 8000);
  };
  
  // If the kid selects the holder with 3 divisions:
  // "Close, but not quite! The denominator tells us there should be 4 equal divisions. Try again!"
  // If the kid selects the holder with 5 divisions:
  // "Oops! This one has too many divisions. The denominator is 4! Pick the right one!"
  // If the kid clicks randomly or doesn't choose:
  // "Remember, the denominator is 4. Look for the holder with exactly 4 slots!"


  // useEffect(() => {
  //   if (!hasGameStarted.current) {
  //     setTimeout(() => {
  //       sendAdminMessage('agent', "A hint: Look at the denominator");
  //     }, 5000);
  //     hasGameStarted.current = true;
  //   }
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-4 space-y-2">
      <div className="flex justify-center space-x-16">
        {denomOptions.map((option, index) => (
          <Button 
            key={index} 
            className="px-8 py-4 text-3xl rounded-none transition-colors duration-300 shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)]"
            style={{
              backgroundColor: COLORS.pink,
            }}
            onClick={() => handleDenomOptionClick(option)}
            disabled={isDisabled}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}