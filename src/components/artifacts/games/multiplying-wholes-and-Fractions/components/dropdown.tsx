import { useState } from "react";

interface DropDownProps {
  options: string[];
  selected: string;
  onSelect: (selected: string) => void;
  showDropDown: boolean;
}

export default function DropDown({ options, selected, onSelect, showDropDown }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex flex-col items-center justify-center bg-white border-4 border-[#b9550b] px-2 leading-none -z-10"
        onClick={() => { 
          showDropDown && setIsOpen((prev) => !prev);
        }}
      >
        <div className="p-2 ">{selected}</div>
        <div className='absolute bottom-1.5 right-1.5 w-0 h-0 border-t-[10px] border-t-transparent  border-b-transparent border-r-[10px] border-[#402C1DFF]'/>
      </button>
      {isOpen && (
        <div className="absolute w-full bg-white border-[#b9550b] leading-none z-10">
          {options.map((option) => (
            <div
              key={option}
              className="flex flex-col items-center cursor-pointer justify-center content-strech border-l-4 border-b-4 border-r-4 bg-white border-[#b9550b] p-2 leading-none"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
