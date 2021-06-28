// Utility Methods
const $ = (x) => document.querySelector(x);
const $$ = (x) => document.querySelectorAll(x);
const $c = (x) => document.createElement(x);

const addClass = (ele, className) => { if (ele) ele.classList.add(className) };
const removeClass = (ele, className) => { if (ele) ele.classList.remove(className) };
const toggleClass = (ele, className) => { if (ele) ele.classList.toggle(className) };

const show = (ele) => ele.style.display = 'block';
const hide = (ele) => ele.style.display = 'none';
const toggle = (ele) => {
  if (window.getComputedStyle(ele).display !== 'none') {
    hide(ele);
    return;
  }
  show(ele);
};

const addEventListenerByClass = (className, event, fn) => {
  let list = document.getElementsByClassName(className);
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener(event, fn, false);
  }
}

const text = (ele, content) => ele.textContent = content;


// Game Logic
var Game = {
  user: localStorage.user || '',
  level: localStorage.level || 0,
  answers: localStorage.answers || {},
  solved: localStorage.solved || [],

  start: () => {
    text($('.label-total'), levels.length.toString());
    show($('.editor'));
    
    if (!localStorage.user) {
      Game.user = Date.now().toString(36) + Math.random().toString(36).substring(2);
      localStorage.setItem('user', Game.user);
    }
   
    Game.setHandlers();
    Game.loadMenu();
    Game.loadLevel(levels[Game.level]);
  },

  setHandlers: () => {

  },


  prev: () => {
    this.level--;
    this.loadLevel(levels[this.level]);
  },

  next: () => {
    this.level++;
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
    });

    let arrowRight = $('.arrow.left');
    arrowRight.addEventListener('click', () => {
      if (arrowRight.classList.contains('disabled')) return;
      Game.saveAnswer();
      Game.next();
    });
  },

  // in progress
  loadLevel: (level) => {
    show($('.editor'));
    hide($('.level-dropdown'));
    removeClass($('.level-circle.current'), 'current');
    addClass($$('.level-circle').item(level.number - 1), 'current')
    text($('.label-current'), level.number.toString());
    text($('#before'), level.before);
    text($('#after'), level.after);
    // remove styles on background
    // update canvas
    // remove/reset animations

    removeClass($('.arrow.disabled'), 'disabled');
    if (level === 0) addClass($('.arrow.left'), 'disabled');
    if (level === levels.length - 1) addClass($('.arrow.right'), 'disabled');

    $('.instructions').innerHTML = level.instructions;

    let answer = Game.answers[level.name];

    Game.applyStyles();
    Game.check();
  },

  check: () => {
    Game.applyStyles();
  },

  applyStyles: () => {

    Game.saveAnswer();
  },

  saveAnswer: () => {

  },

  win: () => {

  },

  debounce: () => {

  }
};

document.addEventListener("DOMContentLoaded", () => {
  Game.start();
});