// row and column start at 0. line number starts at 1.
let levels = [
  {
    number: 1,
    name: 'level-1',
    instructions:
      "<h2>Welcome to Learn Three.js, follow along to learn the basics of creating 3D web graphics!</h2><p>First, we have to talk about the connection between WebGL and three.js.</p><p><em>WebGL</em> (Web Graphics Library) is a JavaScript API for rendering interactive 2D and 3D graphics without plugins. It draws points, lines, and triangles in the browser based on code you supply. WebGL is very fast because it runs on the GPU of your computer but it requires a lot of geometry and matrix math. Many lines of WebGL code are needed to display simple shapes like triangles and cubes.</p><p><em>Three.js</em> is an easy to use, lightweight, cross-browser, general purpose 3D library built on top of WebGL. It uses the HTML5 canvas element and WebGL to display 3D scenes. We'll be using it because it does most of the mathematical heavy lifting for us and lets us write more human-friendly code.</p><p>There are a few ways to include three.js in your JavaScript project. Let's get started by embedding the core three.js library (taken from <a href='https://github.com/mrdoob/three.js/blob/master/build/three.min.js' target='_blank' rel='noopener noreferrer'>GitHub</a>) in our <code>index.html</code> file.<p>We have a file named <code>three.min.js</code> in the root folder. Use a script tag to embed it.</p>",
    tag: 'index.html',
    mode: 'xml',
    skeleton:
      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>',
    readOnlyRanges: [
      { start: { line: 1, ch: 0 }, end: { line: 7, ch: 2 } },
      { start: { line: 8, ch: 0 }, end: { line: 10, ch: 0 } },
    ],
    startPosition: { line: 7, ch: 2 },
    solutions: ["<script src='./three.min.js'></script>"],
    hints: [
      '<p>Add <code>&lt;script src="./three.min.js"&gt;&lt;/script&gt;</code> within the <code>&lt;body&gt;</code> tag.</p>',
    ],
    reference:
      '<ul><li><a href="https://github.com/mrdoob/three.js/" target="_blank" rel="noopener noreferrer">Three.js GitHub repo</a></li><li><a href="https://threejs.org/docs/index.html#manual/en/introduction/Installation" target="_blank" rel="noopener noreferrer">Installation - three.js docs</a></li><li><a href="https://threejs.org" target="_blank" rel="noopener noreferrer">Three.js docs</a></li></ul>',
  },
  {
    number: 2,
    name: 'level-2',
    instructions:
      "<h2>Creating a scene</h2><p>To actually be able to display anything with three.js, we need three things: scene, camera and renderer, so that we can render the scene with camera. To create a scene, use the three.js <a href=\"https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene\">Scene</a> class:<code>const scene = new THREE.Scene()</code></p><h2>Geometries</h2><p>BoxGeometry is a geometry class for a rectangular cuboid with a given 'width', 'height', and 'depth'. On creation, the cuboid is centred on the origin, with each edge parallel to one of the axes.</p><p>Create a scene and a BoxGeometry with its width, height, depth all set to 1.</p>",
    tag: 'script.js',
    mode: 'javascript',
    skeleton:
      'const canvas = document.getElementById("canvas");\nconst scene = ;\nconst geometry = ;',
    readOnlyRanges: [
      { start: { line: 1, ch: 0 }, end: { line: 1, ch: 100 } }
    ],
    startPosition: { line: 2, ch: 14 },
    solutions: [
      'const scene = new THREE.Scene();\nconst geometry = new THREE.BoxGeometry(1, 1, 1);',
    ],
    hints: [
      '<p>Create a scene: <code>const scene = new THREE.Scene();</code></p><p>Create a geometry: <code>const geometry = new THREE.BoxGeometry(1, 1, 1);</code></p>',
    ],
    reference:
      '<ul><li><a href="https://threejsfundamentals.org/" target="_blank" rel="noopener noreferrer">Three.js Fundamentals</a></li><li><a href="https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene" target="_blank" rel="noopener noreferrer">Scene</a></li></ul>',
  },
  {
    number: 3,
    name: 'level-3',
    instructions:
      '<h2>Instructions title for level 3.</h2><p>Instructions for level 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nisl, rhoncus eget bibendum at, euismod eget nibh. In elit arcu, malesuada a diam vel, imperdiet gravida mi. Vivamus ante neque, blandit ut efficitur sed, fermentum quiius, eget fermentum nulla efficitur. In tempus, lacus quis malesuada feugiat, orci justo vehicula sapien, in blandit orci massa eu nunc.</p>',
    reference: '<p>This is the reference material for level 3.</p>',
    skeleton: '',
    mode: 'javascript',
    tag: 'script.js',
    startPosition: [0, 0],
    solutions: ["console.log('level three')"],
    hints: ['Lorem ipsum'],
  },
  {
    number: 4,
    name: 'level-4',
    instructions:
      '<h2>Instructions title for level 4.</h2><p>Instructions for level 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nisl, rhoncus eget bibendum at, euismod eget fermentum quis tellus. Nulla est elit, semper in finibus at, finibus in sapien. Nulla bibendum leo ac orci varius, eget fermentum nulla efficitur. In tempus, lacus quis malesuada feugiat, orci justo vehicula sapien, in blandit orci massa eu nunc. </p>',
    reference: '<p>This is the reference material for level 4.</p>',
    skeleton: '',
    mode: 'javascript',
    tag: 'script.js',
    startPosition: [0, 0],
    solutions: ["console.log('level four')"],
    hints: ['Lorem ipsum'],
  },
];
