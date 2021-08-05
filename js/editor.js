function setReadOnly(editor, readOnlyRanges) {
  let session = editor.getSession();
  let Range = require('ace/range').Range;
  let ranges = [];

  function before(obj, method, wrapper) {
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
  }

  function intersects(range) {
    return editor.getSelectionRange().intersects(range);
  }

  function intersectsRange(newRange) {
    for (i = 0; i < ranges.length; i++) if (newRange.intersects(ranges[i])) return true;
    return false;
  }

  function preventReadonly(next, args) {
    for (i = 0; i < ranges.length; i++) {
      if (intersects(ranges[i])) return;
    }
    next();
  }

  function onEnd(position) {
    let row = position['row'],
      column = position['column'];
    for (i = 0; i < ranges.length; i++)
      if (ranges[i].end['row'] == row && ranges[i].end['column'] == column) return true;
    return false;
  }

  function outSideRange(position) {
    let row = position['row'],
      column = position['column'];
    for (i = 0; i < ranges.length; i++) {
      if (ranges[i].start['row'] < row && ranges[i].end['row'] > row) return false;
      if (ranges[i].start['row'] == row && ranges[i].start['column'] < column) {
        if (ranges[i].end['row'] != row || ranges[i].end['column'] > column) return false;
      } else if (ranges[i].end['row'] == row && ranges[i].end['column'] > column) {
        return false;
      }
    }
    return true;
  }

  for (i = 0; i < readOnlyRanges.length; i++) {
    ranges.push(new Range(...readOnlyRanges[i]));
  }

  ranges.forEach(function (range) {
    session.addMarker(range, 'readonly-highlight');
  });

  session.setMode('ace/mode/javascript');
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
  before(editor, 'onPaste', preventReadonly);
  before(editor, 'onCut', preventReadonly);
  for (i = 0; i < ranges.length; i++) {
    ranges[i].start = session.doc.createAnchor(ranges[i].start);
    ranges[i].end = session.doc.createAnchor(ranges[i].end);
    ranges[i].end.$insertRight = true;
  }

  let old$tryReplace = editor.$tryReplace;
  editor.$tryReplace = function (range, replacement) {
    return intersectsRange(range) ? null : old$tryReplace.apply(this, arguments);
  };
  let session = editor.getSession();
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
}

function refreshEditor(id, content, readonly) {
  var temp_id = id + '_temp';
  document.getElementById(id).innerHTML = "<div id='" + temp_id + "'></div>";
  document.getElementById(temp_id).innerHTML = content;
  var editor = ace.edit(temp_id);
  setReadOnly(editor, readonly);
}

function getReadOnlyByEditableTag(id, content) {
  var text = content.split('\n');
  var starts = [0],
    ends = [];
  text.forEach(function (line, index) {
    if (line.indexOf('&lt;editable&gt;') !== -1) ends.push(index);
    if (line.indexOf('&lt;/editable&gt;') !== -1) starts.push(index + 1);
  });
  ends.push(text.length);
  var readOnlyRanges = [];
  for (i = 0; i < starts.length; i++) {
    readOnlyRanges.push([starts[i], 0, ends[i], 0]);
  }
  refreshEditor(id, content, readOnlyRanges);
}
var content = document.getElementById('code').innerHTML;
function readOnlyLines(id, content, lineNumbers) {
  var readOnlyRanges = [];
  all_lines = lineNumbers.sort();

  for (i = 0; i < lineNumbers.length; i++) {
    readOnlyRanges.push([lineNumbers[i] - 1, 0, lineNumbers[i], 0]);
  }
  refreshEditor(id, content, readOnlyRanges);
}

getReadOnlyByEditableTag('myeditor', content);

//readOnlyLines("myeditor",content,[5,7,9]);
