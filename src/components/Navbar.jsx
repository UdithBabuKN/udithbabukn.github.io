import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { id: '01', name: 'Home', path: '/', pillClass: 'pill-home' },
    { id: '02', name: 'Work', path: '/work', pillClass: 'pill-work' },
    { id: '03', name: 'About', path: '/about', pillClass: 'pill-about' },
    { id: '04', name: 'Skills', path: '/skills', pillClass: 'pill-skills' },
    { id: '05', name: 'Blog', path: '/blog', pillClass: 'pill-blog pill-articles' },
    { id: '06', name: 'Contact', path: '/contact', pillClass: 'pill-contact' }
  ];

  return (
    <header className="sk-header">
      <div className="sk-container sk-header-inner">
        {/* Clean Dispersed-to-Assembled Navigation */}
        <nav aria-label="Main Navigation">
          <ul className="sk-nav-pills">
            {navItems.map((item, idx) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `sk-nav-pill-btn ${item.pillClass} dispersed-item-${idx} ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="sk-nav-index-tag">{item.id}.</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
