import React, { useEffect } from 'react';
import { useThreeSetup } from './hooks/useThreeSetup';
import { useWindowResize } from './hooks/useWindowResize';
import { createLegoPiece } from './utils/pieceFactory';
import * as THREE from 'three';
import { useGameState } from '../state-utils';
import { COLORS } from './utils/constants';

interface CreatePieceProps {
  scene: THREE.Scene | null;
  position: [number, number, number];
  color: number;
}


const LegoGame = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const hasInitialized = React.useRef(false);
  const { scene, camera, renderer, toggleTextVisibilityOfHolder } = useThreeSetup(mountRef, hasInitialized);
  const [pieces, setPieces] = React.useState<THREE.Mesh[]>([]);
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction } = gameStateRef.current.state1;

  const goToStep = (step: number) => {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step } }));
  }

  const createPiece = ({ scene, position, color }: CreatePieceProps) => {
    if (!scene) return null;
    const piece = createLegoPiece(color);
    piece.position.set(...position);
    scene.add(piece);
    return piece;
  }
  
  const cleanUpPieces = (scene: THREE.Scene | null, pieces: THREE.Mesh[]) => {
    if (!scene) return;
    pieces.forEach(piece => {
      scene.remove(piece);
      piece.geometry.dispose();
      (piece.material as THREE.Material).dispose();
    });
  }


  useEffect(() => {
    if (step === 0) {
      // Create a piece in the first position
      const piece = createPiece({ scene: scene!, position: [3, 0, 0], color: COLORS.MAGENTA });
      if (piece) {
        setPieces([piece]);
      }

    } else if (step === 1) {
      cleanUpPieces(scene!, pieces);
      setPieces([]);

      // Show the holder
      toggleTextVisibilityOfHolder(true);

      // Create the pieces
      const newPieces: THREE.Mesh[] = [];
      for (let i = 0; i < fraction.numerator; i++) {
        const piece = createPiece({ scene: scene!, position: [-1.9, 0.1, 0], color: COLORS.GREEN });
        if (piece) {
          newPieces.push(piece);
        }
      }
      setPieces(newPieces);

    }
  }, [step, scene]);

  useWindowResize({ camera: camera as THREE.OrthographicCamera, renderer: renderer as THREE.WebGLRenderer, mountRef });

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '800px', 
        height: '400px',
      }}
    />
  );
};

export default LegoGame;