import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPostsData';
import AsciiBackground from './AsciiBackground';

export default function ShelbyPortfolio({ onSwitchToClassic }) {
  const [minicomIndex, setMinicomIndex] = useState(0);
  const [deskShaking, setDeskShaking] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [contactStatus, setContactStatus] = useState('idle');
  const [contactError, setContactError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleArticleCount, setVisibleArticleCount] = useState(6);
  const [tosOpen, setTosOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const minicomMessages = [
    "Hi! Step up to Udith's desk! Marketing & Sales Executive and IT Business Analyst.",
    "Dual Degree: MBA in Operations & Marketing + B.Tech in Information Technology.",
    "Google Search impact: Scaled organic clicks from 90 to 350+ peak daily!",
    "Shipped 5+ live production web tools with Python, MySQL, and React.",
    "Say hi or discuss high-impact roles: udithbabuvarrier@gmail.com"
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'ph-linkedin-logo', url: 'https://www.linkedin.com/in/udith-babu-k-n', cls: 'social-linkedin' },
    { name: 'Instagram', icon: 'ph-instagram-logo', url: 'https://www.instagram.com/udith_babu_k_n', cls: 'social-instagram' },
    { name: 'Facebook', icon: 'ph-facebook-logo', url: 'https://www.facebook.com/darkHeavan', cls: 'social-facebook' },
    { name: 'X (Twitter)', icon: 'ph-x-logo', url: 'https://x.com/dark_heavan7', cls: 'social-x' },
    { name: 'Medium', icon: 'ph-medium-logo', url: 'https://medium.com/@udithbabuvarrier10', cls: 'social-medium' },
    { name: 'Pinterest', icon: 'ph-pinterest-logo', url: 'https://br.pinterest.com/udith_babu_k_n', cls: 'social-pinterest' },
    { name: 'Pexels', icon: 'ph-camera', url: 'https://www.pexels.com/@udith-babu-k-n-288919024', cls: 'social-pexels' },
  ];

  const handleNextMinicom = () => {
    setMinicomIndex((prev) => (prev + 1) % minicomMessages.length);
  };

  const handlePrevMinicom = () => {
    setMinicomIndex((prev) => (prev - 1 + minicomMessages.length) % minicomMessages.length);
  };

  const handleResetDesk = () => {
    setMinicomIndex((prev) => (prev + 1) % minicomMessages.length);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('loading');
    setContactError('');

    const form = e.target;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const resJson = await response.json();
      if (response.ok && resJson.success) {
        setContactStatus('success');
      } else {
        throw new Error(resJson.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setContactStatus('error');
      setContactError(err.message || 'Error occurred. Please reach out directly.');
    }
  };

  const projects = [
    {
      title: "SEO & Analytics Dashboard",
      tag: "React • GSC API • Data Viz",
      desc: "Custom analytics engine combining Google Search Console data with real-time crawl tracking, keyword velocity, and actionable traffic insights.",
      link: "https://analytics-dashboard-two-sigma.vercel.app/",
      type: "Live App"
    },
    {
      title: "Web Analyzer Pro",
      tag: "JavaScript • HTML • CSS • Chart.js",
      desc: "Interactive tool to reverse-engineer any live website's design system, extracting typography stacks, colors, spacing ratios, and CSS metrics.",
      link: "https://udithkn.github.io/Web-Analyzer-Pro/",
      type: "Live Tool"
    },
    {
      title: "Malicious JPEG Security Extension",
      tag: "Python • Machine Learning • Chrome API",
      desc: "Chrome browser extension for detecting embedded malicious payloads in images with 25% improved pattern recognition accuracy.",
      link: "https://github.com/udithkn/maljpeg_project",
      type: "GitHub Repo"
    },
    {
      title: "Free LinkedIn Banner Premium Collection",
      tag: "Design System • HTML • CSS • Showcase",
      desc: "Curated collection of 50+ conversion-focused, customizable LinkedIn banners built for executives, engineers, and digital marketers.",
      link: "https://udithkn.github.io/Free-LinkedIn-Banner-Premium-Collection/",
      type: "Live Collection"
    },
    {
      title: "ImageForge Ad-Free Converter",
      tag: "Client-Side Processing • Canvas API",
      desc: "Zero-tracking, privacy-first format converter allowing seamless transforms between JPG, PNG, and WebP with zero ads or signups.",
      link: "https://udithkn.github.io/ImageForge/",
      type: "Live Tool"
    }
  ];

  return (
    <div className="sk-page-wrapper">
      <AsciiBackground />
      <Helmet>
        <title>Udith Babu K N | Marketing &amp; Sales Executive | IT Business Analyst</title>
        <meta name="description" content="Step up to Udith's desk! Marketing & Sales Executive and IT Business Analyst from Kerala, India. MBA in Operations & Marketing • B.Tech in IT." />
      </Helmet>
      {/* Sticky Header with Navigation Pills */}
      <header className="sk-header">
        <div className="sk-container sk-header-inner">
          <nav>
            <ul className="sk-nav-pills">
              <li><a href="#work" className="sk-nav-pill-btn pill-work">Work</a></li>
              <li><a href="#about" className="sk-nav-pill-btn pill-about">About</a></li>
              <li><a href="#skills" className="sk-nav-pill-btn pill-skills">Skills</a></li>
              <li><a href="#articles" className="sk-nav-pill-btn pill-articles">Articles</a></li>
              <li><a href="#contact" className="sk-nav-pill-btn pill-contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* HERO SECTION: "UDITH'S DESK." */}
      <section id="desk" className="sk-desk-hero">
        <div className="sk-container">
          <div className="sk-desk-header-center">
            <h1 className="sk-desk-headline">Udith's desk.</h1>
            <p className="sk-desk-subline">
              Udith Babu K N; Marketing &amp; Sales Executive and IT Business Analyst from Kerala, India, currently driving organic scale and operational growth.
            </p>
          </div>

          {/* Interactive Illustrated Desk Mat */}
          <div className="sk-desk-stage">
            
            {/* Top row: Minicom speech bubble + Focus Note */}
            <div className="sk-desk-top-row">
              <div className="sk-speech-bubble-widget">
                <div className="sk-minicom-header">
                  <span className="sk-minicom-badge">MINICOM</span>
                  <div className="sk-minicom-dots">
                    {minicomMessages.map((_, i) => (
                      <span 
                        key={i} 
                        className={`sk-minicom-dot ${minicomIndex === i ? 'active' : ''}`}
                        onClick={() => setMinicomIndex(i)}
                      ></span>
                    ))}
                  </div>
                </div>

                <div className="sk-speech-text">
                  {minicomMessages[minicomIndex]}
                </div>

                <div className="sk-minicom-nav">
                  <button className="sk-minicom-btn" onClick={handlePrevMinicom}>←</button>
                  <button className="sk-minicom-btn" onClick={handleNextMinicom}>Next →</button>
                </div>
              </div>

              {/* Status Note */}
              <div className="sk-status-note" style={{ maxWidth: '280px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sk-accent)' }}>
                  📌 Current Focus
                </div>
                <div style={{ fontFamily: 'var(--sk-font-serif)', fontStyle: 'italic', fontSize: '1.25rem', marginTop: '4px' }}>
                  Open for Marketing Executive &amp; Growth Roles
                </div>
              </div>
            </div>

            {/* Fidget & Desk Objects Row (Illustrated Cards) */}
            <div className="sk-desk-items-scene">
              {/* Item 1 */}
              <div className="sk-desk-item-card">
                <span className="sk-desk-item-detail">Google Search Console</span>
                <div className="sk-metric-big">350+</div>
                <div className="sk-desk-item-title">Daily Organic Clicks</div>
                <p style={{ fontSize: '0.84rem', margin: 0, color: 'var(--sk-ink-muted)' }}>
                  Scaled organic search traffic from 90 to 350+ via technical crawl optimization.
                </p>
              </div>

              {/* Item 2 */}
              <div className="sk-desk-item-card">
                <span className="sk-desk-item-detail">Academic Foundation</span>
                <div className="sk-metric-big">MBA &amp; B.Tech</div>
                <div className="sk-desk-item-title">Dual Degree Focus</div>
                <p style={{ fontSize: '0.84rem', margin: 0, color: 'var(--sk-ink-muted)' }}>
                  Operations &amp; Marketing (72.9%) + Information Technology (78.4%).
                </p>
              </div>

              {/* Item 3 */}
              <div className="sk-desk-item-card">
                <span className="sk-desk-item-detail">Quality &amp; Delivery</span>
                <div className="sk-metric-big">98%</div>
                <div className="sk-desk-item-title">UAT Compliance</div>
                <p style={{ fontSize: '0.84rem', margin: 0, color: 'var(--sk-ink-muted)' }}>
                  100+ business requirements documented and approved at Cyber Sapient.
                </p>
              </div>

              {/* Item 4 */}
              <div className="sk-desk-item-card">
                <span className="sk-desk-item-detail">AI Automation</span>
                <div className="sk-metric-big">-30%</div>
                <div className="sk-desk-item-title">Triage Time</div>
                <p style={{ fontSize: '0.84rem', margin: 0, color: 'var(--sk-ink-muted)' }}>
                  Streamlined customer service workflows using AI integrations at Techmindz.
                </p>
              </div>
            </div>

            {/* Desk Bottom Action Pills */}
            <div className="sk-desk-bottom-row">
              <button className="sk-action-pill" onClick={handleResetDesk}>
                Reset Desk ↺
              </button>

              <a href="#work" className="sk-action-pill view-work-pill">
                View Work ↓
              </a>
            </div>

          </div>

          {/* Social Links Ribbon Under Desk */}
          <div style={{ marginTop: '36px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sk-ink-muted)' }}>
              Connect Across Channels
            </span>
            <div className="sk-socials-grid">
              {socialLinks.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.url} 
                  target={item.url.startsWith('mailto') ? '_self' : '_blank'} 
                  rel="noopener noreferrer" 
                  className="sk-social-pill"
                  title={item.name}
                >
                  <i className={`ph ${item.icon}`} aria-hidden="true"></i>
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="sk-about-section">
        <div className="sk-container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 className="sk-section-heading">About Me</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--sk-ink-muted)', marginTop: '8px' }}>
              Bridging business analysis, operations strategy, and algorithmic search growth.
            </p>
          </div>

          <div className="sk-pinned-sheets">
            {/* Sheet 1 */}
            <div className="sk-memo-sheet">
              <h2 className="sk-memo-title">About me; the basics</h2>
              <div className="sk-memo-body">
                <p>
                  I graduated with an MBA in Operations &amp; Marketing and a B.Tech in Information Technology from College of Engineering Thalassery. I currently serve as Executive – Marketing and Sales at Rêve, where I spearhead on-page/off-page SEO strategies, client acquisition, and analytics audits.
                </p>
                <p style={{ marginTop: '12px' }}>
                  I spend a lot of time analyzing search intent, reverse-engineering design systems, and building tools that remove digital friction. I really like making business growth measurable.
                </p>
              </div>
            </div>

            {/* Sheet 2 */}
            <div className="sk-memo-sheet">
              <h2 className="sk-memo-title">A crush on data &amp; search architecture</h2>
              <div className="sk-memo-body">
                <p>
                  I love search mechanics: how search engines crawl semantic HTML, how Google Analytics 4 tracks intent journeys, and how Generative Engine Optimization (GEO/AEO) is redefining discovery.
                </p>
                <p style={{ marginTop: '12px' }}>
                  Whether automating data extraction using Python, querying MySQL databases, or designing clean UI in Figma, I believe effective marketing is equal parts creative storytelling and algorithmic precision.
                </p>
              </div>
            </div>

            {/* Sheet 3 */}
            <div className="sk-memo-sheet">
              <h2 className="sk-memo-title">Agile execution &amp; credentials</h2>
              <div className="sk-memo-body">
                <p>
                  Completed the JPMorgan Chase &amp; Co. Agile Job Simulation (sprint reviews, user stories) and micro1's rigorous Business Analyst AI evaluation. I bridge developers, designers, and stakeholders to deliver projects on time with high client satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK & PROJECTS SECTION */}
      <section id="work" className="sk-work-section">
        <div className="sk-container">
          <div style={{ marginBottom: '32px' }}>
            <h2 className="sk-section-heading">Selected Projects &amp; Tools</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--sk-ink-muted)', marginTop: '8px' }}>
              Tools and dashboards built to solve real problems in analytics, SEO, and web performance.
            </p>
          </div>

          <div className="sk-projects-grid">
            {projects.map((proj, idx) => (
              <article className="sk-project-card" key={idx}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span className="sk-project-tag-pill">{proj.tag}</span>
                  <h3 className="sk-project-title">{proj.title}</h3>
                  <p className="sk-project-desc">{proj.desc}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: 'var(--sk-border-hairline)' }}>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="sk-project-link-btn">
                    Launch {proj.type} ↗
                  </a>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.05em', color: 'var(--sk-ink-muted)' }}>
                    0{idx + 1}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS & STICKY NOTES MATRIX */}
      <section id="skills" className="sk-skills-section">
        <div className="sk-container">
          <div style={{ marginBottom: '36px' }}>
            <h2 className="sk-section-heading">Toolbox &amp; Methods</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--sk-ink-muted)', marginTop: '8px' }}>
              Hand-picked capabilities across growth marketing, technical analysis, and project execution.
            </p>
          </div>

          <div className="sk-sticky-grid">
            <div className="sk-sticky-note">
              <h3 className="sk-sticky-title">Marketing &amp; SEO</h3>
              <div className="sk-sticky-chips">
                <span className="sk-sticky-chip">Technical SEO</span>
                <span className="sk-sticky-chip">AEO &amp; GEO Strategy</span>
                <span className="sk-sticky-chip">Google Analytics 4</span>
                <span className="sk-sticky-chip">Content Marketing</span>
                <span className="sk-sticky-chip">Keyword Research</span>
              </div>
            </div>

            <div className="sk-sticky-note">
              <h3 className="sk-sticky-title">Core Technologies</h3>
              <div className="sk-sticky-chips">
                <span className="sk-sticky-chip">Python</span>
                <span className="sk-sticky-chip">MySQL Database</span>
                <span className="sk-sticky-chip">JavaScript</span>
                <span className="sk-sticky-chip">Data Scraping</span>
                <span className="sk-sticky-chip">Vibe Coding</span>
              </div>
            </div>

            <div className="sk-sticky-note">
              <h3 className="sk-sticky-title">Project &amp; Design</h3>
              <div className="sk-sticky-chips">
                <span className="sk-sticky-chip">Jira Sprints</span>
                <span className="sk-sticky-chip">Trello Boards</span>
                <span className="sk-sticky-chip">Figma UI/UX</span>
                <span className="sk-sticky-chip">AI Video Gen</span>
                <span className="sk-sticky-chip">Poster Design</span>
              </div>
            </div>

            <div className="sk-sticky-note">
              <h3 className="sk-sticky-title">Business &amp; Analysis</h3>
              <div className="sk-sticky-chips">
                <span className="sk-sticky-chip">Stakeholder Alignment</span>
                <span className="sk-sticky-chip">Scrum Facilitation</span>
                <span className="sk-sticky-chip">Root-Cause Analysis</span>
                <span className="sk-sticky-chip">CRM Handling</span>
                <span className="sk-sticky-chip">MS Excel Models</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE & EDUCATION (Timeline Paper) */}
      <section className="sk-experience-section">
        <div className="sk-container">
          <div className="sk-timeline-paper">
            {/* Work History */}
            <div>
              <h2 className="sk-timeline-column-title">Work Experience</h2>
              <div className="sk-timeline-entries">
                <div className="sk-timeline-card">
                  <div className="sk-timeline-date">Aug 2025 – Present</div>
                  <h3 className="sk-timeline-role">Executive – Marketing &amp; Sales</h3>
                  <div className="sk-timeline-org">Rêve</div>
                  <p style={{ fontSize: '0.86rem', marginTop: '6px', color: 'var(--sk-ink-muted)' }}>
                    Directing comprehensive marketing campaigns, SEO audits, and organic ranking growth.
                  </p>
                </div>

                <div className="sk-timeline-card">
                  <div className="sk-timeline-date">May 2025 – Aug 2025</div>
                  <h3 className="sk-timeline-role">Business Development Executive</h3>
                  <div className="sk-timeline-org">Accelgrowth Technology Pvt. Ltd.</div>
                  <p style={{ fontSize: '0.86rem', marginTop: '6px', color: 'var(--sk-ink-muted)' }}>
                    Conducted client discovery, customer trend analytics, and managed UAT requirements.
                  </p>
                </div>

                <div className="sk-timeline-card">
                  <div className="sk-timeline-date">Sep 2024 – Dec 2024</div>
                  <h3 className="sk-timeline-role">Business Analyst Intern</h3>
                  <div className="sk-timeline-org">CST - Cyber Sapient</div>
                  <p style={{ fontSize: '0.86rem', marginTop: '6px', color: 'var(--sk-ink-muted)' }}>
                    Drafted 100+ business specs and analyzed 50+ datasets with Python.
                  </p>
                </div>

                <div className="sk-timeline-card">
                  <div className="sk-timeline-date">Aug 2023 – Sep 2023</div>
                  <h3 className="sk-timeline-role">Operations Intern</h3>
                  <div className="sk-timeline-org">Techmindz</div>
                  <p style={{ fontSize: '0.86rem', marginTop: '6px', color: 'var(--sk-ink-muted)' }}>
                    Automated support workflows with AI tools, cutting response latency by 30%.
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Credentials */}
            <div>
              <h2 className="sk-timeline-column-title">Education &amp; Honors</h2>
              <div className="sk-timeline-entries">
                <div className="sk-timeline-card">
                  <div className="sk-timeline-date">2022 – 2024</div>
                  <h3 className="sk-timeline-role">MBA (Operations &amp; Marketing)</h3>
                  <div className="sk-timeline-org">College of Engineering Thalassery • 7.29 CGPA</div>
                  <p style={{ fontSize: '0.86rem', marginTop: '6px', color: 'var(--sk-ink-muted)' }}>
                    Specialized in Supply Chain, Operations Research, and Data Marketing.
                  </p>
                </div>

                <div className="sk-timeline-card">
                  <div className="sk-timeline-date">2018 – 2022</div>
                  <h3 className="sk-timeline-role">B.Tech (Information Technology)</h3>
                  <div className="sk-timeline-org">College of Engineering Thalassery • 7.84 CGPA</div>
                  <p style={{ fontSize: '0.86rem', marginTop: '6px', color: 'var(--sk-ink-muted)' }}>
                    Software engineering, database architecture, and algorithms.
                  </p>
                </div>

                <div className="sk-timeline-card">
                  <div className="sk-timeline-date">Industry Credential</div>
                  <h3 className="sk-timeline-role">JPMorgan Chase Agile Job Simulation</h3>
                  <div className="sk-timeline-org">Forage Certified</div>
                  <a href="https://drive.google.com/file/d/1H1VZzktMJv3bnaK4FfB7O6NTazp3L6CK/view?usp=drive_link" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sk-accent)', fontWeight: '700', fontSize: '0.82rem', display: 'inline-block', marginTop: '6px' }}>
                    View Credential ↗
                  </a>
                </div>

                <div className="sk-timeline-card">
                  <div className="sk-timeline-date">Industry Credential</div>
                  <h3 className="sk-timeline-role">micro1 Business Analyst Certified</h3>
                  <div className="sk-timeline-org">micro1 AI Evaluated</div>
                  <a href="https://drive.google.com/file/d/11k8iMDoCFEd-BMV-rPB-I52-clnJZOyO/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sk-accent)', fontWeight: '700', fontSize: '0.82rem', display: 'inline-block', marginTop: '6px' }}>
                    View Credential ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES SECTION */}
      <section id="articles" className="sk-articles-section">
        <span id="blog" style={{ position: 'relative', top: '-100px', display: 'block', visibility: 'hidden' }}></span>
        <div className="sk-container">
          <div style={{ marginBottom: '28px' }}>
            <h2 className="sk-section-heading">Notes &amp; Articles</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--sk-ink-muted)', marginTop: '8px' }}>
              Strategic frameworks and deep dives on sales excellence, modern search algorithms, and commercial growth.
            </p>
          </div>

          {/* Interactive Category Filter Bar */}
          <div className="sk-articles-filter-bar">
            {['All', 'Sales Excellence', 'Growth & Analytics', 'Playbook', 'Foundations'].map(cat => (
              <button
                key={cat}
                type="button"
                className={`sk-filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleArticleCount(6);
                }}
              >
                {cat === 'All' ? `All (${blogPosts.length})` : cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="sk-articles-grid">
            {blogPosts
              .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
              .slice(0, visibleArticleCount)
              .map((post) => (
                <a href={`blog/${post.slug}.html`} className="sk-article-card" key={post.slug}>
                  <div className="sk-article-img-container">
                    <img src={`images/blogimages/${post.image}`} alt={post.title} className="sk-article-img" loading="lazy" />
                  </div>
                  <div className="sk-article-body">
                    <div>
                      <span className="sk-project-tag-pill">{post.category}</span>
                      <h3 className="sk-article-title" style={{ marginTop: '12px' }}>{post.title}</h3>
                      <p className="sk-article-excerpt" style={{ marginTop: '8px' }}>{post.excerpt}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', fontWeight: '800', borderTop: 'var(--sk-border-hairline)', paddingTop: '12px', marginTop: '16px', color: 'var(--sk-ink-muted)' }}>
                      <span>Udith Babu K N</span>
                      <span><i className="ph ph-clock" style={{ marginRight: '4px' }}></i>{post.readTime}</span>
                    </div>
                  </div>
                </a>
              ))}
          </div>

          {/* Load More / Expand Bar */}
          {(() => {
            const totalForCategory = blogPosts.filter(p => selectedCategory === 'All' || p.category === selectedCategory).length;
            const hasMore = totalForCategory > visibleArticleCount;
            return (
              <div className="sk-articles-load-more-wrap">
                {hasMore && (
                  <button 
                    className="sk-action-pill" 
                    onClick={() => setVisibleArticleCount(prev => prev + 6)}
                  >
                    Load More Articles ({totalForCategory - visibleArticleCount} remaining) ↓
                  </button>
                )}
                {visibleArticleCount > 6 && (
                  <button 
                    className="sk-action-pill" 
                    onClick={() => setVisibleArticleCount(6)}
                    style={{ marginLeft: hasMore ? '14px' : '0' }}
                  >
                    Show Less ↑
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="sk-about-section" style={{ paddingTop: 0 }}>
        <div className="sk-container" style={{ maxWidth: '880px' }}>
          <h2 className="sk-section-heading" style={{ textAlign: 'center', marginBottom: '30px' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              {
                q: "Who is Udith Babu K N?",
                a: "Udith Babu K N is a Marketing and Sales Executive and IT Business Analyst based in Kerala, India, holding an MBA in Operations & Marketing and a B.Tech in Information Technology."
              },
              {
                q: "What is Udith's core expertise?",
                a: "Technical SEO audits, Generative Engine Optimization (GEO), Google Search Console growth, Python data pipelines, MySQL querying, and Agile Scrum delivery."
              },
              {
                q: "What kinds of roles and projects is Udith open to?",
                a: "Marketing & Sales Executive, Growth Strategist, IT Business Analyst, and Technical Product Marketing roles across startups and tech firms."
              }
            ].map((faq, i) => (
              <div 
                key={i} 
                className="sk-faq-item"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: 'var(--sk-font-serif)', fontStyle: 'italic', fontSize: '1.3rem', margin: 0, color: 'var(--sk-ink)' }}>
                    {faq.q}
                  </h3>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--sk-ink-muted)' }}>
                    {faqOpen === i ? '−' : '+'}
                  </span>
                </div>
                {faqOpen === i && (
                  <p style={{ marginTop: '12px', fontSize: '0.94rem', lineHeight: 1.6, color: 'var(--sk-ink-muted)', margin: '12px 0 0', borderTop: 'var(--sk-border-hairline)', paddingTop: '10px' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" style={{ padding: '40px 0 60px', borderBottom: 'var(--sk-border-hairline)' }}>
        <div className="sk-container" style={{ maxWidth: '780px' }}>
          <div className="sk-contact-box">
            <h2 className="sk-section-heading" style={{ marginBottom: '12px', textAlign: 'center' }}>
              Drop a note at Udith's desk.
            </h2>
            <p style={{ textAlign: 'center', fontSize: '0.95rem', color: 'var(--sk-ink-muted)', marginBottom: '28px' }}>
              Have an open role, project proposal, or want to discuss growth marketing? Send a direct dispatch below.
            </p>

            {contactStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '10px', color: 'var(--sk-accent)' }}>[ DISPATCH RECORDED ]</div>
                <h3 style={{ fontFamily: 'var(--sk-font-serif)', fontStyle: 'italic', fontSize: '2rem', color: 'var(--sk-ink)' }}>
                  Message Received at Udith's desk!
                </h3>
                <p style={{ marginTop: '8px', color: 'var(--sk-ink-muted)' }}>
                  Thank you for reaching out. I'll get back to you shortly!
                </p>
                <button 
                  className="sk-action-pill" 
                  onClick={() => setContactStatus('idle')} 
                  style={{ marginTop: '20px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form action="https://api.web3forms.com/submit" method="POST" onSubmit={handleContactSubmit}>
                <input type="hidden" name="access_key" value="87c7f836-6a95-44f3-8391-314433633006" />
                <input type="hidden" name="subject" value="New Portfolio Dispatch (Shelby Desk Style)" />
                <input type="hidden" name="from_name" value="Udith's Desk" />
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: '800', marginBottom: '6px', textTransform: 'uppercase', color: 'var(--sk-ink-muted)' }}>
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="e.g. Jane Doe" 
                      required 
                      className="sk-form-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: '800', marginBottom: '6px', textTransform: 'uppercase', color: 'var(--sk-ink-muted)' }}>
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="e.g. jane@company.com" 
                      required 
                      className="sk-form-input"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: '800', marginBottom: '6px', textTransform: 'uppercase', color: 'var(--sk-ink-muted)' }}>
                    Note or Opportunity
                  </label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    placeholder="Tell me what you have in mind..." 
                    required 
                    className="sk-form-textarea"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={contactStatus === 'loading'}
                  className="sk-submit-btn"
                >
                  {contactStatus === 'loading' ? 'Delivering to Desk...' : 'Send to Udith’s Desk'}
                </button>

                {contactStatus === 'error' && (
                  <p style={{ color: '#B91C1C', marginTop: '10px', fontSize: '0.85rem' }}>{contactError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="sk-footer">
        <div className="sk-container">
          <div className="sk-footer-bar">
            <div>
              © {new Date().getFullYear()} Udith Babu K N
            </div>

            <div className="sk-footer-links">
              <a href="#desk" className="sk-footer-link">Home</a>
              <a href="#work" className="sk-footer-link">Work</a>
              <a href="#about" className="sk-footer-link">About</a>
              <a href="#skills" className="sk-footer-link">Skills</a>
              <a href="#articles" className="sk-footer-link">Articles</a>
              <a href="#contact" className="sk-footer-link">Contact</a>
              <button type="button" onClick={() => setTosOpen(true)} className="sk-footer-link sk-footer-legal-tag">
                Terms of Service
              </button>
              <button type="button" onClick={() => setPrivacyOpen(true)} className="sk-footer-link sk-footer-legal-tag">
                Privacy Policy
              </button>
              <a href="#desk" className="sk-footer-link">Back to top ↑</a>
            </div>
          </div>
        </div>
      </footer>

      {/* TERMS OF SERVICE MODAL */}
      {tosOpen && (
        <div className="sk-legal-modal-backdrop" onClick={() => setTosOpen(false)} role="dialog" aria-modal="true">
          <div className="sk-legal-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="sk-legal-modal-header">
              <h3 className="sk-legal-modal-title">Terms of Service</h3>
              <button type="button" onClick={() => setTosOpen(false)} className="sk-legal-close-btn" aria-label="Close Terms of Service">
                Close [ESC]
              </button>
            </div>
            <div className="sk-legal-modal-body">
              <h4>1. Introduction and Scope</h4>
              <p>
                Welcome to the official portfolio and case study archive of Udith Babu K N (<a href="https://udithbabukn.github.io/" target="_blank" rel="noopener noreferrer">udithbabukn.github.io</a>). By accessing or utilizing this website, you agree to comply with and be bound by the following terms and conditions.
              </p>

              <h4>2. Intellectual Property and Content Rights</h4>
              <p>
                All text, analytical frameworks, articles, source code samples, case study documentation, and layout designs presented on this website are the intellectual property of Udith Babu K N unless otherwise noted or attributed to third-party employers/clients (such as Rêve, Accelgrowth, or Cyber Sapient).
              </p>
              <p>
                You are permitted to review, quote with appropriate attribution, and link to materials for recruitment, professional evaluation, or academic reference. You may not republish complete articles or software artifacts for commercial profit without explicit prior written authorization.
              </p>

              <h4>3. Software Tools and Demos</h4>
              <p>
                Interactive tools and utilities linked herein (including Web Analyzer Pro, SEO Analytics Dashboard, and ImageForge) are provided on an "as is" and "as available" basis for demonstration and evaluation purposes. No warranty, express or implied, is provided regarding uninterrupted availability or suitability for specific production workloads.
              </p>

              <h4>4. External Third-Party Links</h4>
              <p>
                This portfolio provides direct outbound links to external platforms including GitHub, LinkedIn, Medium, and credential verification portals. Udith Babu K N is not responsible for the privacy practices, content, or availability of third-party domains.
              </p>

              <h4>5. Governing Law and Jurisdiction</h4>
              <p>
                These terms are governed by and construed in accordance with the laws of India, within the jurisdiction of the State of Kerala.
              </p>

              <h4>6. Inquiries and Contact</h4>
              <p>
                For questions regarding permitted use, project licensing, or commercial inquiries, contact: <a href="mailto:udithbabuvarrier@gmail.com">udithbabuvarrier@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PRIVACY POLICY MODAL */}
      {privacyOpen && (
        <div className="sk-legal-modal-backdrop" onClick={() => setPrivacyOpen(false)} role="dialog" aria-modal="true">
          <div className="sk-legal-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="sk-legal-modal-header">
              <h3 className="sk-legal-modal-title">Privacy Policy</h3>
              <button type="button" onClick={() => setPrivacyOpen(false)} className="sk-legal-close-btn" aria-label="Close Privacy Policy">
                Close [ESC]
              </button>
            </div>
            <div className="sk-legal-modal-body">
              <h4>1. Respect for User Privacy</h4>
              <p>
                This website is dedicated to maintaining high standards of data privacy and transparency. We do not operate advertising tracking networks, sell visitor records, or deploy third-party telemetry brokers.
              </p>

              <h4>2. Information Collected via Direct Dispatch</h4>
              <p>
                When you submit a message through the contact form, the information provided (your name, email address, and message content) is transmitted securely via Web3Forms API solely for the purpose of receiving and responding to your inquiry.
              </p>
              <p>
                Your contact details are never shared, rented, or distributed to third-party commercial marketing lists.
              </p>

              <h4>3. Cookies and Tracking Technologies</h4>
              <p>
                This website does not utilize invasive tracking cookies or commercial behavioral profilers. Local browser storage may be utilized strictly for functional preferences (such as reading state or UI navigation).
              </p>

              <h4>4. Client-Side Tools Data Handling</h4>
              <p>
                Utilities linked within this portfolio, such as ImageForge and Web Analyzer Pro, execute processing entirely client-side within your browser sandbox via HTML5 Canvas and DOM APIs. Your files and images are never uploaded or persisted to remote servers.
              </p>

              <h4>5. Data Subject Rights</h4>
              <p>
                If you have submitted personal contact information and wish to request its verification, correction, or deletion from correspondence archives, you may do so at any time by emailing <a href="mailto:udithbabuvarrier@gmail.com">udithbabuvarrier@gmail.com</a>.
              </p>

              <h4>6. Effective Date and Updates</h4>
              <p>
                This policy is effective as of 2026. Any updates reflecting regulatory or architectural changes will be posted directly to this colophon.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
