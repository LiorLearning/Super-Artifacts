"use client"

import React from 'react'

interface PizzaSlicesProps {
  numerator: number;
  denominator: number;
  color: string[];
}

const PizzaSlices: React.FC<PizzaSlicesProps> = ({ 
  numerator, 
  denominator, 
  color
}) => {
  const centerx = 50;
  const centery = 50;
  const radius = 40;
  const outerRadius = radius + 8;

  const generateSlices = () => {
    const slices = []
    const angleStep = 360 / denominator
    for (let i = 0; i < denominator; i++) {
      const startAngle = i * angleStep
      const endAngle = (i + 1) * angleStep
      const largeArcFlag = angleStep > 180 ? 1 : 0
      const x1 = centerx + outerRadius * Math.cos((startAngle * Math.PI) / 180)
      const y1 = centery + outerRadius * Math.sin((startAngle * Math.PI) / 180)
      const x2 = centerx + outerRadius * Math.cos((endAngle * Math.PI) / 180)
      const y2 = centery + outerRadius * Math.sin((endAngle * Math.PI) / 180)

      slices.push(
        <path
          key={i}
          d={`M ${centerx} ${centery} L ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
          fill={i < numerator ? "transparent" : "rgba(255,255,255,0.7)"}
          stroke="black"
          strokeWidth=".5"
        />
      )
    }
    return slices
  }

  return (
    <div className="relative h-[60px] w-[60px]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-1 rounded-full border-[1px] border-black" style={{ backgroundColor: color[0] }}>
        <div className="w-14 h-14 border-[1px] border-black shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.5)] rounded-full" style={{ backgroundColor: color[1] }} />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-[70px] w-[70px]">
          {/* Base pizza layer */}
          <circle 
            cx={centerx} 
            cy={centery} 
            r={outerRadius} 
            fill="transparent" 
            stroke="black"
            strokeWidth=".5" 
          />
          <circle 
            cx={centerx} 
            cy={centery} 
            r={radius} 
            fill="transparent" 
            stroke="black"
            strokeWidth=".5" 
          />
          
          {/* Sliced layer on top */}
          <g>
            {generateSlices()}
          </g>
          
          {/* Outer border circle */}
          <circle 
            cx={centerx} 
            cy={centery} 
            r={outerRadius} 
            fill="none" 
            stroke="black" 
            strokeWidth=".5" 
          />
        </svg>
      </div>
    </div>
  )
}

export default PizzaSlices
