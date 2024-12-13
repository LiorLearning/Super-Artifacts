import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

// Helper function to get game description
const getGameDescription = (key: string): string => {
  return 'Interactive educational math game';
};

interface GameListingProps {
  gameComponents: { [key: string]: React.ComponentType };
  onGameSelect: (gameKey: string) => void;
}

const GameListing: React.FC<GameListingProps> = ({ gameComponents, onGameSelect }) => {
  const router = useRouter();

  const handleGameClick = (gameKey: string) => {
    onGameSelect(gameKey);
    router.push(`?game=${gameKey}`);
  };

  return (
    <div className="p-6 bg-background min-h-screen overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Math Games Collection</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(gameComponents).map((gameKey: string) => (
            <Card 
              key={gameKey}
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleGameClick(gameKey)}
            >
              <CardHeader>
                <CardTitle className="text-xl">
                  {gameKey}
                </CardTitle>
                <CardDescription>
                  {getGameDescription(gameKey)}
                </CardDescription>
                <div className="flex justify-center mt-4">
                  <Button 
                      className="px-4 py-2 bg-primary rounded-xl hover:bg-primary-dark transition-colors duration-300"
                      onClick={() => handleGameClick(gameKey)}
                  >
                      Play Now
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameListing;