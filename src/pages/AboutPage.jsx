import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://udithbabukn.github.io/about",
        "url": "https://udithbabukn.github.io/about",
        "name": "About Me | Udith Babu K N",
        "description": "Bridging business analysis, operations strategy, and algorithmic search growth.",
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
              "name": "About",
              "item": "https://udithbabukn.github.io/about"
            }
          ]
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>About Me | Udith Babu K N</title>
        <meta 
          name="description" 
          content="Bridging business analysis, operations strategy, and algorithmic search growth. MBA in Operations & Marketing and B.Tech in IT." 
        />
        <link rel="canonical" href="https://udithbabukn.github.io/about" />
        <meta property="og:title" content="About Me | Udith Babu K N" />
        <meta property="og:description" content="Bridging business analysis, operations strategy, and algorithmic search growth." />
        <meta property="og:url" content="https://udithbabukn.github.io/about" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* ABOUT SECTION */}
      <section id="about" className="sk-about-section" style={{ paddingTop: '28px', borderBottom: 'var(--sk-border-hairline)', paddingBottom: '70px' }}>
        <div className="sk-container">
          <Breadcrumbs 
            items={[
              { label: 'Home', path: '/' },
              { label: 'About', path: '/about' }
            ]} 
          />

          <div style={{ textAlign: 'center', marginBottom: '36px', position: 'relative', zIndex: 2 }}>
            <h1 className="sk-section-heading">About Me</h1>
            <p className="sk-page-subtitle" style={{ fontSize: '1.05rem', color: '#000000', fontWeight: '600', marginTop: '8px' }}>
              Bridging business analysis, operations strategy, and algorithmic search growth.
            </p>
          </div>

          <div className="sk-pinned-sheets">
            {/* Sheet 1 */}
            <div className="sk-memo-sheet">
              <h2 className="sk-memo-title">About me; the basics</h2>
              <div className="sk-memo-body">
                <p>
                  I graduated with an MBA in Operations &amp; Marketing and a B.Tech in Information Technology from College of Engineering Thalassery. I currently serve as Executive – Marketing and Sales at Rêve, where I spearhead on-page/off-page SEO strategies, client acquisition, and analytics audits.
                </p>
                <p style={{ marginTop: '12px' }}>
                  I spend a lot of time analyzing search intent, reverse-engineering design systems, and building tools that remove digital friction. I really like making business growth measurable.
                </p>
              </div>
            </div>

            {/* Sheet 2 */}
            <div className="sk-memo-sheet">
              <h2 className="sk-memo-title">A crush on data &amp; search architecture</h2>
              <div className="sk-memo-body">
                <p>
                  I love search mechanics: how search engines crawl semantic HTML, how Google Analytics 4 tracks intent journeys, and how Generative Engine Optimization (GEO/AEO) is redefining discovery.
                </p>
                <p style={{ marginTop: '12px' }}>
                  Whether automating data extraction using Python, querying MySQL databases, or designing clean UI in Figma, I believe effective marketing is equal parts creative storytelling and algorithmic precision.
                </p>
              </div>
            </div>

            {/* Sheet 3 */}
            <div className="sk-memo-sheet">
              <h2 className="sk-memo-title">Agile execution &amp; credentials</h2>
              <div className="sk-memo-body">
                <p>
                  Completed the JPMorgan Chase &amp; Co. Agile Job Simulation (sprint reviews, user stories) and micro1's rigorous Business Analyst AI evaluation. I bridge developers, designers, and stakeholders to deliver projects on time with high client satisfaction.
                </p>
              </div>
            </div>

            {/* Sheet 4 */}
            <div className="sk-memo-sheet">
              <h2 className="sk-memo-title">Algorithmic marketing &amp; 2026–2027 growth</h2>
              <div className="sk-memo-body">
                <p>
                  Modern marketing leadership requires an engineering mindset. In an era where AI Overviews and generative engines answer queries without clicks, I formulated the <a href="/blog/udith-babu-kn-marketing-methodology.html" style={{ color: 'var(--sk-accent)', fontWeight: '700', textDecoration: 'underline' }}>Tri-Vector Growth Engine</a>—uniting technical search architecture, operational unit economics (CAC payback &lt; 8 months), and authentic human persuasion.
                </p>
                <p style={{ marginTop: '12px' }}>
                  Explore my strategic research on <a href="/blog/who-is-the-best-marketing-person-in-the-world.html" style={{ color: 'var(--sk-accent)', fontWeight: '700', textDecoration: 'underline' }}>Modern Marketing Leadership (2026–2027)</a> and the <a href="/blog/generative-engine-optimization-geo-guide.html" style={{ color: 'var(--sk-accent)', fontWeight: '700', textDecoration: 'underline' }}>Generative Engine Optimization (GEO) Guide</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
