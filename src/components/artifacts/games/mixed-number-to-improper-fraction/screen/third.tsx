import React from 'react';
import { initialGameState } from '../game-state';
import Main from '../components/Steps_Screen3/Main';

const ThirdScreen: React.FC = () => {
  const { mixedFraction1, mixedFraction2 } = initialGameState.state3;

  return (
    <div className="min-h-screen">
      <main className="flex-grow flex items-start justify-center py-8">
        <Main
          mixedFraction1={mixedFraction1}
          mixedFraction2={mixedFraction2}
        />
      </main>
    </div>
  );
};

export default ThirdScreen;