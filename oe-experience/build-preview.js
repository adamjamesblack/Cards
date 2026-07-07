#!/usr/bin/env node
// Bundles "Member Landing Page Export.dc.html" into a single self-contained
// HTML file: inlines support.js, the _ds design-system CSS/JS, and local
// images (as data: URIs). External CDN references (unpkg React, Google
// Fonts) are left as-is. Usage: node build-preview.js [outfile]
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'Member Landing Page Export.dc.html');
const OUT = process.argv[2] || path.join(ROOT, 'Member Landing Page.html');

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

function dataUri(file) {
  const mime = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
  return `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
}

function readLocal(ref) {
  const clean = decodeURIComponent(ref.replace(/^\.\//, '').split(/[?#]/)[0]);
  const file = path.join(ROOT, clean);
  if (!file.startsWith(ROOT) || !fs.existsSync(file)) return null;
  return file;
}

let html = fs.readFileSync(SRC, 'utf8');

// Inline local <script src="..."> (support.js, _ds_bundle.js)
html = html.replace(/<script\s+src="(?!https?:)([^"]+)"><\/script>/g, (m, ref) => {
  const file = readLocal(ref);
  if (!file) return m;
  const js = fs.readFileSync(file, 'utf8').replace(/<\/script>/gi, '<\\/script>');
  return `<script data-inlined="${ref}">\n${js}\n</script>`;
});

// Inline local stylesheet <link>s
html = html.replace(/<link\s+rel="stylesheet"\s+href="(?!https?:)([^"]+)">/g, (m, ref) => {
  const file = readLocal(ref);
  if (!file) return m;
  let css = fs.readFileSync(file, 'utf8');
  // Resolve @import and url() inside the CSS relative to its own directory
  css = css.replace(/@import\s+url\('(?!https?:)([^']+)'\);/g, (m2, ref2) => {
    const f2 = readLocal(path.join(path.dirname(ref), ref2));
    return f2 ? fs.readFileSync(f2, 'utf8') : m2;
  });
  return `<style data-inlined="${ref}">\n${css}\n</style>`;
});

// Inline local images referenced via src="..."
html = html.replace(/src="(?!https?:|data:)([^"]+\.(?:png|jpe?g|gif|svg))"/g, (m, ref) => {
  const file = readLocal(ref);
  return file ? `src="${dataUri(file)}"` : m;
});

fs.writeFileSync(OUT, html);
console.log(`wrote ${OUT} (${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB)`);
