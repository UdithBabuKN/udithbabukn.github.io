const fs = require('fs');

const oldContent = fs.readFileSync('index_old.html', 'utf-8');

const headMatch = oldContent.match(/<head>([\s\S]*?)<\/head>/);
if (headMatch) {
    let headContent = headMatch[1];
    
    headContent = headContent.replace(/<link rel="stylesheet" href="style\.css".*?>/gs, '');
    headContent = headContent.replace(/<noscript>\s*<link rel="stylesheet" href="style\.css">\s*<\/noscript>/gs, '');
    headContent = headContent.replace(/<style>[\s\S]*?<\/style>/gs, '');

    const newIndex = `<!DOCTYPE html>
<html lang="en-IN" data-theme="light">
<head>
${headContent}
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>`;

    fs.writeFileSync('index.html', newIndex, 'utf-8');
}

const inlineStyleMatch = oldContent.match(/<style>([\s\S]*?)<\/style>/);
const cssContent = fs.readFileSync('style.css', 'utf-8');

let combinedCss = cssContent;
if (inlineStyleMatch) {
    combinedCss = inlineStyleMatch[1] + "\n" + cssContent;
}

fs.writeFileSync('src/index.css', combinedCss, 'utf-8');
