import * as THREE from 'three';
import { COLORS } from './constants';

export const createPlatform = () => {
  const geometry = new THREE.BoxGeometry(1.1, 0.1, 1);
  const material = new THREE.MeshStandardMaterial({ 
    color: COLORS.LIGHT_YELLOW,
    metalness: 0.4,  // Very metallic
    roughness: 0.1,  // Very smooth/shiny
    transparent: false,
    opacity: 1,
  });
  const piece = new THREE.Mesh(geometry, material);
  piece.name = 'Platform';

  // Enable shadow casting and receiving
  piece.castShadow = true;
  piece.receiveShadow = true;

  return piece;
};

