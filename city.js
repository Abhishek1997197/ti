import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function createCityScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10).normalize();
    scene.add(light);

    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50),
        new THREE.MeshBasicMaterial({ color: 0x666666 })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    function createBuilding(x, z, height) {
        const geometry = new THREE.BoxGeometry(2, height, 2);
        const material = new THREE.MeshStandardMaterial({ color: 0x8c8c8c });
        const building = new THREE.Mesh(geometry, material);
        building.position.set(x, height / 2, z);
        scene.add(building);
    }

    for (let i = -10; i <= 10; i += 4) {
        for (let j = -10; j <= 10; j += 4) {
            createBuilding(i, j, Math.random() * 5 + 3);
        }
    }

    camera.position.set(0, 10, 20);
    
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}

createCityScene();
