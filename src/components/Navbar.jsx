import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer automatically when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/', pillClass: 'pill-home', icon: 'ph-house' },
    { name: 'Work', path: '/work', pillClass: 'pill-work', icon: 'ph-briefcase' },
    { name: 'About', path: '/about', pillClass: 'pill-about', icon: 'ph-user' },
    { name: 'Skills', path: '/skills', pillClass: 'pill-skills', icon: 'ph-code' },
    { name: 'Articles', path: '/articles', pillClass: 'pill-articles', icon: 'ph-newspaper' },
    { name: 'Contact', path: '/contact', pillClass: 'pill-contact', icon: 'ph-envelope-simple' }
  ];

  return (
    <header className="sk-header">
      <div className="sk-container">
        {/* Mobile Header Bar: Brand + Hamburger Toggle */}
        <div className="sk-mobile-header-bar">
          <Link to="/" className="sk-nav-brand" aria-label="Udith Babu K N - Home">
            <span className="sk-brand-avatar">UB</span>
            <span className="sk-brand-meta">
              <span className="sk-brand-name">Udith Babu K N</span>
              <span className="sk-brand-role">Executive Portfolio</span>
            </span>
          </Link>

          <button
            type="button"
            className={`sk-mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`ph ${mobileMenuOpen ? 'ph-x' : 'ph-list'}`} aria-hidden="true"></i>
          </button>
        </div>

        {/* Desktop Navigation: Centered Pills */}
        <div className="sk-desktop-nav-container">
          <nav aria-label="Main Navigation">
            <ul className="sk-nav-pills">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `sk-nav-pill-btn ${item.pillClass} ${isActive ? 'active' : ''}`
                    }
                  >
                    <i className={`ph ${item.icon} sk-nav-pill-icon`} aria-hidden="true"></i>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <nav className="sk-mobile-drawer" aria-label="Mobile Navigation">
            <ul className="sk-mobile-nav-grid">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `sk-mobile-nav-btn ${item.pillClass} ${isActive ? 'active' : ''}`
                    }
                  >
                    <i className={`ph ${item.icon}`} aria-hidden="true"></i>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
