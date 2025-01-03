import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
      
      // Snap to grid
      event.object.position.x = Math.round(event.object.position.x);
      event.object.position.z = Math.round(event.object.position.z);
      
      // Keep height constant
      event.object.position.y = 1;
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
  }, [scene, camera, renderer, dragObjects, orbitControls]);

  return dragControlsRef.current;
};
