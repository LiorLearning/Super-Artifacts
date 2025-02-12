import { useState } from "react";

interface DropDownProps {
  options: string[];
  selected: string;
  onSelect: (selected: string) => void;
  showDropDown: boolean;
  correctValue: string;
  onCorrect?: () => void;
  onIncorrect?: (current: string) => void;
}

export default function DropDown({ 
  options, 
  selected, 
  onSelect, 
  showDropDown, 
  correctValue,
  onCorrect,
  onIncorrect 
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
    if (value === correctValue) {
      setIsCorrect(true);
      onCorrect?.();
    } else {
      setIsCorrect(false);
      onIncorrect?.(value);
    }
  };

  return (
    <div className="relative">
      <button
        className={`flex flex-col items-center justify-center bg-white border-4 px-2 leading-none -z-10
          ${isCorrect === true ? 'border-green-500 bg-green-50' : 
            isCorrect === false ? 'border-red-500 bg-red-50' : 
            'border-[#b9550b]'}`}
        onClick={() => { 
          showDropDown && setIsOpen((prev) => !prev);
        }}
      >
        <div className="p-2">{selected}</div>
        <div className='absolute bottom-1.5 right-1.5 w-0 h-0 border-t-[10px] border-t-transparent border-b-transparent border-r-[10px] border-[#402C1DFF]'/>
      </button>
      {isOpen && (
        <div className="absolute w-full bg-white border-[#b9550b] leading-none z-10">
          {options.map((option) => (
            <div
              key={option}
              className="flex flex-col items-center cursor-pointer justify-center content-strech border-l-4 border-b-4 border-r-4 bg-white border-[#b9550b] p-2 leading-none hover:bg-[#fff0e5]"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
