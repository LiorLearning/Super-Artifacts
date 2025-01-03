import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HOLDER_POSITION } from '../utils/constants';

interface DragControlsProps {
  scene: THREE.Scene | null;
  camera: THREE.OrthographicCamera | null;
  renderer: THREE.WebGLRenderer | null;
  dragObjects: THREE.Mesh[];
  orbitControls: OrbitControls | null;
}

export const useDragControls = ({ 
  scene, 
  camera, 
  renderer, 
  dragObjects,
  orbitControls 
}: DragControlsProps) => {
  const dragControlsRef = useRef<DragControls | null>(null);
  const containerStatesRef = useRef<boolean[]>([false, false, false, false, false, false, false, false, false, false, false]);

  const SNAPPABLE_POSITIONS = [
    new THREE.Vector3(0, 0, -2),
    new THREE.Vector3(0, 0, -4),
    new THREE.Vector3(2, 0, 0),
    new THREE.Vector3(2, 0, -2),
    new THREE.Vector3(2, 0, -4),
    new THREE.Vector3(4, 0, -2),
    new THREE.Vector3(4, 0, 0),
    new THREE.Vector3(HOLDER_POSITION[0], HOLDER_POSITION[1], HOLDER_POSITION[2]),
    new THREE.Vector3(HOLDER_POSITION[0], HOLDER_POSITION[1], HOLDER_POSITION[2] + 1),
    new THREE.Vector3(HOLDER_POSITION[0], HOLDER_POSITION[1], HOLDER_POSITION[2] + 2),
    new THREE.Vector3(HOLDER_POSITION[0], HOLDER_POSITION[1], HOLDER_POSITION[2] + 3),
  ];
  

  useEffect(() => {
    if (!scene || !camera || !renderer || !dragObjects.length || !orbitControls) return;

    dragControlsRef.current = new DragControls(dragObjects, camera, renderer.domElement);
    
    const onDragStart = (event: { object: THREE.Object3D }) => {
      orbitControls.enabled = false;
      const material = (event.object as THREE.Mesh).material as THREE.MeshPhongMaterial;
      material.opacity = 0.6;
    };

    const onDragEnd = (event: { object: THREE.Object3D }) => {
      orbitControls.enabled = true;
      const material = (event.object as THREE.Mesh).material as THREE.MeshPhongMaterial;
      material.opacity = 1;
      
      // Get final position (keeping y slightly above holder)
      const piecePos = new THREE.Vector3(
        event.object.position.x,
        HOLDER_POSITION[1] + 0.5,
        event.object.position.z
      );

      // Define container cell positions based on holder
      const snappablePositions = [];
      for (let i = 0; i < SNAPPABLE_POSITIONS.length; i++) {
        snappablePositions.push(SNAPPABLE_POSITIONS[i]);
      }

      snappablePositions.forEach(pos => {
        const geometry = new THREE.SphereGeometry(0.1, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const dot = new THREE.Mesh(geometry, material);
        dot.position.copy(pos);
        scene.add(dot);
      });

      let minDist = Infinity;
      let closestCellIndex = -1;
      
      // Find which container cell is closest and empty
      snappablePositions.slice(-4).forEach((pos, index) => {
        const dist = piecePos.distanceTo(pos);
        if (dist < minDist && !containerStatesRef.current[index]) {
          minDist = dist;
          closestCellIndex = index;
        }
      });

      console.group('Drag End Debug');
      console.log('Snappable Positions:', snappablePositions);
      console.log('Closest Cell Index:', closestCellIndex);
      console.log('Container States:', containerStatesRef.current);
      console.groupEnd();


      // Adjust threshold as desired 
      const snapThreshold = 4.0;

      // If within snapThreshold of an empty cell, snap it in place
      if (closestCellIndex !== -1 && minDist < snapThreshold) {
        const snapPosition = snappablePositions[closestCellIndex].clone();
        snapPosition.y += 0.1;
        snapPosition.x += 0.1;
        event.object.position.copy(snapPosition);
      } else {
        // If out of range, find an empty snappable position
        const emptyPositionIndex = snappablePositions.findIndex((_, index) => !containerStatesRef.current[index]);
        if (emptyPositionIndex !== -1) {
          const emptyPosition = snappablePositions[emptyPositionIndex];
          event.object.position.copy(emptyPosition);
        }
      }
      // Update container states
      const newContainerStates = [...containerStatesRef.current];
      newContainerStates[closestCellIndex] = true;
      containerStatesRef.current = newContainerStates;
    };

    dragControlsRef.current.addEventListener('dragstart', onDragStart);
    dragControlsRef.current.addEventListener('dragend', onDragEnd);

    return () => {
      if (dragControlsRef.current) {
        dragControlsRef.current.removeEventListener('dragstart', onDragStart);
        dragControlsRef.current.removeEventListener('dragend', onDragEnd);
        dragControlsRef.current.dispose();
      }
    };
  }, [scene, camera, renderer, dragObjects, orbitControls, containerStatesRef]);

  return dragControlsRef.current;
};
