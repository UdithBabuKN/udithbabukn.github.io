const fs = require('fs');

const cssToAdd = `
/* Bulletproof Mobile Footer Fix */
@media (max-width: 768px) {
    .container {
        height: auto !important;
        min-height: 100vh !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: visible !important;
    }
    .content {
        height: auto !important;
        min-height: 100vh !important;
        overflow-y: visible !important;
        flex: 1 0 auto !important;
    }
    .footer {
        position: relative !important;
        z-index: 10 !important;
        margin-top: 2rem !important;
        padding-bottom: 100px !important; /* clear bottom nav */
        clear: both !important;
    }
    body, html {
        height: auto !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
    }
}
`;

const cssFiles = ['style.css', 'public/style.css', 'src/index.css'];
cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    if (!content.includes('/* Bulletproof Mobile Footer Fix */')) {
        content += '\n' + cssToAdd;
        fs.writeFileSync(file, content, 'utf-8');
        console.log("Applied bulletproof footer fix to " + file);
    }
});
