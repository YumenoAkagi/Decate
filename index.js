import * as THREE from "./three.js-dev/build/three.module.js";
import { OrbitControls } from "./three.js-dev/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "./three.js-dev/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "./three.js-dev/examples/jsm/loaders/FontLoader.js";
import { GLTFLoader } from "./three.js-dev/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "./three.js-dev/examples/jsm/exporters/GLTFExporter.js";

var scene, camera, renderer;
var control;
var model;

var currAccessoriesModel = null;
var currClothModel = null;
var currPantsModel = null;
var currHairModel = null;
var currShoesModel = null;

const ROTATION = 3.1;
var EYE_INIT_POS_Y = 0;
var NOSE_INIT_POS_Y = 0;
var EARS_INIT_POS_Y = 0;
const SKIN_INIT_COLOR = "#CFA887";

var initializeModel = () => {
	//body model 3d
	const loader = new GLTFLoader();
	loader.load("./assets/Character/body_template.gltf", (body) => {
		model = body.scene;
		model.rotation.y = ROTATION;
		model.castShadow = true;
		model.receiveShadow = true;
		scene.add(model);

		for (let i = 0; i < model.children.length; i++) {
			let mesh = model.children[i];

			if (mesh.name == "eyes001") {
				EYE_INIT_POS_Y = mesh.position.y;
			} else if (mesh.name == "nose") {
				NOSE_INIT_POS_Y = mesh.position.y;
			} else if (mesh.name == "ear") {
				EARS_INIT_POS_Y = mesh.position.y;
			}
		}
	});
};

window.changeSkinColor = (val) => {
	for (let i = 0; i < model.children.length; i++) {
		let mat = model.children[i].material;

		if (mat.name != "eyes.001") mat.color.set(val);
	}
};

window.changeEyeColor = (val) => {
	for (let i = 0; i < model.children.length; i++) {
		let mat = model.children[i].material;

		if (mat.name == "eyes.001") {
			mat.color.set(val);
			return;
		}
	}
};

window.changeEyesHeight = (val) => {
	for (let i = 0; i < model.children.length; i++) {
		let mesh = model.children[i];

		if (mesh.name == "eyes001") {
			val -= 50;
			mesh.position.y = EYE_INIT_POS_Y + val / 1000;
			return;
		}
	}
};

window.changeNoseHeight = (val) => {
	for (let i = 0; i < model.children.length; i++) {
		let mesh = model.children[i];

		if (mesh.name == "nose") {
			val -= 50;
			mesh.position.y = NOSE_INIT_POS_Y + val / 2000;
			return;
		}
	}
};

window.changeEarsHeight = (val) => {
	for (let i = 0; i < model.children.length; i++) {
		let mesh = model.children[i];

		if (mesh.name == "ear") {
			val -= 50;
			mesh.position.y = EARS_INIT_POS_Y + val / 1000;
			return;
		}
	}
};

window.resetSkinColor = () => {
	for (let i = 0; i < model.children.length; i++) {
		let mat = model.children[i].material;

		if (mat.name != "eyes.001") mat.color.set(SKIN_INIT_COLOR);
	}
};

window.loadHairModel = (path) => {
	document.getElementById("hair_selection_info").innerHTML =
		"Loading hair model, please wait...";

	if (currHairModel != null || currHairModel != undefined) {
		scene.remove(currHairModel);
		currHairModel = null;
	}

	if (path == null || path == undefined || path == "") {
		document.getElementById("hair_selection_info").innerHTML = "";
		return;
	}

	const loader = new GLTFLoader();
	loader.load(path, (hair) => {
		currHairModel = hair.scene;
		currHairModel.rotation.y = ROTATION;
		scene.add(currHairModel);
		document.getElementById("hair_selection_info").innerHTML = "";
	});
};

window.loadPantsModel = (path) => {
	document.getElementById("pants_selection_info").innerHTML =
		"Loading pants model, please wait...";

	if (currPantsModel != null || currPantsModel != undefined) {
		scene.remove(currPantsModel);
		currPantsModel = null;
	}

	if (path == null || path == undefined || path == "") {
		document.getElementById("pants_selection_info").innerHTML = "";
		return;
	}

	const loader = new GLTFLoader();
	loader.load(path, (pants) => {
		currPantsModel = pants.scene;
		currPantsModel.rotation.y = ROTATION;
		scene.add(currPantsModel);
		document.getElementById("pants_selection_info").innerHTML = "";
	});
};

window.loadAccessoriesModel = (path) => {
	document.getElementById("accessories_selection_info").innerHTML =
		"Loading accessories model, please wait...";

	if (currAccessoriesModel != null || currAccessoriesModel != undefined) {
		scene.remove(currAccessoriesModel);
		currAccessoriesModel = null;
	}

	if (path == null || path == undefined || path == "") {
		document.getElementById("accessories_selection_info").innerHTML = "";
		return;
	}

	const loader = new GLTFLoader();
	loader.load(path, (acc) => {
		currAccessoriesModel = acc.scene;
		currAccessoriesModel.rotation.y = ROTATION;
		scene.add(currAccessoriesModel);
		document.getElementById("accessories_selection_info").innerHTML = "";
	});
};

window.loadShoesModel = function (path) {
	document.getElementById("shoes_selection_info").innerHTML =
		"Loading shoes model, please wait...";

	if (currShoesModel != null || currShoesModel != undefined) {
		scene.remove(currShoesModel);
		currShoesModel = null;
	}

	if (path == null || path == undefined || path == "") {
		document.getElementById("clothes_selection_info").innerHTML = "";
		return;
	}

	const loader = new GLTFLoader();
	loader.load(path, (shoes) => {
		currShoesModel = shoes.scene;
		currShoesModel.rotation.y = ROTATION;
		scene.add(currShoesModel);
		document.getElementById("shoes_selection_info").innerHTML = "";
	});
};

window.loadClothModel = function (path) {
	document.getElementById("clothes_selection_info").innerHTML =
		"Loading clothes model, please wait...";

	if (currClothModel != null || currClothModel != undefined) {
		scene.remove(currClothModel);
		currClothModel = null;
	}

	if (path == null || path == undefined || path == "") {
		document.getElementById("clothes_selection_info").innerHTML = "";
		return;
	}

	const loader = new GLTFLoader();
	loader.load(path, (cloth) => {
		currClothModel = cloth.scene;
		currClothModel.rotation.y = ROTATION;
		scene.add(currClothModel);
		document.getElementById("clothes_selection_info").innerHTML = "";
	});
};

var initializeLight = () => {
	const light = new THREE.AmbientLight(0xffffff, 1);
	scene.add(light);

	const directLight1 = new THREE.DirectionalLight(0xffa812, 0.5);
	scene.add(directLight1);
	directLight1.position.set(0, 10, 5);

	const directLight2 = new THREE.DirectionalLight(0x121aff, 0.5);
	scene.add(directLight2);
	directLight2.position.set(0, -10, -10);
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

	loader.load(
		"./three.js-dev/examples/fonts/helvetiker_bold.typeface.json",
		(font) => {
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
		}
	);
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
	renderer.shadowMap.enabled = true;

	document.body.appendChild(renderer.domElement);

	control = new OrbitControls(camera, renderer.domElement);

	// add components here
	// initBase();
	// initializeTitle('Decate')
	initializeModel();
	initializeLight();

	//skybox
	createSkyBox();
	initListener();
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

var initListener = () => {
	const btn = document.getElementById("exportBtn");

	btn.addEventListener("click", (e) => {
		const array = [model];

		if (currAccessoriesModel != null) array.push(currAccessoriesModel);
		if (currClothModel != null) array.push(currClothModel);
		if (currPantsModel != null) array.push(currPantsModel);
		if (currHairModel != null) array.push(currHairModel);
		if (currShoesModel != null) array.push(currShoesModel);

		exportGLTF(array);
	});
};

function exportGLTF(input) {
	const exporter = new GLTFExporter();
	// const options = {
	// 	trs: document.getElementById("option_trs").checked,
	// 	onlyVisible: document.getElementById("option_visible").checked,
	// 	truncateDrawRange: document.getElementById("option_drawrange").checked,
	// 	binary: document.getElementById("option_binary").checked,
	// 	maxTextureSize:
	// 		Number(document.getElementById("option_maxsize").value) || Infinity, // To prevent NaN value
	// };
	exporter.parse(input, (result) => {
		if (result instanceof ArrayBuffer) {
			saveArrayBuffer(result, "scene.glb");
		} else {
			const output = JSON.stringify(result, null, 2);
			console.log(output);
			saveString(output, "scene.gltf");
		}
	});
}

const link = document.createElement("a");
link.style.display = "none";
document.body.appendChild(link);

function save(blob, filename) {
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();

	// URL.revokeObjectURL( url ); breaks Firefox...
}

function saveString(text, filename) {
	save(new Blob([text], { type: "text/plain" }), filename);
}

function saveArrayBuffer(buffer, filename) {
	save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}
