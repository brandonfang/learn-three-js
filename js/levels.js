let levels = [
  {
    number: 1,
    name: 'level 1',
    instructions:
      '<h2>Welcome! This is a game to help you learn about three.js.</h2><p>WebGL is a JavaScript API for rendering interactive 2D and 3D graphics without the use of plug-ins. WebGL is very fast, allowing GPU-accelerated usage of physics and image processing and effects as part of the web page canvas. But because it uses the GPU to draw pixels on the canvas, it is dependent on complicated matrices inputs which require math.</p><p>Three.js is an easy to use, lightweight, cross-browser, general purpose 3D library built on top of WebGL. It does most of the heavy lifting (shaders and matrices) for us and allows us to write more human-friendly code.</p>',
    reference:
      '<ul><li><a href="https://github.com/mrdoob/three.js/" target="_blank">Three.js GitHub</a></li><li><a href="https://threejs.org" target="_blank">Three.js documentation</a></li><li><a href="https://threejsfundamentals.org/" target="_blank">Three.js Fundamentals</a></li></ul>',
    board: '',
    selector: '',
    style: {},
    before: '//level 1 before code',
    after: '// level 1 after code',
    solutions: ["console.log(\'hello world\')"]
  },
  {
    number: 2,
    name: 'level 2',
    instructions:
      '<h2>Instructions title for level 2.</h2><p>Instructions for level 2. Lorem ipsum dolor sit ametcu, malesuada a diam vel, imperdiet gravida mi. Vivamus ante neque, blandit ut efficitur sed, fermentum quis tellus. Nulla est elit, semper in finibus at, finibus in sapien. Nulla bibendum leo ac orci varius, eget fermentum nulla efficitur. In tempus, lacus quis malesuada feugiat, ismod purus sed, efficitur quam.</p>',
    reference: '<p>This is the reference material for level 2.</p>',
    board: '',
    selector: '',
    style: {},
    before: '',
    after: '',
  },
  {
    number: 3,
    name: 'level 3',
    instructions:
      '<h2>Instructions title for level 3.</h2><p>Instructions for level 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nisl, rhoncus eget bibendum at, euismod eget nibh. In elit arcu, malesuada a diam vel, imperdiet gravida mi. Vivamus ante neque, blandit ut efficitur sed, fermentum quiius, eget fermentum nulla efficitur. In tempus, lacus quis malesuada feugiat, orci justo vehicula sapien, in blandit orci massa eu nunc. Duis sit amet elit diam. Morbi tincidunt orci et mi fermentum, eget lacinia odio cursus. Pellentesque at quam facilisis, euismod purus sed, efficitur quam.</p>',
    reference: '<p>This is the reference material for level 3.</p>',
    board: '',
    selector: '',
    style: {},
    before: '',
    after: '',
  },
  {
    number: 4,
    name: 'level 4',
    instructions:
      '<h2>Instructions title for level 4.</h2><p>Instructions for level 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nisl, rhoncus eget bibendum at, euismod eget fermentum quis tellus. Nulla est elit, semper in finibus at, finibus in sapien. Nulla bibendum leo ac orci varius nibh. In elit arcu, malesuada a diam vel, imperdiet gravida mi. Vivamus ante neque, blandit ut efficitur sed, fermentum quis tellus. Nulla est elit, semper in finibus at, finibus in sapien. Nulla bibendum leo ac orci varius, eget fermentum nulla efficitur. In tempus, lacus quis malesuada feugiat, orci justo vehicula sapien, in blandit orci massa eu nunc. Duis sit amet elit diam. Morbi tincidunt orci et mi fermentum, eget lacinia odio cursus. Pellentesque at quam facilisis, euismod purus sed, efficitur quam.</p>',
    reference: '<p>This is the reference material for level 4.</p>',
    board: '',
    selector: '',
    style: {},
    before: '',
    after: '',
  },
  {
    number: 5,
    name: 'level 5',
    instructions:
      '<h2>Instructions title for level 5.</h2><p>Instructions for level 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nisl, rhoncus eget bibendum at, euismod eget fermentum quis tellus. Nulla est elit, semper in finibus at, finibus in sapien. Nulla bibendum leo ac orci varius nibh. In elit arcu, malesuada a diam vel, imperdiet gravida mi. Vivamus ante neque, blandit ut efficitur sed, fermentum quis tellus. Nulla est elit, semper in finibus at, finibus in sapien. Nulla bibendum leo ac orci varius, eget fermentum nulla efficitur. In tempus, lacus quis malesuada feugiat, orci justo vehicula sapien, in blandit orci massa eu nunc. Duis sit amet elit diam. Morbi tincidunt orci et mi fermentum, eget lacinia odio cursus. Pellentesque at quam facilisis, euismod purus sed, efficitur quam.</p>',
    reference: '<p>This is the reference material for level 5.</p>',
    board: '',
    selector: '',
    style: {},
    before: '',
    after: '',
  },
  {
    number: 6,
    name: 'level 6',
    instructions:
      '<h2>Instructions title for level 6.</h2><p>Instructions for level 6. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nisl, rhoncus eget bibendum at, euismod eget fermentum quis tellus. Nulla est elit, semper in finibus at, finibus in sapien. Nulla bibendum leo ac orci varius nibh. In elit arcu, malesuada a diam vel, imperdiet gravida mi. Vivamus ante neque, blandit ut efficitur sed, fermentum quis tellus. Nulla est elit, semper in finibus at, finibus in sapien. Nulla bibendum leo ac orci varius, eget fermentum nulla efficitur. In tempus, lacus quis malesuada feugiat, orci justo vehicula sapien, in blandit orci massa eu nunc. Duis sit amet elit diam. Morbi tincidunt orci et mi fermentum, eget lacinia odio cursus. Pellentesque at quam facilisis, euismod purus sed, efficitur quam.</p>',
    reference: '<p>This is the reference material for level 6.</p>',
    board: '',
    selector: '',
    style: {},
    before: '',
    after: '',
  },
  {
    number: 7,
    name: 'level 7',
    instructions:
      '<h2>Instructions title for level 7.</h2><p>Instructions for level 7. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nisl, rhoncus eget bibendum at, euismod eget fermentum quis tellus. Nulla est elit, semper in finibus at, finibus in sapien. Nulla bibendum leo ac orci varius nibh. In elit arcu, malesuada a diam vel, imperdiet gravida mi. Vivamus ante neque, blandit ut efficitur sed, fermentum quis tellus. Nulla est elit, semper in finibus at, finibus in sapien. Nulla bibendum leo ac orci varius, eget fermentum nulla efficitur. In tempus, lacus quis malesuada feugiat, orci justo vehicula sapien, in blandit orci massa eu nunc. Duis sit amet elit diam. Morbi tincidunt orci et mi fermentum, eget lacinia odio cursus. Pellentesque at quam facilisis, euismod purus sed, efficitur quam.</p>',
    reference: '<p>This is the reference material for level 7.</p>',
    board: '',
    selector: '',
    style: {},
    before: '',
    after: '',
  },
  {
    number: 8,
    name: 'level 8',
    instructions:
      '<h2>Instructions title for level 8.</h2><p>Instructions for level 8. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nisl, rhoncus eget bibendum at, euismod eget fermentum quis tellus. Nulla est elit, semper in finibus at, finibus in sapien. Nulla bibendum leo ac orci varius nibh. In elit arcu, malesuada a diam vel, imperdiet gravida mi. Vivamus ante neque, blandit ut efficitur sed, fermentum quis tellus. Nulla est elit, semper in finibus at, finibus in sapien. Nulla bibendum leo ac orci varius, eget fermentum nulla efficitur. In tempus, lacus quis malesuada feugiat, orci justo vehicula sapien, in blandit orci massa eu nunc. Duis sit amet elit diam. Morbi tincidunt orci et mi fermentum, eget lacinia odio cursus. Pellentesque at quam facilisis, euismod purus sed, efficitur quam.</p>',
    reference: '<p>This is the reference material for level 8.</p>',
    board: '',
    selector: '',
    style: {},
    before: '',
    after: '',
  },
];
