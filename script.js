
let canvas, ctx;
let isDrawing = false;
let hasSignature = false;

document.addEventListener('DOMContentLoaded', () => {
  canvas = document.getElementById('signatureCanvas');
  ctx = canvas.getContext('2d');

  setupCanvas();
  setupListeners();
  checkForm();
});

function setupCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function setupListeners() {
  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('touchstart', startDraw);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', stopDraw);
  document.getElementById('clearSignature').addEventListener('click', clearCanvas);
  document.getElementById('fullName').addEventListener('input', checkForm);
  document.getElementById('email').addEventListener('input', checkForm);
  document.getElementById('agreeTerms').addEventListener('change', checkForm);
  document.getElementById('signatureForm').addEventListener('submit', signNDA);
}

function startDraw(e) {
  isDrawing = true;
  const pos = getPosition(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const pos = getPosition(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  hasSignature = true;
  checkForm();
}

function stopDraw() {
  isDrawing = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hasSignature = false;
  checkForm();
}

function checkForm() {
  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const agree = document.getElementById('agreeTerms').checked;
  document.getElementById('signButton').disabled = !(name && email && agree && hasSignature);
}

function signNDA(e) {
  e.preventDefault();
  setTimeout(() => {
    document.getElementById('ndaForm').style.display = 'none';
    document.getElementById('documentViewer').style.display = 'block';
    window.location.hash = '#documentViewer';
  }, 1000);
}

function getPosition(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX || e.touches?.[0].clientX) - rect.left;
  const y = (e.clientY || e.touches?.[0].clientY) - rect.top;
  return { x, y };
}
