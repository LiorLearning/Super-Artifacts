import * as THREE from 'three';
import { COLORS } from './constants';

export const createLegoPiece = (color: number) => {
  const geometry = new THREE.BoxGeometry(0.9, 1, 0.9);
  const material = new THREE.MeshPhongMaterial({ 
    color,
    transparent: true,
    opacity: 0.9
  });
  const piece = new THREE.Mesh(geometry, material);

  // Add stud on top
  const studGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.2, 16);
  const studMaterial = new THREE.MeshPhongMaterial({ color: COLORS.WHITE });
  const stud = new THREE.Mesh(studGeometry, studMaterial);
  stud.position.y = 0.6;
  piece.add(stud);

  return piece;
};