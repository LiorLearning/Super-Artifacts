'use client';

interface BarProps {
  parts: number;
  subParts?: number;
  selectedParts: number[];
  handleClick?: (partIndex: number, subPartIndex: number) => void;
}

export function Bar({ 
  parts, 
  subParts = 1, 
  selectedParts, 
  handleClick
}: BarProps) {
  return (
    <div className="w-full relative flex items-center">
      <div className="w-full flex gap-1">
        {Array.from({ length: parts }).map((_, partIndex) => (
          <div key={partIndex} className="w-full relative">
            <div className={`
              relative w-full h-24
              rounded-2xl
              border-4 border-[#3A2218]
              overflow-hidden
            `}>
              <div className="w-full h-full flex gap-1">
                {Array.from({ length: subParts || 1 }).map((_, subPartIndex) => (
                  <div
                    key={subPartIndex}
                    onClick={() => handleClick?.(partIndex, subPartIndex)}
                    className={`
                      relative flex-1 h-full
                      ${selectedParts.includes(partIndex * (subParts || 1) + subPartIndex) ? 'bg-[#5B361B]' : 'bg-[#5B361B] bg-opacity-50'}
                      cursor-pointer
                      hover:brightness-95
                      rounded-md
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
