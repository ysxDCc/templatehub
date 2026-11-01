const fs = require('fs');
let code = fs.readFileSync('src/data/templates.ts', 'utf8');
code = code.split('.jpg').join('.svg');
fs.writeFileSync('src/data/templates.ts', code, 'utf8');
console.log('Successfully updated preview extensions to .svg');
