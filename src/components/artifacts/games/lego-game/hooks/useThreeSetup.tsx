import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createHolder } from '../utils/holderFactory';
import { setupLights } from '../utils/lightSetup';

interface ThreeSetup {
  scene: THREE.Scene | null;
  camera: THREE.OrthographicCamera | null;
  renderer: THREE.WebGLRenderer | null;
  orbitControls: OrbitControls | null;
}

export const useThreeSetup = (mountRef: React.RefObject<HTMLDivElement>, hasInitialized: React.MutableRefObject<boolean>): ThreeSetup => {
  const [setup, setSetup] = useState<ThreeSetup>({
    scene: null,
    camera: null,
    renderer: null,
    orbitControls: null
  });

  useEffect(() => {
    if (!mountRef.current || hasInitialized.current) return;
    hasInitialized.current = true;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera setup
    const camera = new THREE.OrthographicCamera(
      -5, 5, 3.5, -3,
      0.1, 1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Add lights
    setupLights(scene);

    // Add holder
    createHolder(scene);

    // Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableRotate = false;
    orbitControls.enableZoom = false;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    setSetup({ scene, camera, renderer, orbitControls });

    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return setup;
};