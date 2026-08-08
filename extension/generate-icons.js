// Run with: node generate-icons.js
// Requires: npm install canvas (or use browser-based approach)
// Alternatively open generate-icons.html in a browser to save icons

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [16, 48, 128];

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const s = size;

  // Background circle
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
  ctx.fillStyle = '#2A5D67';
  ctx.fill();

  // Inner white circle (eye)
  const r = s * 0.28;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, r, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // Pupil
  const pr = s * 0.12;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, pr, 0, Math.PI * 2);
  ctx.fillStyle = '#F87171';
  ctx.fill();

  return canvas.toBuffer('image/png');
}

sizes.forEach(size => {
  const buf = drawIcon(size);
  const out = path.join(__dirname, 'icons', `icon${size}.png`);
  fs.writeFileSync(out, buf);
  console.log(`Written: ${out}`);
});

console.log('Done!');
