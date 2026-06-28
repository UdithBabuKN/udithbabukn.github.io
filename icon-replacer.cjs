const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
}

const files = walkDir(path.join(__dirname, 'blog'));
const NEW_FONTS = '<link rel="preload" href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">\n    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap"></noscript>';
const PHOSPHOR_SCRIPT = '<script src="https://unpkg.com/@phosphor-icons/web"></script>';

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. Replace Google Fonts (Regex to match multiline link tag)
    const fontRegex = /<link[^>]*href="https:\/\/fonts\.googleapis\.com[^>]*>/gi;
    if (fontRegex.test(content)) {
        content = content.replace(fontRegex, NEW_FONTS);
        changed = true;
    }

    // 2. Replace FontAwesome (Regex to match version 6.4.0, 6.6.0, etc)
    const faRegex = /<link[^>]*href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome[^>]*>/gi;
    if (faRegex.test(content)) {
        content = content.replace(faRegex, PHOSPHOR_SCRIPT);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated fonts/icons in ${file}`);
    }
});
