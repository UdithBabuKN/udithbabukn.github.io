const fs = require('fs');

const scriptContent = fs.readFileSync('script.js', 'utf-8');
const contentDataMatch = scriptContent.match(/const contentData = (\{[\s\S]*?\n    \});/);

if (contentDataMatch) {
    let contentDataStr = contentDataMatch[1];
    
    // We need to parse it securely or just string manipulation
    // Since it's a simple JS object, we can execute it to get the object
    const sandbox = {};
    eval(`sandbox.contentData = ${contentDataStr}`);
    
    let jsxExports = `import React, { useEffect, useRef } from 'react';\n\n`;

    for (const [key, data] of Object.entries(sandbox.contentData)) {
        let html = data.content;
        
        // Convert HTML to JSX
        html = html.replace(/class=/g, 'className=');
        html = html.replace(/tabindex=/g, 'tabIndex=');
        // ARIA attributes must remain hyphenated in React
        html = html.replace(/for=/g, 'htmlFor=');
        html = html.replace(/style="--angle: 45deg;"/g, "style={{ '--angle': '45deg' }}");
        html = html.replace(/style="--angle: 0deg;"/g, "style={{ '--angle': '0deg' }}");
        html = html.replace(/style="--angle: 90deg;"/g, "style={{ '--angle': '90deg' }}");
        html = html.replace(/style="--angle: 180deg;"/g, "style={{ '--angle': '180deg' }}");
        html = html.replace(/style="--angle: 270deg;"/g, "style={{ '--angle': '270deg' }}");
        html = html.replace(/style="display: none;"/g, "style={{ display: 'none' }}");
        html = html.replace(/<input(.*?)>/g, '<input$1 />'); // Close input tags
        // Handle `<hr>`
        html = html.replace(/<hr>/g, '<hr />');
        // Handle `<br>`
        html = html.replace(/<br>/g, '<br />');

        // Capitalize title
        const ComponentName = key.charAt(0).toUpperCase() + key.slice(1);

        jsxExports += `export const ${ComponentName} = () => {
    return (
        <section id="${key}" className="section" lang="en">
            <h2 className="section-header">${data.title}</h2>
            ${html}
        </section>
    );
};\n\n`;
    }

    fs.writeFileSync('src/data/contentComponents.jsx', jsxExports, 'utf-8');
    console.log("Successfully generated contentComponents.jsx");
} else {
    console.log("Failed to extract contentData");
}
