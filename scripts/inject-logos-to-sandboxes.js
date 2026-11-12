const fs = require('fs');
const path = require('path');

const ids = [
  'solaris-fusion', 'velvet-atelier', 'aether-neuro', 'obsidian-terminal', 'valkyrie-aero',
  'horology-complication', 'arcane-distillery', 'hyperion-robotics', 'magma-deepcore', 'apex-endurance',
  'monolith-acoustics', 'terra-mycelium', 'helios-orbital', 'kaiseki-sanctuary', 'vanguard-quant',
  'hydros-foil', 'solarium-conservatory', 'sentinel-swarm', 'brutalist-sanctuary', 'pulselab-crispr'
];

let updatedCount = 0;

for (const id of ids) {
  const htmlPath = path.join(__dirname, '..', 'templates-src', id, 'index.html');
  const logoPath = path.join(__dirname, '..', 'public', 'logos', `${id}.svg`);

  if (!fs.existsSync(htmlPath) || !fs.existsSync(logoPath)) {
    console.warn(`Skipping ${id} (file not found)`);
    continue;
  }

  let html = fs.readFileSync(htmlPath, 'utf8');
  let svg = fs.readFileSync(logoPath, 'utf8').trim();

  // Ensure svg has proper size attributes for inline navbar rendering
  const inlineSvg = svg
    .replace(/width="[^"]*"/, 'width="30"')
    .replace(/height="[^"]*"/, 'height="30"')
    .replace('<svg ', '<svg style="vertical-align: middle; margin-right: 10px; display: inline-block; flex-shrink: 0;" ');

  // Look for logo / brand container
  const logoRegex = /(<a[^>]*class="[^"]*(?:logo|brand)[^"]*"[^>]*>)([\s\S]*?)(<\/a>)/i;
  const brandDivRegex = /(<div[^>]*class="[^"]*(?:logo|brand)[^"]*"[^>]*>)([\s\S]*?)(<\/div>)/i;

  if (logoRegex.test(html)) {
    html = html.replace(logoRegex, (match, openTag, inner, closeTag) => {
      // Remove any previous emoji or small placeholder icon if needed, but preserve brand text
      const cleanInner = inner.replace(/<span class="logo-core"[^>]*><\/span>/, '').replace(/^[^\w<]+/, '').trim();
      return `${openTag}${inlineSvg}<span>${cleanInner}</span>${closeTag}`;
    });
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`✓ Injected vector logo into ${id}/index.html (<a>)`);
    updatedCount++;
  } else if (brandDivRegex.test(html)) {
    html = html.replace(brandDivRegex, (match, openTag, inner, closeTag) => {
      const cleanInner = inner.trim();
      return `${openTag}${inlineSvg}<span>${cleanInner}</span>${closeTag}`;
    });
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`✓ Injected vector logo into ${id}/index.html (<div>)`);
    updatedCount++;
  } else {
    // If no logo class, prepend right after <header ...> or <nav ...>
    const navRegex = /(<header[^>]*>[\s\S]*?<nav[^>]*>)/i;
    if (navRegex.test(html)) {
      html = html.replace(navRegex, `$1<div class="brand-logo-container" style="display:flex;align-items:center;">${inlineSvg}</div>`);
      fs.writeFileSync(htmlPath, html, 'utf8');
      console.log(`✓ Injected vector logo into ${id}/index.html (fallback nav)`);
      updatedCount++;
    } else {
      console.warn(`Could not match header/logo in ${id}`);
    }
  }
}

console.log(`\nFinished: Injected vector logos into ${updatedCount} sandbox templates!`);
