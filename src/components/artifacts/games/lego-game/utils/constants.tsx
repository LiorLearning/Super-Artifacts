import * as THREE from 'three';

export const HOLDER_POSITION: [number, number, number] = [-2, 0, 0];

export const SNAPPABLE_POSITIONS = [
  new THREE.Vector3(0, 1, -2),
  new THREE.Vector3(0, 1, -4),
  new THREE.Vector3(2, 1, 0),
  new THREE.Vector3(2, 1, -2),
  new THREE.Vector3(2, 1, -4),
  new THREE.Vector3(4, 1, -2),
  new THREE.Vector3(4, 1, 0),
  new THREE.Vector3(4, 1, 2),
  new THREE.Vector3(HOLDER_POSITION[0], HOLDER_POSITION[1], HOLDER_POSITION[2]),
  new THREE.Vector3(HOLDER_POSITION[0], HOLDER_POSITION[1], HOLDER_POSITION[2] + 1),
  new THREE.Vector3(HOLDER_POSITION[0], HOLDER_POSITION[1], HOLDER_POSITION[2] + 2),
  new THREE.Vector3(HOLDER_POSITION[0], HOLDER_POSITION[1], HOLDER_POSITION[2] + 3),
];

export const COLORS = {
  PINK: 0xff69b4, // Hot Pink
  BLUE: 0x1e90ff, // Dodger Blue
  PURPLE: 0x800080, // Purple
  GREEN: 0x66ff66, // Light Green
  BROWN: 0xA0522D, // Sienna
  RED: 0xFF0000, // Pure Red
  ORANGE: 0xFFA500, // Orange
  YELLOW: 0xFFFF00, // Yellow
  CYAN: 0x00FFFF, // Cyan
  MAGENTA: 0xFF00FF, // Magenta
  WHITE: 0xffffff, // White
};

export const DURATION = 5000;