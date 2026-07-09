import { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { initAllAnimations } from './utils/animations';

import { Summary, Skills, Experience, Education, Projects, Certifications, Contact, FAQ } from './data/contentComponents';
import Blog from './components/Blog';
import BottomDock from './components/BottomDock';
import MobileHeader from './components/MobileHeader';

const Background3D = lazy(() => import('./components/Background3D'));

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
      <div className="container">
        <Suspense fallback={null}>
          <Background3D activeSection={activeSection} />
        </Suspense>
        <BottomDock activeSection={activeSection} setActiveSection={setActiveSection} SECTIONS={SECTIONS} />
        <main className="content" id="main-content" aria-label="Main Content">
          <MobileHeader />

          <div className="content-scroller">
              <ActiveComponent />
          </div>
          <footer className="footer">
            <p>© {new Date().getFullYear()} Udith Babu K N. All Rights Reserved.</p>
          </footer>
        </main>
      </div>
    </>
  );
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
