// Level 3

const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
// Your code here
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
