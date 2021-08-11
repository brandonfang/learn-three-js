const editorWrapper = document.getElementById('.editor-wrapper');
const myTextArea = document.querySelector('textarea.editor');
const myCodeMirror = CodeMirror(editorWrapper, {
  theme: 'dracula',
  mode: 'xml',
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  viewportMargin: Infinity,
  value:
    '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Document</title>\n</head>\n<body>\n  <script src="./three.min.js"></script>\n</body>\n</html>',
});

myCodeMirror.markText(
  { line: 0, ch: 0 }, 
  { line: 6, ch: 10 }, 
  { readOnly: true });

// const myCodeMirror = CodeMirror((elt) => {
//   editorElement.parentNode.replaceChild(elt, editorElement)
// }, {
//   value: editorElement.value
// })

// const myCodeMirror = CodeMirror(editorWrapper, {
//   lineNumbers: true,
//   theme: 'dracula',
//   mode: 'javascript',
//   tabSize: 2,
//   value: 'console.log("Hello, World");',
// });
