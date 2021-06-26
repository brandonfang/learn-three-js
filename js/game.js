const $ = (_) => document.querySelector(_);
const $$ = (_) => document.querySelectorAll(_);
const $c = (_) => document.createElement(_);

console.log('yea boi')
console.log($('.level-grid'));

const Game = {
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
   
    
    Game.loadMenu();
    Game.loadLevel();
  },

  setHandlers: () => {

  },

  show: (ele) => {
    ele.style.display = 'block';
  },

  hide: (ele) => {
    ele.style.display = 'none';
  },

  toggle: (ele) => {
    if (window.getComputedStyle(ele).display !== 'none') {
      this.hide(ele);
      return;
    }
    this.show(ele);
  },

  addClass: (ele, className) => {
    ele.classList.add(className);
  },

  removeClass: (ele, className) => {
    ele.classList.remove(className);
  },

  toggleClass: (ele, className) => {
    ele.classList.toggle(className);
  },

  prev: () => {
    this.level -= 1;
  },

  next: () => {
    this.level += 1;
  },

  loadMenu: () => {
    levels.forEach((level, i) => {
      let levelMarker = '<div></div>';
      // append to levels


      // levelMarker.appendTo('#levels');
      $('.level-grid').innerHTML += `<div class="level-circle">${level.levelNumber}</div>`
    });

    // level marker event listener
  
    // level indicator event listener

    // arrows event listener




  },

  loadLevel: () => {
    this.show(document.getElementById('editor'));
    this.hide(document.getElementById('levels-dropdown'));
    // update canvas

    if (this.level === 0) {
      this.addClass(document.getElementsByClassName('.arrow.left'), 'disabled');
    }

    if (this.level === levels.length - 1) {
      this.addClass(document.getElementsByClassName('.arrow.right'), 'disabled');
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