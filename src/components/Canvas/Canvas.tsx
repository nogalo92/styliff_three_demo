import { Suspense, useState } from 'react';
import { Group } from 'three';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Stats } from '@react-three/drei';

import { CanvasWrapper } from './Canvas.css';
import Box from '../Box/Box';
import Sphere from '../Sphere/Sphere';
import Slider from '../helpers/Slider/Slider';

const CanvasViewer = () => {
  //box dimensions state
  const [dimensions, setDimension] = useState<number[]>([0, 0, 0]);
  //walls (obstacles) group state
  const [wallsGroup, setWalls] = useState<Group>(null!);
  const [isReady, setIsReady] = useState(false);

  const [numberOfSpheres, setNumberOfSpheres] = useState(500);

  const handleDimensions = (value: number[]) => {
    setDimension(value);
    setIsReady(true);
  };

  const handleNumberOfSpheres = (value: number) => {
    setNumberOfSpheres(value);
  };
  return (
    <CanvasWrapper>
      <Slider
        numberOfSpheres={numberOfSpheres}
        setNumberOfSpheres={handleNumberOfSpheres}
      />
      <Canvas>
        <color attach="background" args={['black']} />
        <ambientLight intensity={0.5} />
        <pointLight color={'yellow'} />
        <directionalLight color={'red'} position={[-10, 10, 10]} castShadow />
        <directionalLight color={'red'} position={[10, -10, -10]} castShadow />
        <PerspectiveCamera makeDefault position={[-9, 5, 10]} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Box setDimensions={handleDimensions} setWalls={setWalls}>
            {isReady && (
              <Sphere
                numberOfSpheres={numberOfSpheres}
                dimensions={dimensions}
                wallsGroup={wallsGroup}
              />
            )}
          </Box>
        </Suspense>
        <Stats />
      </Canvas>
    </CanvasWrapper>
  );
};

export default CanvasViewer;
