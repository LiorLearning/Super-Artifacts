import { Button } from "@/components/custom_ui/button";

interface ProceedButtonProps {
  text?: string;
  onClick: () => void;
}

const ProceedButton = ({ text = 'PROCEED', onClick }: ProceedButtonProps) => {
  return (
    <div className="flex flex-col items-center justify-center m-8 mb-16">
      <Button
        onClick={onClick}
        className="bg-[#FF497C] text-white px-8 py-2 text-2xl font-bold border-2 border-black hover:bg-[#FF497C]/90 shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none"
      >
        {text}
      </Button>
    </div>
  )
}

export default ProceedButton;