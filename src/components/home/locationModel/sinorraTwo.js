import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const SinorraTwo = ({ modelPath }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.shadowMap.enabled = true;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background

        // Clear any existing canvas and append the new renderer's canvas
        canvasRef.current.innerHTML = "";
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

        const loader = new GLTFLoader();
        let model;

        loader.load(
            modelPath,
            (gltf) => {
                model = gltf.scene;

                model.traverse((child) => {
                    if (child.isMesh) child.castShadow = true;
                });

                scene.add(model);
                console.log(model);

                model.scale.set(0.75, 0.75, 0.75);
                model.position.y = 0;
            },
            undefined,
            (error) => console.error("Error loading model:", error)
        );

        // Position the camera above the model and point it downwards
        camera.position.set(0, 4, 0); // Adjust the Y position to be above the model
        camera.lookAt(0, 0, 0); // Point the camera at the origin
        controls.update();

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        //Adding functionality to select objects
        const raycaster = new THREE.Raycaster();
        window.addEventListener("mousemove", onMouseMovement);

        let lastMoveTime = 0;
        const throttleTime = 50;
        let lastSelectedObj = null;

        function onMouseMovement(event) {
            const currTime = Date.now();
            if (currTime - lastMoveTime < throttleTime) return;
            lastMoveTime = currTime;

            const coords = new THREE.Vector2(
                ((event.clientX / window.innerWidth) * 2) - 1,
                -(((event.clientY / window.innerHeight) * 2) - 1)
            );

            raycaster.setFromCamera(coords, camera);

            const intersections = raycaster.intersectObjects(scene.children, true);

            if (intersections.length > 0) {
                const selectedObj = intersections[0].object;
                console.log(`${selectedObj.name} was chosen`);

                if (lastSelectedObj && lastSelectedObj !== selectedObj) {
                    if (lastSelectedObj.name === 'Town_Icon') {
                        lastSelectedObj.scale.set(0.05, 0.05, 0.05);
                    } else {
                        lastSelectedObj.scale.set(1, 1, 1);
                    }
                }
                
                if (lastSelectedObj && lastSelectedObj.name === 'Town_Icon') {
                    lastSelectedObj.scale.set(0.06, 0.06, 0.06);
                }
                lastSelectedObj = selectedObj;
            } else if (lastSelectedObj) {
                if (lastSelectedObj.name === 'Town_Icon') {
                    lastSelectedObj.scale.set(0.05, 0.05, 0.05);
                } else {
                    lastSelectedObj.scale.set(1, 1, 1);
                }
                lastSelectedObj = null;
            }
    
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMovement);
            renderer.dispose();
            if (model) scene.remove(model);
            scene.clear();
        };
    }, [modelPath]);

    return <div ref={canvasRef} style={{ width: '70%', height: '70%' }}></div>; // The div element that will contain the canvas
}

export default SinorraTwo;