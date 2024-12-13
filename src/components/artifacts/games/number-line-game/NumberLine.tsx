import React from 'react';
import { motion } from 'framer-motion';

interface NumberLineProps {
  numbers: number[];
  selectedStart: number | null;
  currentPosition: number | null;
  onNumberSelect?: (num: number) => void;
  showFrog?: boolean;
}

const NumberLine: React.FC<NumberLineProps> = ({
  numbers,
  selectedStart,
  currentPosition,
  onNumberSelect,
  showFrog = true,
}) => {
  const blockSize = 100 / (numbers.length - 1); // Adjust to make blocks between numbers

  return (
    <div className="relative h-24 mb-6">
      {/* Background line */}
      <div className="absolute w-full h-12 bg-gradient-to-r from-blue-100 to-purple-100 top-1/2 transform -translate-y-1/2 shadow rounded-lg overflow-hidden">
        {/* Highlight selected range */}
        {numbers.slice(0, -1).map((_, index) => (
          <div
            key={index}
            className={`absolute h-full ${
              selectedStart !== null &&
              index >= Math.min(numbers.indexOf(selectedStart), numbers.indexOf(currentPosition || 0)) &&
              index < Math.max(numbers.indexOf(selectedStart), numbers.indexOf(currentPosition || 0))
                ? 'bg-yellow-200'
                : 'bg-transparent'
            } transition-colors duration-300`}
            style={{
              left: `${index * blockSize}%`,
              width: `${blockSize}%`,
            }}
          />
        ))}
      </div>

      {/* Number markers and labels */}
      {numbers.map((num, index) => (
        <React.Fragment key={index}>
          <div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${index * blockSize}%` }}
          >
            <div className="h-6 w-1 bg-white mb-1 rounded-full shadow-sm"></div>
            <button
              className={`text-base font-bold transition-all duration-300 ${
                selectedStart === num
                  ? 'text-blue-600 scale-110'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
              onClick={() => onNumberSelect?.(num)}
            >
              {num}
            </button>
          </div>

          {/* Frog indicator */}
          {showFrog && selectedStart === num && (
            <motion.div
              className="absolute top-1/2 w-12 h-12 -mt-10"
              style={{ left: `${index * blockSize}%` }}
              initial={{ scale: 0, x: '-50%', y: '-50%' }}
              animate={{ scale: 1, x: '-50%', y: '-50%' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-blue-200 rounded-full blur-sm"></div>
                <div className="relative w-full h-full bg-gradient-to-b from-green-200 to-green-300 rounded-full flex items-center justify-center shadow border-2 border-white">
                  <span className="text-2xl">🐸</span>
                </div>
              </div>
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default NumberLine;
