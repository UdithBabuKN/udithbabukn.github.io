export function initAllAnimations() {
    initLazyLoad();
    initStaggeredList();
    secureExternalLinks();
}

function secureExternalLinks() {
    const links = document.querySelectorAll('a[target="_blank"]');
    links.forEach(link => {
        if (!link.rel.includes('noopener')) {
            link.rel = link.rel ? `${link.rel} noopener noreferrer` : 'noopener noreferrer';
        }
    });
}

function initStaggeredList() {
    const lists = document.querySelectorAll('.details ul');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const listItems = entry.target.querySelectorAll('li');
                listItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 100}ms`;
                    item.classList.add('visible');
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    lists.forEach(list => {
        observer.observe(list);
    });
}

function initLazyLoad() {
    const lazyElements = document.querySelectorAll('.lazy-load, .bento-box, .interactive-card');
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
}

