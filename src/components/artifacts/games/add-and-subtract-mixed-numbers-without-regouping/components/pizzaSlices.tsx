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

  const generateSlices = () => {
    const slices = []
    const angleStep = 360 / denominator
    for (let i = 0; i < denominator; i++) {
      const startAngle = i * angleStep
      const endAngle = (i + 1) * angleStep
      const largeArcFlag = angleStep > 180 ? 1 : 0
      const x1 = centerx + radius * Math.cos((startAngle * Math.PI) / 180)
      const y1 = centery + radius * Math.sin((startAngle * Math.PI) / 180)
      const x2 = centerx + radius * Math.cos((endAngle * Math.PI) / 180)
      const y2 = centery + radius * Math.sin((endAngle * Math.PI) / 180)

      slices.push(
        <path
          key={i}
          d={`M ${centerx} ${centery} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
          fill={i < numerator ? color[0] : color[2]}
          opacity={i < numerator ? 1 : 0.4}
          stroke={color[1]}
          strokeWidth="0.5"
        />
      )
    }
    return slices
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center space-y-4 transform">
        <svg viewBox="0 0 100 100" className="h-32">
          <circle cx={centerx} cy={centery} r={radius + 5} fill={color[0]} stroke={color[1]} strokeWidth="0.5" />
          {generateSlices()}
        </svg>
      </div>
    </div>
  )
}

export default PizzaSlices
