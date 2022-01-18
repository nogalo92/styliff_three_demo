import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import { InstancedMesh, Object3D, Vector3, Matrix4, Mesh } from 'three';
//import types
import { SphereProps } from './Sphere.types';
//temp Object3D object used for setting up instances od the sphere
const tempSpheres = new Object3D();
//founction for calculating random int value from the given interval
const randomIntFromInterval = (min: number, max: number) => {
  let result = Math.floor(Math.random() * (max - min) + min);
  return result === 0 ? (result = 1) : result;
};
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
  //velocities of the sphere instances
  const velocities: Vector3[] = [];
  //vector3 for storing new positions
  const position = new Vector3();
  //matrix for storing position transformations
  const matrix = new Matrix4();
  //array of walls (obstacles)
  const wallsArray: Mesh[] = [];

  //for number of spheres defined
  //calculate starting velocities and push into the array
  useMemo(() => {
    for (let i = 0; i < props.numberOfSpheres; i++) {
      const velocity = new Vector3(
        //get random velocities values for X, Y and Z component
        (Math.random() / 30) * randomIntFromInterval(-3, 3),
        (Math.random() / 30) * randomIntFromInterval(-3, 3),
        (Math.random() / 30) * randomIntFromInterval(-3, 3),
      );
      //push vectors to the velocities array
      velocities.push(velocity);
    }
  }, [props.numberOfSpheres]);

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
    //go through the walls (obstacles) and update the matrix for accurate calculations
    props.wallsGroup.traverse((wall) => {
      if (wall instanceof Mesh) {
        wall.updateMatrixWorld();
        wall.geometry.boundingBox?.applyMatrix4(wall.matrixWorld);
        //push wall to the wallsArray for calculating intersections between spheres and walls
        wallsArray.push(wall);
      }
    });
  }, []);

  //each frame update the position of the the sphere instances by adding velocities for the instance
  useFrame(() => {
    for (let i = 0; i < props.numberOfSpheres; i++) {
      //get sphere instance matrix and store it
      instance.current.getMatrixAt(i, matrix);
      //create position array
      position.setFromMatrixPosition(matrix);
      //add velocities (vector) to the position
      position.add(velocities[i]);
      //set new positions into the sphere instance matrix
      matrix.setPosition(position);
      instance.current.setMatrixAt(i, matrix);
      //compute bounding box for the instance
      instance.current.geometry.computeBoundingBox();
      //get bounding box
      const sphereBox = instance.current.geometry.boundingBox;
      //apply transformed matrix to the sphere (to follow the position change properly)
      sphereBox?.applyMatrix4(matrix);
      //for each wall check if the sphere bounding box intersects wall bounding box
      for (const wall of wallsArray) {
        const wallBox = wall.geometry.boundingBox;
        //if the bounding boxes intersect
        //check for the wall name (detect on which wall intersection occured)
        //depending on which wall the collision is detected switch the velocity component to opposite direction
        //front and back walls -> z component of velocity
        //right and left walls -> x component of velocity
        //top and back bottom -> y component of velocity
        if (sphereBox?.intersectsBox(wallBox!)) {
          /*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
          switch (wall.name) {
            case 'wall_front':
              velocities[i].z *= -1;
              break;
            case 'wall_back':
              velocities[i].z *= -1;
              break;
            case 'wall_right':
              velocities[i].x *= -1;
              break;
            case 'wall_left':
              velocities[i].x *= -1;
              break;
            case 'wall_top':
              velocities[i].y *= -1;
              break;
            case 'wall_bottom':
              velocities[i].y *= -1;
              break;
          }
        }
      }
    }
    instance.current.instanceMatrix.needsUpdate = true;
  });

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
