import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function WorkPage() {
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

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://udithbabukn.github.io/work",
        "url": "https://udithbabukn.github.io/work",
        "name": "Selected Projects & Tools | Udith Babu K N",
        "description": "Tools and dashboards built to solve real problems in analytics, SEO, and web performance.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://udithbabukn.github.io/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Work",
              "item": "https://udithbabukn.github.io/work"
            }
          ]
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Work | Selected Projects &amp; Tools | Udith Babu K N</title>
        <meta 
          name="description" 
          content="Tools and dashboards built to solve real problems in analytics, SEO, and web performance by Udith Babu K N." 
        />
        <link rel="canonical" href="https://udithbabukn.github.io/work" />
        <meta property="og:title" content="Work | Selected Projects &amp; Tools | Udith Babu K N" />
        <meta property="og:description" content="Tools and dashboards built to solve real problems in analytics, SEO, and web performance." />
        <meta property="og:url" content="https://udithbabukn.github.io/work" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <section id="work" className="sk-work-section" style={{ paddingTop: '28px' }}>
        <div className="sk-container">
          <Breadcrumbs 
            items={[
              { label: 'Home', path: '/' },
              { label: 'Work', path: '/work' }
            ]} 
          />

          <div style={{ marginBottom: '32px' }}>
            <h1 className="sk-section-heading">Selected Projects &amp; Tools</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--sk-ink-muted)', marginTop: '8px' }}>
              Tools and dashboards built to solve real problems in analytics, SEO, and web performance.
            </p>
          </div>

          <div className="sk-projects-grid">
            {projects.map((proj, idx) => (
              <article className="sk-project-card" key={idx}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span className="sk-project-tag-pill">{proj.tag}</span>
                  <h2 className="sk-project-title">{proj.title}</h2>
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
    </>
  );
}
