// Script to generate PWA icons
// This creates simple placeholder icons - you can replace with actual designs later

const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../public/icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create a simple SVG template for each size
function createIconSVG(size) {
  const padding = size * 0.15;
  const shieldSize = size - (padding * 2);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background with rounded corners -->
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>

  <!-- Shield with checkmark -->
  <g transform="translate(${padding}, ${padding})">
    <path d="M ${shieldSize/2} ${shieldSize * 0.1} L ${shieldSize * 0.2} ${shieldSize * 0.3} V ${shieldSize * 0.5} C ${shieldSize * 0.2} ${shieldSize * 0.75} ${shieldSize * 0.35} ${shieldSize * 0.92} ${shieldSize/2} ${shieldSize} C ${shieldSize * 0.65} ${shieldSize * 0.92} ${shieldSize * 0.8} ${shieldSize * 0.75} ${shieldSize * 0.8} ${shieldSize * 0.5} V ${shieldSize * 0.3} L ${shieldSize/2} ${shieldSize * 0.1} Z"
          fill="white"/>

    <!-- Checkmark -->
    <path d="M ${shieldSize * 0.4} ${shieldSize * 0.6} L ${shieldSize * 0.3} ${shieldSize * 0.5} L ${shieldSize * 0.35} ${shieldSize * 0.45} L ${shieldSize * 0.4} ${shieldSize * 0.5} L ${shieldSize * 0.65} ${shieldSize * 0.3} L ${shieldSize * 0.7} ${shieldSize * 0.35} L ${shieldSize * 0.4} ${shieldSize * 0.6} Z"
          fill="#10b981"/>
  </g>
</svg>`;
}

console.log('Generating PWA icons...\n');

sizes.forEach(size => {
  const svg = createIconSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);

  fs.writeFileSync(filepath, svg);
  console.log(`✓ Created ${filename}`);
});

// Also create a favicon.ico placeholder message
const readmePath = path.join(iconsDir, 'README.md');
fs.writeFileSync(readmePath, `# SafeBaby Icons

These are the PWA icons for SafeBaby app.

## Current Icons
- SVG files for all PWA sizes (72x72 to 512x512)
- Generated with green gradient background and shield+checkmark design

## To Convert to PNG (Optional)
If you prefer PNG files over SVG, you can:
1. Use an online tool like https://svgtopng.com/
2. Or use ImageMagick: \`convert icon-192x192.svg icon-192x192.png\`
3. Or use the icons as-is (modern browsers support SVG icons)

## Design
- Color: Green gradient (#10b981 to #059669)
- Symbol: Shield with checkmark (representing safety)
- Style: Modern, rounded corners
`);

console.log('✓ Created README.md');
console.log('\n✅ Icon generation complete!');
console.log('\n📝 Note: Icons are in SVG format. Modern browsers support SVG icons.');
console.log('   If you need PNG, see public/icons/README.md for conversion options.\n');
