export function initAllAnimations() {
    initLazyLoad();
    initStaggeredList();
    initContactForm();
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

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // To prevent duplicate listeners, check if we already initialized
    if (form.dataset.initialized) return;
    form.dataset.initialized = "true";

    const submitButton = document.getElementById('submitButton');
    const formError = document.getElementById('formError');
    const inputs = {
        name: form.querySelector('#name'),
        email: form.querySelector('#email'),
        message: form.querySelector('#message')
    };
    const errorSpans = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        message: document.getElementById('messageError')
    };

    const validators = {
        name: (value) => {
            if (value.trim() === '') {
                errorSpans.name.textContent = 'Please enter your name.';
                return false;
            }
            errorSpans.name.textContent = '';
            return true;
        },
        email: (value) => {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(value)) {
                if (value.includes('@') && value.endsWith('.com')) {
                    const domain = value.split('@')[1];
                    if (['gmil.com', 'gail.com', 'gnail.com'].includes(domain)) {
                        errorSpans.email.textContent = 'Did you mean @gmail.com?';
                        return false;
                    }
                }
                errorSpans.email.textContent = 'Please enter a valid email address.';
                return false;
            }
            errorSpans.email.textContent = '';
            return true;
        },
        message: (value) => {
            if (value.trim() === '') {
                errorSpans.message.textContent = 'Please enter a message.';
                return false;
            }
            errorSpans.message.textContent = '';
            return true;
        }
    };

    const validateField = (fieldName) => {
        const input = inputs[fieldName];
        const isValid = validators[fieldName](input.value);
        const group = input.closest('.form-group');
        if (isValid) {
            group.classList.remove('invalid');
        } else {
            group.classList.add('invalid');
        }
        return isValid;
    };

    Object.keys(inputs).forEach(fieldName => {
        inputs[fieldName].addEventListener('input', () => validateField(fieldName));
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        formError.style.display = 'none';

        let isFormValid = true;
        Object.keys(inputs).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST', body: formData, headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    const contentBox = form.closest('.content-box');
                    contentBox.innerHTML = `
                        <div class="thank-you-message lazy-load" aria-live="polite">
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. I'll get back to you soon!</p>
                            <button class="btn" id="sendAnother" aria-label="Send Another Message" onclick="window.location.reload()">Send Another</button>
                        </div>
                    `;
                    initLazyLoad();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                formError.style.display = 'block';
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }
    });
}

