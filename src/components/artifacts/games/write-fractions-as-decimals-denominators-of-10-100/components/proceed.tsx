import React from 'react';
import { sounds } from '../utils/sound';
import { Button } from '@/components/custom_ui/button';

interface ProceedProps {
  onComplete: () => void;
  text: string;
}

const Proceed: React.FC<ProceedProps> = ({ onComplete, text="Onward" }) => {
  return (
    <Button
      onClick={() => {
        sounds.levelUp();
        onComplete();
      }}

      className="bg-[#ff3971] text-white text-xl rounded-none px-4 py-2 shadow-[-5px_5px_0px_rgba(0,0,0,1)]"
    >
      {text}
    </Button>
  );
};

export default Proceed; 