import * as THREE from 'three';
import { COLORS } from './constants';

export const createHolder = (scene: THREE.Scene, position: [number, number, number], count: number) => {
  const group = new THREE.Group();
  const cellDepth = 4 / count;
  for (let i = 0; i < count; i++) {
    // 1) Create each cell as before
    const cellGeom = new THREE.BoxGeometry(1, 1, cellDepth);
    const cellMat = new THREE.MeshPhongMaterial({
      color: COLORS.BROWN,
      transparent: true,
      opacity: 0.6,
    });

    const cellMesh = new THREE.Mesh(cellGeom, cellMat);
    cellMesh.position.set(position[0], position[1], position[2] + i * cellDepth);
    group.add(cellMesh);
  }

  scene.add(group);

  return { group }; // Return the group and the toggle function
};
