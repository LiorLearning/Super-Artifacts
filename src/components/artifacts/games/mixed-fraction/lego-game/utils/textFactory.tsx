import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { COLORS } from './constants';


const getOrthogonalVector = (position: [number, number, number] | THREE.Vector3) => {
  const pos = Array.isArray(position) ? position : [position.x, position.y, position.z];
  return new THREE.Vector3(pos[0] + 1, pos[1] + 1, pos[2] + 1);
}

export const createText = (
  scene: THREE.Scene, 
  position: [number, number, number], 
  value: string, 
  options: {
    textColor?: number,
    bgColor?: number,
    orientation?: 'axial' | 'orthogonal' | 'top',
    size?: number,
    offset?: [number, number, number],
    centered?: boolean
  } = {}
) => {
  if (!scene) return null;

  const textGroup = new THREE.Group();

  const fontLoader = new FontLoader();
  
  fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeom = new TextGeometry(value, {
      font: font,
      size: options.size || 0.2,
      height: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 3
    });

    // Determine rotation based on orientation
    const rotations = {
      axial: new THREE.Euler(0, Math.PI / 2, 0),
      top: new THREE.Euler(0, 0, 0)
    };
    const selectedOrientation = options.orientation || 'axial';

    // Option 1: Colored font, no background
    if (options.textColor !== undefined && !options.bgColor) {
      const textMat = new THREE.MeshPhongMaterial({ 
        color: options.textColor 
      });
      const textMesh = new THREE.Mesh(textGeom, textMat);
      textMesh.position.set(position[0], position[1], position[2]);
      
      if (selectedOrientation === 'orthogonal') {
        textMesh.lookAt(getOrthogonalVector(position));
      } else {
        textMesh.rotation.copy(rotations[selectedOrientation]);
      }
      
      textGroup.add(textMesh);
    } 
    // Option 2: White font with colored background and white border
    else if (options.bgColor !== undefined) {
      const textMat = new THREE.MeshPhongMaterial({ 
        color: 0xffffff 
      });
      const bgMat = new THREE.MeshPhongMaterial({ 
        color: options.bgColor 
      });
      const borderMat = new THREE.MeshPhongMaterial({ 
        color: 0x000000 
      });

      // Compute text geometry dimensions
      textGeom.computeBoundingBox();
      const textWidth = textGeom.boundingBox!.max.x - textGeom.boundingBox!.min.x;
      const textHeight = textGeom.boundingBox!.max.y - textGeom.boundingBox!.min.y;

      // Create background with slightly larger dimensions
      const bgWidth = textWidth + 0.4;
      const bgHeight = textHeight + 0.4;
      const bgGeom = new THREE.BoxGeometry(bgWidth, bgHeight, 0.04);
      const bgMesh = new THREE.Mesh(bgGeom, bgMat);

      // Create border with slightly larger dimensions
      const borderWidth = bgWidth + 0.05;
      const borderHeight = bgHeight + 0.05;
      const borderGeom = new THREE.BoxGeometry(borderWidth, borderHeight, 0.02);
      const borderMesh = new THREE.Mesh(borderGeom, borderMat);

      // Create text mesh
      const textMesh = new THREE.Mesh(textGeom, textMat);

      // Apply position with optional offset
      const finalPosition = [
        position[0] + (options.offset?.[0] || 0),
        position[1] + (options.offset?.[1] || 0),
        position[2] + (options.offset?.[2] || 0)
      ];

      // Center the text within the background
      textGeom.computeBoundingBox();
      const centerOffset = new THREE.Vector3();
      textGeom.boundingBox!.getCenter(centerOffset);
      textGeom.translate(-centerOffset.x+0.01, -centerOffset.y+0.01, -centerOffset.z+0.01);

      // Position elements
      borderMesh.position.set(finalPosition[0], finalPosition[1], finalPosition[2]);
      bgMesh.position.set(finalPosition[0], finalPosition[1], finalPosition[2] + 0.01);
      textMesh.position.set(finalPosition[0], finalPosition[1], finalPosition[2] + 0.02);
      
      // Rotate based on orientation
      if (selectedOrientation === 'orthogonal') {
        textMesh.lookAt(getOrthogonalVector(position));
        bgMesh.lookAt(getOrthogonalVector(position));
        borderMesh.lookAt(getOrthogonalVector(position));
      } else {
        textMesh.rotation.copy(rotations[selectedOrientation]);
        bgMesh.rotation.copy(rotations[selectedOrientation]);
        borderMesh.rotation.copy(rotations[selectedOrientation]);
      }

      // Add all elements to group
      textGroup.add(borderMesh);
      textGroup.add(bgMesh);
      textGroup.add(textMesh);
    }
    // Default: Purple text if no options provided
    else {
      const textMat = new THREE.MeshPhongMaterial({ 
        color: COLORS.PURPLE 
      });
      const textMesh = new THREE.Mesh(textGeom, textMat);
      textMesh.position.set(position[0], position[1], position[2]);
      
      if (selectedOrientation === 'orthogonal') {
        textMesh.lookAt(getOrthogonalVector(position));
      } else {
        textMesh.rotation.copy(rotations[selectedOrientation]);
      }
      
      textGroup.add(textMesh);
    }

    // Add the group to the scene
    scene.add(textGroup);
  });

  return textGroup;
};
