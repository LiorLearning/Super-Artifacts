import * as THREE from 'three';

export const setupLights = (scene: THREE.Scene) => {
  const lights = new THREE.Group();

  // Main directional light for shadows and depth
  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(0.5, 8, -5);
  mainLight.castShadow = true;
  lights.add(mainLight);

  // Add ambient light with low intensity for better contrast
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  lights.add(ambientLight);

  scene.add(lights);
  return lights;
};