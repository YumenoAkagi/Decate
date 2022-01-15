import * as THREE from "./three.js-dev/build/three.module.js";
import { OrbitControls } from "./three.js-dev/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "./three.js-dev/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "./three.js-dev/examples/jsm/loaders/FontLoader.js";
import { GLTFLoader } from "./three.js-dev/examples/jsm/loaders/GLTFLoader.js";

var scene, camera, renderer;
var control;
var model;
var title;

var hatModels = [
  './assets/Accessories/hat_model_1.gltf'
]
var hatModelIndex = 0
var currHatModel

var currClothModel = null

var initializeModel = () => {
  //test model 3d
  const loader = new GLTFLoader()
  loader.load('./assets/Character/body_template.gltf', (body) =>{
      model = body.scene;
      model.rotation.y += 135
      model.castShadow = true
      model.receiveShadow = true
      scene.add(model);
  })
}

var loadHatModel = () => {
  const loader = new GLTFLoader()
  loader.load(hatModels[hatModelIndex], (hat) => {
    currHatModel = hat.scene
    scene.add(currHatModel)
  })
}

window.loadClothModel = function(path) {
  document.getElementById('clothes_selection_info').innerHTML = 'Loading clothes model, please wait...'

  if(currClothModel != null || currClothModel != undefined) {
    scene.remove(currClothModel)
    currClothModel = null
  }

  if(path == null || path == undefined || path == '') {
    document.getElementById('clothes_selection_info').innerHTML = ''
    return
  }

  const loader = new GLTFLoader()
  loader.load(path, (cloth) => {
    currClothModel = cloth.scene
    scene.add(currClothModel)
    document.getElementById('clothes_selection_info').innerHTML = ''
  })
}

var initializeLight = () => {
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);
}

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
  // const planeGeo = new THREE.PlaneGeometry(5, 5);
  // const mats = new THREE.MeshBasicMaterial({
  //   color: 0xb0b0b0,
  // });

  // const mesh = new THREE.Mesh(planeGeo, mats);
  // mesh.rotateX(-Math.PI * 0.5);

  // scene.add(mesh);
};

var initializeComponent = () => {
  scene = new THREE.Scene();

  const FOV = 40;
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  const ASPECT = WIDTH / HEIGHT;

  camera = new THREE.PerspectiveCamera(FOV, ASPECT);
  camera.position.set(0, 1, 6);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true

  document.body.appendChild(renderer.domElement);

  control = new OrbitControls(camera, renderer.domElement);

  // add components here
  // initBase();
  // initializeTitle('Decate')
  initializeModel();
  loadHatModel();
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
