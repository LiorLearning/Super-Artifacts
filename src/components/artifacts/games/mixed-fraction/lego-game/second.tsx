import React, { useEffect } from 'react';
import { useThreeSetup } from './hooks/useThreeSetup';
import { useWindowResize } from './hooks/useWindowResize';
import { createLegoPiece } from './utils/pieceFactory';
import * as THREE from 'three';
import { useGameState } from '../state-utils';
import { COLORS, HOLDER_POSITION } from './utils/constants';
import { createHolder as createLegoHolder } from './utils/holderFactory';

interface CreatePieceProps {
  scene: THREE.Scene | null;
  position: [number, number, number];
  color: number;
}

interface CreateHolderProps {
  scene: THREE.Scene | null;
  position: [number, number, number];
  count: number;
}


const LegoGame = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const hasInitialized = React.useRef(false);
  const { scene, camera, renderer } = useThreeSetup(mountRef, hasInitialized);
  const [pieces, setPieces] = React.useState<THREE.Mesh[]>([]);
  const [holders, setHolders] = React.useState<THREE.Group[]>([]);
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction } = gameStateRef.current.state2;

  const goToStep = (step: number) => {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step } }));
  }

  const createHolder = (scene: THREE.Scene | null, position: [number, number, number], count: number) => {
    if (!scene) return null;
    const holder = createLegoHolder(scene, position, count);
    scene.add(holder.group);
    setHolders(prev => [...prev, holder.group]);
    return holder;
  }

  const cleanUpHolders = (scene: THREE.Scene | null, holders: THREE.Group[]) => {
    if (!scene) return;
    holders.forEach(holder => {
      scene.remove(holder);
      if (holder instanceof THREE.Mesh) {
        holder.geometry.dispose();
        holder.material.dispose();
      }
    });
  }

  const createPiece = ({ scene, position, color }: CreatePieceProps) => {
    if (!scene) return null;
    const piece = createLegoPiece(color, 4/fraction.denominator);
    piece.position.set(...position);
    scene.add(piece);
    setPieces(prev => [...prev, piece]);
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
      createHolder(scene, [0, 0, 0], 3);
    } else if (step === 1) {
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