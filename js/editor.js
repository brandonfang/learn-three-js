const editorElement = document.getElementById('editor');
const myCodeMirror = CodeMirror.fromTextArea(editorElement, {
  theme: 'dracula',
  mode: 'xml',
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  viewportMargin: 10,
});
