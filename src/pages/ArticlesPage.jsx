import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import { blogPosts } from '../data/blogPostsData';

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleArticleCount, setVisibleArticleCount] = useState(6);

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["CollectionPage", "Blog"],
        "@id": "https://udithbabukn.github.io/blog",
        "url": "https://udithbabukn.github.io/blog",
        "name": "Blog & Strategy Notes | Udith Babu K N",
        "description": "Strategic frameworks, algorithmic SEO architectures, and empirical growth deep dives on commercial revenue systems by Udith Babu K N.",
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
              "name": "Blog",
              "item": "https://udithbabukn.github.io/blog"
            }
          ]
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Blog | Notes &amp; Frameworks | Udith Babu K N</title>
        <meta 
          name="description" 
          content="Strategic frameworks, AI search architectures, and empirical growth deep dives by Udith Babu K N." 
        />
        <link rel="canonical" href="https://udithbabukn.github.io/blog" />
        <meta property="og:title" content="Blog | Notes &amp; Frameworks | Udith Babu K N" />
        <meta property="og:description" content="Strategic frameworks, AI search architectures, and empirical growth deep dives on commercial revenue systems." />
        <meta property="og:url" content="https://udithbabukn.github.io/blog" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* ARTICLES SECTION */}
      <section id="blog" className="sk-articles-section" style={{ paddingTop: '28px', borderBottom: 'var(--sk-border-hairline)', paddingBottom: '70px' }}>
        <div className="sk-container">
          <Breadcrumbs 
            items={[
              { label: 'Home', path: '/' },
              { label: 'Blog', path: '/blog' }
            ]} 
          />

          <div style={{ marginBottom: '24px', position: 'relative', zIndex: 2 }}>
            <h1 className="sk-section-heading">Blog &amp; Frameworks</h1>
            <p className="sk-page-subtitle" style={{ fontSize: '1.05rem', color: '#000000', fontWeight: '600', marginTop: '8px' }}>
              Strategic frameworks, algorithmic search architectures, and empirical revenue systems.
            </p>
          </div>

          {/* Quick Search & Category Filter Bar */}
          <div style={{ marginBottom: '20px', maxWidth: '440px', position: 'relative' }}>
            <i className="ph ph-magnifying-glass" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--sk-ink-muted)', fontSize: '1.05rem' }}></i>
            <input
              type="text"
              placeholder="Search by topic, framework, or keyword..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleArticleCount(6);
              }}
              style={{
                width: '100%',
                padding: '10px 16px 10px 42px',
                borderRadius: '24px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '0.92rem',
                fontFamily: 'var(--sk-font-sans)',
                outline: 'none',
                color: 'var(--sk-ink)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            />
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
              .filter(post => {
                const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
                const matchesSearch = !searchQuery || 
                  post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCat && matchesSearch;
              })
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
            const filteredTotal = blogPosts.filter(post => {
              const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
              const matchesSearch = !searchQuery || 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesCat && matchesSearch;
            }).length;
            const hasMore = filteredTotal > visibleArticleCount;
            return (
              <div className="sk-articles-load-more-wrap">
                {hasMore && (
                  <button 
                    className="sk-action-pill" 
                    onClick={() => setVisibleArticleCount(prev => prev + 6)}
                  >
                    Load More Articles ({filteredTotal - visibleArticleCount} remaining) ↓
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
