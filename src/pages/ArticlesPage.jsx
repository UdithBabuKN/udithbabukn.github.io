import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import { blogPosts } from '../data/blogPostsData';
import Icon from '../components/Icons';

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
      <section id="blog" className="sk-articles-section" style={{ paddingTop: '28px', borderBottom: 'none', paddingBottom: '70px' }}>
        <div className="sk-container">
          <Breadcrumbs 
            items={[
              { label: 'Home', path: '/' },
              { label: 'Blog', path: '/blog' }
            ]} 
          />

          <div style={{ marginBottom: '24px', position: 'relative', zIndex: 2 }}>
            <h1 className="sk-section-heading">Blog &amp; Frameworks</h1>
            <p className="sk-page-subtitle" style={{ marginTop: '8px' }}>
              Strategic frameworks, algorithmic search architectures, and empirical revenue systems.
            </p>
          </div>

          {/* Quick Search & Category Filter Bar (WebMCP Declarative Tool) */}
          <form
            role="search"
            toolname="search_articles"
            tooldescription="Search Udith Babu's articles, frameworks, and playbooks by keyword, topic, or category"
            toolautosubmit="true"
            onSubmit={(e) => e.preventDefault()}
            style={{ marginBottom: '24px', maxWidth: '460px', position: 'relative' }}
          >
            <Icon name="search" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--sk-navy)', width: '18px', height: '18px' }} />
            <input
              type="search"
              name="query"
              aria-label="Search articles and frameworks"
              description="Keywords or topics to search for, e.g. GEO, AEO, CAC, RevOps"
              placeholder="Search by topic, framework, or keyword..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleArticleCount(6);
              }}
              style={{
                width: '100%',
                padding: '10px 18px 10px 44px',
                borderRadius: '9999px',
                border: '1.5px solid var(--sk-navy)',
                background: '#FFFFFF',
                fontSize: '0.88rem',
                fontFamily: 'var(--sk-font-mono)',
                outline: 'none',
                color: 'var(--sk-navy)',
                boxShadow: '2px 2px 0px var(--sk-navy)'
              }}
            />
          </form>

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
                <a href={`/blog/${post.slug}.html`} className="sk-article-card" key={post.slug} target="_self">
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
                      <span><Icon name="clock" size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />{post.readTime}</span>
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
