// 6e38
// (c) 2022, Nathan Jenne

const BackgroundColor = '#333';
const Size = 16;
const CellSize = 50;
const BoardOffset =  10;
const NumberSize = 25;

var gbl = {};

function resize() {
  gbl.ctx.canvas.width = window.innerWidth - 20;
  gbl.ctx.canvas.height = window.innerHeight - 20;
  gbl.width = gbl.ctx.canvas.width;
  gbl.height = gbl.ctx.canvas.height;
}

function canvasClick(ev) {
  ev.stopPropagation();
  var i = Math.floor((ev.offsetX - BoardOffset) / CellSize);
  var j = Math.floor((ev.offsetY - BoardOffset) / CellSize);
  if (i > gbl.ctx15.width) {
    shuffle15(gbl.ctx15);
  }
  swap15(gbl.ctx15, { x: i, y: j });
  gbl.points.push({
    x: ev.offsetX,
    y: ev.offsetY,
  });
}

function initAll() {
  const canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  gbl = {
    ctx,
    lastUpdate: new Date(),
    points: [],
    ctx15: init15(16),
  };
  resize();
  window.addEventListener('resize', resize, false);
  canvas.onclick = canvasClick;
}

initAll();

function drawPoint(pt) {
  var ctx = gbl.ctx;
  ctx.strokeStyle = 'rgba(255, 128, 128, 0.3)';
  ctx.strokeWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pt.x, pt.y);
  ctx.lineTo(pt.x + 10, pt.y);
  ctx.moveTo(pt.x, pt.y);
  ctx.lineTo(pt.x, pt.y + 10);
  ctx.stroke();
}

function drawPoints() {
  gbl.points.forEach((pt) => {
    drawPoint(pt);
  });
}

function drawCell15(ctx15, i, j, x, y) {
  var ctx = gbl.ctx;
  var pad = 2;

  var value = getCell15(ctx15, { x: i, y: j });
  if (value > 0) {
    ctx.strokeStyle = '#aaa';
    ctx.strokeWidth = '1';
    ctx.strokeRect(x + pad, y + pad, CellSize - pad * 2, CellSize - pad * 2);

    ctx.fillStyle = '#aaa';
    ctx.font = NumberSize + 'px monospace';
    ctx.fillText(value, x + pad * 2, y + NumberSize + pad * 2);
  }
}

function draw15() {
  var ctx15 = gbl.ctx15;
  for (var j = 0; j < ctx15.width; j++) {
    for (var i = 0; i < ctx15.width; i++) {
      drawCell15(ctx15, i, j, i * CellSize + BoardOffset, j * CellSize + BoardOffset);
    }
  }
}

setInterval(() => {
  var ctx = gbl.ctx;
  var width = gbl.width;
  var height = gbl.height;

  ctx.fillStyle = BackgroundColor;
  ctx.fillRect(0, 0, width, height);

  var current = new Date();
  var dt = (current - gbl.lastUpdate) / 1000;
  if (dt > 10) {
    dt = 0.01; // Pick up where you left off when javascript goes to sleep
  }
  draw15();
  drawPoints();
  gbl.lastUpdate = current;
}, 1000 / 60);
