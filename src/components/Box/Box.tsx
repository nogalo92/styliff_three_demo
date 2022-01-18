import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';
//import types
import { GLTFResult } from './Box.types';

const BoxContainer = (props: JSX.IntrinsicElements['group']) => {
  const boxGroup = useRef<THREE.Group>();
  const childrenGroup = useRef<THREE.Group>();
  const { nodes } = useGLTF('/assets/mesh/boxContainer.glb') as unknown as GLTFResult;
  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wallFront = useRef<Mesh>(null!);
  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wallBack = useRef<Mesh>(null!);
  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wallLeft = useRef<Mesh>(null!);
  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wallRight = useRef<Mesh>(null!);
  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wallTop = useRef<Mesh>(null!);
  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wallBottom = useRef<Mesh>(null!);

  return (
    <group name="__root__">
      <group ref={boxGroup} {...props} dispose={null}>
        <mesh
          ref={wallBack}
          name={'wall_back'}
          geometry={nodes.plane_back.geometry}
          material={nodes.plane_back.material}
          position={[0, 0, -2]}
        />
        <mesh
          ref={wallLeft}
          name={'wall_left'}
          geometry={nodes.plane_left.geometry}
          material={nodes.plane_left.material}
          position={[-5, 0, 0]}
        />
        <mesh
          ref={wallRight}
          name={'wall_right'}
          geometry={nodes.plane_right.geometry}
          material={nodes.plane_right.material}
          position={[5, 0, 0]}
        />
        <mesh
          ref={wallTop}
          name={'wall_top'}
          geometry={nodes.plane_top.geometry}
          material={nodes.plane_top.material}
          position={[0, 2, 0]}
        />
        <mesh
          ref={wallBottom}
          name={'wall_bottom'}
          geometry={nodes.plane_bottom.geometry}
          material={nodes.plane_bottom.material}
          position={[0, -2, 0]}
        />
        <mesh
          ref={wallFront}
          name={'wall_front'}
          geometry={nodes.plane_front.geometry}
          material={nodes.plane_front.material}
          position={[0, 0, 2]}
        />
      </group>
      <group name="spheres_group" ref={childrenGroup}>
        {props.children}
      </group>
    </group>
  );
};

useGLTF.preload('/assets/mesh/boxContainer.glb');

export default BoxContainer;
