const fs = require('fs');
const path = require('path');

// 1. Fix CSS
const cssFiles = ['style.css', 'public/style.css', 'src/index.css'];
cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // The buggy CSS:
    //    .content {
    //        margin-left: 0;
    //        width: 100%;
    //        padding: 0 1rem 90px 1rem;
    //        min-height: 100vh;
    //        /* Revert for mobile to allow natural scroll */
    //        overflow-y: visible;
    //    }
    
    // We want to add height: auto; back so it doesn't get stuck at height: 100vh.
    const target = `    .content {
        margin-left: 0;
        width: 100%;
        padding: 0 1rem 90px 1rem;
        min-height: 100vh;
        /* Revert for mobile to allow natural scroll */
        overflow-y: visible;
    }`;
    
    const replacement = `    .content {
        margin-left: 0;
        width: 100%;
        padding: 0 1rem 90px 1rem;
        height: auto;
        min-height: 100vh;
        /* Revert for mobile to allow natural scroll */
        overflow-y: visible;
    }`;
    
    if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(file, content, 'utf-8');
        console.log("Fixed CSS in " + file);
    }
});

// 2. Remove published date from blog files
const blogDir = path.join(__dirname, 'public', 'blog');
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

const metaRegex = /<p class="article-meta">.*?<\/p>/g;

blogFiles.forEach(file => {
    let content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    let original = content;

    content = content.replace(metaRegex, '');

    if (content !== original) {
        fs.writeFileSync(path.join(blogDir, file), content, 'utf-8');
        console.log("Removed meta from HTML in " + file);
    }
});
