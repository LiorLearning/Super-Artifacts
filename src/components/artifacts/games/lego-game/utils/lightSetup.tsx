import * as THREE from 'three';

export const setupLights = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Adjusted intensity for a softer natural light
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Adjusted intensity for a more natural effect
  directionalLight.position.set(-10, 20, -10);
  directionalLight.target.position.set(0, 0, 0);
  scene.add(directionalLight);
  scene.add(directionalLight.target);

  return { ambientLight, directionalLight };
};