import * as THREE from 'three';
import { HOLDER_POSITION } from '../constants';

export const createHolder = (scene: THREE.Scene) => {
  const group = new THREE.Group();

  for (let i = 0; i < 4; i++) {
    const cellGeom = new THREE.BoxGeometry(1, 1, 1);
    const cellMat = new THREE.MeshPhongMaterial({
      color: 0xe28840,
      transparent: true,
      opacity: 0.4,
    });

    const cellMesh = new THREE.Mesh(cellGeom, cellMat);
    cellMesh.position.set(HOLDER_POSITION[0], HOLDER_POSITION[1], i);
    group.add(cellMesh);
  }

  scene.add(group);
  return group;
};
