import React from 'react';
import { toggleTheme } from '../utils/theme';

export default function MobileHeader() {
    return (
        <header className="mobile-header">
            <div className="profile-header">
                <img src="/picofme.webp" alt="Profile picture of Udith Babu K N" className="profile-pic" width="50" height="50" fetchpriority="high" decoding="async" />
                <div className="logo">Udith Babu K N</div>
            </div>
            <div className="mobile-header-actions">
                <div className="social-links">
                    <a href="https://www.linkedin.com/in/udith-babu-k-n" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn Profile"><i className="ph-duotone ph-linkedin-logo" aria-hidden="true"></i></a>
                    <a href="https://www.instagram.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram Profile"><i className="ph-duotone ph-instagram-logo" aria-hidden="true"></i></a>
                    <a href="https://www.facebook.com/darkHeavan" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook Profile"><i className="ph-duotone ph-facebook-logo" aria-hidden="true"></i></a>
                    <a href="https://x.com/dark_heavan7" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X (Twitter) Profile"><i className="ph-duotone ph-x-logo" aria-hidden="true"></i></a>
                    <a href="https://medium.com/@udithbabuvarrier10" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Read Udith Babu K N's Medium Blog"><i className="ph-duotone ph-medium-logo" aria-hidden="true"></i></a>
                    <a href="https://br.pinterest.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="View Udith Babu K N's Pinterest Profile"><i className="ph-duotone ph-pinterest-logo" aria-hidden="true"></i></a>
                    <a href="https://www.pexels.com/@udith-babu-k-n-288919024" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Pexels Profile"><i className="ph-duotone ph-camera" aria-hidden="true"></i></a>
                </div>
                <button className="theme-toggle" id="mobileThemeToggle" aria-label="Toggle color theme" aria-pressed="false" onClick={toggleTheme}>
                    <i className="ph-duotone ph-moon"></i>
                </button>
            </div>
        </header>
    );
}
