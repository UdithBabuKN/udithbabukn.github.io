import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [minicomIndex, setMinicomIndex] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);

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

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://udithbabukn.github.io/#website",
        "url": "https://udithbabukn.github.io/",
        "name": "Udith Babu K N Portfolio",
        "description": "Portfolio of Udith Babu K N, a Marketing & Sales Executive and IT Business Analyst from Kerala, India.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://udithbabukn.github.io/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ProfilePage",
        "@id": "https://udithbabukn.github.io/#profilepage",
        "url": "https://udithbabukn.github.io/",
        "name": "Udith Babu K N | Marketing & Sales Executive Portfolio",
        "mainEntity": {
          "@type": "Person",
          "name": "Udith Babu K N",
          "jobTitle": "Executive – Marketing and Sales",
          "url": "https://udithbabukn.github.io/",
          "sameAs": socialLinks.map(s => s.url)
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://udithbabukn.github.io/"
            }
          ]
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Udith Babu K N | Marketing &amp; Sales Executive | IT Business Analyst</title>
        <meta 
          name="description" 
          content="Step up to Udith's desk! Marketing & Sales Executive and IT Business Analyst from Kerala, India. MBA in Operations & Marketing • B.Tech in IT." 
        />
        <link rel="canonical" href="https://udithbabukn.github.io/" />
        <meta property="og:title" content="Udith Babu K N | Marketing &amp; Sales Executive Portfolio" />
        <meta property="og:description" content="Step up to Udith's desk! Marketing & Sales Executive and IT Business Analyst from Kerala, India." />
        <meta property="og:url" content="https://udithbabukn.github.io/" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

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

              <Link to="/work" className="sk-action-pill view-work-pill">
                View Work ↓
              </Link>
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

      {/* EXPERIENCE & EDUCATION (Timeline Paper) */}
      <section className="sk-experience-section" style={{ padding: '60px 0 20px' }}>
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

      {/* FAQ ACCORDION */}
      <section className="sk-about-section" style={{ borderBottom: 'var(--sk-border-hairline)', paddingBottom: '60px' }}>
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
    </>
  );
}
