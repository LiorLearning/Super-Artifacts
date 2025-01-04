import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { HOLDER_POSITION } from './constants';

export const createHolder = (scene: THREE.Scene) => {
  const group = new THREE.Group();
  const textMeshes: THREE.Mesh[] = []; // Store text meshes for show/hide functionality

  // Load the font once (outside the loop)
  const fontLoader = new FontLoader();
  fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    for (let i = 0; i < 4; i++) {
      // 1) Create each cell as before
      const cellGeom = new THREE.BoxGeometry(1, 1, 1);
      const cellMat = new THREE.MeshPhongMaterial({
        color: 0xA0522D,
        transparent: true,
        opacity: 0.6,
      });

      const cellMesh = new THREE.Mesh(cellGeom, cellMat);
      cellMesh.position.set(HOLDER_POSITION[0], HOLDER_POSITION[1], i);
      group.add(cellMesh);

      // 2) Create the text geometry
      const textGeom = new TextGeometry(`1/4`, {
        font: font,
        size: 0.2,
        height: 0.02,
      });

      // 3) Create a material for the text
      const textMat = new THREE.MeshPhongMaterial({ color: 0x800080 });

      // 4) Create a mesh for the text geometry and position it
      const textMesh = new THREE.Mesh(textGeom, textMat);

      // Position the text above the cell and rotate it to face the other side
      textMesh.position.set(
        HOLDER_POSITION[0] - 1, // shift a bit so text is centered
        HOLDER_POSITION[1] + 0.5,  // above the box
        i
      );
      textMesh.rotateY(Math.PI / 2); // Rotate 180 degrees to face the other side
      textMesh.visible = false;

      group.add(textMesh);
      textMeshes.push(textMesh); // Store the text mesh
    }
  });

  scene.add(group);

  // Function to show/hide text
  const toggleTextVisibility = (visible: boolean) => {
    textMeshes.forEach(textMesh => {
      textMesh.visible = visible;
    });
  };

  return { group, toggleTextVisibility }; // Return the group and the toggle function
};
