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

  /**
   * Instead of a boolean array, we’ll store the reference to 
   * whichever piece currently occupies a given position.
   * - If array cell is `null`, then that position is free.
   * - If array cell is a THREE.Mesh, that position is occupied by that mesh.
   */
  const containerAssignmentsRef = useRef<Array<THREE.Mesh | null>>(
    new Array(11).fill(null)
  );

  /**
   * Note: If you only want to snap to the last 4 positions (the “container”),
   * feel free to adjust the code logic or the threshold checks below.
   */
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
    const onDragEnd = (event: { object: THREE.Object3D }) => {
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
        const sphereGeometry = new THREE.SphereGeometry(0.05, 8, 8);
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
        // If no suitable snap cell found, you can define "fallback" logic here:
        // 1) Return it to some default position, or
        // 2) Leave it where the user dropped it. (Your preference)
        //
        // Below is an example to push it back to some default:
        const defaultPos = new THREE.Vector3(0, 2, 0);
        mesh.position.copy(defaultPos);
      }
    };

    // Add event listeners
    dragControlsRef.current.addEventListener('dragstart', onDragStart);
    dragControlsRef.current.addEventListener('dragend', onDragEnd);

    // Cleanup
    return () => {
      if (dragControlsRef.current) {
        dragControlsRef.current.removeEventListener('dragstart', onDragStart);
        dragControlsRef.current.removeEventListener('dragend', onDragEnd);
        dragControlsRef.current.dispose();
      }
    };
  }, [scene, camera, renderer, dragObjects, orbitControls]);

  return dragControlsRef.current;
};
