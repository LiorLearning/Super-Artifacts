import { Triangle } from 'lucide-react';

export default function Proceed({ onComplete }: { onComplete: () => void }) {
  return (
    <div className='flex flex-col items-center mt-12 justify-center'>
      <p className='text-5xl font-bold text-green-600' >
        Correct Answer
    </p>
    <button 
    onClick={onComplete}
    className='flex justify-center items-center font-bold py-4 px-8 text-6xl bg-transparent shadow-none text-black mx-auto'
    >
    PROCEED
    <Triangle 
      size={36}
      className='text-green-600 fill-green-600 rotate-90' 
    />
    </button>
  </div>
  )
}