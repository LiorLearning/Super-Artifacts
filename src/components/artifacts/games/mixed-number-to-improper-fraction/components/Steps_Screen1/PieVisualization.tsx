import React from "react"
import type { MixedFraction } from "../../game-state"

interface PieVisualizationProps {
  mixedFraction: MixedFraction
}

const PieVisualization: React.FC<PieVisualizationProps> = ({ mixedFraction }) => {
  const renderSliceLines = () => (
    <>
      <line x1="50" y1="50" x2="50" y2="2" stroke="black" strokeWidth="0.5"/>
      <line x1="50" y1="50" x2="98" y2="50" stroke="black" strokeWidth="0.5"/>
      <line x1="50" y1="50" x2="50" y2="98" stroke="black" strokeWidth="0.5"/>
      <line x1="50" y1="50" x2="2" y2="50" stroke="black" strokeWidth="0.5"/>
    </>
  )

  return (
    <div className="w-full">
      <div className="bg-white w-full max-w-4xl mx-auto min-h-[300px] border-2 border-black">
        <div className="flex justify-center gap-8 py-16">
          {[...Array(mixedFraction.whole)].map((_, index) => (
            <div key={`whole-${index}`} className="w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="48" fill="#98D400" stroke="black" strokeWidth="0.5"/>
              </svg>
            </div>
          ))}

          <div className="w-28 h-28">
            <svg viewBox="0 0 100 100" className="w-full h-full">

              <circle cx="50" cy="50" r="48" fill="white" stroke="black" strokeWidth="0.5"/>
              {renderSliceLines()}  

              {[...Array(mixedFraction.numerator)].map((_, i) => {
                const startAngle = i * (360 / mixedFraction.denominator);
                const endAngle = (i + 1) * (360 / mixedFraction.denominator);
                const radius = 48;
                
                return (
                  <path
                    key={i}
                    d={`
                      M 50 50
                      L ${50 + radius * Math.cos(startAngle * Math.PI / 180)} ${50 + radius * Math.sin(startAngle * Math.PI / 180)}
                      A ${radius} ${radius} 0 0 1 ${50 + radius * Math.cos(endAngle * Math.PI / 180)} ${50 + radius * Math.sin(endAngle * Math.PI / 180)}
                      Z
                    `}

                    fill="#98D400"

                    stroke="black"
                    strokeWidth="0.5"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieVisualization; 