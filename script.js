/*
    script.js
    This file contains all the JavaScript logic for the portfolio.
    Moving JS to an external file improves performance by allowing caching and enabling deferred, non-blocking script loading.
*/
document.addEventListener('DOMContentLoaded', () => {
    // --- DYNAMIC DATA ---
    const contentData = {
        summary: {
            title: "Professional Summary",
            metaDescription: "Portfolio of Udith Babu K N, a results-driven Business Development Executive and IT Business Analyst specializing in Agile, data analysis, and delivering high-impact tech solutions.",
            content: `
                <article class="interactive-card lazy-load" lang="en" style="--angle: 45deg;">
                    <h3 class="interactive-card-heading">Dynamic Business Development Executive, IT Business Analyst &amp; Project Coordinator</h3>
                    <p class="summary-subtitle">MBA in Operations Management and B.Tech in Information Technology.</p>
                    <p class="summary-description">As a dynamic Business Development Executive and IT Business Analyst, I excel at bridging the gap between technical solutions and strategic business growth. My expertise in market research, client requirement analysis, and Agile methodologies allows me to drive impactful IT projects and foster strong stakeholder relationships. Based in Kerala, India, I leverage skills in Python, MySQL, and Figma to deliver comprehensive solutions.</p>
                </article>`
        },
        skills: {
            title: "Technical Skills",
            metaDescription: "Explore the technical skills of Udith Babu K N, showcasing expertise in Python, MySQL, Figma, Jira, and Agile methodologies for advanced business analysis and project management.",
            content: `
                <article class="content-box lazy-load" lang="en">
                    <p class="skills-intro">I focus on a curated set of tools and methodologies to deliver efficient and effective solutions. Tap a category to expand.</p>
                    
                    <div class="skill-category-foldable">
                        <h3 class="skill-category-title"><span>Core Technologies</span><i class="fas fa-chevron-down category-chevron"></i></h3>
                        <div class="skills-grid">
                            <div class="skill-card" tabindex="0"><i class="fab fa-python skill-icon"></i><span class="skill-name">Python</span><div class="skill-details"><span class="skill-level">Advanced</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fas fa-database skill-icon"></i><span class="skill-name">MySQL</span><div class="skill-details"><span class="skill-level">Intermediate</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fab fa-js-square skill-icon"></i><span class="skill-name">JavaScript</span><div class="skill-details"><span class="skill-level">Intermediate</span></div></div>
                        </div>
                    </div>

                    <div class="skill-category-foldable">
                        <h3 class="skill-category-title"><span>Project Management & Design</span><i class="fas fa-chevron-down category-chevron"></i></h3>
                        <div class="skills-grid">
                            <div class="skill-card" tabindex="0"><i class="fab fa-jira skill-icon"></i><span class="skill-name">Jira</span><div class="skill-details"><span class="skill-level">Proficient</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fab fa-trello skill-icon"></i><span class="skill-name">Trello</span><div class="skill-details"><span class="skill-level">Proficient</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fab fa-figma skill-icon"></i><span class="skill-name">Figma</span><div class="skill-details"><span class="skill-level">Proficient</span></div></div>
                        </div>
                    </div>

                    <div class="skill-category-foldable">
                        <h3 class="skill-category-title"><span>Business & Analysis</span><i class="fas fa-chevron-down category-chevron"></i></h3>
                        <div class="skills-grid">
                            <div class="skill-card" tabindex="0"><i class="fas fa-users skill-icon"></i><span class="skill-name">Stakeholder Negotiation</span><div class="skill-details"><span class="skill-level">Advanced</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fas fa-tasks skill-icon"></i><span class="skill-name">Scrum Facilitation</span><div class="skill-details"><span class="skill-level">Proficient</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fas fa-sitemap skill-icon"></i><span class="skill-name">Root-Cause Analysis</span><div class="skill-details"><span class="skill-level">Advanced</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fas fa-file-excel skill-icon"></i><span class="skill-name">Microsoft Office</span><div class="skill-details"><span class="skill-level">Advanced</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fas fa-headset skill-icon"></i><span class="skill-name">CRM Handling</span><div class="skill-details"><span class="skill-level">Proficient</span></div></div>
                        </div>
                    </div>
                </article>`
        },
        experience: {
            title: "Professional Experience",
            metaDescription: "Review the professional experience of Udith Babu K N, highlighting key achievements in business development, IT business analysis, and Agile project coordination at top firms.",
            content: `
                <article class="lazy-load" lang="en">
                    <div class="page-peel-timeline">
                        <div class="page-peel-card"><p class="card-date">May 2025 – Present</p><h3>Business Development Executive</h3><p class="company">Accelgrowth Technology Pvt. Ltd.</p><div class="details"><h4>Key Responsibilities</h4><ul><li>Conducted market research and gathered client requirements for strategic planning.</li><li>Analyzed customer data to identify trends and support decisions.</li><li>Collaborated with tech teams to align business needs with functional requirements.</li><li>Prepared business cases, proposals, and stakeholder reports.</li><li>Coordinated UAT by managing client feedback and validating requirements.</li><li>Used Excel, Trello, and CRM tools for lead management and KPI tracking.</li><li>Built strong client relationships through consultative solutions and support.</li></ul></div></div>
                        <div class="page-peel-card"><p class="card-date">Sep 2024 – Dec 2024</p><h3>Business Analyst Intern</h3><p class="company">CST - Cyber Sapient</p><div class="details"><h4>Achievements</h4><ul><li>Gathered and documented 100+ business requirements.</li><li>Designed 10+ functional specifications and wireframes in Figma.</li><li>Analysed 50+ datasets using Python, improving sprint outcomes by 15%.</li><li>Coordinated and executed UAT for three key features with 98% compliance.</li></ul></div></div>
                        <div class="page-peel-card"><p class="card-date">Aug 2023 – Sep 2023</p><h3>Operations Intern</h3><p class="company">Techmindz</p><div class="details"><h4>Achievements</h4><ul><li>Automated customer service processes using AI, reducing response time by 30%.</li><li>Analysed customer data to improve service strategies (15% satisfaction increase).</li><li>Collaborated with development team to integrate AI tools.</li></ul></div></div>
                    </div>
                </article>`
        },
        education: {
            title: "Education",
            metaDescription: "Educational background of Udith Babu K N, featuring an MBA in Operations & Marketing and a B.Tech in Information Technology from the College of Engineering Thalassery.",
            content: `
                <article class="lazy-load" lang="en">
                    <div class="page-peel-timeline">
                        <div class="page-peel-card"><p class="card-date">2022 – 2024</p><h3>MBA (Operations & Marketing)</h3><p class="company">College of Engineering Thalassery</p><div class="details"><h4>Details</h4><ul><li>Specialized in Operations Management and Marketing.</li><li>Graduated with 7.29 CGPA (72.90%).</li><li>Gained expertise in supply chain, project management, and marketing strategies.</li></ul></div></div>
                        <div class="page-peel-card"><p class="card-date">2018 – 2022</p><h3>B.Tech (Information Technology)</h3><p class="company">College of Engineering Thalassery</p><div class="details"><h4>Details</h4><ul><li>Specialized in Information Technology.</li><li>Graduated with 7.84 CGPA (78.40%).</li><li>Developed a strong foundation in software development, database management, and networking.</li></ul></div></div>
                    </div>
                </article>`
        },
        projects: {
            title: "Projects",
            metaDescription: "Discover innovative projects by Udith Babu K N, including a real-time Web Analyzer and an ML-powered Web Security Chrome Extension. Explore live demos and GitHub repositories.",
            content: `
                <section class="lazy-load" lang="en">
                    <div class="card-grid">
                        <article class="interactive-card" style="--angle: 0deg;"><h3 class="interactive-card-heading">Web Analyzer Pro</h3><div class="card-meta">JavaScript, HTML, CSS, Chart.js</div><p class="card-description">Advanced tool to analyze any website's design system, extracting colors, typography, and CSS stats with visualizations. Provides in-depth design and code analysis.</p><div class="card-footer"><a href="https://udithkn.github.io/Web-Analyzer-Pro/" target="_blank" rel="noopener noreferrer" class="card-link">View Live Project <i class="fas fa-arrow-right"></i></a></div></article>
                        <article class="interactive-card" style="--angle: 90deg;"><h3 class="interactive-card-heading">Advanced Web Security Chrome Extension</h3><div class="card-meta">Python, JavaScript, HTML, CSS, Machine Learning</div><p class="card-description">Chrome extension for detecting malicious JPEG images during browsing, enhancing web security. Used machine learning to identify malicious patterns with 25% improved accuracy.</p><div class="card-footer"><a href="https://github.com/udithkn/maljpeg_project" target="_blank" rel="noopener noreferrer" class="card-link">View on GitHub <i class="fab fa-github"></i></a></div></article>
                        <article class="interactive-card" style="--angle: 180deg;"><h3 class="interactive-card-heading">Free LinkedIn Banner Premium Collection</h3><div class="card-meta">HTML, CSS, JavaScript</div><p class="card-description">A collection of 50+ free, premium, and customizable LinkedIn banners to help users make a great first impression.</p><div class="card-footer"><a href="https://udithkn.github.io/Free-LinkedIn-Banner-Premium-Collection/" target="_blank" rel="noopener noreferrer" class="card-link">View Live Project <i class="fas fa-arrow-right"></i></a></div></article>
                        <article class="interactive-card" style="--angle: 270deg;"><h3 class="interactive-card-heading">ImageForge</h3><div class="card-meta">HTML, CSS, JavaScript</div><p class="card-description">A free-to-use, innovative image converting tool designed to help users avoid ads and login/sign-up requirements. Seamlessly convert images from one format to another, such as JPG to PNG, hassle-free.</p><div class="card-footer"><a href="https://udithkn.github.io/ImageForge/" target="_blank" rel="noopener noreferrer" class="card-link">View Live Project <i class="fas fa-arrow-right"></i></a></div></article>
                    </div>
                </section>`
        },
        certifications: {
            title: "Certifications",
            metaDescription: "View professional certifications of Udith Babu K N, including credentials in Agile methodologies from JPMorgan Chase & Co. and a Business Analyst certification from micro1.",
            content: `
                <section class="lazy-load" lang="en">
                    <div class="card-grid">
                        <article class="interactive-card" style="--angle: 180deg;"><h3 class="interactive-card-heading">JPMorgan Chase & Co. Agile Job Simulation</h3><div class="card-meta">Forage | July 2024</div><p class="card-description">Completed a simulation involving drafting user stories, running standups, and conducting sprint reviews, which increased team velocity by 20%.</p><div class="card-footer"><a href="https://drive.google.com/file/d/1H1VZzktMJv3bnaK4FfB7O6NTazp3L6CK/view?usp=drive_link" target="_blank" rel="noopener noreferrer" class="card-link">View Certificate <i class="fas fa-certificate"></i></a></div></article>
                        <article class="interactive-card" style="--angle: 270deg;"><h3 class="interactive-card-heading">micro1 Business Analyst Certification</h3><div class="card-meta">micro1 | May 2025</div><p class="card-description">Successfully passed micro1's AI Interview and evaluation process, earning a certification as a Business Analyst.</p><div class="card-footer"><a href="https://drive.google.com/file/d/11k8iMDoCFEd-BMV-rPB-I52-clnJZOyO/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="card-link">View Certificate <i class="fas fa-certificate"></i></a></div></article>
                    </div>
                </section>`
        },
        contact: {
            title: "Contact Me",
            metaDescription: "Connect with Udith Babu K N for opportunities in IT Business Analysis, Project Coordination, and Product Management. Let's build innovative solutions together.",
            content: `
                <article class="content-box lazy-load" lang="en">
                    <p>Looking to drive IT projects to success? Connect to explore my expertise in Agile, business analysis, and product analysis.</p>
                    <form class="contact-form" id="contactForm" action="https://formsubmit.co/udithbabuvarrier@gmail.com" method="POST" aria-label="Contact Form" novalidate>
                        <input type="hidden" name="_subject" value="New portfolio contact submission">
                        <input type="hidden" name="_captcha" value="false">
                        <div class="form-group"><label for="name" class="form-label">Your Name</label><input type="text" id="name" name="name" class="form-control" placeholder="Enter your name" required aria-required="true" autocomplete="name"><span class="error-message" id="nameError">Please enter your name</span></div>
                        <div class="form-group"><label for="email" class="form-label">Your Email</label><input type="email" id="email" name="email" class="form-control" placeholder="Enter your email" required aria-required="true" autocomplete="email"><span class="error-message" id="emailError">Please enter a valid email address</span></div>
                        <div class="form-group"><label for="company" class="form-label">Company</label><input type="text" id="company" name="company" class="form-control" placeholder="Enter your company name" autocomplete="organization"></div>
                        <div class="form-group"><label for="message" class="form-label">Message</label><textarea id="message" name="message" class="form-control" placeholder="Enter your message" required aria-required="true"></textarea><span class="error-message" id="messageError">Please enter a message</span></div>
                        <button type="submit" class="btn" aria-label="Send Message" id="submitButton">Send Message</button>
                        <span class="error-message" id="formError" style="display: none;" aria-live="polite">An error occurred. Please try again or contact me directly.</span>
                    </form>
                </article>`
        }
    };

    // --- CORE LOGIC ---
    const copyrightElement = document.getElementById('copyright-year');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${new Date().getFullYear()} Udith Babu K N. All rights reserved.`;
    }

    const emailLinks = document.querySelectorAll('.email-link');
    const emailAddress = 'udithbabuvarrier@gmail.com';
    emailLinks.forEach(link => {
        const placeholder = link.querySelector('.email-placeholder');
        if (placeholder) {
            link.href = `mailto:${emailAddress}`;
            placeholder.textContent = emailAddress;
        }
    });

    const contentScroller = document.querySelector('.content-scroller');
    const mainContent = document.getElementById('main-content');
    const desktopNavLinks = document.querySelectorAll('.sidebar .nav-link');
    const bottomNavLinks = document.querySelectorAll('.bottom-nav .bottom-nav-link'); 
    const allNavLinks = [...desktopNavLinks, ...bottomNavLinks];
    const titleElement = document.querySelector('title');
    const metaDescription = document.querySelector('meta[name="description"]');

    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const allThemeToggles = [themeToggle, mobileThemeToggle].filter(Boolean);

    function applyTheme(theme, isInitial = false) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const isDark = theme === 'dark';

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

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    }
    
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    allThemeToggles.forEach(toggle => {
        if(toggle) toggle.addEventListener('click', toggleTheme);
    });

    if (!contentScroller) {
        console.error('Content scroller not found');
        return;
    }

    function initFoldableSkills() {
        const foldableCategories = document.querySelectorAll('.skill-category-foldable');
        foldableCategories.forEach(category => {
            const title = category.querySelector('.skill-category-title');
            if (window.innerWidth <= 768) {
                title.addEventListener('click', () => {
                    category.classList.toggle('expanded');
                });
            }
        });
    }
    
    function initPagePeelCards() {
        const cards = document.querySelectorAll('.page-peel-card');
        if(window.innerWidth <= 768) {
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    card.classList.toggle('expanded');
                });
            });
        }
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

    function init3DTilt() {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const { width, height } = rect;
                const rotateX = (y / height - 0.5) * -15;
                const rotateY = (x / width - 0.5) * 15;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    function loadSection(sectionId) {
        const sectionData = contentData[sectionId];
        if (sectionData) {
            const newSection = document.createElement('section');
            newSection.className = 'section';
            newSection.id = sectionId;
            newSection.lang = 'en';
            newSection.innerHTML = `<h2 class="section-header">${sectionData.title}</h2>${sectionData.content}`;

            mainContent.style.transition = 'opacity 0.2s ease-out';
            mainContent.style.opacity = '0';

            setTimeout(() => {
                contentScroller.innerHTML = '';
                contentScroller.appendChild(newSection);
                
                titleElement.textContent = `Udith Babu K N - ${sectionData.title}`;
                if (sectionData.metaDescription) {
                   metaDescription.setAttribute('content', sectionData.metaDescription);
                }
                
                history.pushState(null, '', `#${sectionId}`);

                mainContent.style.opacity = '1';
                window.scrollTo(0, 0);

                initLazyLoad();
                initFoldableSkills();
                initPagePeelCards();
                initStaggeredList();
                init3DTilt();
                if (sectionId === 'contact') initContactForm();
            }, 200);

        } else {
            console.error('Section data not found for:', sectionId);
        }
    }

    function setActiveLink(sectionId) {
        allNavLinks.forEach(link => {
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }
    
    function initLazyLoad() {
        const lazyElements = document.querySelectorAll('.lazy-load, .creative-summary, .interactive-card');
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

        const submitButton = document.getElementById('submitButton');
        const formError = document.getElementById('formError');
        const inputs = {
            name: form.querySelector('#name'),
            email: form.querySelector('#email'),
            message: form.querySelector('#message')
        };

        const validators = {
            name: value => value.trim() !== '',
            email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: value => value.trim() !== ''
        };

        const validateField = (fieldName) => {
            const input = inputs[fieldName];
            const isValid = validators[fieldName](input.value);
            const group = input.closest('.form-group');
            if (isValid) group.classList.remove('invalid');
            else group.classList.add('invalid');
            return isValid;
        };

        Object.keys(inputs).forEach(fieldName => {
            inputs[fieldName].addEventListener('input', () => validateField(fieldName));
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            formError.style.display = 'none';

            const isValid = Object.keys(inputs).every(validateField);

            if (isValid) {
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
                                <button class="btn" id="sendAnother" aria-label="Send Another Message">Send Another</button>
                            </div>
                        `;
                        initLazyLoad();
                        document.getElementById('sendAnother').addEventListener('click', () => loadSection('contact'));
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
    
    function initMagneticIcons() {
        const icons = document.querySelectorAll('.social-link');
        icons.forEach(icon => {
            icon.addEventListener('mousemove', (e) => {
                const rect = icon.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                icon.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                icon.style.transition = 'transform 0.1s ease-out';
            });
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translate(0,0)';
                icon.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
        });
    }

    // --- INITIALIZATION ---
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            if (contentData[sectionId]) {
                loadSection(sectionId);
                setActiveLink(sectionId);
            }
        });
    });
    
    window.addEventListener('popstate', () => {
         const sectionId = window.location.hash.substring(1) || 'summary';
         loadSection(sectionId);
         setActiveLink(sectionId);
    });

    try {
        applyTheme(savedTheme, true);
        initMagneticIcons();

        const initialSectionId = window.location.hash.substring(1) || 'summary';

        if (initialSectionId !== 'summary') {
            loadSection(initialSectionId);
        } else {
            initLazyLoad();
            initFoldableSkills();
            initPagePeelCards();
            initStaggeredList();
            init3DTilt();
        }
        
        setActiveLink(initialSectionId);

    } catch (error) {
        console.error('Error during initialization:', error);
    }
});
