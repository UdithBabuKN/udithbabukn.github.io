import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ContactPage() {
  const [contactStatus, setContactStatus] = useState('idle');
  const [contactError, setContactError] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('loading');
    setContactError('');

    const form = e.target;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const resJson = await response.json();
      if (response.ok && resJson.success) {
        setContactStatus('success');
      } else {
        throw new Error(resJson.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setContactStatus('error');
      setContactError(err.message || 'Error occurred. Please reach out directly.');
    }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://udithbabukn.github.io/contact",
        "url": "https://udithbabukn.github.io/contact",
        "name": "Contact | Drop a note at Udith's desk",
        "description": "Have an open role, project proposal, or want to discuss growth marketing? Send a direct dispatch below.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://udithbabukn.github.io/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Contact",
              "item": "https://udithbabukn.github.io/contact"
            }
          ]
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Contact | Drop a note at Udith's desk</title>
        <meta 
          name="description" 
          content="Have an open role, project proposal, or want to discuss growth marketing? Drop a note at Udith's desk." 
        />
        <link rel="canonical" href="https://udithbabukn.github.io/contact" />
        <meta property="og:title" content="Contact | Drop a note at Udith's desk" />
        <meta property="og:description" content="Have an open role, project proposal, or want to discuss growth marketing? Send a direct dispatch below." />
        <meta property="og:url" content="https://udithbabukn.github.io/contact" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* CONTACT FORM */}
      <section id="contact" style={{ padding: '28px 0 70px', borderBottom: 'none' }}>
        <div className="sk-container" style={{ maxWidth: '780px' }}>
          <Breadcrumbs 
            items={[
              { label: 'Home', path: '/' },
              { label: 'Contact', path: '/contact' }
            ]} 
          />

          <div className="sk-contact-box" style={{ marginTop: '20px' }}>
            <h1 className="sk-section-heading" style={{ marginBottom: '12px', textAlign: 'center' }}>
              Drop a note at Udith's desk.
            </h1>
            <p className="sk-page-subtitle" style={{ textAlign: 'center', fontSize: '1.05rem', fontWeight: '600', marginBottom: '28px' }}>
              Have an open role, project proposal, or want to discuss growth marketing? Send a direct dispatch below.
            </p>

            {contactStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '1.1rem', fontWeight: '800', marginBottom: '14px', color: '#000000', background: 'var(--sk-yellow)', display: 'inline-block', padding: '4px 14px', borderRadius: '4px', border: '1.5px solid #000000' }}>
                  [ 🎯 DISPATCH RECORDED // RECEIVED ]
                </div>
                <h3 style={{ fontFamily: 'var(--sk-font-serif)', fontStyle: 'italic', fontSize: '2rem', color: '#000000' }}>
                  Message Received at Udith's desk!
                </h3>
                <p style={{ marginTop: '8px', color: '#334155' }}>
                  Thank you for reaching out. I'll get back to you shortly!
                </p>
                <button 
                  className="sk-action-pill" 
                  onClick={() => setContactStatus('idle')} 
                  style={{ marginTop: '20px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form 
                action="https://api.web3forms.com/submit" 
                method="POST" 
                onSubmit={handleContactSubmit}
                toolname="send_contact_message"
                tooldescription="Send a direct contact inquiry or collaboration message to Udith Babu K N"
                toolautosubmit="false"
              >
                <input type="hidden" name="access_key" value="87c7f836-6a95-44f3-8391-314433633006" />
                <input type="hidden" name="subject" value="New Portfolio Dispatch (Shelby Desk Style)" />
                <input type="hidden" name="from_name" value="Udith's Desk" />
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: '800', marginBottom: '6px', textTransform: 'uppercase', color: '#000000' }}>
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      description="Sender's full name"
                      placeholder="e.g. Jane Doe" 
                      required 
                      className="sk-form-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: '800', marginBottom: '6px', textTransform: 'uppercase', color: '#000000' }}>
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      description="Sender's email address for direct reply"
                      placeholder="e.g. jane@company.com" 
                      required 
                      className="sk-form-input"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: '800', marginBottom: '6px', textTransform: 'uppercase', color: '#000000' }}>
                    Note or Opportunity
                  </label>
                  <textarea 
                    name="message" 
                    description="Message, inquiry, or partnership opportunity details"
                    rows="4" 
                    placeholder="Tell me what you have in mind..." 
                    required 
                    className="sk-form-textarea"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={contactStatus === 'loading'}
                  className="sk-submit-btn"
                >
                  {contactStatus === 'loading' ? 'Delivering to Desk...' : 'Send to Udith’s Desk'}
                </button>

                {contactStatus === 'error' && (
                  <p style={{ color: '#B91C1C', marginTop: '10px', fontSize: '0.85rem' }}>{contactError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
