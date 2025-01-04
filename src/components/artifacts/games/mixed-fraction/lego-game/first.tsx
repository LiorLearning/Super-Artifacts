import React, { useEffect, useRef } from 'react';
import { useThreeSetup } from './hooks/useThreeSetup';
import { useDragControls } from './hooks/useDragControls';
import { useWindowResize } from './hooks/useWindowResize';
import { createLegoPiece } from './utils/pieceFactory';
import { createHolder } from './utils/holderFactory';
import * as THREE from 'three';
import { useGameState } from '../state-utils';
import { COLORS, DURATION, HOLDER_POSITION } from './utils/constants';
import { animateCamera, animatePiece } from './utils/animation';
interface CreatePieceProps {
  scene: THREE.Scene | null;
  position: [number, number, number];
  color: number;
}



const LegoGame = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const hasInitialized = React.useRef(false);
  const { scene, camera, renderer, orbitControls } = useThreeSetup(mountRef, hasInitialized);
  
  const [pieces, setPieces] = React.useState<THREE.Mesh[]>([]);
  const dragObjectsRef = React.useRef<THREE.Mesh[]>([]);

  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction } = gameStateRef.current.state1;

  const containerAssignmentsRef = useRef<Array<THREE.Mesh | null>>(
    new Array(11).fill(null)
  );

  const fillContainerRef = useRef<boolean>(false);

  const onDragEnd = (count: number) => {
    if (!fillContainerRef.current) {
      setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, piecesAtYOne: count } }));
      if (count === 1) {
        goToStep(4);
      } else if (count < 7) {
        goToStep(5);
      } else if (count === 7) {
        goToStep(6);
        fillContainerRef.current = true;
      }
    } else {
      goToStep(8);
      if (count === 3) {
        goToStep(9);
      } else if (count === 0) {
        goToStep(11);
      }
    }
  };

  const goToStep = (step: number) => {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step } }));
  }

  const createPiece = ({ scene, position, color }: CreatePieceProps) => {
    if (!scene) return null;
    const piece = createLegoPiece(color, 4/fraction.denominator);
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

  const animateAllPieces = (yPos: number) => {
    const newPieces: THREE.Mesh[] = [];
    pieces.forEach(piece => {
      console.log(piece.position.y);
      if (Math.abs(piece.position.y - yPos) <= 0.1) {
        // Update piece position
        animatePiece(piece, new THREE.Vector3(piece.position.x-3, piece.position.y - 0.5, piece.position.z + 1.3), 1);

        piece.material = new THREE.MeshPhongMaterial({ color: COLORS.MAGENTA });
        
        // Update containerAssignmentsRef
        const prevIndex = piece.userData.containerIndex;
        if (prevIndex !== -1) {
          containerAssignmentsRef.current[prevIndex] = null;
          
          // Find new index based on new position
          const newIndex = containerAssignmentsRef.current.findIndex(item => item === null);
          if (newIndex !== -1) {
            containerAssignmentsRef.current[newIndex] = piece;
            piece.userData.containerIndex = newIndex;
          }
        }
      }
      newPieces.push(piece);
    });
    setPieces(newPieces);
  }

  useEffect(() => {
    if (scene && mountRef.current) {
      createHolder(scene, HOLDER_POSITION, 4);
    }
  }, [scene]);
  

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
      // toggleTextVisibilityOfHolder(true);

      // Create the pieces
      const newPieces: THREE.Mesh[] = [];
      for (let i = 0; i < fraction.numerator; i++) {
        const piece = createPiece({ scene: scene!, position: [-1.9, 0.1, 0], color: COLORS.GREEN });
        if (piece) {
          newPieces.push(piece);
        }
      }
      setPieces(newPieces);

    } else if (step === 3) {
      animateCamera(camera!, new THREE.Vector3(2, 3, 4), 1);
      
      // Hide the holder
      // toggleTextVisibilityOfHolder(false);

      animateCamera(camera!, new THREE.Vector3(5, 5, 5), 1);

      setTimeout(() => {
        goToStep(4);
      }, DURATION);
      
    } else if (step === 6) {
      animateCamera(camera!, new THREE.Vector3(7, 5, 3), 1);
    } else if (step === 7) {
      animateCamera(camera!, new THREE.Vector3(5, 5, 5), 1);
    } else if (step === 9) {
      animateAllPieces(0.1);
      goToStep(10);
    } else if (step === 11) {
      animateAllPieces(-0.4);
      animateCamera(camera!, new THREE.Vector3(-0, 5, 7.7), 1);
    }

    return () => {
      cleanUpPieces(scene!, pieces);
      setPieces([]);
    }
  }, [step, scene]);


  useDragControls({
    scene,
    camera,
    renderer,
    dragObjects: dragObjectsRef.current,
    containerAssignmentsRef: containerAssignmentsRef,
    orbitControls,
    onDragEnd: onDragEnd,
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