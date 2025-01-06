import * as THREE from 'three';

export const setupLights = (scene: THREE.Scene) => {
  const lights = new THREE.Group();

  // Bright white directional light with high intensity
  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(2, 50, 2);
  mainLight.castShadow = true;
  mainLight.intensity = 2; // Increased intensity for brightness
  lights.add(mainLight);

  // Bright ambient light for overall illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  lights.add(ambientLight);

  // Point lights for text illumination
  const textPositions = [
    [-2, 2, 3],        // Central position covering most text areas
    [0, 4, 5],         // Higher elevated position
    [-5, 3, 6]         // Offset position to ensure full coverage
  ];

  textPositions.forEach(pos => {
    const pointLight = new THREE.RectAreaLight(0xffffff, 0.5, 10, 20);
    pointLight.position.set(pos[0] + 2, pos[1] + 2, pos[2] + 2);
    lights.add(pointLight);
  });

  scene.add(lights);
  return lights;
};