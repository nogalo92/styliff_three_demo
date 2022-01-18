import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';
//import types
import { GLTFResult, BoxProps } from './Box.types';

const Box = (props: BoxProps) => {
  //reference to the mesh group that contains the box parts (wals)
  const boxGroup = useRef<THREE.Group>(null!);
  //reference to the children passed to the box component
  const childrenGroup = useRef<THREE.Group>();
  //list of nodes from the gltf file
  const { nodes } = useGLTF('/assets/mesh/boxContainer.glb') as unknown as GLTFResult;

  //Calculate the width depth and height of the loaded mesh (compound bounding box).
  //Algorithm goes through each mesh, takes min and max values from it's bounding box
  //and finds the most min from the min values, and most max from the max values
  //effectively constracting the compound bounding box of the whole mesh
  useEffect(() => {
    //starting values of the min and max
    let absoluteMinX = 0,
      absoluteMaxX = 0,
      absoluteMinY = 0,
      absoluteMaxY = 0,
      absoluteMinZ = 0,
      absoluteMaxZ = 0,
      box_width = 0,
      box_height = 0,
      box_depth = 0;
    //traverse through all meshes from the GLTF (6 parts/walls)
    boxGroup.current?.traverse((child) => {
      //include only Mesh type
      if (child instanceof Mesh) {
        //compute bounding box so we can use calculation
        child.geometry.computeBoundingBox();
        //find most min and most max of point from child bounding boxes
        absoluteMinX = Math.min(absoluteMinX, child.geometry.boundingBox.min.x);
        absoluteMaxX = Math.max(absoluteMaxX, child.geometry.boundingBox.max.x);
        absoluteMinY = Math.min(absoluteMinY, child.geometry.boundingBox.min.y);
        absoluteMaxY = Math.max(absoluteMaxY, child.geometry.boundingBox.max.y);
        absoluteMinZ = Math.min(absoluteMinZ, child.geometry.boundingBox.min.z);
        absoluteMaxZ = Math.max(absoluteMaxZ, child.geometry.boundingBox.max.z);
        //get width height and depth from the min and max values
        box_width = absoluteMaxX - absoluteMinX;
        box_height = absoluteMaxY - absoluteMinY;
        box_depth = absoluteMaxZ - absoluteMinZ;
      }
    });
    //set dimensions state
    props.setDimensions([box_width, box_height, box_depth]);
    props.setWalls(boxGroup.current);
  }, []);

  return (
    <group name="__root__">
      <group ref={boxGroup} {...props} dispose={null}>
        <mesh
          name={'wall_back'}
          geometry={nodes.plane_back.geometry}
          material={nodes.plane_back.material}
          position={[0, 0, -2]}
        />
        <mesh
          name={'wall_left'}
          geometry={nodes.plane_left.geometry}
          material={nodes.plane_left.material}
          position={[-5, 0, 0]}
        />
        <mesh
          name={'wall_right'}
          geometry={nodes.plane_right.geometry}
          material={nodes.plane_right.material}
          position={[5, 0, 0]}
        />
        <mesh
          name={'wall_top'}
          geometry={nodes.plane_top.geometry}
          material={nodes.plane_top.material}
          position={[0, 2, 0]}
        />
        <mesh
          name={'wall_bottom'}
          geometry={nodes.plane_bottom.geometry}
          material={nodes.plane_bottom.material}
          position={[0, -2, 0]}
        />
        <mesh
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

export default Box;
