document.addEventListener('DOMContentLoaded', () => {
    // --- SIDEBAR & MOBILE MENU LOGIC ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.content'); // content area
    const body = document.body;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    body.appendChild(overlay);

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('sidebar-open');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    // Close when clicking overlay
    overlay.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });


    // --- THEME TOGGLE LOGIC ---
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const htmlElement = document.documentElement;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    const mobileIcon = mobileThemeToggle ? mobileThemeToggle.querySelector('i') : null;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        htmlElement.dataset.theme = 'dark';
        if (icon) icon.className = 'ph-duotone ph-sun';
        if (mobileIcon) mobileIcon.className = 'ph-duotone ph-sun';
    } else {
        htmlElement.dataset.theme = 'light';
        if (icon) icon.className = 'ph-duotone ph-moon';
        if (mobileIcon) mobileIcon.className = 'ph-duotone ph-moon';
    }

    function toggleTheme() {
        const currentTheme = htmlElement.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);

        const newIconClass = newTheme === 'dark' ? 'ph-duotone ph-sun' : 'ph-duotone ph-moon';
        if (icon) icon.className = newIconClass;
        if (mobileIcon) mobileIcon.className = newIconClass;
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);


    // --- DYNAMIC YEAR UPDATE ---
    function updateYear() {
        const currentYear = new Date().getFullYear();
        const yearToReplace = "2025";
        const footerCopyright = document.getElementById('copyright-year');

        if (footerCopyright) {
            footerCopyright.innerHTML = `&copy; ${currentYear} Udith Babu K N. All Rights Reserved.`;
        }

        // Update H1 and section headers
        const headers = document.querySelectorAll('h1, .section-header');
        headers.forEach(header => {
            if (header.textContent.includes(yearToReplace)) {
                header.textContent = header.textContent.replace(yearToReplace, currentYear);
            }
        });

        // Update Published Date
        if (currentYear > 2025) {
            const metaElements = document.querySelectorAll('.article-meta');
            metaElements.forEach(meta => {
                if (meta.textContent.includes('Published on') && meta.textContent.includes('2025')) {
                    // Replace the date part with "January 1, [CurrentYear]"
                    // Preserves "by Author" if it exists after the date
                    meta.innerHTML = meta.innerHTML.replace(/Published on .*? 2025/, `Published on January 1, ${currentYear}`);
                }
            });
        }
    }

    updateYear();

    // --- EMAIL LOADING LOGIC ---
    const emailLinks = document.querySelectorAll('.email-link');
    const emailAddress = 'udithbabuvarrier@gmail.com';
    emailLinks.forEach(link => {
        const placeholder = link.querySelector('.email-placeholder');
        if (placeholder) {
            link.href = `mailto:${emailAddress}`;
            placeholder.textContent = emailAddress;
        }
    });

});
