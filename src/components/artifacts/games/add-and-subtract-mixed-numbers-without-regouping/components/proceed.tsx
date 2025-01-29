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
    <div className="flex flex-col items-center justify-center m-8 mb-16">
      <button
        onClick={handleClick}
        className="text-white px-8 py-2 text-2xl font-bold border-2 border-black shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none bg-pink-500 hover:bg-pink-600 transition-colors"
      >
        PROCEED
      </button>
    </div>
  );
};

export default Proceed;