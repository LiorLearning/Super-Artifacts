'use client';

interface BarProps {
  parts: number;
  selectedParts: number[];
  handleClick: (index: number) => void;
}

export function Bar({ parts, selectedParts, handleClick }: BarProps) {
  return (
    <div className="relative w-full">
      <div className="flex items-center gap-6">
        <div className="w-full relative">
          <div className="w-full perspective-1000">
            <div className="relative h-32 bg-[#5c3624] rounded-lg shadow-xl transform-style-3d rotate-x-10">
              <div className="absolute inset-0 flex gap-1 p-1">
                {Array.from({ length: parts }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`flex-1 relative bg-gradient-to-b from-[#8a5a42] via-[#734939] to-[#5c3624] 
                      transition-all duration-300 ease-out transform-gpu rounded-sm
                      hover:from-[#9a6a52] hover:via-[#835949] hover:to-[#6c4634]
                      ${selectedParts.includes(index) 
                        ? 'ring-2 ring-yellow-400 from-[#7a4a32] via-[#633929] to-[#4c2614]' 
                        : ''}`}
                  >
                    {selectedParts.includes(index) && (
                      <div className="absolute inset-0 flex items-center justify-center text-yellow-400 text-2xl font-bold z-10">
                        ✓
                      </div>
                    )}
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-4 
                      border border-[#4a2c1c] rounded-sm opacity-30" />
                    <div className="absolute inset-0 flex flex-col justify-around py-2">
                      {[0, 1].map((groove) => (
                        <div key={groove} className="relative w-full h-2">
                          <div className="absolute inset-0 bg-gradient-to-b from-[#3a2218] via-[#4a2c1c] to-[#3a2218]" />
                          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#8a5a42] to-transparent opacity-50" />
                          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a1a12] to-transparent opacity-50" />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#8a5a42] to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a1a12] to-transparent" />
                  </button>
                ))}
              </div>
              <div className="absolute -bottom-4 inset-x-0 h-4 bg-black/20 blur-md rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-md text-sm font-semibold">
        {selectedParts.length}/{parts}
      </div>
    </div>
  );
}
