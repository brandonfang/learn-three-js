// Utility Methods
const $ = (x) => document.querySelector(x);
const $$ = (x) => document.querySelectorAll(x);
const $c = (x) => document.createElement(x);

const addClass = (ele, className) => { if (ele) ele.classList.add(className) };
const removeClass = (ele, className) => { if (ele) ele.classList.remove(className) };
const toggleClass = (ele, className) => { if (ele) ele.classList.toggle(className) };
const addEventListenerByClass = (className, event, fn) => {
  let list = document.getElementsByClassName(className);
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener(event, fn, false);
  }
}

const show = (ele) => ele.style.display = 'block';
const hide = (ele) => ele.style.display = 'none';
const toggle = (ele) => {
  if (window.getComputedStyle(ele).display !== 'none') {
    hide(ele);
    return;
  }
  show(ele);
};

const text = (ele, content) => ele.textContent = content;


// Game Logic
const Game = {
  user: localStorage.user || '',
  level: localStorage.level || 0,
  answers: localStorage.answers || {},
  solved: localStorage.solved || [],

  start: () => {
    text($('.label-total'), levels.length.toString());
    show($('.editor'));
    
    if (!localStorage.user) {
      // generate a random id for new user
      Game.user = Date.now().toString(36) + Math.random().toString(36).substring(2);
      // put new user into local storage
      localStorage.setItem('user', Game.user);
    }
   
    Game.setHandlers();
    Game.loadMenu();
    Game.loadLevel(levels[Game.level]);
  },

  setHandlers: () => {
    $('.reset-button').addEventListener('click', Game.reset);
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('level', game.level);
      localStorage.setItem('answers', JSON.stringify(game.answers));
      localStorage.setItem('solved', JSON.stringify(game.solved));
    });
  },


  prev: () => {
    Game.level--;
    Game.loadLevel(levels[Game.level]);
  },

  next: () => {
    Game.level++;
    Game.loadLevel(levels[Game.level]);
  },

  loadMenu: () => {
    levels.forEach((level, i) => {
      let solved = Game.solved.includes(level.name) ? ' solved' : '';
      let levelCircle = `<div class='level-circle${solved}' level='${i}' title='${level.name}'>${i + 1}</div>`;
      $('.level-grid').innerHTML += levelCircle;
    });

    let circles = $$('.level-circle');
    circles.forEach((circle) => {
      circle.addEventListener('click', () => {
        Game.saveAnswer();
        let level = circle.getAttribute('level');
        Game.level = parseInt(level, 10);
        Game.loadLevel(levels[level]);
      });
    })

    $('.level-picker').addEventListener('click', () => {
      toggle($('.level-dropdown'));
    });

    let arrowLeft = $('.arrow.left');
    arrowLeft.addEventListener('click', () => {
      if (arrowLeft.classList.contains('disabled')) return;
      Game.saveAnswer();
      Game.prev();
    }, false);

    let arrowRight = $('.arrow.right');
    arrowRight.addEventListener('click', () => {
      if (arrowRight.classList.contains('disabled')) return;
      Game.saveAnswer();
      Game.next();
    }, false);
  },

  // in progress
  loadLevel: (level) => {
    if (!level) return;
    show($('.editor'));
    show($('.reference'))
    hide($('.level-dropdown'));
    removeClass($('.level-circle.current'), 'current');
    addClass($$('.level-circle').item(level.number - 1), 'current');
    text($('.label-current'), level.number.toString());
    // remove styles on background
    // update canvas
    // remove/reset animations

    removeClass($('.arrow.disabled'), 'disabled');
    if (level === 0) addClass($('.arrow.left'), 'disabled');
    if (level === levels.length - 1) addClass($('.arrow.right'), 'disabled');

    $('.instructions').innerHTML = level.instructions;
    if (level.reference) {
      $('.reference-body').innerHTML = level.reference;
    } else {
      hide($('.reference'));
    }

    let answer = Game.answers[level.name];

    Game.applyCode();
    Game.check();
  },

  check: () => {
    Game.applyCode();
    let level = levels[this.level];
    let editor = document.getElementById('editor');
    
  },

  applyCode: () => {
    let level = levels[this.level];

    Game.saveAnswer();
  },

  saveAnswer: () => {
    let level = levels[this.level];
    let editor = document.getElementById('editor');
    let code = editor.getValue();
    Game.answers[level.name] = editor.getValue();
  },

  reset: () => {
    let isConfirmed = confirm('Are you sure you want to reset the game? You will lose all your saved progress.');
    if (isConfirmed) {
      Game.level = 0;
      Game.answers = {};
      Game.solved = [];
      Game.loadLevel(levels[0]);
      let circles = $$('.level-circles')
      circles.forEach((circle) => removeClass(circle, 'solved'));
    }
  },

  win: () => {

  },

  debounce: () => {

  }
};

document.addEventListener("DOMContentLoaded", () => {
  Game.start();
});