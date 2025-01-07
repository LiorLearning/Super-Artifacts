import { Button } from "@/components/custom_ui/button";
import { GameScreen, GameState } from "../game-state";
import { goToStep } from "../utils/helper";

interface ProceedButtonProps {
  onClick: () => void;
}

const ProceedButton = ({ onClick }: ProceedButtonProps) => {
  return (
    <div className="flex flex-col items-center justify-center m-8 mb-16">
      <Button
        onClick={onClick}
        className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90"
      >
        PROCEED
      </Button>
    </div>
  )
}

export default ProceedButton;