'use client'

import { Loader2 } from 'lucide-react';

export default function GameLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Loading Game
      </h1>
      <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
    </div>
  );
}