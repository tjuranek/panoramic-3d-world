import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Create a scene, camera, and renderer. The scene is the virtual world where
 * all objects are stored, the camera is the point of view of the user, and the
 * renderer is what renders the scene to the screen.
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

/**
 * Append the renderer to the DOM. The renderer is a canvas element, so we can
 * append it to the body.
 */
document.body.appendChild(renderer.domElement);

/**
 * Load the landscape image and turn it into a texture.
 */
const loader = new THREE.TextureLoader();
const texture = loader.load('texture.jpg');

/**
 * Create a sphere geometry and a material from the texture. Apply 
 * the material to a sphere mesh and add it to the scene.
 */
const geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

/**
 * Set up the camera inside of the sphere.
 */
camera.position.set(0, 0, 0.1);

/**
 * Set up the controls to allow the user to rotate the camera.
 */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = false;
controls.rotateSpeed = 0.3;

/**
 * Maintain the correct aspect ratio when the window is resized.
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

/**
 * Create an animation loop to continually update the scene
 * and render it to the screen. 
 */
let lastTime = 0;
const rotationSpeed = 0.00005;

function animate(time) {
  const delta = time - lastTime;
  lastTime = time;
  requestAnimationFrame(animate);

  sphere.rotation.y += rotationSpeed * delta;

  controls.update();
  renderer.render(scene, camera);
}

animate(0);