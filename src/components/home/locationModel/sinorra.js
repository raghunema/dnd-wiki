import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TextureLoader,  DirectionalLightHelper, DirectionalLightShadow} from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const Sinorra = ({ modelPath, normalMapPath }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    // renderer.setSize(1000, 1000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background

    canvasRef.current.innerHTML = ""; // Clear any existing canvas
    canvasRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    directionalLight.castShadow = true;
    renderer.shadowMap.enabled = true;

    const textureLoader = new TextureLoader();
    const normalMap = textureLoader.load(normalMapPath, (texture) => {
        texture.flipY = false; // Flip the Y-axis of the normal map
    });

    const loader = new GLTFLoader();
    let model;

    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;

        model.traverse((child) => {
            if (child.isMesh) child.castShadow = true; 

            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                // map: child.material.map || null,Preserve original texture if exists
                color: 0xffffff,
                normalMap: normalMap || null, // Apply normal map
                roughness: 0.8,
                metalness: 0.1,
                });
            }
        });

        scene.add(model); 


        model.scale.set(0.75, 0.75, 0.75);
        model.position.y = 0;
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    camera.position.set(0, 4, 0);
    camera.lookAt(0, 0, 0)
    controls.update()

    // ✅ Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);
        //if (model) model.rotation.y += 0.001; Rotate model for visibility
        controls.update();

        renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      renderer.dispose();
      if (model) scene.remove(model);
      scene.clear();
    };
  }, [modelPath, normalMapPath]);

  return (

      <div ref={canvasRef}></div>
  );
};

export default Sinorra;
