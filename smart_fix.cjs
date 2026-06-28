const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    let original = content;

    // Replace specific known apostrophe cases first
    const apostropheRegex = /\b([a-zA-Z]+)\?(s|t|re|ll|m|ve|d)\b/gi;
    content = content.replace(apostropheRegex, (match, p1, p2) => {
        // e.g., it?s -> it's, doesn?t -> doesn't
        return `${p1}'${p2}`;
    });

    // Replace remaining weird ? connecting two letters with em-dash
    const emDashRegex = /([a-zA-Z])\?([a-zA-Z])/g;
    content = content.replace(emDashRegex, (match, p1, p2) => {
        return `${p1}—${p2}`;
    });

    if (content !== original) {
        fs.writeFileSync(path.join(dir, file), content, 'utf-8');
        console.log(`Fixed encoding marks in ${file}`);
    }
});
