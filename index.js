import * as THREE from './three.js-dev/build/three.module.js'

var scene, camera, renderer

var initializeComponent = () => {
    scene = new THREE.Scene()

    const FOV = 45;
    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight
    const ASPECT = WIDTH / HEIGHT

    camera = new THREE.PerspectiveCamera(FOV, ASPECT)
    camera.position.set(20, 5, 0)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(WIDTH, HEIGHT)
    renderer.shadowMap.enabled = true

    document.body.appendChild(renderer.domElement)
}

window.onload = () => {
    initializeComponent()
    renderComponent()
}

window.onresize = () => {
    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight

    renderer.setSize(WIDTH, HEIGHT)
    camera.aspect = WIDTH / HEIGHT
    camera.updateProjectionMatrix()
}