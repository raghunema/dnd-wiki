import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import './character.css'

const Character = ({character}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Initialize Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
          antialias: true, 
          alpha: true,
          canvas: canvasRef.current 
        });
        renderer.setSize(500, 500); // Adjust canvas size as needed

        // Add lighting
        const light = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(light);

        // Load model (or placeholder cube for now)
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // const loader = new GLTFLoader();
        // loader.load(model, (gltf) => {
        //   scene.add(gltf.scene);
        // });

        camera.position.z = 2;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            // cube.rotation.x += 0.01;
            cube.rotation.y += 0.005;
            renderer.render(scene, camera);
        };

        animate();

        // Clean up on unmount
        return () => {
        renderer.dispose();
        };
    }, []); //need to add model here

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <canvas ref={canvasRef}></canvas>
      <h1>{character.name}</h1>
      <h2>{character.information}</h2>
    </div>
  );
};

export default Character