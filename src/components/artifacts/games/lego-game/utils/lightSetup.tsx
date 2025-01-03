import * as THREE from 'three';

export const setupLights = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0xffff00, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffff00, 1);
  directionalLight.position.set(-10, 20, -10);
  directionalLight.target.position.set(0, 0, 0);
  scene.add(directionalLight);
  scene.add(directionalLight.target);

  return { ambientLight, directionalLight };
};