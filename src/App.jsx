import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Summary, Skills, Experience, Education, Projects, Certifications, Contact, FAQ } from './data/contentComponents';
import Blog from './components/Blog';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import Background3D from './components/Background3D';
import { initAllAnimations } from './utils/animations';
import { setDynamicTheme } from './utils/theme';

const SECTIONS = {
  summary: Summary,
  skills: Skills,
  experience: Experience,
  education: Education,
  projects: Projects,
  blog: Blog,
  certifications: Certifications,
  faq: FAQ,
  contact: Contact
};

function App() {
  const [activeSection, setActiveSection] = useState('summary');

  useEffect(() => {
    // Initial setup
    setDynamicTheme();
    updateDates();

    const hash = window.location.hash.replace('#', '');
    if (SECTIONS[hash]) {
      setActiveSection(hash);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (SECTIONS[newHash]) {
        setActiveSection(newHash);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Re-run animations slightly after render
  useEffect(() => {
    const timer = setTimeout(() => {
      initAllAnimations();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeSection]);

  const ActiveComponent = SECTIONS[activeSection];

  return (
    <>
      <Helmet>
        <title>Udith Babu K N | {capitalize(activeSection)}</title>
        <meta name="description" content={`Udith Babu K N - ${capitalize(activeSection)} section. Marketing & Sales Executive and IT Business Analyst.`} />
        <meta property="og:title" content={`Udith Babu K N | ${capitalize(activeSection)}`} />
        <meta property="og:url" content={`https://udithbabukn.github.io/#${activeSection}`} />
      </Helmet>
      <Background3D activeSection={activeSection} />
      <div className="container">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} SECTIONS={SECTIONS} />
        <main className="content" id="main-content" aria-label="Main Content">
          <MobileHeader />
          <div className="mobile-contact-info">
              <div className="contact-item"><i className="ph-duotone ph-envelope-simple" aria-hidden="true"></i><a href="mailto:udithbabuvarrier@gmail.com" className="email-link" aria-label="Email Udith Babu"><span className="email-placeholder">udithbabuvarrier@gmail.com</span></a></div>
              <div className="contact-item"><i className="ph-duotone ph-phone" aria-hidden="true"></i><a href="tel:+918301993853" aria-label="Call Udith Babu">+91 8301993853</a></div>
              <div className="contact-item"><i className="ph-duotone ph-map-pin" aria-hidden="true"></i><span>Thalassery, Kerala, India</span></div>
          </div>
          <div className="content-scroller">
            <ActiveComponent />
          </div>
          <footer className="footer">
            <p>© {new Date().getFullYear()} Udith Babu K N. All Rights Reserved.</p>
          </footer>
        </main>
      </div>
      <nav className="bottom-nav" id="bottomNav" aria-label="Mobile Navigation">
        {Object.keys(SECTIONS).map((key) => (
          <a key={key} href={`#${key}`} className={`bottom-nav-link ${activeSection === key ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', `#${key}`); setActiveSection(key); }}>
            <i className={`ph-duotone ph-${getIconForSection(key)}`}></i><span>{capitalize(key)}</span>
          </a>
        ))}
      </nav>
    </>
  );
}

function getIconForSection(key) {
  const map = {
    summary: 'user',
    skills: 'gear',
    experience: 'briefcase',
    education: 'graduation-cap',
    projects: 'tree-structure',
    blog: 'feather',
    certifications: 'certificate',
    faq: 'question',
    contact: 'envelope-simple'
  };
  return map[key] || 'circle';
}

function capitalize(s) {
  if (s === 'contact') return 'Contact';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function updateDates() {
  const currentDate = new Date().toISOString().split('T')[0];
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
}

export default App;
