import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ArticlesPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';
import './shelbyStyle.css';

/**
 * Handles backward compatibility for anchor hash links (e.g. /#work, /#about)
 * and smoothly redirects them to dedicated subpages for preserved SEO and backlink equity.
 */
function HashRedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const cleanHash = location.hash.toLowerCase().replace('#', '');
      const routesMap = {
        'work': '/work',
        'projects': '/work',
        'about': '/about',
        'bio': '/about',
        'skills': '/skills',
        'articles': '/articles',
        'blog': '/articles',
        'contact': '/contact'
      };

      if (routesMap[cleanHash]) {
        navigate(routesMap[cleanHash], { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
}

function App() {
  useEffect(() => {
    updateDates();
  }, []);

  return (
    <BrowserRouter>
      <HashRedirectHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
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
