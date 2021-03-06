// Game utility methods
const $ = (x) => document.querySelector(x);
const $$ = (x) => document.querySelectorAll(x);
const $c = (x) => document.createElement(x);

const addClass = (ele, className) => {
  if (ele) ele.classList.add(className);
};
const removeClass = (ele, className) => {
  if (ele) ele.classList.remove(className);
};
const toggleClass = (ele, className) => {
  if (ele) ele.classList.toggle(className);
};
const addEventListenerByClass = (className, event, fn) => {
  let list = document.getElementsByClassName(className);
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener(event, fn, false);
  }
};

const text = (ele, content) => (ele.textContent = content);

const show = (ele) => (ele.style.display = 'block');
const hide = (ele) => (ele.style.display = 'none');
const toggle = (ele) => {
  if (window.getComputedStyle(ele).display !== 'none') {
    hide(ele);
    return;
  }
  show(ele);
};


// Select canvas
const container = document.getElementById('canvas');

// 
// Create initial scene
// 
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   container.clientWidth / container.clientHeight,
//   0.1,
//   1000
// );

// const renderer = new THREE.WebGLRenderer({ alpha: true });
// renderer.setSize(container.clientWidth, container.clientHeight);
// renderer.setClearColor(0xfdc48b, 1);
// container.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x34d399 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// const animate = function () {
//   requestAnimationFrame(animate);

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
// };

// animate();

// Sizes
const sizes = {
  width: container.clientWidth,
  height: container.clientHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Resize editor
  // Resize view

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Game logic
const Game = {
  user: localStorage.user || '',
  levelIndex: localStorage.levelIndex || 0, // level.number - 1
  answers: (localStorage.answers && JSON.parse(localStorage.answers)) || {},
  solved: (localStorage.solved && JSON.parse(localStorage.solved)) || [],

  start: () => {
    text($('.label-total'), levels.length.toString());
    // show($('.editor'));

    if (!localStorage.user) {
      // generate random id for new user
      Game.user = Date.now().toString(36) + Math.random().toString(36).substring(2);
      // add new user to localstorage
      localStorage.setItem('user', Game.user);
    }

    // check that level is in range (optional)
    if (Game.levelIndex < 0 || Game.levelIndex > levels.length - 1) {
      Game.levelIndex = 0;
    }

    Game.setHandlers();
    Game.loadMenu();
    Game.loadLevel(levels[Game.levelIndex]);
  },

  setHandlers: () => {
    $('.reset-all').addEventListener('click', Game.resetAll);
    $('.reset-level').addEventListener('click', Game.resetLevel);
    $('.hint-header').addEventListener('click', Game.toggleHint);
    // $('.next-button').addEventListener('click', Game.nextLevel);

    window.addEventListener('beforeunload', () => {
      Game.saveAnswer();
      localStorage.setItem('levelIndex', Game.levelIndex);
      localStorage.setItem('answers', JSON.stringify(Game.answers));
      localStorage.setItem('solved', JSON.stringify(Game.solved));
    });
  },

  prev: () => {
    Game.updateLocalStorage();
    Game.levelIndex--;
    localStorage.setItem('levelIndex', Game.levelIndex);
    Game.loadLevel(levels[Game.levelIndex]);
  },

  next: () => {
    Game.updateLocalStorage();
    Game.levelIndex++;
    localStorage.setItem('levelIndex', Game.levelIndex);
    Game.loadLevel(levels[Game.levelIndex]);
  },

  loadMenu: () => {
    levels.forEach((level, i) => {
      let solved = Game.solved.includes(level.number) ? ' solved' : '';
      let levelCircle = `<div class='level-circle${solved}' level='${i}' title='${level.name}'>${
        i + 1
      }</div>`;
      $('.level-grid').innerHTML += levelCircle;
    });

    let circles = $$('.level-circle');
    circles.forEach((circle) => {
      circle.addEventListener('click', () => {
        Game.saveAnswer();
        let level = circle.getAttribute('level');
        Game.levelIndex = parseInt(level, 10);
        Game.loadLevel(levels[level]);
      });
    });

    $('.level-picker').addEventListener('click', () => {
      toggle($('.level-dropdown'));
    });

    let arrowLeft = $('.arrow.left');
    arrowLeft.addEventListener(
      'click',
      () => {
        if (arrowLeft.classList.contains('disabled')) return;
        Game.saveAnswer();
        Game.prev();
      },
      false
    );

    let arrowRight = $('.arrow.right');
    arrowRight.addEventListener(
      'click',
      () => {
        if (arrowRight.classList.contains('disabled')) return;
        Game.saveAnswer();
        Game.next();
      },
      false
    );
  },

  // in progress
  loadLevel: (level) => {
    if (!level) return;
    // show($('.editor'));
    show($('.reference'));
    hide($('.level-dropdown'));
    hide($('.hint-body'));
    removeClass($('.level-circle.current'), 'current');
    addClass($$('.level-circle').item(level.number - 1), 'current');
    text($('.label-current'), level.number.toString());

    // update canvas and reset styles
    // remove/reset animations

    removeClass($('.arrow.disabled'), 'disabled');
    if (level.number === 1) addClass($('.arrow.left'), 'disabled');
    if (level.number === levels.length) addClass($('.arrow.right'), 'disabled');

    $('.instructions').innerHTML = level.instructions;
    if (level.reference) {
      $('.reference-body').innerHTML = level.reference;
    } else {
      hide($('.reference'));
    }
    if (level.tag) {
      text($('.editor-tag'), level.tag);
    }

    if (level.hints[0]) {
      $('.hint-body').innerHTML = level.hints[0];
    }

    Game.answers[level.name] = Game.answers[level.name] || '';
    Game.updateLocalStorage();

    Game.loadEditor(level);

    Game.check(level);
  },

  loadEditor: (level) => {
    // editor.setValue('');
    // editor.clearHistory();
    // editor.setValue(level.skeleton);
    // editor.refresh();

    // if (level.readOnlyRanges[0]) {
    //   level.readOnlyRanges.forEach((range) => {
    //     editor.markText(
    //       { line: range.start.line - 1, ch: range.start.ch }, 
    //       { line: range.end.line - 1, ch: range.end.ch }, 
    //       { readOnly: true }
    //     );
    //   });
    //   // add marker/highlight on read only lines
    // }

    // editor.focus();
    // editor.setCursor({line: level.startPosition.line - 1, ch: level.startPosition.ch});
  },

  toggleHint: () => {
    const hintHeader = $('.hint-header');
    const hintIcon = $('.hint-icon');
    const hintBody = $('.hint-body');
    const closed = hintIcon.classList.contains('closed');

    if (closed) {
      hintIcon.classList.remove('closed');
      hintBody.classList.remove('closed');
      hintIcon.classList.add('open');
      hintBody.classList.add('open');
      show($('.hint-body'));
      // minus icon
      $('.hint-icon').innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
      hintHeader.focus();
    } else {
      hintIcon.classList.remove('open');
      hintBody.classList.remove('open');
      hintIcon.classList.add('closed');
      hintBody.classList.add('closed');
      hide($('.hint-body'));
      // plus icon
      $('.hint-icon').innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
      hintHeader.focus();
    }
  },

  // consider making this a function without parameters
  check: (level) => {
    let correct = level.solutions.includes(Game.answers[level.name]);

    if (correct) {
      // mark level as solved. activate 'next' button
      console.log('you have the correct answer!');
      if (!Game.solved.includes(level.number)) {
        Game.solved.push(level.number);
      }
      Game.updateLocalStorage();
      addClass($('.next'), 'active');
    } else {
      removeClass($('.next'), 'active');
    }
  },

  applyCode: () => {
    return;
  },

  saveAnswer: () => {
    let level = levels[Game.levelIndex];
    // need to save only relevant lines of code

    Game.updateLocalStorage();
  },

  resetAll: () => {
    let isConfirmed = confirm(
      'Are you sure you want to reset the game?\n\nYou will lose all your saved progress.'
    );
    if (isConfirmed) {
      Game.levelIndex = 0;
      Game.answers = {};
      Game.solved = [];
      Game.loadLevel(levels[0]);
      let circles = $$('.level-circle');
      circles.forEach((circle) => removeClass(circle, 'solved'));
      Game.updateLocalStorage();
    }
  },

  resetLevel: () => {
    let isConfirmed = confirm(
      'Are you sure you want to reset this level?\n\nYou will lose your saved progress for this level.'
    );
    if (isConfirmed) {
      let level = levels[Game.levelIndex];
      // Game.answers[level.name] = '';
      Game.loadLevel(level);
      // reset specific level circle
      Game.updateLocalStorage();
    }
  },

  updateLocalStorage: () => {
    localStorage.setItem('user', Game.user);
    localStorage.setItem('levelIndex', Game.levelIndex);
    localStorage.setItem('answers', JSON.stringify(Game.answers));
    localStorage.setItem('solved', JSON.stringify(Game.solved));
  },

  win: () => {},
};

// Create CodeMirror
// const editorWrapper = document.getElementById('editor-wrapper');
// let editor = CodeMirror(editorWrapper, {
//   theme: 'dracula',
//   mode: levels[0].mode,
//   value: '',
//   lineNumbers: true,
//   indentUnit: 2,
//   tabSize: 2,
//   viewportMargin: Infinity,
//   autoCloseTags: true,
//   foldGutter: true,
//   dragDrop: true,
//   lint: true,
//   extraKeys: {
//     'Ctrl-Space': 'autocomplete',
//   },
//   autohint: true,
// });

// Start game
document.addEventListener('DOMContentLoaded', () => {
  Game.start();
});
