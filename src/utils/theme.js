export function applyTheme(theme, isInitial = false) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const isDark = theme === 'dark';

    document.body.style.setProperty('--sun-opacity', isDark ? '0' : '1');
    document.body.style.setProperty('--moon-opacity', isDark ? '1' : '0');

    const allThemeToggles = document.querySelectorAll('.theme-toggle');

    allThemeToggles.forEach(toggle => {
        if (!toggle) return;
        toggle.setAttribute('aria-pressed', isDark);
        const icon = toggle.querySelector('i');
        if (!icon) return;
        if (isInitial) {
            icon.className = isDark ? 'ph-duotone ph-sun' : 'ph-duotone ph-moon';
        } else {
            toggle.classList.add('rotating');
            setTimeout(() => {
                icon.className = isDark ? 'ph-duotone ph-sun' : 'ph-duotone ph-moon';
                toggle.classList.remove('rotating');
            }, 200);
        }
    });
}

export function setDynamicTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme, true);
    } else {
        // Default to light theme for new visitors
        applyTheme('light', true);
    }
}

export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}
