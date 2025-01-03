interface ChocolateBarProps {
  pieces: number;
  filledPieces?: number;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

export const ChocolateBar = ({
  pieces,
  filledPieces = 0,
  selectable = false,
  selected = false,
  onSelect = () => { }
}: ChocolateBarProps) => (
  <div
    className={`flex -space-x-[1px] w-[480px] ${selectable ? 'cursor-pointer' : ''} ${selected ? 'ring-4 ring-blue-500' : ''}`}
    onClick={selectable ? onSelect : undefined}
  >
    {[...Array(pieces)].map((_, index) => (
      <div
        key={index}
        className={`h-20 relative border-2 border-[#5d4037] ${index < filledPieces ? 'bg-[#5d4037]' : 'bg-[#8d6e63]'}`}
        style={{ width: `${100 / pieces}%` }}
      >
        <div className="absolute inset-0 border-l-2 border-t-2 border-[#FFFFFF20]"></div>
        <div className="absolute inset-0 border-r-2 border-b-2 border-[#00000040]"></div>
      </div>
    ))}
  </div>
); 