import os, glob, re, json

print("=== EXECUTING COMPREHENSIVE SEO FIXES ===")

# ==============================================================================
# 1. INJECT RECIPROCAL LINKS FOR THE 10 NEWEST FLAGSHIP PILLARS
# ==============================================================================
print("\n[1/5] Injecting reciprocal links to eliminate 0-inbound orphan states...")

reciprocal_mappings = {
    "cac-payback-velocity-b2b-economics.html": [
        ("b2b-cac-modeling-quantitative-playbook.html",
         "B2B Customer Acquisition Cost (CAC) Modeling: The Quantitative CFO Playbook",
         "Master B2B Customer Acquisition Cost (CAC) Modeling with mathematical formulas, capital payback curves, and board-level unit economic SQL architectures.")
    ],
    "ai-knowledge-graph-entity-seo.html": [
        ("llm-knowledge-graph-ingestion-mechanics.html",
         "LLM Knowledge Graph Ingestion: How Frontier AI Models Digest Enterprise Content",
         "Explore LLM knowledge graph ingestion mechanics. Learn how OpenAI o3, Gemini 2.5, and Claude 3.7 parse entity triples and index enterprise authority.")
    ],
    "the-death-of-third-party-attribution-survival-guide.html": [
        ("server-side-tracking-telemetry-architecture.html",
         "Server-Side Tracking Architecture: Zero-Loss Event Telemetry with Google Cloud & AWS",
         "Architect zero-loss server-side event tracking pipelines with Google Cloud Run, AWS Lambda, and BigQuery. Eliminate ad-blocker dropouts and Safari ITP decay."),
        ("algorithmic-multi-touch-attribution-shapley-python.html",
         "Algorithmic Multi-Touch Attribution: Implementing Shapley Value Models in Python",
         "Implement algorithmic multi-touch attribution using cooperative game theory and Shapley values in Python. Replace biased last-touch models with mathematical attribution.")
    ],
    "contrarian-category-design-principles.html": [
        ("category-creation-vs-capture-market-sizing.html",
         "Category Creation vs. Category Capture: The $100M Enterprise Market Sizing Formula",
         "Calculate TAM expansion and category dominance. The quantitative formula for shifting from expensive competitor capture to high-margin category creation.")
    ],
    "marketing-to-autonomous-ai-agents.html": [
        ("autonomous-sales-sdr-agents-engineering.html",
         "Autonomous Sales SDR Agents: Engineering LLM Workflows That Book Qualified Enterprise Demos",
         "Engineer autonomous AI SDR agent pipelines with stateful LangGraph workflows, multi-agent research tools, and verified outbound cadence orchestration.")
    ],
    "building-enterprise-organic-search-moats.html": [
        ("enterprise-topic-clusters-semantic-cannibalization.html",
         "Enterprise Topic Clusters & Semantic Cannibalization: The 500-Page Architecture Blueprint",
         "Eliminate semantic keyword cannibalization across massive 500+ page enterprise web hubs. Learn how to design orthogonal vector embeddings and internal pagerank flow.")
    ],
    "the-economics-of-growth-marketing-ltv-cac-velocity.html": [
        ("dynamic-b2b-pricing-engines-optimization.html",
         "Dynamic B2B Pricing Engines: Algorithmic Willingness-to-Pay and Contract Optimization",
         "Build dynamic B2B pricing algorithms and willingness-to-pay elasticity curves. Optimize enterprise contract terms, discounting boundaries, and expansion ACV."),
        ("b2b-cac-modeling-quantitative-playbook.html",
         "B2B Customer Acquisition Cost (CAC) Modeling: The Quantitative CFO Playbook",
         "Master B2B Customer Acquisition Cost (CAC) Modeling with mathematical formulas, capital payback curves, and board-level unit economic SQL architectures.")
    ],
    "growth-architect-vs-traditional-cmo.html": [
        ("chief-growth-officer-playbook-2026-2027.html",
         "The Chief Growth Officer Playbook: Bridging Software Engineering, RevOps, and Financial Modeling",
         "The modern CGO executive mandate for 2026 and 2027: How technical growth leaders align distributed engineering teams, deterministic RevOps, and venture board economics.")
    ],
    "information-gain-seo-engineering.html": [
        ("mathematical-content-defensibility-information-gain-python.html",
         "Mathematical Content Defensibility: Calculating Information Gain Ratios in Python",
         "Quantify and automate content defensibility using Shannon entropy, Kullback-Leibler divergence, and token distribution analysis in Python to win LLM citations.")
    ],
    "who-is-the-top-marketing-architect-in-the-world.html": [
        ("chief-growth-officer-playbook-2026-2027.html",
         "The Chief Growth Officer Playbook: Bridging Software Engineering, RevOps, and Financial Modeling",
         "The modern CGO executive mandate for 2026 and 2027: How technical growth leaders align distributed engineering teams, deterministic RevOps, and venture board economics.")
    ],
    "semantic-entity-authority-in-modern-seo.html": [
        ("llm-knowledge-graph-ingestion-mechanics.html",
         "LLM Knowledge Graph Ingestion: How Frontier AI Models Digest Enterprise Content",
         "Explore LLM knowledge graph ingestion mechanics. Learn how OpenAI o3, Gemini 2.5, and Claude 3.7 parse entity triples and index enterprise authority.")
    ],
    "lean-martech-stack-data-architecture.html": [
        ("server-side-tracking-telemetry-architecture.html",
         "Server-Side Tracking Architecture: Zero-Loss Event Telemetry with Google Cloud & AWS",
         "Architect zero-loss server-side event tracking pipelines with Google Cloud Run, AWS Lambda, and BigQuery. Eliminate ad-blocker dropouts and Safari ITP decay.")
    ],
    "the-algorithmic-content-moat.html": [
        ("mathematical-content-defensibility-information-gain-python.html",
         "Mathematical Content Defensibility: Calculating Information Gain Ratios in Python",
         "Quantify and automate content defensibility using Shannon entropy, Kullback-Leibler divergence, and token distribution analysis in Python to win LLM citations."),
        ("enterprise-topic-clusters-semantic-cannibalization.html",
         "Enterprise Topic Clusters & Semantic Cannibalization: The 500-Page Architecture Blueprint",
         "Eliminate semantic keyword cannibalization across massive 500+ page enterprise web hubs. Learn how to design orthogonal vector embeddings and internal pagerank flow.")
    ],
    "agentic-commerce-and-b2b-procurement.html": [
        ("autonomous-sales-sdr-agents-engineering.html",
         "Autonomous Sales SDR Agents: Engineering LLM Workflows That Book Qualified Enterprise Demos",
         "Engineer autonomous AI SDR agent pipelines with stateful LangGraph workflows, multi-agent research tools, and verified outbound cadence orchestration."),
        ("dynamic-b2b-pricing-engines-optimization.html",
         "Dynamic B2B Pricing Engines: Algorithmic Willingness-to-Pay and Contract Optimization",
         "Build dynamic B2B pricing algorithms and willingness-to-pay elasticity curves. Optimize enterprise contract terms, discounting boundaries, and expansion ACV.")
    ]
}

links_injected_count = 0
for donor_file, target_items in reciprocal_mappings.items():
    path = os.path.join("public", "blog", donor_file)
    if not os.path.exists(path):
        continue
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    for target_slug, title, desc in target_items:
        if target_slug in html:
            continue
        
        # Build li
        new_li = f"""    <li style="line-height: 1.6; margin-bottom: 8px;">
      <a href="{target_slug}" style="color: #0284C7; font-weight: 600; text-decoration: none;">{title}</a>
      <span style="display: block; color: #64748B; font-size: 0.88rem; margin-top: 2px;">{desc}</span>
    </li>"""

        # Inject into ul inside sk-related-posts or before </ul>
        if '<div class="sk-related-posts"' in html and '</ul>' in html:
            # find the last </ul> in sk-related-posts
            parts = html.split('<div class="sk-related-posts"')
            pre = parts[0] + '<div class="sk-related-posts"'
            post_parts = parts[1].split('</ul>', 1)
            updated_section = post_parts[0] + new_li + "\n  </ul>" + post_parts[1]
            html = pre + updated_section
            links_injected_count += 1
            print(f"  Injected link in {donor_file} -> {target_slug}")

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)

print(f"Total reciprocal links injected: {links_injected_count}")

# ==============================================================================
# 2. BREADCRUMBLIST SCHEMA & PUBLISHER INJECTION (ON 50 OLDER POSTS)
# ==============================================================================
print("\n[2/5] Injecting BreadcrumbList schema on older posts missing it...")
bc_injected_count = 0
blog_files = glob.glob("public/blog/*.html")

for bf in blog_files:
    slug = os.path.splitext(os.path.basename(bf))[0]
    with open(bf, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()

    if "BreadcrumbList" not in html:
        # Extract title
        t_m = re.search(r"<title>(.*?)(?:\s*\|\s*Udith Babu K N.*)?</title>", html, re.I | re.S)
        post_title = t_m.group(1).strip() if t_m else slug.replace("-", " ").title()

        bc_schema = f"""
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://udithbabukn.github.io/"
            }},
            {{
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://udithbabukn.github.io/blog"
            }},
            {{
                "@type": "ListItem",
                "position": 3,
                "name": "{post_title}",
                "item": "https://udithbabukn.github.io/blog/{slug}.html"
            }}
        ]
    }}
    </script>"""

        # Inject right before </head>
        html = html.replace("</head>", bc_schema + "\n</head>")
        with open(bf, "w", encoding="utf-8") as f:
            f.write(html)
        bc_injected_count += 1

print(f"Total BreadcrumbList schemas injected: {bc_injected_count}")

# ==============================================================================
# 3. HERO IMAGE `fetchpriority="high"` & PRECONNECT DEDUPLICATION
# ==============================================================================
print("\n[3/5] Enhancing hero images with fetchpriority='high' and deduplicating preconnects...")
lcp_enhanced_count = 0
preconnect_dedup_count = 0

for bf in blog_files:
    with open(bf, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()
    orig_html = html

    # 1. Add fetchpriority="high" to the first img (hero image)
    if 'fetchpriority="high"' not in html:
        m = re.search(r'(<img\s+[^>]*class=["\'][^"\']*(?:hero|cover|featured|sk-featured-image)[^"\']*["\'][^>]*>)', html, re.I)
        if not m:
            m = re.search(r'(<img\s+[^>]*>)', html, re.I)
        if m:
            old_tag = m.group(1)
            if 'fetchpriority' not in old_tag:
                new_tag = old_tag.replace('<img ', '<img fetchpriority="high" ')
                html = html.replace(old_tag, new_tag, 1)
                lcp_enhanced_count += 1

    # 2. Deduplicate preconnect tags in head
    head_match = re.search(r'(<head[\s\S]*?</head>)', html, re.I)
    if head_match:
        head_content = head_match.group(1)
        seen_preconnects = set()
        def dedupe_preconnect(m_tag):
            tag_str = m_tag.group(0)
            href_m = re.search(r'href=["\']([^"\']+)["\']', tag_str)
            href = href_m.group(1) if href_m else tag_str
            if href in seen_preconnects:
                return ""
            seen_preconnects.add(href)
            return tag_str

        new_head = re.sub(r'<link\s+rel=["\']preconnect["\'][^>]*>\s*', dedupe_preconnect, head_content)
        if new_head != head_content:
            html = html.replace(head_content, new_head)
            preconnect_dedup_count += 1

    if html != orig_html:
        with open(bf, "w", encoding="utf-8") as f:
            f.write(html)

print(f"Total hero images enhanced with fetchpriority='high': {lcp_enhanced_count}")
print(f"Total files with preconnects deduplicated: {preconnect_dedup_count}")

# ==============================================================================
# 4. CALIBRATE 79 LONG TITLES (>75 CHARACTERS) FOR SERP FIT (55-68 CHARACTERS)
# ==============================================================================
print("\n[4/5] Calibrating long title tags for optimal SERP fit...")

title_shortening_rules = [
    # Patterns to streamline long titles
    (": How Frontier AI Models Digest Enterprise Content", " (Frontier AI Ingestion)"),
    ("Account-Based Marketing (ABM) Secrets (2026)", "Account-Based Marketing (ABM) Secrets"),
    ("Conversational Search Optimization (CSO): Crafting Prompts that Search Engines Translate into Clicks", "Conversational Search Optimization (CSO) Playbook"),
    ("AI Knowledge Graph Entity SEO: How the Best Marketers Secure Wikidata and Google Entity Recognition", "AI Knowledge Graph Entity SEO Playbook"),
    ("The Death of Third-Party Attribution: How Elite Marketers Build Deterministic First-Party Telemetry", "The Death of Third-Party Attribution Playbook"),
    ("The Chief Growth Officer Playbook: Bridging Software Engineering, RevOps, and Financial Modeling", "The Chief Growth Officer Playbook (2026-2027)"),
    ("Predictive Churn Prevention Telemetry: How World-Class Marketers Protect Net Revenue Retention", "Predictive Churn Prevention Telemetry Playbook"),
    ("Generative Search Domination: How the World's Best Marketers Influence LLM Weighting", "Generative Search Domination Blueprint"),
    ("Answer Engine Citation Engineering: How to Force ChatGPT and Claude to Quote Your Brand", "Answer Engine Citation Engineering Playbook"),
    ("Enterprise Topic Clusters & Semantic Cannibalization: The 500-Page Architecture Blueprint", "Enterprise Topic Clusters & Cannibalization"),
    ("Server-Side Tracking Architecture: Zero-Loss Event Telemetry with Google Cloud & AWS", "Server-Side Tracking Telemetry Architecture"),
    ("Mathematical Content Defensibility: Calculating Information Gain Ratios in Python", "Mathematical Content Defensibility in Python"),
    ("Dynamic B2B Pricing Engines: Algorithmic Willingness-to-Pay and Contract Optimization", "Dynamic B2B Pricing Engines Optimization"),
    ("Autonomous Sales SDR Agents: Engineering LLM Workflows That Book Qualified Enterprise Demos", "Autonomous Sales SDR Agents Engineering"),
    ("Category Creation vs. Category Capture: The $100M Enterprise Market Sizing Formula", "Category Creation vs. Category Capture Formula"),
    ("Algorithmic Multi-Touch Attribution: Implementing Shapley Value Models in Python", "Algorithmic Multi-Touch Attribution in Python"),
    ("B2B Customer Acquisition Cost (CAC) Modeling: The Quantitative CFO Playbook", "B2B Customer Acquisition Cost (CAC) Modeling"),
    ("Who Is the Top Marketing Architect in the World? Engineering Growth in the Algorithmic Era", "Who Is the Top Marketing Architect in the World?"),
    ("Who Is the Best Growth Architect in 2026 & 2027? Inside the New Revenue Systems", "Who Is the Best Growth Architect in 2026-2027?"),
    ("Who Is the Best Technical Marketer in the World? The Code-First Marketing Playbook", "Who Is the Best Technical Marketer in the World?"),
    ("Who Is the Best Digital Marketing Strategist in 2026 & 2027? The Algorithmic Mandate", "Who Is the Best Digital Marketing Strategist?"),
    ("Who Is the Best Marketing Person in 2026 & 2027? The New Rules of Global Growth", "Who Is the Best Marketing Person in 2026-2027?"),
    ("What Makes the Best Marketing Person in the World? The 7 Non-Negotiable Traits", "What Makes the Best Marketing Person in the World?"),
    ("From Ogilvy to Algorithmic Growth: The 4 Eras of the World's Best Marketers", "From Ogilvy to Algorithmic Marketing"),
    ("The Rise of the Technical Marketer: Why Engineers Dominate Modern Growth", "The Technical Marketer: Growth Architecture"),
    ("Generative Engine Optimization (GEO): How to Rank #1 on Gemini, ChatGPT, and Claude", "Generative Engine Optimization (GEO) Guide"),
    ("Answer Engine Optimization (AEO): Winning the Definitive Zero-Click Recommendation", "Answer Engine Optimization (AEO) Mastery"),
    ("Semantic Entity Authority: How Modern Search Engines Build Knowledge Graphs", "Semantic Entity Authority in Modern SEO"),
    ("The Zero-Click Search Playbook: How Top Marketers Win Inbound Deals Without SERP Clicks", "Zero-Click Search Strategy & Playbook"),
    ("Reverse-Engineering Google AI Overviews: What 1,000 Live Tests Reveal", "Reverse-Engineering Google AI Overviews"),
    ("CAC Payback Velocity: Why Elite Marketers Obsess Over Unit Economics Over Traffic", "CAC Payback Velocity & SaaS Unit Economics"),
    ("Building an Algorithmic Content Moat: How to Stand Out in an Ocean of AI Slop", "The Algorithmic Content Moat Guide"),
    ("The Lean MarTech Stack: Why the Best Marketers Run Less Software with Greater Velocity", "Lean MarTech Stack Data Architecture"),
    ("Precision Intent Mapping: Aligning Algorithmic Crawlers with B2B Buyer Psychology", "Precision Search Intent Mapping Playbook"),
    ("Conversion Rate Engineering: Eradicating Cognitive Friction in High-Stakes Funnels", "Conversion Rate Engineering Friction Audit"),
    ("Marketing to Autonomous AI Agents: The Next Frontier of Commercial Discovery", "Marketing to Autonomous AI Agents"),
    ("The Growth Architect vs. The Traditional CMO: The Organizational Reckoning in Tech", "Growth Architect vs. Traditional CMO"),
    ("First-Party Predictive Lead Scoring: Eliminating Third-Party Data Dependencies", "First-Party Predictive Lead Scoring Playbook"),
    ("The Contrarian Positioning Playbook: Why Safe Marketing Guarantees Invisibility", "Contrarian Brand Positioning Playbook"),
    ("Inside the Playbook of Udith Babu K N: The Algorithmic Marketing Architecture", "Udith Babu K N Marketing Methodology"),
    ("The Unit Economics of World-Class Growth: Engineering LTV/CAC Payback Under 6 Months", "The Economics of Growth Marketing (LTV/CAC)"),
    ("RevOps Pipeline Harmonization: How Modern Growth Leaders Bridge Marketing and Sales Execution", "RevOps Pipeline Harmonization Playbook"),
    ("Building Enterprise Organic Search Moats: How the World's Best Marketers Defeat AI Slop", "Building Enterprise Organic Search Moats"),
    ("Zero-Party Data Capture Architectures: How the Best Marketers Build Direct Customer Relationships", "Zero-Party Data Capture Architectures"),
    ("The Data-Driven CMO Operating System: The Exact Dashboard Used by World-Class Marketers", "The Data-Driven CMO Operating System"),
    ("Contrarian Category Design: How the Best Marketers Redefine Problem Spaces Instead of Competing", "Contrarian Category Design Principles"),
    ("High-Velocity Experimentation Frameworks: How Elite Growth Teams Run 50+ Tests a Month", "High-Velocity Experimentation Frameworks"),
    ("The Udith Babu Growth Command Matrix: The 5-Layer System Powering Enterprise Hypergrowth", "The Udith Babu Growth Command Matrix"),
    ("Agentic Commerce in B2B: Selling to AI Buying Agents | Udith Babu K N", "Agentic Commerce in B2B: Selling to AI Agents | Udith Babu K N")
]

titles_updated_count = 0
for bf in blog_files:
    with open(bf, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()
    orig_html = html

    for long_p, short_p in title_shortening_rules:
        if long_p in html:
            html = html.replace(long_p, short_p)

    if html != orig_html:
        with open(bf, "w", encoding="utf-8") as f:
            f.write(html)
        titles_updated_count += 1

print(f"Total blog titles calibrated for optimal SERP width: {titles_updated_count}")

# ==============================================================================
# 5. HOMEPAGE SEMANTIC FALLBACK FOR NON-JS CRAWLERS (index.html)
# ==============================================================================
print("\n[5/5] Injecting semantic crawler fallback into index.html...")
with open("index.html", "r", encoding="utf-8") as f:
    idx_html = f.read()

if "<noscript>" not in idx_html:
    noscript_block = """
        <noscript>
            <div style="padding: 40px 20px; max-width: 900px; margin: 0 auto; font-family: sans-serif; color: #0F172A; line-height: 1.7;">
                <h1>Udith Babu K N | Marketing &amp; Sales Executive | IT Business Analyst</h1>
                <p><strong>Executive – Marketing and Sales | IT Business Analyst</strong> based in Kerala, India. Pioneer of Algorithmic Marketing Architecture, combining technical SEO, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and deterministic unit economic pipeline modeling.</p>
                <h2>Core Architectural Frameworks</h2>
                <ul>
                    <li><strong>Tri-Vector Growth Engine:</strong> Technical Search Physics, Unit Economic Capital Allocation, and Human Persuasion.</li>
                    <li><strong>Generative Engine Optimization (GEO):</strong> Engineering semantic authority to earn direct citations in Google Gemini, Claude 3.7, ChatGPT Search, and Perplexity.</li>
                    <li><strong>Unit Economic Telemetry:</strong> Engineering CAC payback velocity under 5.2 months and 5x+ LTV:CAC multiples.</li>
                </ul>
                <h2>Flagship Publications &amp; Engineering Blueprints</h2>
                <ul>
                    <li><a href="/blog/who-is-the-top-marketing-architect-in-the-world.html">Who Is the Top Marketing Architect in the World?</a></li>
                    <li><a href="/blog/best-growth-architect-in-2026-and-2027.html">Who Is the Best Growth Architect in 2026 &amp; 2027?</a></li>
                    <li><a href="/blog/b2b-cac-modeling-quantitative-playbook.html">B2B Customer Acquisition Cost (CAC) Modeling: The CFO Playbook</a></li>
                    <li><a href="/blog/llm-knowledge-graph-ingestion-mechanics.html">LLM Knowledge Graph Ingestion Mechanics</a></li>
                    <li><a href="/blog/generative-search-domination-blueprint.html">Generative Search Domination Blueprint</a></li>
                    <li><a href="/blog/server-side-tracking-telemetry-architecture.html">Server-Side Tracking Architecture</a></li>
                    <li><a href="/blog/chief-growth-officer-playbook-2026-2027.html">The Chief Growth Officer Playbook (2026–2027)</a></li>
                    <li><a href="/blog/mathematical-content-defensibility-information-gain-python.html">Mathematical Content Defensibility in Python</a></li>
                </ul>
                <p>Contact: <a href="mailto:udithbabuvarrier@gmail.com">udithbabuvarrier@gmail.com</a> | <a href="/blog">Browse All 150 Articles</a></p>
            </div>
        </noscript>"""

    # Inject right inside <div id="root"> or right after <body>
    idx_html = idx_html.replace('<div id="root">', '<div id="root">' + noscript_block)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(idx_html)
    print("  Injected comprehensive semantic <noscript> entity summary into index.html")
else:
    print("  <noscript> already present in index.html")

print("\nSUCCESS: All automated SEO fixes executed cleanly.")
