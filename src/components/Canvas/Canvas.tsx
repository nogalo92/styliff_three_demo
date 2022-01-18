import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Stats } from '@react-three/drei';
//import canvas wrapper
import { CanvasWrapper } from './Canvas.css';

const CanvasViewer = () => {
  return (
    <CanvasWrapper>
      <Canvas>
        <color attach="background" args={['white']} />
        <ambientLight intensity={0.3} />
        <pointLight color={'yellow'} />
        <PerspectiveCamera makeDefault position={[-9, 5, 10]} />
        <OrbitControls />
        <mesh>
          <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
          <meshStandardMaterial attach="material" color={'red'} />
        </mesh>
        <Stats />
      </Canvas>
    </CanvasWrapper>
  );
};

export default CanvasViewer;
