const Game = {
  user: localStorage.user || '',
  level: localStorage.level || 0,
  answers: localStorage.answers || {},
  solved: localStorage.solved || [],

  start: () => {

    $('#level-picker .label-total').text(levels.length);
    $('#editor').show();
    $('#share').hide();
    
    if (!localStorage.user) {
      game.user = Date.now().toString(36) + Math.random().toString(36).substring(2);
      localStorage.setItem('user', game.user);
    }
   
    
    this.loadMenu();
    game.loadLevel();
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

  },

  loadLevel: () => {
    this.show(document.getElementById('editor'));
    this.hide(document.getElementById('levels-dropdown'));



    if (this.level === 0) {
      this.addClass(document.getElementsByClassName('.arrow.left'), 'disabled');
    }

    if (this.level === levels.length - 1) {
      this.addClass(document.getElementsByClassName('.arrow.right'), 'disabled');
    }




    
  },

  saveAnswer: () => {

  },

  win: () => {

  },

  debounce: () => {

  }
};

document.addEventListener("DOMContentLoaded", () => {
  game.start();
});