import React from 'react';
import { useThreeSetup } from './hooks/useThreeSetup';
import { useDragControls } from './hooks/useDragControls';
import { useWindowResize } from './hooks/useWindowResize';
import { createLegoPiece } from './utils/pieceFactory';
import { INITIAL_PIECES_CONFIG } from './constants';
import * as THREE from 'three';

const LegoGame = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const hasInitialized = React.useRef(false);
  const { scene, camera, renderer, orbitControls } = useThreeSetup(mountRef, hasInitialized);
  const [pieces, setPieces] = React.useState<THREE.Mesh[]>([]);

  // Initialize pieces
  React.useEffect(() => {
    if (!scene) return;

    // Create pieces based on configuration
    const newPieces = INITIAL_PIECES_CONFIG.map(({ color, opacity, position }) => {
      const piece = createLegoPiece(color);
      piece.position.set(...position);
      piece.material.opacity = opacity;
      scene.add(piece);
      return piece;
    });

    setPieces(newPieces);

    // Cleanup
    return () => {
      newPieces.forEach(piece => {
        scene?.remove(piece);
        piece.geometry.dispose();
        (piece.material as THREE.Material).dispose();
      });
    };
  }, [scene]);

  useDragControls({
    scene,
    camera,
    renderer,
    dragObjects: pieces,
    orbitControls
  });

  useWindowResize({ camera, renderer, mountRef });

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '500px',
        backgroundColor: '#f0f0f0'
      }}
    />
  );
};

export default LegoGame;