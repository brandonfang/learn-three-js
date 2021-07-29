// Create and configure code editor
const editor = ace.edit('editor');
editor.setTheme('ace/theme/dracula');
editor.session.setTabSize(2);
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

editor.setValue("console.log('hello world');");
// editor.session.setValue("the new text here"); // set value and reset undo history
const value = editor.getValue(); // or session.getValue
// console.log(value);

// Select canvas
const container = document.getElementById('canvas');

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

// Sizes
const sizes = {
  width: container.clientWidth,
  height: container.clientHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  editor.resize();

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
