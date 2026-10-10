export default function MobileHeader() {
    return (
        <header className="mobile-header">
            <div className="profile-header">
                <img src="/picofme.webp" alt="Profile picture of Udith Babu K N" className="profile-pic" width="48" height="48" fetchPriority="high" decoding="async" />
                <div className="logo-group">
                    <div className="logo">Udith Babu K N</div>
                    <span className="logo-subtitle">Executive & Analyst</span>
                </div>
            </div>
        </header>
    );
}
