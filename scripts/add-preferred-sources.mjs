import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.resolve('public/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

console.log(`Processing ${files.length} blog articles...`);

const scriptTag = `    <!-- Google Preferred Sources (https://developers.google.com/search/docs/appearance/preferred-sources) -->\n    <script async src="https://news.google.com/swg/js/v1/publisher.js"></script>\n`;

const buttonMarkup = `          <!-- Google Preferred Sources (https://developers.google.com/search/docs/appearance/preferred-sources) -->\n          <div class="sk-preferred-source-bar">\n            <div google-add-preferred-source-btn data-theme="light"></div>\n          </div>\n\n`;

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Add script tag to <head> if not present
  if (!content.includes('news.google.com/swg/js/v1/publisher.js')) {
    if (content.includes('</head>')) {
      content = content.replace('</head>', `${scriptTag}</head>`);
      changed = true;
    }
  }

  // 2. Add button above cover frame if not present
  if (!content.includes('google-add-preferred-source-btn')) {
    if (content.includes('<div class="sk-article-cover-frame">')) {
      content = content.replace('<div class="sk-article-cover-frame">', `${buttonMarkup}          <div class="sk-article-cover-frame">`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  }
}

console.log(`Successfully updated ${updatedCount} files.`);
