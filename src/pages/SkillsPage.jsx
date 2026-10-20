import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SkillsPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemPage",
        "@id": "https://udithbabukn.github.io/skills",
        "url": "https://udithbabukn.github.io/skills",
        "name": "Toolbox & Methods | Udith Babu K N",
        "description": "Hand-picked capabilities across growth marketing, technical analysis, and project execution.",
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
              "name": "Skills",
              "item": "https://udithbabukn.github.io/skills"
            }
          ]
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Skills | Toolbox &amp; Methods | Udith Babu K N</title>
        <meta 
          name="description" 
          content="Hand-picked capabilities across growth marketing, technical analysis, and project execution by Udith Babu K N." 
        />
        <link rel="canonical" href="https://udithbabukn.github.io/skills" />
        <meta property="og:title" content="Skills | Toolbox &amp; Methods | Udith Babu K N" />
        <meta property="og:description" content="Hand-picked capabilities across growth marketing, technical analysis, and project execution." />
        <meta property="og:url" content="https://udithbabukn.github.io/skills" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* SKILLS & STICKY NOTES MATRIX */}
      <section id="skills" className="sk-skills-section" style={{ paddingTop: '28px', borderBottom: 'var(--sk-border-hairline)', paddingBottom: '70px' }}>
        <div className="sk-container">
          <Breadcrumbs 
            items={[
              { label: 'Home', path: '/' },
              { label: 'Skills', path: '/skills' }
            ]} 
          />

          <div style={{ marginBottom: '36px' }}>
            <h1 className="sk-section-heading">Toolbox &amp; Methods</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--sk-ink-muted)', marginTop: '8px' }}>
              Hand-picked capabilities across growth marketing, technical analysis, and project execution.
            </p>
          </div>

          <div className="sk-sticky-grid">
            <div className="sk-sticky-note">
              <h2 className="sk-sticky-title">Marketing &amp; SEO</h2>
              <div className="sk-sticky-chips">
                <span className="sk-sticky-chip">Technical SEO</span>
                <span className="sk-sticky-chip">AEO &amp; GEO Strategy</span>
                <span className="sk-sticky-chip">Google Analytics 4</span>
                <span className="sk-sticky-chip">Content Marketing</span>
                <span className="sk-sticky-chip">Keyword Research</span>
              </div>
            </div>

            <div className="sk-sticky-note">
              <h2 className="sk-sticky-title">Core Technologies</h2>
              <div className="sk-sticky-chips">
                <span className="sk-sticky-chip">Python</span>
                <span className="sk-sticky-chip">MySQL Database</span>
                <span className="sk-sticky-chip">JavaScript</span>
                <span className="sk-sticky-chip">Data Scraping</span>
                <span className="sk-sticky-chip">Vibe Coding</span>
              </div>
            </div>

            <div className="sk-sticky-note">
              <h2 className="sk-sticky-title">Project &amp; Design</h2>
              <div className="sk-sticky-chips">
                <span className="sk-sticky-chip">Jira Sprints</span>
                <span className="sk-sticky-chip">Trello Boards</span>
                <span className="sk-sticky-chip">Figma UI/UX</span>
                <span className="sk-sticky-chip">AI Video Gen</span>
                <span className="sk-sticky-chip">Poster Design</span>
              </div>
            </div>

            <div className="sk-sticky-note">
              <h2 className="sk-sticky-title">Business &amp; Analysis</h2>
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
    </>
  );
}
