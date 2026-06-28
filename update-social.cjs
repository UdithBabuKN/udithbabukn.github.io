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

const files = walkDir(path.join(__dirname, 'public/blog'));

const newSocialLinks = `<div class="social-links">
                          <a href="https://www.linkedin.com/in/udith-babu-k-n" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn Profile"><i class="ph-duotone ph-linkedin-logo" aria-hidden="true"></i></a>
                          <a href="https://www.instagram.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram Profile"><i class="ph-duotone ph-instagram-logo" aria-hidden="true"></i></a>
                          <a href="https://www.facebook.com/darkHeavan" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook Profile"><i class="ph-duotone ph-facebook-logo" aria-hidden="true"></i></a>
                          <a href="https://x.com/dark_heavan7" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="X (Twitter) Profile"><i class="ph-duotone ph-x-logo" aria-hidden="true"></i></a>
                          <a href="https://medium.com/@udithbabuvarrier10" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Read Udith Babu K N's Medium Blog"><i class="ph-duotone ph-medium-logo" aria-hidden="true"></i></a>
                          <a href="https://br.pinterest.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="View Udith Babu K N's Pinterest Profile"><i class="ph-duotone ph-pinterest-logo" aria-hidden="true"></i></a>
                          <a href="https://www.pexels.com/@udith-babu-k-n-288919024" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Pexels Profile"><i class="ph-duotone ph-camera" aria-hidden="true"></i></a>
                      </div>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Regex to match the entire social-links div and its contents up until the next sibling element (theme-toggle button)
    const regex = /<div\s+class="social-links">[\s\S]*?<\/div>\s*<button/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, `${newSocialLinks}\n                      <button`);
        fs.writeFileSync(file, content);
        console.log(`Updated social links in ${file}`);
    }
});
