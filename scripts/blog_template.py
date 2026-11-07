import json

def render_blog_html(post):
    slug = post['slug']
    title = post['title']
    description = post['description']
    keywords = post.get('keywords', f"{title}, best marketing person in the world, growth architect, Udith Babu K N")
    category = post.get('category', 'Growth & Analytics')
    read_time = post.get('read_time', '5 min read')
    image = post.get('image', f"{slug}.webp")
    date_published = post.get('date_published', '2026-11-07')
    date_modified = post.get('date_modified', '2026-11-07')
    content_html = post['content_html']
    faq_list = post.get('faq_list', [])
    related_links = post.get('related_links', [])

    # Breadcrumb schema
    breadcrumb_schema = {
        "@context": "https://schema.org",
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
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": title,
                "item": f"https://udithbabukn.github.io/blog/{slug}.html"
            }
        ]
    }

    # BlogPosting schema
    blog_schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": f"https://udithbabukn.github.io/blog/{slug}.html"
        },
        "headline": title,
        "description": description,
        "image": f"https://udithbabukn.github.io/images/blogimages/{image}",
        "author": {
            "@type": "Person",
            "name": "Udith Babu K N",
            "jobTitle": "Executive – Marketing & Sales | IT Business Analyst",
            "url": "https://udithbabukn.github.io/",
            "sameAs": [
                "https://www.linkedin.com/in/udith-babu-k-n",
                "https://x.com/dark_heavan7",
                "https://medium.com/@udithbabuvarrier10"
            ]
        },
        "publisher": {
            "@type": "Organization",
            "name": "Udith Babu K N",
            "logo": {
                "@type": "ImageObject",
                "url": "https://udithbabukn.github.io/picofme.webp"
            }
        },
        "datePublished": date_published,
        "dateModified": date_modified
    }

    # FAQ schema
    faq_schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": item["question"],
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item["answer"]
                }
            } for item in faq_list
        ]
    }

    # Build Related Articles HTML
    related_markup = ""
    if related_links:
        related_markup = '<div class="sk-related-posts" style="margin-top: 40px; padding: 24px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px;">'
        related_markup += '<h3 style="margin-top:0; font-size:1.25rem; font-weight:700; color:#0F172A;">Recommended Analysis & Strategy Readings</h3><ul style="margin-bottom:0; padding-left:20px;">'
        for link in related_links:
            related_markup += f'<li><a href="{link["slug"]}.html" style="color:#0284C7; font-weight:600;">{link["title"]}</a></li>'
        related_markup += '</ul></div>'

    # Build visible FAQ accordion/section HTML
    faq_markup = ""
    if faq_list:
        faq_markup = '<section class="sk-faq-section" style="margin-top: 48px; border-top: 2px solid #E2E8F0; padding-top: 32px;">'
        faq_markup += '<h2 style="font-size: 1.8rem; font-weight: 800; color: #0F172A; margin-bottom: 24px;">Frequently Asked Questions (AEO Direct Answers)</h2>'
        for item in faq_list:
            faq_markup += f'''
            <div class="sk-faq-item" style="margin-bottom: 20px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; padding: 20px;">
                <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 1.2rem; color: #0F172A; font-weight: 700;">{item["question"]}</h3>
                <p style="margin-bottom: 0; color: #334155; line-height: 1.7; font-size: 1.02rem;">{item["answer"]}</p>
            </div>
            '''
        faq_markup += '</section>'

    html = f'''<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#FAF8F3">
    <title>{title} | Udith Babu K N</title>

    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link rel="preconnect" href="https://unpkg.com">
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">

    <!-- Fonts -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Young+Serif&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Young+Serif&display=swap"></noscript>

    <!-- Phosphor Icons -->
    <script defer src="https://unpkg.com/@phosphor-icons/web"></script>

    <meta name="description" content="{description}">
    <meta name="keywords" content="{keywords}">
    <meta name="author" content="Udith Babu K N">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta property="og:title" content="{title} | Udith Babu K N">
    <meta property="og:description" content="{description}">
    <meta property="og:image" content="https://udithbabukn.github.io/images/blogimages/{image}">
    <meta property="og:url" content="https://udithbabukn.github.io/blog/{slug}.html">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Udith Babu K N">
    <meta property="article:published_time" content="{date_published}T08:00:00+05:30">
    <meta property="article:modified_time" content="{date_modified}T08:00:00+05:30">
    <meta property="article:author" content="Udith Babu K N">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@dark_heavan7">
    <meta name="twitter:creator" content="@dark_heavan7">
    <meta name="twitter:title" content="{title} | Udith Babu K N">
    <meta name="twitter:description" content="{description}">
    <meta name="twitter:image" content="https://udithbabukn.github.io/images/blogimages/{image}">
    <meta name="twitter:image:alt" content="{title}">
    <link rel="canonical" href="https://udithbabukn.github.io/blog/{slug}.html">
    <link rel="alternate" hreflang="x-default" href="https://udithbabukn.github.io/blog/{slug}.html">
    <link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../favicon-16x16.png">
    <link rel="manifest" href="../site.webmanifest">
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
{json.dumps(breadcrumb_schema, indent=2)}
    </script>
    <script type="application/ld+json">
{json.dumps(blog_schema, indent=2)}
    </script>
    <script type="application/ld+json">
{json.dumps(faq_schema, indent=2)}
    </script>

    <link rel="stylesheet" href="../style.css">
    <style>
      /* Absolute elimination of horizontal scrollbars everywhere */
      html, body, .sk-page-wrapper, .sk-article-page-main, .sk-article-card-sheet, .sk-article-prose {{
        overflow-x: hidden !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }}
      .sk-article-prose {{
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
      }}
      .sk-article-prose table {{
        width: 100%;
        border-collapse: collapse;
        margin: 28px 0;
        font-size: 0.94rem;
        table-layout: auto;
      }}
      .sk-article-prose th, .sk-article-prose td {{
        border: 1px solid #CBD5E1;
        padding: 12px 14px;
        text-align: left;
        word-break: normal;
      }}
      .sk-article-prose th {{
        background: #0F172A;
        color: #F8FAFC;
        font-weight: 700;
      }}
      .sk-article-prose tr:nth-child(even) {{
        background: #F8FAFC;
      }}
      .sk-highlight-box {{
        background: #F0FDF4;
        border-left: 4px solid #16A34A;
        padding: 18px 22px;
        margin: 24px 0;
        border-radius: 0 6px 6px 0;
      }}
      .sk-highlight-box p {{
        margin-bottom: 0 !important;
        color: #14532D !important;
        font-weight: 600 !important;
      }}
      .sk-aeo-direct-answer {{
        background: #EFF6FF;
        border-left: 4px solid #2563EB;
        padding: 20px 24px;
        margin: 28px 0;
        border-radius: 0 8px 8px 0;
      }}
      .sk-aeo-direct-answer h3 {{
        margin-top: 0;
        font-size: 1.15rem;
        color: #1E3A8A;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }}
      .sk-aeo-direct-answer p {{
        margin-bottom: 0 !important;
        color: #1E293B !important;
        font-size: 1.05rem !important;
        line-height: 1.75 !important;
      }}

      /* Modern Code Block with Copy Button and Zero Horizontal Scroll */
      .sk-code-wrapper {{
        margin: 32px 0;
        border-radius: 8px;
        overflow: hidden !important;
        border: 1px solid #1E293B;
        background: #0F172A;
        box-shadow: 0 4px 20px rgba(15, 23, 42, 0.2);
        max-width: 100% !important;
      }}
      .sk-code-header {{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #1E293B;
        padding: 10px 18px;
        border-bottom: 1px solid #334155;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.78rem;
        color: #94A3B8;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }}
      .sk-copy-btn {{
        background: #0F172A;
        color: #F8FAFC;
        border: 1px solid #475569;
        border-radius: 4px;
        padding: 6px 12px;
        font-size: 0.78rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s ease;
      }}
      .sk-copy-btn:hover {{
        background: #0284C7;
        border-color: #38BDF8;
        color: #FFFFFF;
      }}
      pre {{
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        border: none !important;
        overflow: hidden !important;
        overflow-x: hidden !important;
        overflow-y: hidden !important;
        white-space: pre-wrap !important;
        word-break: break-word !important;
        overflow-wrap: anywhere !important;
        max-width: 100% !important;
      }}
      pre code {{
        white-space: pre-wrap !important;
        word-break: break-word !important;
        overflow-wrap: anywhere !important;
        overflow-x: hidden !important;
        overflow-y: hidden !important;
        display: block;
        padding: 18px 20px;
        color: #38BDF8;
        background: #0F172A;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.88rem;
        line-height: 1.7;
        max-width: 100% !important;
      }}
      /* Inline code styling */
      p code, li code, td code {{
        display: inline;
        padding: 2px 6px;
        background: #F1F5F9;
        color: #0F172A;
        border-radius: 4px;
        font-size: 0.88em;
        border: 1px solid #E2E8F0;
        font-family: 'JetBrains Mono', monospace;
      }}
      /* Suppress any scrollbars */
      pre::-webkit-scrollbar, pre code::-webkit-scrollbar, .sk-code-wrapper::-webkit-scrollbar {{
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }}
    </style>
</head>
<body>
<div class="sk-page-wrapper">
  
  <!-- Executive Sticky Header matching Home Page -->
  <header class="sk-header">
    <div class="sk-container sk-header-inner">
      <nav aria-label="Primary Navigation">
        <ul class="sk-nav-pills">
          <li><a href="../work" class="sk-nav-pill-btn pill-work">Work</a></li>
          <li><a href="../about" class="sk-nav-pill-btn pill-about">About</a></li>
          <li><a href="../skills" class="sk-nav-pill-btn pill-skills">Skills</a></li>
          <li><a href="../blog" class="sk-nav-pill-btn pill-blog pill-articles active">Blog</a></li>
          <li><a href="../contact" class="sk-nav-pill-btn pill-contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Reading Stage Canvas -->
  <main class="sk-article-page-main" id="main-content">
    <div class="sk-container" style="max-width: 960px;">
      
      <!-- Top Breadcrumbs & Back Navigation -->
      <div class="sk-article-top-nav">
        <a href="../blog" class="sk-back-pill">
          <i class="ph-bold ph-arrow-left"></i> Back to Blog
        </a>
        <nav aria-label="breadcrumb" class="sk-breadcrumb-nav">
          <a href="../">Home</a>
          <span class="sk-breadcrumb-sep">/</span>
          <a href="../blog">Blog</a>
          <span class="sk-breadcrumb-sep">/</span>
          <span class="sk-breadcrumb-current">{title}</span>
        </nav>
      </div>

      <!-- Main Desk Reading Paper Card Sheet -->
      <article class="sk-article-card-sheet">
        <div class="sk-pushpin sk-pushpin-blue"></div>
        
        <!-- Article Header -->
        <header class="sk-article-post-header">
          <div class="sk-article-tag-row">
            <span class="sk-project-tag-pill">{category}</span>
            <span class="sk-article-read-time"><i class="ph-duotone ph-clock"></i> {read_time}</span>
          </div>

          <h1 class="sk-article-main-title">{title}</h1>

          <!-- Author Byline Bar -->
          <div class="sk-article-byline">
            <div class="sk-byline-profile">
              <img src="../picofme.webp" alt="Udith Babu K N" class="sk-byline-avatar" width="48" height="48">
              <div>
                <div class="sk-byline-name">Udith Babu K N</div>
                <div class="sk-byline-role">Marketing &amp; Sales Executive • IT Business Analyst</div>
              </div>
            </div>
            <div class="sk-byline-socials" aria-label="Author Social Profiles">
              <a href="https://www.linkedin.com/in/udith-babu-k-n" target="_blank" rel="noopener noreferrer" class="sk-byline-icon social-linkedin" title="LinkedIn"><i class="ph-duotone ph-linkedin-logo"></i></a>
              <a href="https://x.com/dark_heavan7" target="_blank" rel="noopener noreferrer" class="sk-byline-icon social-x" title="X (Twitter)"><i class="ph-duotone ph-x-logo"></i></a>
              <a href="https://medium.com/@udithbabuvarrier10" target="_blank" rel="noopener noreferrer" class="sk-byline-icon social-medium" title="Medium"><i class="ph-duotone ph-medium-logo"></i></a>
              <a href="https://www.facebook.com/darkHeavan" target="_blank" rel="noopener noreferrer" class="sk-byline-icon social-facebook" title="Facebook"><i class="ph-duotone ph-facebook-logo"></i></a>
              <a href="https://www.instagram.com/udith_babu_k_n" target="_blank" rel="noopener noreferrer" class="sk-byline-icon social-instagram" title="Instagram"><i class="ph-duotone ph-instagram-logo"></i></a>
            </div>
          </div>

          <!-- Featured Cover Image Frame -->
          <div class="sk-article-cover-frame">
            <img src="../images/blogimages/{image}" alt="{title}" class="sk-article-cover-img" loading="eager" width="900" height="472">
          </div>
        </header>

        <!-- Article Rich Content Body -->
        <div class="sk-article-prose">
{content_html}

{faq_markup}

{related_markup}
        </div>

        <!-- End of Article Memo / CTA Box -->
        <div class="sk-article-footer-cta">
          <div class="sk-pushpin sk-pushpin-yellow"></div>
          <div class="sk-cta-content">
            <h3 class="sk-cta-title">Looking to scale organic growth or optimize operational workflows?</h3>
            <p class="sk-cta-text">
              I specialize in technical SEO, algorithmic growth architecture, Generative Engine Optimization (GEO), and data-driven market expansion. Let's discuss high-impact opportunities.
            </p>
          </div>
          <div class="sk-cta-actions">
            <a href="../contact" class="sk-action-pill" style="background: var(--sk-yellow);">Drop a note at Udith's desk →</a>
            <a href="../articles" class="sk-action-pill" style="background: #FFFFFF;">Browse More Notes &amp; Articles</a>
          </div>
        </div>

      </article>

    </div>
  </main>

  <!-- Shelby Portfolio Footer -->
  <footer class="sk-footer">
    <div class="sk-container">
      <div class="sk-footer-bar">
        <div>
          © 2026 Udith Babu K N • Marketing &amp; Sales Executive | IT Business Analyst
        </div>
        <div class="sk-footer-links">
          <a href="../" class="sk-footer-link">Home</a>
          <a href="../work" class="sk-footer-link">Work</a>
          <a href="../about" class="sk-footer-link">About</a>
          <a href="../skills" class="sk-footer-link">Skills</a>
          <a href="../blog" class="sk-footer-link">Blog</a>
          <a href="../contact" class="sk-footer-link">Contact</a>
          <a href="#" class="sk-footer-link">Back to top ↑</a>
        </div>
      </div>
    </div>
  </footer>

</div>

<!-- Client-side Interactive Code Enhancer with Copy Button -->
<script>
document.addEventListener('DOMContentLoaded', function() {{
  function bindCopy(btn, codeBlock) {{
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', function() {{
      var cleanCode = codeBlock.innerText || codeBlock.textContent;
      navigator.clipboard.writeText(cleanCode).then(function() {{
        var originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="ph-bold ph-check" style="margin-right:4px;"></i>Copied!';
        btn.style.background = '#16A34A';
        btn.style.borderColor = '#22C55E';
        btn.style.color = '#FFFFFF';
        setTimeout(function() {{
          btn.innerHTML = originalHtml;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
        }}, 2000);
      }}).catch(function(err) {{
        console.error('Clipboard copy failed:', err);
      }});
    }});
  }}

  // 1. Wrap any unwrapped pre code blocks
  document.querySelectorAll('.sk-article-prose pre code').forEach(function(codeBlock) {{
    var pre = codeBlock.parentElement;
    if (pre.parentElement && pre.parentElement.classList.contains('sk-code-wrapper')) {{
      var existingBtn = pre.parentElement.querySelector('.sk-copy-btn');
      if (existingBtn) bindCopy(existingBtn, codeBlock);
      return;
    }}

    var text = codeBlock.textContent || '';
    var lang = 'CODE';
    if (text.includes('SELECT') && text.includes('FROM')) lang = 'SQL / BIGQUERY';
    else if (text.includes('def ') || text.includes('import ')) lang = 'PYTHON';
    else if (text.includes('@context') || text.indexOf('{{') !== -1) lang = 'JSON-LD SCHEMA';

    var wrapper = document.createElement('div');
    wrapper.className = 'sk-code-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);

    var header = document.createElement('div');
    header.className = 'sk-code-header';
    header.innerHTML = '<span>' + lang + '</span><button class="sk-copy-btn" type="button"><i class="ph-duotone ph-copy" style="margin-right:4px;"></i>Copy Code</button>';

    wrapper.appendChild(header);
    wrapper.appendChild(pre);

    var btn = header.querySelector('.sk-copy-btn');
    bindCopy(btn, codeBlock);
  }});

  // 2. Also bind any pre-existing static wrappers
  document.querySelectorAll('.sk-code-wrapper').forEach(function(wrapper) {{
    var btn = wrapper.querySelector('.sk-copy-btn');
    var code = wrapper.querySelector('code');
    if (btn && code) bindCopy(btn, code);
  }});
}});
</script>

</body>
</html>
'''
    return html
