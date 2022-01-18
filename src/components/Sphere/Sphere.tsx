import { useRef, useEffect } from 'react';
import { InstancedMesh, Object3D } from 'three';
//import types
import { SphereProps } from './Sphere.types';
//temp Object3D object used for setting up instances od the sphere
const tempSpheres = new Object3D();

//founction for calculating random float value from the given interval
const randomFloatFromInterval = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
//founction for calculating random value from the given dimension
const randomPositionWithinParent = (dimension: number, padding: number) => {
  return (Math.random() * 2 - 1) * (dimension / 2 - padding);
};

const Sphere = (props: SphereProps) => {
  //reference to the instancedMesh
  const instance = useRef<InstancedMesh>(null!);
  //min and max size of the sphere
  const minSize = 0.1;
  const maxSize = 2;
  //padding (constrain spheres to go through the box container)
  const padding = 0.2;

  //for the number of spheres defined set position and scale of the Object3D and apply it to its matrix
  //use Object3D matrix to set the instance matrix to position and scale the instance of sphere
  useEffect(() => {
    for (let i = 0; i < props.numberOfSpheres; i++) {
      tempSpheres.position.set(
        //get random X, Y and Z values within the box container dimensions
        randomPositionWithinParent(props.dimensions[0], padding),
        randomPositionWithinParent(props.dimensions[1], padding),
        randomPositionWithinParent(props.dimensions[2], padding),
      );
      //get random scale
      const sf = randomFloatFromInterval(minSize, maxSize);
      //set scale
      tempSpheres.scale.set(sf, sf, sf);
      //update object3D matrix
      tempSpheres.updateMatrix();
      //set sphere instance matrix
      instance.current.setMatrixAt(i, tempSpheres.matrix);
    }
    instance.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh
      ref={instance}
      name="instancedMesh"
      args={[undefined, undefined, props.numberOfSpheres]}
    >
      <sphereBufferGeometry attach="geometry" args={[0.1]}></sphereBufferGeometry>
      <meshStandardMaterial attach="material" color={'green'} />
    </instancedMesh>
  );
};

export default Sphere;
