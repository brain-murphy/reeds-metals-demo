// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var scene,
    camera, 
    renderer, 
    cube, 
    mesh,
    floor, 
    controls;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x66ccff, 0.002 );
    
    // initMesh();
    initCube();
    initFloor();
    initRenderer();

    initCamera();
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(-2.9856548778564425, 2.610568134070048, -5.1626611777119376);
    camera.lookAt(scene.position);
    setCameraControls();
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor( scene.fog.color );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(WIDTH, HEIGHT);
    
    var container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );
}

function initCube() {
    cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshBasicMaterial({color:0xAAAAAA}));
    scene.add(cube);
    cube.position.set(0,1,0);
}

function initMesh() {
    var loader = new THREE.JSONLoader();
    loader.load('./data/marmelab.json', function(geometry) {
        mesh = new THREE.Mesh(geometry);
        scene.add(mesh);
    });
}

function rotateCube() {
    cube.rotation.x -= SPEED * 2;
    cube.rotation.y -= SPEED;
    cube.rotation.z -= SPEED * 3;
}

function rotateMesh() {
    if (!mesh) {
        return;
    }

    mesh.rotation.x -= SPEED * 2;
    mesh.rotation.y -= SPEED;
    mesh.rotation.z -= SPEED * 3;
}

function render() {
    requestAnimationFrame(render);
    controls.update();
    // rotateCube();
    // rotateMesh();
    renderer.render(scene, camera);
}

function initFloor() {
    var geometry = new THREE.PlaneGeometry( 1000, 1000, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00BB00, side: THREE.DoubleSide});
    floor = new THREE.Mesh( geometry, material );
    floor.rotation.x = Math.PI / 2
    scene.add( floor );
}

function setCameraControls() {
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.minPolarAngle = 0; // radians
    controls.maxPolarAngle = (Math.PI / 2) - .1; // radians

// How far you can orbit horizontally, upper and lower limits.
// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
// controls.minAzimuthAngle = - Infinity; // radians
// controls.maxAzimuthAngle = Infinity;
}

window.plusWidth = function() {
    cube.scale.x += 1;
}
window.minusWidth = function () {
    cube.scale.x -= 1;
}

window.plusDepth = function() {
    cube.scale.z += 1;
}
window.minusDepth = function() {
    cube.scale.z -= 1;
}

init();
render();
// render();