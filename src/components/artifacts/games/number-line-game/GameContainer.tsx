'use client';

import React, { ReactNode, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Star, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameContainerProps {
  title: string;
  score: number;
  children: ReactNode;
  instructions?: string;
  showScore?: boolean;
  componentId?: string;
}

const GameContainer: React.FC<GameContainerProps> = ({
  title,
  score,
  children,
  instructions,
  showScore = true,
  componentId,
}) => {
  const handleSave = useCallback(async () => {
    try {
      const response = await fetch('/api/components/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: title,
          code: document.getElementById('game-container')?.innerHTML || '',
          componentId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save component');
      }

      alert('Component saved successfully!');
    } catch (error) {
      console.error('Error saving component:', error);
      alert('Failed to save component');
    }
  }, [title, componentId]);

  return (
    <Card id="game-container" className="p-6 max-w-7xl mx-auto mt-4 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-blue-600">{title}</h1>
          <Button
            onClick={handleSave}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Save size={16} />
            Save Component
          </Button>
        </div>
        {showScore && (
          <div className="flex items-center bg-yellow-100 rounded-xl px-4 py-2 shadow">
            <Star className="text-yellow-500 mr-2" size={18} />
            <span className="text-lg font-bold text-yellow-600">Score: {score}</span>
          </div>
        )}
      </div>

      {instructions && (
        <div className="mb-4 text-sm text-center bg-blue-50 p-3 rounded-xl">
          {instructions}
        </div>
      )}

      {children}
    </Card>
  );
};

export default GameContainer;
