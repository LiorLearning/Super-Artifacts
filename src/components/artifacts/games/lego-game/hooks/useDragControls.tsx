import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HOLDER_POSITION, SNAPPABLE_POSITIONS } from '../utils/constants';

interface DragControlsProps {
  scene: THREE.Scene | null;
  camera: THREE.OrthographicCamera | null;
  renderer: THREE.WebGLRenderer | null;
  dragObjects: THREE.Mesh[];
  containerAssignmentsRef: React.MutableRefObject<Array<THREE.Mesh | null>>;
  orbitControls: OrbitControls | null;
  onDragEnd: (count: number) => void;
}

export const useDragControls = ({ 
  scene, 
  camera, 
  renderer, 
  dragObjects,
  containerAssignmentsRef,
  orbitControls,
  onDragEnd
}: DragControlsProps) => {
  const dragControlsRef = useRef<DragControls | null>(null);

  useEffect(() => {
    if (!scene || !camera || !renderer || !dragObjects.length || !orbitControls) return;

    // Attach DragControls
    dragControlsRef.current = new DragControls(dragObjects, camera, renderer.domElement);
    
    // Ensure each piece knows if it currently occupies a position (store index in userData)
    dragObjects.forEach((piece) => {
      (piece as THREE.Mesh).userData.containerIndex = -1; 
    });

    // EVENT: onDragStart
    const onDragStart = (event: { object: THREE.Object3D }) => {
      orbitControls.enabled = false;
      const mesh = event.object as THREE.Mesh;
      const material = mesh.material as THREE.MeshPhongMaterial;
      material.opacity = 0.6;

      // If piece was occupying a position, free that position
      const prevIndex = mesh.userData.containerIndex;
      if (prevIndex !== -1) {
        containerAssignmentsRef.current[prevIndex] = null;
        mesh.userData.containerIndex = -1;
      }
    };

    // EVENT: onDragEnd
    const handleOnDragEnd = (event: { object: THREE.Object3D }) => {
      orbitControls.enabled = true;
      const mesh = event.object as THREE.Mesh;
      const material = mesh.material as THREE.MeshPhongMaterial;
      material.opacity = 1;
      
      // We will place the piece slightly above the holder plane
      const piecePos = new THREE.Vector3(
        mesh.position.x,
        HOLDER_POSITION[1] + 0.5,
        mesh.position.z
      );

      // (Optional) Visual debugging: place small spheres where the snappable positions are
      // You can remove this in production
      SNAPPABLE_POSITIONS.forEach(pos => {
        const sphereGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const sphereMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const dot = new THREE.Mesh(sphereGeometry, sphereMat);
        dot.position.copy(pos);
        scene.add(dot); // Uncomment if you really want them in the scene
      });

      // Find the closest snappable position that is unoccupied
      let minDist = Infinity;
      let closestIndex = -1;

      SNAPPABLE_POSITIONS.forEach((pos, index) => {
        const dist = piecePos.distanceTo(pos);
        // Check if this position is free
        if (dist < minDist && !containerAssignmentsRef.current[index]) {
          minDist = dist;
          closestIndex = index;
        }
      });

      // Debugging
      console.group('Drag End Debug');
      console.log('Closest Index:', closestIndex);
      console.log('Minimum Distance:', minDist);
      console.log('Assignments:', containerAssignmentsRef.current);
      console.groupEnd();

      // Snap threshold: distance within which we will snap
      const snapThreshold = 3.0;

      if (closestIndex !== -1 && minDist < snapThreshold) {
        // If we found an open position within threshold, snap there
        const snapPos = SNAPPABLE_POSITIONS[closestIndex].clone();
        snapPos.y += 0.1; 
        snapPos.x += 0.1; 
        mesh.position.copy(snapPos);

        // Mark that position as occupied by this piece
        containerAssignmentsRef.current[closestIndex] = mesh;
        mesh.userData.containerIndex = closestIndex;
      } else {
        const emptyIndex = containerAssignmentsRef.current.findIndex(item => item === null && containerAssignmentsRef.current.indexOf(item) < 7);
        const defaultPos = SNAPPABLE_POSITIONS[emptyIndex].clone();
        mesh.position.copy(defaultPos);
      }

      // Count pieces at y = 1
      const piecesAtYOne = dragObjects.filter(obj => Math.abs(obj.position.y - 1) < 0.2).length;
      onDragEnd(piecesAtYOne);
    };

    // Add event listeners
    dragControlsRef.current.addEventListener('dragstart', onDragStart);
    dragControlsRef.current.addEventListener('dragend', handleOnDragEnd);

    // Cleanup
    return () => {
      if (dragControlsRef.current) {
        dragControlsRef.current.removeEventListener('dragstart', onDragStart);
        dragControlsRef.current.removeEventListener('dragend', handleOnDragEnd);
        dragControlsRef.current.dispose();
      }
    };
  }, [scene, camera, renderer, dragObjects, orbitControls]);

  return dragControlsRef.current;
};
