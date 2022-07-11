// 6e38
// (c) 2022, Nathan Jenne

const Blank = -1;

function init15(size) {
  var puzzle = new Array(size);
  puzzle[size - 1] = { value: Blank };
  for (var i = 0; i < size - 1; i++) {
    puzzle[i] = {
      value: i + 1,
    }
  }
  var width = Math.floor(Math.sqrt(size));
  return {
    puzzle,
    size,
    width,
    blank: {
      x: width - 1,
      y: width - 1,
    },
    startTimestamp: 0,
    endTimestamp: 0,
    moves: 0,
  };
}

function getSize(context) {
  return context.size;
}

function getCell15(context, pt) {
  return context.puzzle[pt.y * context.width + pt.x].value;
}

function setCell15(context, pt, value) {
  context.puzzle[pt.y * context.width + pt.x].value = value;
}

function getBlankPt(context) {
  return {
    x: context.blank.x,
    y: context.blank.y,
  };
}

function setBlankPt(context, pt) {
  context.blank.x = pt.x;
  context.blank.y = pt.y;
}

function swap15(context, pt) {
  if (pt.x >= context.width || pt.y >= context.width) {
    console.error('Attempting to swap out-of-bounds');
    return;
  }
  var blankPt = getBlankPt(context);
  if (Math.abs(pt.x - blankPt.x) + Math.abs(pt.y - blankPt.y) != 1) {
    console.error('Attempting to swap non-adjacent cells');
    return;
  }
  var value = getCell15(context, pt);
  setCell15(context, context.blank, value)
  setCell15(context, pt, Blank)
  setBlankPt(context, pt);
}

function getOptions15(context) {
  var options = [];
  var pt = getBlankPt(context);
  if (pt.x > 0) {
    options.push({
      x: pt.x - 1,
      y: pt.y,
    });
  }
  if (pt.y > 0) {
    options.push({
      x: pt.x,
      y: pt.y - 1,
    });
  }
  if (pt.x < context.width - 1) {
    options.push({
      x: pt.x + 1,
      y: pt.y,
    });
  }
  if (pt.y < context.width - 1) {
    options.push({
      x: pt.x,
      y: pt.y + 1,
    });
  }
  return options;
}

function shuffle15(context) {
  var n = Math.floor(Math.random() * context.size) + context.size * 10;
  for (var i = 0; i < n; i++) {
    var options = getOptions15(context);
    swap15(context, options[Math.floor(Math.random() * options.length)])
  }
  context.startTimestamp = 0;
  context.endTimestamp = 0;
  context.moves = 0;
}
