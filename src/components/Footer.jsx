import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [tosOpen, setTosOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="sk-footer">
        <div className="sk-container">
          <div className="sk-footer-bar">
            <div>
              © {new Date().getFullYear()} Udith Babu K N • Kerala, India
            </div>

            <div className="sk-footer-links">
              <Link to="/" className="sk-footer-link">Home</Link>
              <Link to="/work" className="sk-footer-link">Work</Link>
              <Link to="/about" className="sk-footer-link">About</Link>
              <Link to="/skills" className="sk-footer-link">Skills</Link>
              <Link to="/articles" className="sk-footer-link">Articles</Link>
              <Link to="/contact" className="sk-footer-link">Contact</Link>
              <button 
                type="button" 
                onClick={() => setTosOpen(true)} 
                className="sk-footer-link sk-footer-legal-tag"
              >
                Terms of Service
              </button>
              <button 
                type="button" 
                onClick={() => setPrivacyOpen(true)} 
                className="sk-footer-link sk-footer-legal-tag"
              >
                Privacy Policy
              </button>
              <a href="#top" onClick={scrollToTop} className="sk-footer-link">Back to top ↑</a>
            </div>
          </div>
        </div>
      </footer>

      {/* TERMS OF SERVICE MODAL */}
      {tosOpen && (
        <div className="sk-legal-modal-backdrop" onClick={() => setTosOpen(false)} role="dialog" aria-modal="true">
          <div className="sk-legal-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="sk-legal-modal-header">
              <h3 className="sk-legal-modal-title">Terms of Service</h3>
              <button type="button" onClick={() => setTosOpen(false)} className="sk-legal-close-btn" aria-label="Close Terms of Service">
                Close [ESC]
              </button>
            </div>
            <div className="sk-legal-modal-body">
              <h4>1. Introduction and Scope</h4>
              <p>
                Welcome to the official portfolio and case study archive of Udith Babu K N (<a href="https://udithbabukn.github.io/" target="_blank" rel="noopener noreferrer">udithbabukn.github.io</a>). By accessing or utilizing this website, you agree to comply with and be bound by the following terms and conditions.
              </p>

              <h4>2. Intellectual Property and Content Rights</h4>
              <p>
                All text, analytical frameworks, articles, source code samples, case study documentation, and layout designs presented on this website are the intellectual property of Udith Babu K N unless otherwise noted or attributed to third-party employers/clients (such as Rêve, Accelgrowth, or Cyber Sapient).
              </p>
              <p>
                You are permitted to review, quote with appropriate attribution, and link to materials for recruitment, professional evaluation, or academic reference. You may not republish complete articles or software artifacts for commercial profit without explicit prior written authorization.
              </p>

              <h4>3. Software Tools and Demos</h4>
              <p>
                Interactive tools and utilities linked herein (including Web Analyzer Pro, SEO Analytics Dashboard, and ImageForge) are provided on an "as is" and "as available" basis for demonstration and evaluation purposes. No warranty, express or implied, is provided regarding uninterrupted availability or suitability for specific production workloads.
              </p>

              <h4>4. External Third-Party Links</h4>
              <p>
                This portfolio provides direct outbound links to external platforms including GitHub, LinkedIn, Medium, and credential verification portals. Udith Babu K N is not responsible for the privacy practices, content, or availability of third-party domains.
              </p>

              <h4>5. Governing Law and Jurisdiction</h4>
              <p>
                These terms are governed by and construed in accordance with the laws of India, within the jurisdiction of the State of Kerala.
              </p>

              <h4>6. Inquiries and Contact</h4>
              <p>
                For questions regarding permitted use, project licensing, or commercial inquiries, contact: <a href="mailto:udithbabuvarrier@gmail.com">udithbabuvarrier@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PRIVACY POLICY MODAL */}
      {privacyOpen && (
        <div className="sk-legal-modal-backdrop" onClick={() => setPrivacyOpen(false)} role="dialog" aria-modal="true">
          <div className="sk-legal-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="sk-legal-modal-header">
              <h3 className="sk-legal-modal-title">Privacy Policy</h3>
              <button type="button" onClick={() => setPrivacyOpen(false)} className="sk-legal-close-btn" aria-label="Close Privacy Policy">
                Close [ESC]
              </button>
            </div>
            <div className="sk-legal-modal-body">
              <h4>1. Respect for User Privacy</h4>
              <p>
                This website is dedicated to maintaining high standards of data privacy and transparency. We do not operate advertising tracking networks, sell visitor records, or deploy third-party telemetry brokers.
              </p>

              <h4>2. Information Collected via Direct Dispatch</h4>
              <p>
                When you submit a message through the contact form, the information provided (your name, email address, and message content) is transmitted securely via Web3Forms API solely for the purpose of receiving and responding to your inquiry.
              </p>
              <p>
                Your contact details are never shared, rented, or distributed to third-party commercial marketing lists.
              </p>

              <h4>3. Cookies and Tracking Technologies</h4>
              <p>
                This website does not utilize invasive tracking cookies or commercial behavioral profilers. Local browser storage may be utilized strictly for functional preferences (such as reading state or UI navigation).
              </p>

              <h4>4. Client-Side Tools Data Handling</h4>
              <p>
                Utilities linked within this portfolio, such as ImageForge and Web Analyzer Pro, execute processing entirely client-side within your browser sandbox via HTML5 Canvas and DOM APIs. Your files and images are never uploaded or persisted to remote servers.
              </p>

              <h4>5. Data Subject Rights</h4>
              <p>
                If you have submitted personal contact information and wish to request its verification, correction, or deletion from correspondence archives, you may do so at any time by emailing <a href="mailto:udithbabuvarrier@gmail.com">udithbabuvarrier@gmail.com</a>.
              </p>

              <h4>6. Effective Date and Updates</h4>
              <p>
                This policy is effective as of 2026. Any updates reflecting regulatory or architectural changes will be posted directly to this colophon.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
