const canvas = document.getElementById('jsCanvas');
const context = canvas.getContext('2d');
const setRange = document.getElementById('jsRange');
const setColor = document.getElementById('jsColors');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

canvas.width = 500;
canvas.height = 500;

context.fillStyle = 'white';
context.fillRect(0, 0, 500, 500);

context.strokeStyle = 'black';
context.fillStyle = 'black';
context.lineWidth = 2.5;

let painting = false;
let filling = false;
let color = 'black';

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    context.beginPath();
    context.moveTo(x, y);
  } else {
    context.lineTo(x, y);
    context.stroke();
  }
}

function onRangeChange(event) {
  context.lineWidth = event.target.value;
}

function onColorChange(event) {
  color = event.target.style.backgroundColor;
  context.strokeStyle = color;
  context.fillStyle = color;
}

function onChangeMode() {
  if (!filling) {
    filling = true;
    mode.innerText = 'Paint';
  } else {
    filling = false;
    mode.innerText = 'Fill';
  }
}

function onFillCanvas() {
  if (filling) {
    context.fillRect(0, 0, 500, 500);
  }
}

function onSave() {
  const img = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = img;
  link.download = 'PaintJS';
  link.click();
}

function onClickCM(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', onFillCanvas);
  canvas.addEventListener('contextmenu', onClickCM);
}

if (setRange) {
  setRange.addEventListener('input', onRangeChange);
}

if (setColor) {
  setColor.addEventListener('click', onColorChange);
}

if (mode) {
  mode.addEventListener('click', onChangeMode);
}

if (saveBtn) {
  saveBtn.addEventListener('click', onSave);
}
