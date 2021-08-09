// row and column start at 0. line number starts at 1.
let levels = [
  {
    number: 1,
    name: 'level-1',
    instructions:
      "<h2>Welcome to Learn Three.js, follow along to learn the basics of creating 3D web graphics!</h2><p>First, we have to talk about the connection between WebGL and three.js.</p><p><em>WebGL</em> (Web Graphics Library) is a JavaScript API for rendering interactive 2D and 3D graphics without plugins. It draws points, lines, and triangles in the browser based on code you supply. WebGL is very fast because it runs on the GPU of your computer but it requires a lot of geometry and matrix math. Many lines of WebGL code are needed to display simple shapes like triangles and cubes.</p><p><em>Three.js</em> is an easy to use, lightweight, cross-browser, general purpose 3D library built on top of WebGL. It uses the HTML5 canvas element and WebGL to display 3D scenes. We'll be using it because it does most of the mathematical heavy lifting for us and lets us write more human-friendly code.</p><p>There are a few ways to include three.js in your JavaScript project. Let's get started by embedding the core three.js library (taken from <a href='https://github.com/mrdoob/three.js/blob/master/build/three.min.js' target='_blank'>GitHub</a>) in our <code>index.html</code> file.<p>Use a script tag to embed a file named <code>three.min.js</code> in the root folder.</p>",
    reference:
      '<ul><li><a href="https://github.com/mrdoob/three.js/" target="_blank">Three.js GitHub repo</a></li><li><a href="https://threejs.org/docs/index.html#manual/en/introduction/Installation" target="_blank">Installation - three.js docs</a></li><li><a href="https://threejs.org" target="_blank">Three.js docs</a></li><li><a href="https://threejsfundamentals.org/" target="_blank">Three.js Fundamentals</a></li></ul>',
    skeleton: '',
    language: 'html',
    tag: 'html',
    startPosition: [0, 0],
    solutions: ["<script src='./three.min.js'></script>"],
    hints: ["<script src='./three.min.js'></script>"],
  },
  {
    number: 2,
    name: 'level-2',
    instructions:
      '<h2>Instructions title for level 2.</h2><code>const scene = new THREE.Scene()</code>',
    reference: '<p>This is the reference material for level 2.</p>',
    skeleton: '',
    language: 'javascript',
    tag: 'js',
    startPosition: [0, 0],
    solutions: ["console.log('level two')"],
    hints: ['Lorem ipsum'],
  },
  {
    number: 3,
    name: 'level-3',
    instructions:
      '<h2>Instructions title for level 3.</h2><p>Instructions for level 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nisl, rhoncus eget bibendum at, euismod eget nibh. In elit arcu, malesuada a diam vel, imperdiet gravida mi. Vivamus ante neque, blandit ut efficitur sed, fermentum quiius, eget fermentum nulla efficitur. In tempus, lacus quis malesuada feugiat, orci justo vehicula sapien, in blandit orci massa eu nunc.</p>',
    reference: '<p>This is the reference material for level 3.</p>',
    skeleton: '',
    language: 'javascript',
    tag: 'js',
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
    language: 'javascript',
    tag: 'js',
    startPosition: [0, 0],
    solutions: ["console.log('level four')"],
    hints: ['Lorem ipsum'],
  },
  {
    number: 5,
    name: 'level-5',
    instructions:
      '<h2>Instructions title for level 5.</h2><p>Instructions for level 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nisl, rhoncus eget bibendum at, euismod eget fermentum quis tellus. </p>',
    reference: '<p>This is the reference material for level 5.</p>',
    skeleton: '',
    language: 'javascript',
    tag: 'js',
    startPosition: [0, 0],
    solutions: ["console.log('level five')"],
    hints: ['Lorem ipsum'],
  },
  {
    number: 6,
    name: 'level-6',
    instructions:
      '<h2>Instructions title for level 6.</h2><p>Instructions for level 6. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nisl, rhoncus eget bibendum at, euismod eget fermentum quis tellus. Nulla est elit, semper in finibus at.</p>',
    reference: '<p>This is the reference material for level 6.</p>',
    skeleton: '',
    language: 'javascript',
    tag: 'js',
    startPosition: [0, 0],
    solutions: ["console.log('level six')"],
    hints: ['Lorem ipsum'],
  },
];
