import React from 'react';
import { useThreeSetup } from './hooks/useThreeSetup';
import { useDragControls } from './hooks/useDragControls';
import { useWindowResize } from './hooks/useWindowResize';
import { createLegoPiece } from './utils/pieceFactory';
import { INITIAL_PIECES_CONFIG } from './utils/constants';
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