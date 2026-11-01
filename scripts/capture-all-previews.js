const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const templatesDir = path.join(__dirname, '..', 'public', 'templates');
const outDir = path.join(__dirname, '..', 'public', 'previews');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const templateIds = fs.readdirSync(templatesDir).filter(f => {
  const stat = fs.statSync(path.join(templatesDir, f));
  return stat.isDirectory() && fs.existsSync(path.join(templatesDir, f, 'index.html'));
});

console.log(`Found ${templateIds.length} templates to screenshot.`);

let success = 0;
let failed = 0;

for (let i = 0; i < templateIds.length; i++) {
  const id = templateIds[i];
  const htmlPath = path.join(templatesDir, id, 'index.html');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const outPath = path.join(outDir, `${id}.png`);

  console.log(`[${i + 1}/${templateIds.length}] Capturing ${id}...`);

  const args = [
    '--headless=new',
    '--hide-scrollbars',
    '--disable-gpu',
    '--no-sandbox',
    '--virtual-time-budget=2000',
    '--window-size=1280,800',
    `--screenshot=${outPath}`,
    fileUrl
  ];

  const res = spawnSync(edgePath, args, { stdio: 'ignore', timeout: 15000 });

  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) {
    const sizeKb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`  ✓ ${id}.png generated (${sizeKb} KB)`);
    success++;
  } else {
    console.error(`  ✗ Failed to capture ${id}`);
    failed++;
  }
}

console.log(`\nFinished: ${success} succeeded, ${failed} failed.`);
