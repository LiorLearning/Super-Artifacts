import React, { useEffect, useRef, useState } from 'react';
import { useThreeSetup } from './hooks/useThreeSetup';
import { useDragControls } from './hooks/useDragControls';
import { useWindowResize } from './hooks/useWindowResize';
import { createLegoPiece } from './utils/pieceFactory';
import { createHolder } from './utils/holderFactory';
import * as THREE from 'three';
import { useGameState } from '../state-utils';
import { COLORS, HOLDER_POSITION } from './utils/constants';
import { animateCamera, animatePiece } from './utils/animation';
import { createText } from './utils/textFactory';
import { createVectorArrow } from './utils/vectorFactory';

interface CreatePieceProps {
  scene: THREE.Scene | null;
  position: [number, number, number];
  color: number;
}

const LegoGame = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const hasInitialized = React.useRef(false);
  const { scene, camera, renderer, orbitControls } = useThreeSetup(mountRef, hasInitialized);
  
  const [pieces, setPieces] = React.useState<THREE.Group[]>([]);
  const textsRef = React.useRef<THREE.Group[]>([]);
  const vectorRef = React.useRef<THREE.Group | null>(null);
  const dragObjectsRef = React.useRef<THREE.Group[]>([]);

  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction } = gameStateRef.current.state1;

  const containerAssignmentsRef = useRef<Array<THREE.Group | null>>(
    new Array(11).fill(null)
  );

  const fillContainerRef = useRef<boolean>(false);
  const [enableDragging, setEnableDragging] = useState(false);

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
  
  const cleanUpPieces = (scene: THREE.Scene | null, pieces: THREE.Group[]) => {
    if (!scene) return;
    pieces.forEach(piece => {
      scene.remove(piece);
      dragObjectsRef.current = dragObjectsRef.current.filter(p => p !== piece);
      piece.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
    });
  }

  const cleanUpTexts = (scene: THREE.Scene | null) => {
    if (!scene) return;
    textsRef.current.forEach(text => {
      scene.remove(text);
    });
    textsRef.current = [];
  }

  const createVector = (start: THREE.Vector3, end: THREE.Vector3, options: {
    color?: number;
    arrowHeadSize?: number;
    thickness?: number;
    curvature?: number;
    linewidth?: number;
    label?: string;
  } = {}) => {
    const vectorArrow = createVectorArrow(start, end, {
      color: options.color || COLORS.BLACK,
      arrowHeadSize: options.arrowHeadSize || 0.5,
      thickness: options.thickness || 0.1,
      curvature: options.curvature || 2,
      linewidth: options.linewidth || 0.5,
    });
    if (vectorArrow) {
      vectorRef.current = vectorArrow;
      scene?.add(vectorArrow);
    }
  }

  const clearVector = () => {
    if (vectorRef.current) {
      scene?.remove(vectorRef.current);
      vectorRef.current = null;
    }
  }

  const animateAllPieces = (yPos: number) => {
    const newPieces: THREE.Group[] = [];
    pieces.forEach(piece => {
      if (Math.abs(piece.position.y - yPos) <= 0.1) {
        // Update piece position
        animatePiece(piece, new THREE.Vector3(piece.position.x-2.5, piece.position.y - 0.5, piece.position.z + 2), 1);

        piece.children.forEach(child => {
          if (child instanceof THREE.Mesh && child.name === 'LegoPieceBody') {
            child.material = new THREE.MeshPhongMaterial({ color: COLORS.MAGENTA });
          }
        });
        
        // Update containerAssignmentsRef
        const prevIndex = piece.userData.containerIndex;
        console.log('Previous Container Index:', prevIndex);
        if (prevIndex !== -1) {
          containerAssignmentsRef.current[prevIndex] = null;
          console.log('Cleared previous container index:', prevIndex);
          
          // Find new index based on new position
          const newIndex = containerAssignmentsRef.current.findIndex(item => item === null);
          console.log('Found new container index:', newIndex);
          if (newIndex !== -1) {
            containerAssignmentsRef.current[newIndex] = piece;
            piece.userData.containerIndex = newIndex;
            console.log('Updated piece container index to:', newIndex);
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

      const holderText = createText(scene!, [-2.5, 3.5, 3.5], "Lego Holder", {
        textColor: COLORS.WHITE,
        orientation: 'orthogonal',
        bgColor: COLORS.HOLDER_BASE,
        centered: true,
      });
      if (holderText) {
        textsRef.current = [...textsRef.current, holderText];
      }

      const pieceText = createText(scene!, [4.5, 0, 1.4], "Lego Block", {
        textColor: COLORS.WHITE,
        orientation: 'orthogonal',
        bgColor: COLORS.MAGENTA,
        centered: true,
      });
      if (pieceText) {
        textsRef.current = [...textsRef.current, pieceText];
      }

      // createVector(new THREE.Vector3(-1.5, 3.5, 2.5), new THREE.Vector3(-2, 1.5, 1));
      // createVector(new THREE.Vector3(5, 2, 4), new THREE.Vector3(3, 0.5, 1));

    } else if (step === 1) {
      cleanUpPieces(scene!, pieces);
      setPieces([]);
      cleanUpTexts(scene!);

      // Show the holder
      // toggleTextVisibilityOfHolder(true);

      // Create the pieces
      const newPieces: THREE.Group[] = [];
      for (let i = 0; i < fraction.numerator; i++) {
        const piece = createPiece({ scene: scene!, position: [-1.9, 0.1, 0], color: COLORS.GREEN });
        if (piece) {
          newPieces.push(piece);
        }
      }
      setPieces(newPieces);

      const pieceText = createText(scene!, [2.5, 1, 1], "This is a 1/4th\nsize block", {
        textColor: COLORS.WHITE,
        orientation: 'orthogonal',
        bgColor: COLORS.MAGENTA,
        centered: true,
      });
      if (pieceText) {
        textsRef.current = [...textsRef.current, pieceText];
      }

      for (let i = 0; i < fraction.denominator; i++) {
        const fractionalText = createText(scene!, [-2, 1.9, 1 + i * (fraction.denominator/4)], "1/4", {
          textColor: COLORS.MAGENTA,
          orientation: 'orthogonal',
          centered: true,
        });
        if (fractionalText) {
          textsRef.current = [...textsRef.current, fractionalText];
        }
      }

    } else if (step === 2) {
      const pieceText = textsRef.current[0];
      scene!.remove(pieceText);

    } else if (step === 3) {
      cleanUpTexts(scene!);
      setEnableDragging(true);

      // animateCamera(camera!, new THREE.Vector3(2, 3, 4), 1);
      
      // Hide the holder
      // toggleTextVisibilityOfHolder(false);

      // animateCamera(camera!, new THREE.Vector3(5, 5, 5), 1);
    } else if (step === 6) {
      setEnableDragging(false);
      // animateCamera(camera!, new THREE.Vector3(7, 5, 3), 1);
    } else if (step === 7) {
      setEnableDragging(true);
      // animateCamera(camera!, new THREE.Vector3(5, 5, 5), 1);
    } else if (step === 9) {
      animateAllPieces(0.1);
      goToStep(10);

    } else if (step === 10) {
      animateCamera(camera!, new THREE.Vector3(6, 10, 8), 1);
      // Add 1 whole block text
      const wholeBlockText = createText(scene!, [-4.5, 3, 4], "1 Whole Block", {
        textColor: COLORS.MAGENTA,
        orientation: 'orthogonal',
        centered: true,
      });
      if (wholeBlockText) {
        textsRef.current = [...textsRef.current, wholeBlockText];
      }

    } else if (step === 11) {
      cleanUpTexts(scene!);
      animateAllPieces(-0.4);
      animateCamera(camera!, new THREE.Vector3(0, 5, 7.7), 1);
      setEnableDragging(false);

      const text1 = createText(scene!, [-8, 1, 5], "1 Whole Block", {
        size: 0.3,
        textColor: COLORS.MAGENTA,
        orientation: 'orthogonal',
        centered: true,
      });
      if (text1) {
        textsRef.current = [...textsRef.current, text1];
      }

      const text2 = createText(scene!, [-2.5, 4, 2], "means 7 ÷ 4", {
        textColor: COLORS.BLACK,
        size: 0.3,
        orientation: 'orthogonal',
        centered: true,
      });
      if (text2) {
        textsRef.current = [...textsRef.current, text2];
      }
    } else if (step === 12) {
      cleanUpTexts(scene!);
      const text1 = createText(scene!, [-8, 1, 5], "1 Whole Block", {
        size: 0.3,
        textColor: COLORS.MAGENTA,
        orientation: 'orthogonal',
        centered: true,
      });
      if (text1) {
        textsRef.current = [...textsRef.current, text1];
      }

      const text2 = createText(scene!, [-1.35, 3.9, 2.1], "3", {
        textColor: COLORS.GREEN,
        size: 0.3,
        orientation: 'orthogonal',
        centered: true,
      });
      if (text2) {
        textsRef.current = [...textsRef.current, text2];
      }

      const text3 = createText(scene!, [-1, 4, 2], "/4", {
        textColor: COLORS.BLACK,
        size: 0.3,
        orientation: 'orthogonal',
        centered: true,
      });
      if (text3) {
        textsRef.current = [...textsRef.current, text3];
      }

      const text4 = createText(scene!, [-4, 4, 3], "7 ÷ 4", {
        textColor: COLORS.BLACK,
        size: 0.3,
        orientation: 'orthogonal',
        centered: true,
      });
      if (text4) {
        textsRef.current = [...textsRef.current, text4];
      }

      const text5 = createText(scene!, [-8, 1, 3], "Quotient", {
        textColor: COLORS.MAGENTA,
        size: 0.2,
        orientation: 'orthogonal',
        centered: true,
      });
      if (text5) {
        textsRef.current = [...textsRef.current, text5];
      }

      const text6 = createText(scene!, [-2.5, 3.9, 1.3], "Remainder", {
        textColor: COLORS.GREEN,
        size: 0.2,
        orientation: 'orthogonal',
        centered: true,
      });
      if (text6) {
        textsRef.current = [...textsRef.current, text6];
      }
    }

  }, [step, scene]);


  useDragControls({
    scene,
    camera,
    renderer,
    dragObjects: enableDragging ? dragObjectsRef.current : [],
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