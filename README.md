# React Three Demo Project

## Project Overview

This project is created as a demo for a Styliff Tech, as a part of interview.

Project represent the objects of the same shape (Spheres) bouncing around in the confided space (Box).

Project includes:

- Box Container component (external GLB file)
- Sphere Component to create instances of spheres
- Basic algorithm for calculating the dimensions (bounding box) of the loaded external file.
- Basic algorithm for detecting the collisions between the Box and the Spheres

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Dependencies

Project is relying on the following dependencies:

- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)

- [@react-three/drei](https://docs.pmnd.rs/drei/introduction)

- [three](https://threejs.org/docs/#manual/en/introduction/Installation)

## TODO

1. Add slider to control number of spheres
2. Add collision detection between the spheres
3. Add effect upon collision
4. Add tests
5. Dockerize
