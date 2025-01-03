import { useEffect } from 'react';

export const useWindowResize = ({ camera, renderer, mountRef }) => {
  useEffect(() => {
    const handleResize = () => {
      if (!camera || !renderer || !mountRef.current) return;
      
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, renderer, mountRef]);
};
