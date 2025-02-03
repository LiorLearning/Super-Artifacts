import { Triangle } from 'lucide-react';
import { sounds } from '../utils/sounds';

interface ProceedProps {
  onComplete: () => void;
}

const Proceed: React.FC<ProceedProps> = ({ onComplete }) => {
  const handleClick = () => {
    sounds.button(); // Play button sound
    onComplete();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 m-8 mb-16">
      <h2 className="text-5xl font-bold text-[#18AF48]">
        Correct Answer
      </h2>
      
      <button
        onClick={handleClick}
        className="flex items-center gap-2 text-4xl font-bold px-12 py-4 text-black hover:opacity-90 transition-opacity"
      >
        PROCEED
        <span className="text-5xl" style={{ color: '#00C853' }}>
          <Triangle className='rotate-90 text-[#00C853] fill-[#00C853]' />
        </span>
      </button>
    </div>
  );
};

export default Proceed;