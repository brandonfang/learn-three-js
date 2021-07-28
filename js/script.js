// Create and configure code editor
var editor = ace.edit('editor');
editor.setTheme('ace/theme/dracula');
editor.session.setMode('ace/mode/javascript');
editor.renderer.setShowGutter(false);
// editor.setOptions(wrapBehavioursEnabled, true)
// editor.sessions.setOptions(wrap, 20);
editor.renderer.setOptions({
  fontFamily: 'Roboto Mono',
  fontSize: '14px',
  printMargin: '28px',
  showPrintMargin: false
});

// console.log(THREE);

// Select canvas
let container = document.getElementById('canvas');

// Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0xfdc48b, 1);
container.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x34d399 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
