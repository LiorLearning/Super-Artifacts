import * as THREE from 'three';

export const createHolder = (scene) => {
  const holderGeometry = new THREE.BoxGeometry(4, 0.2, 1);
  const holderMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xcccccc,
    transparent: true,
    opacity: 0.8
  });
  const holder = new THREE.Mesh(holderGeometry, holderMaterial);
  holder.position.y = 0;
  scene.add(holder);
  return holder;
};
