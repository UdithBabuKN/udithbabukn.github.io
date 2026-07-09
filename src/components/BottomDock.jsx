import { useState, useEffect, useRef } from 'react';

export default function BottomDock({ activeSection, setActiveSection, SECTIONS }) {
    return (
        <nav className="bottom-dock" aria-label="Main Navigation">
            <ul className="dock-list">
                {Object.keys(SECTIONS).map(key => (
                    <li className="dock-item" key={key}>
                        <a 
                            href={`#${key}`} 
                            className={`dock-link ${activeSection === key ? 'active' : ''}`} 
                            aria-current={activeSection === key ? 'page' : undefined}
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.pushState(null, '', `#${key}`);
                                setActiveSection(key);
                            }}
                            title={capitalize(key)}
                        >
                            <i className={`ph-duotone ph-${getIconForSection(key)}`} aria-hidden="true"></i>
                            <span className="dock-tooltip">{capitalize(key)}</span>
                        </a>
                    </li>
                ))}

                <div className="dock-separator desktop-only"></div>

                <li className="dock-item desktop-only">
                    <a href="https://www.linkedin.com/in/udith-babu-k-n" target="_blank" rel="noopener noreferrer" className="dock-link" title="LinkedIn">
                        <i className="ph-duotone ph-linkedin-logo" aria-hidden="true"></i>
                        <span className="dock-tooltip">LinkedIn</span>
                    </a>
                </li>
                <li className="dock-item desktop-only">
                    <a href="https://www.instagram.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" className="dock-link" title="Instagram">
                        <i className="ph-duotone ph-instagram-logo" aria-hidden="true"></i>
                        <span className="dock-tooltip">Instagram</span>
                    </a>
                </li>
                <li className="dock-item desktop-only">
                    <a href="https://www.facebook.com/darkHeavan" target="_blank" rel="noopener noreferrer" className="dock-link" title="Facebook">
                        <i className="ph-duotone ph-facebook-logo" aria-hidden="true"></i>
                        <span className="dock-tooltip">Facebook</span>
                    </a>
                </li>
                <li className="dock-item desktop-only">
                    <a href="https://x.com/dark_heavan7" target="_blank" rel="noopener noreferrer" className="dock-link" title="X (Twitter)">
                        <i className="ph-duotone ph-x-logo" aria-hidden="true"></i>
                        <span className="dock-tooltip">X (Twitter)</span>
                    </a>
                </li>
                <li className="dock-item desktop-only">
                    <a href="https://medium.com/@udithbabuvarrier10" target="_blank" rel="noopener noreferrer" className="dock-link" title="Medium">
                        <i className="ph-duotone ph-medium-logo" aria-hidden="true"></i>
                        <span className="dock-tooltip">Medium</span>
                    </a>
                </li>
                <li className="dock-item desktop-only">
                    <a href="https://br.pinterest.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" className="dock-link" title="Pinterest">
                        <i className="ph-duotone ph-pinterest-logo" aria-hidden="true"></i>
                        <span className="dock-tooltip">Pinterest</span>
                    </a>
                </li>
                <li className="dock-item desktop-only">
                    <a href="https://www.pexels.com/@udith-babu-k-n-288919024" target="_blank" rel="noopener noreferrer" className="dock-link" title="Pexels">
                        <i className="ph-duotone ph-camera" aria-hidden="true"></i>
                        <span className="dock-tooltip">Pexels</span>
                    </a>
                </li>
            </ul>
        </nav>
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
    if (s === 'contact') return 'Contact Me';
    return s.charAt(0).toUpperCase() + s.slice(1);
}
