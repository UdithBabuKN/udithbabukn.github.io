import fs from 'node:fs';
import path from 'node:path';

const browserDir = path.resolve('dist/portfolio/browser');

const cssFiles = fs
  .readdirSync(browserDir)
  .filter((f) => /^styles-.*\.css$/.test(f));

if (cssFiles.length === 0) {
  console.warn('optimize-prerender: no styles-*.css found, skipping.');
  process.exit(0);
}

const cssFile = cssFiles[0];
const escapedCssHref = cssFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const cssLinkRe = new RegExp(
  `<link\\s+rel="stylesheet"\\s+href="${escapedCssHref}"[^>]*>`,
  'g',
);
const beastiesScriptRe =
  /<script>document\.querySelectorAll\('link\[data-beasties-media\]'\)[^<]*<\/script>/g;
const modulePreloadRe = /<link\s+rel="modulepreload"\s+href="chunk-[^"]+">\s*/g;

const routeTargets = [
  { file: 'index.html', stripModulePreload: true },
  { file: 'work/index.html', stripModulePreload: true },
  { file: 'about/index.html', stripModulePreload: true },
  { file: 'skills/index.html', stripModulePreload: true },
  { file: 'blog/index.html', stripModulePreload: false },
  { file: 'contact/index.html', stripModulePreload: false },
];

for (const target of routeTargets) {
  const fullPath = path.join(browserDir, target.file);
  if (!fs.existsSync(fullPath)) continue;

  let html = fs.readFileSync(fullPath, 'utf8');

  // Keep beasties' lean route-specific inline <style> + <noscript> fallback,
  // defer full cross-route stylesheet loading until Angular bootstraps on interaction
  // to avoid a second full-document style recalculation during initial load.
  html = html.replace(
    new RegExp(
      `<link\\s+rel="stylesheet"\\s+href="${escapedCssHref}"\\s+media="print"\\s+data-beasties-media="all">`,
      'g',
    ),
    `<meta name="app-full-styles" content="${cssFile}">`,
  );
  html = html.replace(beastiesScriptRe, '');

  if (target.stripModulePreload) {
    html = html.replace(modulePreloadRe, '');
  }

  fs.writeFileSync(fullPath, html, 'utf8');
}

console.log(`optimize-prerender: deferred full ${cssFile} until interaction and stripped eager modulepreload.`);
