/*
    blog_script.js
    This script contains the necessary JavaScript for the blog pages.
    It handles theme switching, email deobfuscation, and sets the active navigation link
    to create a consistent user experience with the main portfolio page.
*/
document.addEventListener('DOMContentLoaded', () => {
    // --- THEME LOGIC ---
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const allThemeToggles = [themeToggle, mobileThemeToggle].filter(Boolean);

    function applyTheme(theme, isInitial = false) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const isDark = theme === 'dark';

        document.body.style.setProperty('--sun-opacity', isDark ? '0' : '1');
        document.body.style.setProperty('--moon-opacity', isDark ? '1' : '0');

        allThemeToggles.forEach(toggle => {
            if (!toggle) return;
            toggle.setAttribute('aria-pressed', isDark);
            const icon = toggle.querySelector('i');
            if (isInitial) {
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            } else {
                toggle.classList.add('rotating');
                setTimeout(() => {
                    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
                    toggle.classList.remove('rotating');
                }, 200);
            }
        });
    }

    function setDynamicTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme, true);
        } else {
            const hour = new Date().getHours();
            const isDay = hour >= 6 && hour < 18;
            const theme = isDay ? 'light' : 'dark';
            applyTheme(theme, true);
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    }
    
    allThemeToggles.forEach(toggle => {
        if(toggle) toggle.addEventListener('click', toggleTheme);
    });
    setDynamicTheme();

    // --- EMAIL DEOBFUSCATION ---
    const emailLinks = document.querySelectorAll('.email-link');
    const emailAddress = 'udithbabuvarrier@gmail.com';
    emailLinks.forEach(link => {
        const placeholder = link.querySelector('.email-placeholder');
        if (placeholder) {
            link.href = `mailto:${emailAddress}`;
            placeholder.textContent = emailAddress;
        }
    });

    // --- COPYRIGHT YEAR ---
    const copyrightElement = document.getElementById('copyright-year');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${new Date().getFullYear()} Udith Babu K N. All rights reserved.`;
    }

    // --- SET ACTIVE NAV LINK FOR BLOG ---
    const allNavLinks = [...document.querySelectorAll('.sidebar .nav-link'), ...document.querySelectorAll('.bottom-nav .bottom-nav-link')];
    allNavLinks.forEach(link => {
        if (link.getAttribute('data-section') === 'blog') {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
});
