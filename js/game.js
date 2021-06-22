const game = {
  user: localStorage.user || '',
  level: localStorage.level || 0,
  answers: localStorage.answers || {},
  solved: localStorage.solved || [],

  start: () => {
    if (!localStorage.user) {
      game.user = Date.now().toString(36) + Math.random().toString(36).substring(2);
      localStorage.setItem('user', game.user);
    }

    this.loadMenu();
    game.loadLevel();
  },

  setHandlers: () => {

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