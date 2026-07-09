import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, '../public/blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;
for(const file of files) {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf-8');
    if(/<nav class="bottom-nav"[^>]*>[\s\S]*?<\/nav>/.test(html)) {
        html = html.replace(/<nav class="bottom-nav"[^>]*>[\s\S]*?<\/nav>/, '');
        fs.writeFileSync(filePath, html);
        count++;
    }
}
console.log(`Removed from ${count} files`);
