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

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.dataset.theme = 'dark';
        if (icon) icon.className = 'fas fa-sun';
        if (mobileIcon) mobileIcon.className = 'fas fa-sun';
    }

    function toggleTheme() {
        const currentTheme = htmlElement.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);

        const newIconClass = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
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

        // View Stat (Initial placeholder '...')
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
                // Optimistic UI update
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
