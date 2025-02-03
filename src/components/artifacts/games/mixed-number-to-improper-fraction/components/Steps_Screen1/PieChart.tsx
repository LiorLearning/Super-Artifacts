import React from 'react';

interface PieChartProps {
  divisions: number;
  selectedPieces: number;
}

export default function PieChart({ divisions, selectedPieces }: PieChartProps) {
  const radius = 50;
  const centerX = radius;
  const centerY = radius;
  const sliceAngle = (2 * Math.PI) / divisions;

  return (
    <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className="w-24 h-24">
      {Array.from({ length: divisions }).map((_, i) => {
        const startAngle = i * sliceAngle;
        const endAngle = startAngle + sliceAngle;
        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        return (
          <path
            key={i}
            d={`
              M ${centerX} ${centerY}
              L ${x1} ${y1}
              A ${radius} ${radius} 0 0 1 ${x2} ${y2}
              Z
            `}
            fill={i < selectedPieces ? "rgb(34, 197, 94)" : "white"}
            stroke="black"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}
