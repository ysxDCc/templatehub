const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'templates.ts');
let content = fs.readFileSync(filePath, 'utf8');

const updated = content.replace(/previewImage:\s*['"][^'"]+['"]/g, (match) => {
  const m = match.match(/\/previews\/([a-z0-9-]+)\./);
  if (m) {
    return `previewImage: '/previews/${m[1]}.png'`;
  }
  return match;
});

fs.writeFileSync(filePath, updated, 'utf8');
console.log('Successfully updated all previewImage paths to .png in templates.ts');
