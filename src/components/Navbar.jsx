import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { name: 'Home', path: '/', pillClass: 'pill-home' },
    { name: 'Work', path: '/work', pillClass: 'pill-work' },
    { name: 'About', path: '/about', pillClass: 'pill-about' },
    { name: 'Skills', path: '/skills', pillClass: 'pill-skills' },
    { name: 'Articles', path: '/articles', pillClass: 'pill-articles' },
    { name: 'Contact', path: '/contact', pillClass: 'pill-contact' }
  ];

  return (
    <header className="sk-header">
      <div className="sk-container sk-header-inner" style={{ justifyContent: 'center' }}>
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
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
