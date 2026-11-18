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
        'articles': '/blog',
        'blog': '/blog',
        'contact': '/contact'
      };

      if (routesMap[cleanHash]) {
        navigate(routesMap[cleanHash], { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
}

/**
 * Directs individual blog requests (e.g. /blog/post-name or /blog/post-name.html)
 * to the standalone static HTML article, bypassing client SPA routing.
 */
function BlogArticleRedirector() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const cleanPath = location.pathname.endsWith('.html')
      ? location.pathname
      : `${location.pathname}.html`;

    fetch(cleanPath)
      .then((res) => {
        if (!res.ok || !res.headers.get('content-type')?.includes('text/html')) {
          throw new Error('Not found');
        }
        return res.text();
      })
      .then((html) => {
        if (cancelled) return;
        if (!html.includes('id="root"') && html.includes('sk-article-card-sheet')) {
          document.open();
          document.write(html);
          document.close();
        } else {
          // Avoid infinite reload loop on missing /blog/<typo> URLs
          navigate('/blog', { replace: true });
        }
      })
      .catch(() => {
        if (!cancelled) navigate('/blog', { replace: true });
      });

    return () => {
      cancelled = true;
    };
  }, [location, navigate]);

  return (
    <div style={{ padding: '80px 20px', textAlign: 'center', color: '#FFFFFF', fontFamily: 'var(--sk-font-mono)', fontWeight: '700' }}>
      Opening article...
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <HashRedirectHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/blog" element={<ArticlesPage />} />
          <Route path="/blog/:slug" element={<BlogArticleRedirector />} />
          <Route path="/articles" element={<Navigate to="/blog" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
