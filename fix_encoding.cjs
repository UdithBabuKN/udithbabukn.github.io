const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    let changed = false;

    // Replace \uFFFD with em-dash
    if (content.includes('\uFFFD')) {
        content = content.replaceAll('\uFFFD', '—');
        changed = true;
        console.log(`Replaced \\uFFFD in ${file}`);
    }

    // Look for weird literal '?' replacing dashes, like word?word
    const lines = content.split('\n');
    lines.forEach((line, i) => {
        if (/[a-zA-Z]\?[a-zA-Z]/.test(line)) {
            console.log(`Suspicious '?' in ${file} line ${i + 1}: ${line.trim()}`);
        }
    });

    if (changed) {
        fs.writeFileSync(path.join(dir, file), content, 'utf-8');
    }
});
