import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import { blogPosts } from '../data/blogPostsData';

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleArticleCount, setVisibleArticleCount] = useState(6);

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://udithbabukn.github.io/articles",
        "url": "https://udithbabukn.github.io/articles",
        "name": "Notes & Articles | Udith Babu K N",
        "description": "Strategic frameworks and deep dives on sales excellence, modern search algorithms, and commercial growth.",
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
              "name": "Articles",
              "item": "https://udithbabukn.github.io/articles"
            }
          ]
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Articles | Notes &amp; Articles | Udith Babu K N</title>
        <meta 
          name="description" 
          content="Strategic frameworks and deep dives on sales excellence, modern search algorithms, and commercial growth by Udith Babu K N." 
        />
        <link rel="canonical" href="https://udithbabukn.github.io/articles" />
        <meta property="og:title" content="Articles | Notes &amp; Articles | Udith Babu K N" />
        <meta property="og:description" content="Strategic frameworks and deep dives on sales excellence, modern search algorithms, and commercial growth." />
        <meta property="og:url" content="https://udithbabukn.github.io/articles" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* ARTICLES SECTION */}
      <section id="articles" className="sk-articles-section" style={{ paddingTop: '28px', borderBottom: 'var(--sk-border-hairline)', paddingBottom: '70px' }}>
        <div className="sk-container">
          <Breadcrumbs 
            items={[
              { label: 'Home', path: '/' },
              { label: 'Articles', path: '/articles' }
            ]} 
          />

          <div style={{ marginBottom: '28px' }}>
            <h1 className="sk-section-heading">Notes &amp; Articles</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--sk-ink-muted)', marginTop: '8px' }}>
              Strategic frameworks and deep dives on sales excellence, modern search algorithms, and commercial growth.
            </p>
          </div>

          {/* Interactive Category Filter Bar */}
          <div className="sk-articles-filter-bar">
            {['All', 'Sales Excellence', 'Growth & Analytics', 'Playbook', 'Foundations'].map(cat => (
              <button
                key={cat}
                type="button"
                className={`sk-filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleArticleCount(6);
                }}
              >
                {cat === 'All' ? `All (${blogPosts.length})` : cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="sk-articles-grid">
            {blogPosts
              .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
              .slice(0, visibleArticleCount)
              .map((post) => (
                <a href={`/blog/${post.slug}.html`} className="sk-article-card" key={post.slug}>
                  <div className="sk-article-img-container">
                    <img src={`/images/blogimages/${post.image}`} alt={post.title} className="sk-article-img" loading="lazy" />
                  </div>
                  <div className="sk-article-body">
                    <div>
                      <span className="sk-project-tag-pill">{post.category}</span>
                      <h2 className="sk-article-title" style={{ marginTop: '12px' }}>{post.title}</h2>
                      <p className="sk-article-excerpt" style={{ marginTop: '8px' }}>{post.excerpt}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', fontWeight: '800', borderTop: 'var(--sk-border-hairline)', paddingTop: '12px', marginTop: '16px', color: 'var(--sk-ink-muted)' }}>
                      <span>Udith Babu K N</span>
                      <span><i className="ph ph-clock" style={{ marginRight: '4px' }}></i>{post.readTime}</span>
                    </div>
                  </div>
                </a>
              ))}
          </div>

          {/* Load More / Expand Bar */}
          {(() => {
            const totalForCategory = blogPosts.filter(p => selectedCategory === 'All' || p.category === selectedCategory).length;
            const hasMore = totalForCategory > visibleArticleCount;
            return (
              <div className="sk-articles-load-more-wrap">
                {hasMore && (
                  <button 
                    className="sk-action-pill" 
                    onClick={() => setVisibleArticleCount(prev => prev + 6)}
                  >
                    Load More Articles ({totalForCategory - visibleArticleCount} remaining) ↓
                  </button>
                )}
                {visibleArticleCount > 6 && (
                  <button 
                    className="sk-action-pill" 
                    onClick={() => setVisibleArticleCount(6)}
                    style={{ marginLeft: hasMore ? '14px' : '0' }}
                  >
                    Show Less ↑
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      </section>
    </>
  );
}
