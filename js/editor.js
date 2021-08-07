// Create and configure code editor

// const editor = ace.edit('editor');
// editor.setOptions({
//   // Editor options
//   cursorStyle: 'ace',
//   highlightActiveLine: true,
//   enableBasicAutocompletion: true,
//   // autoScrollEditorIntoView: false,
//   readOnly: false,

//   // Renderer options
//   theme: 'ace/theme/dracula',
//   fontFamily: 'Roboto Mono, monospace',
//   fontSize: '14px',
//   showGutter: false,
//   showFoldWidgets: false,
//   displayIndentGuides: true,
//   printMargin: false,
//   maxLines: 50,

//   // Mouse handler options
//   dragEnabled: true,

//   // Session options
//   useWorker: false,
//   mode: 'ace/mode/javascript',
//   tabSize: 2,
// });

const setReadOnly = function (editor, readOnlyRanges) {
  let session = editor.getSession();
  let Range = require('ace/range').Range;
  let ranges = [];

  const before = function (obj, method, wrapper) {
    let orig = obj[method];
    obj[method] = function () {
      let args = Array.prototype.slice.call(arguments);
      return wrapper.call(
        this,
        function () {
          return orig.apply(obj, args);
        },
        args
      );
    };
    return obj[method];
  };

  const intersects = function (range) {
    return editor.getSelectionRange().intersects(range);
  };

  const intersectsRange = function (newRange) {
    for (i = 0; i < ranges.length; i++) if (newRange.intersects(ranges[i])) return true;
    return false;
  };

  const preventReadOnly = function (next, args) {
    for (i = 0; i < ranges.length; i++) {
      if (intersects(ranges[i])) return;
    }
    next();
  };

  const onEnd = function (position) {
    let row = position['row'];
    let column = position['column'];
    for (i = 0; i < ranges.length; i++)
      if (ranges[i].end['row'] == row && ranges[i].end['column'] == column) return true;
    return false;
  };

  const outSideRange = function (position) {
    let row = position['row'];
    let column = position['column'];
    for (i = 0; i < ranges.length; i++) {
      if (ranges[i].start['row'] < row && ranges[i].end['row'] > row) return false;
      if (ranges[i].start['row'] == row && ranges[i].start['column'] < column) {
        if (ranges[i].end['row'] != row || ranges[i].end['column'] > column) return false;
      } else if (ranges[i].end['row'] == row && ranges[i].end['column'] > column) {
        return false;
      }
    }
    return true;
  };

  for (i = 0; i < readOnlyRanges.length; i++) {
    ranges.push(new Range(...readOnlyRanges[i]));
  }

  ranges.forEach(function (range) {
    session.addMarker(range, 'readonly-highlight');
  });

  session.setMode('ace/mode/javascript');
  // session.setMode(`ace/mode/${level.language}`);

  editor.keyBinding.addKeyboardHandler({
    handleKeyboard: function (data, hash, keyString, keyCode, event) {
      if (Math.abs(keyCode) == 13 && onEnd(editor.getCursorPosition())) {
        return false;
      }
      if (hash === -1 || (keyCode <= 40 && keyCode >= 37)) return false;
      for (i = 0; i < ranges.length; i++) {
        if (intersects(ranges[i])) {
          return { command: 'null', passEvent: false };
        }
      }
    },
  });

  before(editor, 'onPaste', preventReadOnly);
  before(editor, 'onCut', preventReadOnly);

  for (i = 0; i < ranges.length; i++) {
    ranges[i].start = session.doc.createAnchor(ranges[i].start);
    ranges[i].end = session.doc.createAnchor(ranges[i].end);
    ranges[i].end.$insertRight = true;
  }

  let old$tryReplace = editor.$tryReplace;
  editor.$tryReplace = function (range, replacement) {
    return intersectsRange(range) ? null : old$tryReplace.apply(this, arguments);
  };

  // let session = editor.getSession();
  let oldInsert = session.insert;
  session.insert = function (position, text) {
    return oldInsert.apply(this, [position, outSideRange(position) ? text : '']);
  };
  let oldRemove = session.remove;
  session.remove = function (range) {
    return intersectsRange(range) ? false : oldRemove.apply(this, arguments);
  };
  let oldMoveText = session.moveText;
  session.moveText = function (fromRange, toPosition, copy) {
    if (intersectsRange(fromRange) || !outSideRange(toPosition)) return fromRange;
    return oldMoveText.apply(this, arguments);
  };
};

const refreshEditor = function (id, content, readOnlyRanges) {
  let tempId = id + '-temp';
  document.getElementById(id).innerHTML = "<div id='" + tempId + "'></div>";
  document.getElementById(tempId).innerHTML = content;
  // create and configure code editor
  let editor = ace.edit(tempId);
  editor.setOptions({
    // Editor options
    cursorStyle: 'ace',
    highlightActiveLine: false,
    enableBasicAutocompletion: true,
    // autoScrollEditorIntoView: false,
    readOnly: false,

    // Renderer options
    theme: 'ace/theme/dracula',
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '14px',
    showGutter: false,
    showFoldWidgets: false,
    displayIndentGuides: true,
    printMargin: false,
    maxLines: 50,

    // Mouse handler options
    dragEnabled: true,

    // Session options
    useWorker: false,
    mode: 'ace/mode/javascript',
    tabSize: 2,
  });
  // call setReadOnly()
  setReadOnly(editor, readOnlyRanges);

  // editor.gotoLine(...startPosition);
};

// Set lineNumbers (array) as read only
const readOnlyLines = function (id, content, lineNumbers) {
  let readOnlyRanges = [];
  for (i = 0; i < lineNumbers.length; i++) {
    readOnlyRanges.push([lineNumbers[i] - 1, 0, lineNumbers[i], 0]);
  }
  refreshEditor(id, content, readOnlyRanges);
};

const getReadOnlyByEditableTag = function (id, content) {
  let text = content.split('\n');
  let starts = [0];
  let ends = [];
  text.forEach(function (line, index) {
    if (line.indexOf('&lt;editable&gt;') !== -1) ends.push(index);
    if (line.indexOf('&lt;/editable&gt;') !== -1) starts.push(index + 1);
  });
  ends.push(text.length);
  let readOnlyRanges = [];
  for (i = 0; i < starts.length; i++) {
    readOnlyRanges.push([starts[i], 0, ends[i], 0]);
  }
  // call refreshEditor()
  refreshEditor(id, content, readOnlyRanges);
};

let content = document.getElementById('editor').innerHTML;
// call getReadOnlyByEditableTag()
getReadOnlyByEditableTag('editor', content);

readOnlyLines('editor', content, [1, 2, 4, 5, 6, 7, 8]);