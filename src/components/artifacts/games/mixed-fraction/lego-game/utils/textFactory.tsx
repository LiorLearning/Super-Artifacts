import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export const createText = (scene: THREE.Scene, position: [number, number, number], value: string, angle: number) => {
  const fontLoader = new FontLoader();
  
  fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeom = new TextGeometry(value, {
      font: font,
      size: 0.2,
      height: 0.02,
    });

    const textMat = new THREE.MeshPhongMaterial({ color: 0x800080 });
    const textMesh = new THREE.Mesh(textGeom, textMat);

    textMesh.position.set(position[0], position[1], position[2]);
    textMesh.rotateY(angle); // Rotate based on the provided angle

    scene.add(textMesh);
  });
};
