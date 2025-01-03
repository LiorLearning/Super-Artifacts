import React, { useEffect } from 'react';
import { useThreeSetup } from './hooks/useThreeSetup';
import { useDragControls } from './hooks/useDragControls';
import { useWindowResize } from './hooks/useWindowResize';
import { createLegoPiece } from './utils/pieceFactory';
// import { INITIAL_PIECES_CONFIG } from './utils/constants';
import * as THREE from 'three';
import { useGameState } from './state-utils';
import { COLORS, DURATION } from './utils/constants';

interface CreatePieceProps {
  scene: THREE.Scene | null;
  position: [number, number, number];
  color: number;
}


const LegoGame = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const hasInitialized = React.useRef(false);
  const { scene, camera, renderer, orbitControls, toggleTextVisibilityOfHolder } = useThreeSetup(mountRef, hasInitialized);
  const [pieces, setPieces] = React.useState<THREE.Mesh[]>([]);
  const dragObjectsRef = React.useRef<THREE.Mesh[]>([]);

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
    dragObjectsRef.current = [...dragObjectsRef.current, piece];
    return piece;
  }
  
  const cleanUpPieces = (scene: THREE.Scene | null, pieces: THREE.Mesh[]) => {
    if (!scene) return;
    pieces.forEach(piece => {
      scene.remove(piece);
      dragObjectsRef.current = dragObjectsRef.current.filter(p => p !== piece);
      piece.geometry.dispose();
      (piece.material as THREE.Material).dispose();
    });
  }
  

  useEffect(() => {
    if (step === 0) {
      const piece = createPiece({ scene: scene!, position: [3, 0, 0], color: COLORS.MAGENTA });
      if (piece) {
        setPieces([piece]);
      }
      if (piece) {
        setTimeout(() => {
          cleanUpPieces(scene!, [piece]);
          setPieces([]);
          goToStep(1);
        }, DURATION);
      }

    } else if (step === 1) {
      toggleTextVisibilityOfHolder(true);
      setTimeout(() => {
        goToStep(2);
      }, DURATION);

    } else if (step === 3) {
      toggleTextVisibilityOfHolder(false);

      for (let i = 0; i < fraction.numerator; i++) {
        const piece = createPiece({ scene: scene!, position: [-0.9, 0.1, 0], color: COLORS.GREEN });
        if (piece) {
          setPieces([...pieces, piece]);
        }
      }
    } else if (step === 4) {
      // Do nothing for step 4
    } else if (step === 5) {
      // Do nothing for step 5
    } else if (step === 6) {
      // Do nothing for step 6
    } else if (step === 7) {
      // Do nothing for step 7
    } else if (step === 8) {
      // Do nothing for step 8
    } else if (step === 9) {
      // Do nothing for step 9
    } else if (step === 10) {
      // Do nothing for step 10
    } else if (step === 11) {
      // Do nothing for step 11
    } else if (step === 12) {
      // Do nothing for step 12
    } else if (step === 13) {
      // Do nothing for step 13
    } else if (step === 14) {
      // Do nothing for step 14
    }

    // return () => {
    //   cleanUpPieces(scene!, pieces);
    // }
  }, [step, scene]);


  useDragControls({
    scene,
    camera,
    renderer,
    dragObjects: dragObjectsRef.current,
    orbitControls
  });


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