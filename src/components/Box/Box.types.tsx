import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Group } from 'three';

export type GLTFResult = GLTF & {
  nodes: {
    plane_bottom: THREE.Mesh;
    plane_front: THREE.Mesh;
    plane_back: THREE.Mesh;
    plane_left: THREE.Mesh;
    plane_right: THREE.Mesh;
    plane_top: THREE.Mesh;
  };
  materials: {
    ['default']: THREE.MeshStandardMaterial;
  };
};

export type BoxProps = {
  children?: React.ReactNode;
  setDimensions: (value: number[]) => void;
};
