import { Mesh } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

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
