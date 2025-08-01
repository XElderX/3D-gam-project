import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from './src/libs/stats.module.js';
import g, {GUI} from 'three/addons/libs/lil-gui.module.min.js';    

const gui = new GUI();
gui.domElement.id = 'gui';

const stats = new Stats();
stats.dom.id = 'stats';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x111111);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.dom);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

const sun = new THREE.DirectionalLight();
sun.position.set(1, 2, 3);
scene.add(sun);

const ambientLight = new THREE.AmbientLight(0x404040);
ambientLight.intensity = 0.5;
scene.add(ambientLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();
  stats.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {   
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const folder = gui.addFolder('Cube');
    folder.add(cube.position, 'x', -2, 2, 0.1).name('X Position');
    folder.addColor(cube.material, 'color');

    