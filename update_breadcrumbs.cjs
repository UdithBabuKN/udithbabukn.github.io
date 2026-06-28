const fs = require('fs');
const path = require('path');

// 1. Append CSS to style files
const cssToAdd = `
/* Modern Breadcrumbs Navigation */
.breadcrumbs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 0.6rem 1.25rem;
    background-color: rgba(255, 255, 255, 0.03);
    background-image: var(--anime-dot);
    background-size: var(--anime-dot-size);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--border-color);
    border-radius: 99px;
    font-size: 0.85rem;
    font-weight: 500;
    max-width: 800px;
    margin: 2rem auto 0 auto;
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: var(--transition);
}

.breadcrumbs:hover {
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

[data-theme="light"] .breadcrumbs {
    background-color: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.1);
}

[data-theme="light"] .breadcrumbs:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

.breadcrumbs a {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.3s ease, transform 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
}

.breadcrumbs a:hover {
    color: var(--primary-color);
    transform: translateY(-1px);
}

.breadcrumbs .separator {
    color: var(--text-muted);
    opacity: 0.4;
    font-size: 0.8rem;
    user-select: none;
    margin: 0 0.1rem;
}

.breadcrumbs .current {
    color: var(--text-color);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
}

@media (max-width: 768px) {
    .breadcrumbs {
        border-radius: 12px;
        margin: 1.5rem 1rem 0 1rem;
        padding: 0.75rem 1rem;
        width: calc(100% - 2rem);
    }
    .breadcrumbs .current {
        max-width: 140px;
    }
}
`;

const cssFiles = ['style.css', 'public/style.css', 'src/index.css'];
cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    if (!content.includes('/* Modern Breadcrumbs Navigation */')) {
        content += '\n' + cssToAdd;
        fs.writeFileSync(file, content, 'utf-8');
        console.log("Updated CSS in " + file);
    }
});

// 2. Update HTML files in public/blog
const blogDir = path.join(__dirname, 'public', 'blog');
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

blogFiles.forEach(file => {
    let content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    let original = content;

    const startTag = '<nav aria-label="breadcrumb" class="breadcrumbs">';
    const endTag = '</nav>';
    
    let startIndex = content.indexOf(startTag);
    if (startIndex !== -1) {
        let endIndex = content.indexOf(endTag, startIndex);
        if (endIndex !== -1) {
            let bcContent = content.substring(startIndex + startTag.length, endIndex);
            
            // string replace
            bcContent = bcContent.split('<a href="../index.html">Home</a>').join('<a href="../index.html"><i class="ph-duotone ph-house"></i> Home</a>');
            bcContent = bcContent.split('<a href="../#blog">Blog</a>').join('<a href="../#blog"><i class="ph-duotone ph-feather"></i> Blog</a>');
            bcContent = bcContent.split('<span class="separator">/</span>').join('<i class="ph-bold ph-caret-right separator"></i>');
            
            if (!bcContent.includes('<i class="ph-duotone ph-text-align-left"></i>')) {
                bcContent = bcContent.replace(/<span class="current">(.*?)<\/span>/, '<span class="current"><i class="ph-duotone ph-text-align-left"></i> $1</span>');
            }
            
            content = content.substring(0, startIndex + startTag.length) + bcContent + content.substring(endIndex);
        }
    }

    if (content !== original) {
        fs.writeFileSync(path.join(blogDir, file), content, 'utf-8');
        console.log("Updated HTML in " + file);
    }
});
