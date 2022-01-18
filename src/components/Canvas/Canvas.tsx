import { Suspense, useState } from 'react';
//import threejs related modules
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Stats } from '@react-three/drei';
//import canvas wrapper
import { CanvasWrapper } from './Canvas.css';
//import custom components
import Box from '../Box/Box';

const CanvasViewer = () => {
  const [dimensions, setDimension] = useState<number[]>([0, 0, 0]);

  const handleDimensions = (value: number[]) => {
    setDimension(value);
  };
  return (
    <CanvasWrapper>
      <Canvas>
        <color attach="background" args={['black']} />
        <ambientLight intensity={0.5} />
        <pointLight color={'yellow'} />
        <directionalLight color={'red'} position={[-10, 10, 10]} castShadow />
        <directionalLight color={'red'} position={[10, -10, -10]} castShadow />
        <PerspectiveCamera makeDefault position={[-9, 5, 10]} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Box setDimensions={handleDimensions}></Box>
        </Suspense>
        <Stats />
      </Canvas>
    </CanvasWrapper>
  );
};

export default CanvasViewer;
