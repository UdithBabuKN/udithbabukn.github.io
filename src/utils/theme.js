export function applyTheme(theme = 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.removeItem('theme');
}

export function setDynamicTheme() {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.removeItem('theme');
}

export function toggleTheme() {
    // Locked to light theme only
    document.documentElement.setAttribute('data-theme', 'light');
}
