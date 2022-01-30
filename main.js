import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const render = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

render.setPixelRatio(window.devicePixelRatio);
render.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

render.render(scene, camera);

//const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
//const material = new THREE.MeshStandardMaterial({
//  color: 0xFF6347
//})
//const torus = new THREE.Mesh(geometry, material)

//scene.add(torus)

// LIGHTS

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// Temporary Light Helper to see the position of the light
//const lightHelper = new THREE.PointLightHelper(pointLight)
//scene.add(lightHelper)

const controls = new OrbitControls(camera, render.domElement)

/**
 * Adds a starto a random position
 */
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  // randomly create the position in 3d space
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

//add 200 stars to the field
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("images/space.jpeg");
scene.background = spaceTexture;

// Moon components
const moonTexture = new THREE.TextureLoader().load("images/moon.jpeg");
const normalTexture = new THREE.TextureLoader().load("images/normal.jpeg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

//moon.position.z = 30
//moon.position.setX(-10)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  //moon.rotation.x += 0.05
  //moon.rotation.y += 0.075
  //moon.rotation.z += 0.05

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

//document.body.onscroll = moveCamera;
//moveCamera();

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.005;
  //moon.rotation.y += 0.005
  //moon.rotation.z += 0.01

  //torus.rotation.x += 0.01
  //torus.rotation.y += 0.005
  //torus.rotation.z += 0.01

  controls.update();

  render.render(scene, camera);
}

animate();
