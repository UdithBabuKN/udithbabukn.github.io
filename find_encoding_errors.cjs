const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let found = false;
files.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    if (content.includes('\uFFFD')) {
        found = true;
        console.log(`File: ${file}`);
        const lines = content.split('\n');
        lines.forEach((line, i) => {
            if (line.includes('\uFFFD')) {
                console.log(`Line ${i + 1}: ${line.trim()}`);
            }
        });
        console.log('---');
    }
});

if (!found) {
    console.log("No \\uFFFD characters found.");
}
