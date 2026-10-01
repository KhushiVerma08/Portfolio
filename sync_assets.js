const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const files = fs.readdirSync(assetsDir);

files.forEach(file => {
  const ext = path.extname(file);
  const base = path.basename(file, ext);
  const fullPath = path.join(assetsDir, file);

  if (['.jpg', '.jpeg', '.JPG', '.JPEG', '.png'].includes(ext)) {
    const targets = ['.jpg', '.jpeg', '.JPG', '.png'];
    targets.forEach(tExt => {
      const targetPath = path.join(assetsDir, base + tExt);
      if (!fs.existsSync(targetPath)) {
        try {
          fs.copyFileSync(fullPath, targetPath);
          console.log(`Copied ${file} -> ${base + tExt}`);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }
});

console.log('All formats synchronized:');
console.log(fs.readdirSync(assetsDir));
