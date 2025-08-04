import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "../src/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { World } from "./world.js";

const gui = new GUI();
gui.domElement.id = "gui";

const stats = new Stats();
stats.dom.id = "stats";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x111111);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.dom);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 2, 10);

const controls = new OrbitControls(camera, renderer.domElement);

const world = new World(10, 10);
scene.add(world);

const sun = new THREE.DirectionalLight();
sun.intensity = 3;
sun.position.set(1, 2, 3);
scene.add(sun);

const ambientLight = new THREE.AmbientLight(0x404040);
ambientLight.intensity = 0.5;
scene.add(ambientLight);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

function animate() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  controls.update();
  stats.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const worldFolder = gui.addFolder("World");
console.log(world.terrain);
const widthController = worldFolder.add(world, "width", 1, 20, 1).name("Width");
const heightController = worldFolder
  .add(world, "height", 1, 20, 1)
  .name("Height");
worldFolder.addColor(world.material, "color").name("Color");

widthController.onChange(() => {
  world.createTerrain();
  world.createTrees();
});

heightController.onChange(() => {
  world.createTerrain();
  world.createTrees();
});
