const fs = require('fs');
const content = fs.readFileSync('src/data/contentComponents.jsx', 'utf8');
const lines = content.split('\n');

// Find the line where the second "export const Certifications" begins
let startIndex = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('export const Certifications = () => {')) {
        startIndex = i;
        break;
    }
}

if (startIndex !== -1) {
    const newContent = lines.slice(0, startIndex).join('\n') + `\nexport const Certifications = () => {
    return (
        <section id="certifications" className="section" lang="en">
            <h2 className="section-header">Certifications</h2>
            
                <section className="lazy-load" lang="en">
                    <div className="card-grid">
                        <article className="interactive-card" style={{ '--angle': '180deg' }}><h3 className="interactive-card-heading">JPMorgan Chase & Co. Agile Job Simulation</h3><div className="card-meta">Forage | July 2024</div><p className="card-description">Completed a simulation involving drafting user stories, running standups, and conducting sprint reviews, which increased team velocity by 20%.</p><div className="card-footer"><a href="https://drive.google.com/file/d/1H1VZzktMJv3bnaK4FfB7O6NTazp3L6CK/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="card-link">View Certificate <i className="ph-duotone ph-certificate"></i></a></div></article>
                        <article className="interactive-card" style={{ '--angle': '270deg' }}><h3 className="interactive-card-heading">micro1 Business Analyst Certification</h3><div className="card-meta">micro1 | May 2025</div><p className="card-description">Successfully passed micro1's AI Interview and evaluation process, earning a certification as a Business Analyst.</p><div className="card-footer"><a href="https://drive.google.com/file/d/11k8iMDoCFEd-BMV-rPB-I52-clnJZOyO/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="card-link">View Certificate <i className="ph-duotone ph-certificate"></i></a></div></article>
                    </div>
                </section>
        </section>
    );
};

export const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        
        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                setStatus('success');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
            setErrorMsg('An error occurred. Please try again or contact me directly.');
        }
    };

    return (
        <section id="contact" className="section" lang="en">
            <h2 className="section-header">Contact Me</h2>
            
            <article className="content-box lazy-load" lang="en">
                <p>Looking to drive IT projects to success? Connect to explore my expertise in Agile, business analysis, and product analysis.</p>
                
                {status === 'success' ? (
                    <div className="thank-you-message" aria-live="polite" style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Thank You!</h3>
                        <p style={{ marginBottom: '1.5rem' }}>Your message has been sent successfully. I'll get back to you soon!</p>
                        <button className="btn" aria-label="Send Another Message" onClick={() => setStatus('idle')}>Send Another Message</button>
                    </div>
                ) : (
                    <form className="contact-form" id="contactForm" action="https://formsubmit.co/udithbabuvarrier@gmail.com" method="POST" onSubmit={handleSubmit} aria-label="Contact Form" noValidate>
                        <input type="hidden" name="_subject" value="New portfolio contact submission" />
                        <input type="hidden" name="_captcha" value="false" />
                        
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Your Name</label>
                            <input type="text" id="name" name="name" className="form-control" placeholder="Enter your name" required aria-required="true" autoComplete="name" />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Your Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" required aria-required="true" autoComplete="email" />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="company" className="form-label">Company</label>
                            <input type="text" id="company" name="company" className="form-control" placeholder="Enter your company name" autoComplete="organization" />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea id="message" name="message" className="form-control" placeholder="Enter your message" required aria-required="true"></textarea>
                        </div>
                        
                        <button type="submit" className="btn" aria-label="Send Message" id="submitButton" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </button>
                        
                        {status === 'error' && (
                            <span className="error-message" id="formError" style={{ display: 'block', marginTop: '1rem', color: 'red' }} aria-live="polite">{errorMsg}</span>
                        )}
                    </form>
                )}
            </article>
        </section>
    );
};
`;
    fs.writeFileSync('src/data/contentComponents.jsx', newContent);
    console.log('Successfully fixed contentComponents.jsx');
} else {
    console.log('Could not find Certifications export');
}
