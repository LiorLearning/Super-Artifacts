import { Button } from "@/components/ui/button";
import { GameProps } from "../utils/types";

interface ChooseHolderProps extends GameProps {
  answer: number;
  denomOptions: number[];
  onSuccess: () => void;
}

export const ChooseHolder = ({ answer, denomOptions, onSuccess, sendAdminMessage }: ChooseHolderProps) => {
  const handleDenomOptionClick = (option: number) => {
    if (option === answer) {
      onSuccess();
    } else {
      sendAdminMessage('admin', "Diagnosis socratically and ask user to select the correct holder");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center mt-4 space-y-2">
      <div className="flex justify-center space-x-4">
        {denomOptions.map((option, index) => (
          <Button 
            key={index} 
            className="bg-blue-500 text-white px-4 py-2 text-xl rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md"
            onClick={() => handleDenomOptionClick(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}