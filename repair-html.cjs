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

const perfectSidebarAndHeader = `<!-- Sidebar Navigation (Desktop) -->
        <aside class="sidebar" id="sidebar" aria-label="Sidebar Navigation">
            <div class="sidebar-indicator"></div>
            <div class="profile-header">
                <img src="../picofme.webp" alt="Udith Babu K N - Digital Marketing Expert" class="profile-pic" loading="lazy" width="50" height="50">
                <div class="logo">Udith Babu K N</div>
            </div>
            <button class="theme-toggle" id="themeToggle" aria-label="Toggle color theme" aria-pressed="false">
                <i class="ph-duotone ph-moon"></i>
            </button>
            <div class="contact-info">
                <div class="contact-item">
                    <i class="ph-duotone ph-envelope-simple" aria-hidden="true"></i>
                    <a href="#" class="email-link" aria-label="Email Udith Babu"><span class="email-placeholder">Loading email...</span></a>
                </div>
                <div class="contact-item">
                    <i class="ph-duotone ph-phone" aria-hidden="true"></i>
                    <a href="tel:+918301993853" aria-label="Call Udith Babu">+91 8301993853</a>
                </div>
                <div class="contact-item">
                    <i class="ph-duotone ph-map-pin" aria-hidden="true"></i>
                    <span>Thalassery, Kerala, India</span>
                </div>
            </div>

            <nav class="nav-menu" id="navMenu">
                <a href="../index.html#summary" class="nav-link" data-section="summary"><i class="ph-duotone ph-user"></i><span>Summary</span></a>
                <a href="../index.html#skills" class="nav-link" data-section="skills"><i class="ph-duotone ph-gear"></i><span>Skills</span></a>
                <a href="../index.html#experience" class="nav-link" data-section="experience"><i class="ph-duotone ph-briefcase"></i><span>Experience</span></a>
                <a href="../index.html#education" class="nav-link" data-section="education"><i class="ph-duotone ph-graduation-cap"></i><span>Education</span></a>
                <a href="../index.html#projects" class="nav-link" data-section="projects"><i class="ph-duotone ph-tree-structure"></i><span>Projects</span></a>
                <a href="../#blog" class="nav-link active" data-section="blog"><i class="ph-duotone ph-feather"></i><span>Blog</span></a>
                <a href="../index.html#certifications" class="nav-link" data-section="certifications"><i class="ph-duotone ph-certificate"></i><span>Certs</span></a>
                <a href="../index.html#contact" class="nav-link" data-section="contact"><i class="ph-duotone ph-envelope-simple"></i><span>Contact</span></a>
            </nav>

            <div class="social-links">
                <a href="https://www.linkedin.com/in/udith-babu-k-n" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn Profile"><i class="ph-duotone ph-linkedin-logo" aria-hidden="true"></i></a>
                <a href="https://www.instagram.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram Profile"><i class="ph-duotone ph-instagram-logo" aria-hidden="true"></i></a>
                <a href="https://www.facebook.com/darkHeavan" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook Profile"><i class="ph-duotone ph-facebook-logo" aria-hidden="true"></i></a>
                <a href="https://x.com/dark_heavan7" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="X (Twitter) Profile"><i class="ph-duotone ph-x-logo" aria-hidden="true"></i></a>
                <a href="https://medium.com/@udithbabuvarrier10" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Read Udith Babu K N's Medium Blog"><i class="ph-duotone ph-medium-logo" aria-hidden="true"></i></a>
                <a href="https://br.pinterest.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="View Udith Babu K N's Pinterest Profile"><i class="ph-duotone ph-pinterest-logo" aria-hidden="true"></i></a>
                <a href="https://www.pexels.com/@udith-babu-k-n-288919024" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Pexels Profile"><i class="ph-duotone ph-camera" aria-hidden="true"></i></a>
            </div>
        </aside>

        <!-- Main Content Area -->
        <main class="content" id="main-content" aria-label="Main Content">

            <!-- Header for Mobile View -->
            <header class="mobile-header">
                <div class="profile-header">
                    <img src="../picofme.webp" alt="Udith Babu K N - Digital Marketing Expert" class="profile-pic" loading="lazy" width="50" height="50">
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
                    <button class="theme-toggle" id="mobileThemeToggle" aria-label="Toggle color theme" aria-pressed="false">
                        <i class="ph-duotone ph-moon"></i>
                    </button>
                </div>
            </header>

            `;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace everything from <!-- Sidebar Navigation (Desktop) --> up to JUST BEFORE <!-- Breadcrumbs -->
    const regex = /<!-- Sidebar Navigation \(Desktop\) -->[\s\S]*?(?=<!-- Breadcrumbs -->)/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, perfectSidebarAndHeader);
        fs.writeFileSync(file, content);
        console.log(`Rebuilt UI structure for ${file}`);
    } else {
        console.log(`Could not find structure block in ${file}`);
    }
});
