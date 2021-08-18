// Create initial editor
const editorWrapper = document.getElementById('.editor-wrapper');
const editor = CodeMirror(editorWrapper, {
  theme: 'dracula',
  mode: levels[0].mode,
  value: levels[0].skeleton,
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  viewportMargin: Infinity,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  lint: true,
  extraKeys: {
    'Ctrl-Space': 'autocomplete',
  },
  autohint: true,
});
// console.log(levels[0].skeleton)
editor.setValue(levels[0].skeleton)
