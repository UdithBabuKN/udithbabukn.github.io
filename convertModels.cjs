const fs = require('fs');

function extractBase64AndSave(inFile, outFile) {
    console.log(`Processing ${inFile}...`);
    try {
        const content = fs.readFileSync(inFile, 'utf8');
        const prefix = 'base64,';
        const prefixIndex = content.indexOf(prefix);
        if (prefixIndex === -1) {
            console.log(`Prefix not found in ${inFile}`);
            return;
        }
        let base64String = content.substring(prefixIndex + prefix.length);
        // Remove trailing quote or semicolon if present
        base64String = base64String.replace(/["';\s]+$/, '');
        
        const buffer = Buffer.from(base64String, 'base64');
        fs.writeFileSync(outFile, buffer);
        console.log(`Saved ${outFile}`);
    } catch (e) {
        console.error(`Error processing ${inFile}:`, e);
    }
}

extractBase64AndSave('./public/udith.js', './public/udith.glb');
extractBase64AndSave('./public/udith1.js', './public/udith1.glb');
