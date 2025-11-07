// Script to generate PNG icons from SVG for PWA
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
const svgPath = path.join(iconsDir, 'icon-192x192.svg');

async function generateIcons() {
  console.log('🎨 Generating PWA PNG icons from SVG...');

  if (!fs.existsSync(svgPath)) {
    console.error('❌ SVG source file not found:', svgPath);
    process.exit(1);
  }

  for (const size of sizes) {
    const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);

    try {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${size}x${size} icon`);
    } catch (error) {
      console.error(`❌ Failed to generate ${size}x${size} icon:`, error.message);
    }
  }

  console.log('✨ PWA icons generation complete!');
}

generateIcons().catch(console.error);
