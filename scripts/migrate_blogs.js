import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'public', 'blog');

const MOBILE_HEADER_HTML = `
<!-- Mobile Header -->
<header class="mobile-header">
    <div class="profile-header">
        <img src="../picofme.webp" alt="Profile picture of Udith Babu K N" class="profile-pic" width="50" height="50" fetchpriority="high" decoding="async">
        <div class="logo">Udith Babu K N</div>
    </div>
    <div class="mobile-header-actions">
        <div class="social-links">
            <a href="https://www.linkedin.com/in/udith-babu-k-n" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn Profile"><i class="ph-duotone ph-linkedin-logo" aria-hidden="true"></i></a>
            <a href="https://www.instagram.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram Profile"><i class="ph-duotone ph-instagram-logo" aria-hidden="true"></i></a>
            <a href="https://www.facebook.com/darkHeavan" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook Profile"><i class="ph-duotone ph-facebook-logo" aria-hidden="true"></i></a>
            <a href="https://x.com/dark_heavan7" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="X (Twitter) Profile"><i class="ph-duotone ph-x-logo" aria-hidden="true"></i></a>
            <a href="https://medium.com/@udithbabuvarrier10" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Read Udith Babu K N's Medium Blog"><i class="ph-duotone ph-medium-logo" aria-hidden="true"></i></a>
            <a href="https://br.pinterest.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="View Udith Babu K N's Pinterest Profile"><i class="ph-duotone ph-pinterest-logo" aria-hidden="true"></i></a>
            <a href="https://www.pexels.com/@udith-babu-k-n-288919024" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Pexels Profile"><i class="ph-duotone ph-camera" aria-hidden="true"></i></a>
        </div>
    </div>
</header>
`;

const BOTTOM_DOCK_HTML = `
<!-- Bottom Dock -->
<nav class="bottom-dock" aria-label="Main Navigation">
    <ul class="dock-list">
        <li class="dock-item">
            <a href="/#summary" class="dock-link" title="Summary">
                <i class="ph-duotone ph-user" aria-hidden="true"></i><span class="dock-tooltip">Summary</span>
            </a>
        </li>
        <li class="dock-item">
            <a href="/#skills" class="dock-link" title="Skills">
                <i class="ph-duotone ph-gear" aria-hidden="true"></i><span class="dock-tooltip">Skills</span>
            </a>
        </li>
        <li class="dock-item">
            <a href="/#experience" class="dock-link" title="Experience">
                <i class="ph-duotone ph-briefcase" aria-hidden="true"></i><span class="dock-tooltip">Experience</span>
            </a>
        </li>
        <li class="dock-item">
            <a href="/#education" class="dock-link" title="Education">
                <i class="ph-duotone ph-graduation-cap" aria-hidden="true"></i><span class="dock-tooltip">Education</span>
            </a>
        </li>
        <li class="dock-item">
            <a href="/#projects" class="dock-link" title="Projects">
                <i class="ph-duotone ph-tree-structure" aria-hidden="true"></i><span class="dock-tooltip">Projects</span>
            </a>
        </li>
        <li class="dock-item">
            <a href="/#blog" class="dock-link active" aria-current="page" title="Blog">
                <i class="ph-duotone ph-feather" aria-hidden="true"></i><span class="dock-tooltip">Blog</span>
            </a>
        </li>
        <li class="dock-item">
            <a href="/#certifications" class="dock-link" title="Certifications">
                <i class="ph-duotone ph-certificate" aria-hidden="true"></i><span class="dock-tooltip">Certifications</span>
            </a>
        </li>
        <li class="dock-item">
            <a href="/#faq" class="dock-link" title="FAQ">
                <i class="ph-duotone ph-question" aria-hidden="true"></i><span class="dock-tooltip">FAQ</span>
            </a>
        </li>
        <li class="dock-item">
            <a href="/#contact" class="dock-link" title="Contact">
                <i class="ph-duotone ph-envelope-simple" aria-hidden="true"></i><span class="dock-tooltip">Contact</span>
            </a>
        </li>
        
        <div class="dock-separator desktop-only"></div>
        <li class="dock-item desktop-only">
            <a href="https://www.linkedin.com/in/udith-babu-k-n" target="_blank" rel="noopener noreferrer" class="dock-link" title="LinkedIn">
                <i class="ph-duotone ph-linkedin-logo" aria-hidden="true"></i><span class="dock-tooltip">LinkedIn</span>
            </a>
        </li>
        <li class="dock-item desktop-only">
            <a href="https://www.instagram.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" class="dock-link" title="Instagram">
                <i class="ph-duotone ph-instagram-logo" aria-hidden="true"></i><span class="dock-tooltip">Instagram</span>
            </a>
        </li>
        <li class="dock-item desktop-only">
            <a href="https://www.facebook.com/darkHeavan" target="_blank" rel="noopener noreferrer" class="dock-link" title="Facebook">
                <i class="ph-duotone ph-facebook-logo" aria-hidden="true"></i><span class="dock-tooltip">Facebook</span>
            </a>
        </li>
        <li class="dock-item desktop-only">
            <a href="https://x.com/dark_heavan7" target="_blank" rel="noopener noreferrer" class="dock-link" title="X (Twitter)">
                <i class="ph-duotone ph-x-logo" aria-hidden="true"></i><span class="dock-tooltip">X (Twitter)</span>
            </a>
        </li>
    </ul>
</nav>
`;

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

let count = 0;
files.forEach(file => {
    const filePath = path.join(blogDir, file);
    let html = fs.readFileSync(filePath, 'utf-8');

    // Remove old sidebar
    html = html.replace(/<!-- Sidebar Navigation \(Desktop\) -->[\s\S]*?<\/aside>/, '');
    
    // Remove old mobile nav (if exists, even without comment)
    html = html.replace(/<nav class="bottom-nav"[\s\S]*?<\/nav>/, '');
    html = html.replace(/<!-- Bottom Navigation Bar for Mobile -->\s*/, '');

    // Remove original mobile header from inside <main>
    html = html.replace(/<!-- Header for Mobile View -->[\s\S]*?<\/header>/, '');

    // Inject model-viewer script into <head> if not present
    if (!html.includes('model-viewer.min.js')) {
        html = html.replace(/<\/head>/i, '    <!-- Model Viewer for 3D Background -->\n    <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>\n</head>');
    }

    // Using regex to replace the container up to the start of <article> (or breadcrumbs)
    if (/class="content"/.test(html)) {
        const replacement = `
<div class="app-container">
  <video class="bg-image-layer" autoPlay loop muted playsInline src="../bgvideo.mp4" style="object-fit: cover;" oncanplay="this.playbackRate = 0.5" ontimeupdate="if(this.duration && this.currentTime >= this.duration - 0.05) { this.currentTime = 0; this.play(); }"></video>
  <model-viewer id="bg-model" src="../udith3d4k.glb" autoplay camera-orbit="-56deg 70deg 100%" camera-target="auto 1.0m auto" interpolation-decay="100" interaction-prompt="none" animation-crossfade-duration="800" shadow-intensity="1" environment-image="neutral" exposure="1" class="bg-model-viewer"></model-viewer>
  <div class="container">
      ${BOTTOM_DOCK_HTML}
      <main class="content blog-static-content" id="main-content" aria-label="Main Content">
          ${MOBILE_HEADER_HTML}
          <div class="content-scroller">
              <div class="blog-card-container">
`;
        
        // This regex captures everything from <div class="container"> up to <nav aria-label="breadcrumb"> OR <article> 
        html = html.replace(/<div class="container">[\s\S]*?(<nav aria-label="breadcrumb"|<article>)/, replacement + '$1');
            
        // The original file ends with </main>\s*</div> (followed by mobile nav, which we removed)
        // Since we opened <div class="app-container">, <div class="container">, <div class="content-scroller">, <div class="blog-card-container">, and <main>
        // We replace </main>\s*</div> with closing tags for all of them.
        html = html.replace(/<\/main>\s*<\/div>/, '</div>\n</div>\n</main>\n</div>\n</div>');
        
        fs.writeFileSync(filePath, html);
        count++;
    }
});

console.log('Modified', count, 'blog posts successfully.');
