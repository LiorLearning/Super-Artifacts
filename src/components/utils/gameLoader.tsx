'use client'

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GameLoader() {
  const loadingTexts = [
    "Getting ready for fun...",
    "Loading the adventure...",
    "Almost there...",
    "Just a moment...",
    "Adding final touches...",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b p-4">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        New Game Loading
      </motion.h1>
      <div className="flex flex-col items-center justify-center mb-4">
        <Loader2 className="mb-2 h-8 w-8 animate-spin" />
        <AnimatePresence mode="wait">
          <motion.span
            key={currentTextIndex}
            className="text-lg font-semibold mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {loadingTexts[currentTextIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
      <motion.div
        className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
      />
    </div>
  );
}