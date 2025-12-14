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

    // --- EXTENDED REACTION LOGIC (CounterAPI Integration) ---
    function initReactions() {
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) return;

        // Configuration
        const NAMESPACE = 'udithbabukn_portfolio_v1';
        const API_BASE = 'https://api.counterapi.dev/v1';

        const path = window.location.pathname;
        const pageId = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');

        // Keys for API
        const KEY_VIEW = `view_${pageId}`;
        const KEY_LIKE = `like_${pageId}`;
        const KEY_DISLIKE = `dislike_${pageId}`;

        // Local Storage Keys (for user state)
        const LS_LIKE = `blog_like_${pageId}`;
        const LS_DISLIKE = `blog_dislike_${pageId}`;
        const LS_SESSION_VIEW = `session_view_${pageId}`;

        // --- DOM Creation ---
        const container = document.createElement('div');
        container.className = 'reaction-system-container';

        // View Stat
        const viewDiv = document.createElement('div');
        viewDiv.className = 'view-stat';
        viewDiv.innerHTML = `
            <i class="far fa-eye view-icon"></i>
            <span class="reaction-count" id="count-view">...</span>
            <span class="reaction-label">Views</span>
        `;

        // Like Button
        const likeItem = document.createElement('div');
        likeItem.className = 'reaction-item';
        const likeBtn = document.createElement('button');
        likeBtn.className = 'reaction-btn';
        likeBtn.setAttribute('aria-label', 'Like');
        likeBtn.innerHTML = '<i class="far fa-heart"></i>';
        const likeLabel = document.createElement('span');
        likeLabel.className = 'reaction-label';
        likeLabel.id = 'count-like';
        likeLabel.textContent = '...';
        likeItem.appendChild(likeBtn);
        likeItem.appendChild(likeLabel);

        // Dislike Button
        const dislikeItem = document.createElement('div');
        dislikeItem.className = 'reaction-item';
        const dislikeBtn = document.createElement('button');
        dislikeBtn.className = 'reaction-btn';
        dislikeBtn.setAttribute('aria-label', 'Dislike');
        dislikeBtn.innerHTML = '<i class="far fa-thumbs-down"></i>';
        const dislikeLabel = document.createElement('span');
        dislikeLabel.className = 'reaction-label';
        dislikeLabel.id = 'count-dislike';
        dislikeLabel.textContent = '...';
        dislikeItem.appendChild(dislikeBtn);
        dislikeItem.appendChild(dislikeLabel);

        container.appendChild(viewDiv);
        container.appendChild(likeItem);
        container.appendChild(dislikeItem);
        articleContent.after(container);

        // --- API Helpers ---
        const getCount = async (key) => {
            try {
                const res = await fetch(`${API_BASE}/${NAMESPACE}/${key}`);
                const data = await res.json();
                return data.count || 0;
            } catch (e) { console.error('API Error:', e); return 0; }
        };

        const increment = async (key) => {
            try { await fetch(`${API_BASE}/${NAMESPACE}/${key}/up`); } catch (e) { }
        };

        const decrement = async (key) => {
            try { await fetch(`${API_BASE}/${NAMESPACE}/${key}/down`); } catch (e) { }
        };

        // --- Logic ---

        // 1. Initial Views
        if (!sessionStorage.getItem(LS_SESSION_VIEW)) {
            // Increment logic
            fetch(`${API_BASE}/${NAMESPACE}/${KEY_VIEW}/up`)
                .then(r => r.json())
                .then(d => document.getElementById('count-view').textContent = d.count)
                .catch(() => document.getElementById('count-view').textContent = '0');
            sessionStorage.setItem(LS_SESSION_VIEW, 'true');
        } else {
            getCount(KEY_VIEW).then(c => document.getElementById('count-view').textContent = c);
        }

        // 2. Initial Likes/Dislikes
        Promise.all([getCount(KEY_LIKE), getCount(KEY_DISLIKE)]).then(([likes, dislikes]) => {
            document.getElementById('count-like').textContent = likes;
            document.getElementById('count-dislike').textContent = dislikes;
        });

        // 3. User Interaction State
        let isLiked = localStorage.getItem(LS_LIKE) === 'true';
        let isDisliked = localStorage.getItem(LS_DISLIKE) === 'true';

        function updateBtnStyles() {
            if (isLiked) {
                likeBtn.classList.add('liked');
                likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                likeBtn.classList.remove('liked');
                likeBtn.innerHTML = '<i class="far fa-heart"></i>';
            }

            if (isDisliked) {
                dislikeBtn.classList.add('disliked');
                dislikeBtn.innerHTML = '<i class="fas fa-thumbs-down"></i>';
            } else {
                dislikeBtn.classList.remove('disliked');
                dislikeBtn.innerHTML = '<i class="far fa-thumbs-down"></i>';
            }
        }
        updateBtnStyles(); // Initial state

        // 4. Interaction Handlers
        likeBtn.addEventListener('click', () => {
            if (isLiked) {
                isLiked = false;
                localStorage.setItem(LS_LIKE, 'false');
                decrement(KEY_LIKE);
                // Optimistic UI update could be done here, but precise count requires re-fetch or manual adjustment
                const current = parseInt(document.getElementById('count-like').textContent) || 0;
                document.getElementById('count-like').textContent = Math.max(0, current - 1);
            } else {
                isLiked = true;
                localStorage.setItem(LS_LIKE, 'true');
                increment(KEY_LIKE);
                const current = parseInt(document.getElementById('count-like').textContent) || 0;
                document.getElementById('count-like').textContent = current + 1;

                if (isDisliked) {
                    isDisliked = false;
                    localStorage.setItem(LS_DISLIKE, 'false');
                    decrement(KEY_DISLIKE);
                    const dCurrent = parseInt(document.getElementById('count-dislike').textContent) || 0;
                    document.getElementById('count-dislike').textContent = Math.max(0, dCurrent - 1);
                }
            }
            updateBtnStyles();
        });

        dislikeBtn.addEventListener('click', () => {
            if (isDisliked) {
                isDisliked = false;
                localStorage.setItem(LS_DISLIKE, 'false');
                decrement(KEY_DISLIKE);
                const current = parseInt(document.getElementById('count-dislike').textContent) || 0;
                document.getElementById('count-dislike').textContent = Math.max(0, current - 1);
            } else {
                isDisliked = true;
                localStorage.setItem(LS_DISLIKE, 'true');
                increment(KEY_DISLIKE);
                const current = parseInt(document.getElementById('count-dislike').textContent) || 0;
                document.getElementById('count-dislike').textContent = current + 1;

                if (isLiked) {
                    isLiked = false;
                    localStorage.setItem(LS_LIKE, 'false');
                    decrement(KEY_LIKE);
                    const lCurrent = parseInt(document.getElementById('count-like').textContent) || 0;
                    document.getElementById('count-like').textContent = Math.max(0, lCurrent - 1);
                }
            }
            updateBtnStyles();
        });
    }

    initReactions();
});
