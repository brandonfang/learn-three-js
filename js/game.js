// Utility Methods
const $ = (x) => document.querySelector(x);
const $$ = (x) => document.querySelectorAll(x);
const $c = (x) => document.createElement(x);

const addClass = (ele, className) => ele.classList.add(className);
const removeClass = (ele, className) => ele.classList.remove(className);
const toggleClass = (ele, className) => ele.classList.toggle(className);

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

// Game Logic
var Game = {
  user: localStorage.user || '',
  level: localStorage.level || 0,
  answers: localStorage.answers || {},
  solved: localStorage.solved || [],

  start: () => {

    // $('#level-picker .label-total').text(levels.length);
    // $('#editor').show();
    // $('#share').hide();
    
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
  loadLevel: () => {
    show($('.editor'));
    hide($('.level-dropdown'));
    // remove styls on background
    // update canvas

    if (this.level === 0) {
      addClass($('.arrow.left'), 'disabled');
    }

    if (this.level === levels.length - 1) {
      addClass($('.arrow.right'), 'disabled');
    }

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