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
            metaDescription: "Portfolio of Udith Babu K N, a results-driven Executive – Marketing and Sales in Kerala, India. Expert in developing marketing strategies, lead generation, and client relationship management, leveraging a unique background in IT Business Analysis and Agile methodologies.",
            content: `
                <article class="interactive-card lazy-load" lang="en" style="--angle: 45deg;">
                    <h3 class="interactive-card-heading">Expert Executive – Marketing and Sales | IT Business Analyst</h3>
                    <p class="summary-subtitle">MBA in Operations & Marketing | B.Tech in Information Technology</p>
                    <p class="summary-description">As a forward-thinking Executive in Marketing and Sales, I specialize in creating and executing data-driven strategies that boost brand visibility and drive revenue growth. With a strong foundation as an IT Business Analyst, I bring a unique analytical perspective to market research, lead generation, and client engagement. Based in Kerala, India, I am adept at using tools like Python and MySQL for market analysis and Figma for crafting compelling marketing materials, ensuring every campaign is both innovative and effective.</p>
                </article>`
        },
        skills: {
            title: "Skills",
            metaDescription: "Explore the technical and marketing skills of Udith Babu K N, showcasing expertise in SEO Strategy, Google Analytics, Content Marketing, Python, MySQL, and Agile project management.",
            content: `
                <article class="content-box lazy-load" lang="en">
                    <p class="skills-intro">I focus on a curated set of tools and methodologies to deliver efficient and effective solutions. Tap or focus on a category to expand.</p>
                    
                    <div class="skill-category-foldable" tabindex="0">
                        <h3 class="skill-category-title" id="marketing-seo-heading" aria-expanded="false" aria-controls="marketing-seo-grid"><span>Marketing & SEO</span><i class="fas fa-chevron-down category-chevron"></i></h3>
                        <div class="skills-grid" id="marketing-seo-grid" role="region" aria-labelledby="marketing-seo-heading">
                            <div class="skill-card" tabindex="0"><i class="fas fa-search-dollar skill-icon"></i><span class="skill-name">SEO Strategy</span><div class="skill-details"><span class="skill-level">Advanced</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fas fa-chart-line skill-icon"></i><span class="skill-name">Google Analytics</span><div class="skill-details"><span class="skill-level">Proficient</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fas fa-bullhorn skill-icon"></i><span class="skill-name">Content Marketing</span><div class="skill-details"><span class="skill-level">Proficient</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fas fa-key skill-icon"></i><span class="skill-name">Keyword Research</span><div class="skill-details"><span class="skill-level">Advanced</span></div></div>
                        </div>
                    </div>

                    <div class="skill-category-foldable" tabindex="0">
                        <h3 class="skill-category-title" id="core-tech-heading" aria-expanded="false" aria-controls="core-tech-grid"><span>Core Technologies</span><i class="fas fa-chevron-down category-chevron"></i></h3>
                        <div class="skills-grid" id="core-tech-grid" role="region" aria-labelledby="core-tech-heading">
                            <div class="skill-card" tabindex="0"><i class="fab fa-python skill-icon"></i><span class="skill-name">Python</span><div class="skill-details"><span class="skill-level">Advanced</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fas fa-database skill-icon"></i><span class="skill-name">MySQL</span><div class="skill-details"><span class="skill-level">Intermediate</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fab fa-js-square skill-icon"></i><span class="skill-name">JavaScript</span><div class="skill-details"><span class="skill-level">Intermediate</span></div></div>
                        </div>
                    </div>

                    <div class="skill-category-foldable" tabindex="0">
                        <h3 class="skill-category-title" id="pm-design-heading" aria-expanded="false" aria-controls="pm-design-grid"><span>Project Management & Design</span><i class="fas fa-chevron-down category-chevron"></i></h3>
                        <div class="skills-grid" id="pm-design-grid" role="region" aria-labelledby="pm-design-heading">
                            <div class="skill-card" tabindex="0"><i class="fab fa-jira skill-icon"></i><span class="skill-name">Jira</span><div class="skill-details"><span class="skill-level">Proficient</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fab fa-trello skill-icon"></i><span class="skill-name">Trello</span><div class="skill-details"><span class="skill-level">Proficient</span></div></div>
                            <div class="skill-card" tabindex="0"><i class="fab fa-figma skill-icon"></i><span class="skill-name">Figma</span><div class="skill-details"><span class="skill-level">Proficient</span></div></div>
                        </div>
                    </div>

                    <div class="skill-category-foldable" tabindex="0">
                        <h3 class="skill-category-title" id="biz-analysis-heading" aria-expanded="false" aria-controls="biz-analysis-grid"><span>Business & Analysis</span><i class="fas fa-chevron-down category-chevron"></i></h3>
                        <div class="skills-grid" id="biz-analysis-grid" role="region" aria-labelledby="biz-analysis-heading">
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
                        <div class="page-peel-card" tabindex="0"><p class="card-date">Aug 2025 – Present</p><h3>Executive – Marketing and Sales</h3><p class="company">Rêve</p><div class="details"><h4>Key Responsibilities</h4><ul><li>Developing and implementing marketing and sales strategies.</li><li>Building and maintaining strong client relationships.</li><li>Executing on-page and off-page SEO strategies to improve organic search rankings.</li><li>Conducting keyword research and competitor analysis to inform content strategy.</li><li>Analyzing website traffic and user engagement using Google Analytics to optimize campaigns.</li><li>Managing technical SEO audits to enhance site performance and crawlability.</li></ul></div></div>
                        <div class="page-peel-card" tabindex="0"><p class="card-date">May 2025 – Aug 2025</p><h3>Business Development Executive</h3><p class="company">Accelgrowth Technology Pvt. Ltd.</p><div class="details"><h4>Key Responsibilities</h4><ul><li>Conducted market research and gathered client requirements for strategic planning.</li><li>Analyzed customer data to identify trends and support decisions.</li><li>Collaborated with tech teams to align business needs with functional requirements.</li><li>Prepared business cases, proposals, and stakeholder reports.</li><li>Coordinated UAT by managing client feedback and validating requirements.</li><li>Used Excel, Trello, and CRM tools for lead management and KPI tracking.</li><li>Built strong client relationships through consultative solutions and support.</li></ul></div></div>
                        <div class="page-peel-card" tabindex="0"><p class="card-date">Sep 2024 – Dec 2024</p><h3>Business Analyst Intern</h3><p class="company">CST - Cyber Sapient</p><div class="details"><h4>Achievements</h4><ul><li>Gathered and documented 100+ business requirements.</li><li>Designed 10+ functional specifications and wireframes in Figma.</li><li>Analysed 50+ datasets using Python, improving sprint outcomes by 15%.</li><li>Coordinated and executed UAT for three key features with 98% compliance.</li></ul></div></div>
                        <div class="page-peel-card" tabindex="0"><p class="card-date">Aug 2023 – Sep 2023</p><h3>Operations Intern</h3><p class="company">Techmindz</p><div class="details"><h4>Achievements</h4><ul><li>Automated customer service processes using AI, reducing response time by 30%.</li><li>Analysed customer data to improve service strategies (15% satisfaction increase).</li><li>Collaborated with development team to integrate AI tools.</li></ul></div></div>
                    </div>
                </article>`
        },
        education: {
            title: "Education",
            metaDescription: "Educational background of Udith Babu K N, featuring an MBA in Operations & Marketing and a B.Tech in Information Technology from the College of Engineering Thalassery.",
            content: `
                <article class="lazy-load" lang="en">
                    <div class="page-peel-timeline">
                        <div class="page-peel-card" tabindex="0"><p class="card-date">2022 – 2024</p><h3>MBA (Operations & Marketing)</h3><p class="company">College of Engineering Thalassery</p><div class="details"><h4>Details</h4><ul><li>Specialized in Operations Management and Marketing.</li><li>Graduated with 7.29 CGPA (72.90%).</li><li>Gained expertise in supply chain, project management, and marketing strategies.</li></ul></div></div>
                        <div class="page-peel-card" tabindex="0"><p class="card-date">2018 – 2022</p><h3>B.Tech (Information Technology)</h3><p class="company">College of Engineering Thalassery</p><div class="details"><h4>Details</h4><ul><li>Specialized in Information Technology.</li><li>Graduated with 7.84 CGPA (78.40%).</li><li>Developed a strong foundation in software development, database management, and networking.</li></ul></div></div>
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
        blog: {
            title: "Blog & Insights",
            metaDescription: "Explore insightful articles and case studies by Udith Babu K N on SEO, digital marketing, and tech industry trends in India.",
            content: `
                <section class="lazy-load" lang="en">
                    <p class="skills-intro">Here I share insights on digital marketing, SEO, and technology trends, demonstrating my expertise and approach to solving complex challenges.</p>
                    <div class="card-grid">
                        <article class="interactive-card" style="--angle: 45deg;">
                            <h3 class="interactive-card-heading">Advanced SEO Techniques for 2025</h3>
                            <div class="card-meta">SEO Strategy | Technical SEO</div>
                            <p class="card-description">A deep dive into the future of search, covering topics like AI-driven content optimization, the evolution of Core Web Vitals, and strategies for building topical authority in a competitive digital landscape.</p>
                            <div class="card-footer"><a href="https://medium.com/@udithbabuvarrier10" target="_blank" rel="noopener noreferrer" class="card-link">Read on Medium <i class="fab fa-medium"></i></a></div>
                        </article>
                        <article class="interactive-card" style="--angle: 135deg;">
                            <h3 class="interactive-card-heading">The Evolving Role of the IT Business Analyst</h3>
                            <div class="card-meta">Business Analysis | Agile Methodologies</div>
                            <p class="card-description">An analysis of how the IT Business Analyst role is adapting to new technologies like AI and low-code platforms. This article explores the shift from requirement gathering to strategic partnership and value creation.</p>
                            <div class="card-footer"><a href="https://medium.com/@udithbabuvarrier10" target="_blank" rel="noopener noreferrer" class="card-link">Read on Medium <i class="fab fa-medium"></i></a></div>
                        </article>
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
                        <div class="form-group"><label for="name" class="form-label">Your Name</label><input type="text" id="name" name="name" class="form-control" placeholder="Enter your name" required aria-required="true" autocomplete="name"><span class="error-message" id="nameError"></span></div>
                        <div class="form-group"><label for="email" class="form-label">Your Email</label><input type="email" id="email" name="email" class="form-control" placeholder="Enter your email" required aria-required="true" autocomplete="email"><span class="error-message" id="emailError"></span></div>
                        <div class="form-group"><label for="company" class="form-label">Company</label><input type="text" id="company" name="company" class="form-control" placeholder="Enter your company name" autocomplete="organization"></div>
                        <div class="form-group"><label for="message" class="form-label">Message</label><textarea id="message" name="message" class="form-control" placeholder="Enter your message" required aria-required="true"></textarea><span class="error-message" id="messageError"></span></div>
                        <button type="submit" class="btn" aria-label="Send Message" id="submitButton">Send Message</button>
                        <span class="error-message" id="formError" style="display: none;" aria-live="polite">An error occurred. Please try again or contact me directly.</span>
                    </form>
                </article>`
        }
    };

    // --- CORE LOGIC ---
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function updateDates() {
        const currentDate = getCurrentDate();
        const schemaDataElement = document.getElementById('schema-data');
        if (schemaDataElement) {
            try {
                const schemaData = JSON.parse(schemaDataElement.textContent);
                schemaData.dateModified = currentDate;
                schemaDataElement.textContent = JSON.stringify(schemaData, null, 4);
            } catch (e) {
                console.error("Could not parse or update schema data:", e);
            }
        }
        const copyrightElement = document.getElementById('copyright-year');
        if (copyrightElement) {
            copyrightElement.textContent = `© ${new Date().getFullYear()} Udith Babu K N. All rights reserved.`;
        }
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

    if (!contentScroller) {
        console.error('Content scroller not found');
        return;
    }

    function initFoldableSkills() {
        const foldableCategories = document.querySelectorAll('.skill-category-foldable');
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        foldableCategories.forEach(category => {
            const title = category.querySelector('.skill-category-title');

            if (isTouchDevice) {
                title.addEventListener('click', () => {
                    const isExpanded = category.classList.toggle('expanded');
                    title.setAttribute('aria-expanded', isExpanded);
                });
            } else {
                category.addEventListener('mouseenter', () => {
                    category.classList.add('expanded');
                    title.setAttribute('aria-expanded', 'true');
                });
                category.addEventListener('mouseleave', () => {
                    category.classList.remove('expanded');
                    title.setAttribute('aria-expanded', 'false');
                });
                
                category.addEventListener('focusin', () => {
                    category.classList.add('expanded');
                    title.setAttribute('aria-expanded', 'true');
                });
                category.addEventListener('focusout', (e) => {
                    if (!category.contains(e.relatedTarget)) {
                        category.classList.remove('expanded');
                        title.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        });
    }
    
    function initPagePeelCards() {
        const cards = document.querySelectorAll('.page-peel-card');
        
        if(window.innerWidth > 768) {
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const peelAmount = Math.min(x, y, 75);
                    card.style.setProperty('--peel-size', `${peelAmount}px`);
                });
                card.addEventListener('mouseleave', () => {
                    card.style.setProperty('--peel-size', '0px');
                });
            });
        } else {
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
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
                icon.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px) scale(1.15)`;
                icon.style.transition = 'transform 0.1s ease-out';
            });
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translate(0,0) scale(1)';
                icon.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
        });
    }

    function showPersonalizedWelcome() {
        const toast = document.getElementById('welcome-toast');
        if (!toast) return;

        const referrer = document.referrer;
        let message = '';

        if (referrer.includes('linkedin.com')) {
            message = 'Welcome, visitor from LinkedIn!';
        } else if (referrer.includes('cethalassery.ac.in')) {
            message = 'Welcome, fellow CETian!';
        } else if (referrer.includes('github.com')) {
            message = 'Thanks for checking out my code on GitHub!';
        }

        if (message) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }
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
        updateDates();
        setDynamicTheme();
        initMagneticIcons();
        showPersonalizedWelcome();

        const initialSectionId = window.location.hash.substring(1) || 'summary';
        
        // Always load the section from JS to ensure it's up to date
        loadSection(initialSectionId);
        setActiveLink(initialSectionId);

    } catch (error) {
        console.error('Error during initialization:', error);
    }

    // --- SERVICE WORKER REGISTRATION ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
});
