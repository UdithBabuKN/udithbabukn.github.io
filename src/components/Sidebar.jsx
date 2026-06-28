import React from 'react';
import { toggleTheme } from '../utils/theme';

export default function Sidebar({ activeSection, setActiveSection, SECTIONS }) {
    return (
        <aside className="sidebar" id="sidebar" aria-label="Sidebar Navigation">
            <div className="sidebar-indicator"></div>
            <div className="profile-header">
                <img src="/picofme.webp" alt="Headshot of Udith Babu K N, Marketing and Sales Executive"
                    className="profile-pic" loading="lazy" width="50" height="50" />
                <div className="logo">Udith Babu K N</div>
            </div>
            <button className="theme-toggle" id="themeToggle" aria-label="Toggle color theme" aria-pressed="false" onClick={toggleTheme}>
                <i className="ph-duotone ph-moon"></i>
            </button>
            <div className="contact-info">
                <div className="contact-item">
                    <i className="ph-duotone ph-envelope-simple" aria-hidden="true"></i>
                    <a href="mailto:udithbabuvarrier@gmail.com" className="email-link" aria-label="Email Udith Babu">
                        <span className="email-placeholder">udithbabuvarrier@gmail.com</span>
                    </a>
                </div>
                <div className="contact-item">
                    <i className="ph-duotone ph-phone" aria-hidden="true"></i>
                    <a href="tel:+918301993853" aria-label="Call Udith Babu">+91 8301993853</a>
                </div>
                <div className="contact-item">
                    <i className="ph-duotone ph-map-pin" aria-hidden="true"></i>
                    <span>Thalassery, Kerala, India</span>
                </div>
            </div>

            <div className="social-links">
                <a href="https://www.linkedin.com/in/udith-babu-k-n" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="View Udith Babu K N's LinkedIn Profile">
                    <i className="ph-duotone ph-linkedin-logo icon-light" aria-hidden="true"></i>
                    <i className="ph-duotone ph-linkedin-logo icon-dark" aria-hidden="true"></i>
                    <span className="sr-only">LinkedIn Profile</span>
                </a>
                <a href="https://www.instagram.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="View Udith Babu K N's Instagram Profile">
                    <i className="ph-duotone ph-instagram-logo icon-light" aria-hidden="true"></i>
                    <i className="ph-duotone ph-instagram-logo icon-dark" aria-hidden="true"></i>
                    <span className="sr-only">Instagram Profile</span>
                </a>
                <a href="https://www.facebook.com/darkHeavan" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="View Udith Babu K N's Facebook Profile">
                    <i className="ph-duotone ph-facebook-logo icon-light" aria-hidden="true"></i>
                    <i className="ph-duotone ph-facebook-logo icon-dark" aria-hidden="true"></i>
                    <span className="sr-only">Facebook Profile</span>
                </a>
                <a href="https://x.com/dark_heavan7" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="View Udith Babu K N's X (Twitter) Profile">
                    <i className="ph-duotone ph-x-logo icon-light" aria-hidden="true"></i>
                    <i className="ph-duotone ph-x-logo icon-dark" aria-hidden="true"></i>
                    <span className="sr-only">X Profile</span>
                </a>
                <a href="https://medium.com/@udithbabuvarrier10" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Read Udith Babu K N's Medium Blog">
                    <i className="ph-duotone ph-medium-logo icon-light" aria-hidden="true"></i>
                    <i className="ph-duotone ph-medium-logo icon-dark" aria-hidden="true"></i>
                    <span className="sr-only">Medium Blog</span>
                </a>
                <a href="https://br.pinterest.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="View Udith Babu K N's Pinterest Profile">
                    <i className="ph-duotone ph-pinterest-logo icon-light" aria-hidden="true"></i>
                    <i className="ph-duotone ph-pinterest-logo icon-dark" aria-hidden="true"></i>
                    <span className="sr-only">Pinterest Profile</span>
                </a>
                <a href="https://www.pexels.com/@udith-babu-k-n-288919024" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="View Udith Babu K N's Pexels Profile">
                    <i className="ph-duotone ph-camera icon-light" aria-hidden="true"></i>
                    <i className="ph-duotone ph-camera icon-dark" aria-hidden="true"></i>
                    <span className="sr-only">Pexels Profile</span>
                </a>
            </div>

            <nav className="main-nav" aria-label="Main Navigation">
                <ul className="nav-list">
                    {Object.keys(SECTIONS).map(key => (
                        <li className="nav-item" key={key}>
                            <a 
                                href={`#${key}`} 
                                className={`nav-link ${activeSection === key ? 'active' : ''}`} 
                                aria-current={activeSection === key ? 'page' : undefined}
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.history.pushState(null, '', `#${key}`);
                                    setActiveSection(key);
                                }}
                            >
                                <i className={`ph-duotone ph-${getIconForSection(key)}`} aria-hidden="true"></i>
                                {capitalize(key)}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
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
        contact: 'envelope-simple'
    };
    return map[key] || 'circle';
}

function capitalize(s) {
    if (s === 'contact') return 'Contact Me';
    return s.charAt(0).toUpperCase() + s.slice(1);
}
