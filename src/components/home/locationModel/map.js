import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Map = ({setCurrentLocation}) => {
  const canvasRef = useRef(null);
  const [currObject, setCurrentObject] =  useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, 2, 0.2, 200);
    camera.position.set(3,2,0);
    // Camera pole (for rotation)
    const cameraPole = new THREE.Object3D();
    cameraPole.add(camera);
    scene.add(cameraPole);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: canvasRef.current,
    });
    renderer.shadowMap.enabled = true;
    //renderer.setSize(500, 500);
    renderer.setClearColor(0x000000, 0);

    //Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    // Lock vertical rotation between straight-on and slightly above
    controls.minPolarAngle = Math.PI / 6;   // look down at 45°
    controls.maxPolarAngle = Math.PI / 2.5;   // stop at flat/horizon
    
    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 2)); // soft ambient

    const loader = new GLTFLoader();
    loader.load('/terrainTestingOneV5.glb', (gltf) => {
      const blenderScene = gltf.scene;
      blenderScene.traverse((child) => {
        if (child.isMesh) {
          console.log(child.name); // prints your object names (e.g., "Continent_North")
          child.material.side = THREE.DoubleSide; // optional for visibility
        }
      });
      blenderScene.position.y = .5

      scene.add(blenderScene);
    });

    // Picker helper
    class PickerHelper {
      constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pickedObject = null;
        this.pickedObjectSavedColor = 0;
      }

      pick(normalizedPosition, scene, camera) {
        // restore old color
        if (this.pickedObject) {
          this.pickedObject.material.emissive.setHex(
            this.pickedObjectSavedColor
          );
          this.pickedObject.material.emissiveIntensity = 0
          this.pickedObject = null;
        }

        this.raycaster.setFromCamera(normalizedPosition, camera);
        const intersected = this.raycaster.intersectObjects(scene.children);

        if (intersected.length) {
          this.pickedObject = intersected[0].object;
          this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
          this.pickedObject.material.emissive.setHex(0xb0a03c);
          this.pickedObject.material.emissiveIntensity = 0.6
        }
      }

    }

    const pickPosition = { x: -100000, y: -100000 }; // offscreen default
    const pickerHelper = new PickerHelper();

    function getCanvasRelativePosition(event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((event.clientX - rect.left) * canvas.width) / rect.width,
        y: ((event.clientY - rect.top) * canvas.height) / rect.height,
      };
    }

    function setPickPosition(event) {
      const pos = getCanvasRelativePosition(event);
      pickPosition.x = (pos.x / canvas.width) * 2 - 1;
      pickPosition.y = (pos.y / canvas.height) * -2 + 1;
    }

    function clearPickPosition() {
      pickPosition.x = -100000;
      pickPosition.y = -100000;
    }

    function setPickObject() {
      
      if (pickerHelper.pickedObject && setCurrentLocation) {
        setCurrentObject(pickerHelper.pickedObject)
        setCurrentLocation(pickerHelper.pickedObject.name)
        //console.log(currObject)
      }
    }

    function resizeRendererToDisplaySize(renderer, camera) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
    }

    function printfov() {
        console.log(camera.zoom)
    }

    //window.addEventListener('resize', handleResize);
    window.addEventListener("mousemove", setPickPosition);
    window.addEventListener("mouseout", clearPickPosition);
    window.addEventListener("mouseleave", clearPickPosition);
    window.addEventListener("wheel", printfov)
    window.addEventListener("click", setPickObject)

    // Animation loop
    function render(time) {
      time *= 0.001;

        //cameraPole.rotation.y = time * 0.1;
        controls.update()
        pickerHelper.pick(pickPosition, scene, camera);

        resizeRendererToDisplaySize(renderer, camera)
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    // Cleanup
    return () => {
      renderer.dispose();
      window.removeEventListener("mousemove", setPickPosition);
      window.removeEventListener("mouseout", clearPickPosition);
      window.removeEventListener("mouseleave", clearPickPosition);
      window.removeEventListener("click", setPickObject);
      window.removeEventListener("wheel", printfov)
      
    };
  }, [setCurrentLocation]);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default Map;
