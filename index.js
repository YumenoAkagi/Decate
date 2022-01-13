import * as THREE from "./three.js-dev/build/three.module.js";
import { OrbitControls } from "./three.js-dev/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "./three.js-dev/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "./three.js-dev/examples/jsm/loaders/FontLoader.js";
import { GLTFLoader } from "./three.js-dev/examples/jsm/loaders/GLTFLoader.js";

var scene, camera, renderer;
var control;
var model;
var title;

var initializeModel = () => {
  // testing, delete later
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mats = new THREE.MeshPhongMaterial();

  const mesh = new THREE.Mesh(geo, mats);
  mesh.position.set(0, geo.parameters.height / 2, 0);

  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  model = mesh;
  return mesh;
};

var initializeLight = () => {
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);
};

var createSkyBox = () => {
  const geometry = new THREE.BoxGeometry(20, 20, 20);
  const loader = new THREE.TextureLoader();
  const materials = [
    new THREE.MeshBasicMaterial({
      map: loader.load("./sky_sketch_skybox/px.png"),
      side: THREE.BackSide,
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("./sky_sketch_skybox/nx.png"),
      side: THREE.BackSide,
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("./sky_sketch_skybox/py.png"),
      side: THREE.BackSide,
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("./sky_sketch_skybox/ny.png"),
      side: THREE.BackSide,
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("./sky_sketch_skybox/pz.png"),
      side: THREE.BackSide,
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("./sky_sketch_skybox/nz.png"),
      side: THREE.BackSide,
    }),
  ];
  const skybox = new THREE.Mesh(geometry, materials);
  scene.add(skybox);
};

var initializeTitle = (txt) => {
  const loader = new FontLoader();

  loader.load("./three.js-dev/examples/fonts/helvetiker_bold.typeface.json", (font) => {
    const geo = new TextGeometry(txt, {
      font: font,
      size: 1,
      height: 1,
    });
    const mats = new THREE.MeshStandardMaterial({
      color: 0xd65645,
    });

    const mesh = new THREE.Mesh(geo, mats);

    scene.add(mesh);
    title = mesh;
    return mesh;
  });
};

var initBase = () => {
  const planeGeo = new THREE.PlaneGeometry(5, 5);
  const mats = new THREE.MeshBasicMaterial({
    color: 0xb0b0b0,
  });

  const mesh = new THREE.Mesh(planeGeo, mats);
  mesh.rotateX(-Math.PI * 0.5);

  scene.add(mesh);
};

var initializeComponent = () => {
  scene = new THREE.Scene();

  const FOV = 45;
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  const ASPECT = WIDTH / HEIGHT;

  camera = new THREE.PerspectiveCamera(FOV, ASPECT);
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(WIDTH, HEIGHT);
  // renderer.shadowMap.enabled = true

  document.body.appendChild(renderer.domElement);

  control = new OrbitControls(camera, renderer.domElement);

  // add components here
  initBase();
  // initializeTitle('Decate')
  initializeModel();
  initializeLight();

  //skybox
  createSkyBox();
};

var renderComponent = () => {
  requestAnimationFrame(renderComponent);

  control.update();

  renderer.render(scene, camera);
};

window.onload = () => {
  initializeComponent();
  renderComponent();
};

window.onresize = () => {
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;

  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
};
