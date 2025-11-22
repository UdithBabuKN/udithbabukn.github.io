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
        if (toggle) toggle.addEventListener('click', toggleTheme);
    });
    setDynamicTheme();

    // --- INTERACTIVE SIDEBAR & MAGNETIC EFFECTS ---
    function initMagneticElements(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px) scale(1.15)`;
                el.style.transition = 'transform 0.1s ease-out';
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0,0) scale(1)';
                el.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
        });
    }

    function initInteractiveSidebar() {
        const sidebar = document.getElementById('sidebar');
        const indicator = document.querySelector('.sidebar-indicator');
        if (sidebar && indicator) {
            sidebar.addEventListener('mouseenter', () => {
                indicator.classList.add('interactive-hover');
            });
            sidebar.addEventListener('mouseleave', () => {
                indicator.classList.remove('interactive-hover');
            });
        }
    }

    initMagneticElements('.social-link');
    initInteractiveSidebar();


    // --- LAZY LOAD ANIMATION FOR ARTICLE CONTENT ---
    const lazyElements = document.querySelectorAll('.lazy-load');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -50px 0px' });
        lazyElements.forEach(element => observer.observe(element));
    } else {
        lazyElements.forEach(element => element.classList.add('visible'));
    }

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
    // --- DYNAMIC YEAR UPDATE ---
    function updateYear() {
        const currentYear = new Date().getFullYear();
        const yearToReplace = '2025';

        if (currentYear.toString() === yearToReplace) return;

        // Update document title
        if (document.title.includes(yearToReplace)) {
            document.title = document.title.replace(yearToReplace, currentYear);
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
});
