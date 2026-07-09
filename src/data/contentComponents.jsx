import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

export const Summary = () => {
    return (
        <section id="summary" className="section" lang="en">
            <h2 className="section-header">Professional Summary</h2>
            
                <article className="interactive-card lazy-load" lang="en" style={{ '--angle': '45deg' }}>
                    <h2 className="interactive-card-heading">Expert Executive – Marketing and Sales | IT Business Analyst</h2>
                    <p className="summary-subtitle">MBA in Operations & Marketing | B.Tech in Information Technology</p>
                    <p className="summary-description">As a forward-thinking Executive in Marketing and Sales, I specialize in creating and executing data-driven strategies that boost brand visibility and drive revenue growth. With a strong foundation as an IT Business Analyst, I bring a unique analytical perspective to market research, lead generation, and client engagement. Based in Kerala, India, I am adept at using tools like Python and MySQL for market analysis and Figma for crafting compelling marketing materials, ensuring every campaign is both innovative and effective.</p>
                </article>
        </section>
    );
};

export const Skills = () => {
    return (
        <section id="skills" className="section" lang="en">
            <h2 className="section-header">Skills</h2>
            
                <article className="content-box lazy-load" lang="en">
                    <p className="skills-intro">I focus on a curated set of tools and methodologies to deliver efficient and effective solutions. Tap or focus on a category to expand.</p>
                    
                    <div className="skill-category-foldable">
                        <h3 className="skill-category-title" role="button" tabIndex="0" id="marketing-seo-heading" aria-expanded="false" aria-controls="marketing-seo-grid"><span>Marketing & SEO</span><i className="fas fa-chevron-down category-chevron"></i></h3>
                        <div className="skills-grid" id="marketing-seo-grid" role="region" aria-labelledby="marketing-seo-heading">
                            <div className="skill-card" tabIndex="0"><i className="fas fa-search-dollar skill-icon"></i><span className="skill-name">SEO Strategy</span><div className="skill-details"><span className="skill-level">Advanced</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-search-plus skill-icon"></i><span className="skill-name">AEO & GEO</span><div className="skill-details"><span className="skill-level">Advanced</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-chart-line skill-icon"></i><span className="skill-name">Google Analytics</span><div className="skill-details"><span className="skill-level">Proficient</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-bullhorn skill-icon"></i><span className="skill-name">Content Marketing</span><div className="skill-details"><span className="skill-level">Proficient</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-key skill-icon"></i><span className="skill-name">Keyword Research</span><div className="skill-details"><span className="skill-level">Advanced</span></div></div>
                        </div>
                    </div>

                    <div className="skill-category-foldable">
                        <h3 className="skill-category-title" role="button" tabIndex="0" id="core-tech-heading" aria-expanded="false" aria-controls="core-tech-grid"><span>Core Technologies</span><i className="fas fa-chevron-down category-chevron"></i></h3>
                        <div className="skills-grid" id="core-tech-grid" role="region" aria-labelledby="core-tech-heading">
                            <div className="skill-card" tabIndex="0"><i className="fab fa-python skill-icon"></i><span className="skill-name">Python</span><div className="skill-details"><span className="skill-level">Advanced</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-database skill-icon"></i><span className="skill-name">MySQL</span><div className="skill-details"><span className="skill-level">Intermediate</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fab fa-js-square skill-icon"></i><span className="skill-name">JavaScript</span><div className="skill-details"><span className="skill-level">Intermediate</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-robot skill-icon"></i><span className="skill-name">Vibe Coding (Claude, Gemini, etc.)</span><div className="skill-details"><span className="skill-level">Advanced</span></div></div>
                        </div>
                    </div>

                    <div className="skill-category-foldable">
                        <h3 className="skill-category-title" role="button" tabIndex="0" id="pm-design-heading" aria-expanded="false" aria-controls="pm-design-grid"><span>Project Management & Design</span><i className="fas fa-chevron-down category-chevron"></i></h3>
                        <div className="skills-grid" id="pm-design-grid" role="region" aria-labelledby="pm-design-heading">
                            <div className="skill-card" tabIndex="0"><i className="fab fa-jira skill-icon"></i><span className="skill-name">Jira</span><div className="skill-details"><span className="skill-level">Proficient</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fab fa-trello skill-icon"></i><span className="skill-name">Trello</span><div className="skill-details"><span className="skill-level">Proficient</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fab fa-figma skill-icon"></i><span className="skill-name">Figma</span><div className="skill-details"><span className="skill-level">Proficient</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-object-group skill-icon"></i><span className="skill-name">UI/UX Designing</span><div className="skill-details"><span className="skill-level">Proficient</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-video skill-icon"></i><span className="skill-name">AI Video Editing & Gen</span><div className="skill-details"><span className="skill-level">Proficient</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-paint-brush skill-icon"></i><span className="skill-name">Poster Design</span><div className="skill-details"><span className="skill-level">Proficient</span></div></div>
                        </div>
                    </div>

                    <div className="skill-category-foldable">
                        <h3 className="skill-category-title" role="button" tabIndex="0" id="biz-analysis-heading" aria-expanded="false" aria-controls="biz-analysis-grid"><span>Business & Analysis</span><i className="fas fa-chevron-down category-chevron"></i></h3>
                        <div className="skills-grid" id="biz-analysis-grid" role="region" aria-labelledby="biz-analysis-heading">
                            <div className="skill-card" tabIndex="0"><i className="fas fa-users skill-icon"></i><span className="skill-name">Stakeholder Negotiation</span><div className="skill-details"><span className="skill-level">Advanced</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-tasks skill-icon"></i><span className="skill-name">Scrum Facilitation</span><div className="skill-details"><span className="skill-level">Proficient</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-sitemap skill-icon"></i><span className="skill-name">Root-Cause Analysis</span><div className="skill-details"><span className="skill-level">Advanced</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-file-excel skill-icon"></i><span className="skill-name">Microsoft Office</span><div className="skill-details"><span className="skill-level">Advanced</span></div></div>
                            <div className="skill-card" tabIndex="0"><i className="fas fa-headset skill-icon"></i><span className="skill-name">CRM Handling</span><div className="skill-details"><span className="skill-level">Proficient</span></div></div>
                        </div>
                    </div>
                </article>
        </section>
    );
};

export const Experience = () => {
    return (
        <section id="experience" className="section" lang="en">
            <h2 className="section-header">Professional Experience</h2>
            
                <article className="lazy-load" lang="en">
                    <div className="page-peel-timeline">
                        <div className="page-peel-card" tabIndex="0"><p className="card-date">Aug 2025 – Present</p><h3>Executive – Marketing and Sales</h3><p className="company">Rêve</p><div className="details"><h4>Key Responsibilities</h4><ul><li>Developing and implementing marketing and sales strategies.</li><li>Building and maintaining strong client relationships.</li><li>Executing on-page and off-page SEO strategies to improve organic search rankings.</li><li>Conducting keyword research and competitor analysis to inform content strategy.</li><li>Analyzing website traffic and user engagement using Google Analytics to optimize campaigns.</li><li>Managing technical SEO audits to enhance site performance and crawlability.</li></ul></div></div>
                        <div className="page-peel-card" tabIndex="0"><p className="card-date">May 2025 – Aug 2025</p><h3>Business Development Executive</h3><p className="company">Accelgrowth Technology Pvt. Ltd.</p><div className="details"><h4>Key Responsibilities</h4><ul><li>Conducted market research and gathered client requirements for strategic planning.</li><li>Analyzed customer data to identify trends and support decisions.</li><li>Collaborated with tech teams to align business needs with functional requirements.</li><li>Prepared business cases, proposals, and stakeholder reports.</li><li>Coordinated UAT by managing client feedback and validating requirements.</li><li>Used Excel, Trello, and CRM tools for lead management and KPI tracking.</li><li>Built strong client relationships through consultative solutions and support.</li></ul></div></div>
                        <div className="page-peel-card" tabIndex="0"><p className="card-date">Sep 2024 – Dec 2024</p><h3>Business Analyst Intern</h3><p className="company">CST - Cyber Sapient</p><div className="details"><h4>Achievements</h4><ul><li>Gathered and documented 100+ business requirements.</li><li>Designed 10+ functional specifications and wireframes in Figma.</li><li>Analysed 50+ datasets using Python, improving sprint outcomes by 15%.</li><li>Coordinated and executed UAT for three key features with 98% compliance.</li></ul></div></div>
                        <div className="page-peel-card" tabIndex="0"><p className="card-date">Aug 2023 – Sep 2023</p><h3>Operations Intern</h3><p className="company">Techmindz</p><div className="details"><h4>Achievements</h4><ul><li>Automated customer service processes using AI, reducing response time by 30%.</li><li>Analysed customer data to improve service strategies (15% satisfaction increase).</li><li>Collaborated with development team to integrate AI tools.</li></ul></div></div>
                    </div>
                </article>
        </section>
    );
};

export const Education = () => {
    return (
        <section id="education" className="section" lang="en">
            <h2 className="section-header">Education</h2>
            
                <article className="lazy-load" lang="en">
                    <div className="page-peel-timeline">
                        <div className="page-peel-card" tabIndex="0"><p className="card-date">2022 – 2024</p><h3>MBA (Operations & Marketing)</h3><p className="company">College of Engineering Thalassery</p><div className="details"><h4>Details</h4><ul><li>Specialized in Operations Management and Marketing.</li><li>Graduated with 7.29 CGPA (72.90%).</li><li>Gained expertise in supply chain, project management, and marketing strategies.</li></ul></div></div>
                        <div className="page-peel-card" tabIndex="0"><p className="card-date">2018 – 2022</p><h3>B.Tech (Information Technology)</h3><p className="company">College of Engineering Thalassery</p><div className="details"><h4>Details</h4><ul><li>Specialized in Information Technology.</li><li>Graduated with 7.84 CGPA (78.40%).</li><li>Developed a strong foundation in software development, database management, and networking.</li></ul></div></div>
                    </div>
                </article>
        </section>
    );
};

export const Projects = () => {
    return (
        <section id="projects" className="section" lang="en">
            <h2 className="section-header">Projects</h2>
            
                <section className="lazy-load" lang="en">
                    <div className="card-grid">
                        <article className="interactive-card" style={{ '--angle': '0deg' }}><h3 className="interactive-card-heading">Web Analyzer Pro</h3><div className="card-meta">JavaScript, HTML, CSS, Chart.js</div><p className="card-description">Advanced tool to analyze any website's design system, extracting colors, typography, and CSS stats with visualizations. Provides in-depth design and code analysis.</p><div className="card-footer"><a href="https://udithkn.github.io/Web-Analyzer-Pro/" target="_blank" rel="noopener noreferrer" className="card-link"><i className="fas fa-bolt"></i> View Live Project</a></div></article>
                        <article className="interactive-card" style={{ '--angle': '90deg' }}><h3 className="interactive-card-heading">Advanced Web Security Chrome Extension</h3><div className="card-meta">Python, JavaScript, HTML, CSS, Machine Learning</div><p className="card-description">Chrome extension for detecting malicious JPEG images during browsing, enhancing web security. Used machine learning to identify malicious patterns with 25% improved accuracy.</p><div className="card-footer"><a href="https://github.com/udithkn/maljpeg_project" target="_blank" rel="noopener noreferrer" className="card-link"><i className="fab fa-github"></i> View on GitHub</a></div></article>
                        <article className="interactive-card" style={{ '--angle': '180deg' }}><h3 className="interactive-card-heading">Free LinkedIn Banner Premium Collection</h3><div className="card-meta">HTML, CSS, JavaScript</div><p className="card-description">A collection of 50+ free, premium, and customizable LinkedIn banners to help users make a great first impression.</p><div className="card-footer"><a href="https://udithkn.github.io/Free-LinkedIn-Banner-Premium-Collection/" target="_blank" rel="noopener noreferrer" className="card-link"><i className="fas fa-bolt"></i> View Live Project</a></div></article>
                        <article className="interactive-card" style={{ '--angle': '270deg' }}><h3 className="interactive-card-heading">ImageForge</h3><div className="card-meta">HTML, CSS, JavaScript</div><p className="card-description">A free-to-use, innovative image converting tool designed to help users avoid ads and login/sign-up requirements. Seamlessly convert images from one format to another, such as JPG to PNG, hassle-free.</p><div className="card-footer"><a href="https://udithkn.github.io/ImageForge/" target="_blank" rel="noopener noreferrer" className="card-link"><i className="fas fa-bolt"></i> View Live Project</a></div></article>
                    </div>
                </section>
        </section>
    );
};

export const Certifications = () => {
    return (
        <section id="certifications" className="section" lang="en">
            <h2 className="section-header">Certifications</h2>
            
                <section className="lazy-load" lang="en">
                    <div className="card-grid">
                        <article className="interactive-card" style={{ '--angle': '180deg' }}><h3 className="interactive-card-heading">JPMorgan Chase & Co. Agile Job Simulation</h3><div className="card-meta">Forage | July 2024</div><p className="card-description">Completed a simulation involving drafting user stories, running standups, and conducting sprint reviews, which increased team velocity by 20%.</p><div className="card-footer"><a href="https://drive.google.com/file/d/1H1VZzktMJv3bnaK4FfB7O6NTazp3L6CK/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="card-link">View Certificate <i className="ph-duotone ph-certificate"></i></a></div></article>
                        <article className="interactive-card" style={{ '--angle': '270deg' }}><h3 className="interactive-card-heading">micro1 Business Analyst Certification</h3><div className="card-meta">micro1 | May 2025</div><p className="card-description">Successfully passed micro1's AI Interview and evaluation process, earning a certification as a Business Analyst.</p><div className="card-footer"><a href="https://drive.google.com/file/d/11k8iMDoCFEd-BMV-rPB-I52-clnJZOyO/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="card-link">View Certificate <i className="ph-duotone ph-certificate"></i></a></div></article>
                    </div>
                </section>
        </section>
    );
};

export const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        
        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                setStatus('success');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
            setErrorMsg('An error occurred. Please try again or contact me directly.');
        }
    };

    return (
        <section id="contact" className="section" lang="en">
            <h2 className="section-header">Contact Me</h2>
            
            <article className="content-box lazy-load" lang="en">
                <p style={{ marginBottom: '2rem' }}>Looking to drive IT projects to success? Connect to explore my expertise in Agile, business analysis, and product analysis.</p>
                
                {status === 'success' ? (
                    <div className="thank-you-message" aria-live="polite" style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Thank You!</h3>
                        <p style={{ marginBottom: '1.5rem' }}>Your message has been sent successfully. I'll get back to you soon!</p>
                        <button className="btn" aria-label="Send Another Message" onClick={() => setStatus('idle')}>Send Another Message</button>
                    </div>
                ) : (
                    <form className="contact-form" id="contactForm" action="https://formsubmit.co/udithbabuvarrier@gmail.com" method="POST" onSubmit={handleSubmit} aria-label="Contact Form" noValidate>
                        <input type="hidden" name="_subject" value="New portfolio contact submission" />
                        <input type="hidden" name="_captcha" value="false" />
                        
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Your Name</label>
                            <input type="text" id="name" name="name" className="form-control" placeholder="Enter your name" required aria-required="true" autoComplete="name" />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Your Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" required aria-required="true" autoComplete="email" />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="company" className="form-label">Company</label>
                            <input type="text" id="company" name="company" className="form-control" placeholder="Enter your company name" autoComplete="organization" />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea id="message" name="message" className="form-control" placeholder="Enter your message" required aria-required="true"></textarea>
                        </div>
                        
                        <button type="submit" className="btn" aria-label="Send Message" id="submitButton" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </button>
                        
                        {status === 'error' && (
                            <span className="error-message" id="formError" style={{ display: 'block', marginTop: '1rem', color: 'red' }} aria-live="polite">{errorMsg}</span>
                        )}
                    </form>
                )}
            </article>
        </section>
    );
};

export const FAQ = () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is Udith Babu K N?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Udith Babu K N is a Marketing and Sales Executive and IT Business Analyst based in Kerala, India, with an MBA in Operations & Marketing."
          }
        },
        {
          "@type": "Question",
          "name": "What are Udith Babu K N's core skills?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "His core skills include Advanced SEO strategy, Generative Engine Optimization (GEO), Content Marketing, Python, MySQL, and Agile project management."
          }
        },
        {
          "@type": "Question",
          "name": "How can I contact Udith Babu K N?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can contact Udith Babu K N via email at udithbabuvarrier@gmail.com or call at +91 8301993853."
          }
        }
      ]
    };

    return (
        <section id="faq" className="section" lang="en">
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>
            <h2 className="section-header">Frequently Asked Questions</h2>
            <article className="content-box lazy-load" lang="en">
                <div className="faq-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="faq-item">
                        <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Who is Udith Babu K N?</h3>
                        <p>Udith Babu K N is a Marketing and Sales Executive and IT Business Analyst based in Kerala, India, with an MBA in Operations & Marketing.</p>
                    </div>
                    <div className="faq-item">
                        <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>What are Udith Babu K N's core skills?</h3>
                        <p>His core skills include Advanced SEO strategy, Generative Engine Optimization (GEO), Content Marketing, Python, MySQL, and Agile project management.</p>
                    </div>
                    <div className="faq-item">
                        <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>How can I contact Udith Babu K N?</h3>
                        <p>You can contact Udith Babu K N via email at <strong>udithbabuvarrier@gmail.com</strong> or call at <strong>+91 8301993853</strong>.</p>
                    </div>
                </div>
            </article>
        </section>
    );
};
