import * as THREE from "https://unpkg.com/three@0.143.0/build/three.module.js?module";
import { GLTFLoader } from "https://unpkg.com/three@0.143.0/examples/jsm/loaders/GLTFLoader.js?module";
import { OrbitControls } from "https://unpkg.com/three@0.143.0/examples/jsm/controls/OrbitControls.js?module";
window.addEventListener(`DOMContentLoaded`, () => {
    const myCanvas = document.querySelector('#myCanvas');

    const scene = new THREE.Scene();
    scene.add(scene);


    const light = new THREE.DirectionalLight(0xffffff, 5)
    light.position.set(10000, 10000, 10000)
    scene.add(light)

    const lightss = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(-10000, 1000, 10000)
    scene.add(lightss)

    const spotLight = new THREE.SpotLight(0xffffff, 5, 100);
    spotLight.position.set(20, 10, 10);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    scene.add(spotLight);

    const lights = new THREE.PointLight(0xffffff, 2, 100000);
    lights.position.set(400,0, -10000);
    scene.add(lights);

    const camera = new THREE.PerspectiveCamera(
        30,
        myCanvas.offsetWidth / myCanvas.offsetHeight
    );
    camera.position.set(.1, .1, .1);
    camera.lookAt(scene.position);

    const loader = new GLTFLoader()
    loader.load('Camera.glb', function (glb) {
        console.log(glb)
        const root = glb.scene;
        root.scale.set(0.9, 0.9, 0.9)
        scene.add(root)
    }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded")
    }, function (error) {
        console.log("An error occurred")
    })

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: myCanvas,
    });
    renderer.setClearColor(0xffffff, 1.0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(myCanvas.offsetWidth, myCanvas.offsetHeight);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.maxPolarAngle = Math.PI * 1.5;
    controls.minDistance = 5.0;
    controls.maxDistance = 1000;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    renderer.setAnimationLoop(() => {

        controls.update();
        renderer.render(scene, camera);
    });
});


